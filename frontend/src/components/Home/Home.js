import React from "react";
import Divider from "@material-ui/core/Divider";

const Home = () => {
  return (
    <div>
      <div className="hero">
        <div>FoodPal Landing</div>
      </div>
      <Divider />
      <div>
        <h3 className="food-facts">Stay tuned for food facts...</h3>
      </div>
    </div>
  );
};

export default Home;
