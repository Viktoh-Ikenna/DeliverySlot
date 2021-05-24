import React, { useEffect, useState } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Main } from "../Main/Main";
import axios from "axios";
import Bigdata from "../MOCK_DATA.json";
import { Action } from "../Actions";

function App(props) {
  /* calling fectching customers data from the server  */



  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get("http://localhost:3200/api/settled");
        const response = await data.data.data;
        props.ReservedCustomer(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [props.customer]);
  return (
    <div className="App">
      <Main />
    </div>
  );
}

/* The method fetch dispatches customer data to the store */

const mapStateToProps = (state) => {
  return {
    customer: state.customer,
  };
};
const setter = (dispatch) => {
  return {
    Fetch: (load) => {
      dispatch({ type: Action.server, payload: load });
    },
    ReservedCustomer: (id) => {
      dispatch({ type: Action.Rserver, payload: id });
    },
  };
};

export default connect(mapStateToProps, setter)(App);
