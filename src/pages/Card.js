import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)




function Card() {

    //Use login service
    const user_id = "u1";
    const username = "admin";
    const password = "admin";

    //Data
    const [Cards, setCards] = useState([]);

    useEffect(() => {
        //Get data
        const getCards = async () => {
            await axios.get("http://localhost:8080/Agromart/api/card/get_cards/" + user_id,
                {
                    auth: {
                        username: username,
                        password: password,
                    },
                }).then((res) => {
                    setCards(res.data);
                }).catch((err) => {
                    MySwal.fire({
                        title: "Error",
                        icon: "error",
                        text: "Cards not retrieved",
                    }).then(function () {
                        // window.location.href = "/";
                    })
                });
        }
        getCards();
    }, []);

    // Delete
    const handleDelete = (e) => {
        e.preventDefault();
        let id = e.target.id;
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                axios.delete("http://localhost:8080/Agromart/api/card/delete_card/" + id,
                    {
                        auth: {
                            username: username,
                            password: password,
                        },
                    }).then((res) => {
                        MySwal.fire({
                            title: "Success",
                            icon: "success",
                        }).then(function () {
                            // window.location.href = "/PaymentPage";
                        })
                    }).catch((err) => {
                        MySwal.fire({
                            title: "Error",
                            icon: "error",
                            text: "Something went wrong",
                        }).then(function () {
                            // window.location.href = "/PaymentPage";
                        })
                    });
            }
        })
    }




    return (
        <>
            <div>Cards</div>

            <br></br>
            <form action='#' method='post'>
                <div className='row'>
                    <div className='col-2'>
                    </div>
                    <div className='col-5'>
                        <p>card number</p>
                    </div>
                    <div className='col-5'>
                        <p>Action</p>
                    </div>
                </div>
                {Cards.map((card) => {
                    return (


                        <div className='row'>
                            <div className='col-2'>
                                <input type='radio' name='card' value='card1'></input>
                            </div>
                            <div className='col-5'>
                                <p>{card.cardNumber}</p>
                            </div>
                            <div className='col-5'>
                                <a href={`/UpdateCard/${card.id}`} className='mx-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                    </svg>
                                </a>
                                <a href=' ' onClick={handleDelete} id={card.id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    )
                })}
                <div className='row'>
                    <div className='col-2'>
                        <input type='radio' name='card' value='card1'></input>
                    </div>
                    <div className='col-5'>
                        <p>1234 5678 9101 1234</p>
                    </div>
                    <div className='col-5'>
                        <a href={`/UpdateCard/1`} className='mx-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                            </svg>
                        </a>
                        <a href=' 'onClick={handleDelete} id="1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                        </a>
                    </div>
                </div>

            </form>
            <div className='text-end'>
                <a href='/AddCard'>
                    <button type="button" className='btn btn-primary ' >Add Card</button>

                </a>

            </div>


        </>


    )
}

export default Card