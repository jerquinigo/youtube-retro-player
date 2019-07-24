import React from "react";
import DisplayVideo from "./Components/DisplayVideo.js";
// import DisplayVideoInfo from "./Components/DisplayVideoInfo.js";
import UserSearch from "./Components/UserSearch.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <DisplayVideo />
      <UserSearch />
    </div>
  );
}

export default App;
