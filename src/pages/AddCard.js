import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)
const qs = require('qs');


//Use login service
const seller_id = "s1";
const user_id = "u1";
const username = "admin";
const password = "admin";

function AddCard() {

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvc, setCardCVC] = useState('');
    const [userID, setUserID] = useState(user_id);

    //Send data to server

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Data Object
        const data = {
            cardNumber: cardNumber,
            cardName: cardName,
            cardExpiry: cardExpiry,
            cardCvc: cardCvc,
            userID: userID
        }

        axios.post('http://localhost:8080/api/card/add_card',
            qs.stringify(data), {
            auth: {
                username: username,
                password: password,
            },
        }).then(() => {

            MySwal.fire({
                title: "Success",
                icon: "success",
                text: "Card added successfully",
            }).then(function () {
                window.location.href = "/PaymentPage";
            })
        }).catch((err) => {
            MySwal.fire({
                title: "Error",
                icon: "error",
                text: "Card not added",
            }).then(function () {
                window.location.href = "/PaymentPage";
            })
        });
    }

    return (
        <div className='container'>
            <h1>Add New Card</h1>
            <div className='d-flex justify-content-center'>
                <div id='itemForm' className='card col-6' style={{ padding: '20px' }}>
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="cardNumber">Card Number</label>
                            <input type="text" class="form-control" id="cardNumber"
                                onChange={(e) => {
                                    setCardNumber(e.target.value)
                                }} required>
                            </input>
                        </div>
                        <div class="form-group">
                            <label for="cardName">Card Name</label>
                            <input type="text" class="form-control" id="cardName"
                                onChange={(e) => {
                                    setCardName(e.target.value)
                                }} required>
                            </input>
                        </div>
                        <div class="form-group">
                            <label for="cardExpiry">Expiry Date</label>
                            <input type="date" class="form-control" id="cardExpiry"
                                onChange={(e) => {
                                    setCardExpiry(e.target.value)
                                }} required>
                            </input>
                        </div>
                        <div class="form-group">
                            <label for="cardCVC">CVC</label>
                            <input type="text" class="form-control" id="cardCVC"
                                onChange={(e) => {
                                    setCardCVC(e.target.value)
                                }} required>
                            </input>
                        </div>
                        <div className='text-center'>
                            <button id="submitBtn" type="submit" class="btn btn-primary mt-3 ">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCard