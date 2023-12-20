import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Box,
  Grid,
} from "@mui/material";

function formatDate(timestamp) {
  // Create a date object from the timestamp
  const d = new Date(Number(timestamp));

  // Adjust for timezone offset
  const timeOffsetInMS = d.getTimezoneOffset() * 60000;
  d.setTime(d.getTime() + timeOffsetInMS);

  // Get local date parts
  let month = "" + (d.getMonth() + 1); // getMonth() is zero-indexed
  let day = "" + d.getDate();
  const year = d.getFullYear();

  // Pad single digit month and day with leading zero
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("-");
}

export default function MoveSheet({ job }) {
  console.log(job);

  const [formData, setFormData] = useState({
    date: job?.date ? formatDate(job.date) : "",
    startTime: job?.startTime || "",
    origin: job?.origin || "",
    destination: job?.destination || "",
    account: job?.account.map((account) => `${account.names[0]}`) || "",
    remarks: job?.remarks || "",
    contact:
      job?.contact.map(
        (contact) => `${contact.firstName} ${contact.lastName}`
      ) || "",
    contactPhone: job?.contact.map((contact) => `${contact.phone}`) || "",
    crewSize: job?.crewSize || "",
    trucks: job?.trucks.map((truck) => truck.number).join(", ") || "",
    vans: job?.vans.map((van) => van.number).join(", ") || "",
    supervisors:
      job?.supervisors
        .map((supervisor) => `${supervisor.firstName} ${supervisor.lastName}`)
        .join(", ") || "",
    drivers:
      job?.drivers
        .map((driver) => `${driver.firstName} ${driver.lastName}`)
        .join(", ") || "",
    helpers:
      job?.helpers
        .map((helper) => `${helper.firstName} ${helper.lastName}`)
        .join(", ") || "",
    techs:
      job?.techs
        .map((tech) => `${tech.firstName} ${tech.lastName}`)
        .join(", ") || "",
  });

  useEffect(() => {
    console.log("Job prop has changed:", job);

    if (job) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        date: job.date ? formatDate(job.date) : "",
        startTime: job.startTime || "",
        origin: job.origin || "",
        destination: job.destination || "",
        account: job.account.map((account) => `${account.names[0]}`) || "",
        remarks: job.remarks || "",
        contact:
          job.contact.map(
            (contact) => `${contact.firstName} ${contact.lastName}`
          ) || "",
        crewSize: job.crewSize || "",
        trucks: job.trucks.map((truck) => truck.number).join(", ") || "",
        vans: job.vans.map((van) => van.number).join(", ") || "",
        supervisors:
          job.supervisors
            .map(
              (supervisor) => `${supervisor.firstName} ${supervisor.lastName}`
            )
            .join(", ") || "",
        drivers:
          job.drivers
            .map((driver) => `${driver.firstName} ${driver.lastName}`)
            .join(", ") || "",
        helpers:
          job.helpers
            .map((helper) => `${helper.firstName} ${helper.lastName}`)
            .join(", ") || "",
        techs:
          job.techs
            .map((tech) => `${tech.firstName} ${tech.lastName}`)
            .join(", ") || "",
      }));
    }
  }, [job]);

  const [equipmentList, setEquipmentList] = useState([
    { name: "", quantity: "" },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEquipmentChange = (index, e) => {
    const { name, value } = e.target;
    const newList = [...equipmentList];
    newList[index][name] = value;
    setEquipmentList(newList);
  };

  const addEquipmentField = () => {
    setEquipmentList([...equipmentList, { name: "", quantity: "" }]);
  };

  const removeEquipmentField = (index) => {
    const newList = [...equipmentList];
    newList.splice(index, 1);
    setEquipmentList(newList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const completeFormData = {
      ...formData,
      equipmentList,
    };
    console.log(completeFormData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        p: 3,
        maxHeight: "calc(95vh - 100px)",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <form>
          <Grid container spacing={3}>
            {/* Left column */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Date"
                variant="outlined"
                value={formData.date}
                sx={{ mb: 2 }}
                fullWidth
              />
              <TextField
                label="Origin"
                InputLabelProps={{
                  style: {
                    fontSize: "1.2rem",
                    border: "1px solid navy",
                    padding: "1px",
                    background: "white",
                    borderRadius: "5px",
                  },
                }}
                variant="outlined"
                value={formData.origin}
                sx={{ mb: 2, backgroundColor: "#8DA9C4", borderRadius: "5px" }}
                fullWidth
              />
              <TextField
                label="Origin Contact"
                InputLabelProps={{
                  style: {
                    fontSize: "1.2rem",
                    border: "1px solid navy",
                    padding: "1px",
                    background: "white",
                    borderRadius: "5px",
                  },
                }}
                variant="outlined"
                value={formData.contact}
                sx={{ mb: 2, backgroundColor: "#8DA9C4", borderRadius: "5px" }}
                fullWidth
              />
              <TextField
                label="Destination"
                InputLabelProps={{
                  style: {
                    fontSize: "1.2rem",
                    border: "1px solid navy",
                    padding: "1px",
                    background: "white",
                    borderRadius: "5px",
                  },
                }}
                variant="outlined"
                value={formData.destination}
                sx={{ mb: 2, backgroundColor: "gray", borderRadius: "5px" }}
                fullWidth
              />
              <TextField
                label="Destination Contact"
                InputLabelProps={{
                  style: {
                    fontSize: "1.2rem",
                    border: "1px solid navy",
                    padding: "1px",
                    background: "white",
                    borderRadius: "5px",
                  },
                }}
                variant="outlined"
                value={formData.contact}
                sx={{ mb: 2, backgroundColor: "gray", borderRadius: "5px" }}
                fullWidth
              />
              <TextField
                label="Crew Size"
                variant="outlined"
                value={formData.crewSize}
                onChange={handleChange}
                sx={{ mb: 2 }}
                fullWidth
              />
              <TextField
                label="Trucks"
                variant="outlined"
                value={formData.trucks}
                onChange={handleChange}
                sx={{ mb: 2 }}
                fullWidth
              />
              <TextField
                label="Vans"
                variant="outlined"
                value={formData.vans}
                onChange={handleChange}
                sx={{ mb: 2 }}
                fullWidth
              />
              <TextField
                label="Supervisors"
                variant="outlined"
                value={formData.supervisors}
                onChange={handleChange}
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid>

            {/* Right column */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Leave ABC"
                variant="outlined"
                value={formData.startTime}
                sx={{ mb: 2, mr: 2 }}
              />
              <TextField
                label="Estimated Time"
                variant="outlined"
                defaultValue="4 Hours"
                sx={{ mb: 2 }}
              />

              <TextField
                label="Origin Contact Phone#"
                InputLabelProps={{
                  style: {
                    fontSize: "1.2rem",
                    border: "1px solid navy",
                    padding: "1px",
                    background: "white",
                    borderRadius: "5px",
                  },
                }}
                variant="outlined"
                defaultValue={formData.contactPhone}
                sx={{ backgroundColor: "#8DA9C4", borderRadius: "5px" }}
                fullWidth
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Call Contact Upon Arrival"
                sx={{ marginRight: 2, mb: 6 }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Call Contact When Leaving ABC"
                sx={{ marginRight: 2, mb: 6 }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Call Contact When Close"
                sx={{ marginRight: 2, mb: 6 }}
              />
              <TextField
                label="Destination Contact Phone#"
                InputLabelProps={{
                  style: {
                    fontSize: "1.2rem",
                    border: "1px solid navy",
                    padding: "1px",
                    background: "white",
                    borderRadius: "5px",
                  },
                }}
                variant="outlined"
                defaultValue={formData.contactPhone}
                sx={{ mb: 2, backgroundColor: "gray", borderRadius: "5px" }}
                fullWidth
              />
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.noCrewCabs}
                      onChange={handleChange}
                      name="noCrewCabs"
                    />
                  }
                  label="No Crew Cabs"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.tailgate}
                      onChange={handleChange}
                      name="tailgate"
                    />
                  }
                  label="Tailgate"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.truck100}
                      onChange={handleChange}
                      name="truck100"
                    />
                  }
                  label="Truck 100"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.openBack}
                      onChange={handleChange}
                      name="openBack"
                    />
                  }
                  label="Open Back"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.stairs}
                      onChange={handleChange}
                      name="stairs"
                    />
                  }
                  label="Stairs"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.toolTime}
                      onChange={handleChange}
                      name="toolTime"
                    />
                  }
                  label="Tool Time"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.materialSheet}
                      onChange={handleChange}
                      name="materialSheet"
                    />
                  }
                  label="Material Sheet"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.bostonCrateSheet}
                      onChange={handleChange}
                      name="bostonCrateSheet"
                    />
                  }
                  label="Boston Crate Sheet"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.parkingPermits}
                      onChange={handleChange}
                      name="parkingPermits"
                    />
                  }
                  label="Parking Permits"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.directions}
                      onChange={handleChange}
                      name="directions"
                    />
                  }
                  label="Directions"
                />
                <TextField
                  label="Job Description"
                  variant="outlined"
                  multiline
                  rows={8}
                  defaultValue=""
                  sx={{ marginBottom: 2, width: "100%" }}
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label="Drivers"
              variant="outlined"
              value={formData.drivers}
              onChange={handleChange}
              sx={{ mb: 2 }}
              fullWidth
            />
            <TextField
              label="Helpers"
              variant="outlined"
              value={formData.helpers}
              onChange={handleChange}
              sx={{ mb: 2 }}
              fullWidth
            />
            <TextField
              label="Techs"
              variant="outlined"
              value={formData.techs}
              onChange={handleChange}
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <h2>Equipment: </h2>
          <Grid item xs={1} md={1}>
            <TextField
              label="4 Wheel Dollies"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Computer Carts"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField label="Panels" variant="outlined" sx={{ mr: 0.5 }} />
            <TextField
              label="Library Carts"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField label="Bins" variant="outlined" sx={{ mr: 0.5 }} />
            <TextField label="Tech Bins" variant="outlined" sx={{ mr: 0.5 }} />
            <TextField label="Trash Bins" variant="outlined" sx={{ mr: 0.5 }} />
          </Grid>
          <Grid item xs={1} md={1} sx={{ mt: 1 }}>
            <TextField label="Tools" variant="outlined" sx={{ mr: 0.5 }} />
            <TextField label="Makita #" variant="outlined" sx={{ mr: 0.5 }} />
            <span>Ramps:</span>
            <TextField label="14'" variant="outlined" sx={{ mr: 0.5 }} />
            <TextField label="10'" variant="outlined" sx={{ mr: 0.5 }} />
            <TextField label="8'" variant="outlined" sx={{ mr: 0.5 }} />
            <TextField label="6'" variant="outlined" />
          </Grid>
          <Grid item xs={1} md={1} sx={{ mt: 1 }}>
            <TextField label="Platform" variant="outlined" sx={{ mr: 0.5 }} />
            <TextField
              label="Steel Plate"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField label="Hood Lift" variant="outlined" sx={{ mr: 0.5 }} />
            <TextField label="Safe Jacks" variant="outlined" sx={{ mr: 0.5 }} />
            <TextField
              label="Pallet Jacks"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField label="Skinny Jack" variant="outlined" />
          </Grid>
          <Grid item xs={1} md={1} sx={{ mt: 1 }}>
            <TextField label="J Bars" variant="outlined" sx={{ mr: 0.5 }} />
            <TextField label="Big Red" variant="outlined" sx={{ mr: 0.5 }} />
            <TextField
              label="Masonite 4'"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Masonite 8'"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField label="Duct Tape" variant="outlined" sx={{ mr: 0.5 }} />
            <TextField label="Blue Tape" variant="outlined" sx={{ mr: 0.5 }} />
            <TextField label="Coroflex" variant="outlined" />
          </Grid>

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={formData.noCrewCabs}
                  // onChange={handleChange}
                  name="carpetGuard"
                />
              }
              label="Carpet Guard"
            />
            <FormControlLabel
              control={<Checkbox name="broom" />}
              label="Broom"
            />
            <FormControlLabel
              control={<Checkbox name="allenSet" />}
              label="Allen Set"
            />
            <FormControlLabel
              control={<Checkbox name="bitBox" />}
              label="Bit Box"
            />
            <FormControlLabel
              control={<Checkbox name="socketSet" />}
              label="Socket Set"
            />
          </FormGroup>
          <FormGroup row sx={{ mt: 2 }}>
            <FormControlLabel control={<Checkbox name="foam" />} label="Foam" />
            <Grid item xs={1} md={1}>
              <TextField label='1" L' variant="outlined" sx={{ mr: 0.5 }} />
              <TextField label='1" S' variant="outlined" sx={{ mr: 0.5 }} />
              <TextField label='2" L' variant="outlined" sx={{ mr: 0.5 }} />
              <TextField label='2" S' variant="outlined" sx={{ mr: 0.5 }} />
              <TextField label="White" variant="outlined" sx={{ mr: 0.5 }} />
              <TextField
                label="Carpet Riser"
                variant="outlined"
                sx={{ mr: 0.5 }}
              />
              <TextField label="Rubber Riser" variant="outlined" />
            </Grid>
          </FormGroup>

          <Grid item xs={12} md={12} sx={{ mt: 2, mb: 4 }}>
            <TextField label="Other" fullWidth></TextField>
          </Grid>

          <h2>Billing: </h2>

          <FormGroup sx={{ mt: 5, mb: 5 }} row>
            <span>Insurance:</span>
            <FormControlLabel
              control={<Checkbox name="minimumInsurance" />}
              label="Minumum"
            />
            <FormControlLabel
              control={<Checkbox name="selfInsurance" />}
              label="Self"
            />
            <FormControlLabel
              control={<Checkbox name="frcInsurance" />}
              label="F.R.C"
            />

            <Grid item xs={12} md={12}>
              <TextField label="Cost" fullWidth />
            </Grid>
          </FormGroup>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormGroup>
                <TextField
                  label="Bill To"
                  multiline
                  rows={6}
                  variant="outlined"
                />

                <FormControlLabel
                  control={<Checkbox name="holdForCrates" />}
                  label="Hold For Crates"
                  sx={{ mb: 4 }}
                />
                <TextField label="Salesman" sx={{ mb: 1 }} />
                <TextField label="Author" sx={{ mb: 1 }} />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormGroup
                sx={{
                  border: "1px solid black",
                  padding: 2,
                  borderRadius: 5,
                }}
              >
                <TextField label="PO #" sx={{ mb: 1 }} />
                <TextField label="Project #" sx={{ mb: 1 }} />
                <TextField label="References" sx={{ mb: 1 }} />
                <TextField label="Group Bill" sx={{ mb: 1 }} />
                <TextField label="Pre Payment" sx={{ mb: 1 }} />
              </FormGroup>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
