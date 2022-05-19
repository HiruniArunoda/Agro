import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)
const qs = require('qs');

export default function UpdateItem(){

//Get item id from url
let {id} = useParams();

//Use login service
const seller_id = "s1";
const username = "admin";
const password = "admin";

    //Data
  const categories = [

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

  const units = {
      0:"kg",
      1:"g",
      2:"l",
      3:"ml",
      4:"pcs"
  };

  
  //Get key from value
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  console.group(getKeyByValue(units, "kg"));

    const [quantity, setAmount] = useState("");
    const [price, setPrice] = useState("");

    const [isFetching, setFetching] = useState(true);



    useEffect(()=>{

        // //Get data
        const getItem = () =>{
            axios.get("http://localhost:8080/Agromart/api/item/get_item/"+id,
            
            {auth: {
              username: username,
              password: password,
            },}
            
            ).then((res)=>{

               
                setCategory(res.data.category);
                setTitle(res.data.title);
                setDescription(res.data.description);
                setAmount(res.data.amount);
                setIntUnit(res.data.unit);
                setUnit(getKeyByValue(units, res.data.unit));
                setPrice(res.data.price);

                setFetching(false);
                
            }).catch((err)=>{
                alert('Error fetching data');
                setFetching(true);
            });
        }


        getItem();
        
    }, []);



    //Send data to server
    function sendData(e){
        e.preventDefault();

        console.log(unit);
        //Data object

        const newItem = {
            'seller_id': seller_id,
            'category': category,
            'title': title,
            'description': description,
            'amount': amount,
            'unit': units[unit],
            'price': price
        };
 
       axios.put('http://localhost:8080/Agromart/api/item/update_item/' + id, 
       qs.stringify(newItem), 
       {auth: {
        username: username,
        password: password,
      },}
       ).then(()=>{
        MySwal.fire({
          title: "Success",
          icon: "success",
          text: "Item updated successfully",
      }).then(function() {
          window.location.href = "/viewSellerItems";
      });

        }).catch((err) =>{
             MySwal.fire({
            title: "Error",
            icon: "error",
            text: "Item not updated",
        });
        });
}

if(!isFetching){
    return(

<div className="container">
<h1>Update Item</h1>
  <div className ="d-flex justify-content-center">
<div id="itemForm" className="card col-6" style={{padding:"20px" }}>

<form onSubmit={sendData}>
  <div class="form-group">
    <label for="title">Product Title</label>
    <input type="text" class="form-control" id="title" defaultValue={title}

        onChange={(e)=>{
                setTitle(e.target.value)
            }} required>
        </input>

  </div>

  <div class="form-group">
    <label for="Category">Category</label>
    <select class="form-control" id="category" defaultValue={category+1} onChange = {e => setCategory(e.target.selectedIndex) }>
    {categories.map(o => (
          <option key={o.key} value={o.key}>{o.value}</option>
        ))}
    </select>
  </div>

  <div class="form-group" col-md-6>
    <label for="amount">Amount</label>
    <input type="number" min="1" step="0.01" class="form-control" id="amount" defaultValue={amount}
        onChange={(e)=>{
                setAmount(e.target.value)
            }} required>
    </input>

    <div class="form-group">
    <label for="Unit">Unit</label>
    <select class="form-control" id="unit" defaultValue={ getKeyByValue(units, initialUnit)} onChange = {e => setUnit(e.target.selectedIndex)}>
    {Object.entries(units).map(([key, value])=> (
          <option key={key} value={key}>{value}</option>
        ))}
    </select>
  </div>

  </div>


  <div class="form-group">
    <label for="price">Unit Price</label>
    <input type="number" min="1" step="0.01" class="form-control" id="price" defaultValue={price}

        onChange={(e)=>{
                setPrice(e.target.value)
            }} required>
        </input>

  </div>

  <div class="form-group">
    <label for="description">Description</label>
    <textarea class="form-control" id="description" rows="3"  defaultValue={description}
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
  else{
    return(<p>Loading...</p>)
  }
}
