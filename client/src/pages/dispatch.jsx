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
  Typography,
} from "@mui/material";
import DispatchDrawer from "../components/dispatchDrawer";
import { useGlobalContext } from "../utils/globalContext";

export default function Dispatch() {
  //const [rows, setRows] = useState([]);
  const { rows, setRows } = useGlobalContext();
  //const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const { rowSelectionModel, setRowSelectionModel } = useGlobalContext();
  //console.log("rowSelectionModel in dispatch", rowSelectionModel);

  console.log("rows in dispatch", rows);

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const columns = [
    { field: "truckVan", headerName: "Truck/Van", width: 100 },
    { field: "account", headerName: "Account", width: 150 },
    { field: "contact", headerName: "Contact", width: 130 },
    { field: "origin", headerName: "Origin", width: 150 },
    { field: "destination", headerName: "Destination", width: 150 },
    { field: "serviceType", headerName: "Type of Service", width: 130 },
    {
      field: "crewsize",
      headerName: "Crew Size",
      width: 130,
      renderCell: (params) => {
        const supervisorChunks = chunkArray(params.value.supervisors, 2);
        return (
          <div>
            {/* Join each chunk with ', ' and then join the chunks with line breaks */}
            {supervisorChunks.map((chunk, index) => (
              <span key={index}>
                {chunk.join(", ")}
                {/* Add a line break if it's not the last chunk */}
                {index !== supervisorChunks.length - 1 && <br />}
              </span>
            ))}
            +
            <input
              style={{ width: "30px", marginLeft: "5px" }}
              type="number"
              defaultValue={params.value.count}
              onChange={(e) => {
                const rowIndex = rows.findIndex(
                  (row) => row.id === params.row.id
                );
                const updatedRows = [...rows];
                updatedRows[rowIndex].crewsize.count = parseInt(
                  e.target.value,
                  10
                );
                setRows(updatedRows);
              }}
            />
          </div>
        );
      },
    },
    { field: "leaveABC", headerName: "Leave ABC", width: 130 },
    {
      field: "crewMembers",
      headerName: "Crew Members",
      width: 400,
      renderCell: (params) => {
        const rolesString = params.value
          .filter((member) => member.names.length > 0)
          .map((member) => {
            const chunks = chunkArray(member.names, 6);
            return chunks
              .map((chunk, index) => {
                // If it's the first line, use role initial, otherwise use '---'
                const prefix =
                  index === 0 ? `${member.role.charAt(0)}) ` : "--- ";
                return (
                  prefix +
                  chunk
                    .map((name) => {
                      let parts = name.split(" ");
                      let lastNameInitial =
                        parts.length > 1 ? parts[1].charAt(0) + "" : "";
                      return parts[0] + " " + lastNameInitial;
                    })
                    .join(", ")
                );
              })
              .join("<br />");
          })
          .join("<br />");
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
            dangerouslySetInnerHTML={{ __html: rolesString }}
          />
        );
      },
    },
    { field: "remarks", headerName: "Remarks", width: 130 },
  ];

  const addRow = () => {
    const newRow = {
      // id: rows.length + 1,
      // truckVan: `Truck ${rows.length + 1}`,
      // account: `Account ${String.fromCharCode(65 + rows.length)}`,
      // contact: "New Contact",
      // origin: `City ${String.fromCharCode(65 + rows.length)}`,
      // destination: `City ${String.fromCharCode(65 + ((rows.length + 1) % 26))}`,
      // serviceType: "New Service",
      crewsize: { supervisors: [], count: 0 },
      // leaveABC: "9:00 AM",
      crewMembers: [
        { role: "Driver", names: [] },
        { role: "Helper", names: [] },
        { role: "Tech", names: [] },
      ],
      // remarks: "N/A",
      id: rows.length + 1,
      rowLength: 10,
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
            onRowSelectionModelChange={(newRowSelectionModel) => {
              console.log("Row Selection Change:", newRowSelectionModel);
              if (newRowSelectionModel.length > 1) {
                // Only take the last selected row.
                setRowSelectionModel([
                  newRowSelectionModel[newRowSelectionModel.length - 1],
                ]);
              } else {
                setRowSelectionModel(newRowSelectionModel);
              }
            }}
            rowSelectionModel={rowSelectionModel}
            hideFooter
            className="myDataGrid"
            rowHeight={100}
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
        {/* <DispatchDrawer
          selectedRowId={rowSelectionModel[0]}
          rows={rows}
          setRows={setRows}
        /> */}
      </div>
    </>
  );
}
