import React from "react";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import DashCard from "../DashCard/DashCard";
import "./Landing.css";

const Landing = () => {
  return (
    <div>
      <div className="landing">
        <div>FoodPal - Signup for free!</div>
      </div>
      <Divider />
      <div>
        <h3 className="food-facts">Stay tuned for food facts...</h3>
        <Grid container></Grid>
      </div>
      <div>
        <Grid container justify="center">
          <Grid item className="listBuild">
            <DashCard />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Landing;
