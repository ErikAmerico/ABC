import React, { useState, useEffect } from "react";

export default function MoveSheet({ job }) {
  console.log(job);

  const [formData, setFormData] = useState({
    date: job?.date || "",
    startTime: job?.startTime || "",
    origin: job?.origin || "",
    destination: job?.destination || "",
    account: job?.account.names || "",
    remarks: job?.remarks || "",
    contact: job?.contact || "",
    crewSize: job?.crewSize || "",
    trucks: job?.trucks || "",
    vans: job?.vans || "",
    supervisors: job?.supervisors || "",
    drivers: job?.drivers || "",
    helpers: job?.helpers || "",
    techs: job?.techs || "",
  });

  useEffect(() => {
    console.log("Job prop has changed:", job);

    if (job) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        date: job.date || "",
        startTime: job.startTime || "",
        origin: job.origin || "",
        destination: job.destination || "",
        account: job.account.name || "",
        serviceType: job.serviceType || "",
        remarks: job.remarks || "",
        contact: job.contact || "",
        crewSize: job.crewSize || "",
        trucks: job.trucks || "",
        vans: job.vans || "",
        supervisors: job.supervisors || "",
        drivers: job.drivers || "",
        helpers: job.helpers || "",
        techs: job.techs || "",
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
        />
      </label>
      <label>
        Start Time:
        <input
          type="text"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
      </label>
      <label>
        Origin:
        <input
          type="text"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
        />
      </label>
      <label>
        Destination:
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
        />
      </label>
      <label>
        Account:
        <input
          type="text"
          name="account"
          value={formData.account}
          onChange={handleChange}
        />
      </label>
      <label>
        Remarks:
        <input
          type="text"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
        />
      </label>
      <label>
        Contact:
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
        />
      </label>
      <label>
        Crew Size:
        <input
          type="text"
          name="crewSize"
          value={formData.crewSize}
          onChange={handleChange}
        />
      </label>
      <label>
        Trucks:
        <input
          type="text"
          name="trucks"
          value={formData.trucks}
          onChange={handleChange}
        />
      </label>
      <label>
        Vans:
        <input
          type="text"
          name="vans"
          value={formData.vans}
          onChange={handleChange}
        />
      </label>
      <label>
        Supervisors:
        <input
          type="text"
          name="supervisors"
          value={formData.supervisors}
          onChange={handleChange}
        />
      </label>
      <label>
        Drivers:
        <input
          type="text"
          name="drivers"
          value={formData.drivers}
          onChange={handleChange}
        />
      </label>
      <label>
        Helpers:
        <input
          type="text"
          name="helpers"
          value={formData.helpers}
          onChange={handleChange}
        />
      </label>
      <label>
        Techs:
        <input
          type="text"
          name="techs"
          value={formData.techs}
          onChange={handleChange}
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
