import React, { useEffect, useState } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Main } from "../Main/Main";
//import axios from 'axios';
import Bigdata from "../MOCK_DATA.json";
import { Action } from "../Actions";

function App(props) {


  /* calling fectching customers data from the server  */

  useEffect(() => {
    /*async()=>{
    const data = await axios.get('https://jsonplaceholder.typicode.com/users');
    const response = await data.data;
    console.log(response)*/
    props.Fetch(Bigdata);
    props.ReservedCustomer(Bigdata);
  }, []);


  return (
    <div className="App">
      <Main />
    </div>
  );
}


/* The method fetch dispatches customer data to the store */

const setter = (dispatch) => {
  return {
    Fetch: (load) => {
      dispatch({ type: Action.server, payload: load });
    },ReservedCustomer: (id) => {
      dispatch({ type: Action.Rserver, payload: id });
    }
  };
};
export default connect(null, setter)(App);
