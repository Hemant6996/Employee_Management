import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import CreateEmployee from "./pages/CreateEmployee";
import ProtectedRoute from "./components/ProtectedRoute";
import EditEmployee from "./pages/EditEmployee";
import RoleBasedRoute from "./components/RoleBased";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes Group */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeList />} />

            <Route element={<RoleBasedRoute role="admin" />}>
              <Route path="/employees/create" element={<CreateEmployee />} />
              <Route path="/employees/edit/:id" element={<EditEmployee />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;