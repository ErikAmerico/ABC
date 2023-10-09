import React, { useEffect, useState } from "react";
import AuthService from "../utils/auth.js";
import "./contacts.css";

import Modal from "@mui/material/Modal";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

import { useMutation, useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

import { CREATE_CONTACT } from "../utils/mutations.js";
import { GET_ALL_CONTACTS } from "../utils/queries.js";

export default function Contacts() {
  if (AuthService.loggedIn()) {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profile, setProfile] = useState(AuthService.getProfile());
    const client = useApolloClient();
    const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
    const [newContactData, setNewContactData] = useState({
      firstName: "",
      lastName: "",
      title: "",
      roles: [],
      email: "",
      phone: "",
    });

    const [createContact] = useMutation(CREATE_CONTACT);
    const { data, loading, error, refetch } = useQuery(GET_ALL_CONTACTS);

    const triggerRefetch = () => {
      refetch();
    };

    useEffect(() => {
      if (data) {
        // const filteredContacts = data.contacts.filter((contact) => {
        //   return contact.roles.includes("Contact");
        // });

        console.log(data);

        const contactsData = data.getContacts.map((contact) => ({
          id: contact.id,
          ...contacts,
          fullName: `${contact.firstName} ${contact.lastName}`,
          title: contact.title,
          email: contact.email,
          phone: contact.phone,
        }));

        setContacts(contactsData);
      }
    }, [data]);

    if (loading) return <p>Loading IDs...</p>;
    if (error) return <p>Error fetching contact IDs: {error.message}</p>;

    const myRole = profile.data.roles;
    const myId = profile.data._id;

    const handleAddContactModalOpen = () => {
      setIsAddContactModalOpen(true);
    };

    const handleAddContactModalClose = () => {
      setIsAddContactModalOpen(false);
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewContactData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleAddContact = async () => {
      try {
        await createContact({ variables: { input: newContactData } });
        setIsAddContactModalOpen(false);
        triggerRefetch(); // To refresh the data after adding
      } catch (err) {
        console.error("Error adding contact:", err);
      }
    };

    const columns = [
      { field: "fullName", headerName: "Name", width: 130 },
      { field: "title", headerName: "Title", width: 130 },
      //   {
      //     field: "roles",
      //     headerName: "Roles",
      //     width: 200,
      //     renderCell: (params) => params.row.roles.join(" "),
      //   },
      { field: "email", headerName: "Email", width: 200 },
      { field: "phone", headerName: "Phone Number", width: 150 },
      { field: "company", headerName: "Company", width: 150 },
      {
        field: "edit",
        headerName: "",
        sortable: false,
        width: 150,
        renderCell: (params) => (
          console.log(params.row),
          (
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
                  {`Edit ${params.row.fullName.split(" ")[0]}`}
                </Button>
              )}
            </>
          )
        ),
      },
      {
        field: "add",
        headerName: "Add Contact", // fallback for screen readers
        width: 175,
        disableColumnMenu: true,
        sortable: false,
        renderHeader: (params) => (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddContactModalOpen}
          >
            Add Contact
          </Button>
        ),
      },
    ];

    return (
      <div style={{ height: 600, width: "100%" }} className="tableContainerDiv">
        <DataGrid
          rows={contacts}
          columns={columns}
          className="tableContainer"
          checkboxSelection
          hideFooter
        />
        <Modal
          open={isAddContactModalOpen}
          onClose={handleAddContactModalClose}
          aria-labelledby="add-contact-modal"
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
            <h2 id="add-contact-modal">Add Office Employee</h2>
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
            <TextField
              fullWidth
              margin="normal"
              name="title"
              label="Title"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="roles"
              label="Roles"
              onChange={handleInputChange}
            />
            {/* <FormControl fullWidth margin="normal">
              <InputLabel id="roles-label">Roles</InputLabel>
              <Select
                labelId="roles-label"
                multiple
                name="roles"
                value={newContactData.roles}
                onChange={handleInputChange}
                renderValue={(selected) => selected.join(", ")}
              >
                <MenuItem value="Supervisor">Contact</MenuItem>
              </Select>
            </FormControl> */}
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddContact}
            >
              Add Contact
            </Button>
          </Box>
        </Modal>
      </div>
    );
  }
}
