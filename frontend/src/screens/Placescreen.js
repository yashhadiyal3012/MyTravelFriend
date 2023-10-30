import React, { useState, useEffect } from "react";
import Places from "../components/Places";
import axios from "axios";
import Loader from "../components/Loader";
import { DatePicker } from 'antd';
import "antd/dist/reset.css";
import moment from "moment";
import Foods from "../components/Foods";
const { RangePicker } = DatePicker;

function PlaceScreen() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [duplicateRooms, setDuplicateRooms] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [type, setType] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const data = (await axios.get('/api/places/getallplaces')).data;
                setDuplicateRooms(data);
                setPlaces(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.log(error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        setCurrentPage(1); // Reset to the first page when filters change.
    }, [fromDate, toDate, searchKey, type]);

    const filterByDate = (dates) => {
        if (!dates || !dates.length) {
            return;
        }
        const from = moment(dates[0].$d).format("DD-MM-YYYY");
        const to = moment(dates[1].$d).format("DD-MM-YYYY");
        setFromDate(from);
        setToDate(to);

        var tempRooms = [];
        for (const place of duplicateRooms) {
            var availability = false;
            if (place.currentbookings.length > 0) {
                for (const booking of place.currentbookings) {
                    if (!moment(from).isBetween(booking.fromDate, booking.toDate)
                        && !moment(to).isBetween(booking.fromDate, booking.toDate)
                    ) {
                        if (
                            from !== booking.fromDate &&
                            from !== booking.toDate &&
                            to !== booking.fromDate &&
                            to !== booking.toDate
                        ) {
                            availability = true;
                        }
                    }
                }
            }
            if (availability === true || place.currentbookings.length === 0) {
                tempRooms.push(place);
            }
        }
        setPlaces(tempRooms);
    }

    function filterBySearch() {
        const tempRooms = duplicateRooms.filter(room => room.name.toLowerCase().includes(searchKey.toLowerCase()))
        setPlaces(tempRooms);
    }

    function filterByType(e) {
        setType(e);

        if (e !== "all") {
            const tempRooms = duplicateRooms.filter(room => room.type.toLowerCase() === e.toLowerCase())
            setPlaces(tempRooms);
        } else {
            setPlaces(duplicateRooms);
        }
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = places.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(places.length / itemsPerPage);

    return (
        <div className="container" style={{ margin: "150px " }} >
            <div className="search">
                <div className="date">
                    <div><RangePicker format="DD-MM-YYYY" onChange={filterByDate} /></div>
                </div>
                <br />
                <input className="bs" type="text" placeholder="search places"
                    value={searchKey} onChange={(e) => { setSearchKey(e.target.value) }} onKeyUp={filterBySearch}
                />
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <select className="select-op" value={type} onChange={(e) => { filterByType(e.target.value) }} >
                <option className="all" value="all">All</option>
                <option value="delux">Delux</option>
                <option value="non-delux">Non-delux</option>
            </select>

            <div className="row justify-content-center mt-5">
                {loading ? (
                    <Loader />
                ) : (
                    currentItems.map((place) => (
                        <div className="col-md-9 mt-2" key={place._id}>
                            <Places places={place} fromDate={fromDate} toDate={toDate} />
                        </div>
                    ))
                )}
            </div>

            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => paginate(currentPage - 1)}>Previous</button>
                )}

                {Array.from({ length: totalPages }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}

                {currentPage < totalPages && (
                    <button onClick={() => paginate(currentPage + 1)}>Next</button>
                )}
            </div>
        </div>
    );
}

export default PlaceScreen;
