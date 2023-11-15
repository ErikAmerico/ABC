import * as React from "react";
import { useState, useRef, useEffect } from "react";
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
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_JOB } from "../utils/mutations.js";
import { FETCH_JOBS_BY_DATE } from "../utils/queries";

function formatDate(date) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export default function Dispatch() {
  const { rows, setRows } = useGlobalContext();
  const { rowSelectionModel, setRowSelectionModel } = useGlobalContext();
  //const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [selectedDate, setSelectedDate] = useState(
    formatDate(new Date(Date.now() + 86400000))
  );

  // Should learn about subscriptions(in place of refetchQueries?) as the job data will potentially be updated in real-time by multiple users
  const [createJob, { createJobData, createJobLoading, createJobError }] =
    useMutation(CREATE_JOB, {
      refetchQueries: ["getJobsByDate"],
    });

  console.log(rows);

  const [modalVisible, setModalVisible] = useState(false);
  const [removalDetails, setRemovalDetails] = useState({ id: null, name: "" });

  console.log(removalDetails);

  const { data, loading, error } = useQuery(FETCH_JOBS_BY_DATE, {
    variables: { date: selectedDate.toString().split("T")[0] },
  });

  useEffect(() => {
    if (data && data.getJobsByDate) {
      const transformedJobs = data.getJobsByDate.map((job) => {
        return {
          id: job.id,
          truckVan: [...job.trucks, ...job.vans].map((vehicle) => ({
            id: vehicle.id,
            role: vehicle.roles[0],
            number: vehicle.number.toString(),
          })),
          account: job.account.map((account) => ({
            id: account.id,
            name: account.names[0],
          })),
          contact: job.contact.map((contact) => ({
            id: contact.id,
            name: `${contact.firstName} ${contact.lastName}`,
          })),
          origin: job.origin,
          destination: job.destination,
          serviceType: job.serviceType,
          crewsize: {
            count: job.crewSize,
            supervisors: job.supervisors.map((supervisor) => ({
              id: supervisor.id,
              initials: `${supervisor.firstName[0].toUpperCase()}${supervisor.lastName[0].toUpperCase()}`,
            })),
          },
          leaveABC: job.startTime,
          crewMembers: [
            {
              role: "Driver",
              names: job.drivers.map((driver) => ({
                id: driver.id,
                name: `${driver.firstName} ${driver.lastName}`,
              })),
            },
            {
              role: "Helper",
              names: job.helpers.map((helper) => ({
                id: helper.id,
                name: `${helper.firstName} ${helper.lastName}`,
              })),
            },
            {
              role: "Tech",
              names: job.techs.map((tech) => ({
                id: tech.id,
                name: `${tech.firstName} ${tech.lastName}`,
              })),
            },
          ],
          remarks: job.remarks,
        };
      });
      setRows(transformedJobs);
    }
  }, [data]);

  //console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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

  const handleSaveJob = async (selectedRowId) => {
    const selectedRow = rows.find((row) => row.id === selectedRowId);

    let drivers = [];
    let helpers = [];
    let techs = [];

    selectedRow.crewMembers.forEach((member) => {
      if (member.role === "Driver") {
        drivers = member.names.map((name) => name.id);
      } else if (member.role === "Helper") {
        helpers = member.names.map((name) => name.id);
      } else if (member.role === "Tech") {
        techs = member.names.map((name) => name.id);
      }
    });

    const jobInput = {
      date: selectedDate,
      startTime: selectedRow.leaveABC,
      origin: selectedRow.origin,
      destination: selectedRow.destination,
      crewSize: selectedRow.crewsize.count,
      serviceType: selectedRow.serviceType,
      supervisors: selectedRow.crewsize.supervisors.map(
        (supervisor) => supervisor.id
      ),
      drivers,
      helpers,
      techs,
      remarks: selectedRow.remarks,
      trucks: selectedRow.truckVan
        .filter((item) => item.role === "Truck")
        .map((truckObj) => truckObj.id),
      vans: selectedRow.truckVan
        .filter((item) => item.role === "Van")
        .map((vanObj) => vanObj.id),
      account: selectedRow.account[0].id,
      contact: selectedRow.contact.map((contact) => contact.id),
    };

    try {
      const response = await createJob({
        variables: { input: jobInput },
      });
      //console.log(response);
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const columns = [
    {
      field: "truckVan",
      headerName: "Truck/Van",
      width: 100,
      renderCell: (params) => {
        const renderVehicles = (roleChar, vehicles) => {
          const chunks = chunkArray(vehicles, 2);
          return chunks.map((chunk, index) => (
            <div key={index}>
              {index === 0 ? `${roleChar}) ` : "--- "}
              {chunk.map((vehicle, vehicleIndex) => (
                <span
                  key={`${vehicle.id}-${index}-${vehicleIndex}`}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setRemovalDetails({
                      id: params.id,
                      name: vehicle,
                      type: "truckVan",
                    });
                    setModalVisible(true);
                  }}
                >
                  {vehicle}
                  {vehicleIndex !== chunk.length - 1 && ", "}
                </span>
              ))}
            </div>
          ));
        };

        const trucks = params.value
          .filter((item) => item.role === "Truck")
          .flatMap((item) => item.number);
        const vans = params.value
          .filter((item) => item.role === "Van")
          .flatMap((item) => item.number);

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
      renderCell: (params) => {
        return (
          <div>
            {params.value.map((account, index) => (
              <div key={index}>{account.name}</div>
            ))}
          </div>
        );
      },
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.value.map((contact, index) => (
              <div
                key={index}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setRemovalDetails({
                    id: params.id,
                    name: contact,
                    type: "contact",
                  });
                  setModalVisible(true);
                }}
              >
                {contact.name}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      field: "origin",
      headerName: "Origin",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.value.map((origin, index) => (
              <div
                key={index}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setRemovalDetails({
                    id: params.id,
                    name: origin,
                    type: "origin",
                  });
                  setModalVisible(true);
                }}
              >
                {origin}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      field: "destination",
      headerName: "Destination",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.value.map((destination, index) => (
              <div
                key={index}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setRemovalDetails({
                    id: params.id,
                    name: destination,
                    type: "destination",
                  });
                  setModalVisible(true);
                }}
              >
                {destination}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      field: "serviceType",
      headerName: "Type of Service",
      width: 130,
      renderCell: (params) => {
        return (
          <ServiceDropdown
            value={params.value || "Move"}
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
        const supervisorInitials =
          params.value?.supervisors?.map((supervisor) => supervisor.initials) ||
          [];
        const supervisorChunks = chunkArray(supervisorInitials, 2);
        return (
          <div>
            {supervisorChunks.map((chunk, cIndex) => (
              <span key={cIndex}>
                {chunk.map((supervisor, sIndex) => (
                  <span
                    key={sIndex}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRemovalDetails({
                        id: params.id,
                        initials: supervisor,
                        name: params.value.supervisors.find(
                          (supervisorObj) =>
                            supervisorObj.initials === supervisor
                        ),
                        type: "supervisor",
                      });
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
            {params.value?.supervisors?.length > 0 && " +"}
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
                        //let parts = name.name.split(" ");
                        let parts =
                          name && name.name ? name.name.split(" ") : []; // this is a temporary fix for the error

                        let lastNameInitial =
                          parts.length > 1 ? parts[1].charAt(0) + "" : "";
                        return (
                          <span
                            key={nIndex}
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setRemovalDetails({
                                id: params.id,
                                name: name,
                                type: "crewMember",
                              });
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
    {
      field: "remarks",
      headerName: "Remarks",
      width: 205,
      renderCell: (params) => (
        <textarea
          value={params.value || ""}
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            resize: "none",
            whiteSpace: "pre-wrap",
            overflow: "hidden",
            padding: "4px",
          }}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            const rowIndex = rows.findIndex((row) => row.id === params.id);
            if (rowIndex !== -1) {
              const updatedRows = [...rows];
              updatedRows[rowIndex].remarks = e.target.value;
              setRows(updatedRows);
            }
          }}
        />
      ),
    },
    {
      field: "save",
      headerName: "",
      sortable: false,
      width: 125,
      renderCell: (params) => (
        //console.log(params.row),
        <>
          {params.row.id && (
            <Button
              variant="contained"
              onClick={() => handleSaveJob(params.row.id)}
              color="inherit"
            >
              {`SAVE JOB`}
            </Button>
          )}
        </>
      ),
    },
  ];

  const addRow = () => {
    const newRow = {
      truckVan: [],
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
      remarks: "",
      id: rows.length + 1,
      rowLength: 10,
    };
    setRows((prevRows) => [...prevRows, newRow]);
    setRowSelectionModel([newRow.id]);
  };

  const confirmRemove = () => {
    const rowIndex = rows.findIndex((row) => row.id === removalDetails.id);

    if (rowIndex !== -1) {
      const updatedRow = { ...rows[rowIndex] };
      //console.log("updatedRow:", updatedRow);

      if (removalDetails.type === "crewMember") {
        updatedRow.crewMembers.forEach((memberRole) => {
          console.log("memberRole.names:", memberRole.names);
          memberRole.names = memberRole.names.filter(
            (member) => member.name !== removalDetails.name.name
          );
        });
      } else if (removalDetails.type === "supervisor") {
        updatedRow.crewsize.supervisors =
          updatedRow.crewsize.supervisors.filter(
            (supervisor) => supervisor.id !== removalDetails.name.id
          );
      } else if (removalDetails.type === "truckVan") {
        updatedRow.truckVan = updatedRow.truckVan.filter(
          (vehicle) => vehicle.number !== removalDetails.name
        );
      } else if (removalDetails.type === "contact") {
        updatedRow.contact = updatedRow.contact.filter(
          (contact) => contact.name !== removalDetails.name.name
        );
      } else if (removalDetails.type === "origin") {
        updatedRow.origin = updatedRow.origin.filter(
          (origin) => origin !== removalDetails.name
        );
      } else if (removalDetails.type === "destination") {
        updatedRow.destination = updatedRow.destination.filter(
          (destination) => destination !== removalDetails.name
        );
      }

      const updatedRows = [...rows];
      updatedRows[rowIndex] = updatedRow;

      setRows(updatedRows);
    }

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
              //console.log("Row Selection Change:", newRowSelectionModel);
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
