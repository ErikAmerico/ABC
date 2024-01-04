import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  IconButton,
  Chip,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const colors = [
  "Black",
  "Blue",
  "Brown",
  "Green",
  "Lime",
  "Orange",
  "Pink",
  "Red",
  "Teal",
  "Yellow",
];

const SafeJackField = ({
  safeJackAmount,
  setSafeJackAmount,
  selectedColors,
  setSelectedColors,
}) => {
  const [color, setColor] = useState("");
  // const [safeJackAmount, setSafeJackAmount] = useState(0);

  console.log(selectedColors);

  const handleDeleteColor = (colorToDelete) => () => {
    // Remove the color from the array
    setSelectedColors(selectedColors.filter((c) => c !== colorToDelete));
  };

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);

    // Add color if it's not already in the array
    if (!selectedColors.includes(newColor)) {
      setSelectedColors((prevColors) => [...prevColors, newColor]);
      setColor("");
    }
  };

  return (
    <>
      <TextField
        label="Safe Jacks"
        variant="outlined"
        sx={{ width: "24%", mr: 0.5 }}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <Select
                value={safeJackAmount}
                onChange={(e) => setSafeJackAmount(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                style={{ marginRight: "8px", maxWidth: "60px" }}
              >
                {[...Array(10).keys()].map((number) => (
                  <MenuItem key={number} value={number}>
                    {number}
                  </MenuItem>
                ))}
              </Select>
              {/* <div
                style={{
                  display: "flex",
                  //flexWrap: "wrap",
                  gap: "5px",
                }}
              >
                {selectedColors?.map((color) => (
                  <Chip
                    key={color}
                    label={color}
                    onDelete={handleDeleteColor(color)}
                  />
                ))}
              </div> */}
              <div style={{ display: "flex", gap: "5px" }}>
                {selectedColors?.map((selectedColor) => (
                  <IconButton
                    key={selectedColor}
                    onClick={handleDeleteColor(selectedColor)}
                    style={{ color: selectedColor }}
                  >
                    <CircleIcon />{" "}
                  </IconButton>
                ))}
              </div>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Select
                value={color}
                onChange={handleChangeColor}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                style={{ marginRight: "8px", maxWidth: "100px" }}
              >
                {colors.map((colorOption) => (
                  <MenuItem key={colorOption} value={colorOption}>
                    {/* {colorOption} */}
                    <CircleIcon style={{ color: colorOption }} />
                  </MenuItem>
                ))}
              </Select>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default SafeJackField;
