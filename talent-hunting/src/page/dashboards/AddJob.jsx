import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
// import {} from 'react-router-dom'
// import { toast } from "react-toastify";
import {
  handleChange,
  clearValue,
  createJob,
  editJob
} from "../../features/job/jobSlice";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

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
    createdJobNav,
    editJobId,
  } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      // toast.error("Please Fill Up All Values");
      return;
    }
    if(isEditing){
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
    
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    // came from only RTK actions
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }

    // if (createdJobNav) {
    //   console.log('/all-jobs');
    //   return <Navigate to="/all-jobs" />;
    // }
    
  }, []);

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
        <div className="form-center">
          {/* Position field */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />

          {/* job status */}
          <FormRowSelect
            name="Status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          {/* job type */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValue())}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              // disabled={isLoading}
            >
              {isLoading ? "Please Wait..." : "Submit" }
              {createdJobNav ? <Navigate to='/all-jobs'/> : <Navigate to='/add-job'/>}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
