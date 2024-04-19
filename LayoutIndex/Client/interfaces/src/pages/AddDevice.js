import React from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList ? e.fileList : [];
};

const AddDevice = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("serialNumber", values.serialNumber);
      formData.append("deviceType", values.deviceType);
      formData.append("image", values.image[0].originFileObj);
      formData.append("status", values.status);
      console.log("FormData:", formData);

      await axios.post(
        "http://localhost:5000/api/device/addDeviceDetails",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("Device added successfully");
      form.resetFields();
    } catch (error) {
      if (
        error.response &&
        error.response.data.message.includes("duplicate key error")
      ) {
        form.setFields([
          {
            name: "serialNumber",
            errors: ["Serial number must be unique"],
          },
        ]);
      } else {
        message.error("Failed to add device");
      }
    }
  };

  const uploadProps = {
    fileList: [],
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h1 className="form-header">Add Device</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          encType="multipart/form-data"
        >
          <Form.Item
            label="Serial Number"
            name="serialNumber"
            rules={[{ required: true, message: "Please enter serial number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Device Type"
            name="deviceType"
            rules={[{ required: true, message: "Please select device type" }]}
          >
            <Select>
              <Option value="pos">Pos</Option>
              <Option value="kiosk">Kiosk</Option>
              <Option value="signage">Signage</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Device
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
            <Button type="primary" onClick={() => navigate("/location")}>
              Add New Location
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddDevice;
