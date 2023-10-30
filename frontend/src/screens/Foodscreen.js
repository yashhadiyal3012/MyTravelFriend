import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Foodscreen() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [places, setPlaces] = useState();

    let { id } = useParams();

    useEffect(() => {

        async function fetchData() {

            try {
                setLoading(true)

                const data = (await axios.post("/api/places/getPlaceByIdFood", { placesid: id })).data

                setPlaces(data);
                setLoading(false)
            } catch (error) {
                setLoading(false);
                setError(true)
            }

        }
        fetchData();

    }, [])

    return (

        <div style={{ margin: "150px 0px 0px 0px" }}>
            {loading ? (<Loader />) : places ? (<div>

                <main className="food-main">
                    <center>
                        <h1 className="food-header">FOOD PROVIDE</h1>
                    </center>
                    {/* ==== 1  ===*/}
                    
                    <div className="food-container">
                        <div className="food-left">
                            <img src={places.foodimgurls[0]} alt="img" />
                        </div>
                        <div className="food-right">
                            <div className="food-details">
                                <div className="head">
                                    <h2 className="food-name">Foods Available</h2>
                                    <h2 className="food-name">Time : Morning</h2>
                                </div>
                                <hr/>
                                <p>{places.foodhealth}</p>
                                <p>{places.fooddescription}</p>
                                <hr/>
                                <h2 className="food-name">Type : {places.foodtype1}</h2>
                            </div>
                        </div>
                    </div>
                    
                    {/* === 2 ==== */}

                    <div className="food-container">
                        <div className="food-left">
                            <img src={places.foodimgurls[1]} alt="img" />
                        </div>
                        <div className="food-right">
                            <div className="food-details">
                                <div className="head">
                                    <h2 className="food-name">Foods Available</h2>
                                    <h2 className="food-name">Time : afternoon</h2>
                                </div>
                                <hr/>
                                <p>{places.foodhealth}</p>
                                <p>{places.fooddescription}</p>
                                <hr/>
                                <h2 className="food-name">Type : {places.foodtype1}</h2>
                            </div>
                        </div>
                    </div>

                    {/* ==== 3 ==== */}

                    <div className="food-container">
                        <div className="food-left">
                            <img src={places.foodimgurls[2]} alt="img" />
                        </div>
                        <div className="food-right">
                            <div className="food-details">
                                <div className="head">
                                    <h2 className="food-name">Foods Available</h2>
                                    <h2 className="food-name">Time : night</h2>
                                </div>
                                <hr/>
                                <p>{places.foodhealth}</p>
                                <p>{places.fooddescription}</p>
                                <hr/>
                                <h2 className="food-name">Type : {places.foodtype1}</h2>
                            </div>
                        </div>
                    </div>

                <br/>

                    {/* ==== 4 ==== */}

                    <center>
                        <h1 className="food-header">NON VEG</h1>
                    </center>

                    <div className="food-container">
                        <div className="food-left">
                            <img src={places.foodimgurls[3]} alt="img" />
                        </div>
                        <div className="food-right">
                            <div className="food-details">
                                <div className="head">
                                    <h2 className="food-name">Foods Available</h2>
                                    <h2 className="food-name">Time : Morning</h2>
                                </div>
                                <hr/>
                                <p>{places.foodhealth}</p>
                                <p>{places.fooddescription}</p>
                                <hr/>
                                <h2 className="food-name">Type : {places.foodtype2}</h2>
                            </div>
                        </div>
                    </div>

                    {/* ===== 5 ===== */}

                    <div className="food-container">
                        <div className="food-left">
                            <img src={places.foodimgurls[4]} alt="img" />
                        </div>
                        <div className="food-right">
                            <div className="food-details">
                                <div className="head">
                                    <h2 className="food-name">Foods Available</h2>
                                    <h2 className="food-name">Time : Morning</h2>
                                </div>
                                <hr/>
                                <p>{places.foodhealth}</p>
                                <p>{places.fooddescription}</p>
                                <hr/>
                                <h2 className="food-name">Type : {places.foodtype2}</h2>
                            </div>
                        </div>
                    </div>

                    {/* ==== 6 ==== */}

                    <div className="food-container">
                        <div className="food-left">
                            <img src={places.foodimgurls[5]} alt="img" />
                        </div>
                        <div className="food-right">
                            <div className="food-details">
                                <div className="head">
                                    <h2 className="food-name">Foods Available</h2>
                                    <h2 className="food-name">Time : Morning</h2>
                                </div>
                                <hr/>
                                <p>{places.foodhealth}</p>
                                <p>{places.fooddescription}</p>
                                <hr/>
                                <h2 className="food-name">Type : {places.foodtype2}</h2>
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                </main>

            </div>): (<Error />)}
        </div>
    )
}
export default Foodscreen;