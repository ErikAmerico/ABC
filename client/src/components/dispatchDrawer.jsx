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

  if (usersLoading || trucksLoading || vansLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error: {usersError.message}</p>;
  if (trucksError) return <p>Error: {trucksError.message}</p>;
  if (vansError) return <p>Error: {vansError.message}</p>;

  const employees = usersData.users;
  const trucks = trucksData.getTrucks;
  const vans = vansData.getVans;

  // console.log(
  //   "Updated rowSelectionModel in DispatchDrawer:",
  //   rowSelectionModel
  // );

  const updateSelectedRow = (name, role) => {
    console.log("Updating selected row:", name, role, rowSelectionModel[0]);
    if (rowSelectionModel === undefined || rowSelectionModel === null) return;
    setRows((prevRows) => {
      return prevRows.map((row) => {
        if (row.id === rowSelectionModel) {
          return {
            ...row,
            crewMembers: role === "Driver" ? `D) ${name}` : row.crewMembers,
          };
        }
        return row;
      });
    });
  };

  const items = [
    "Supervisor",
    "Driver",
    "Helper",
    "Tech",
    "Truck",
    "Van",
    "Contact",
    "Company",
  ];

  const generateExpandedData = (employees, trucks, vans) => {
    const data = {};

    employees.forEach((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      employee.roles.forEach((role) => {
        if (!data[role] && items.includes(role)) {
          data[role] = [];
        }
        if (data[role]) {
          data[role].push(fullName);
        }
      });
    });

    data["Truck"] = trucks.map((truck) => `${truck.number}`);
    data["Van"] = vans.map((van) => `${van.number}`);

    items.forEach((item) => {
      if (!data[item]) data[item] = [];
    });

    return data;
  };

  const expandedData = generateExpandedData(employees, trucks, vans);

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

  return (
    <>
      <Button onClick={toggleDrawer(true)}>Add Details</Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {items.map((text) => (
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
                          <ListItemText primary={subItem} inset />
                        </ListItem>
                      ))}
                  </List>
                </Collapse>
              </div>
            ))}
          </List>
          <Divider />
          <Button onClick={toggleDrawer(false)}>Close Drawer</Button>
        </Box>
      </Drawer>
    </>
  );
}
