import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { Table } from "antd";
import { useState } from "react";

function ApproveRejectDoctor() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    console.log("Fetching doctor with id:", doctorId);
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = response.data;
        console.log("Fetched doctor:", data);
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const columns = [
    {
      title: "first Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <Layout>
      <h2>Approve or Reject the Request</h2>
      {doctor && <Table columns={columns} dataSource={[doctor]} />}
    </Layout>
  );
}

export default ApproveRejectDoctor;
