import React from "react";
import "./Landing.css";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import DashCard from "../DashCard/DashCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Landing = () => {
  const classes = useStyles();

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
