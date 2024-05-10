import React from "react";
import { FaCartArrowDown, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { ImExit } from "react-icons/im";

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className="col-2 bg-secondary fw-bold sidebar">
        {userInfo.role === "admin" && (
          <div className=" fw-bold ">
            <div>
              <NavLink to="/adminpanel">
                <RxDashboard /> <span className="sidebar-text">Dashboard</span>
              </NavLink>
            </div>

            <NavLink to="/users" className="text-dark">
              <FaUsers className="mx-2" /> <span className="sidebar-text">Users</span>
            </NavLink>
          </div>
        )}

        <div>
          <NavLink to="/dashboard">
            <FaCartArrowDown className="mx-2" /> <span className="sidebar-text">Items</span>
          </NavLink>
        </div>
        <div></div>

        <div>
          <NavLink to={`/profile/${userInfo._id}`}>
            <FaUser className="mx-2" /> <span className="sidebar-text">Profile</span>
          </NavLink>
        </div>

        <div>
          <NavLink to="/">
            <ImExit className="mx-2" /> <span className="sidebar-text">Exit</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
