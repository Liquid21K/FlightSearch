"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ChangeData from "../components/(auth)/Fields/changeData"
import DarkClouds from "../assets/FooterCloud"
import { Avatar, Button, Badge, Card, CardBody, CardHeader } from "@heroui/react"
import AnimatedContent from "../assets/AnimatedContent"
import { getBookmarks } from "../actions/getbookmarks"
import DeleteDrawer from "../components/(auth)/Fields/DeleteDrawer"


const ProfilePage = () => {
  const { data: session } = useSession()
  const [state, setState] = useState(true)
  const [bookmarks, setBookmarks] = useState([])
  const changeState = () => {
    setState((prevState) => !prevState)
  }

  const refreshBookmarks = async () => {
    const data = await getBookmarks()
    if (!data.error) setBookmarks(data)
  }

  useEffect(() => {
    refreshBookmarks()
    window.addEventListener('bookmarksUpdated', refreshBookmarks)
    return () => {
      window.removeEventListener('bookmarksUpdated', refreshBookmarks)
    }
  }, [])

  if (!session) return null

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">

        <div className="flex justify-center mt-10">
          <Card className="w-full max-w-sm rounded-2xl shadow-2xl">
            <CardHeader className="p-0 relative">
              <img
                src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max"
                alt="Cover background"
                className="w-full h-32 object-cover rounded-t-2xl"
              />
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <Avatar
                  src={session.user?.image || "/default-avatar.png"}
                  alt={`${session.user?.name}'s profile picture`}
                  
                  size="lg"
                  isBordered
                  className="shadow-lg w-32 h-32"
                />
              </div>
            </CardHeader> 
            <CardBody className="mt-16 text-center space-y-2 ">
              <h1 className="text-2xl font-semibold text-gray-900">{session.user?.name}</h1>
              <p className="text-gray-500 text-sm">{session.user?.email}</p>
              <div className="flex justify-center gap-2 my-2 ">
              <p className="my-5" color="success">Verified</p>
              </div>

              <div className="flex justify-around text-gray-700 pb-5">
              <div className="flex flex-col items-center">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 2a2 2 0 0 0-2 2v14l8-4 8 4V4a2 2 0 0 0-2-2H4z" />
                  </svg>
                  <span className="text-xs font-medium">{bookmarks.length}</span>
                </div>

                <div className="flex flex-col items-center">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="-2 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.9 14.32a8 8 0 1 0-1.4 1.4l4.3 4.3a1 1 0 0 0 1.4-1.4l-4.3-4.3zm-5.9.68a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs font-medium">10k</span>
                </div>

              </div>
              <Button
                color="primary"
                onClick={changeState}
                className="w-full mt-4"
              >
                Edit Profile
              </Button>
            </CardBody>
          </Card>
        </div>

        {!state && (
          <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <AnimatedContent
                distance={10}
                direction="vertical"
                reverse={true}
                duration={2.2}
                ease="power3.out"
                initialOpacity={0.9}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.3}
              >
                <div className="text-center mb-12">
                  <h1 className="text-3xl font-bold text-white mb-4">Account Settings</h1>
                  <p className="text-lg text-gray-200">Customize your profile to enhance your experience with us.</p>
                </div>

                <Card className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <ChangeData content={session?.user?.email} contentName="Email" />
                      <ChangeData content={session?.user?.firstname} contentName="First Name" />
                      <ChangeData content={session?.user?.lastname} contentName="Last Name" />
                    </div>
                    <div className="space-y-6">
                      <div className="flex flex-col items-center">
                        <ChangeData content={session?.user?.image} contentName="Image" />
                        <DeleteDrawer/>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Button
                      variant="outline"
                      color="secondary"
                      onClick={changeState}
                    >
                      Back to Profile
                    </Button>
                  </div>
                </Card>
              </AnimatedContent>
            </div>
          </div>
        )}

      </div>
      <DarkClouds />
    </div>
  )
}

export default ProfilePage
