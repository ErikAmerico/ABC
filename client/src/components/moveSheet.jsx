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
  console.log(job);

  const [makitaNumber, setMakitaNumber] = useState("0");
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const [safeJackAmount, setSafeJackAmount] = useState("0");
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

  const [equipmentData, setEquipmentData] = useState({
    dolly: job?.equipment.dolly || 0,
    comp: job?.equipment.comp || 0,
    panel: job?.equipment.panel || 0,
    library: job?.equipment.library || 0,
    bin: job?.equipment.bin || 0,
    techBin: job?.equipment.techBin || 0,
    trashBin: job?.equipment.trashBin || 0,
    tool: job?.equipment.tool || "",
    // makitaCount: job?.equipment.makitaCount || 0,
    // makita: [job?.equipment.makita] || [],
    ramp14: job?.equipment.ramp14 || 0,
    ramp10: job?.equipment.ramp10 || 0,
    ramp8: job?.equipment.ramp8 || 0,
    ramp6: job?.equipment.ramp6 || 0,
    platform: job?.equipment.platform || 0,
    steelPlate: job?.equipment.steelPlate || 0,
    hoodLift: job?.equipment.hoodLift || 0,
    safeJackCount: job?.equipment.safeJackCount || 0,
    // safeJack: [job?.equipment.safeJack] || [],
    palletJack: job?.equipment.palletJack || 0,
    skinnyJack: job?.equipment.skinnyJack || 0,
    jBar: job?.equipment.jBar || 0,
    bigRed: job?.equipment.bigRed || 0,
    masonite4: job?.equipment.masonite4 || 0,
    masonite8: job?.equipment.masonite8 || 0,
    ductTape: job?.equipment.ductTape || 0,
    blueTape: job?.equipment.blueTape || 0,
    coroflex: job?.equipment.coroflex || "",
    carpetGuard: job?.equipment.carpetGuard,
    broom: job?.equipment.broom,
    allenSet: job?.equipment.allenSet,
    bitBox: job?.equipment.bitBox,
    socketSet: job?.equipment.socketSet,
    foamAcknowledge: job?.equipment.foamAcknowledge,
    foam1L: job?.equipment.foam1L || "",
    foam1S: job?.equipment.foam1S || "",
    foam2L: job?.equipment.foam2L || "",
    foam2S: job?.equipment.foam2S || "",
    white: job?.equipment.white || "",
    carpetRiser: job?.equipment.carpetRiser || 0,
    rubberRiser: job?.equipment.rubberRiser || 0,
    other: job.equipment.other || "",
  });

  useEffect(() => {
    console.log("Job prop has changed, equipment:", job);
    setEquipmentData((prevEquipmentData) => ({
      ...prevEquipmentData,
      dolly: job.equipment.dolly || 0,
      comp: job.equipment.comp || 0,
      panel: job.equipment.panel || 0,
      library: job.equipment.library || 0,
      bin: job.equipment.bin || 0,
      techBin: job.equipment.techBin || 0,
      trashBin: job.equipment.trashBin || 0,
      tool: job.equipment.tool || "",
      // makitaCount: job.equipment.makitaCount || 0,
      // makita: [job.equipment.makita] || [],
      ramp14: job.equipment.ramp14 || 0,
      ramp10: job.equipment.ramp10 || 0,
      ramp8: job.equipment.ramp8 || 0,
      ramp6: job.equipment.ramp6 || 0,
      platform: job.equipment.platform || 0,
      steelPlate: job.equipment.steelPlate || 0,
      hoodLift: job.equipment.hoodLift || 0,
      safeJackCount: job.equipment.safeJackCount || 0,
      // safeJack: [job.equipment.safeJack] || [],
      palletJack: job.equipment.palletJack || 0,
      skinnyJack: job.equipment.skinnyJack || 0,
      jBar: job.equipment.jBar || 0,
      bigRed: job.equipment.bigRed || 0,
      masonite4: job.equipment.masonite4 || 0,
      masonite8: job.equipment.masonite8 || 0,
      ductTape: job.equipment.ductTape || 0,
      blueTape: job.equipment.blueTape || 0,
      coroflex: job.equipment.coroflex || "",
      carpetGuard: job.equipment.carpetGuard,
      broom: job.equipment.broom,
      allenSet: job.equipment.allenSet,
      bitBox: job.equipment.bitBox,
      socketSet: job.equipment.socketSet,
      foamAcknowledge: job.equipment.foamAcknowledge,
      foam1L: job.equipment.foam1L || "",
      foam1S: job.equipment.foam1S || "",
      foam2L: job.equipment.foam2L || "",
      foam2S: job.equipment.foam2S || "",
      white: job.equipment.white || "",
      carpetRiser: job.equipment.carpetRiser || 0,
      rubberRiser: job.equipment.rubberRiser || 0,
      other: job.equipment.other || "",
    }));
  }, [job]);

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
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: finalValue,
    }));

    const jobInput = {
      [name]: finalValue,
    };
    updateJobDatabase(jobId, jobInput);
  };

  const updateEquipmentDatabase = async (jobId, equipmentData) => {
    console.log("Updating equipment with input:", equipmentData);

    const jobInput = {
      equipment: equipmentData,
    };
    try {
      const response = await updateJob({
        variables: { id: jobId, input: jobInput },
      });
      console.log("Equipment updated successfully:", response);
    } catch (error) {
      console.error("Error updating equipment:", error);
    }
  };

  const handleEquipmentChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue;

    if (type === "number") {
      finalValue = value === "" ? 0 : Math.max(0, parseInt(value, 10));
    } else if (type === "checkbox") {
      finalValue = checked;
    } else {
      finalValue = value;
    }

    setEquipmentData((prevEquipmentData) => ({
      ...prevEquipmentData,
      [name]: finalValue,
    }));

    const equipmentInput = { ...equipmentData, [name]: finalValue };
    updateEquipmentDatabase(jobId, equipmentInput);
  };

  const [initialValue, setInitialValue] = useState({});

  const handleFocus = (e) => {
    const { name, value } = e.target;
    setInitialValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value, type } = e.target;

    // Check if the value has changed
    if (initialValue[name] !== value) {
      if (type === "number" && value === "") {
        handleEquipmentChange({ target: { name, value: "0", type } });
      } else if (type === "string" && value === "") {
        handleEquipmentChange({ target: { name, value: "", type } });
      }
    }
  };

  const handleSafeJackCountChange = (newCount) => {
    setEquipmentData((prevData) => {
      const updatedData = { ...prevData, safeJackCount: newCount };
      updateEquipmentDatabase(jobId, updatedData);
      return updatedData;
    });
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
              name="dolly"
              value={equipmentData.dolly === 0 ? "" : equipmentData.dolly}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Computer Carts"
              name="comp"
              value={equipmentData.comp === 0 ? "" : equipmentData.comp}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Panels"
              name="panel"
              value={equipmentData.panel === 0 ? "" : equipmentData.panel}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Library Carts"
              name="library"
              value={equipmentData.library === 0 ? "" : equipmentData.library}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Bins"
              name="bin"
              value={equipmentData.bin === 0 ? "" : equipmentData.bin}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Tech Bins"
              name="techBin"
              value={equipmentData.techBin === 0 ? "" : equipmentData.techBin}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Trash Bins"
              name="trashBin"
              value={equipmentData.trashBin === 0 ? "" : equipmentData.trashBin}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
          </Grid>
          <Grid item xs={1} md={1} sx={{ mt: 1 }}>
            <TextField
              label="Tools"
              name="tool"
              value={equipmentData.tool}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              type="string"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <MakitaField
              value={equipmentData.makitaCount}
              onNumberChange={(e) => setMakitaNumber(e.target.value)}
              onSelectChange={(e) => setMakitaNumber(e.target.value)}
              selectedNumbers={selectedNumbers}
              setSelectedNumbers={setSelectedNumbers}
            />
            <TextField
              label="14' Ramps"
              name="ramp14"
              value={equipmentData.ramp14 === 0 ? "" : equipmentData.ramp14}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="10' Ramps"
              name="ramp10"
              value={equipmentData.ramp10 === 0 ? "" : equipmentData.ramp10}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="8' Ramps"
              name="ramp8"
              value={equipmentData.ramp8 === 0 ? "" : equipmentData.ramp8}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="6' Ramps"
              name="ramp6"
              value={equipmentData.ramp6 === 0 ? "" : equipmentData.ramp6}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={1} md={1} sx={{ mt: 1 }}>
            <TextField
              label="Platform"
              name="platform"
              value={equipmentData.platform === 0 ? "" : equipmentData.platform}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Steel Plate"
              name="steelPlate"
              value={
                equipmentData.steelPlate === 0 ? "" : equipmentData.steelPlate
              }
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Hood Lift"
              name="hoodLift"
              value={equipmentData.hoodLift === 0 ? "" : equipmentData.hoodLift}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <SafeJackField
              value={equipmentData.safeJackCount}
              safeJackAmount={equipmentData.safeJackCount}
              setSafeJackAmount={handleSafeJackCountChange}
              selectedColors={selectedColors} ///original
              setSelectedColors={setSelectedColors}
            />
            <TextField
              label="Pallet Jacks"
              name="palletJack"
              value={
                equipmentData.palletJack === 0 ? "" : equipmentData.palletJack
              }
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Skinny Jack"
              name="skinnyJack"
              value={
                equipmentData.skinnyJack === 0 ? "" : equipmentData.skinnyJack
              }
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={1} md={1} sx={{ mt: 1 }}>
            <TextField
              label="J Bars"
              name="jBar"
              value={equipmentData.jBar === 0 ? "" : equipmentData.jBar}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Big Red"
              name="bigRed"
              value={equipmentData.bigRed === 0 ? "" : equipmentData.bigRed}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Masonite 4'"
              name="masonite4"
              value={
                equipmentData.masonite4 === 0 ? "" : equipmentData.masonite4
              }
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Masonite 8'"
              name="masonite8"
              value={
                equipmentData.masonite8 === 0 ? "" : equipmentData.masonite8
              }
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Duct Tape"
              name="ductTape"
              value={equipmentData.ductTape === 0 ? "" : equipmentData.ductTape}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Blue Tape"
              name="blueTape"
              value={equipmentData.blueTape === 0 ? "" : equipmentData.blueTape}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              type="number"
              variant="outlined"
              sx={{ mr: 0.5 }}
            />
            <TextField
              label="Coroflex"
              name="coroflex"
              value={equipmentData.coroflex}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              type="string"
              variant="outlined"
            />
          </Grid>

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  name="carpetGuard"
                  checked={equipmentData.carpetGuard || false}
                  onChange={handleEquipmentChange}
                />
              }
              label="Carpet Guard"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="broom"
                  checked={equipmentData.broom || false}
                  onChange={handleEquipmentChange}
                />
              }
              label="Broom"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="allenSet"
                  checked={equipmentData.allenSet || false}
                  onChange={handleEquipmentChange}
                />
              }
              label="Allen Set"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="bitBox"
                  checked={equipmentData.bitBox || false}
                  onChange={handleEquipmentChange}
                />
              }
              label="Bit Box"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="socketSet"
                  checked={equipmentData.socketSet || false}
                  onChange={handleEquipmentChange}
                />
              }
              label="Socket Set"
            />
          </FormGroup>
          <FormGroup row sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="foamAcknowledge"
                  checked={equipmentData.foamAcknowledge || false}
                  onChange={handleEquipmentChange}
                />
              }
              label="Foam"
            />
            <Grid item xs={1} md={1}>
              <TextField
                label='1" L'
                name="foam1L"
                value={equipmentData.foam1L}
                onChange={handleEquipmentChange}
                onBlur={handleBlur}
                type="string"
                variant="outlined"
                sx={{ mr: 0.5 }}
              />
              <TextField
                label='1" S'
                name="foam1S"
                value={equipmentData.foam1S}
                onChange={handleEquipmentChange}
                onBlur={handleBlur}
                type="string"
                variant="outlined"
                sx={{ mr: 0.5 }}
              />
              <TextField
                label='2" L'
                name="foam2L"
                value={equipmentData.foam2L}
                onChange={handleEquipmentChange}
                onBlur={handleBlur}
                type="string"
                variant="outlined"
                sx={{ mr: 0.5 }}
              />
              <TextField
                label='2" S'
                name="foam2S"
                value={equipmentData.foam2S}
                onChange={handleEquipmentChange}
                onBlur={handleBlur}
                type="string"
                variant="outlined"
                sx={{ mr: 0.5 }}
              />
              <TextField
                label="White"
                name="white"
                value={equipmentData.white}
                onChange={handleEquipmentChange}
                onBlur={handleBlur}
                type="string"
                variant="outlined"
                sx={{ mr: 0.5 }}
              />
              <TextField
                label="Carpet Riser"
                name="carpetRiser"
                value={
                  equipmentData.carpetRiser === 0
                    ? ""
                    : equipmentData.carpetRiser
                }
                onChange={handleEquipmentChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="number"
                variant="outlined"
                sx={{ mr: 0.5 }}
              />
              <TextField
                label="Rubber Riser"
                name="rubberRiser"
                value={
                  equipmentData.rubberRiser === 0
                    ? ""
                    : equipmentData.rubberRiser
                }
                onChange={handleEquipmentChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="number"
                variant="outlined"
              />
            </Grid>
          </FormGroup>

          <Grid item xs={12} md={12} sx={{ mt: 2, mb: 4 }}>
            <TextField
              label="Other"
              name="other"
              value={equipmentData.other}
              onChange={handleEquipmentChange}
              onBlur={handleBlur}
              type="string"
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
                  checked={formData.minInsurance || false}
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
