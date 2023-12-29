import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_JOB } from "../utils/mutations";

import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Box,
  Grid,
} from "@mui/material";

import MakitaField from "./makitaSelection";
import SafeJackField from "./safeJackSelection";

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
  //console.log(job);

  const [makitaNumber, setMakitaNumber] = useState("0");
  const [safeJackAmount, setSafeJackAmount] = useState("0");
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const [updateJob, { updateJobData, updateJobLoading, updateJobError }] =
    useMutation(UPDATE_JOB, {
      refetchQueries: ["getJobsByDate"],
    });

  const [formData, setFormData] = useState({
    date: job?.date ? formatDate(job.date) : "",
    startTime: job?.startTime || "",
    origin: job?.origin || "",
    destination: job?.destination || "",
    description: job?.description || "",
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
    other: job?.other || "",
    cost: job?.cost || "",
    emailInvoice: job?.emailInvoice || "",
    billTo: job?.billTo || "",
    salesMan: job?.salesMan || "",
    author: job?.author || "",
    poNum: job?.poNum || "",
    projectNum: job?.projectNum || "",
    references: job?.references || "",
    groupBill: job?.groupBill || "",
    prePayment: job?.prePayment || "",
    minInsurance: job?.minInsurance,
    selfInsurance: job?.selfInsurance,
    frcInsurance: job?.frcInsurance,
    holdForCrates: job?.holdForCrates,
    callContactUponArrival: job?.callContactUponArrival,
    callContactWhenLeavingAbc: job?.callContactWhenLeavingAbc,
    callContactWhenClose: job?.callContactWhenClose,
    noCrewCabs: job?.noCrewCabs,
    tailgate: job?.tailgate,
    truck100: job?.truck100,
    openBack: job?.openBack,
    stairs: job?.stairs,
    toolTime: job?.toolTime,
    materialSheet: job?.materialSheet,
    bostonCrateSheet: job?.bostonCrateSheet,
    parkingPermits: job?.parkingPermits,
    directions: job?.directions,
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
        description: job.description || "",
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
        other: job.other || "",
        cost: job.cost || "",
        emailInvoice: job.emailInvoice || "",
        billTo: job.billTo || "",
        salesMan: job.salesMan || "",
        author: job.author || "",
        poNum: job.poNum || "",
        projectNum: job.projectNum || "",
        references: job.references || "",
        groupBill: job.groupBill || "",
        prePayment: job.prePayment || "",
        minInsurance: job.minInsurance,
        selfInsurance: job.selfInsurance,
        frcInsurance: job.frcInsurance,
        holdForCrates: job.holdForCrates,
        callContactUponArrival: job.callContactUponArrival,
        callContactWhenLeavingAbc: job.callContactWhenLeavingAbc,
        callContactWhenClose: job.callContactWhenClose,
        noCrewCabs: job.noCrewCabs,
        tailgate: job.tailgate,
        truck100: job.truck100,
        openBack: job.openBack,
        stairs: job.stairs,
        toolTime: job.toolTime,
        materialSheet: job.materialSheet,
        bostonCrateSheet: job.bostonCrateSheet,
        parkingPermits: job.parkingPermits,
        directions: job.directions,
      }));
    }
  }, [job]);

  const [equipmentList, setEquipmentList] = useState([
    { name: "", quantity: "" },
  ]);

  const jobId = job.id;

  const updateJobDatabase = async (jobId, jobInput) => {
    console.log("Updating job with input:", jobInput);
    try {
      const response = await updateJob({
        variables: { id: jobId, input: jobInput },
      });
      console.log("Job updated successfully:", response);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleChange = (e) => {
    //const { name, value } = e.target;
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      //[name]: value,
      [name]: finalValue,
    }));

    if (name === "description") {
      const jobInput = {
        //description: formData.description,
        [name]: value,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "other") {
      const jobInput = {
        [name]: value,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "cost") {
      const jobInput = {
        [name]: value,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "emailInvoice") {
      const jobInput = {
        [name]: value,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "billTo") {
      const jobInput = {
        [name]: value,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "salesMan") {
      const jobInput = {
        [name]: value,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "author") {
      const jobInput = {
        [name]: value,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "poNum") {
      const jobInput = {
        [name]: value,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "projectNum") {
      const jobInput = {
        [name]: value,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "references") {
      const jobInput = {
        [name]: value,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "groupBill") {
      const jobInput = {
        [name]: value,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "prePayment") {
      const jobInput = {
        [name]: value,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "minInsurance") {
      const jobInput = {
        //[name]: value,
        minInsurance: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "selfInsurance") {
      const jobInput = {
        selfInsurance: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "frcInsurance") {
      const jobInput = {
        frcInsurance: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "holdForCrates") {
      const jobInput = {
        holdForCrates: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "callContactUponArrival") {
      const jobInput = {
        callContactUponArrival: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "callContactWhenLeavingAbc") {
      const jobInput = {
        callContactWhenLeavingAbc: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "callContactWhenClose") {
      const jobInput = {
        callContactWhenClose: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "noCrewCabs") {
      const jobInput = {
        noCrewCabs: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "tailgate") {
      const jobInput = {
        tailgate: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "truck100") {
      const jobInput = {
        truck100: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "openBack") {
      const jobInput = {
        openBack: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "stairs") {
      const jobInput = {
        stairs: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "toolTime") {
      const jobInput = {
        toolTime: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "materialSheet") {
      const jobInput = {
        materialSheet: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "bostonCrateSheet") {
      const jobInput = {
        bostonCrateSheet: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "parkingPermits") {
      const jobInput = {
        parkingPermits: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    } else if (name === "directions") {
      const jobInput = {
        directions: finalValue,
      };
      updateJobDatabase(jobId, jobInput);
    }
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
                control={
                  <Checkbox
                    name="callContactUponArrival"
                    checked={formData.callContactUponArrival || false}
                    onChange={handleChange}
                  />
                }
                label="Call Contact Upon Arrival"
                sx={{ marginRight: 2, mb: 6 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="callContactWhenLeavingAbc"
                    checked={formData.callContactWhenLeavingAbc || false}
                    onChange={handleChange}
                  />
                }
                label="Call Contact When Leaving ABC"
                sx={{ marginRight: 2, mb: 6 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="callContactWhenClose"
                    checked={formData.callContactWhenClose || false}
                    onChange={handleChange}
                  />
                }
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
                      checked={formData.noCrewCabs || false}
                      onChange={handleChange}
                      name="noCrewCabs"
                    />
                  }
                  label="No Crew Cabs"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.tailgate || false}
                      onChange={handleChange}
                      name="tailgate"
                    />
                  }
                  label="Tailgate"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.truck100 || false}
                      onChange={handleChange}
                      name="truck100"
                    />
                  }
                  label="Truck 100"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.openBack || false}
                      onChange={handleChange}
                      name="openBack"
                    />
                  }
                  label="Open Back"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.stairs || false}
                      onChange={handleChange}
                      name="stairs"
                    />
                  }
                  label="Stairs"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.toolTime || false}
                      onChange={handleChange}
                      name="toolTime"
                    />
                  }
                  label="Tool Time"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.materialSheet || false}
                      onChange={handleChange}
                      name="materialSheet"
                    />
                  }
                  label="Material Sheet"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.bostonCrateSheet || false}
                      onChange={handleChange}
                      name="bostonCrateSheet"
                    />
                  }
                  label="Boston Crate Sheet"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.parkingPermits || false}
                      onChange={handleChange}
                      name="parkingPermits"
                    />
                  }
                  label="Parking Permits"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.directions || false}
                      onChange={handleChange}
                      name="directions"
                    />
                  }
                  label="Directions"
                />
                <TextField
                  label="Job Description"
                  name="description"
                  variant="outlined"
                  multiline
                  rows={8}
                  value={formData.description}
                  onChange={handleChange}
                  //onChange={handleDescriptionChange}
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
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Computer Carts"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Panels"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Library Carts"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Bins"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Tech Bins"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Trash Bins"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
          </Grid>
          <Grid item xs={1} md={1} sx={{ mt: 1 }}>
            <TextField label="Tools" variant="outlined" sx={{ mr: 0.5 }} />
            <MakitaField
              value={makitaNumber}
              onNumberChange={(e) => setMakitaNumber(e.target.value)}
              onSelectChange={(e) => setMakitaNumber(e.target.value)}
              selectedNumbers={selectedNumbers}
              setSelectedNumbers={setSelectedNumbers}
            />
            <TextField
              label="14' Ramps"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="10' Ramps"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="8' Ramps"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField label="6' Ramps" type="number" variant="outlined" />
          </Grid>
          <Grid item xs={1} md={1} sx={{ mt: 1 }}>
            <TextField
              label="Platform"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Steel Plate"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Hood Lift"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <SafeJackField
              value={safeJackAmount}
              onNumberChange={(e) => setSafeJackAmount(e.target.value)}
              onSelectChange={(e) => setSafeJackAmount(e.target.value)}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
            />
            <TextField
              label="Pallet Jacks"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField label="Skinny Jack" type="number" variant="outlined" />
          </Grid>
          <Grid item xs={1} md={1} sx={{ mt: 1 }}>
            <TextField
              label="J Bars"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Big Red"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Masonite 4'"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Masonite 8'"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Duct Tape"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Blue Tape"
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
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
                type="number"
                variant="outlined"
                sx={{ mr: 0.5 }}
              />
              <TextField
                label="Rubber Riser"
                type="number"
                variant="outlined"
              />
            </Grid>
          </FormGroup>

          <Grid item xs={12} md={12} sx={{ mt: 2, mb: 4 }}>
            <TextField
              label="Other"
              name="other"
              value={formData.other}
              onChange={handleChange}
              fullWidth
            ></TextField>
          </Grid>

          <h2>Billing: </h2>

          <FormGroup sx={{ mt: 5, mb: 5 }} row>
            <span>Insurance:</span>
            <FormControlLabel
              control={
                <Checkbox
                  name="minInsurance"
                  //value={formData.minInsurance}
                  checked={formData.minInsurance || false} // if minInsurance is undefined, set to false
                  onChange={handleChange}
                />
              }
              label="Minumum"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="selfInsurance"
                  checked={formData.selfInsurance || false}
                  onChange={handleChange}
                />
              }
              label="Self"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="frcInsurance"
                  checked={formData.frcInsurance || false}
                  onChange={handleChange}
                />
              }
              label="F.R.C"
            />

            <Grid item xs={12} md={12}>
              <TextField
                label="Cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                sx={{ width: "150%" }}
              />
            </Grid>
            <TextField
              label="Please Email Invoice to"
              name="emailInvoice"
              value={formData.emailInvoice}
              onChange={handleChange}
              multiline
              rows={2}
              sx={{ ml: 50, width: "30%" }}
            />
          </FormGroup>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormGroup>
                <TextField
                  label="Bill To"
                  name="billTo"
                  value={formData.billTo}
                  onChange={handleChange}
                  multiline
                  rows={6}
                  variant="outlined"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      name="holdForCrates"
                      checked={formData.holdForCrates || false}
                      onChange={handleChange}
                    />
                  }
                  label="Hold For Crates"
                  sx={{ mb: 4 }}
                />
                <TextField
                  label="Salesman"
                  name="salesMan"
                  value={formData.salesMan}
                  onChange={handleChange}
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  sx={{ mb: 1 }}
                />
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
                <TextField
                  label="PO #"
                  name="poNum"
                  value={formData.poNum}
                  onChange={handleChange}
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Project #"
                  name="projectNum"
                  value={formData.projectNum}
                  onChange={handleChange}
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="References"
                  name="references"
                  value={formData.references}
                  onChange={handleChange}
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Group Bill"
                  name="groupBill"
                  value={formData.groupBill}
                  onChange={handleChange}
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Pre Payment"
                  name="prePayment"
                  value={formData.prePayment}
                  onChange={handleChange}
                  sx={{ mb: 1 }}
                />
              </FormGroup>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
