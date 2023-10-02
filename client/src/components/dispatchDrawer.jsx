import * as React from "react";
import { useState } from "react";
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

export default function DispatchDrawer() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState({});

  const { data, loading, error } = useQuery(GET_ALL_USER_IDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employees = data.users;

  console.log(employees);

  const generateExpandedData = (employees) => {
    const data = {};

    employees.forEach((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      employee.roles.forEach((role) => {
        if (!data[role]) {
          data[role] = [];
        }
        data[role].push(fullName);
      });
    });

    return data;
  };

  const expandedData = generateExpandedData(employees);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const toggleExpand = (item) => () => {
    setExpanded((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const items = [
    "Supervisors",
    "Drivers",
    "Helpers",
    "Techs",
    "Equipment",
    "Contacts",
    "Companies",
  ];

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
            {Object.keys(expandedData).map((text) => (
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
                    {expandedData[text].map((subItem) => (
                      <ListItem key={subItem} dense button>
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
