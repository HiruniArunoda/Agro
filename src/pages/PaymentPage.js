import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Card from './Card';

const MySwal = withReactContent(Swal)
const qs = require('qs');


//Use login service
// const seller_id = "s1";
const user_id = "u1";
const username = "admin";
const password = "admin";

function PaymentPage() {
    const itemsList = [
        { key: "0", value: [{ Item: "Coconut Plant", QTY: 1, Price: 850.00 }] },
        { key: "1", value: [{ Item: "Chili Plant", QTY: 5, Price: 200.00 }] },
    ]
    
    


    const [items] = useState(itemsList)
    const [date]=useState(new Date());
    console.log('date = ' + date)
    let total = 0;
    items.forEach(item => {
        total = total + (item.value[0].Price * item.value[0].QTY);
    });
    const [totalPrice] = useState(total);
    //send payment details to server
    const sendPaymentDetails = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/Agromart/api/payment/add_payment",
            qs.stringify({
                userID: user_id,
                total: total,
                date: date
                
            }), {
                auth: {
                    username: username,
                    password: password,
                },
            }).then((res) => {
                MySwal.fire({
                    title: "Success",
                    icon: "success",
                    text: "Payment success",
                }).then(function () {
                    window.location.href = "/";
                })
            }).catch((err) => {
                MySwal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Payment unsuccessful",
                }).then(function () {
                    // window.location.href = "/";
                })
            })
    }

    return (
        <>
            <div className='container '>
                <div class="card" tabIndex="-1" role="dialog">
                    <div class="card-header">
                        Payment
                    </div>

                    <div class="card-body text-center">
                        <div className='text-start'>
                            <div className='row mt-3'>
                                <div className='col-6'>
                                    <strong>Item</strong>
                                </div>
                                <div className='col-2'>
                                    <strong>QTY</strong>
                                </div>
                                <div className='col-4 text-center'>
                                    <strong>Price</strong>
                                </div>


                            </div>
                          
                            {itemsList.map(item => (

                                <div className='row mt-3'>
                                    <div className='col-6'>
                                        {item.value[0].Item}
                                    </div>
                                    <div className='col-2'>
                                        {item.value[0].QTY}
                                    </div>
                                    <div className='col-4 text-end'>
                                        {(item.value[0].QTY)*item.value[0].Price}LKR
                                        
                                    </div>
                                </div>
                            ))
                            }

                            
                            <div className='row mt-3'>
                                <div className='col-6'>
                                    <strong>Total bill value  </strong>
                                </div>
                                <div className='col-2'>
                                    <strong> = </strong>
                                </div>
                                <div className='col-4 text-end'>
                                    <strong> {totalPrice} LKR</strong>
                                </div>

                            </div>


                        </div>
                        <hr />
                        <Card />
                    </div>
                    <div class="card-footer text-muted text-end">
                        <button className='btn btn-primary mx-2'>cancel</button>
                        <button className='btn btn-danger' onClick={sendPaymentDetails}>pay now</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage