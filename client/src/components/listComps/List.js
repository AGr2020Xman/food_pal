import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
// import Editable from "../Editable/Editable";
import { createListItems, deleteItem, deleteAll } from "../../utils/foodApi";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import QuantityList from "../QuantityList/Quantity";

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
    // const newList = stateList;
    const change = [...stateList.splice(existsId, 1)];
    console.log("targetv", change);
    change[0].quantity = e.target.value;
    stateList.push(change);
    setListState(...stateList);
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
  console.log("preMap", stateList);

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
            console.log(item);
            return (
              <tr key={item.existsId}>
                <td value={item.name} onChange={() => {}}>
                  {item.name}
                </td>
                <td>{item.isOpen ? <CheckIcon /> : <CloseIcon />}</td>
                <td value={item.expiryDate}>{item.expiryDate}</td>
                <td>
                  <QuantityList
                    changeQuantity={changeQuantity}
                    existsId={item.existsId}
                    initialQuantity={item.quantity}
                  />
                </td>
                <td value={item.inFridge}>
                  <Button
                    value={item.inFridge}
                    onClick={(e) => handleClickFrg(e, item)}
                  >
                    {item.inFridge ? "True" : "False"}
                  </Button>
                </td>
                <td value={item.inFreezer}>
                  <Button
                    value={item.inFreezer}
                    onClick={(e) => handleClickFrz(e, item)}
                  >
                    {item.inFreezer ? "True" : "False"}
                  </Button>
                </td>
                <td>
                  <Button
                    variant="contained"
                    color="secondary"
                    // className={classes.button}
                    startIcon={<DeleteForeverIcon />}
                    onClick={() => {
                      console.log(item.existsId);
                      props.deleteByItem(item.existsId);
                      // props.deleteRow(item.existsId);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
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
