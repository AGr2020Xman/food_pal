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

const FoodCard = (
  { addListItem },
  {
    _id,
    name,
    isFresh,
    canRefrigerate,
    canFreeze,
    standardShelfLife,
    fridgeExpiry,
    freezerExpiry,
  }
) => {
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
    name: name,
    existsId: uuid(),
    ownerId: parsedId,
    isOpen: false,
    isFresh: isFresh,
    quantity: "1",
    canRefrigerate: canRefrigerate,
    canFreeze: canFreeze,
    expiryDate: getFormattedDate(standardShelfLife),
    fridgeExpiry: fridgeExpiry,
    freezerExpiry: freezerExpiry,
    inFridge: false,
    inFreezer: false,
  };
  console.log(item);
  const fridgeExpiryView = (fridgeExpiry) => {
    return (
      <ListItem>
        <CheckCircleOutlineIcon />
        <ListItemText primary={fridgeExpiry} />
      </ListItem>
    );
  };

  const freezerExpiryView = (freezerExpiry) => {
    return (
      <ListItem>
        <CheckCircleOutlineIcon />
        <ListItemText primary={freezerExpiry} />
      </ListItem>
    );
  };

  return (
    <Card className={classes.root} key={_id}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {isFresh ? "Fresh produce" : "Perishable Item"}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
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
                  {standardShelfLife === "1"
                    ? `${standardShelfLife} day`
                    : `${standardShelfLife} days`}
                </td>
                <td>
                  {canRefrigerate ? (
                    fridgeExpiryView(fridgeExpiry)
                  ) : (
                    <CancelOutlinedIcon />
                  )}
                </td>
                <td>
                  {canFreeze ? (
                    freezerExpiryView(freezerExpiry)
                  ) : (
                    <CancelOutlinedIcon />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={addListItem(item)} size="small" color="primary">
          Add to list
        </Button>
      </CardActions>
    </Card>
  );
};

export default FoodCard;
