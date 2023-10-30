import React from "react";
import { Link } from 'react-router-dom';

function Contact({ contacts }) {

    function img(event) {
        event.target.classList.toggle("active");
    }

    return (
        <div className="cont-img" style={{ backgroundColor:"rgb(140, 171, 255)", margin: "10px 0px 0px 0px" }} >
            <div className="cont-hover">

                <div className="cont-container">
                    <div className="cont-wrap">
                        <a href="#">
                            <img src={contacts.cimageurls[0]} alt='img.jpg' className="img" onClick={img} />
                        </a>
                        <div className="cont-title txt-shadow">{contacts.cname}</div>
                        <div className="cont-place  txt-shadow"><i className="fa-solid fa-location-dot" />{contacts.clocation}</div>
                    </div>
                    <div className="cont-content">
                        <p className="txt-shadow">{contacts.cphonenumber}</p>
                        <p className="txt-shadow">{contacts.cemail}</p>
                        <p className="txt-shadow">{contacts.ctype1}<br />{contacts.ctype2}</p>
                        <div className="cont-buttons">
                            <div className="cont-btn">
                                <button><a href={contacts.clink1}>View here</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
