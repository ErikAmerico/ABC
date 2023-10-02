import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./dispatch.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";

const columns = [
  { field: "truckVan", headerName: "Truck/Van", width: 100 },
  { field: "account", headerName: "Account", width: 130 },
  { field: "contact", headerName: "Contact", width: 130 },
  { field: "origin", headerName: "Origin", width: 90 },
  { field: "destination", headerName: "Destination", width: 130 },
  { field: "serviceType", headerName: "Type of Service", width: 130 },
  { field: "crewsize", headerName: "Crew Size", width: 130 },
  { field: "leaveABC", headerName: "Leave ABC", width: 130 },
  { field: "crewMembers", headerName: "Crew Members", width: 200 },
  { field: "remarks", headerName: "Remarks", width: 130 },
];

// valueGetter: (params) =>
// `${params.row.firstName || ""} ${params.row.lastName || ""}`

export default function Dispatch() {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      truckVan: `Truck ${rows.length + 1}`,
      account: `Account ${String.fromCharCode(65 + rows.length)}`,
      contact: "New Contact",
      origin: `City ${String.fromCharCode(65 + rows.length)}`,
      destination: `City ${String.fromCharCode(65 + ((rows.length + 1) % 26))}`,
      serviceType: "New Service",
      crewsize: 1,
      leaveABC: "9:00 AM",
      crewMembers: "New Member",
      remarks: "N/A",
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  return (
    <>
      <div className="appContainer">
        <div
          style={{
            height: 600,
            width: "100%",
            overflowY: "auto",
          }}
          className="dispatchContainerDiv"
        >
          <DataGrid
            rows={rows}
            columns={columns.map((column) => ({
              ...column,
              headerClassName: "border-right",
              cellClassName: "border-right",
            }))}
            checkboxSelection
            hideFooter
            className="myDataGrid"
          />
        </div>
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
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button onClick={addRow} variant="contained" color="primary">
            Add Job
          </Button>
        </div>
      </div>
    </>
  );
}
