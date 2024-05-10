import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Alert from "../components/Alert";
import {
  FaTrash,
  FaEdit,
  FaCartPlus,
  FaUserCircle,
  FaUserAltSlash,
  FaUserAlt,
  FaUserCheck,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/features/userSlice";
import Sidebar from "../components/Sidebar";
const UsersScreen = () => {
  const dispatch = useDispatch();

  const { users, isLoading, error } = useSelector((state) => state.user);
  const [deleteUser, setDeleteUser] = useState("");
  const [block, setBlock] = useState(false);


  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete this user`)) {
      dispatch(deleteUserStart());
      try {
        const res = await fetch(`/api/users/${id}`, {
          method: "DELETE",
        });
        const jsonData = await res.json();
        if (!res.ok) {
          dispatch(deleteUserFailure(jsonData.message));
          toast.error(jsonData.message);
          return;
        }
        toast.success(jsonData.message);
        dispatch(deleteUserSuccess(jsonData.data));
        setDeleteUser(jsonData.data);
      } catch (err) {
        dispatch(deleteUserFailure(err.message));
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(getUsersStart());
      try {
        const res = await fetch(`/api/users`);
        const jsonData = await res.json();
        if (!res.ok) {
          dispatch(getUsersFailure(jsonData.message));
          return;
        }
        dispatch(getUsersSuccess(jsonData.data));
       
      } catch (err) {
        dispatch(getUsersFailure(err.message));
      }
    };
    fetchUsers();
  }, [deleteUser, block]);

  const handleBlock = async (id, e) => {
    try {
      if (window.confirm("Are You Sure")) {
        const status = e.target.checked;
        setBlock(status);
        const res = await fetch(`/api/users/${id}/block?isBlocked=${status}`);
        const jsonData = await res.json();
        toast.success(jsonData.data);
        location.reload()
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handlePrint = () => {
    window.print()
  }
  return (
    <>
      <div className="container-fluid row dashboard">
        <Sidebar />
        <div className="col-10">
          <button onClick={handlePrint} className="btn btn-sm btn-primary mt-4">Print</button>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <h1>{error}</h1>
          ) : (
            <table id="printable-table" className=" col-12 mt-4 table table-striped table-sm">
              <thead>
                <tr>
                  <th className="col-2">Name</th>
                  <th className="col-3">Email</th>
                  <th className="col-3">Status</th>
                  <th className="col-3" id="t-body"> </th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>

                      <td>
                        <label>
                          Block &nbsp;
                          <input
                            type="checkbox"
                            checked={user.isBlocked}
                            onChange={(e) => handleBlock(user._id, e)}
                          />
                        </label>
                      </td>
                      <td id="t-body">
                        <Link to={`/profile/${user._id}`}>
                          <FaEdit />
                        </Link>
                        <FaTrash
                          className="text-danger mx-1"
                          onClick={() => handleDelete(user?._id)}
                        />
                      </td>
                      <td></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersScreen;
