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

import "./Fix.css";
import { Divider } from "@material-ui/core";

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

  const addListItem = async (item) => {
    // take e.target.id
    await setList([...listItems, item]);
    // createListItems(listItems);
    console.log("listItems", listItems);
    console.log(item);
    // [...listItems]
    // food -> [{},...]
  };

  return (
    <div className="fixsize">
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
          {filteredProducts.map((food) => {
            // console.log("in map", food);
            return (
              <Grid item xs={6} sm={3} key={food._id}>
                <FoodCard addListItem={addListItem} food={food} />
              </Grid>
            );
          })}
        </Grid>
        <Divider />
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
