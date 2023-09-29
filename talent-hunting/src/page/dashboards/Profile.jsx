import { useState } from "react";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../features/user/userSlice";

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const [values, setValues] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, location, lastName } = values;
    if (!name || !email || !location || !lastName) {
      toast.error("Please Fill Up All Values");
      return;
    }
    dispatch(updateUser({name, email, location, lastName}))
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">

          {/* name field */}
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />

          {/* lastName field */}
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={values.lastName}
            handleChange={handleChange}
          />

          {/* email field */}
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          
          <FormRow
            type="text"
            name="location"
            value={values.location}
            handleChange={handleChange}
          />

          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please Wait..." : " Save Changes"}
          </button>

        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
