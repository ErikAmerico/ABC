import React, { useRef } from "react";

export default function TimeInput({ value, onChange }) {
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
