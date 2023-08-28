import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink } from "react-router-dom";
import UserContext from "../components/UserContext/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const logoutIcon = <FontAwesomeIcon icon={faRightFromBracket} />;

const Header = () => {
  const [value, setValue] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);

  const { user, setUser } = useContext(UserContext);

  const loggedInUser = localStorage.getItem("user");
  if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);
    setUser(foundUser);
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };

    document.addEventListener("resize", handleResize);

    const handleClickOutside = (event) => {
      if (event.target.closest(".MuiAccordion-root")) {
        return;
      }
      setIsAccordionOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`nav_bar ${showNav ? "" : "nav-hidden"}`}>
      <AppBar sx={{ backgroundColor: "#3e516a" }} position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1 className="home-h1">Pin It</h1>
          </NavLink>

          {isMobile ? (
            <Accordion
              sx={{ background: "lightgray" }}
              expanded={isAccordionOpen}
            >
              <AccordionSummary
                className="mobile-txt-menu"
                expandIcon={<ExpandMoreIcon />}
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              >
                Menu
              </AccordionSummary>
              <AccordionDetails>
                <Tabs
                  sx={{ ml: "auto" }}
                  textColor="inherit"
                  value={value}
                  onChange={(e, val) => setValue(val)}
                  orientation="vertical"
                  variant="scrollable"
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
                      <Typography
                        sx={{
                          fontStyle: "italic",
                          fontSize: "12px",
                          ml: "auto",
                          indicatorColor: "none",
                          borderTop: "solid",
                        }}
                      >
                        {user}
                      </Typography>
                      <Button
                        sx={{
                          ml: "auto",
                          color: "red",
                          fontSize: "12px",
                          textAlign: "end",
                        }}
                        onClick={handleLogout}
                        orientation="vertical"
                        variant="scrollable"
                      >
                        {logoutIcon}
                      </Button>
                    </div>
                  ) : (
                    <Tab
                      LinkComponent={NavLink}
                      sx={{
                        color: "green",
                      }}
                      to="/login"
                      label="LogIn"
                      value={2}
                    />
                  )}
                </Tabs>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Tabs
              sx={{ ml: "auto" }}
              textColor="inherit"
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
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      fontSize: "12px",
                      ml: "auto",
                      indicatorColor: "none",
                    }}
                  >
                    {user}
                  </Typography>
                  <Button
                    sx={{ color: "white", fontSize: "15px" }}
                    onClick={handleLogout}
                  >
                    {logoutIcon}
                  </Button>
                </div>
              ) : (
                <Tab
                  LinkComponent={NavLink}
                  sx={{
                    color: "lightgreen",
                  }}
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
