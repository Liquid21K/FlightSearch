import { useEffect, useState } from "react";
import { useDisclosure } from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@heroui/react";

import ChangeUserEdit from "./changeUserEdit";
import UserDetails from "./UserDetails";

export const EyeIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const DeleteIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path d="M6 4H8V16H6V4Z" fill="currentColor" />
    <path d="M12 4H14V16H12V4Z" fill="currentColor" />
  </svg>
);

export const ResumeIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path d="M6 4L14 10L6 16V4Z" />
  </svg>
);

export const EditIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M2.5 18.3333H17.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
  </svg>
);

const EditUser = ({ user, refreshpage }) => {
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onOpenChange: onOpenChangeDetail,
  } = useDisclosure();

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
      refreshpage(true);
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
      <div className="relative flex items-center gap-2">
        <Tooltip className="p-1.5" content="Details">
          <span 
            onClick={onOpenDetail} 
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
          >
            <EyeIcon />
          </span>
        </Tooltip>

        <UserDetails
          isOpen={isOpenDetail}
          onOpenChange={onOpenChangeDetail}
          user={user}
          refreshpage={refreshpage}
        />

        <Tooltip className="p-1.5" content="Edit user">
          <span
            onClick={onOpenEdit}
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
          >
            <EditIcon />
          </span>
        </Tooltip>

        {user && user.status === "paused" ? (
          <Tooltip className="p-1.5" color="success" content="Enable User">
            <span
              onClick={changeUser}
              className="text-lg text-success cursor-pointer active:opacity-50"
            >
              <ResumeIcon />
            </span>
          </Tooltip>
        ) : (
          <Tooltip className="p-1.5" color="danger" content="Pause user">
            <span
              onClick={changeUser}
              className="text-lg text-danger cursor-pointer active:opacity-50"
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        )}
      </div>

      <ChangeUserEdit
        isOpen={isOpenEdit}
        refreshpage={refreshpage}
        onOpenChange={onOpenChangeEdit}
        user={user}
      />
    </>
  );
};

export default EditUser;
