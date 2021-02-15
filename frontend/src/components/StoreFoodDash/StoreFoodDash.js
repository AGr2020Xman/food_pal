import React, { useState, useEffect } from "react";
import FoodCard from "../FoodCard/FoodCard";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import useDebounce from "../../utils/debounce";
import List from "../listComps/List";

// import List from "../FoodList/FoodList";
import { getFood, getListItems } from "../../utils/foodApi";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3),
  },
  search: {
    width: "100%",
  },
}));

const StoredFoodDash = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const classes = useStyles();

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    getFood(debouncedQuery).then((data) => {
      setProducts(data);
    });
  }, [debouncedQuery]);

  const [listItems, setList] = useState([]);

  useEffect(() => {
    getListItems().then((data) => {
      setList([...listItems, ...data]);
    });
  });

  const addListItem = (item) => {
    // take e.target.id
    setList([...listItems, item]);
    // [...listItems]
    // food -> [{},...]
  };

  return (
    <div>
      <Container className={classes.container}>
        <Typography variant="h6" gutterBottom>
          App Catalog
        </Typography>
      </Container>
      <Container className={classes.container}>
        <TextField
          label="Search for foods..."
          variant="outlined"
          className={classes.search}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Container>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          {products.map((food) => {
            return (
              <Grid item xs={6} sm={3} key={food._id}>
                <FoodCard
                  addListItem={addListItem}
                  props={
                    (food._id,
                    food.name,
                    food.isFresh,
                    food.canRefigerate,
                    food.canFreeze,
                    food.standardShelfLife,
                    food.fridgeExpiry,
                    food.freezeExpiry)
                  }
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid container>
          <Grid item>
            <List listItems={listItems} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default StoredFoodDash;
