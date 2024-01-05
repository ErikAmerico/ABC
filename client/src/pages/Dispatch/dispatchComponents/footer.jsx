import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const Footer = ({ addRow, selectedDate, setSelectedDate }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "#f5f5f5",
        position: "sticky",
        bottom: 0,
      }}
    >
      <TableContainer
        component={Paper}
        style={{ marginRight: "16px", maxWidth: "20em" }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Men</TableCell>
              <TableCell>Trucks</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Row 1</TableCell>
              <TableCell>Row 1</TableCell>
              <TableCell>AM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Row 2</TableCell>
              <TableCell>Row 2</TableCell>
              <TableCell>PM</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginRight: "16px" }}>
        <Typography variant="subtitle1">Available</Typography>
        <TextField variant="outlined" multiline rows={3} />
      </div>
      <div style={{ marginRight: "16px" }}>
        <Typography variant="subtitle1">Not Available</Typography>
        <TextField variant="outlined" multiline rows={3} />
      </div>
      <TextField
        label="Date"
        type="date"
        variant="outlined"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button onClick={addRow} variant="contained" color="primary">
        Add Job
      </Button>
    </div>
  );
};

export default Footer;
