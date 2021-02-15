import React from "react";
import "./Landing.css";
import Divider from "@material-ui/core/Divider";

const Landing = () => {
  return (
    <div>
      <div className="landing">
        <div>FoodPal Landing</div>
      </div>
      <Divider />
      <div>
        <h3 className="food-facts">Stay tuned for food facts...</h3>
      </div>
    </div>
  );
};

export default Landing;
