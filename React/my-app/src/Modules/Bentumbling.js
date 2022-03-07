import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Bentumbling(){
const [name, setName] = useState("");
let history = useNavigate();

function handlesOnCHange(e){
  setName(e.target.value)
}
function handlesOnClick(){
  history('/')
}

  return(
    <div>
    <p>{name}</p>
      <input value={name} onChange={handlesOnCHange}>
      </input>
      <button onClick={handlesOnClick}>Home</button>
    </div>
  )
}