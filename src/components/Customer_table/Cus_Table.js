import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cus_Table.css";
import { Action } from "../Actions";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { connect } from "react-redux";


export const CusTable = (props) => {

  /* the state 'page handles the pagination button' */ 
  const [page, setpage] = useState(1);
  const [total,setTotal]= useState(1);

  

  // calling to the database

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`http://localhost:3200/api/customers?page=${page}&limit=8`);
        const response = await data.data;
        setTotal(response.TotalDb);
        props.Fetch(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [page,props.slots]);

  /* This adds transitions to clickable and unclickable pageBtn */ 
  useEffect(() => {
    if (page < 2) {
      document.querySelector(".arrow:first-child").classList.add("disabled");
    } else if (page >= Math.ceil(total/ 8)) {
      document.querySelector(".arrow:last-child").classList.add("disabled");
    } else {
      document.querySelector(".arrow:last-child").classList.remove("disabled");
      document.querySelector(".arrow:first-child").classList.remove("disabled");
    }
  }, [page]);

  const paginRight = () => {
    setpage((prev) => {
      if (prev >= Math.ceil(total/ 8)) return prev;
      else {
        return prev + 1;
      }
    });
  };
  const paginLeft = (e) => {
    setpage((prev) => {
      if (prev < 2) {
        return 1;
      } else {
        return prev - 1;
      }
    });
  };

  /* This handles onDragStart and onDragEnd */ 
  const started = (e) => {
    e.target.classList.add("dragging");
  };
  const stoped = (e) => {
    e.target.classList.remove("dragging");
  };

  return (
    <div className="Main">
      {props.customer[0] !== undefined ? (
        <div className="hold">
          <table id="cus_table">
            <thead>
              <tr>
                <th>NO</th>
                <th>Customer_Id</th>
                <th>Customer_Name</th>
                <th>Pick_Up</th>
                <th>Drop_Off</th>
              </tr>
            </thead>
            <tbody>
              {props.customer
                .map((e, i) => {
                  return (
                    <tr
                      userId={e["Cus_Id"]}
                      draggable="true"
                      onDragStart={started}
                      onDragEnd={stoped}
                      key={e["id"]}
                    >
                      <td>{i + 1}</td>
                      <td>{e["Cus_Id"]}</td>
                      <td>{e["Cus_Name"]}</td>
                      <td>{e["Pick"]}</td>
                      <td>{e["Drop"]}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='loader'>
          <div></div>
        </div>
      )}
      <div className="pagination">
        <div className="arrCont">
          <div className="arrow">
            <HiOutlineArrowNarrowLeft onClick={paginLeft} />
          </div>
          <div>
            {page}/{Math.ceil(total/ 8)}
          </div>
          <div className="arrow" onClick={paginRight}>
            <HiOutlineArrowNarrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

/* redux state */ 
const mapStateToProps = (state) => {
  return {
    customer: state.customer,
    slots: state.slot,
  };
};
const setter = (dispatch) => {
  return {
    Fetch: (load) => {
      dispatch({ type: Action.server, payload: load });
    },
  };
};

export default connect(mapStateToProps,setter)(CusTable);
