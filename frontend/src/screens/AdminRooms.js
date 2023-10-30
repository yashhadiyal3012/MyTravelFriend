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
      <h3>Rooms</h3>

      {loading && <Loader />}

      <table className="bs">
        <thead>
          <tr>
            <th>Room Id : </th>
            <th>Name : </th>
            <th>Type : </th>
            <th>Rent per day : </th>
            <th>Max count : </th>
            <th>Phone number : </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 &&
            rooms.map((room) => {
              return (
                <tr key={room._id}>
                  <td data-label="Room Id : ">{room._id}</td>
                  <td data-label="Name : ">{room.name}</td>
                  <td data-label="Type : ">{room.type}</td>
                  <td data-label="Rent per day : ">{room.rentperday}</td>
                  <td data-label="Max count : ">{room.maxcount}</td>
                  <td data-label="Phone number : ">{room.phonenumber}</td>
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
    label="Name"
    name="name"
    rules={[{ required: true, message: "Please enter a name" }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="Type"
    name="type"
    rules={[{ required: true, message: "Please enter a type" }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="Rent per day"
    name="rentperday"
    rules={[{ required: true, message: "Please enter the rent per day" }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="Max count"
    name="maxcount"
    rules={[{ required: true, message: "Please enter the max count" }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="Phone number"
    name="phonenumber"
    rules={[{ required: true, message: "Please enter a phone number" }]}
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

