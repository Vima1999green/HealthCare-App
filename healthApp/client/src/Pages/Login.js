import React from "react";

import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Re-directing to HOMEPAGE ");
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong", error);
    }
  };
  return (
    <div className="Authentication">
      <div className="Authentication-form card p-3">
        <h1 className="card-title">Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="E-mail" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Passowrd" type="password" />
          </Form.Item>
          <Button className="primary-button my-2" htmlType="submit">
            Login
          </Button>
          <Link to="/register" className="anchor mt-2">
            CLICK HERE TO REGISTER
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
