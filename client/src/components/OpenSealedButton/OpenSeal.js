import React, { useState } from "react";

import { Button } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const CustomOpenSeal = ({ item }) => {
  const [isOpen, setOpen] = useState(item.isOpen);

  const handleClickOpen = () => {
    if (isOpen === true) {
      console.log("is open setting to false");
      setOpen(false);
    } else {
      setOpen(true);
      console.log("is open setting to true");
    }
  };

  return (
    <Button value={isOpen} onClick={() => handleClickOpen()}>
      {isOpen ? <CheckIcon /> : <CloseIcon />}
    </Button>
  );
};

export default CustomOpenSeal;
