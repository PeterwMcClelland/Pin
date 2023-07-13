import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  // Accordion,
  // AccordionSummary,
  // AccordionDetails,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import UserContext from '../components/UserContext/UserContext';

const Header = () => {
  const [value, setValue] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

  const { user, setUser } = useContext(UserContext);

  // Get user from localStorage immediately before first render
  const loggedInUser = localStorage.getItem('user');
  if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);
    setUser(foundUser);
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

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
            <h1 className="home-h1">Pin It</h1>
          </NavLink>

          {isMobile ? (
            <React.Fragment /> // Replace this with your accordion code when it's ready
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
              {user ? (
                <div>
                  <Typography sx={{ fontStyle: 'italic', fontSize: '12px', ml: 'auto', indicatorColor: 'none' }}>{user}</Typography> 
                  <Button onClick={handleLogout}>Logout</Button>
                </div>
              ) : (
                <Tab
                  LinkComponent={NavLink}
                  to="/login"
                  label="LogIn"
                  value={2}
                />
              )}
            </Tabs>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;



