import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
// import Editable from "../Editable/Editable";
import { createListItems, deleteItem, deleteAll } from "../../utils/foodApi";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const List = (props) => {
  // console.log("props", props.listItems);

  const [stateList, setListState] = useState([]);
  useEffect(() => {
    const settingList = async () => {
      await setListState([...props.listItems]);
    };
    settingList();
  }, [props.listItems]);

  const saveList = () => {
    createListItems(stateList);
  };

  const deleteByItem = async (event, existsId) => {
    const token = localStorage.getItem("userToken");
    let config = {
      headers: {
        Authorization: `${token}`,
      },
      data: {
        //! Take note of the `data` keyword. This is the request body.
        existsId: existsId,
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

  const deleteRow = (existsId) => {
    const listItems = [...stateList];
    listItems.splice(existsId, 1);
    setListState([...listItems]);
  };

  const updateInput = (e, existsId) => {
    const listItems = [...stateList];
    const change = [...listItems.splice(existsId, 1)];
    change[0].quantity = e.target.value;
    listItems.push(change);
    setListState([...listItems]);
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
                <td contentEditable value={item.name} onChange={() => {}}>
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
                    value={item.quantity}
                    onChange={(e) => {
                      // changeQuantity(item.existsId);
                      updateInput(e, item.existsId);
                    }}
                  ></input>
                </td>
                <td value={item.inFridge}>
                  {item.inFridge ? "True" : "False"}
                </td>
                <td value={item.inFreezer} onClick={() => {}}>
                  {item.inFreezer ? "True" : "False"}
                </td>
                <td>
                  <Button
                    onClick={() => {
                      deleteByItem(item.existsId);
                      deleteRow(item.existsId);
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
