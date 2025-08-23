"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";
import { changeUserData } from "@/app/actions/changeUserData";

const ChangeUserEdit = ({ isOpen, onOpenChange, user, refreshpage }) => {
  const [firstName, setFirstName] = useState(user.firstname || "");
  const [lastName, setLastName] = useState(user.lastname || "");
  const [role, setRole] = useState(user.isAdmin || "user");

  const handleSave = async (contentName, content) => {
    // Ensure content is a string and not undefined
    const stringContent = content ? String(content) : "user";
    
    const res = await changeUserData({
      user,
      contentName,
      content: stringContent,
    });

    if (res?.error) {
      alert(`Failed to update ${contentName}: ${res.error}`);
      console.error(res.error);
    } else {
      alert(`${contentName} updated successfully`);
      refreshpage();
    }
  };

  const handleResendVerification = async () => {
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();
      alert(data.success ? "Verification email resent." : "Failed to resend verification.");
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  };

  const handleRoleChange = (keys) => {
    const newRole = Array.from(keys)[0];
    console.log('New role selected:', newRole); // Debug log
    setRole(newRole);
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>Edit User</DrawerHeader>
        <DrawerBody className="flex flex-col gap-4">
          {/* First Name */}
          <div className="flex items-center gap-2">
            <Input
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="bordered"
            />
            <Button
              color="primary"
              size="sm"
              onPress={() => handleSave("firstname", firstName)}
            >
              Save
            </Button>
          </div>

          {/* Last Name */}
          <div className="flex items-center gap-2">
            <Input
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="bordered"
            />
            <Button
              color="primary"
              size="sm"
              onPress={() => handleSave("lastname", lastName)}
            >
              Save
            </Button>
          </div>

          {/* Email (not editable) */}
          <Input
            label="Email"
            value={user.email}
            isDisabled
            variant="bordered"
          />

          <Button
            size="sm"
            color="primary"
            variant="ghost"
            disabled={user.verified ? true : false}
            onPress={handleResendVerification}
            type="button"
          >
            Resend Email Verification
          </Button>

          {/* Role */}
          <div className="flex items-center gap-2">
            <Select
              
              selectedKeys={[role]}
              onSelectionChange={handleRoleChange}
              variant="bordered"
            >
              <SelectItem key="user">User</SelectItem>
              <SelectItem key="admin">Admin</SelectItem>
            </Select>
            <Button
              color="primary"
              size="sm"
              onPress={() => {
                console.log('Saving role:', role); // Debug log
                handleSave("isAdmin", role);
              }}
            >
              Save
            </Button>
          </div>
        </DrawerBody>

        <DrawerFooter>
          <Button color="default" variant="flat" onPress={() => onOpenChange(false)}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ChangeUserEdit;
