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
  const date = new Date();
  const expiryDate = date.addDays(standardShelfLife);
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
  const user = localStorage.getItem("userToken").decoded._id;

  const item = {
    name: name,
    existsId: uuid(),
    ownerId: user,
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
