import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import AdminUserscreen from "./AdminUserscreen";
import AdminRooms from "./AdminRooms";
import Swal from "sweetalert2";

const { TabPane } = Tabs;

function AdminScreen() {

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
            window.location.href = "/home";
        }
    }, []);

    return (
        <div>
            <h1><b>Admin panel</b></h1>
            <Tabs defaultActiveKey="1">
                <TabPane tab="location" key="1">
                    <Location />
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="3">
                    <AdminRooms />
                </TabPane>
                <TabPane tab="Add Rooms" key="4">
                    <AddingNew />
                </TabPane>
                <TabPane tab="Users" key="5">
                    <AdminUserscreen />
                </TabPane>

            </Tabs>
        </div>
    )

}
export default AdminScreen;

export function Bookings() {

    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await (await axios.get("/api/bookings/getAllBookings")).data
                setBookings(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        }
        fetchData();

    }, [])

    return (
        <div className="table-container">


            <h3>Bookings</h3>

            {loading && (<Loader />)}

            <table className="bs">
                <thead>
                    <tr>
                        <th>Boooking Id : </th>
                        <th>User Id : </th>
                        <th>Room : </th>
                        <th>From : </th>
                        <th>To : </th>
                        <th>Status : </th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 &&
                        bookings.map((booking) => {
                            return (
                                <tr key={booking._id}>
                                    <td data-label="Boooking Id : ">{booking._id}</td>
                                    <td data-label="User Id : ">{booking.userid}</td>
                                    <td data-label="Room : ">{booking.places}</td>
                                    <td data-label="From : ">{booking.fromDate}</td>
                                    <td data-label="To : ">{booking.toDate}</td>
                                    <td data-label="Status : ">{booking.status}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table><br />
        </div>
    )
}

export function Location() {
    const [location, setLocation] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await (await axios.get("/api/locations/getlocations")).data
                setLocation(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        }
        fetchData();

    }, [])

    return (
        <div className="table-container">

            <h3>locations</h3>
            {loading && (<Loader />)}

            <table className="bs">
                <thead>
                    <tr>
                        <th>Location : </th>
                        <th>Name : </th>
                        <th>Reviews : </th>
                        <th>Phonenumber : </th>
                    </tr>
                </thead>
                <tbody>
                    {location.length > 0 &&
                        location.map((locations) => {
                            return (
                                <tr key={locations._id}>
                                    <td data-label="Location Id : ">{locations._id}</td>
                                    <td data-label="Name : ">{locations.lname}</td>
                                    <td data-label="Reviews : ">{locations.lreviews}</td>
                                    <td data-label="Phonenumber : ">{locations.lphonenumber}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table><br />
        </div>
    )
}

export function AddingNew() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [rentperday, setRentPerDay] = useState();
    const [maxcount, setMaxCount] = useState();
    const [description, setDescription] = useState();
    const [phonenumber, setPhonenumber] = useState();
    const [type, setType] = useState();
    const [imageurl1, setImageUrl1] = useState();
    const [imageurl2, setImageUrl2] = useState();
    const [imageurl3, setImageUrl3] = useState();
    const [fooddescription, setFoodDescription] = useState();
    const [foodhealth, setFoodHealth] = useState();
    const [foodname, setFoodName] = useState();
    const [foodtype1, setFoodType1] = useState();
    const [foodtype2, setFoodType2] = useState();
    const [foodimg1, setFoodImg1] = useState();
    const [foodimg2, setFoodImg2] = useState();
    const [foodimg3, setFoodImg3] = useState();
    const [foodimg4, setFoodImg4] = useState();
    const [foodimg5, setFoodImg5] = useState();
    const [foodimg6, setFoodImg6] = useState();

    async function addRoom() {
        const newroom = {
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls: [imageurl1, imageurl2, imageurl3],
            fooddescription,
            foodhealth,
            foodname,
            foodtype1,
            foodtype2,
            foodimgurls: [foodimg1, foodimg2, foodimg3, foodimg4, foodimg5, foodimg6]
        }

        try {
            setLoading(true)
            const result = await (await axios.post('/api/places/addroom', newroom)).data
            console.log(result);
            setLoading(false)
            Swal.fire('Congrats', 'Your New Room Added Successfully', 'success').then(result => {
                window.location.href = '/home'
            })
        } catch (error) {
            console.log(error);
            setLoading(false)
            Swal.fire('Oops', 'Something went wrong', 'error')
        }
    }

    // === locations admin screen
    const [lname, setLocationName] = useState();
    const [lreviews, setLocationReviews] = useState();
    const [lphonenumber, setLocationPhoneNumber] = useState();
    const [lrentperday, setLocationRentPerDay] = useState();
    const [locationimg1, setLocationImg1] = useState();
    const [ltype, setLocationType] = useState();
    const [ldescription, setLocationDescription] = useState();



    async function addLocation() {
        const newlocation = {

            lname,
            lphonenumber,
            lreviews,
            lrentperday,
            ltype,
            ldescription,
            limageurls: [locationimg1]
        }

        try {
            setLoading(true)
            const locationresult = await (await axios.post('/api/locations/addlocation', newlocation)).data
            console.log(locationresult);
            setLoading(false)
            Swal.fire('Congrats', 'Your New Location Added Successfully', 'success').then(locationresult => {
                window.location.href = '/home'
            })
        } catch (error) {
            console.log(error);
            setLoading(false)
            Swal.fire('Oops', 'Something went wrong', 'error')
        }
    }

    return (
        <div className="row">
            <div className="col-md-5 admin-add-new">
                <h1>Rooms</h1>
                <input type="text" placeholder="room name"
                    value={name} onChange={(e) => { setName(e.target.value) }}
                /><br />
                <input type="text" placeholder="rent per day"
                    value={rentperday} onChange={(e) => { setRentPerDay(e.target.value) }}
                /><br />
                <input type="text" placeholder="max count"
                    value={maxcount} onChange={(e) => { setMaxCount(e.target.value) }}
                /><br />
                <input type="text" placeholder="description"
                    value={description} onChange={(e) => { setDescription(e.target.value) }}
                /><br />
                <input type="text" placeholder="phone number"
                    value={phonenumber} onChange={(e) => { setPhonenumber(e.target.value) }}
                /><br />



                <input type="text" placeholder="type"
                    value={type} onChange={(e) => { setType(e.target.value) }}
                /><br />
                <input type="text" placeholder="image url 1"
                    value={imageurl1} onChange={(e) => { setImageUrl1(e.target.value) }}
                /><br />
                <input type="text" placeholder="image url 2"
                    value={imageurl2} onChange={(e) => { setImageUrl2(e.target.value) }}
                /><br />
                <input type="text" placeholder="image url 3"
                    value={imageurl3} onChange={(e) => { setImageUrl3(e.target.value) }}
                /><br />
                <br/><br/>
                <h1>Food</h1>

                <input type="text" placeholder="food description"
                    value={fooddescription} onChange={(e) => { setFoodDescription(e.target.value) }}
                /><br />
                <input type="text" placeholder="foodhealth"
                    value={foodhealth} onChange={(e) => { setFoodHealth(e.target.value) }}
                /><br />
                <input type="text" placeholder="foodname"
                    value={foodname} onChange={(e) => { setFoodName(e.target.value) }}
                /><br />
                <input type="text" placeholder="foodtype1"
                    value={foodtype1} onChange={(e) => { setFoodType1(e.target.value) }}
                /><br />
                <input type="text" placeholder="foodtype1"
                    value={foodtype2} onChange={(e) => { setFoodType2(e.target.value) }}
                /><br />
                <input type="text" placeholder="food image url 1"
                    value={foodimg1} onChange={(e) => { setFoodImg1(e.target.value) }}
                /><br />
                <input type="text" placeholder="food image url 2"
                    value={foodimg2} onChange={(e) => { setFoodImg2(e.target.value) }}
                /><br />
                <input type="text" placeholder="food image url 3"
                    value={foodimg3} onChange={(e) => { setFoodImg3(e.target.value) }}
                /><br />
                <input type="text" placeholder="food image url 4"
                    value={foodimg4} onChange={(e) => { setFoodImg4(e.target.value) }}
                /><br />
                <input type="text" placeholder="food image url 5"
                    value={foodimg5} onChange={(e) => { setFoodImg5(e.target.value) }}
                /><br />
                <input type="text" placeholder="food image url 6"
                    value={foodimg6} onChange={(e) => { setFoodImg6(e.target.value) }}
                /><br />

                <div>
                    <button className="pay" onClick={addRoom}>Add New</button>
                </div>
                <br /><br />
                <h1>Location</h1>

                <input type="text" placeholder="location name"
                    value={lname} onChange={(e) => { setLocationName(e.target.value) }}
                /><br />
                <input type="text" placeholder="location review"
                    value={lreviews} onChange={(e) => { setLocationReviews(e.target.value) }}
                /><br />
                <input type="text" placeholder="location phone number"
                    value={lphonenumber} onChange={(e) => { setLocationPhoneNumber(e.target.value) }}
                /><br />
                <input type="text" placeholder="location rent per day"
                    value={lrentperday} onChange={(e) => { setLocationRentPerDay(e.target.value) }}
                /><br />
                <input type="text" placeholder="location Type"
                    value={ltype} onChange={(e) => { setLocationType(e.target.value) }}
                /><br />
                <input type="text" placeholder="location img url"
                    value={ldescription} onChange={(e) => { setLocationDescription(e.target.value) }}
                /><br />
                <input type="text" placeholder="location description"
                    value={locationimg1} onChange={(e) => { setLocationImg1(e.target.value) }}
                /><br />

                <div>
                    <button className="pay" onClick={addLocation}>Add New Location</button>
                </div>
                <br/><br/>
            </div>

            

        </div>
    )
}
