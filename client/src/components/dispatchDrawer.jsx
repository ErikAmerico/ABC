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

export default function DispatchDrawer() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState({});

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const toggleExpand = (item) => () => {
    setExpanded((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  //Dummy Data
  const expandedData = {
    Supervisors: ["Supervisor 1", "Supervisor 2"],
    Drivers: ["Driver 1", "Driver 2", "Driver 3"],
    Helpers: ["Helper 1", "Helper 2", "Helper 3"],
    Techs: ["Tech 1", "Tech 2", "Tech 3"],
    TruckVan: ["Truck 1", "Truck 2", "Truck 3"],
    contacts: ["Contact 1", "Contact 2", "Contact 3"],
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
