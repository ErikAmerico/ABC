import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";

const numbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
];

const MakitaField = ({
  makitaCount,
  setMakitaCount,
  selectedNumbers,
  setSelectedNumbers,
}) => {
  const [number, setNumber] = useState("");

  const handleDeleteNumber = (numberToDelete) => () => {
    setSelectedNumbers(selectedNumbers.filter((num) => num !== numberToDelete));
  };

  const handleChangeNumber = (e) => {
    const newNumber = e.target.value;
    setNumber(newNumber);

    if (!selectedNumbers.includes(newNumber)) {
      setSelectedNumbers((prevNumbers) => [...prevNumbers, newNumber]);
      setNumber("");
    }
  };

  return (
    <TextField
      label="Makitas"
      variant="outlined"
      type="readonly"
      sx={{ width: "24%", mr: 0.5 }}
      InputProps={{
        readOnly: true,
        startAdornment: (
          <InputAdornment position="start">
            <Select
              value={makitaCount}
              onChange={(e) => setMakitaCount(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
              style={{ marginRight: "8px", maxWidth: "60px" }}
            >
              <MenuItem value={0}>0</MenuItem>
              {[...Array(10).keys()].slice(1).map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
            <div style={{ display: "flex", gap: "5px" }}>
              {selectedNumbers?.map((num) => (
                <Chip
                  key={num}
                  label={num}
                  onDelete={handleDeleteNumber(num)}
                />
              ))}
            </div>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Select
              value={number}
              onChange={handleChangeNumber}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
              style={{ marginRight: "8px", maxWidth: "100px" }}
            >
              {numbers.map((numOption) => (
                <MenuItem key={numOption} value={numOption}>
                  {numOption}
                </MenuItem>
              ))}
            </Select>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default MakitaField;
