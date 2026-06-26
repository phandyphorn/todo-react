import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClient";
import { theme } from "./theme/theme";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navigation } from "./components/Navigation";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { TodoPage } from "./pages/TodoPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
      <Router>
            <Navigation />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/todos"
                element={
                  <ProtectedRoute>
                    <TodoPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/todos" />} />
            </Routes>
          </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
