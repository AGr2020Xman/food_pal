import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect, useRef } from "react";
import Editable from "../Editable/Editable";
import { createListItems, deleteItem, deleteAll } from "../../utils/foodApi";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Switch from "@material-ui/core/Switch";

const List = ({ listItems }) => {
  const inputRef = useRef();
  //   const textareaRef = useRef();

  const [stateList, setListState] = useState([...listItems]);

  const saveList = () => {
    createListItems(stateList);
  };

  //     stateList.map((listItem) => {
  //       return (
  //         <div className="w-full max-w-md mx-auto">
  //           <form className=" bg-white rounded px-8 py-8 pt-8">
  //             <div className="px-4 pb-4">
  //               <h1 className="uppercase py-2 px-3 font-bold text-xl">
  //                 Your stored foods
  //               </h1>
  //             </div>
  //             <div className="px-4 pb-4">
  //               <Editable
  //                 text={listItem.name}
  //                 placeholder="Write a task name"
  //                 childRef={inputRef}
  //                 type="input"
  //               >
  //                 <input
  //                   ref={inputRef}
  //                   type="text"
  //                   name="name"
  //                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
  //                   placeholder="Write a task name"
  //                   value={listItem.name}
  //                   onChange={(e) => e.target.value}
  //                 />
  //               </Editable>
  //             </div>
  //             <div className="px-4 pb-4">
  //               <Editable
  //                 text={description}
  //                 placeholder="Description for the task"
  //                 childRef={textareaRef}
  //                 type="textarea"
  //               >
  //                 <textarea
  //                   ref={textareaRef}
  //                   name="description"
  //                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
  //                   placeholder="Description for the task"
  //                   rows="5"
  //                   value={description}
  //                   onChange={(e) => setDescription(e.target.value)}
  //                 />
  //               </Editable>
  //             </div>
  //           </form>
  //         </div>
  //       );
  //     });
  //   };

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

  const updateIsOpen = (e, { id }) => {
    const list = stateList;
    const item = list.find((item) => item.id === id);
    const index = list.indexOf(item);
    list[index] = { ...list[index], isOpen: e.target.value };
    setListState(list);
    // <Switch
    //                 value={item.isOpen}
    //                 checked={item.isOpen}
    //                 onChange={updateIsOpen(item.existsId)}
    //                 name="isOpen"
    //                 inputProps={{ "aria-label": "secondary checkbox" }}
    //               />
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
                <td contenteditable value={item.name}>
                  {item.name}
                </td>
                <td>{item.isOpen}</td>
                <td value={item.expiryDate}>{item.expiryDate}</td>
                <td value={item.quantity}>{item.quantity}</td>
                <td value={item.inFridge}>{item.inFridge}</td>
                <td value={item.inFreezer} onChange={() => {}}>
                  {item.inFreezer}
                </td>
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
