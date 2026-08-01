// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) return <div>Loading...</div>;

//   if (!user) return <Navigate to="/login" />;

//   return children;
// };

// export default ProtectedRoute;
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // ← this line is critical

  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoute;