import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "../redux/userSlice";

function Notification() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/mark-all-notifications-as-seen",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong", error);
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/delete-all-notifications",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong", error);
    }
  };
  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab="unseen" key={0}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={() => markAllAsSeen()}>
              Mark all as seen
            </h1>
          </div>
          {/* in here first I check is there any user object exist,then check userobject has
          unSeenNotification array,if they exist then map function helps to go through all the elements(all the notifications) in unSeenNotification Array and
           display them as a format in div elements in the return statement  */}
          {user?.unSeenNotification.map((notification) => {
            return (
              <div
                className="card p-2"
                key={notification.id}
                onClick={() =>
                  navigate(
                    `/notification/admin/doctor/${notification.data.doctorId}`
                  )
                }
              >
                <div className="card-text">{notification.message}</div>
              </div>
            );
          })}
        </Tabs.TabPane>{" "}
        <Tabs.TabPane tab="seen" key={1}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={() => deleteAll()}>
              Delete All
            </h1>
          </div>
          {user?.seenNotification.map((notification) => {
            return (
              <div
                className="card p-2"
                key={notification.id}
                onClick={() =>
                  navigate(
                    `/notification/admin/doctor/${notification.data.doctorId}`
                  )
                }
              >
                <div className="card-text">{notification.message}</div>
              </div>
            );
          })}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notification;
