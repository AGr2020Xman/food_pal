import React from "react";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import QuantityList from "../QuantityList/Quantity";
import CustomOpenSeal from "../OpenSealedButton/OpenSeal";

const ListItem = ({
  item,
  changeQuantity,
  handleClickFrg,
  handleClickFrz,
  deleteByItem,
}) => {
  return (
    <tr key={item.existsId}>
      <td value={item.name} onChange={() => {}}>
        {item.name}
      </td>
      {/* {item.isOpen ? <CheckIcon /> : <CloseIcon />} */}
      <td value={item.isOpen}>
        {/* <Button
                    value={item.isOpen}
                    onClick={(e) => handleClickOpen(e, item)}
                  >
                    {item.isOpen ? <CheckIcon /> : <CloseIcon />}
                  </Button> */}
        <CustomOpenSeal item={item.isOpen} />
      </td>
      <td value={item.expiryDate}>{item.expiryDate}</td>
      <td>
        <QuantityList
          changeQuantity={changeQuantity}
          existsId={item.existsId}
          initialQuantity={item.quantity}
        />
      </td>
      <td value={item.inFridge}>
        <Button value={item.inFridge} onClick={(e) => handleClickFrg(e, item)}>
          {item.inFridge ? "True" : "False"}
        </Button>
      </td>
      <td value={item.inFreezer}>
        <Button value={item.inFreezer} onClick={(e) => handleClickFrz(e, item)}>
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
            deleteByItem(item.existsId);
            // props.deleteRow(item.existsId);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ListItem;
