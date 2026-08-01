import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function RoleBasedRoute({ role }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return user.role === role ? <Outlet /> : <Navigate to="/" />;
}