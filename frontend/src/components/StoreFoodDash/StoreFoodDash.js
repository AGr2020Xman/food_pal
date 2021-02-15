import React, { useState, useEffect } from "react";
import FoodCard from "../FoodCard/FoodCard";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import useDebounce from "../../utils/debounce";
import List from "../listComps/List";

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
  const config = {
    headers: {
      Authorization: localStorage.getItem("userToken"),
    },
  };
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [listItems, setList] = useState([]);
  const classes = useStyles();

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const populateFood = async () => {
      await getFood(config)
        .then((res) => {
          setProducts(res.data.products);
          // console.log("products log", products);
        })
        .catch((err) => console.log(err));
    };
    populateFood();
  }, []);

  const filteredProducts = products.filter((item) => {
    return item.name.toLowerCase().includes(debouncedQuery.toLowerCase());
  });

  useEffect(() => {
    const getItems = async () => {
      await getListItems(config)
        .then((res) => {
          setList([...listItems, ...res.data.listArray]);
        })
        .catch((err) => {
          console.log("error getting items", err);
        });
    };
    getItems();
  }, []);

  // [{}]
  const addListItem = (item) => {
    // take e.target.id
    setList([...listItems, item]);
    // [...listItems]
    // food -> [{},...]
  };
  console.log(
    "food",
    filteredProducts.map((food) => console.log("food2", food))
  );

  return (
    <div>
      <Container className={classes.container}>
        <Typography variant="h6" gutterBottom>
          Find and track your foods
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
          {filteredProducts?.map((food) => (
            <Grid item xs={6} sm={3} key={food._id}>
              <FoodCard
                addListItem={addListItem}
                _id={food._id}
                name={food.name}
                isFresh={food.isFresh}
                canRefigerate={food.canRefigerate}
                canFreeze={food.canFreeze}
                standardShelfLife={food.standardShelfLife}
                fridgeExpiry={food.fridgeExpiry}
                freezeExpiry={food.freezeExpiry}
              />
            </Grid>
          ))}
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
