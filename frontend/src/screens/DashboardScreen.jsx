import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Alert from "../components/Alert";
import {
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  getUsersItemStart,
  getUsersItemSuccess,
  getUsersItemFailure,
} from "../redux/features/itemSlice";
import Sidebar from "../components/Sidebar";
const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { items, isLoading, error } = useSelector((state) => state.item);
  const [itemDelete, setItemDelete] = useState();

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete this item`)) {
      try {
        const res = await fetch(`/api/items/${id}`, {
          method: "DELETE",
        });
        const jsonData = await res.json();
        if (!res.ok) {
          toast.error(jsonData.message);
          return;
        }
        toast.success(jsonData.message);
        setItemDelete(jsonData.data);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      dispatch(getUsersItemStart());
      try {
        let res;
        if (userInfo.role === "admin") {
          res = await fetch(`/api/admin/items`);
        } else {
          res = await fetch(`/api/items/${userInfo._id}`);
        }
        const jsonData = await res.json();
        if (!res.ok) {
          toast.error(jsonData?.message);
          dispatch(getUsersItemFailure(jsonData.message));
          return;
        }
        dispatch(getUsersItemSuccess(jsonData.data));
      } catch (err) {
        dispatch(getUsersItemFailure(err.message));
      }
    };
    fetchItems();
  }, [itemDelete]);

  const handlePrint = () => {
    window.print(); // Open browser's print dialog
  };

  return (
    <>
      <div className="container-fluid row dashboard">
        {/* Sidebar */}
        <Sidebar />
        <div className="col-10 mt-5">
          
          
          {userInfo && userInfo.isBlocked ? (
            <Alert />
          ) : (
            <div className="d-flex justify-content-between">
            <div className="container d-flex justify-content-between">
              <Link to="/additem" className="btn btn-sm btn-success">
                Add New Item
              </Link>
            </div>

            <button onClick={handlePrint} className="btn btn-sm btn-primary">Print</button>
            </div>
          )}

          {isLoading ? (
            <Loader />
          ) : error ? (
            <h1>{error}</h1>
          ) : (
            <table id="printable-table" className=" col-12 mt-4 table table-striped table-sm scroll-auto">
              <thead>
                <tr>
                  <th className="col-2">Name</th>
                  <th className="col-2">Price</th>
                  <th className="col-2">Category</th>
                  <th className="col-1">Qty</th>
                  <th className="col-4">Description</th>
                  <th id="t-body" className="col-1"> </th>
                </tr>
              </thead>
              <tbody>
                {items &&
                  items.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>{item.category}</td>
                      <td>{item.qty}</td>
                      <td>{item.description}</td>
                      <td id="t-body">
                        <Link to={`/edititem/${item._id}`}>
                          <FaEdit />
                        </Link>
                        <FaTrash
                          className="text-danger mx-1"
                          onClick={() => handleDelete(item?._id)}
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

export default DashboardScreen;
