import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Required";
      }
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
        await api.post("/auth/register", values);
        alert("Registered successfully");
        navigate("/");
      } catch (error) {
        alert(error.response?.data?.message || "Registration failed");
      }
    },
  });

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand" style={{ justifyContent: "center", marginBottom: 12 }}>
          <span className="brand-mark">E</span>
          Employee Hub
        </div>
        <p className="eyebrow" style={{ justifyContent: "center" }}>Create account</p>
        <h2 className="page-title" style={{ textAlign: "center" }}>Start managing your team</h2>
        <p className="page-subtitle" style={{ textAlign: "center" }}>
          Set up an account and bring your employee records together.
        </p>

        <form className="form-stack" onSubmit={formik.handleSubmit}>
          <div className="field-group">
            <label className="field-label">Name</label>
            <input
              className="input"
              name="name"
              value={formik.values.name}
              placeholder="Your full name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.name && formik.errors.name && <div className="error-text">{formik.errors.name}</div>}
          </div>

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
            {formik.touched.email && formik.errors.email && <div className="error-text">{formik.errors.email}</div>}
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              className="input"
              name="password"
              type="password"
              value={formik.values.password}
              placeholder="Create a password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-text">{formik.errors.password}</div>
            )}
          </div>

          <button className="btn btn-primary" type="submit">Register</button>
        </form>

        <p className="helper-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;