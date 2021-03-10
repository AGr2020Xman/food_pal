import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
// import Editable from "../Editable/Editable";
import dateFormat from "dateformat";

import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import QuantityList from "../QuantityList/Quantity";
import CustomOpenSeal from "../OpenSealedButton/OpenSeal";
import ListItem from "../ListItem/ListItem";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const List = (props) => {
  // console.log("props", props.listItems);
  const classes = useStyles();
  const [stateList, setListState] = useState([]);

  useEffect(() => {
    setListState([...props.listItems]);
    console.log("listInit", stateList);
  }, [props.listItems]);

  // const updateInput = (e, existsId) => {
  //   const listItems = [...stateList];
  //   const change = [...listItems.splice(existsId, 1)];
  //   change[0].quantity = e.target.value;
  //   listItems.push(change);
  //   setListState([...listItems]);
  // };

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
        onClick={() => {
          console.log("click");
          props.deleteAll().then(() => {
            setListState([]);
            props.deleteList();
          });
        }}
      >
        Delete list
      </Button>
      <Button
        // disabled={stateList.length === 0}
        onClick={() => props.saveList(stateList)}
      >
        Save list items
      </Button>
    </div>
  );
};

export default List;
