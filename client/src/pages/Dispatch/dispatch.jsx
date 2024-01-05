import * as React from "react";
import { useState, useEffect } from "react";
import "./dispatch.css";
import { useGlobalContext } from "../../utils/globalContext.jsx";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_JOB } from "../../utils/mutations.js";
import { FETCH_JOBS_BY_DATE } from "../../utils/queries.js";

import RemoveModal from "./dispatchComponents/removeModal.jsx";
import Footer from "./dispatchComponents/footer.jsx";
import JobDataGrid from "./dispatchComponents/jobDataGrid/jobDataGrid.jsx";

export default function Dispatch() {
  const { rows, setRows } = useGlobalContext();
  const {
    rowSelectionModel,
    setRowSelectionModel,
    setOpen,
    selectedDate,
    setSelectedDate,
  } = useGlobalContext();

  const [updateJob, { updateJobData, updateJobLoading, updateJobError }] =
    useMutation(UPDATE_JOB, {
      refetchQueries: ["getJobsByDate"],
    });

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [removalDetails, setRemovalDetails] = useState({ id: null, name: "" });

  const { data, loading, error, refetch } = useQuery(FETCH_JOBS_BY_DATE, {
    variables: { date: selectedDate.toString().split("T")[0] },
  });

  useEffect(() => {
    refetch();
  }, [selectedDate]);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const updateJobInDatabase = async (selectedRowId) => {
    const selectedRow = rows.find((row) => row.id === selectedRowId);

    console.log("selectedRow:", selectedRow.id);

    const JobInput = {
      //id: selectedRow.id,
      date: selectedDate,
      startTime: selectedRow.leaveABC,
      crewSize: selectedRow.crewsize.count,
      serviceType: selectedRow.serviceType,
      remarks: selectedRow.remarks,
    };

    try {
      const response = await updateJob({
        variables: { id: selectedRow.id, input: JobInput },
      });
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const addRow = async () => {
    toggleDrawer(true)();
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
          <JobDataGrid
            rows={rows}
            setRows={setRows}
            rowSelectionModel={rowSelectionModel}
            setRowSelectionModel={setRowSelectionModel}
            updateJobInDatabase={updateJobInDatabase}
            confirmRemove={confirmRemove}
            setModalVisible={setModalVisible}
            removalDetails={removalDetails}
            setRemovalDetails={setRemovalDetails}
            modalVisible={modalVisible}
          />
        </div>
        <Footer
          addRow={addRow}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
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
