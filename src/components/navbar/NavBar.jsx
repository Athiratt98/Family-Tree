import React from "react";
import "./NavBar.css";
import { Button, InputAdornment, TextField } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

const NavBar = () => {
  return (
    <div className="main">
      <div style={{ fontSize: "22px", fontWeight: 600 }}>Family tree</div>
      <Button
        variant="contained"
        size="small"
        className="button"
        style={{
          backgroundColor: "#d5b04d",
          color: "black",
          borderRadius: "7px",
          textTransform: "none",
          fontWeight: 700,
          textAlign: "center",
          marginLeft: "13px",
        }}
      >
        Add
      </Button>
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="Search"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          },
        }}
        style={{ marginLeft: "auto", width: "30%", backgroundColor: "#f1f1f1" }}
        sx={{
          "& .MuiInputBase-root": {
            height: "40px",
            borderRadius: "7px",
          },
        }}
      />
    </div>
  );
};

export default NavBar;
