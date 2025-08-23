import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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


import UserAvatar from "./UserAvatar"
import EditUser from "./EditUser"

export const columns = [
    {name: "NAME", uid: "name"},
    {name: "ROLE", uid: "role"},
    {name: "STATUS", uid: "status"},
    {name: "ACTIONS", uid: "actions"},
  ];

  
  
  const statusColorMap = {
    verified: "success",
    paused: "danger",
    vacation: "warning",
  };
  

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const router = useRouter();

    const fetchUsers = async () => {
        try {
          const res = await fetch('/api/auth/users');
          const data = await res.json();
          if (data.error) {
            console.error('Error fetching users:', data.error);
            setRefresh(false)
            return;
          }
          setUsers(data.users || []);
        } catch (error) {
            setRefresh(false)
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchUsers();
      }, [refresh]);

    if (loading) {
        return <div>Loading users...</div>;
    }

    const refreshpage = () => {
        setRefresh(true)
        console.log(refresh)
        fetchUsers()
    }
    return (
        <div className="mt-4">
            <Table aria-label="Users table">
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id} className={user.status === "paused" ? "bg-red-100" : ""}>
                            <TableCell><UserAvatar user={user}/></TableCell>
                            
                            <TableCell>
                                <Chip color={user.isAdmin === "admin" ? "primary" : "default"}>
                                    {user.isAdmin === "admin" ? "Admin" : "User"}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <Chip className="capitalize" size="sm" variant="flat" color={statusColorMap[user.status] || "warning"}>
                                    {user.status}
                                </Chip>
                            </TableCell>
                            <TableCell>
                            <EditUser user={user} refreshpage={refreshpage}/>
                                </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UsersList;