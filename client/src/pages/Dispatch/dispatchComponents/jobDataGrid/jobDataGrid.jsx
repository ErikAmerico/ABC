import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import TimeInput from "./jobDataGridComponents/timeInput.jsx";
import ServiceDropdown from "./jobDataGridComponents/serviceDropdown.jsx";

import { Button } from "@mui/material";

const JobDataGrid = ({
  rows,
  setRows,
  rowSelectionModel,
  setRowSelectionModel,
  updateJobInDatabase,
  setModalVisible,
  setRemovalDetails,
}) => {
  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
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
      width: 120,
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
      width: 180,
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
      width: 180,
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
                updateJobInDatabase(params.id);
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
                updateJobInDatabase(params.row.id);
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
                updateJobInDatabase(params.id);
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
              //updateJobInDatabase(updatedRows[rowIndex]);
              updateJobInDatabase(params.id);
            }
          }}
        />
      ),
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      width: 95,
      renderCell: (params) => (
        //console.log(params.row),
        <>
          {params.row.id && (
            <Button
              variant="contained"
              //onClick={() => handleSaveJob(params.row.id)}
              color="error"
            >
              {`REMOVE`}
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns.map((column) => ({
        ...column,
        headerClassName: "border-right",
        cellClassName: "border-right",
      }))}
      checkboxSelection
      onRowSelectionModelChange={(newRowSelectionModel) => {
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
  );
};

export default JobDataGrid;
