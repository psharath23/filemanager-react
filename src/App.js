import React from "react";
import "./styles.css";
import { store } from "./store/index";
import { Provider } from "react-redux";
import FileManager from "./filemanager";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <FileManager />
      </div>
    </Provider>
  );
}
