import React, { useEffect, useState } from "react";
import AuthService from "../utils/auth.js";
import "./companies.css";

import Modal from "@mui/material/Modal";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CREATE_COMPANY } from "../utils/mutations.js";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

import { useMutation, useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

import { GET_ALL_COMPANIES } from "../utils/queries.js";

export default function Companies() {
  if (AuthService.loggedIn()) {
    const [companies, setCompanies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profile, setProfile] = useState(AuthService.getProfile());
    const client = useApolloClient();
    const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
    const [newCompanyData, setNewCompanyData] = useState({
      firstName: "",
      lastName: "",
      roles: [],
      cdlProgram: false,
      cdl: false,
      email: "",
      phone: "",
      list: null,
    });
    const [createCompany] = useMutation(CREATE_COMPANY);

    const { data, loading, error, refetch } = useQuery(GET_ALL_COMPANIES);
    console.log(data);
    console.log("companies", companies);

    const triggerRefetch = () => {
      refetch();
    };

    useEffect(() => {
      if (data) {
        // const filteredUsers = data.users.filter((user) => {
        //   return (
        //     user.roles.includes("Owner") ||
        //     user.roles.includes("Supervisor") ||
        //     user.roles.includes("Admin") ||
        //     user.roles.includes("ProjectManager") ||
        //     user.roles.includes("Salesman")
        //   );
        // });

        // const userData = filteredUsers.map((user) => ({
        //   ...user,
        //   fullName: `${user.firstName} ${user.lastName}`,
        // }));

        setCompanies(data.getCompanies);
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

    const handleAddCompanyModalOpen = () => {
      setIsAddCompanyModalOpen(true);
    };

    const handleAddCompanyModalClose = () => {
      setIsAddCompanyModalOpen(false);
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewCompanyData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleAddCompany = async () => {
      try {
        await createCompany({ variables: { input: newCompanyData } });
        setIsAddCompanyModalOpen(false);
        triggerRefetch(); // To refresh the data after adding
      } catch (err) {
        console.error("Error adding Company:", err);
      }
    };

    //TODO: CONFIGURE COLUMNS TO DISPLAY COMPANY DATA AS DROP DOWNS WHEN CLICKED ON, AND COMPANY IS SELECTED?
    const columns = [
      { field: "names", headerName: "Company NAme", width: 130 },
      {
        field: "addresses",
        headerName: "Address",
        width: 200,
        //renderCell: (params) => params.row.addresses.join(" "),
        renderCell: (params) =>
          params.row.addresses
            .map((addr) => `${addr.street}, ${addr.city}, ${addr.state}`)
            .join("; "),
      },
      {
        field: "contacts",
        headerName: "Contacts",
        width: 200,
        renderCell: (params) =>
          params.row.contacts
            .map((contact) => `${contact.firstName}: ${contact.phone}`)
            .join("; "),
      },
      {
        field: "edit",
        headerName: "",
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
                // sx={{ backgroundColor: "#134074" }}
                color="inherit"
              >
                {/* {`Edit ${params.row.names[0]}`} */}
                Edit Company
              </Button>
            )}
          </>
        ),
      },
      {
        field: "add",
        headerName: "Add Company", // fallback for screen readers
        width: 175,
        disableColumnMenu: true,
        sortable: false,
        renderHeader: (params) => (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCompanyModalOpen}
          >
            Add Company
          </Button>
        ),
      },
    ];

    return (
      <div style={{ height: 600, width: "100%" }} className="tableContainerDiv">
        <DataGrid
          rows={companies}
          columns={columns}
          className="tableContainer"
          checkboxSelection
          hideFooter
        />
        <Modal
          open={isAddCompanyModalOpen}
          onClose={handleAddCompanyModalClose}
          aria-labelledby="add-company-modal"
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
            <h2 id="add-company-modal">Add Company</h2>
            <TextField
              fullWidth
              margin="normal"
              name="names"
              label="Company Name"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="address"
              label="Address"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="contacts"
              label="Contacts"
              onChange={handleInputChange}
            />
            {/* <FormControl fullWidth margin="normal">
              <InputLabel id="roles-label">Roles</InputLabel>
              <Select
                labelId="roles-label"
                multiple
                name="roles"
                value={newEmployeeData.roles}
                onChange={handleInputChange}
                renderValue={(selected) => selected.join(", ")}
              >
                <MenuItem value="Supervisor">Supervisor</MenuItem>
                <MenuItem value="Salesman">Salesman</MenuItem>
                <MenuItem value="Project Manager">Project Manager</MenuItem>
                <MenuItem value="Warehouse">Warehouse</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
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
            /> */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCompany}
            >
              Save
            </Button>
          </Box>
        </Modal>
      </div>
    );
  }
}
