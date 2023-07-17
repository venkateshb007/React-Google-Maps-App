import React from "react";
import "./App.css";
import CustomMap from "./components/CustomMap";

function App() {
  return (
    <div className="custom-app-container" style={{maxWidth:"1200px", margin:"0 auto"}}>
      <h1 >Discover the Amazing World</h1>
      <CustomMap />
    </div>
  );
}

export default App;
