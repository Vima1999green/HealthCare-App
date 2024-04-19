import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const DisplayLocationDetails = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/location/getAllLocations")
      .then((response) => {
        const locationsWithDevices = response.data.map(async (location) => {
          const devices = await Promise.all(
            location.devices.map(async (deviceId) => {
              const deviceResponse = await axios.get(
                `http://localhost:5000/api/device/getDeviceById/${deviceId}`
              );
              return deviceResponse.data;
            })
          );
          return { ...location, devices };
        });
        Promise.all(locationsWithDevices).then((updatedLocations) => {
          setLocations(updatedLocations);
          console.log(locationsWithDevices);
        });
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  const columns = [
    {
      title: "Location Name",
      dataIndex: "locationName",
      key: "locationName",
    },
    {
      title: "Location Address",
      dataIndex: "locationAddress",
      key: "locationAddress",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Devices",
      dataIndex: "devices",
      key: "devices",
      render: (devices) =>
        devices.map((device, index) => (
          <span key={device._id}>
            {device.serialNumber} - {device.deviceType}
            {index !== devices.length - 1 && <br />}
          </span>
        )),
    },
  ];

  return <Table dataSource={locations} columns={columns} rowKey="_id" />;
};

export default DisplayLocationDetails;
