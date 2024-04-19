import React, { useState } from "react";
import "../allcssFiles/layout.css";
import { Badge } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

function Layout({ children }) {
  const [collapsed, setcollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-8-line",
    },
    {
      name: "Appointment",
      path: "/appointment",
      icon: "ri-file-list-2-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-nurse-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-fill",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-8-line",
    },
    {
      name: "Users",
      path: "/users",
      icon: "ri-user-3-fill",
    },
    {
      name: "Docotors",
      path: "/doctors",
      icon: "ri-nurse-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-fill",
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="app-name">MYD</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              //this is the logic to check we are in the correct path that matches with our menu item
              const isActive = location.pathname === menu.path;
              return (
                <div
                  // here we are settings items to highlight when we stay there
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  {/* inside a div element there are two types of childe elements for icon and link to another page */}
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            {/* create logout functionalities */}
            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.clear();
                dispatch(setUser(null));
                navigate("/login");
              }}
            >
              <i className="ri-logout-box-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className=" ri-menu-line header-action-icon"
                onClick={() => setcollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setcollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-tiems-center px-4">
              <Badge
                count={user?.unSeenNotification?.length}
                onClick={() => {
                  navigate("/notification");
                }}
              >
                <i className="ri-notification-4-fill header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>

          <div className="body ">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
