import axios from "axios";
import "./styles.css";
import { useState } from "react";
function App() {

  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    title: "",
    body: ""
  })

  function getData() {
    axios({
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "GET",
    })
      .then((response) => {
        console.log(response.data);
      })
  }

  function removeData() {
    setData([])
  }

  function createCard(cardData) {
    return (
      <div key={cardData.id}>
        <h3>{cardData.title}</h3>
        <p>{cardData.content}</p>
      </div>
    )
  }

  function getProducts() {
    axios({
      url: "http://localhost:8000/products",
      method: "GET",
    }).then((res) => {
      setData(res.data)
    })
      .catch((err) => {
        console.log(err)
      })
  }

  function insertProducts() {
    axios({
      url: "http://localhost:8000/products",
      method: "POST",
      data: newData
    }).then(() => {
      console.log("Data submitted");
    })
      .catch(() => {
        console.log("Error in submition");
      })
  }

  function handleChange(event) {
    setNewData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  function handleDelete(){
    axios({
      url:"http://localhost:8000/products",
      method:"DELETE",
      data:newData
    })
    .then((res) => {
      console.log("Data Deleted")
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  function handleUpdate(){
    axios({
      url:"http://localhost:8000/products",
      method:"PUT",
      data:newData
    }).then((res) => {
      console.log("Data Updated")
    })
    .catch((err)=>{
      console.log(err)
    })
  }

 

  return (
    <div>
      <h1>REST Api</h1>

      <button onClick={getData}>GET</button>
      <button onClick={removeData}>CLOSE</button>
      <h2>Products</h2>
      <div>
        {data.map(createCard)}
      </div>
      <button onClick={getProducts}>Get Products</button>
      <h2>Insert Products</h2>
      <form >
        <input type="text" placeholder="title" name="title" onChange={handleChange}></input>
        <input type="text" placeholder="value" name="body" onChange={handleChange}></input>
        <button onClick={insertProducts} >Insert Product</button>
      </form>
      <div>
        <input type="text" placeholder="enter title to delete" onChange={handleChange} name="title"></input>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div>
        <input type="text" placeholder="enter title to update" onChange={handleChange} name="title"></input>
        <input type="text" placeholder="value" name="body" onChange={handleChange}></input>
        <button onClick={handleUpdate}>Update</button>
      </div>
      <div>

      </div>
    </div>
  )
}

export default App;
