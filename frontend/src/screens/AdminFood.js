import React, { useState, useEffect } from "react";
import { Tabs, Modal, Form, Input, Button } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [updatedRoomData, setUpdatedRoomData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await (await axios.get("/api/places/getallplaces")).data;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (roomId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`/api/places/deleteplace/${roomId}`);
        setRooms((prevRooms) =>
          prevRooms.filter((room) => room._id !== roomId)
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const showUpdateModal = (room) => {
    setUpdatedRoomData(room);
    setUpdateModalVisible(true);
  };

  const handleUpdateSubmit = async (values) => {
    try {
      await axios.put(`/api/places/updateplace/${updatedRoomData._id}`, values);
      setUpdateModalVisible(false);
      // Optionally, you can update the rooms state with the updated data
      // Reload the data or update it as needed
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="table-container" >
      <h3>Foods</h3>

      {loading && <Loader />}

      <table className="bs">
        <thead>
          <tr>
            <th>Food Id : </th>
            <th>foodname : </th>
            <th>description : </th>
            <th>foodhealth : </th>
            <th>foodtype1: </th>
            <th>foodtype2 : </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 &&
            rooms.map((room) => {
              return (
                <tr key={room._id}>
                  <td data-label="Food Id : ">{room._id}</td>
                  <td data-label="foodname : ">{room.foodname}</td>
                  <td data-label="fooddescription : ">{room.fooddescription}</td>
                  <td data-label="foodhealth: ">{room.foodhealth}</td>
                  <td data-label="foodtype1 : ">{room.foodtype1}</td>
                  <td data-label="foodtype2 : ">{room.foodtype2}</td>
                  <td data-label="Actions">
                    <button
                      onClick={() => handleDelete(room._id)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "4px",
                        margin: "4px",
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => showUpdateModal(room)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "4px",
                        margin: "4px",
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <br />

      <Modal
        title="Update Room"
        visible={isUpdateModalVisible}
        onCancel={() => setUpdateModalVisible(false)}
        footer={null}
      >
        <Form
  name="update-room-form"
  onFinish={handleUpdateSubmit}
  initialValues={updatedRoomData}
>
  <Form.Item
    label="foodname"
    name="foodname"
    rules={[{ required: true, message: "Please enter a foodname" }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="foodhealth"
    name="foodhealth"
    rules={[{ required: true, message: "Please enter a foodhealth" }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="fooddescription"
    name="fooddescription"
    rules={[{ required: true, message: "Please enter the fooddescription" }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="foodtype1"
    name="foodtype1"
    rules={[{ required: true, message: "Please enter the foodtype1" }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="foodtype2"
    name="foodtype2"
    rules={[{ required: true, message: "Please enter a foodtype2" }]}
  >
    <Input />
  </Form.Item>

  <Form.Item>
    <Button type="primary" htmlType="submit">
      Update
    </Button>
  </Form.Item>
</Form>
      </Modal>
    </div>
  );
}

export default AdminRooms;

