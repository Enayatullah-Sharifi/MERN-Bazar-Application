import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

import Loader from "../components/Loader";

const RegisterScreen = () => {
  const [ isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const { username, email, password, confirmPassword } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (password !== confirmPassword) {
      toast.error("Password do not match!");
      setIsLoading(false)
      return;
    }
   
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const jsonData = await res.json();

      if (!res.ok) {
        toast.error(jsonData.message);
        setIsLoading(false)
        return;
      }

     setIsLoading(false)
      toast.success(jsonData.message);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      })

     
    } catch (err) {
      toast.error(err.message);
      console.log('catch')
     setIsLoading(false)
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
            <h3>Register Now</h3>
            <form
              onSubmit={handleSubmit}
              className="user-form col-10 col-sm-8 col-lg-6"
            >
              <div className="form-group d-flex flex-column my-2">
                <label>User name</label>
                <input
                  type="text"
                  name="username"
                  className="p-1"
                  onChange={inputChange}
                  value={username}
                />
              </div>

              <div className="form-group d-flex flex-column my-2">
                <label>Email</label>
                <input
                  type="email"
                  required
                  name="email"
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

              <div className="form-group d-flex flex-column my-2">
                <label>Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="p-1"
                  required
                  onChange={inputChange}
                  value={confirmPassword}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
            <p>
              Have an account ? <Link to="/login">Login</Link>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default RegisterScreen;
