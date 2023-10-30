import axios from "axios";
import React, { useState, useEffect } from "react";
import Locations from "../components/Locations";
import Loader from "../components/Loader";
import Error from "../components/Error";

function LocationScreen() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items to display per page

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const data = (await axios.get("/api/locations/getlocations")).data;
      setLocations(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }

  function filterBySearch() {
    if (!searchKey) {
      // If the search key is empty, display all locations
      fetchData();
      return;
    }

    const filteredLocations = locations.filter((location) =>
      location.lname.toLowerCase().includes(searchKey.toLowerCase())
    );
    setLocations(filteredLocations);
  }

  // Calculate the indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedLocations = locations.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ margin: "20px 10px" }} id="jk" >
      <div className="loc-search" style={{ marginBottom: "10px" }}
>
        <input
          className="loc-input"
          type="text"
          placeholder="search location"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyUp={filterBySearch}
        />
        <i className="fa-solid fa-location-crosshairs"></i>
      </div>

      <div className="grid-container">
        {loading ? (
          <center>
            <Loader />
          </center>
        ) : error ? (
          <Error />
        ) : (
          displayedLocations.map((location) => {
            return (
              <div className="item" key={location._id}>
                <Locations locations={location} />
              </div>
            );
          })
        )}
  </div>
        <div className="button-container" >
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= locations.length}
          >
            Next
          </button>
        </div>
    
    </div>
  );
}

export default LocationScreen;

