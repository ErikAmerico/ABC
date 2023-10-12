import React, { useEffect, useState } from "react";
import AuthService from "../utils/auth.js";
import "./companies.css";

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Modal,
  MenuItem,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

import { useMutation, useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

import { GET_ALL_COMPANIES } from "../utils/queries.js";
import { CREATE_COMPANY, CREATE_CONTACT } from "../utils/mutations.js";

export default function Companies() {
  if (AuthService.loggedIn()) {
    const [companies, setCompanies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profile, setProfile] = useState(AuthService.getProfile());
    const client = useApolloClient();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
    const [newCompanyData, setNewCompanyData] = useState({
      names: [""],
      addresses: [
        {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          floors: [{ floorNumber: "", rooms: [""] }],
        },
      ],
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
        setCompanies(data.getCompanies);
      }
    }, [data]);

    if (loading) return <p>Loading IDs...</p>;
    if (error) return <p>Error fetching user IDs: {error.message}</p>;

    const handleAddCompanyModalOpen = () => {
      setNewCompanyData({
        names: [""],
        addresses: [
          {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            floors: [{ floorNumber: "", rooms: [""] }],
          },
        ],
      });
      setIsAddCompanyModalOpen(true);
    };

    const handleAddCompanyModalClose = () => {
      setIsAddCompanyModalOpen(false);
    };

    // const handleInputChange = (event) => {
    //   const { name, value } = event.target;
    //   setNewCompanyData((prev) => ({
    //     ...prev,
    //     [name]: value,
    //   }));
    // };

    const handleAddCompany = async () => {
      try {
        await createCompany({ variables: { input: newCompanyData } });
        setIsAddCompanyModalOpen(false);
        triggerRefetch();
      } catch (err) {
        console.error("Error adding Company:", err);
      }
    };

    const handleDetailModalOpen = (type, item) => {
      if (type === "address") {
        setSelectedAddress(item);
      } else {
        setSelectedContact(item);
      }
      setDetailModalOpen(true);
    };

    const handleDetailModalClose = () => {
      setSelectedAddress(null);
      setSelectedContact(null);
      setDetailModalOpen(false);
    };

    const columns = [
      { field: "names", headerName: "Company Name", width: 130 },
      {
        field: "addresses",
        headerName: "Address",
        width: 250,
        renderCell: (params) => {
          if (!params.row.addresses || params.row.addresses.length === 0) {
            return <div>No Addresses</div>;
          }

          const sortedAddresses = [...params.row.addresses].sort((a, b) => {
            const aNumber = parseInt(a.street.split(" ")[0]);
            const bNumber = parseInt(b.street.split(" ")[0]);
            return aNumber - bNumber;
          });

          //   if (sortedAddresses.length === 1) {
          //     const addr = sortedAddresses[0];
          //     return `${addr.street}, ${addr.city}, ${addr.state}`;
          //   }

          if (sortedAddresses.length === 1) {
            const addr = sortedAddresses[0];
            return (
              <div onClick={() => handleDetailModalOpen("address", addr)}>
                {`${addr.street}, ${addr.city}, ${addr.state},`}
              </div>
            );
          }

          return (
            <Select
              displayEmpty
              fullWidth
              value=""
              onChange={(e) => handleDetailModalOpen("address", e.target.value)}
              renderValue={() => "View Dropdown"}
              sx={{ backgroundColor: "#134074", borderRadius: 3 }}
            >
              {sortedAddresses.map((addr, idx) => (
                <MenuItem key={idx} value={addr}>
                  {`${addr.street}, ${addr.city}, ${addr.state}`}
                </MenuItem>
              ))}
            </Select>
          );
        },
      },
      {
        field: "contacts",
        headerName: "Contacts",
        width: 200,
        renderCell: (params) => {
          if (!params.row.contacts || params.row.contacts.length === 0) {
            return <div>No Contacts</div>;
          }

          const sortedContacts = [...params.row.contacts].sort((a, b) =>
            `${a.firstName} ${a.lastName}`.localeCompare(
              `${b.firstName} ${b.lastName}`
            )
          );

          if (sortedContacts.length === 1) {
            const contact = sortedContacts[0];
            //return `${contact.firstName} ${contact.lastName}`;
            return (
              <div onClick={() => handleDetailModalOpen("contact", contact)}>
                {`${contact.firstName} ${contact.lastName}`}
              </div>
            );
          }

          return (
            <Select
              displayEmpty
              fullWidth
              value=""
              onChange={(e) => handleDetailModalOpen("contact", e.target.value)}
              renderValue={() => "View Dropdown"}
              sx={{ backgroundColor: "#134074", borderRadius: 3 }}
            >
              {sortedContacts.map((contact, idx) => (
                <MenuItem key={idx} value={contact}>
                  {`${contact.firstName} ${contact.lastName}`}
                </MenuItem>
              ))}
            </Select>
          );
        },
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
          //checkboxSelection
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
            <div>
              {newCompanyData.names.map((name, index) => (
                <div key={`name-${index}`}>
                  <TextField
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => {
                      const newNames = [...newCompanyData.names];
                      newNames[index] = e.target.value;
                      setNewCompanyData((prevState) => ({
                        ...prevState,
                        names: newNames,
                      }));
                    }}
                    //label={`Company Name ${index + 1}`}
                    label="Company Name"
                  />
                </div>
              ))}
              {/* <Button
                type="button"
                onClick={() => {
                  setNewCompanyData((prevState) => ({
                    ...prevState,
                    names: [...prevState.names, ""],
                  }));
                }}
              >
                Add another name
              </Button> */}
            </div>
            <div>
              {newCompanyData.addresses.map((address, addressIdx) => (
                <div key={`address-${addressIdx}`}>
                  <TextField
                    fullWidth
                    margin="normal"
                    value={address.street}
                    label="Address"
                    onChange={(e) => {
                      const updatedAddresses = [...newCompanyData.addresses];
                      updatedAddresses[addressIdx].street = e.target.value;
                      setNewCompanyData((prev) => ({
                        ...prev,
                        addresses: updatedAddresses,
                      }));
                    }}
                  />

                  <TextField
                    fullWidth
                    margin="normal"
                    value={address.city}
                    label="City"
                    onChange={(e) => {
                      const updatedAddresses = [...newCompanyData.addresses];
                      updatedAddresses[addressIdx].city = e.target.value;
                      setNewCompanyData((prev) => ({
                        ...prev,
                        addresses: updatedAddresses,
                      }));
                    }}
                  />

                  <TextField
                    fullWidth
                    margin="normal"
                    value={address.state}
                    label="State"
                    onChange={(e) => {
                      const updatedAddresses = [...newCompanyData.addresses];
                      updatedAddresses[addressIdx].state = e.target.value;
                      setNewCompanyData((prev) => ({
                        ...prev,
                        addresses: updatedAddresses,
                      }));
                    }}
                  />

                  <TextField
                    fullWidth
                    margin="normal"
                    value={address.zipCode}
                    label="Zip Code"
                    onChange={(e) => {
                      const updatedAddresses = [...newCompanyData.addresses];
                      updatedAddresses[addressIdx].zipCode = e.target.value;
                      setNewCompanyData((prev) => ({
                        ...prev,
                        addresses: updatedAddresses,
                      }));
                    }}
                  />

                  {address.floors.map((floor, floorIdx) => (
                    <div key={`floor-${floorIdx}`}>
                      <TextField
                        fullWidth
                        margin="normal"
                        value={floor.floorNumber}
                        label="Floor Number"
                        onChange={(e) => {
                          const updatedAddresses = [
                            ...newCompanyData.addresses,
                          ];
                          updatedAddresses[addressIdx].floors[
                            floorIdx
                          ].floorNumber = e.target.value;
                          //parseInt(e.target.value, 10);
                          setNewCompanyData((prev) => ({
                            ...prev,
                            addresses: updatedAddresses,
                          }));
                        }}
                      />

                      {floor.rooms.map((room, roomIdx) => (
                        <div key={`room-div-${roomIdx}`}>
                          <TextField
                            fullWidth
                            margin="normal"
                            value={room}
                            //label={`Room ${roomIdx + 1}`}
                            label="Suite"
                            onChange={(e) => {
                              const updatedAddresses = [
                                ...newCompanyData.addresses,
                              ];
                              updatedAddresses[addressIdx].floors[
                                floorIdx
                              ].rooms[roomIdx] = e.target.value;
                              setNewCompanyData((prev) => ({
                                ...prev,
                                addresses: updatedAddresses,
                              }));
                            }}
                          />
                        </div>
                      ))}
                      <Button
                        onClick={() => {
                          const updatedAddresses = [
                            ...newCompanyData.addresses,
                          ];
                          updatedAddresses[addressIdx].floors[
                            floorIdx
                          ].rooms.push("");
                          setNewCompanyData((prev) => ({
                            ...prev,
                            addresses: updatedAddresses,
                          }));
                        }}
                      >
                        Add another room
                      </Button>
                    </div>
                  ))}
                </div>
              ))}

              {/* <Button
                onClick={() => {
                  setNewCompanyData((prev) => ({
                    ...prev,
                    addresses: [
                      ...prev.addresses,
                      {
                        street: "",
                        city: "",
                        state: "",
                        zipCode: "",
                        floors: [{ floorNumber: "", rooms: [""] }],
                      },
                    ],
                  }));
                }}
              >
                Add another address
              </Button> */}
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCompany}
            >
              Save
            </Button>
          </Box>
        </Modal>
        <Modal
          open={detailModalOpen}
          onClose={handleDetailModalClose}
          aria-labelledby="detail-modal"
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
            <h2 id="detail-modal">Details</h2>
            {selectedAddress && (
              <div>
                <p>Street: {selectedAddress.street}</p>
                <p>City: {selectedAddress.city}</p>
                <p>State: {selectedAddress.state}</p>
                <p>Zip Code: {selectedAddress.zipCode}</p>
                {selectedAddress.floors.map((floor, floorIdx) => (
                  <div key={`floor-detail-${floorIdx}`}>
                    <p>Floor Number: {floor.floorNumber}</p>
                    {floor.rooms.map((room, roomIdx) => (
                      <p key={`room-detail-${roomIdx}`}>Suite: {room}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {selectedContact && (
              <div>
                <p>First Name: {selectedContact.firstName}</p>
                <p>Last Name: {selectedContact.lastName}</p>
                <p>Email: {selectedContact.email}</p>
                <p>Phone: {selectedContact.phone}</p>
              </div>
            )}
          </Box>
        </Modal>
      </div>
    );
  }
}
