import React, { useState, useEffect } from "react";
import "./Slot.css";
import { connect } from "react-redux";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Action } from "../Actions";

export const Slot = (props) => {
  const [content, setContent] = useState("hii");

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
  };

  const HandleContent = (e) => {
    if(e.target.innerHTML!==''){
      e.target.classList.add('Show_content')
    }
  };
  const LeaveContent = (e) => {
    if(e.target.innerHTML!==''){
      e.target.classList.remove('Show_content')
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
                  id="s1"
                  ind={i}
                  onMouseLeave={ LeaveContent }
                  onMouseOver={HandleContent}
                  onDragOverCapture={handleOver}
                  onDrop={HandleDroped}
                  onDragLeave={handleRemove}
                  hi={con(e.s1)}
                >
                  {e.s1}
                </td>
                <td
                  id="s2"
                  ind={i}
                  onMouseLeave={ LeaveContent }
                  onMouseOver={HandleContent}
                  onDragOverCapture={handleOver}
                  onDrop={HandleDroped}
                  onDragLeave={handleRemove}
                  hi={con(e.s2)}
                >
                  {e.s2}
                </td>
                <td
                  id="s3"
                  ind={i}
                  onMouseLeave={ LeaveContent }
                  onMouseOver={HandleContent}
                  onDragOverCapture={handleOver}
                  onDrop={HandleDroped}
                  onDragLeave={handleRemove}
                  hi={con(e.s3)}
                >
                  {e.s3}
                </td>
                <td
                  id="s4"
                  ind={i}
                  onMouseLeave={ LeaveContent }
                  onMouseOver={HandleContent}
                  onDragOverCapture={handleOver}
                  onDrop={HandleDroped}
                  onDragLeave={handleRemove}
                  hi={con(e.s4)}
                >
                  {e.s4}
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
  };
};
export default connect(mapStateToProps, setter)(Slot);
