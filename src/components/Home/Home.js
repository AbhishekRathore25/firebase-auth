import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import styles from "./Home.css";


function Home(props) {
  const handleclick =() =>{
    signOut(auth)
  }
  return (
    <div>
      <div>
        <h1>
          <Link to="/login">Login</Link>
        </h1>
        <br />
        <h1>
          <Link to="/signup">Signup</Link>
        </h1>
       
      </div>


      <br />
      <br />
      <br />

      <h2>{props.name ? `Welcome - ${props.name}` : "Login please"}</h2>
      
      <button className= {styles.button} onClick={handleclick}>signout</button>
    </div>
  );
}

export default Home;
