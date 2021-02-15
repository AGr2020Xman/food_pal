import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
const { v4: uuid } = require("uuid");
import CustomerRow from "./CustomerRow";
import { Link } from "react-router-dom";
import { getListItems, deleteItem } from "../../utils/foodApi";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const DynamicForm = () => {
  const [stateList, setListState] = useState([]);

  useEffect(() => {
    getListItems().then((data) => setListState(data));
  }, []);

  const populateList = () => {
    axios
      .getListItems()
      .then((data) => {
        console.log("log data from storedfooditems", data);
        let item = data.data;
        setCustomerState(
          item.map((d) => {
            return {
              select: false,
              existsId: uuid(),
              name: d.name,
            };
          })
        );
      })
      .catch((err) => alert(err));
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
        console.log("Successfully deleted ");
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
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
                <Button onClick={deleteByItem}>
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
