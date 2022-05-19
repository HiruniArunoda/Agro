import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';



function NavHeader(){

    return (
        <div class="topnav" id="myTopnav">
        <a href="#home" class="active">AGROMART</a>
        <a href="/viewSellerItems">Items</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
        <a href="javascript:void(0);" class="icon" onclick="myFunction()">&#9776;</a>
        </div>
    );
}

export default NavHeader