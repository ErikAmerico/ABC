import { useMutation } from "@apollo/client";
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import DispatchDrawer from "./dispatchDrawer";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../utils/globalContext";

const classes = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  fontSize: "16px",
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState();
  const [userName, setUserName] = useState();
  const [userRole, setUserRole] = useState();
  const [userId, setUserId] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();
  const [showSubLinks, setShowSubLinks] = useState(false);
  const { rowSelectionModel, setRowSelectionModel } = useGlobalContext();
  const { rows, setRows } = useGlobalContext();
  //console.log("rowSelectionModel in Header:", rowSelectionModel);
  //console.log("rows in Header:", rows);

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const profile = AuthService.getProfile();
      const firstName = profile.data.firstName;
      const lastName = profile.data.lastName;
      const role = profile.data.role;
      setUserId(profile.data._id);
      setUserRole(role);
      setUserName(`${firstName} ${lastName}`);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl();
  };

  const handleLogout = async () => {
    AuthService.logout();
    handleMenuClose();
  };

  const initials = userName
    ? `${userName.split(" ")[0][0]}${userName.split(" ")[1][0]}`
    : "";

  const handlePersonellMenuOpen = () => {
    setShowSubLinks(!showSubLinks);
  };

  const handlePersonellMenuClose = () => {
    setShowSubLinks(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ borderRadius: 2, backgroundColor: "#8da9c4" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            <Link to="/">
              <img
                src="/images/abcLogoClear.webp"
                alt="Company Logo"
                style={{
                  height: "auto",
                  width: "150px",
                  marginRight: "",
                  marginTop: 6,
                }}
              />
            </Link>
          </Typography>

          {AuthService.loggedIn() && screenWidth > 790 && (
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography variant="h6" component="div">
                <Button
                  component={Link}
                  color="info"
                  variant="outlined"
                  to="/announcements"
                  sx={{
                    marginRight: 2,
                    backgroundColor: "#134074",
                    color: "white",
                  }}
                >
                  Announcements
                </Button>
                <Button
                  color="info"
                  variant="outlined"
                  onClick={handlePersonellMenuOpen}
                  sx={{
                    marginRight: 2,
                    backgroundColor: "#134074",
                    color: "white",
                  }}
                >
                  PERSONNEL
                </Button>
                <Button
                  component={Link}
                  color="info"
                  variant="outlined"
                  to="/dispatch"
                  sx={{
                    backgroundColor: "#134074",
                    color: "white",
                  }}
                >
                  Dispatch Sheet
                </Button>
              </Typography>
              {/* )} */}
              {showSubLinks && (
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, marginTop: 1 }}
                >
                  <Button
                    component={Link}
                    color="info"
                    variant="outlined"
                    to="/office"
                    sx={{
                      marginRight: 2,
                      backgroundColor: "#134074",
                      color: "white",
                      position: "relative",
                      left: 15,
                    }}
                  >
                    OFFICE
                  </Button>
                  <Button
                    component={Link}
                    color="info"
                    variant="outlined"
                    to="/employees"
                    sx={{
                      marginRight: 2,
                      backgroundColor: "#134074",
                      color: "white",
                      position: "relative",
                      left: 25,
                    }}
                  >
                    FIELD
                  </Button>
                  <Button
                    component={Link}
                    color="info"
                    variant="outlined"
                    to="/contacts"
                    sx={{
                      marginRight: 2,
                      backgroundColor: "#134074",
                      color: "white",
                      position: "relative",
                      left: 35,
                    }}
                  >
                    CONTACTS
                  </Button>
                </Typography>
              )}
            </Box>
          )}

          <Box display="flex" flexDirection="column" alignItems="end">
            <Box display="flex" alignItems="center">
              {userName && screenWidth > 415 ? (
                <Typography variant="h6" component="div">
                  {userName}
                </Typography>
              ) : null}

              {AuthService.loggedIn() && (
                <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
                  <Avatar
                    className={classes.avatar}
                    sx={{
                      //bgcolor: "white",
                      backgroundColor: "white",
                      color: "#144074",
                      border: "3px solid gray",
                      fontWeight: "bold",
                      textShadow: "0px 0px 12px black",
                    }}
                  >
                    {initials}
                  </Avatar>
                </IconButton>
              )}
            </Box>

            {AuthService.loggedIn() && location.pathname === "/dispatch" && (
              <Box
                mt={-5}
                sx={{
                  position: "relative",
                  top: 40,
                }}
              >
                <DispatchDrawer />
              </Box>
            )}
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            {screenWidth <= 790 && smallScreenMenuItems}
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
