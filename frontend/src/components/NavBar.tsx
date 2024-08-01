import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { navbarProps } from "../types/components/Navbar";
import { Link, NavigateFunction } from "react-router-dom";
import "../styles/NavBar.css";
import { useAppDispatch } from "../store/store";
import {
  getBooksData,
  setLoading,
  setLogin,
  setLogoutLoad,
} from "../store/features/user/HomeSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../server";

const NavBar: React.FC<navbarProps> = ({ login, navigate }) => {
  const dispatch = useAppDispatch();
  let pages;
  {
    !login
      ? (pages = [
          {
            name: "Explore Books",
            to: "/",
          },
          {
            name: "Host Book",
            to: "/books/add",
          },
          {
            name: "Login",
            to: "/login",
          },
          {
            name: "SignUp",
            to: "/signUp",
          },
        ])
      : (pages = [
          {
            name: "Explore Books",
            to: "/",
          },
          {
            name: "Host Book",
            to: "/books/add",
          },
        ]);
  }
  const settings = [
    { type: "Your Books", to: "/your-books" },
    { type: "Logout" },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (
    navigate: NavigateFunction,
    link?: string,
    to?: string
  ): void => {
    if (link === "Logout") {
      logoutFunction();
    } else {
      if (to) {
        navigate(to);
      }
    }
    setAnchorElUser(null);
  };

  const logoutFunction = async (): Promise<void> => {
    dispatch(setLoading(true));
    dispatch(setLogoutLoad(true));
    await axios
      .get(`${server}/api/user/logout`, { withCredentials: true })
      .then((res) => {
        if (res.data === "loggedOut") {
          dispatch(setLogin(false));
          toast.success("Successfully Logged Out");
          if (window.location.pathname === "/") {
            dispatch(getBooksData(navigate));
            dispatch(setLoading(false));
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", maxWidth: "100%" }}
      className="navbar"
    >
      <AppBar
        position="static"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "flex", md: "flex" },
                height: "100%",
                width: "50%",
                alignItems: "center",
                justifyContent: { xs: "space-evenly", md: "start" },
              }}
            >
              <Box
                sx={{
                  flexGrow: 0,
                  display: { xs: "flex", md: "none" },
                  marginRight: "1rem",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  sx={{
                    display: { xs: "block", md: "none" },
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
                  {pages.map((page) =>
                    page.name === "Explore Books" &&
                    window.location.pathname === "/" ? (
                      <Link
                        to={page.to}
                        onClick={() => {
                          dispatch(getBooksData(navigate));
                        }}
                        style={{ color: "black", display: "block" }}
                        key={page.name}
                      >
                        <MenuItem key={page.name}>
                          <Typography textAlign="center">
                            {page.name}
                          </Typography>
                        </MenuItem>
                      </Link>
                    ) : (
                      <Link
                        to={page.to}
                        style={{ color: "black", display: "block" }}
                        key={page.name}
                      >
                        <MenuItem key={page.name}>
                          <Typography textAlign="center">
                            {page.name}
                          </Typography>
                        </MenuItem>
                      </Link>
                    )
                  )}
                </Menu>
              </Box>
              <Avatar
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: "20%",
                  ml: "5%",
                  p: 0,
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
                alt=""
                src="https://img.freepik.com/premium-vector/book-world-vector-logo-template_825834-11498.jpg"
              />

              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                BookWorld
              </Typography>

              <Avatar
                sx={{
                  display: { xs: "flex", md: "none" },
                  mr: 2,
                  p: 0,
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
                alt=""
                src="https://img.freepik.com/premium-vector/book-world-vector-logo-template_825834-11498.jpg"
              />

              <Typography
                variant="h5"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "sans-serif",
                  fontSize: "medium",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                BookWorld
              </Typography>
            </Box>

            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                height: "100%",
                width: "50%",
              }}
            >
              <Box
                sx={{
                  display: {
                    flexGrow: 1,
                    xs: "none",
                    md: "flex",
                    marginRight: "2rem",
                    justifyContent: "space-evenly",
                  },
                }}
              >
                {pages.map((page) =>
                  page.name === "Explore Books" &&
                  window.location.pathname === "/" ? (
                    <Link
                      key={page.name}
                      to={page.to}
                      onClick={() => {
                        dispatch(getBooksData(navigate));
                      }}
                      style={{ color: "white", display: "block" }}
                    >
                      {page.name}
                    </Link>
                  ) : (
                    <Link
                      key={page.name}
                      to={page.to}
                      style={{ color: "white", display: "block" }}
                    >
                      {page.name}
                    </Link>
                  )
                )}
              </Box>
              {login ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{
                        p: 0,
                        "&:focus": {
                          outline: "none",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <Avatar alt="" src="" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={() => handleCloseUserMenu(navigate)}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.type}
                        onClick={() => {
                          handleCloseUserMenu(
                            navigate,
                            setting.type,
                            setting.to
                          );
                        }}
                      >
                        <Typography textAlign="center">
                          {setting.type}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : null}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
