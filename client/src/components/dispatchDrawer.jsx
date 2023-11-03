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

export default function DispatchDrawer() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  const { rowSelectionModel, setRowSelectionModel, rows, setRows } =
    useGlobalContext();
  const [selectedCompany, setSelectedCompany] = useState({
    name: null,
    id: null,
  });
  const [companies, setCompanies] = useState([]);

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

  // When a job is fetched using GET_JOBS_BY_DATE in dispatch.jsx, whichever contact is associated with that job
  // is no longer available in dispatchDrawer. I am not sure why yet.

  // To diagnose why contacts disappear from dispatchDrawer.jsx after running the GET_JOBS_BY_DATE query in dispatch.jsx, we need to consider several factors:

  // State Management: See how contacts are being managed in the global state or the local state of dispatchDrawer.jsx. If the contacts are removed or altered elsewhere in the app (potentially by dispatch.jsx), it could affect their appearance in the drawer.

  // Data Updates: Investigate if the GET_JOBS_BY_DATE query modifies the same piece of state or context that dispatchDrawer.jsx relies on. For instance, if the query updates the contacts data in a way that dispatchDrawer.jsx does not expect (like removing contacts associated with jobs), they would disappear from the drawer.

  // Props Drilling or Context API: If dispatchDrawer.jsx receives its contacts through props or context, check if dispatch.jsx is causing these props or context values to change upon the GET_JOBS_BY_DATE query execution.

  // Apollo Cache: Apollo Client uses a cache for its data. If GET_JOBS_BY_DATE causes a cache update that indirectly affects the contacts data, it might make them disappear. This could happen if the data fetched by GET_JOBS_BY_DATE is normalized in the cache and shares identifiers with the contacts data, leading to unintended modifications.

  // Query Results Merging: Look into how Apollo Client merges query results. There are scenarios where fetching new data could overwrite existing data in the cache if not handled properly.

  // Component Re-rendering: Ensure that the disappearance isn't simply a UI issue where the dispatchDrawer.jsx component isn't re-rendering when it should, perhaps due to missing dependencies in a useEffect hook or a similar issue.

  // Data Filtering: Verify that the logic after GET_JOBS_BY_DATE execution isn't filtering out contacts unintentionally. This could be a side effect of transforming the data to fit the UI's needs.

  // Error Handling: Ensure that there isn't an error in the GET_JOBS_BY_DATE query that's causing a faulty state update.

  // Console Log: Add console.log statements before and after the GET_JOBS_BY_DATE query to log out the contacts data and see precisely when the change occurs.
  // Apollo DevTools: Use Apollo Client DevTools for Chrome to inspect the Apollo cache before and after the query runs.
  // Breakpoints: Set breakpoints in the developer tools to step through the code that runs after the query.
  // Dependency Review: Check useEffect dependencies and any other piece of logic that manipulates the contacts state.

  // Shared State: rows is being used from the global context, which means any modifications to rows will reflect across all components using it. If FETCH_JOBS_BY_DATE leads to a change in rows that omits contacts, this would cause them to disappear in dispatchDrawer.jsx.

  // Apollo Cache: Since FETCH_JOBS_BY_DATE likely updates the cache with the fetched jobs, it might inadvertently modify the contacts data if they share a common key or identifier.

  // useQuery Hook Execution: The useQuery hook is reactive. If the selectedDate changes or if any of the jobs data changes in a way that impacts related contacts, the disappearance could be a side effect of that.

  // State Overwriting: If setRows is called with a new set of data that doesn't include the contacts after FETCH_JOBS_BY_DATE, this would result in the contacts disappearing.

  // Here are steps to troubleshoot:

  // Check Apollo Cache: After FETCH_JOBS_BY_DATE runs, inspect the Apollo cache to see if contacts are being altered. The Apollo Client DevTools can help with this.

  // Review State Updates: Look for any code paths in dispatch.jsx where setRows is called, and ensure that contacts are not being removed from the rows inadvertently.

  // Inspect the Data Structure: Examine the structure of the data returned by FETCH_JOBS_BY_DATE. It's possible that the normalization of this data in the Apollo cache is affecting the contacts.

  // Logging: Place console.log statements before and after the query to log out the state of rows and any other relevant state to see when the contacts are removed.

  // Dependency Tracking: Ensure that there aren't unintended consequences from other useState or useEffect hooks that might be based on the data fetched by FETCH_JOBS_BY_DATE.

  // Query Side Effects: If FETCH_JOBS_BY_DATE has any associated onCompleted or onError handlers, check them for side effects that might be modifying the context or state.

  // It might be helpful to place a console.log inside the useEffect hook in dispatchDrawer.jsx that depends on rows and companies to see if the state changes after FETCH_JOBS_BY_DATE runs. If you can identify a change in the state after the query, that would be a strong indication of where the problem lies.

  const companyContacts = selectedCompany
    ? contacts.filter((contact) => contact.company.id === selectedCompany.id)
    : [];

  const updateSelectedRow = (name, role) => {
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

            const userId = employees.find(
              (employee) =>
                `${employee.firstName} ${employee.lastName}` === name
            )?.id;

            updatedSupervisors.push({ initials: initials, id: userId });
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
            //const vehicle = vehicleId.find((v) => v.number === name);
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

            return {
              ...row,
              contact: updatedContacts,
            };
          } else if (role === "Company") {
            // Find the company with the given name
            const company = companies.find((c) => c.names[0] === name);

            // Set the selected company state with both name and ID
            setSelectedCompany({ name: company.names[0], id: company.id });

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

  //console.log("rows", rows);

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
