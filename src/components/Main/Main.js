import React from "react";
import CusTable from "../Customer_table/Cus_Table";
import Slot from "../Slot/Slot";
import "./style.css";

export const Main = () => {
  return (
    <div className="Main_Landing">
      <CusTable />
      <Slot />
    </div>
  );
};
