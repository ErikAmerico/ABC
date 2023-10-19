import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { useQuery } from "@apollo/client";
import { GET_ALL_USER_IDS } from "../utils/queries";
import { GET_ALL_TRUCKS } from "../utils/queries";
import { GET_ALL_VANS } from "../utils/queries";
import { GET_ALL_CONTACTS } from "../utils/queries.js";
import { GET_ALL_COMPANIES } from "../utils/queries.js";
import { useGlobalContext } from "../utils/globalContext";

export default function DispatchDrawer(
  {
    // selectedRowId,
    // rows,
    // setRows,
  }
) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  const { rowSelectionModel, setRowSelectionModel } = useGlobalContext();
  const { rows, setRows } = useGlobalContext();
  const [selectedCompany, setSelectedCompany] = useState({
    name: null,
    id: null,
  });
  const [companies, setCompanies] = useState([]);

  // useEffect(() => {
  //   setSelectedCompany(null);
  //   setExpanded({});
  // }, [rowSelectionModel]);

  useEffect(() => {
    // Reset the selectedCompany and expanded states
    setSelectedCompany(null);
    setExpanded({});

    // Check if there's a selected row
    if (rowSelectionModel && rowSelectionModel.length > 0) {
      const selectedRowId = rowSelectionModel[0];
      const selectedRow = rows.find((row) => row.id === selectedRowId);

      // If the selected row has an account (company) set, update the selectedCompany state
      if (
        selectedRow &&
        selectedRow.account &&
        selectedRow.account.length > 0
      ) {
        const companyName = selectedRow.account[0];
        const company = companies.find((c) => c.names[0] === companyName);
        if (company) {
          setSelectedCompany({
            name: company.names[0],
            id: company.id,
          });
        }
      }
    }
  }, [rowSelectionModel, rows, companies]);

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery(GET_ALL_USER_IDS);

  const {
    data: trucksData,
    loading: trucksLoading,
    error: trucksError,
  } = useQuery(GET_ALL_TRUCKS);

  const {
    data: vansData,
    loading: vansLoading,
    error: vansError,
  } = useQuery(GET_ALL_VANS);

  const {
    data: contactsData,
    loading: contactsLoading,
    error: contactsError,
  } = useQuery(GET_ALL_CONTACTS);

  const {
    data: companiesData,
    loading: companiesLoading,
    error: companiesError,
  } = useQuery(GET_ALL_COMPANIES);

  if (
    usersLoading ||
    trucksLoading ||
    vansLoading ||
    contactsLoading ||
    companiesLoading
  )
    return <p>Loading...</p>;
  if (usersError) return <p>Error: {usersError.message}</p>;
  if (trucksError) return <p>Error: {trucksError.message}</p>;
  if (vansError) return <p>Error: {vansError.message}</p>;
  if (contactsError) return <p>Error: {contactsError.message}</p>;
  if (companiesError) return <p>Error: {companiesError.message}</p>;

  const employees = usersData.users;
  const trucks = trucksData.getTrucks;
  const vans = vansData.getVans;
  const contacts = contactsData.getContacts;
  //const companies = companiesData.getCompanies;
  useEffect(() => {
    if (companiesData && companiesData.getCompanies) {
      setCompanies(companiesData.getCompanies);
    }
  }, [companiesData]);

  const companyAddresses = selectedCompany
    ? companies.find((c) => c.names[0] === selectedCompany.name)?.addresses ||
      []
    : [];

  //console.log("selectedCompany", selectedCompany);

  const companyContacts = selectedCompany
    ? contacts.filter((contact) => contact.company.id === selectedCompany.id)
    : [];

  // console.log("companyContacts", companyContacts);
  // console.log("Sample contact:", contacts[0]);

  const updateSelectedRow = (name, role) => {
    console.log("Updating selected row:", name, role, rowSelectionModel[0]);
    if (rowSelectionModel === undefined || rowSelectionModel === null) return;

    setRows((prevRows) => {
      return prevRows.map((row) => {
        if (row.id === rowSelectionModel[0]) {
          if (role === "Supervisor") {
            const updatedSupervisors = [...row.crewsize.supervisors];
            const initials = name
              .split(" ")
              .map((part) => part.charAt(0))
              .join("");
            updatedSupervisors.push(initials);
            return {
              ...row,
              crewsize: {
                supervisors: updatedSupervisors,
                count: row.crewsize.count,
              },
            };
          } else if (role === "Truck" || role === "Van") {
            const updatedVehicles = [...row.truckVan];
            updatedVehicles.push({ role: role, numbers: [name] });
            return {
              ...row,
              truckVan: updatedVehicles,
            };
          } else if (role === "Contact") {
            const updatedContacts = [...row.contact, name];
            return {
              ...row,
              contact: updatedContacts,
            };
          } else if (role === "Company") {
            // Find the company with the given name
            const company = companies.find((c) => c.names[0] === name);

            // Set the selected company state with both name and ID
            setSelectedCompany({ name: company.names[0], id: company.id });

            const updatedCompanies = [name]; // Only one company allowed per row.
            return {
              ...row,
              account: updatedCompanies,
            };
          } else if (role === "Origin") {
            const updatedOrigins = [...row.origin];
            updatedOrigins.push(name);
            return {
              ...row,
              origin: updatedOrigins,
            };
          } else if (role === "Destination") {
            const updatedDestinations = [...row.destination];
            updatedDestinations.push(name);
            return {
              ...row,
              destination: updatedDestinations,
            };
          } else {
            const updatedCrewMembers = [...row.crewMembers];
            const roleIndex = updatedCrewMembers.findIndex(
              (r) => r.role === role
            );

            if (roleIndex !== -1) {
              // Role exists, just push the name
              updatedCrewMembers[roleIndex].names.push(name);
            } else {
              // Role does not exist, create a new role object
              updatedCrewMembers.push({ role: role, names: [name] });
            }

            return {
              ...row,
              crewMembers: updatedCrewMembers,
            };
          }
        }
        return row;
      });
    });
  };

  const items = [
    "Company",
    "Contact",
    "Origin",
    "Destination",
    "Supervisor",
    "Driver",
    "Helper",
    "Tech",
    "Truck",
    "Van",
  ];

  const addressToString = (address) => {
    return `${address.street}, ${address.city}`;
  };

  const getSelectedEmployees = () => {
    let selectedEmployees = [];

    // Loop through all rows
    rows.forEach((row) => {
      if (row.crewMembers) {
        row.crewMembers.forEach((crew) => {
          if (crew.names) {
            selectedEmployees = [...selectedEmployees, ...crew.names];
          }
        });
      }

      // Add supervisors to the selected list
      if (row.crewsize && row.crewsize.supervisors) {
        selectedEmployees = [...selectedEmployees, ...row.crewsize.supervisors];
      }
    });

    return selectedEmployees;
  };

  const getAssignedVehicles = () => {
    let assignedTrucks = [];
    let assignedVans = [];

    rows.forEach((row) => {
      if (row.truckVan) {
        row.truckVan.forEach((vehicle) => {
          if (vehicle.role === "Truck") {
            assignedTrucks.push(vehicle.numbers[0]);
          } else if (vehicle.role === "Van") {
            assignedVans.push(vehicle.numbers[0]);
          }
        });
      }
    });

    return { assignedTrucks, assignedVans };
  };

  const generateExpandedData = (
    employees,
    trucks,
    vans,
    companyContacts,
    companyAddresses,
    companies
  ) => {
    const data = {};

    const selectedEmployees = getSelectedEmployees();

    employees.forEach((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;

      // Check if the employee is already selected
      if (!selectedEmployees.includes(fullName)) {
        employee.roles.forEach((role) => {
          if (!data[role] && items.includes(role)) {
            data[role] = [];
          }
          if (data[role]) {
            data[role].push(fullName);
          }
        });
      }
    });

    const { assignedTrucks, assignedVans } = getAssignedVehicles();

    data["Truck"] = trucks
      .map((truck) => `${truck.number}`)
      .filter((truckNumber) => !assignedTrucks.includes(truckNumber));
    data["Van"] = vans
      .map((van) => `${van.number}`)
      .filter((vanNumber) => !assignedVans.includes(vanNumber));
    data["Company"] = companies.map((company) => `${company.names[0]}`);
    data["Origin"] = companyAddresses.map(addressToString);
    data["Destination"] = companyAddresses.map(addressToString);
    data["Contact"] = companyContacts.map(
      (contact) => `${contact.firstName} ${contact.lastName}`
    );

    items.forEach((item) => {
      if (!data[item]) data[item] = [];
    });

    return data;
  };

  const expandedData = generateExpandedData(
    employees,
    trucks,
    vans,
    companyContacts,
    companyAddresses,
    companies
  );

  //TODO: Keep drawer header open after selecting an item. only collapse drawer item when selecting another drawer header.

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const toggleExpand = (item) => () => {
    setExpanded((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const list = (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {items.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button onClick={toggleDrawer(false)}>Close Drawer</Button>{" "}
    </Box>
  );

  const itemsToShow = selectedCompany ? items : ["Company"];

  return (
    <>
      <Button onClick={toggleDrawer(true)}>Add Details</Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {itemsToShow.map((text) => (
              <div key={text}>
                <ListItemButton onClick={toggleExpand(text)}>
                  <ListItemText primary={text} />
                </ListItemButton>
                <Collapse
                  in={expanded[text] || false}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Array.isArray(expandedData[text]) &&
                      expandedData[text].map((subItem) => (
                        <ListItem
                          key={subItem}
                          dense
                          button
                          onClick={() =>
                            updateSelectedRow(subItem, text, rowSelectionModel)
                          }
                          // onClick={(e) => {
                          //   e.stopPropagation(); // Stop the event propagation
                          //   updateSelectedRow(subItem, text, rowSelectionModel);
                          // }}
                        >
                          {subItem && (
                            <ListItemText primary={subItem.toString()} inset />
                          )}
                        </ListItem>
                      ))}
                  </List>
                </Collapse>
              </div>
            ))}
          </List>
          <Divider />
          <Button
            onClick={() => {
              toggleDrawer(false)();
              setSelectedCompany(null);
            }}
          >
            Close Drawer
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
