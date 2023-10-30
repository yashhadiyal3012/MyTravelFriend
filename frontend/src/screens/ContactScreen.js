import axios from "axios";
import React, {  useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Contacts from "../components/Contacts";


function ContactScreen() {

    const [contacts, setContact] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        async function fetchData() {

            try {
                setLoading(true)
                const data = (await axios.get("/api/contacts/getcontacts")).data
                setContact(data)
                setLoading(false)
            } catch (error) {
                setError(true)
                console.log(error);
                setLoading(false);

            }

        }
        fetchData();
    }, []);

    return (
        <div className="cont-app" style={{ margin: "150px 0px 0px 0px" }}>
            {loading ? (<center><Loader /></center>) : error ? (<Error />) : (contacts.map(contact => {
                return (
                    <div className="itemss" key={contact._id}>
                        <Contacts contacts={contact} />
                    </div>
                );
            }))}
        </div>

    )
}
export default ContactScreen;