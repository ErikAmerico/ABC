import React from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";

const BillingSection = ({ formData, handleChange }) => {
  return (
    <>
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
    </>
  );
};

export default BillingSection;
