import React from "react";

export default function ServiceDropdown({ value, onChange }) {
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
