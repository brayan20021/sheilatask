import React from "react";
import Clock from "react-live-clock";

const Windows8StyleClock = () => {
    const formatDate = () => {
      const date = new Date();
      const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };
  
    return (
      <div className="clock-container">
        <Clock format={"HH:mm:ss"} ticking={true}  />
        <div className="date">{formatDate()}</div>
      </div>
    );
  };
  
export default Windows8StyleClock;
