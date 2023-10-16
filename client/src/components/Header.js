import React from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

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
    const productHandles = [
        {
            handle: "wireless-kids-bluetooth-headset",
            name: "Headphones"
        },
        {
            handle: "smart-watches-bluetooth-calling",
            name: "Smart Watches"
        },
        {
            handle: "asus-chromebook-celeron-dual-core-n4020",
            name: "Laptops"
        },
        {
            handle: "apple-iphone-15-pro-max",
            name: "Mobiles"
        }
    ]
    return (
        <header className="header">
            <h1>All Reviews</h1>
            <nav className="nav">
                <Link to="/">Home</Link>
                <div className="dropdown">
                    <div onClick={() => myFunction()} className="dropbtn">Products <FaAngleDown /></div>
                    <div id='myDropdown' className="dropdown-content">
                        {
                            productHandles.map((product) => {
                                return <Link key={product.handle} to={`/product/${product.handle}`}>{product.name}</Link>
                            })
                        }
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
