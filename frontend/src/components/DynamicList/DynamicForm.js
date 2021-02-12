import React, { useState, Fragment } from "react";

import "bootstrap/dist/css/bootstrap.css";

const DynamicForm = () => {
  const [options, setOptions] = useState();
  return (
    <form>
      <select>
        {}
        <option value="">{}</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default DynamicForm;
