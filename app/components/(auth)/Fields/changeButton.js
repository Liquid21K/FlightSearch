"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {changeUserData} from "../../../actions/changeUserData"

export default function ChangeButton({ content, contentName }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(true);
  const [preContent, setPreContent] = useState(content);
  const [newContent, setNewContent] = useState(content);

  const toggleEdit = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
    setNewContent(content)
  };

  async function fetchUpdatedUser() {
    const res = await fetch('/api/refresh')
    if (!res.ok) throw new Error('Failed to refresh user data')
    const data = await res.json()
    return data.user
  }

  const saveData = async () => {
    if (!session?.user) {
      console.error('No session found');
      return;
    }

    const res = await changeUserData({ 
      user: session.user,
      content: newContent, 
      contentName 
    });
    
    if (res?.error) {
      console.error(res.error);
      return;
    }
    setPreContent(newContent);
    setIsOpen(true);
    fetchUpdatedUser()
  };

  const handleReturn = () => {
    setIsOpen(true)
    setNewContent(`${content}`)
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        disabled={isOpen}
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md"
        placeholder={content || ""}
      />

      {isOpen ? (
        <button
          className="p-2 rounded-full hover:bg-gray-200 transition"
          onClick={toggleEdit}
          title="Edit"
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
              d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.313l-4.5 1.125 1.125-4.5L16.862 3.487z"
            />
          </svg>
        </button>
      ) : (
        <div>
        <button
          className="p-2 rounded-full hover:bg-green-100 transition"
          onClick={saveData}
          title="Save"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-green-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>
        <button
            className="p-2 rounded-full hover:bg-red-100 transition"
            onClick={handleReturn}
            title="Return"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-red-700"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h11a4 4 0 110 8h-1"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10l4-4m-4 4l4 4"
                />
            </svg>
        </button>
        </div>
      )}
    </div>
  );
}
