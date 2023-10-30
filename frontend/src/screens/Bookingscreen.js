import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
import Swal from "sweetalert2";

function BookingScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [places, setPlaces] = useState();
  let { id, fromDate, toDate } = useParams();

  const firstDate = moment(fromDate, "DD-MM-YYYY");
  const lastDate = moment(toDate, "DD-MM-YYYY");

  const totalDays = moment.duration(lastDate.diff(firstDate)).asDays() + 1;

  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/register";
    }

    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await axios.post("/api/places/getPlaceById", { placesid: id });
        setTotalAmount(data.rentperday * totalDays);
        setPlaces(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }

    fetchData();
  }, []);

  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      places,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      token,
    };

    try {
      setLoading(true);
      await axios.post("/api/bookings/bookplace", bookingDetails);
      setLoading(false);
      Swal.fire("Congratulations", "Your Room Booked Successfully", "success").then((result) => {
        window.location.href = "/profile";
      });
    } catch (error) {
      setLoading(false);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : places ? (
        <div>
          <div className="details">
            <div className="booking-row bs" >
              <div className="left">
                <img src={places.imageurls[0]} alt="img" />
              </div>
              <div className="right">
                <div className="cont" style={{ textAlign: "right" }}>
                  <h1>Booking Details</h1>
                  <hr />
                  <h4>{places.name}</h4>
                  <b>
                    <p>Name: {JSON.parse(localStorage.getItem("currentUser")).name}</p>
                    <p>From Date: {fromDate}</p>
                    <p>To Date: {toDate}</p>
                    <p>Max Count: {places.maxcount}</p>
                  </b>
                  <h1>Amount</h1>
                  <hr />
                  <b>
                    <p>Total days: {totalDays}</p>
                    <p>Rent per day: {places.rentperday}</p>
                    <p>Total Amount: {totalAmount}</p>
                  </b>
                  <StripeCheckout
                    amount={totalAmount * 100}
                    token={onToken}
                    currency="INR"
                    stripeKey="pk_test_51MjMdXSB50ekGdkVXZoXT6N3ajezCvH2N1r5BP5OduMERgjJb41lEPsDNSbRg0sXPY2Ktj2iGPudIo29sXnkFrxT00p5jkAWGc"
                  >
                    <button className="pay">Pay Now</button>
                  </StripeCheckout>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
      <br />
    </div>
  );
}

export default BookingScreen;
