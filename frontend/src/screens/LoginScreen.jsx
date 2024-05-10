import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/features/authSlicer";

const Login = () => {
  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const jsonData = await res.json();
      if (!res.ok) {
        dispatch(loginFailure(jsonData.message));
        toast.error(jsonData.message);
        return;
      }
      dispatch(loginSuccess(jsonData.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };
  return (
    <>
      <div className="container align-items-center d-flex flex-column mt-5">
        {isLoading ? 
          <Loader />
        : (
          <>
            <FaUserCircle className="register-icon" />
            <h3>Login</h3>
            <form
              onSubmit={handleSubmit}
              className="user-form col-10 col-sm-8 col-lg-6"
            >
              <div className="form-group d-flex flex-column my-2">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="p-1"
                  onChange={inputChange}
                  value={email}
                />
              </div>
              <div className="form-group d-flex flex-column my-2">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="p-1"
                  required
                  onChange={inputChange}
                  value={password}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <p>
              Don&apos;t have an account ? <a href="/register">Register</a>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
