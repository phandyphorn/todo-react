import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Container, Box, Typography, TextField, Button, Link, Paper, Alert } from "@mui/material";
import { useLogin } from "../hooks/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const loginMutation = useLogin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    loginMutation.mutate(formData, {
      onSuccess: () => {
        navigate("/todos");
      },
      onError: (err: unknown) => {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        const errorMessage =
          axiosErr.response?.data?.message || "Invalid credentials or server error.";
        setError(errorMessage);
      },
    });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Paper elevation={3} sx={{ padding: 4, width: "100%", borderRadius: 2 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loginMutation.isPending}
              sx={{ mt: 3, mb: 2, py: 1.2 }}
            >
              {loginMutation.isPending ? "Signing in…" : "Sign In"}
            </Button>
            <Box sx={{ textAlign: "center" }}>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}