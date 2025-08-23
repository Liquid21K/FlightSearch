import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
  } from "@heroui/react";
import { useSession, signOut } from 'next-auth/react';

const DeleteDrawer = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { data: session } = useSession();

    const handleDeletion = () => {
        onOpenChange(false);
    };

    const confirmDeletion = async () => {
        if (!session?.user?.id) {
            alert("User not authenticated or user ID not found.");
            return;
        }

        try {
            const response = await fetch('/api/deleteAccount', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: session.user.id }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                await signOut({ callbackUrl: '/' });
            } else {
                alert(`Error: ${data.message || 'Failed to delete account'}`);
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("An unexpected error occurred.");
        } finally {
            onOpenChange(false);
        }
    };

    return (
        <>
            <Button color="danger" onPress={onOpen}>Delete Account</Button>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">
                                Are you sure about this?
                            </DrawerHeader>
                            <DrawerBody>
                                <p>
                                    Deleting your account will permanently remove it from our systems.
                                    This action cannot be undone.
                                </p>
                            </DrawerBody>
                            <DrawerFooter className="text-center justify-center">
                                <Button color="primary" onPress={handleDeletion}>
                                    Cancel
                                </Button>
                                <Button color="danger" onPress={confirmDeletion}>
                                    Delete Account
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default DeleteDrawer;