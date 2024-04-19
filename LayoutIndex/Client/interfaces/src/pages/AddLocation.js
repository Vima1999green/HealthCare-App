import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddLocation = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/device/getAllDevices")
      .then((response) => {
        setDevices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching devices:", error);
      });
  }, []);

  const onFinish = (values) => {
    axios
      .post("http://localhost:5000/api/location/addLocation", values)
      .then(() => {
        message.success("Location added successfully!");
        form.resetFields();
      })
      .catch((error) => {
        message.error(`Failed to add location: ${error.response.data.message}`);
      });
  };

  return (
    <div className="form-contianer">
      <div className="form-content">
        <h1 className="form-header">Add Location</h1>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="locationName"
            label="Location Name"
            rules={[{ required: true, message: "Please enter location name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="locationAddress" label="Location Address">
            <Input />
          </Form.Item>

          <Form.Item name="phoneNumber" label="Phone Number">
            <Input />
          </Form.Item>

          <Form.Item
            name="devices"
            label="Select Devices"
            rules={[
              { required: true, message: "Please select at least one device" },
            ]}
          >
            <Select mode="multiple">
              {devices.map((device) => (
                <Option key={device._id} value={device._id}>
                  {device.serialNumber} - {device.deviceType}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="primary" htmlType="reset">
              Reset
            </Button>
            <Button
              type="primary"
              onClick={() => navigate("/showAllLocations")}
            >
              Show All Locations
            </Button>
            <Button type="primary" onClick={() => navigate("/")}>
              Add New Device
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddLocation;
