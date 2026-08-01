import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { user, setUser, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const res = await api.post("/auth/login", values);
        setUser(res.data.user);
        navigate("/dashboard");
      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      }
    },
  });

  if (loading) return <div className="auth-page"><div className="auth-card">Loading...</div></div>;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand" style={{ justifyContent: "center", marginBottom: 12 }}>
          <span className="brand-mark">E</span>
          Employee Hub
        </div>
        <p className="eyebrow" style={{ justifyContent: "center" }}>Welcome back</p>
        <h2 className="page-title" style={{ textAlign: "center" }}>Login to your workspace</h2>
        <p className="page-subtitle" style={{ textAlign: "center" }}>
          Manage employees and keep your records in sync.
        </p>

        <form className="form-stack" onSubmit={formik.handleSubmit}>
          <div className="field-group">
            <label className="field-label">Email</label>
            <input
              className="input"
              type="email"
              name="email"
              value={formik.values.email}
              placeholder="you@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-text">{formik.errors.email}</div>
            )}
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              className="input"
              name="password"
              type="password"
              value={formik.values.password}
              placeholder="Enter password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-text">{formik.errors.password}</div>
            )}
          </div>

          <button className="btn btn-primary" type="submit">Login</button>
        </form>

        <p className="helper-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;