import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useAuth";

export function Navigation() {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const isAuthenticated = !!localStorage.getItem("authToken");


  const handleLogout = (): void => {
    logout(undefined);
    navigate("/login");
  };

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Task Management
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
