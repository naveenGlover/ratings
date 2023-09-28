import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
    return (
        <header className="header">
            <h1>All Reviews</h1>
            <nav className="nav">
                <Link to="/">Home</Link>
                <div className="dropdown">
                    <Link onClick={() => myFunction()} className="dropbtn">Products</Link>
                    <div id='myDropdown' className="dropdown-content">
                        <Link to="product">Heaadpones</Link>
                        <Link to="product">Smart Watches</Link>
                        <Link to="product">Laptops</Link>
                        <Link to="product">Mobiles</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
