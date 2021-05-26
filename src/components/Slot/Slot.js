import React, { useState, useEffect } from "react";
import "./Slot.css";
import { connect } from "react-redux";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Action } from "../Actions";
import axios from "axios";
import {api} from '../api';

export const Slot = (props) => {


  //handling database crud operation
  const settledStore = (data) => {
    const [filtered] = props.customer.filter((e) => e["Cus_Id"] === data);
    axios
      .post(`${api.endPoint}settled`, filtered)
      .then(() => {});

  };

  const slotStore = (date, slot, data) => {
    axios
      .patch(`${api.endPoint}slots/${date}`, { [slot]: data })
      .then((res) =>{});
  };

  const clearCustomer = (data) => {
    const [filtered] = props.customer.filter((e) => e["Cus_Id"] === data);
    axios
    .delete(`${api.endPoint}customers/${filtered._id}`)
    .then((res) =>{});
  };

// updating slots

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${api.endPoint}slots`);
        const response = await data.data.data;

        props.slots.map((p) => {
          const check = response.some((e) => e.Date === p.date);
          if (!check) {
            axios
              .post(`${api.endPoint}slots`, { Date: p.date })
              .then((res) => {});
          } else {
            axios
              .get(`${api.endPoint}slots/${p.date}`)
              .then((res) => {
                let [resp] = res.data.data;
                if (resp.slot_1) {
                  props.updateSlot(resp.Date, "slot_1", resp.slot_1);
                }
                if (resp.slot_2) {
                  props.updateSlot(resp.Date, "slot_2", resp.slot_2);
                }
                if (resp.slot_3) {
                  props.updateSlot(resp.Date, "slot_3", resp.slot_3);
                }
                if (resp.slot_4) {
                  props.updateSlot(resp.Date, "slot_4", resp.slot_4);
                }
              
              });
          }
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);


// this handles the hover effect on the slt element

  const con = (es) => {
    try {
      const item = props.reserve.filter((r) => r["Cus_Id"] === es)[0];
      let lists = `Name:${item["Cus_Name"]} ->
    Pick:${item["Pick"]} ->
    Drop:${item["Drop"]}`;
      return lists;
    } catch (e) {}
  };


  /* This Handles The DragOver events the Slot */

  const handleOver = (e) => {
    if (e.target.innerHTML === "") {
      e.preventDefault();
      e.target.classList.add("captured");
    }
  };

  /* This Handles The DragOver events the Slot */

  const handleRemove = (e) => {
    e.target.classList.remove("captured");
  };
  /* This Handles The DragOver events the Slot */

  const HandleDroped = (e) => {
    const cus_ = document.querySelectorAll(".dragging")[0];
    let id = cus_.getAttribute("userId");
    props.addSlot(+e.target.getAttribute("ind"), e.target.id, id);
    props.removeCustomer(id);
    slotStore(e.target.getAttribute("date"), e.target.id, id);
    settledStore(id);
    clearCustomer(id)
  };

  const HandleContent = (e) => {
    if (e.target.innerHTML !== "") {
      e.target.classList.add("Show_content");
    }
  };
  const LeaveContent = (e) => {
    if (e.target.innerHTML !== "") {
      e.target.classList.remove("Show_content");
    }
  };

  return (
    <div className="Slot_container">
      <table id="Slot_table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Slot_1</th>
            <th>Slot_2</th>
            <th>Slot_3</th>
            <th>Slot_4</th>
          </tr>
        </thead>
        <tbody>
          {props.slots.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.date}</td>
                <td
                  id="slot_1"
                  ind={i}
                  date={e.date}
                  onMouseLeave={LeaveContent}
                  onMouseOver={HandleContent}
                  onDragOverCapture={handleOver}
                  onDrop={HandleDroped}
                  onDragLeave={handleRemove}
                  hi={con(e.slot_1)}
                >
                  {e.slot_1}
                </td>
                <td
                  id="slot_2"
                  ind={i}
                  date={e.date}
                  onMouseLeave={LeaveContent}
                  onMouseOver={HandleContent}
                  onDragOverCapture={handleOver}
                  onDrop={HandleDroped}
                  onDragLeave={handleRemove}
                  hi={con(e.slot_2)}
                >
                  {e.slot_2}
                </td>
                <td
                  id="slot_3"
                  ind={i}
                  date={e.date}
                  onMouseLeave={LeaveContent}
                  onMouseOver={HandleContent}
                  onDragOverCapture={handleOver}
                  onDrop={HandleDroped}
                  onDragLeave={handleRemove}
                  hi={con(e.slot_3)}
                >
                  {e.slot_3}
                </td>
                <td
                  id="slot_4"
                  ind={i}
                  date={e.date}
                  onMouseLeave={LeaveContent}
                  onMouseOver={HandleContent}
                  onDragOverCapture={handleOver}
                  onDrop={HandleDroped}
                  onDragLeave={handleRemove}
                  hi={con(e.slot_4)}
                >
                  {e.slot_4}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="Previous">
        <div>
          <HiOutlineArrowNarrowLeft />
          Check Previous
        </div>
      </div>
    </div>
  );
};



// this sets the slot props for getting data from the store
const mapStateToProps = (state) => {
  return {
    slots: state.slot,
    reserve: state.reserve,
    customer: state.customer,
  };
};

//this sets the dispatch method props for the dispatching data

const setter = (dispatch) => {
  return {
    removeCustomer: (id) => {
      dispatch({ type: Action.remove, payload: id });
    },
    addSlot: (attr, id, Id) => {
      dispatch({ type: Action.slot, payload: { attr, id, Id } });
    },
    updateSlot: (date, slotId, Slot) => {
      dispatch({ type: Action.dataBase, payload: { date, slotId, Slot } });
    },
  };
};

export default connect(mapStateToProps, setter)(Slot);
