import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect, useRef } from "react";
import Editable from "../Editable/Editable";
import { createListItems, deleteItem, deleteAll } from "../../utils/foodApi";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const List = (listItems) => {
  const { v4: uuid } = require("uuid");
  const inputRef = useRef();
  //   const textareaRef = useRef();

  const [stateList, setListState] = useState([...listItems]);

  const saveList = () => {
    createListItems(createListArray());
  };

  const createListArray = () => {
    const user = localStorage.getItem("userToken").decoded._id;
    console.log(user);
    console.log(localStorage.getItem("userToken").decoded);
    stateList.map((item) => {
      let listToSave = [];
      let itemInList = {
        name: item.name,
        existsId: uuid(),
        ownerId: user,
        isOpen: item.isOpen,
        expiryDate: item.standardShelfLife,
        quantity: item.quantity,
        inFridge: item.inFridge,
        inFreezer: item.inFreezer,
      };
      listToSave.push(itemInList);
      return listToSave;
    });
  };

  const populateList = () => {
    stateList.map((listItem) => {
      return (
        <div className="w-full max-w-md mx-auto">
          <form className=" bg-white rounded px-8 py-8 pt-8">
            <div className="px-4 pb-4">
              <h1 className="uppercase py-2 px-3 font-bold text-xl">
                Your stored foods
              </h1>
            </div>
            <div className="px-4 pb-4">
              <Editable
                text={listItem.name}
                placeholder="Write a task name"
                childRef={inputRef}
                type="input"
              >
                <input
                  ref={inputRef}
                  type="text"
                  name="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                  placeholder="Write a task name"
                  value={listItem.name}
                  onChange={(e) => e.target.value}
                />
              </Editable>
            </div>
            <div className="px-4 pb-4">
              <Editable
                text={description}
                placeholder="Description for the task"
                childRef={textareaRef}
                type="textarea"
              >
                <textarea
                  ref={textareaRef}
                  name="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                  placeholder="Description for the task"
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Editable>
            </div>
          </form>
        </div>
      );
    });
  };

  const deleteByItem = async (event) => {
    const token = localStorage.getItem("userToken");
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
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
            <th scope="col">Name</th>
            <th scope="col">ExistsId</th>
            <th scope="col">Open/Sealed</th>
            <th scope="col">Standard Expiry</th>
            <th scope="col">Quantity</th>
            <th scope="col">In Fridge</th>
            <th scope="col">In Freezer</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stateList.map((item) => {
            return (
              <tr key={item.existsId}>
                <td>{item.name}</td>
                <td>{item.existsId}</td>
                <td>{item.isOpen}</td>
                <td>{item.expiryDate}</td>
                <td>{item.quantity}</td>
                <td>{item.inFridge}</td>
                <td>{item.inFreezer}</td>
                <td>
                  <Button
                    onClick={() => {
                      deleteByItem();
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
        <Button onClick={saveList()}>Save list items</Button>
      </table>
    </div>
  );
};

export default List;
