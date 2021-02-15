import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import dateFormat from "dateformat";
import Divider from "@material-ui/core/Divider";
const { v4: uuid } = require("uuid");

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const getFormattedDate = (standardShelfLife) => {
  const addDays = (days, date) => {
    let newDate;
    date.setDate(date.getDate() + days);
    return newDate;
  };
  const date = new Date();
  const expiryDate = addDays(standardShelfLife, date);
  return dateFormat(expiryDate, "dd/mm/yyyy");
};

const FoodCard = (props) => {
  const classes = useStyles();

  const user = localStorage.getItem("userToken");
  const parseJwt = (user) => {
    let base64Url = user.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const parsedId = parseJwt(user)._id;
  const item = {
    name: props.food.name,
    existsId: uuid(),
    ownerId: parsedId,
    isOpen: false,
    isFresh: props.food.isFresh,
    quantity: "1",
    canRefrigerate: props.food.canRefrigerate,
    canFreeze: props.food.canFreeze,
    expiryDate: getFormattedDate(props.food.standardShelfLife),
    fridgeExpiry: props.food.fridgeExpiry,
    freezerExpiry: props.food.freezerExpiry,
    inFridge: false,
    inFreezer: false,
  };
  console.log(item);
  const fridgeExpiryView = (fridgeExpiry) => {
    return (
      <ListItem>
        <ListItemText primary={`${fridgeExpiry}`} />
        <CheckCircleOutlineIcon />
      </ListItem>
    );
  };

  const freezerExpiryView = (freezerExpiry) => {
    return (
      <ListItem>
        <ListItemText primary={`${freezerExpiry}`} />
        <CheckCircleOutlineIcon />
      </ListItem>
    );
  };

  return (
    <Card className={classes.root} key={props.food._id}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.food.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.food.isFresh ? "Fresh produce" : "Perishable Item"}
        </Typography>
        <Divider />
        {/* <Typography variant="body2" color="textSecondary" component="p"> */}
        <table>
          <thead>
            <tr>
              <th>Standard shelf life</th>
              <th>Safe to refrigerate</th>
              <th>Safe to freeze</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {props.standardShelfLife === "1"
                  ? `${props.food.standardShelfLife} day`
                  : `${props.food.standardShelfLife} days`}
              </td>
              <td>
                {props.food.canRefrigerate ? (
                  fridgeExpiryView(props.food.fridgeExpiry)
                ) : (
                  <CancelOutlinedIcon />
                )}
              </td>
              <td>
                {props.food.canFreeze ? (
                  freezerExpiryView(props.food.freezerExpiry)
                ) : (
                  <CancelOutlinedIcon />
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {/* </Typography> */}
      </CardContent>
      <CardActions>
        <Button
          onClick={() => props.addListItem(item)}
          size="small"
          color="primary"
        >
          Add to list
        </Button>
      </CardActions>
    </Card>
  );
};

export default FoodCard;
