import React from "react";
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



const UserAvatar = ({user}) => {
    return ( <>
        <User
            avatarProps={{radius: "lg", src: user.image}}
            description={user.email}
            name={`${user.firstname} ${user.lastname}`}
          >
            {user.email}
          </User>
    </> );
}
 
export default UserAvatar;