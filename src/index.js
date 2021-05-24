import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { date } from "./components/dateManger";
const dat = [
  { date: date(0), slot_1: "", slot_2: "", slot_3: "", slot_4: "" },
  { date: date(1), slot_1: "", slot_2: "", slot_3: "", slot_4: "" },
  { date: date(2), slot_1: "", slot_2: "", slot_3: "", slot_4: "" },
  { date: date(3), slot_1: "", slot_2: "", slot_3: "", slot_4: "" },
  { date: date(4), slot_1: "", slot_2: "", slot_3: "", slot_4: "" },
  { date: date(5), slot_1: "", slot_2: "", slot_3: "", slot_4: "" },
  { date: date(6), slot_1: "", slot_2: "", slot_3: "", slot_4: "" },
];

const Mybaba = (state = [], action) => {
  switch (action.type) {
    case "remove":
      return [...state.filter((e, i) => e["Cus_Id"] !== action.payload)];
    case "server":
      return [...action.payload];
    default:
      return state;
  }
};
const reserveReducer = (state = [], action) => {
  switch (action.type) {
      case "Rserver":
        return [...action.payload];
      default:
      return state;
  }
};
const SlotReducer = (state = dat, action) => {
  switch (action.type) {
    case "slot":
      return [
        ...state.map((d, i) => {
          if (i === action.payload.attr) {
            let dd = action.payload.id;
            let captured = { ...d, [dd]: action.payload.Id };
            return captured;
          }
          return d;
        }),
      ];
      case "db":
        return [
          ...state.map((d, i) => {
            if (d.date === action.payload.date) {
              let dd = action.payload.slotId;
              let captured = { ...d, [dd]: action.payload.Slot };
              return captured;
            }
            return d;
          }),
        ];
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({ customer: Mybaba, slot: SlotReducer ,reserve:reserveReducer}),
  {},
  applyMiddleware(thunk)
);
store.subscribe(() => {
  console.log("hii", store.getState());
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
