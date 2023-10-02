import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import AuthService from "../utils/auth.js";
import "./employees.css";

import { useMutation, useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

import { GET_ALL_USER_IDS } from "../utils/queries";
import { DELETE_USER } from "../utils/mutations";
import { GET_USER } from "../utils/queries";

export default function Employees() {
  if (AuthService.loggedIn()) {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profile, setProfile] = useState(AuthService.getProfile());
    const [removeUser] = useMutation(DELETE_USER);
    const client = useApolloClient();

    const { data, loading, error } = useQuery(GET_ALL_USER_IDS);

    // const { refetch } = useQuery(GET_USER, {
    //   variables: { id: user.id },
    //   skip: true, // Set skip to true to prevent automatic fetching
    // });

    const triggerRefetch = () => {
      refetch();
    };

    useEffect(() => {
      if (data) {
        const userData = data.users;
        setUsers(userData);
      }
    }, [data, triggerRefetch]);

    if (loading) return <p>Loading IDs...</p>;
    if (error) return <p>Error fetching user IDs: {error.message}</p>;

    console.log("data", data);

    // console.log(profile);

    const myRole = profile.data.roles;
    const myId = profile.data._id;
    // console.log(myId);
    // console.log(myRole);

    // const handleRemoveUser = (user) => {
    //   const userId = user.id;
    //   console.log(userId);

    //   removeUser({ variables: { userId } })
    //     .then(() => {
    //       triggerRefetch();
    //     })
    //     .catch((error) => {
    //       console.error("Error removing user:", error);
    //     });
    // };

    return (
      <div className="tableContainerDiv">
        <TableContainer component={Paper} className="tableContainer">
          <Table
            sx={{ minWidth: 650 }}
            aria-label="user table"
            className="userTable"
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {`${user.firstName} ${user.lastName}`}
                  </TableCell>
                  <TableCell>{user.roles.join(" ")}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    {user.id !== myId && (
                      <Button
                        key="editUzer"
                        onClick={() => openModal()}
                        sx={{
                          backgroundColor: "#134074",
                        }}
                        variant="contained"
                      >
                        {`Edit ${user.firstName}`}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {(myRole.includes("Owner") ||
                      (myRole.includes("Admin") && user.role !== "Owner")) &&
                      user.id !== myId && [
                        <Button
                          key="removeUzer"
                          onClick={() => handleRemoveUser(user)}
                          color="error"
                          variant="contained"
                        >
                          Remove User
                        </Button>,
                      ]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
