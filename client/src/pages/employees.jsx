import React, { useEffect, useState } from "react";
import AuthService from "../utils/auth.js";
import "./employees.css";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

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

    // useEffect(() => {
    //   if (data) {
    //     const userData = data.users;
    //     setUsers(userData);
    //   }
    // }, [data, triggerRefetch]);

    useEffect(() => {
      if (data) {
        const userData = data.users.map((user) => ({
          ...user,
          fullName: `${user.firstName} ${user.lastName}`,
        }));
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

    const columns = [
      { field: "fullName", headerName: "Name", width: 130 },
      {
        field: "roles",
        headerName: "Roles",
        width: 200,
        renderCell: (params) => params.row.roles.join(" "),
      },
      { field: "email", headerName: "Email", width: 200 },
      { field: "phone", headerName: "Phone Number", width: 150 },
      {
        field: "edit",
        headerName: "Edit",
        sortable: false,
        width: 150,
        renderCell: (params) => (
          <>
            {params.row.id !== profile.data._id && (
              <Button
                variant="contained"
                onClick={() => {
                  /* Handle Edit Logic Here */
                }}
                sx={{ backgroundColor: "#134074" }}
              >
                {`Edit ${params.row.firstName}`}
              </Button>
            )}
          </>
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        sortable: false,
        width: 150,
        renderCell: (params) => {
          const userRole = profile.data.roles;
          const isOwnerOrAdmin =
            userRole.includes("Owner") ||
            (userRole.includes("Admin") && params.row.role !== "Owner");

          return (
            <>
              {isOwnerOrAdmin && params.row.id !== profile.data._id && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveUser(params.row.id)}
                >
                  Remove User
                </Button>
              )}
            </>
          );
        },
      },
    ];

    return (
      <div style={{ height: 600, width: "100%" }} className="tableContainerDiv">
        <DataGrid
          rows={users}
          columns={columns}
          className="tableContainer"
          checkboxSelection
          hideFooter
        />
      </div>
    );
  }
}
