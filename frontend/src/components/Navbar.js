import React from "react";

function Navbar() {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    function logout() {
        localStorage.removeItem("currentUser");
        window.location.href = "/login";
    }

    return (
        <div className="header" style={{ backgroundColor: "rgb(140, 171, 255)" , position: "fixed", top: 0, width: "100%", zIndex: 100}}>
            <nav className="nav" >
                <h1 className="nav-title"><a href="/home">My Travel Friend</a></h1>
                <div className="nav-menu">
                    <a href="/home" className="home">Home</a>
                    <a href="/home#jk" className="home">Book Hotel</a>
                    <a href="/about" className="about">About</a>
                    <a href="/contact" className="about">Contact</a>

                    {user ? (
                        <div className="dropdown">
                            <button className="nav-name" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa-solid fa-user"></i>
                                {user.name}
                                <i className="fa-sharp fa-solid fa-caret-down"></i>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="/profile">Profile</a>
                                <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                            </div>
                        </div>
                    ) : (
                        <>
                            <a href="/register" className="pay">Register</a>
                            <a href="/login" className="pay">Login</a>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
