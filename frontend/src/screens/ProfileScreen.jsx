import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/features/authSlicer";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { id } = useParams();

  const [user, setUser] = useState({
    img:'',
    username: '',
    newPassword: "",
  });

  useEffect(() => {
    const fetchUser = async() => {
      const res = await fetch(`/api/users/${id}`)
      const jsonData = await res.json()
      setUser({
        img: jsonData.data?.img,
        username: jsonData.data.username,
        newPassword: "",
      })
    }
    fetchUser()

  }, [id])


  const handleImageChange = (e) => {
    setUser((prev) => ({
      ...prev,
      img: e.target.files[0],
    }));
  };
  const inputChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // dispatch(updateUserStart());
    try {
      const dataToSend = new FormData();
      dataToSend.append("img", user.img);
      dataToSend.append("username", user.username);
      dataToSend.append("newPassword", user.newPassword.trim());

      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: dataToSend,
      });
      const jsonData = await res.json();
      if (!res.ok) {
        dispatch(updateUserFailure(jsonData.message));
        toast.error(jsonData.message);
        return;
      }
      toast.success(jsonData.message);
      if(userInfo.role === 'admin' && userInfo._id !== jsonData.data._id) {
        navigate('/')
        return;
      }
      dispatch(updateUserSuccess(jsonData.data));
      navigate("/");
    } catch (err) {
      dispatch(updateUserFailure(err?.message));
    }
  };

  return (
    <>
    
   
    <div className="container-fluid row dashboard">

    <Sidebar />
    <div className=" col-10 p-3">
      <div className="container align-items-center d-flex flex-column mt-5">
        <div>
          <img
            src={`http://localhost:5000/uploads/${user.img}`}
            alt={user.img}
            width={"150px"}
            height={"150px"}
            className="rounded-circle"
          />
        </div>
        <form
          onSubmit={handleUpdate}
          className="user-form col-10 col-sm-8 col-lg-6"
        >
          <div className="form-group  d-flex flex-column my-2">
            <input type="file" className="p-1" onChange={handleImageChange} />
          </div>
          <div className="form-group d-flex flex-column my-2">
            <label>User name</label>
            <input
              type="name"
              name="username"
              className="p-1"
              value={user.username}
              onChange={inputChange}
            />
          </div>
          <div className="form-group d-flex flex-column my-2">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              className="p-1"
              onChange={inputChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
    </>
  );
};

export default ProfileScreen;
