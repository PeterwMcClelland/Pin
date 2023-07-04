import React, { useState, useEffect } from "react";
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [value, setValue] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <AppBar sx={{ backgroundColor: "#7e3e28" }} position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1 className="home-h1">Pin It</h1>
          </NavLink>

          {isMobile ? (
            <Accordion
              sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
                color: "inherit",
              }}
            >
              <AccordionSummary>
                <Typography>Menu</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <NavLink
                  to="/spots"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography>All Spots</Typography>
                </NavLink>
                <NavLink
                  to="/add"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography>Add Spot</Typography>
                </NavLink>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Tabs
              sx={{ ml: "auto" }}
              textColor="inherit"
              indicatorColor="secondary"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={NavLink} to="/spots" label="All Spots" />
              <Tab LinkComponent={NavLink} to="/add" label="Add Spot" />
              <Tab LinkComponent={NavLink} to="/signup" label="Sign Up" />
              <Tab LinkComponent={NavLink} to="/login" label="Login" />
            </Tabs>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
