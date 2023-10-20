import * as React from "react";
import { useState, useRef } from "react";
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
import { useGlobalContext } from "../utils/globalContext";
import RemoveModal from "../components/removeModal";

export default function Dispatch() {
  const { rows, setRows } = useGlobalContext();
  const { rowSelectionModel, setRowSelectionModel } = useGlobalContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [removalDetails, setRemovalDetails] = useState({ id: null, name: "" });

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  function TimeInput({ value, onChange }) {
    const [hour, minutePart] = value.split(":");
    const minute = minutePart.split(" ")[0];
    const period = minutePart.split(" ")[1];

    const handleTimeChange = () => {
      const selectedHour = hourRef.current.value;
      const selectedMinute = minuteRef.current.value;
      const selectedPeriod = periodRef.current.value;
      onChange(`${selectedHour}:${selectedMinute} ${selectedPeriod}`);
    };

    const hourRef = useRef(null);
    const minuteRef = useRef(null);
    const periodRef = useRef(null);

    return (
      <div
        style={{ display: "flex", alignItems: "center" }}
        onClick={(e) => e.stopPropagation()}
      >
        <select ref={hourRef} value={hour} onChange={handleTimeChange}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <div style={{ margin: "0 5px" }}>:</div>
        <select ref={minuteRef} value={minute} onChange={handleTimeChange}>
          {["00", "15", "30", "45"].map((min) => (
            <option key={min} value={min}>
              {min}
            </option>
          ))}
        </select>
        <select
          ref={periodRef}
          value={period}
          onChange={handleTimeChange}
          style={{ marginLeft: "5px" }}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    );
  }

  function ServiceDropdown({ value, onChange }) {
    const serviceOptions = [
      "Move",
      "Pull",
      "Crate Delivery",
      "Crate Pickup",
      "Material Delivery",
      "Warehouse",
    ];

    return (
      <select
        value={value}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "130px", position: "relative", right: "7px" }}
      >
        {serviceOptions.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>
    );
  }

  const columns = [
    {
      field: "truckVan",
      headerName: "Truck/Van",
      width: 100,
      renderCell: (params) => {
        const renderVehicles = (roleChar, numbers) => {
          const chunks = chunkArray(numbers, 2);
          return chunks.map((chunk, index) => (
            <div key={index}>
              {index === 0 ? `${roleChar}) ` : "--- "}
              {chunk.join(", ")}
            </div>
          ));
        };

        const trucks = params.value
          .filter((item) => item.role === "Truck")
          .flatMap((item) => item.numbers);
        const vans = params.value
          .filter((item) => item.role === "Van")
          .flatMap((item) => item.numbers);

        return (
          <div>
            {trucks.length > 0 && renderVehicles("T", trucks)}
            {vans.length > 0 && renderVehicles("V", vans)}
          </div>
        );
      },
    },
    {
      field: "account",
      headerName: "Account",
      width: 150,
      renderCell: (params) => params.value.join(", "),
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.value.map((name, index) => (
              <div key={index}>{name}</div>
            ))}
          </div>
        );
      },
    },
    { field: "origin", headerName: "Origin", width: 150 },
    { field: "destination", headerName: "Destination", width: 150 },
    {
      field: "serviceType",
      headerName: "Type of Service",
      width: 130,
      renderCell: (params) => {
        return (
          <ServiceDropdown
            value={params.value || "Move"} // default to "Move" if there's no value
            onChange={(newService) => {
              const rowIndex = rows.findIndex((row) => row.id === params.id);
              if (rowIndex !== -1) {
                const updatedRows = [...rows];
                updatedRows[rowIndex].serviceType = newService;
                setRows(updatedRows);
              }
            }}
          />
        );
      },
    },
    {
      field: "crewsize",
      headerName: "Crew Size",
      width: 130,
      renderCell: (params) => {
        const supervisorChunks = chunkArray(params.value?.supervisors || [], 2);
        return (
          <div>
            {supervisorChunks.map((chunk, cIndex) => (
              <span key={cIndex}>
                {chunk.map((supervisor, sIndex) => (
                  <span
                    key={sIndex}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRemovalDetails({ id: params.id, name: supervisor });
                      setModalVisible(true);
                    }}
                  >
                    {supervisor}
                    {sIndex !== chunk.length - 1 && ", "}
                  </span>
                ))}
                {cIndex !== supervisorChunks.length - 1 && <br />}
              </span>
            ))}
            {params.value?.supervisors.length > 0 && " +"}
            <input
              style={{ width: "30px", marginLeft: "5px" }}
              type="number"
              value={Math.max(params.value?.count || 0, 0)}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => {
                const rowIndex = rows.findIndex(
                  (row) => row.id === params.row.id
                );
                const updatedRows = [...rows];
                updatedRows[rowIndex].crewsize.count = Math.max(
                  parseInt(e.target.value, 10),
                  0
                );
                setRows(updatedRows);
              }}
            />
          </div>
        );
      },
    },
    {
      field: "leaveABC",
      headerName: "Leave ABC",
      width: 200,
      renderCell: (params) => {
        return (
          <TimeInput
            value={params.value || "  :  AM"}
            onChange={(newTime) => {
              const rowIndex = rows.findIndex((row) => row.id === params.id);
              if (rowIndex !== -1) {
                const updatedRows = [...rows];
                updatedRows[rowIndex].leaveABC = newTime;
                setRows(updatedRows);
              }
            }}
          />
        );
      },
    },
    {
      field: "crewMembers",
      headerName: "Crew Members",
      width: 400,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            {params.value
              .filter((member) => member.names.length > 0)
              .map((member) => {
                const chunks = chunkArray(member.names, 6);
                return chunks.map((chunk, index) => {
                  const prefix =
                    index === 0 ? `${member.role.charAt(0)}) ` : "--- ";
                  return (
                    <div key={index}>
                      {prefix}
                      {chunk.map((name, nIndex) => {
                        let parts = name.split(" ");
                        let lastNameInitial =
                          parts.length > 1 ? parts[1].charAt(0) + "" : "";
                        return (
                          <span
                            key={nIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              setRemovalDetails({ id: params.id, name: name });
                              setModalVisible(true);
                            }}
                          >
                            {parts[0] + " " + lastNameInitial}
                            {nIndex !== chunk.length - 1 && ", "}
                          </span>
                        );
                      })}
                    </div>
                  );
                });
              })}
          </div>
        );
      },
    },
    { field: "remarks", headerName: "Remarks", width: 130 },
  ];

  const addRow = () => {
    const newRow = {
      truckVan: [
        { role: "Truck", numbers: [] },
        { role: "Van", numbers: [] },
      ],
      account: [],
      contact: [],
      origin: [],
      destination: [],
      serviceType: "Move",
      crewsize: { supervisors: [], count: 0 },
      leaveABC: "8:00 AM",
      crewMembers: [
        { role: "Driver", names: [] },
        { role: "Helper", names: [] },
        { role: "Tech", names: [] },
      ],
      remarks: "Figure it out",
      id: rows.length + 1,
      rowLength: 10,
    };
    setRows((prevRows) => [...prevRows, newRow]);
    setRowSelectionModel([newRow.id]);
  };

  //Still need to work this out, but this is the general idea.
  const confirmRemove = () => {
    // Find the index of the row to be updated
    const rowIndex = rows.findIndex((row) => row.id === removalDetails.id);

    if (rowIndex !== -1) {
      // Clone the row object to avoid modifying the original row
      const updatedRow = { ...rows[rowIndex] };

      // Check if the removal target is a crew member or supervisor
      if (removalDetails.type === "crewMember") {
        // Find the index of the crew member to be removed
        const memberIndex = updatedRow.crewMembers.findIndex((member) =>
          member.names.includes(removalDetails.name)
        );

        if (memberIndex !== -1) {
          // Remove the crew member from the array
          updatedRow.crewMembers[memberIndex].names = updatedRow.crewMembers[
            memberIndex
          ].names.filter((name) => name !== removalDetails.name);
        }
      } else if (removalDetails.type === "supervisor") {
        // Find the index of the supervisor to be removed
        const supervisorIndex = updatedRow.crewsize.supervisors.findIndex(
          (supervisor) => supervisor === removalDetails.name
        );

        if (supervisorIndex !== -1) {
          // Remove the supervisor from the array
          updatedRow.crewsize.supervisors.splice(supervisorIndex, 1);
        }
      }

      // Create a new rows array with the updated row
      const updatedRows = [...rows];
      updatedRows[rowIndex] = updatedRow;

      // Update the state with the updated rows
      setRows(updatedRows);
    }

    // Reset removalDetails and hide the modal
    setRemovalDetails({ id: null, name: "", type: "" });
    setModalVisible(false);
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
            onCellClick={(params, event) => {
              if (params.field === "crewMembers") {
                event.stopPropagation();
                const clickedValue = params.value[0]?.names[0];
                if (clickedValue) {
                  setRemovalDetails({
                    id: params.id,
                    name: clickedValue,
                    type: "crewMember",
                  });
                  setModalVisible(true);
                }
              } else if (params.field === "crewsize") {
                event.stopPropagation();
                const clickedValue = params.value.supervisors[0];
                if (clickedValue) {
                  setRemovalDetails({
                    id: params.id,
                    name: clickedValue,
                    type: "supervisor",
                  });
                  setModalVisible(true);
                }
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
      </div>
      <RemoveModal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={confirmRemove}
        name={removalDetails.name}
      />
    </>
  );
}
