import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal)
const qs = require('qs');



function UpdateCard() {
    //get id from  url
    let { id } = useParams();

    //Use login service
    // const user_id = "ui";
    const username = "admin";
    const password = "admin";

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVC, setCardCVC] = useState("");

    const [isFetching, setFetching] = useState(true);

    useEffect(() => {
        const getCard = async () => {
            await axios.get(`http://localhost:8080/api/card/${id}`, {
                auth: {
                    username: username,
                    password: password
                },
            }
            ).then(res => {
                setCardName(res.data.cardName);
                setCardNumber(res.data.cardNumber);
                setCardExpiry(res.data.cardExpiry);
                setCardCVC(res.data.cardCVC);
                setFetching(false);
            }).catch(err => {
                alert(err);
                setFetching(true);
            });
        }

        getCard();
    }, [id]);


    // send data to server

    function sendData(e) {
        e.preventDefault();

        //Data object
        const newCard = {
            'cardName': cardName,
            'cardNumber': cardNumber,
            'cardExpiry': cardExpiry,
            'cardCVC': cardCVC
        };

        axios.put(`http://localhost:8080/api/card/${id}`, qs.stringify(newCard), {
            auth: {
                username: username,
                password: password
            },
        }
        ).then(res => {
            MySwal.fire({
                title: 'Success',
                text: 'Card updated successfully',
                icon: 'success'
            }).then(function () {
                window.location.href = '/viewSellerCards';
            });
        }).catch(err => {
            MySwal.fire({
                title: 'Error',
                text: 'Card not updated',
                icon: 'error'
            });
        });
    }



    if (!isFetching) {
        return (
            <div className="container">
                <h1>Update Card Details</h1>
                <div className='d-flex justify-content-center'>
                    <div id="cardForm" className='card col-6' style={{ width: '18rem' }}>
                        <form onSubmit={sendData}>
                            <div className="form-group">
                                <label htmlFor="cardName">Card Name</label>
                                <input type="text" className="form-control" id="cardName" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input type="text" className="form-control" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="cardExpiry">Expiry Date</label>
                                <input type="text" className="form-control" id="cardExpiry" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="cardCVC">CVC</label>
                                <input type="text" className='form-control' id="cvc" value={cardCVC} onChange={(e) => setCardCVC(e.target.value)} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return (<p>Loading...</p>)
    }
}

export default UpdateCard