import React, { useState } from 'react';
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Places({ places, fromDate, toDate }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <div className="row box-shadow">
            <div className="col-md-4">
                <div className="inner">
                    <img src={places.imageurls[0]} className="smallimg" alt='img.jpg' />

                </div>

            </div>
            <div className="col-md-7">
                <h1>{places.name}</h1>
                {" "}
                <p className="text">Max Count : {places.maxcount}</p>
                <p className="text">Phone Number : {places.phonenumber}</p>
                <p className="text">Type : {places.type}</p>

                <Link to={`/foods/${places._id}`}>
                    <button className="view">Food</button>
                </Link>

                {(fromDate && toDate) && (
                    <Link to={`/book/${places._id}/${fromDate}/${toDate}`}>
                        <button className="view">Book Now</button>
                    </Link>
                )}

                <div style={{ float: "right" }}>
                    <button className="view" onClick={handleShow}>View Details</button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{places.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {places.imageurls.map(url => {
                            return <Carousel.Item key={url}>
                                <img
                                    className="d-block w-100 bigimg"
                                    src={url} alt="img.jpg"
                                />
                            </Carousel.Item>

                        })}
                    </Carousel>
                    <p>{places.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="view" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>

    )
}

export default Places;

