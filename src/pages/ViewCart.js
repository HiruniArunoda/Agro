import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "../App.css";
const MySwal = withReactContent(Swal)



export default function ViewSellerItems(){

  //Use login service
  const seller_id = "s1";
  const username = "admin";
  const password = "admin";

  // const token = `${username}:${password}`;
  // const encodedToken = Buffer.from(token).toString('base64');


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

    //Data
    const [Items, setItems] = useState([]);
    

    useEffect(()=>{

        //Get data
        const getItems = async () =>{
            await axios.get("http://localhost:8080/Agromart/api/item/view_items/" + seller_id,

            {auth: {
              username: username,
              password: password,
            },}

            ).then((res)=>{
            setItems(res.data);
            }).catch((err)=>{
              MySwal.fire({
                title: "Error",
                icon: "error",
                text: "Something went wrong",
            }).then(function() {
                window.location.href = "/";
            })
            });
        }

        getItems();

    }, []);

    console.log(Items);
 

    //Detele
    const deleteItem =  (e) =>{
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
           axios.delete("http://localhost:8080/Agromart/api/item/delete_item/" + id,
           {auth: {
            username: username,
            password: password,
          },}
           ).then((res)=>{
            MySwal.fire({
              title: "Success",
              icon: "success",
              text: "Item deleted successfully",
          }).then(function() {
              window.location.href = "/viewSellerItems";
          })
  
              }).catch((err)=>{
                 
                MySwal.fire({
                  title: "Error",
                  icon: "error",
                  text: "Error deleting item",
              });
          });

        }
    });

  }

    return (

        <div className="container">
          <h1>Shopping cart</h1>
        <div className="card" style={{padding:"20px" }}>
        <table className="table table-striped sortable">
          <thead className="thead-dark">

            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Product</td>
              <td>Amount</td>
              <td>Price</td>
              <td>Qty</td>
            </tr>

          </thead>

          <tbody>

            {Items.map((item) => (
              <tr key={item.id}>
                <td>{categories[item.category].value}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.amount}</td>
                <td>{item.unit}</td>
                <td>{item.price}</td>
                <td>
                <div  className="horizontal">
                <a href={`/UpdateItem/${item.id}`}>
                <button type="button" className="btn btn-primary" style={{marginRight: "20px"}}>Update
                </button></a>
                <button type="button" className="btn btn-danger" id={item.id} onClick={deleteItem}>Delete</button>
                </div>
                </td>
                
              </tr >
            ))}

          </tbody>
        </table>
        </div>
        </div>
    );
}