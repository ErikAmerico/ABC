import React, { useEffect, useState } from "react";
import AuthService from "../../utils/auth.js";
import "./contacts.css";

import Modal from "@mui/material/Modal";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

import { useMutation, useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

import { CREATE_CONTACT } from "../../utils/mutations.js";
import { GET_ALL_CONTACTS } from "../../utils/queries.js";
import { GET_ALL_COMPANIES } from "../../utils/queries.js";
import { CREATE_COMPANY } from "../../utils/mutations.js";

export default function Contacts() {
  if (!AuthService.loggedIn()) {
    return <h1>Please login to view this page</h1>;
  }
  //if (AuthService.loggedIn()) {
  const [contacts, setContacts] = useState([]);
  const [profile, setProfile] = useState(AuthService.getProfile());
  const client = useApolloClient();
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [newContactData, setNewContactData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    roles: ["Contact"],
    email: "",
    phone: "",
    company: "",
  });
  const [newCompanyName, setNewCompanyName] = useState("");

  const [showNewCompanyField, setShowNewCompanyField] = useState(false);

  const [createContact] = useMutation(CREATE_CONTACT, {
    update(cache, { data: { createContact } }) {
      const existingCompanies = cache.readQuery({ query: GET_ALL_COMPANIES });

      const updatedCompanies = existingCompanies.getCompanies.map((company) => {
        if (company.id === newContactData.company) {
          return {
            ...company,
            contacts: [...company.contacts, createContact],
          };
        }
        return company;
      });

      cache.writeQuery({
        query: GET_ALL_COMPANIES,
        data: { getCompanies: updatedCompanies },
      });
    },
  });

  const [createCompany] = useMutation(CREATE_COMPANY);

  const { data, loading, error, refetch } = useQuery(GET_ALL_CONTACTS);

  const {
    data: companyData,
    loading: companyLoading,
    error: companyError,
  } = useQuery(GET_ALL_COMPANIES);

  const triggerRefetch = () => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      const contactsData = data.getContacts.map((contact) => ({
        id: contact.id,
        ...contacts,
        fullName: `${contact.firstName} ${contact.lastName}`,
        title: contact.title,
        roles: contact.roles,
        email: contact.email,
        phone: contact.phone,
        company:
          contact.company && contact.company.names && contact.company.names[0]
            ? contact.company.names[0]
            : "N/A",
      }));

      setContacts(contactsData);
    }
  }, [data]);

  if (loading) return <p>Loading IDs...</p>;
  if (error) return <p>Error fetching contact IDs: {error.message}</p>;

  //   const myRole = profile.data.roles;
  //   const myId = profile.data._id;

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
      const input = {
        ...newContactData,
        company: newContactData.company,
      };
      await createContact({ variables: { input: input } });

      setIsAddContactModalOpen(false);
      triggerRefetch();
    } catch (err) {
      console.error("Error adding contact:", err);
    }
  };

  const handleAddCompany = async () => {
    try {
      const newCompany = await createCompany({
        variables: { input: { names: [newCompanyName] } },
      });

      const input = {
        ...newContactData,
        company: newCompany.data.createCompany.id,
      };
      await createContact({ variables: { input: input } });

      setIsAddContactModalOpen(false);
      triggerRefetch();
    } catch (err) {
      console.error("Error adding company:", err);
    }
  };

  const columns = [
    { field: "fullName", headerName: "Name", width: 130 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 150 },
    { field: "company", headerName: "Company", width: 150 },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        //console.log(params.row),
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
        //checkboxSelection
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
          <h2 id="add-contact-modal">Add Contact</h2>
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
            value="Contact"
            InputProps={{
              readOnly: true,
            }}
            disabled
            //onChange={handleInputChange}
          />
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
          <FormControl fullWidth margin="normal" variant="outlined">
            {!showNewCompanyField && (
              <>
                <InputLabel htmlFor="company-input">Company</InputLabel>
                {companyData && (
                  <Select
                    labelId="company-label"
                    id="company-input"
                    label="Company"
                    variant="outlined"
                    name="company"
                    value={newContactData.company}
                    onChange={(e) => {
                      if (e.target.value === "add_new_company") {
                        setShowNewCompanyField(true);
                      } else {
                        setShowNewCompanyField(false);
                        handleInputChange(e);
                      }
                    }}
                  >
                    {companyData?.getCompanies.map((company) => (
                      <MenuItem value={company.id} key={company.id}>
                        {company.names[0]}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={showNewCompanyField}
                  onChange={(e) => setShowNewCompanyField(e.target.checked)}
                  name="showNewCompanyField"
                />
              }
              label="Add New Company For This Contact"
            />

            {showNewCompanyField && (
              <div>
                <TextField
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  placeholder="New Company Name"
                  sx={{ marginBottom: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddCompany}
                >
                  Add Company + Create Contact
                </Button>
              </div>
            )}

            {!showNewCompanyField && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddContact}
              >
                Add Contact
              </Button>
            )}
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
  //}
}
