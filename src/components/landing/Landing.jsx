import React from "react";
import "./Landing.css";
import FamilyTree from "../family-tree/FamilyTree";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";

const ToggleSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    backgroundColor: "#aaaaaa",
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const InfoIcon = () => {
  return (
    <div
      style={{
        width: 21,
        height: 21,
        borderRadius: "50%",
        backgroundColor: "#d4d4d4",
        color: "black",
        textAlign: "center",
        fontSize: "13px",
      }}
    >
      i
    </div>
  );
};
const Landing = () => {
  return (
    <div className="landing">
      <div className="icon-container">
        <ToggleSwitch />
        <div style={{ marginRight: "20px" }}>Show inheritance</div>
        <InfoIcon />
        <div style={{ marginLeft: "10px" }}>Update your position</div>
        <div className="box-container">
          <DeviceHubIcon
            style={{
              color: "#aaaaaa",
            }}
          />
          <FormatListBulletedIcon
            style={{
              color: "#aaaaaa",
            }}
          />
          <JoinInnerIcon
            style={{
              color: "#aaaaaa",
            }}
          />
        </div>
      </div>
      <FamilyTree />
    </div>
  );
};
export default Landing;
