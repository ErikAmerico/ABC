import React from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  FormGroup,
} from "@mui/material";

const InitialInfoSection = ({ formData, handleChange }) => {
  return (
    <>
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
    </>
  );
};

export default InitialInfoSection;
