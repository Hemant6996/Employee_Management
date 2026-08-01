import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import api from "../api/axios";

function CreateEmployee() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      position: "",
      salary: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.position) {
        errors.position = "Required";
      }
      if (!values.salary) {
        errors.salary = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await api.post("/employees", {
          ...values,
          salary: Number(values.salary),
        });
        navigate("/employees");
      } catch (error) {
        alert("Error creating employee");
      }
    },
  });

  return (
    <div className="page-shell">
      <div className="page-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">New employee</p>
            <h2 className="page-title">Create employee</h2>
            <p className="page-subtitle">Add a new team member with a polished, structured form.</p>
          </div>
        </div>

        <form className="form-stack" onSubmit={formik.handleSubmit}>
          <div className="field-group">
            <label className="field-label">Full name</label>
            <input
              className="input"
              name="name"
              value={formik.values.name}
              placeholder="Enter employee name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.name && formik.errors.name && <div className="error-text">{formik.errors.name}</div>}
          </div>

          <div className="field-group">
            <label className="field-label">Position</label>
            <input
              className="input"
              name="position"
              value={formik.values.position}
              placeholder="e.g. Software Engineer"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.position && formik.errors.position && (
              <div className="error-text">{formik.errors.position}</div>
            )}
          </div>

          <div className="field-group">
            <label className="field-label">Salary</label>
            <input
              className="input"
              name="salary"
              type="number"
              min="0"
              step="0.01"
              value={formik.values.salary}
              placeholder="Enter salary"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.salary && formik.errors.salary && <div className="error-text">{formik.errors.salary}</div>}
          </div>

          <button className="btn btn-primary" type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEmployee;
