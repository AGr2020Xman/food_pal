import React from "react";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import QuantityList from "../QuantityList/Quantity";

const ListItem = ({ item, onChange, deleteByItem, threeDayWarning }) => {
  return (
    <tr key={item.existsId}>
      <td onChange={() => {}}>{item.name}</td>
      <td>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onChange({ ...item, isOpen: !item.isOpen })}
        >
          {item.isOpen ? <CheckIcon /> : <CloseIcon />}
        </Button>
      </td>
      <td>
        <Button
          variant="outlined"
          color={threeDayWarning(item.expiryDate)}
          //   disabled
        >
          {item.expiryDate}
        </Button>
      </td>
      <td>
        <QuantityList
          onChange={(value) => onChange({ ...item, quantity: value })}
          initialQuantity={item.quantity}
        />
      </td>
      <td>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onChange({ ...item, inFridge: !item.inFridge })}
        >
          {item.inFridge ? "True" : "False"}
        </Button>
      </td>
      <td>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onChange({ ...item, inFreezer: !item.inFreezer })}
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
            deleteByItem(item.existsId);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ListItem;
