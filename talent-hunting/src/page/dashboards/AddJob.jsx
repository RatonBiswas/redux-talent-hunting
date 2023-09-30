import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { handleChange } from "../../features/job/jobSlice";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    // editJobId,
  } = useSelector((store) => store.job);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please Fill Up All Values");
      return;
    }
  };

  const handleFormValueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // came from only RTK actions
    dispatch(handleChange({ name, value }));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
        <div className="form-center">
          {/* Position field */}
          <FormRow
            type="text"
            name="Position"
            value={position}
            handleChange={handleFormValueChange}
          />

          {/* Company field */}
          <FormRow
            type="text"
            name="Company"
            value={company}
            handleChange={handleFormValueChange}
          />

          {/* Job Location field */}
          <FormRow
            type="text"
            labelText="job location"
            name="Job Location"
            value={jobLocation}
            handleChange={handleFormValueChange}
          />

          {/* job status */}
          <FormRowSelect
            name="Status"
            value={status}
            handleChange={handleFormValueChange}
            list={statusOptions}
          />

          {/* job type */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleFormValueChange}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button type="submit" className="btn btn-block clear-btn">
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              {isLoading ? "Please Wait..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
