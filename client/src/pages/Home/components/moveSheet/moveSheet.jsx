import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_JOB } from "../../../../utils/mutations";

import { Box } from "@mui/material";

import EquipmentSection from "./components/equipment/equipmentSection";
import BillingSection from "./components/billingSection";
import InitialInfoSection from "./components/initialInfoSection";
import formatDate from "./components/dateFormat";

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
          <InitialInfoSection formData={formData} handleChange={handleChange} />
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
