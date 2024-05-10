import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaSignInAlt,
  FaUserCircle,
  FaChartBar,
  FaSignOutAlt,
  FaUsers,
  FaSearch,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import {
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "../redux/features/authSlicer";
import {
  setCategoryType,
  handleSearchParams,
} from "../redux/features/itemSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, isLoading } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.item);
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState("");
  const [toggleMenu, setToggleMenu] = useState(true);

  useEffect(() => {
    setUser(userInfo);
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me");
        const jsonData = await res.json();
        if (!res.ok) {
          return;
        }
        setUserRole(jsonData.data.role);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUser();
  }, [userInfo]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    dispatch(logoutStart());
    try {
      const res = await fetch("/api/auth/logout");
      const jsonData = await res.json();
      if (!res.ok) {
        dispatch(logoutFailure(jsonData.message));
        toast.error(jsonData.message);
        return;
      }

      dispatch(logoutSuccess(jsonData.data));
      navigate("/login");
    } catch (err) {
      dispatch(logoutFailure(err.message));
    }
  };

  const onChangeCategory = (e) => {
    dispatch(setCategoryType(e.target.value));
  };

  const handleSearch = async (e) => {
    dispatch(handleSearchParams(e.target.value));
  };

  const handleToggleMenu = async () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <>
      <header className=" p-2 header">
        <nav className="container d-flex justify-content-between align-items-center">
          <select className="p-1 category" onChange={onChangeCategory}>
            <option value="" selected={category === ""}>
              All
            </option>
            <option value="electronics" selected={category === "electronics"}>
              Electronics
            </option>
            <option value="clothes" selected={category === "clothes"}>
              Clothes
            </option>
            <option value="technology" selected={category === "technology"}>
              Technology
            </option>
            <option value="vehicle" selected={category === "vehicle"}>
              Vehicle
            </option>
          </select>

          {/* Search Bar */}
          <div className="search-bar container my-2">
            <form className="search-form">
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
                onChange={handleSearch}
              />
              <FaSearch className="search-icon text-dark" />
            </form>
          </div>

          {userInfo ? (
            <div className="dropdown">
              <button
                className="btn admin-dropdown dropdown-toggle"
                type="button"
                onClick={toggleDropdown}
              >
                {user?.username}
              </button>

              <div className={isOpen ? "dropdown-menu show" : "dropdown-menu"}>
                <Link className="dropdown-item" to="/adminpanel">
                  <FaChartBar className="mx-2" />
                  Dashboard
                </Link>

                <li
                  onClick={handleLogout}
                  className="dropdown-item"
                  to="/logout"
                >
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <FaSignOutAlt className="mx-2" />{" "}
                      <span style={{ cursor: "pointer" }}>Logout</span>
                    </>
                  )}
                </li>
              </div>
            </div>
          ) : (
            <div className="d-flex gap-4 col-2">
              <Link to="/login">
                <FaSignInAlt /> Sign in
              </Link>
              
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
