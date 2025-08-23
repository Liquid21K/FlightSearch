"use client"
import ChangeButton from "./changeButton"
import { useSession } from "next-auth/react"
import ChangeImage from "./changeImage"
import { useEffect, useState } from "react"

export default function ChangeData({ content = "", contentName = "" }) {
    const { data: session } = useSession()
    const [image, setNewImage] = useState(content)
    useEffect(() => {
        if (contentName === "Image") {
            
        }
      }, [image])

    if (!session) return null
    

    const RefreshImage = (image) => {
        setNewImage(image)
    }
    
    return (
        <>
        
            {contentName === "Image" ? (
                <div className="flex flex-col items-center gap-4 justify-center">
                    <div className="container mx-auto p-4 max-w-md">
                        <h1 className="text-2xl font-bold p-2">{contentName}:</h1>
                        <div className="flex flex-col p-4 rounded-md items-center">
                                <img 
                                    src={image} 
                                    alt="Profile"     
                                    className="w-28 h-28 rounded-full object-cover items-center mb-5 border-2 border-gray-300"
                                />
                            <div className="flex items-center gap-2 w-full">
                                <ChangeImage RefreshImage={RefreshImage}/>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <div className="container mx-auto p-4 max-w-md">
                        <h1 className="text-2xl font-bold p-2">{contentName}:</h1>
                        <div className="flex flex-col p-4 rounded-md">
                            <div className="flex items-center gap-2 w-full">
                                <ChangeButton content={content} contentName={contentName} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}