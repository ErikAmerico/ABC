import React from "react";
import {
  TextField,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import MakitaField from "./components/makitaSelection";
import SafeJackField from "./components/safeJackSelection";

const EquipmentSection = ({
  equipmentData,
  handleEquipmentChange,
  handleBlur,
  handleFocus,
  handleMakitaCountChange,
  handleSafeJackCountChange,
  selectedNumbers,
  setSelectedNumbers,
  selectedColors,
  setSelectedColors,
  updateEquipmentDatabase,
  job,
  jobId,
}) => {
  return (
    <>
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
          makitaCount={equipmentData.makitaCount}
          setMakitaCount={handleMakitaCountChange}
          selectedNumbers={selectedNumbers}
          setSelectedNumbers={setSelectedNumbers}
          handleMakitaCountChange={handleMakitaCountChange}
          updateEquipmentDatabase={updateEquipmentDatabase}
          job={job}
          jobId={jobId}
          equipmentData={equipmentData}
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
          value={equipmentData.steelPlate === 0 ? "" : equipmentData.steelPlate}
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
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          handleSafeJackCountChange={handleSafeJackCountChange}
          updateEquipmentDatabase={updateEquipmentDatabase}
          job={job}
          jobId={jobId}
          equipmentData={equipmentData}
        />
        <TextField
          label="Pallet Jacks"
          name="palletJack"
          value={equipmentData.palletJack === 0 ? "" : equipmentData.palletJack}
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
          value={equipmentData.skinnyJack === 0 ? "" : equipmentData.skinnyJack}
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
          value={equipmentData.masonite4 === 0 ? "" : equipmentData.masonite4}
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
          value={equipmentData.masonite8 === 0 ? "" : equipmentData.masonite8}
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
              equipmentData.carpetRiser === 0 ? "" : equipmentData.carpetRiser
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
              equipmentData.rubberRiser === 0 ? "" : equipmentData.rubberRiser
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
    </>
  );
};

export default EquipmentSection;
