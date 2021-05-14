import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { date } from "./components/dateManger";
const dat = [
  { date: date(0), s1: "", s2: "", s3: "", s4: "" },
  { date: date(1), s1: "", s2: "", s3: "", s4: "" },
  { date: date(2), s1: "", s2: "", s3: "", s4: "" },
  { date: date(3), s1: "", s2: "", s3: "", s4: "" },
  { date: date(4), s1: "", s2: "", s3: "", s4: "" },
  { date: date(5), s1: "", s2: "", s3: "", s4: "" },
  { date: date(6), s1: "", s2: "", s3: "", s4: "" },
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
