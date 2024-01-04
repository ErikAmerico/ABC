import React, { useState, useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { useMutation, useQuery } from "@apollo/client";
import { FETCH_JOBS_BY_DATE } from "../../utils/queries";

import MoveSheet from "./homeComponents/moveSheet/moveSheet";

const drawerWidth = 240;

export default function Home() {
  const [jobsOpen, setJobsOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    formatDate(new Date(Date.now() + 86400000))
  );
  const [selectedJob, setSelectedJob] = useState(null);

  function formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const { data, loading, error } = useQuery(FETCH_JOBS_BY_DATE, {
    variables: { date: selectedDate.toString().split("T")[0] },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  //console.log(data);

  const handleJobsClick = () => {
    setJobsOpen(!jobsOpen);
    setSelectedJob(null);
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              marginTop: "167px",
              borderRadius: "10px",
              backgroundColor: "#F5F5F5",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          {/* <Divider /> */}
          <List>
            <ListItemButton onClick={handleJobsClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Jobs" />
              {jobsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={jobsOpen} timeout="auto" unmountOnExit>
              <ListItem sx={{ pl: 4 }}>
                <TextField
                  label="Select Date"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: "100%" }}
                />
              </ListItem>
              <List component="div" disablePadding>
                {data.getJobsByDate.map((job, index) => (
                  <ListItemButton
                    key={index}
                    sx={{ pl: 4 }}
                    onClick={() => handleJobSelect(job)}
                  >
                    <ListItemText
                      primary={`${job.account[0].names[0]} - ${job.startTime}`}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            {["History", "Create", "Equiptment"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <MailIcon /> : <InboxIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["Billing", "Availability", "Time Off"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        {selectedJob && selectedJob.serviceType === "Move" && (
          <MoveSheet job={selectedJob} />
        )}
      </Box>
    </>
  );
}
