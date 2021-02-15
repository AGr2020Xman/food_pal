import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useRef } from "react";
import Editable from "../Editable/Editable";
import { createListItems, deleteItem, deleteAll } from "../../utils/foodApi";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const List = (props) => {
  const inputRef = useRef();
  //   const textareaRef = useRef();

  const [stateList, setListState] = useState([...props.listItems]);

  const saveList = () => {
    createListItems(stateList);
  };

  const deleteByItem = async (event) => {
    const token = localStorage.getItem("userToken");
    let config = {
      headers: {
        Authorization: `${token}`,
      },
      data: {
        //! Take note of the `data` keyword. This is the request body.
        existsId: event.target.existsId,
      },
    };
    await deleteItem(config)
      .then(() => {
        deleteRow();
        console.log("Successfully deleted ");
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  const deleteRow = (btn) => {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
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
        <tbody>
          {stateList.map((item) => {
            return (
              <tr key={item.existsId}>
                <td contenteditable value={item.name}>
                  {item.name}
                </td>
                <td>{item.isOpen ? <CheckIcon /> : <CloseIcon />}</td>
                <td value={item.expiryDate}>{item.expiryDate}</td>
                <td value={item.quantity}>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                  ></input>
                </td>
                <td value={item.inFridge}>{item.inFridge}</td>
                <td value={item.inFreezer}>{item.inFreezer}</td>
                <td>
                  <Button
                    onClick={() => {
                      deleteByItem(item.existsId);
                      deleteRow(this);
                    }}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <Button
          onClick={() => {
            deleteAll();
          }}
        >
          Delete list
        </Button>
        <Button onClick={() => saveList()}>Save list items</Button>
      </table>
    </div>
  );
};

export default List;
