import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)
const qs = require('qs');

//Use login service
const seller_id = "s1";
const username = "admin";
const password = "admin";

export default function AddItem(){
 
  const categories = [

    {key : 0, value: "Select category"},
    {key : 1, value: "Livestock"},
    {key : 2, value: "Cereal"},
    {key : 3, value: "Edible forestry products"},
    {key : 4, value: "Non-edible forestry products"},
    {key : 5, value: "Fruits and vegetables"},
    {key : 6, value: "Meat and fish"},
    {key : 7, value: "Milk and dairy products"},
    {key : 8, value: "Baked goods"},
    {key : 9, value: "Frozen goods"},
    {key : 10, value: "Other"}
  ];

  const units = [
    {key : "0", value: "Select unit"},
    {key : "1", value: "kg"},
    {key : "2", value: "g"},
    {key : "3", value: "l"},
    {key : "4", value: "ml"},
    {key : "5", value: "pcs"},
  ]

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [unit, setUnit] = useState("");
    const [price, setPrice] = useState("");

    //Send data to server
    function sendData(e){
      console.log(category);
        e.preventDefault();

        if(category == 0 || unit == 0){
          MySwal.fire({
            title: 'Error',
            text: 'Please select category and unit',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }else{

          //Data object
        const newItem = {
            'seller_id': seller_id,
            'category': category - 1,
            'title': title,
            'description': description,
            'amount': amount,
            'unit': units[unit].value,
            'price': price
        }

       axios.post('http://localhost:8080/Agromart/api/item/add_item', 
       qs.stringify(newItem),{    
        auth: {
          username: username,
          password: password,
        },}
       ).then(()=>{

          MySwal.fire({
                    title: "Success",
                    icon: "success",
                    text: "Item added successfully",
                }).then(function() {
                    window.location.href = "/viewSellerItems";
                })

        }).catch((err) =>{
          MySwal.fire({
            title: "Error",
            icon: "error",
            text: "Item not added",
        });
        });
      }
}

    return(

<div className="container">
  <h1>Add New Item</h1>
  <div className ="d-flex justify-content-center">
<div id="itemForm" className="card col-6" style={{padding:"20px" }}>

<form onSubmit={sendData}>
  <div class="form-group">
    <label for="title">Product Title</label>
    <input type="text" class="form-control" id="title"

        onChange={(e)=>{
                setTitle(e.target.value)
            }} required>
        </input>

  </div>

  <div class="form-group">
    <label for="Category">Category</label>
    <select class="form-control" id="category"  onChange={(e)=>{setCategory(e.target.selectedIndex)}}>
     
    {categories.map(o => (
          <option key={o.key} value={o.key} >{o.value}</option>
        ))}
    </select>
  </div>

  <div class="form-group" col-md-6>
    <label for="amount">Amount</label>
    <input type="number" min="1" step="0.01" class="form-control" id="amount"
        onChange={(e)=>{
                setAmount(e.target.value)
            }} required>
    </input>

    <div class="form-group">
    <label for="Unit">Unit</label>
    <select class="form-control" id="unit" onChange = {e => setUnit(e.target.selectedIndex)}>
    {units.map(o => (
          <option key={o.key} value={o.value}>{o.value}</option>
        ))}
    </select>
  </div>

  </div>


  <div class="form-group">
    <label for="price">Unit Price</label>
    <input type="number" min="1" step="0.01" class="form-control" id="price"

        onChange={(e)=>{
                setPrice(e.target.value)
            }} required>
        </input>

  </div>

  <div class="form-group">
    <label for="description">Description</label>
    <textarea class="form-control" id="description" rows="3"
        onChange={(e)=>{
            setDescription(e.target.value)
        }}>
    </textarea>
  </div>
  <button id="btnSubmit" type="submit" className="btn btn-primary">Add Item</button>
</form>
</div>
    </div>
</div>

  )
}
