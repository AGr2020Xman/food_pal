import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { addFood } from "../../utils/foodApi";

// const useStyles = makeStyles({});

const AddDash = () => {
  // const classes = useStyles();

  const [formState, setFormState] = useState({
    name: "",
    isFresh: "",
    canRefrigerate: "",
    canFreeze: "",
    standardShelfLife: "",
    fridgeExpiry: "",
    freezerExpiry: "",
    errors: {},
  });

  const onChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    let errors = {};
    e.preventDefault();
    const food = {
      name: formState.name,
      isFresh: formState.isFresh,
      canRefrigerate: formState.canRefrigerate,
      canFreeze: formState.canFreeze,
      standardShelfLife: formState.standardShelfLife,
      fridgeExpiry: formState.fridgeExpiry,
      freezerExpiry: formState.freezerExpiry,
    };
    try {
      const response = await addFood(food);
      if (response) errors["success"] = "Success! Redirecting...";
      setFormState({ ...formState, errors });
    } catch (error) {
      errors["failure"] = error.response.data.message;
      setFormState({ ...formState, errors });
      // toast.dark(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto mt-5 col-md-6">
          <form noValidate onSubmit={handleSubmit}>
            <h1 className="mb-3 h3 font-weight normal">
              Help expand our food database
            </h1>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter the food name"
                value={formState.name}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="isFresh">
                Is this a fresh or packaged (perishable) food
              </label>
              <input
                type="radio"
                className="form-control"
                name="isFresh"
                placeholder="Select if it is fresh"
                value={formState.isFresh}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="canRefrigerate">
                Can it be stored in the fridge?
              </label>
              <input
                type="radio"
                className="form-control"
                name="canRefrigerate"
                placeholder="Select if it can be refrigerated"
                value={formState.canRefrigerate}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="canFreeze">
                Can it be stored in the freezer?
              </label>
              <input
                type="radio"
                className="form-control"
                name="canFreeze"
                placeholder="Select if it can be frozen"
                value={formState.canFreeze}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="standardShelfLife">
                In days, how long does the product usually last?
              </label>
              <input
                type="number"
                className="form-control"
                name="standardShelfLife"
                placeholder="Number of days"
                value={formState.standardShelfLife}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fridgeExpiry">Fridge expiry</label>
              <input
                type="text"
                className="form-control"
                name="fridgeExpiry"
                placeholder="e.g: 6 - 8 weeks/6 months/7 days"
                value={formState.fridgeExpiry}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="freezerExpiry">Freezer Expiry</label>
              <input
                type="text"
                className="form-control"
                name="freezerExpiry"
                placeholder="e.g: 6 - 8 weeks/6 months/7 days"
                value={formState.freezerExpiry}
                onChange={onChange}
              />
            </div>
            <span style={{ color: "red" }}>{formState.errors["failure"]}</span>
            <button type="submit" className="btn btn-lg btn-primary btn-block">
              Add food
            </button>
          </form>
          <p className="text-center">An admin will review your additions!</p>
        </div>
      </div>
    </div>
  );
};

export default AddDash;
