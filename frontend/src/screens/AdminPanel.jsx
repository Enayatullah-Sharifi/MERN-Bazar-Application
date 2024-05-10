import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Alert from "../components/Alert";
import {
  FaUserAltSlash,
  FaUserAlt,
  FaUserCheck,
  FaCartPlus,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

import Sidebar from "../components/Sidebar";
import Chart from "../components/DailyAddedItemsChart";
const AdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [dailyCount, setDailyCount] = useState(0);
  const navigate = useNavigate()

  const {userInfo} = useSelector(state => state.auth)
 if(userInfo.role !== 'admin') {
  navigate('/dashboard')
 }

  const [allUsers, setAllUsers] = useState([]);

  const blockUsers = [];
  const activeUsers = [];
  allUsers.forEach((user) => {
    if (user.isBlocked) {
      blockUsers.push(user);
    } else {
      activeUsers.push(user);
    }
  });

  async function fetchData() {
    try {
      const res = await fetch("api/items");
      const jsonData = await res.json();
      if (!res.ok) {
        setError(jsonData.message);
        return;
      }

      // Get today's date
      const today = new Date().toISOString().split("T")[0];

      // Filter items added today
      const itemsAddedToday = jsonData.data.filter(
        (item) => item.createdAt.split("T")[0] === today
      );

      // Count the number of items added today
      const count = itemsAddedToday.length;

      setDailyCount(count);

      setData(jsonData.data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/users`);
        const jsonData = await res.json();
        if (!res.ok) {
          setError(jsonData.message);
          return;
        }
        setAllUsers(jsonData.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsers();
    fetchData();
  }, []);

  return (
    <div className="d-flex admin-containers">
        <Sidebar />
      <div className="container-fluid row dashboard ">
        <div className="col-10 overflow-hidden">
          <div className="container-fluid row my-5 dashboard-cards-container">
            <div className="col-sm-10 col-md-5 col-lg-3 dashboard-cards d-flex flex-column bg-primary text-white d-cart">
              <FaUserAlt />
              <p> All Users</p>
              <span>{allUsers.length}</span>
            </div>
            <div className="col-sm-10 col-md-5 col-lg-3 dashboard-cards d-flex flex-column bg-primary text-white d-cart">
              <FaUserCheck />
              <p>Active Users </p>
              <span>{activeUsers.length}</span>
            </div>
            <div className="col-sm-10 col-md-5 col-lg-3  dashboard-cards d-flex flex-column bg-primary text-white d-cart">
              <FaUserAltSlash />
              <p>Block User </p>
              <span>{blockUsers.length}</span>
            </div>
            <div className="col-sm-10 col-md-5 col-lg-3 dashboard-cards d-flex flex-column bg-primary text-white d-cart">
              <FaCartPlus />
              <p>All Items </p>
              <span>{data.length}</span>
            </div>
          </div>

          {/* Chart */}
          <div className="col-10 mt-5 text-white d-cart">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
