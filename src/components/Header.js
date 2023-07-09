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
  const [value, setValue] = useState(0);
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
      <AppBar sx={{ backgroundColor: "#3e516a" }} position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1 className="home-h1">This Weekend</h1>
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
              <Tab
                LinkComponent={NavLink}
                to="/spots"
                label="All Spots"
                value={0}
              />
              <Tab
                LinkComponent={NavLink}
                to="/add"
                label="Add Spot"
                value={1}
              />
            </Tabs>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
