import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
// import Editable from "../Editable/Editable";
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
    const settingList = () => {
      console.log([...props.listItems]);
      setListState([...props.listItems]);
      console.log("listInit", stateList);
    };
    settingList();
  }, [props.listItems]);

  // const updateInput = (e, existsId) => {
  //   const listItems = [...stateList];
  //   const change = [...listItems.splice(existsId, 1)];
  //   change[0].quantity = e.target.value;
  //   listItems.push(change);
  //   setListState([...listItems]);
  // };

  const changeQuantity = (existsId, e) => {
    const newList = stateList;
    let index = newList.findIndex((i) => i.existsId === existsId);
    console.log(index, newList[index]);
    newList[index].quantity = e.target.value;
    console.log(newList);
    setListState([...newList]);
  };

  const handleClickFrz = (e, item) => {
    let currentState = e.currentTarget.value;
    if (currentState === "false") {
      e.currentTarget.value = true;
      e.currentTarget.textContent = "TRUE";
      item.inFreezer = true;
    } else {
      e.currentTarget.value = false;
      e.currentTarget.innerText = "FALSE";
      item.inFreezer = false;
    }
  };

  const handleClickFrg = (e, item) => {
    let currentState = e.currentTarget.value;
    if (currentState === "false") {
      e.currentTarget.value = true;
      e.currentTarget.textContent = "TRUE";
      item.inFridge = true;
    } else {
      e.currentTarget.value = false;
      e.currentTarget.innerText = "FALSE";
      item.inFridge = false;
    }
  };

  const handleClickOpen = (e, item) => {
    let currentState = e.currentTarget.value;
    if (currentState === "false") {
      e.currentTarget.value = true;
      item.isOpen = true;
    } else {
      e.currentTarget.value = false;
      item.isOpen = false;
    }
  };

  return (
    <div>
      <h1 className="uppercase py-2 px-3 font-bold text-xl">
        Your stored foods
      </h1>
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
                item={item}
                changeQuantity={changeQuantity}
                handleClickFrg={handleClickFrg}
                handleClickFrz={handleClickFrz}
                deleteByItem={props.deleteByItem}
              />
            );
          })}
        </tbody>
      </table>
      <Button
        onClick={() => {
          props.deleteAll();
        }}
      >
        Delete list
      </Button>
      <Button
        disabled={stateList.length === 0}
        onClick={() => props.saveList()}
      >
        Save list items
      </Button>
    </div>
  );
};

export default List;
