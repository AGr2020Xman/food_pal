import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
// import Editable from "../Editable/Editable";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ListItem from "../ListItem/ListItem";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  saveList: {
    backgroundColor: theme.palette.signin.main,
    color: theme.palette.contrastText,
    "&:hover": {
      backgroundColor: "#15ad41",
      color: "#FFF",
    },
  },
}));

const List = (props) => {
  // console.log("props", props.listItems);
  const classes = useStyles();
  const [stateList, setListState] = useState([]);

  useEffect(() => {
    setListState([...props.listItems]);
    // console.log("listInit", stateList);
  }, [props.listItems]);

  const handleOnChange = (item) => {
    setListState(
      stateList.map((i) => {
        if (i.existsId === item.existsId) {
          return item;
        }
        return i;
      })
    );
  };

  const threeDayWarning = (expiryDate) => {
    const minusDays = (date) => {
      let newDate;
      newDate = date.setDate(date.getDate() - 3);
      return newDate;
    };
    let dateParts = expiryDate.split("/");
    const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    const warningDateComparable = minusDays(date);
    const currentDateComparable = new Date();
    // const warningDate = dateFormat(minusDays(date), "dd/mm/yyyy");
    // const currentDate = dateFormat(new Date(), "dd/mm/yyyy");

    // if CURRENT_DATE >= WARNING_DATE - render date in red warning colour
    if (currentDateComparable >= warningDateComparable) {
      return "secondary";
    }
    return "primary";
  };

  return (
    <div>
      <h1 className="uppercase py-2 px-3 font-bold text-xl">
        Your stored foods
      </h1>
      <p>Red: Within 3 days of expiry</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="tinyhead">
              Name
            </th>
            <th scope="col" className="tinyhead">
              Open/Sealed
            </th>
            <th scope="col" className="tinyhead">
              Standard Expiry
            </th>
            <th scope="col" className="tinyhead">
              Quantity
            </th>
            <th scope="col" className="tinyhead">
              In Fridge
            </th>
            <th scope="col" className="tinyhead">
              In Freezer
            </th>
            <th scope="col" className="tinyhead">
              Actions
            </th>
          </tr>
        </thead>
        {/*contentEditable*/}
        <tbody>
          {stateList.map((item) => {
            return (
              <ListItem
                key={item.existsId}
                item={item}
                onChange={handleOnChange}
                deleteByItem={props.deleteByItem}
                threeDayWarning={threeDayWarning}
              />
            );
          })}
        </tbody>
      </table>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => {
          props.deleteAll().then(() => {
            setListState([]);
            props.deleteList(stateList);
          });
        }}
      >
        Delete list
      </Button>
      <Button
        className={classes.saveList}
        // disabled={stateList.length === 0}
        onClick={() => props.saveList(stateList)}
      >
        Save list items
      </Button>
    </div>
  );
};

export default List;
