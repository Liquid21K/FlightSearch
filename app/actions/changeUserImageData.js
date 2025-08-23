'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { connectDB } from '../lib/mongodb'
import User from '../models/user'
import cloudinary from '../lib/cloudinary'
import { Readable } from 'stream'

const bufferToStream = (buffer) =>
  new Readable({
    read() {
      this.push(buffer)
      this.push(null)
    }
  })

export async function changeUserImageData(formData) {
  const file = formData.get('image')
  if (!file) return { error: 'No image file provided' }
  
  // Optional: Check file type
  if (!file.type.startsWith('image/')) return { error: 'File is not an image' }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    await connectDB()
    const session = await getServerSession(authOptions)
    if (!session) return { error: 'Unauthorized' }

    const user = await User.findOne({ email: session.user.email })
    if (!user) return { error: 'User not found' }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'userimage',
          public_id: `user-${user._id}`, // can add timestamp if you want unique id
          overwrite: true,
        },
        async (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error)
            resolve({ error: 'Upload failed' })
          } else {
            user.image = result.secure_url
            await user.save()
            resolve({ success: true, url: result.secure_url })
          }
        }
      )
      bufferToStream(buffer).pipe(uploadStream)
    })
  } catch (error) {
    console.error('changeUserImageData error:', error)
    return { error: 'Internal server error' }
  }
}
