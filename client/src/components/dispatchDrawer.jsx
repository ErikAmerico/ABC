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
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_CONTACTS,
  GET_ALL_COMPANIES,
  GET_ALL_VANS,
  GET_ALL_TRUCKS,
  GET_ALL_USER_IDS,
} from "../utils/queries.js";
import { useGlobalContext } from "../utils/globalContext";
import { CREATE_JOB, UPDATE_JOB } from "../utils/mutations.js";

export default function DispatchDrawer() {
  //const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  const {
    rowSelectionModel,
    setRowSelectionModel,
    rows,
    setRows,
    open,
    setOpen,
    selectedCompany,
    setSelectedCompany,
    selectedDate,
  } = useGlobalContext();
  // const [selectedCompany, setSelectedCompany] = useState({
  //   name: null,
  //   id: null,
  // });
  const [companies, setCompanies] = useState([]);

  const [createJob, { createJobData, createJobLoading, createJobError }] =
    useMutation(CREATE_JOB, {
      refetchQueries: ["getJobsByDate"],
    });

  const [updateJob, { updateJobData, updateJobLoading, updateJobError }] =
    useMutation(UPDATE_JOB, {
      refetchQueries: ["getJobsByDate"],
    });

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
        const companyName = selectedRow.account[0].name;
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

  useEffect(() => {
    if (companiesData && companiesData.getCompanies) {
      setCompanies(companiesData.getCompanies);
    }
  }, [companiesData]);

  const queriesLoading =
    usersLoading ||
    trucksLoading ||
    vansLoading ||
    contactsLoading ||
    companiesLoading;

  const queriesError =
    usersError || trucksError || vansError || contactsError || companiesError;

  if (queriesLoading) return <p>Loading...</p>;
  if (queriesError) return <p>Error: {queriesError.message}</p>;

  const employees = usersData.users;
  const trucks = trucksData.getTrucks;
  const vans = vansData.getVans;
  const contacts = contactsData.getContacts;

  const companyAddresses = selectedCompany
    ? companies.find((c) => c.names[0] === selectedCompany.name)?.addresses ||
      []
    : [];

  const companyContacts = selectedCompany
    ? contacts.filter((contact) => contact.company.id === selectedCompany.id)
    : [];

  const updateJobDatabase = async (selectedRowId, jobInput) => {
    console.log("Updating job with input:", jobInput);
    try {
      const response = await updateJob({
        variables: { id: selectedRowId, input: jobInput },
      });
      console.log("Job updated successfully:", response);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const createJobWithSelectedCompany = async (jobInput) => {
    console.log("Creating job with input:", jobInput);
    try {
      const response = await createJob({
        variables: { input: jobInput },
      });
      console.log("Job created successfully:", response);
      setRowSelectionModel([response.data.createJob.id]);
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const updateSelectedRow = (name, role) => {
    if (rowSelectionModel === undefined || rowSelectionModel === null) return;
    const selectedRowId = rowSelectionModel[0];

    setRows((prevRows) => {
      return prevRows.map((row) => {
        if (row.id === rowSelectionModel[0]) {
          if (role === "Supervisor") {
            const updatedSupervisors = [...row.crewsize.supervisors];
            const initials = name
              .split(" ")
              .map((part) => part.charAt(0))
              .join("");

            const userId = employees.find(
              (employee) =>
                `${employee.firstName} ${employee.lastName}` === name
            )?.id;

            updatedSupervisors.push({ initials: initials, id: userId });

            const jobInput = {
              supervisors: updatedSupervisors.map(
                (supervisor) => supervisor.id
              ),
            };

            updateJobDatabase(selectedRowId, jobInput);
            return {
              ...row,
              crewsize: {
                supervisors: updatedSupervisors,
                count: row.crewsize.count,
              },
            };
          } else if (role === "Truck" || role === "Van") {
            const updatedVehicles = [...row.truckVan];

            const vehicleId = role === "Truck" ? trucks : vans;
            const vehicle = vehicleId.find(
              (v) => String(v.number) === String(name)
            );

            if (!vehicle) {
              console.error(`Vehicle with number ${name} not found!`);
              return;
            }

            updatedVehicles.push({
              role: role,
              number: name,
              id: vehicle.id,
            });

            const jobInput = {
              trucks: updatedVehicles
                .filter((item) => item.role === "Truck")
                .map((truckObj) => truckObj.id),
              vans: updatedVehicles
                .filter((item) => item.role === "Van")
                .map((vanObj) => vanObj.id),
            };

            updateJobDatabase(selectedRowId, jobInput);
            return {
              ...row,
              truckVan: updatedVehicles,
            };
          } else if (role === "Contact") {
            const updatedContacts = [...row.contact];

            const contactId = contacts.find(
              (contact) => `${contact.firstName} ${contact.lastName}` === name
            )?.id;

            updatedContacts.push({ name: name, id: contactId });

            const jobInput = {
              contact: contactId,
            };

            updateJobDatabase(selectedRowId, jobInput);

            return {
              ...row,
              contact: updatedContacts,
            };
          } else if (role === "Company") {
            // Find the company with the given name
            const company = companies.find((c) => c.names[0] === name);

            // Set the selected company state with both name and ID
            setSelectedCompany({ name: company.names[0], id: company.id });

            const jobInput = {
              date: selectedDate,
              startTime: "8:00 AM",
              serviceType: "Move",
              account: company.id,
            };

            createJobWithSelectedCompany(jobInput);

            const updatedCompanies = [
              { name: company.names[0], id: company.id },
            ]; // Store both name and ID
            return {
              ...row,
              account: updatedCompanies,
            };
          } else if (role === "Origin") {
            const updatedOrigins = [...row.origin];
            updatedOrigins.push(name);

            const jobInput = {
              origin: updatedOrigins,
            };

            updateJobDatabase(selectedRowId, jobInput);
            return {
              ...row,
              origin: updatedOrigins,
            };
          } else if (role === "Destination") {
            const updatedDestinations = [...row.destination];
            updatedDestinations.push(name);

            const jobInput = {
              destination: updatedDestinations,
            };

            updateJobDatabase(selectedRowId, jobInput);
            return {
              ...row,
              destination: updatedDestinations,
            };
          } else if (["Driver", "Helper", "Tech"].includes(role)) {
            const userId = employees.find(
              (employee) =>
                `${employee.firstName} ${employee.lastName}` === name
            )?.id;

            const updatedCrewMembers = [...row.crewMembers];
            const roleIndex = updatedCrewMembers.findIndex(
              (r) => r.role === role
            );

            if (roleIndex !== -1) {
              updatedCrewMembers[roleIndex].names.push({
                name: name,
                id: userId,
              });
            } else {
              updatedCrewMembers.push({
                role: role,
                names: [{ name: name, id: userId }],
              });
            }

            const jobInput = {
              drivers: updatedCrewMembers
                .find((role) => role.role === "Driver")
                ?.names.map((name) => name.id),
              helpers: updatedCrewMembers
                .find((role) => role.role === "Helper")
                ?.names.map((name) => name.id),
              techs: updatedCrewMembers
                .find((role) => role.role === "Tech")
                ?.names.map((name) => name.id),
            };

            updateJobDatabase(selectedRowId, jobInput);

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

    rows.forEach((row) => {
      if (row.crewMembers) {
        row.crewMembers.forEach((crew) => {
          if (crew.names) {
            selectedEmployees = [
              ...selectedEmployees,
              ...crew.names.map((n) => n.name),
            ];
          }
        });
      }

      if (Array.isArray(row.crewsize.supervisors)) {
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
            assignedTrucks.push(vehicle.number);
          } else if (vehicle.role === "Van") {
            assignedVans.push(vehicle.number);
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

  //TODO: Keep drawer item open after selecting an sub-item. only collapse drawer item when selecting another drawer item.

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
