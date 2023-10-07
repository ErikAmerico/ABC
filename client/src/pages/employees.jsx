import React, { useEffect, useState } from "react";
import AuthService from "../utils/auth.js";
import "./employees.css";

import Modal from "@mui/material/Modal";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CREATE_USER } from "../utils/mutations.js";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

import { useMutation, useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

import { GET_ALL_USER_IDS } from "../utils/queries.js";
import { DELETE_USER } from "../utils/mutations.js";
import { GET_USER } from "../utils/queries.js";

export default function Employees() {
  if (AuthService.loggedIn()) {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profile, setProfile] = useState(AuthService.getProfile());
    const [removeUser] = useMutation(DELETE_USER);
    const client = useApolloClient();
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [newEmployeeData, setNewEmployeeData] = useState({
      firstName: "",
      lastName: "",
      roles: [],
      cdlProgram: false,
      cdl: false,
      email: "",
      phone: "",
      list: null,
    });
    const [createUser] = useMutation(CREATE_USER);

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
        const filteredUsers = data.users.filter((user) => {
          return (
            user.roles.includes("Driver") ||
            user.roles.includes("Helper") ||
            user.roles.includes("Tech") ||
            user.roles.includes("ForkLift")
          );
        });

        const userData = filteredUsers.map((user) => ({
          ...user,
          fullName: `${user.firstName} ${user.lastName}`,
        }));

        setUsers(userData);
      }
    }, [data]);

    if (loading) return <p>Loading IDs...</p>;
    if (error) return <p>Error fetching user IDs: {error.message}</p>;

    const myRole = profile.data.roles;
    const myId = profile.data._id;

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

    const handleAddEmployeeModalOpen = () => {
      setIsAddEmployeeModalOpen(true);
    };

    const handleAddEmployeeModalClose = () => {
      setIsAddEmployeeModalOpen(false);
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;

      if (name === "roles") {
        setNewEmployeeData((prev) => ({ ...prev, roles: [...value] }));
      } else if (name === "cdlProgram" || name === "cdl") {
        const booleanValue = value === "true" ? true : false;
        setNewEmployeeData((prev) => ({ ...prev, [name]: booleanValue }));
      } else {
        setNewEmployeeData((prev) => ({ ...prev, [name]: value }));
      }
    };

    const handleAddEmployee = async () => {
      try {
        await createUser({ variables: { input: newEmployeeData } });
        setIsAddEmployeeModalOpen(false);
        triggerRefetch(); // To refresh the data after adding
      } catch (err) {
        console.error("Error adding employee:", err);
      }
    };

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
        headerName: "",
        sortable: false,
        disableColumnMenu: true,
        width: 150,
        renderCell: (params) => (
          <>
            {params.row.id !== profile.data._id && (
              <Button
                variant="contained"
                onClick={() => {
                  /* Handle Edit Logic Here */
                }}
                // sx={{ backgroundColor: "#134074" }}
                color="inherit"
              >
                {`Edit ${params.row.firstName}`}
              </Button>
            )}
          </>
        ),
      },
      // {
      //   field: "delete",
      //   headerName: "Delete",
      //   sortable: false,
      //   width: 150,
      //   disableColumnMenu: true,
      //   renderCell: (params) => {
      //     const userRole = profile.data.roles;
      //     const isOwnerOrAdmin =
      //       myRole.includes("Owner") ||
      //       (myRole.includes("Admin") && params.row.role !== "Owner");

      //     return (
      //       <>
      //         {isOwnerOrAdmin && params.row.id !== profile.data._id && (
      //           <Button
      //             variant="contained"
      //             color="error"
      //             onClick={() => handleRemoveUser(params.row.id)}
      //           >
      //             Remove User
      //           </Button>
      //         )}
      //       </>
      //     );
      //   },
      // },
      {
        field: "add",
        headerName: "Add Employee", // fallback for screen readers
        width: 175,
        disableColumnMenu: true,
        sortable: false,
        renderHeader: (params) => (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEmployeeModalOpen}
          >
            Add Employee
          </Button>
        ),
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
        <Modal
          open={isAddEmployeeModalOpen}
          onClose={handleAddEmployeeModalClose}
          aria-labelledby="add-employee-modal"
        >
          <Box
            sx={{
              width: 400,
              padding: 2,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 1,
            }}
          >
            <h2 id="add-employee-modal">Add Field Employee</h2>
            <TextField
              fullWidth
              margin="normal"
              name="firstName"
              label="First Name"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="lastName"
              label="Last Name"
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="roles-label">Roles</InputLabel>
              <Select
                labelId="roles-label"
                multiple
                name="roles"
                value={newEmployeeData.roles}
                onChange={handleInputChange}
                renderValue={(selected) => selected.join(", ")}
              >
                <MenuItem value="Driver">Driver</MenuItem>
                <MenuItem value="Helper">Helper</MenuItem>
                <MenuItem value="Tech">Tech</MenuItem>
                <MenuItem value="ForkLift">ForkLift</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="cdlProgram-label">CDL Program</InputLabel>
              <Select
                labelId="cdlProgram-label"
                name="cdlProgram"
                value={newEmployeeData.cdlProgram}
                onChange={handleInputChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="cdl-label">CDL</InputLabel>
              <Select
                labelId="cdl-label"
                name="cdl"
                value={newEmployeeData.cdl}
                onChange={handleInputChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="phone"
              label="Phone Number"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="password"
              label="Initial Password (eg. 'Erik123.')"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="list"
              label="List #, if applicable. Otherwise, leave blank."
              onChange={handleInputChange}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddEmployee}
            >
              Save
            </Button>
          </Box>
        </Modal>
      </div>
    );
  }
}
