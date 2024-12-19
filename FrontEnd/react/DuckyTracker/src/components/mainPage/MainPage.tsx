import { Link } from "react-router-dom"
import "./MainPage.css"
import { useEffect, useState } from "react"
import { Duck } from "../../interfaces/Duck"
import axios from "axios"

async function obtainUserData() {
  await axios.get("http://localhost:8080/backpack",{withCredentials:true})
  .then((response)=>{
    return response.data
  })
}

function LogOut(){
  axios.get("http://localhost:8080/logout",{withCredentials:true})
  .then(() => window.location.href = "http://localhost:5173")
}

function Search(){
  let buttons = document.getElementById("logout-button")
  axios.post("http://localhost:8080/backpack",{},{withCredentials:true})
  .then((response) => {alert("Searching for Duck")})
  .catch((error) => {
      alert(error.data)
  })
}

function MainPage() {
  const [duck, setDuck] = useState<Duck[]>([])
  const [cash, setCash] = useState<number>(0.0)
  const [ss_amount, setSs] = useState<number>(0.0)
  const [s_amount, setS] = useState<number>(0.0)
  const [a_amount, setA] = useState<number>(0.0)
  const [b_amount, setB] = useState<number>(0.0)

  useEffect(() => {
      //Obtain Bank Value
      axios.get("http://localhost:8080/backpack",{withCredentials:true})
      .then((response)=>{
        setCash(response.data["bank_account"])
      })
      //Create Interval to Continuously Get Bank Account
      const interval = setInterval(()=> {
        axios.get("http://localhost:8080/backpack",{withCredentials:true})
        .then((response)=>{
          setCash(response.data["bank_account"])
        })
      },10000)

      const interval2 = setInterval(()=> {
        axios.get("http://localhost:8080/backpack/world",{withCredentials:true})
        .then((response)=>{
          setSs(response.data["ss_rank"])
          setS(response.data["s_rank"])
          setA(response.data["a_rank"])
          setB(response.data["b_rank"])
        })
      },10000)

      return () => {clearInterval(interval);clearInterval(interval2)}
  })


  useEffect(() => {
    axios.get<Duck[]>("http://localhost:8080/backpack/ducks",{withCredentials:true})
    .then((res) => {
      setDuck(res.data)
    })
  }, [])

  let buyStroage = () => {
  useEffect(() => {
    axios.patch<number>("http://localhost:8080/backpack/price", cash)
    .then((res) => {
      setCash(res.data)
    })
    .catch((err) => {
      console.log(err)
      alert("Insufficient funds")
    })

  }, )
}
  
  return (
    <>
    <div>
      <div className="head">
      <p id="balance">Balance: {cash}</p>
      <select>
        <option value="" selected  className="drop-down">Search</option>
        <option>SS: {ss_amount}</option>
        <option>S:  {s_amount}</option>
        <option>A:  {a_amount}</option> 
        <option>B:  {b_amount}</option>
    </select>



      <button id="logout-button" onClick={Search}>Search</button>
      <button id="logout-button" onClick={LogOut}>Logout</button>
      
      {/* <!--<p>Multiplier</p>--> */}
    </div>

    {/* <!-- <hr> --> */}
    <div id="outer-container">
      <div id="card-container">
       {duck.map((card) => {
        return (
          <div key={card.id}>
          if(card.rank === "SS"){
            <img src="./images/rank-SS.png"></img>
          }
          if(card.rank === "S"){
            <img src="./images/rank-S.png"></img>
          }
          if(card.rank === "A"){
            <img src="./images/rank-A.png"></img>
          }
          if(card.rank === "B"){
            <img src="./images/rank-B.png"></img>
          }
          if(card.rank === "C"){
            <img src="./images/rank-C.png"></img>
          }
          if(card.rank === "D"){
            <img src="./images/rank-D.png"></img>
          }
          if(card.rank === "E"){
            <img src="./images/rank-E.png"></img>
          }
          if(card.rank === "F"){
            <img src="./images/rank-F.png"></img>
          }
          <p>{card.nickname}</p>
          <p>{card.rank}</p>
          if(card.rank === "SS"){
            <p>Value: 100000.0 </p>
          }
          if(card.rank === "S"){
            <p>Value: 10000.0 </p>
          }
          if(card.rank === "A"){
            <p>Value: 1000.0 </p>
          }
          if(card.rank === "B"){
            <p>Value: 100.0 </p>
          }
          if(card.rank === "C"){
            <p>Value: 10.0 </p>
          }
          if(card.rank === "D"){
            <p>Value: 1.0 </p>
          }
          if(card.rank === "E"){
            <p>Value: 0.1 </p>
          }
          if(card.rank === "F"){
            <p>Value: 0.01 </p>
          }
          </div>
        )
        
       })} 
      </div>
      <div id="backpack-storage">
        <button onClick={buyStroage}>
          <p>Buy more backpack storage</p>
          <p>$$$</p>
        </button>
      </div>
    </div>
    </div>
    </>
  )
}


export default MainPage

// Values:

// SS - 100000.0
// S - 10000.0
// A - 1000.0
// B - 100.0
// C - 10.0
// D - 1.0
// E - 0.1
// F - 0.01