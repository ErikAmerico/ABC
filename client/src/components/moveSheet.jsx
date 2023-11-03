import React, { useState, useEffect } from "react";

function formatDate(timestamp) {
  // Create a date object from the timestamp
  const d = new Date(Number(timestamp));

  // Adjust for timezone offset
  const timeOffsetInMS = d.getTimezoneOffset() * 60000;
  d.setTime(d.getTime() + timeOffsetInMS);

  // Get local date parts
  let month = "" + (d.getMonth() + 1); // getMonth() is zero-indexed
  let day = "" + d.getDate();
  const year = d.getFullYear();

  // Pad single digit month and day with leading zero
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("-");
}

export default function MoveSheet({ job }) {
  console.log(job);

  const [formData, setFormData] = useState({
    date: job?.date ? formatDate(job.date) : "",
    startTime: job?.startTime || "",
    origin: job?.origin || "",
    destination: job?.destination || "",
    account: job?.account.map((account) => `${account.names[0]}`) || "",
    remarks: job?.remarks || "",
    contact:
      job?.contact.map(
        (contact) => `${contact.firstName} ${contact.lastName}`
      ) || "",
    crewSize: job?.crewSize || "",
    trucks: job?.trucks.map((truck) => truck.number).join(", ") || "",
    vans: job?.vans.map((van) => van.number).join(", ") || "",
    supervisors:
      job?.supervisors
        .map((supervisor) => `${supervisor.firstName} ${supervisor.lastName}`)
        .join(", ") || "",
    drivers:
      job?.drivers
        .map((driver) => `${driver.firstName} ${driver.lastName}`)
        .join(", ") || "",
    helpers:
      job?.helpers.map((helper) => `${helper.firstName} ${helper.lastName}`) ||
      "",
    techs: job?.techs.map((tech) => `${tech.firstName} ${tech.lastName}`) || "",
  });

  useEffect(() => {
    console.log("Job prop has changed:", job);

    if (job) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        date: job.date ? formatDate(job.date) : "",
        startTime: job.startTime || "",
        origin: job.origin || "",
        destination: job.destination || "",
        account: job.account.map((account) => `${account.names[0]}`) || "",
        remarks: job.remarks || "",
        contact:
          job.contact.map(
            (contact) => `${contact.firstName} ${contact.lastName}`
          ) || "",
        crewSize: job.crewSize || "",
        trucks: job.trucks.map((truck) => truck.number).join(", ") || "",
        vans: job.vans.map((van) => van.number).join(", ") || "",
        supervisors:
          job.supervisors
            .map(
              (supervisor) => `${supervisor.firstName} ${supervisor.lastName}`
            )
            .join(", ") || "",
        drivers:
          job.drivers
            .map((driver) => `${driver.firstName} ${driver.lastName}`)
            .join(", ") || "",
        helpers:
          job.helpers.map(
            (helper) => `${helper.firstName} ${helper.lastName}`
          ) || "",
        techs:
          job.techs.map((tech) => `${tech.firstName} ${tech.lastName}`) || "",
      }));
    }
  }, [job]);

  const [equipmentList, setEquipmentList] = useState([
    { name: "", quantity: "" },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEquipmentChange = (index, e) => {
    const { name, value } = e.target;
    const newList = [...equipmentList];
    newList[index][name] = value;
    setEquipmentList(newList);
  };

  const addEquipmentField = () => {
    setEquipmentList([...equipmentList, { name: "", quantity: "" }]);
  };

  const removeEquipmentField = (index) => {
    const newList = [...equipmentList];
    newList.splice(index, 1);
    setEquipmentList(newList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const completeFormData = {
      ...formData,
      equipmentList,
    };
    console.log(completeFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          readOnly
        />
      </label>
      <label>
        Start Time:
        <input
          type="text"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          readOnly
        />
      </label>
      <label>
        Origin:
        <input
          type="text"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          readOnly
        />
      </label>
      <label>
        Destination:
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          readOnly
        />
      </label>
      <label>
        Account:
        <input
          type="text"
          name="account"
          value={formData.account}
          onChange={handleChange}
          readOnly
        />
      </label>
      <label>
        Remarks:
        <input
          type="text"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          readOnly
        />
      </label>
      <label>
        Contact:
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          readOnly
        />
      </label>
      <label>
        Crew Size:
        <input
          type="text"
          name="crewSize"
          value={formData.crewSize}
          onChange={handleChange}
          readOnly
        />
      </label>
      <label>
        Trucks:
        <input
          type="text"
          name="trucks"
          value={formData.trucks}
          onChange={handleChange}
          readOnly
        />
      </label>
      <label>
        Vans:
        <input
          type="text"
          name="vans"
          value={formData.vans}
          onChange={handleChange}
          readOnly
        />
      </label>
      <label>
        Supervisors:
        <input
          type="text"
          name="supervisors"
          value={formData.supervisors}
          onChange={handleChange}
          readOnly
        />
      </label>
      <label>
        Drivers:
        <input
          type="text"
          name="drivers"
          value={formData.drivers}
          onChange={handleChange}
          readOnly
        />
      </label>
      <label>
        Helpers:
        <input
          type="text"
          name="helpers"
          value={formData.helpers}
          onChange={handleChange}
          readOnly
        />
      </label>
      <label>
        Techs:
        <input
          type="text"
          name="techs"
          value={formData.techs}
          onChange={handleChange}
          readOnly
        />
      </label>

      {equipmentList.map((equipment, index) => (
        <div key={index}>
          <label>
            Equipment Name:
            <input
              type="text"
              name="name"
              value={equipment.name}
              onChange={(e) => handleEquipmentChange(index, e)}
            />
          </label>
          <label>
            Quantity:
            <input
              type="text"
              name="quantity"
              value={equipment.quantity}
              onChange={(e) => handleEquipmentChange(index, e)}
            />
          </label>
          <button type="button" onClick={() => removeEquipmentField(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addEquipmentField}>
        Add Equipment
      </button>

      <button type="submit">Submit</button>
    </form>
  );
}
