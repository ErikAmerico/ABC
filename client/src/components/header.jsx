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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

const classes = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  fontSize: "16px",
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState();
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
    await createMsgCnt({
      variables: {
        userId: userId,
      },
    });

    AuthService.logout();
    handleMenuClose();
  };

  const initials = userName
    ? `${userName.split(" ")[0][0]}${userName.split(" ")[1][0]}`
    : "";

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ borderRadius: 2, backgroundColor: "#8da9c4" }}
      >
        <Toolbar>
          {/* Company Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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

          {/* Navigation Links */}
          {AuthService.loggedIn() && screenWidth > 790 && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
                component={Link}
                color="info"
                variant="outlined"
                to="/employees"
                sx={{
                  marginRight: 2,
                  backgroundColor: "#134074",
                  color: "white",
                }}
              >
                Users
              </Button>
              <Button
                component={Link}
                color="info"
                variant="outlined"
                to="/Jobs"
                sx={{
                  backgroundColor: hasUnreadMessages ? "#6669ad" : "#134074",
                  color: "white",
                }}
              >
                Chat
              </Button>
            </Typography>
          )}

          {userName && screenWidth > 415 ? (
            <Typography variant="h6" component="div">
              {userName}
            </Typography>
          ) : null}

          {!userName && (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}

          {AuthService.loggedIn() && (
            <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
              <Avatar
                className={classes.avatar}
                sx={{
                  //bgcolor: "white",
                  backgroundColor: unreadMessages ? "#6669ad" : "white",
                  color: unreadMessages ? "white" : "#144074",
                  border: "3px solid gray",
                  fontWeight: unreadMessages ? "normal" : "bold",
                  textShadow: "0px 0px 12px black",
                }}
              >
                {initials}
              </Avatar>
            </IconButton>
          )}

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
