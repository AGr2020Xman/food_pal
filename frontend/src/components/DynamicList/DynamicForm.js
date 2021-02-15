import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect, useRef } from "react";
import Editable from "../Editable/Editable";
import { getListItems, deleteItem } from "../../utils/foodApi";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const DynamicForm = () => {
  const { v4: uuid } = require("uuid");
  const inputRef = useRef();
  const textareaRef = useRef();

  const [stateList, setListState] = useState([]);

  useEffect(() => {
    getListItems().then((data) => setListState(data));
  }, []);

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
                  name="task"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                  placeholder="Write a task name"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Dob</th>
            <th scope="col">CreditLimit</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {stateList.map((item) => {
            <tr>
              <td>{item}</td>
              <td>{item}</td>
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
            </tr>;
          })}

          {/* <CustomerRow
            stateCustomer={stateCustomer}
            setCustomerState={setCustomerState}
          /> */}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicForm;
