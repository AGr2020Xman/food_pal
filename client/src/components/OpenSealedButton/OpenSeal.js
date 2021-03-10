import React, { useState } from "react";

import { Button } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const CustomOpenSeal = ({ isOpen, onChange }) => {
  const handleClickOpen = () => {
    onChange(!isOpen);
  };

  return (
    <Button onClick={() => handleClickOpen()}>
      {isOpen ? <CheckIcon /> : <CloseIcon />}
    </Button>
  );
};

export default CustomOpenSeal;
