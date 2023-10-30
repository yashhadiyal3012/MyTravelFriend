// import React, { useState } from 'react';
// import { Modal, Button, Carousel } from "react-bootstrap";
// import { Link } from "react-router-dom";

// function Foods({ places }) {

//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
    
//     return (
//         <div>
//             <div style={{ float: "right" }}>
//                     <button className="view" onClick={handleShow}>View Details</button>
//                 </div>
//             <h1>hai</h1>
//             <Modal show={show} onHide={handleClose} size="lg">
//                 <Modal.Header closeButton>
//                     <Modal.Title>{places.name}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Carousel>
//                         {places.imageurls.map(url => {
//                             return <Carousel.Item key={url}>
//                                 <img
//                                     className="d-block w-100 bigimg"
//                                     src={url} alt="img.jpg"
//                                 />
//                             </Carousel.Item>

//                         })}
//                     </Carousel>
//                     <p>{places.description}</p>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button className="view" onClick={handleClose}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     )
// }
// export default Foods;