import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_JOB } from "../../../../utils/mutations";

import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Box,
  Grid,
} from "@mui/material";

import EquipmentSection from "./components/equipment/equipmentSection";
import BillingSection from "./components/billingSection";

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
    makitaCount: job?.equipment.makitaCount || 0,
    makita: job?.equipment.makita || [],
    ramp14: job?.equipment.ramp14 || 0,
    ramp10: job?.equipment.ramp10 || 0,
    ramp8: job?.equipment.ramp8 || 0,
    ramp6: job?.equipment.ramp6 || 0,
    platform: job?.equipment.platform || 0,
    steelPlate: job?.equipment.steelPlate || 0,
    hoodLift: job?.equipment.hoodLift || 0,
    safeJackCount: job?.equipment.safeJackCount || 0,
    safeJack: job?.equipment.safeJack || [],
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
      makitaCount: job.equipment.makitaCount || 0,
      makita: job.equipment.makita || [],
      ramp14: job.equipment.ramp14 || 0,
      ramp10: job.equipment.ramp10 || 0,
      ramp8: job.equipment.ramp8 || 0,
      ramp6: job.equipment.ramp6 || 0,
      platform: job.equipment.platform || 0,
      steelPlate: job.equipment.steelPlate || 0,
      hoodLift: job.equipment.hoodLift || 0,
      safeJackCount: job.equipment.safeJackCount || 0,
      safeJack: job.equipment.safeJack || [],
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

  const handleMakitaCountChange = (newCount) => {
    setEquipmentData((prevData) => {
      const updatedData = { ...prevData, makitaCount: newCount };
      updateEquipmentDatabase(jobId, updatedData);
      return updatedData;
    });
  };

  const [isInitialMakitaMount, setIsInitialMakitaMount] = useState(true);

  useEffect(() => {
    if (isInitialMakitaMount) {
      setIsInitialMakitaMount(false);
      return;
    }

    const updatedData = {
      ...equipmentData,
      makita: selectedNumbers.map(Number),
    };
    updateEquipmentDatabase(jobId, updatedData);
  }, [selectedNumbers]);

  useEffect(() => {
    if (job) {
      const initialMakita = Array.isArray(job.equipment.makita)
        ? job.equipment.makita
        : [];
      setSelectedNumbers(initialMakita);
    }
  }, [job]);

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
          <EquipmentSection
            equipmentData={equipmentData}
            handleEquipmentChange={handleEquipmentChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            handleSafeJackCountChange={handleSafeJackCountChange}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            handleMakitaCountChange={handleMakitaCountChange}
            selectedNumbers={selectedNumbers}
            setSelectedNumbers={setSelectedNumbers}
            updateEquipmentDatabase={updateEquipmentDatabase}
            job={job}
            jobId={jobId}
          />
          <h2>Billing: </h2>
          <BillingSection
            formData={formData}
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
          />
        </form>
      </Box>
    </Box>
  );
}