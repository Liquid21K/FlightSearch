"use client"

import { useState, useRef } from "react"
import { changeUserImageData } from "../../../actions/changeUserImageData"
import { useEffect } from "react"
import { useSession } from "next-auth/react"

export default function ChangeImage({ content, contentName, RefreshImage }) {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(true)
    const [newContent, setNewContent] = useState(null)
    const [isHovered, setIsHovered] = useState(false)
    const fileInputRef = useRef(null)

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setNewContent(file)
            setIsOpen(false)
        }
    }

    async function fetchUpdatedUser() {
        const res = await fetch('/api/refresh')
        if (!res.ok) throw new Error('Failed to refresh user data')
        const data = await res.json()
        return data.user
    }

    useEffect(() => {
        if (newContent && newContent != session.user?.image) {
            RefreshImage(URL.createObjectURL(newContent))
        } else {
            RefreshImage(session.user?.image)
        }
    }, [newContent])

    const saveData = async () => {
        if (!newContent) return

        const formData = new FormData()
        formData.append('image', newContent)

        const res = await changeUserImageData(formData)

        if (res?.error) {
            console.error(res.error)
            return
        }

        try {
            const updatedUser = await fetchUpdatedUser()
            RefreshImage(updatedUser.image)
        } catch (err) {
            console.error('Failed to refresh user after image upload:', err)
        }

        setIsOpen(true)
    }

    const handleReturn = () => {
        setIsOpen(true)
        setNewContent(session.user?.image)
    }

    return (
        <div className="flex items-center space-x-4">
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {isOpen ? (
                <div 
                    className="relative group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleUploadClick}
                        type="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-700"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Change Photo</span>
                    </button>
                    {isHovered && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap">
                            Click to upload new photo
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        onClick={saveData}
                        title="Save"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span className="text-sm font-medium">Save</span>
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        onClick={handleReturn}
                        title="Cancel"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        <span className="text-sm font-medium">Cancel</span>
                    </button>
                </div>
            )}
        </div>
    )
}
