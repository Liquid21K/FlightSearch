import { useDisclosure, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, Avatar, CardBody, CardFooter } from "@heroui/react";
import ChangeUserEdit from "./changeUserEdit";

export default function UserDetails({ isOpen, onOpenChange, user, refreshpage }) {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();

  const pauseUser = async (string) => {
    const res = await fetch("/api/auth/set-user-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, status: string }),
    });

    const data = await res.json();
    if (data.success) {
      refreshpage();
    } else {
      console.error(data.error);
    }
  };

  const changeUser = () => {
    if (user.status === "verified") {
      pauseUser("paused");
    } else if (user.status === "paused") {
      pauseUser("verified");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="md">
        <ModalContent>
          {(onClose) => (
            <div className="min-h-7 text-center">
              <ModalHeader className="flex flex-col gap-1">User Profile</ModalHeader>
              <ModalBody>
                <Card className="w-full">
                  <CardHeader className="flex justify-center">
                    <div className="flex gap-5">
                      <Avatar
                        isBordered
                        radius="full"
                        size="lg"
                        src={user.image || "https://heroui.com/avatars/avatar-1.png"}
                      />
                    </div>
                  </CardHeader>

                  <CardBody className="px-3 py-0">
                    <p className="text-small justify-center text-center mb-5">{`${user.firstname} ${user.lastname}`}</p>
                    <p className="text-small text-default-600 justify-center text-center">{`Email: ${user.email}`}</p>
                    <p className="text-small text-default-600 justify-center text-center">{`Birth: ${user.dob}`}</p>
                    <p className="text-small text-default-600 justify-center text-center mb-5">{`Birth: ${user.gender}`}</p>
                  </CardBody> 

                  <CardFooter className="flex flex-col items-center gap-2 pt-4">
                    {/* First row: Status and Role */}
                    <div className="flex gap-6 justify-between w-full px-4">
                        <div className="text-default-500 text-small">
                        Status: {user.status}
                        </div>
                        <div className="text-default-500 text-small">
                        Role: {user.isAdmin}
                        </div>
                    </div>

                    {/* Second row: Centered CreatedAt */}
                    <div className="text-default-500 text-small text-center">
                        Created At: {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </CardFooter>
                </Card>
              </ModalBody>

              <ModalFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="flat" onPress={onOpenEdit} color="primary">
                    Edit
                  </Button>
                  {user.status === "paused" ? (
                    <Button 
                      variant="flat" 
                      onPress={changeUser} 
                      color="success"
                    >
                      Resume
                    </Button>
                  ) : (
                    <Button 
                      variant="flat" 
                      onPress={changeUser} 
                      color="danger"
                    >
                      Pause
                    </Button>
                  )}
                </div>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>

      {/* Edit User Modal */}
      <ChangeUserEdit
        isOpen={isOpenEdit}
        onOpenChange={onOpenChangeEdit}
        refreshpage={refreshpage}
        user={user}
      />
    </>
  );
}
