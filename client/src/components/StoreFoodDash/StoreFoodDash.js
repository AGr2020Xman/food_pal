import React, { useState, useEffect } from "react";
import FoodCard from "../FoodCard/FoodCard";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import useDebounce from "../../utils/debounce";
import List from "../List/List";
import { Divider } from "@material-ui/core";
import {
  getFood,
  getListItems,
  createListItems,
  deleteItem,
  deleteAll,
} from "../../utils/foodApi";
import "./Fix.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3),
    alignContent: "center",
  },
  cardContainer: {
    height: "100%",
    width: "100%",
    margin: theme.spacing(3),
    justifyContent: "center",
    textAlign: "center",
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
  const [initialList, setInitialList] = useState([]);
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
    console.log("getting list items");
    const getItems = async () => {
      await getListItems(config)
        .then((res) => {
          setList([...listItems, ...res.data.listArray]);
          console.log("list items got", listItems);
          console.log("done");
          setInitialList([...res.data.listArray]);
          console.log("initial", initialList);
        })
        .catch((err) => {
          console.log("error getting items", err);
        });
    };
    getItems();
  }, []);

  // [{}]

  const addListItem = (item) => {
    setList([...listItems, item]);
    toast("Item Added !");
  };

  const saveList = (items) => {
    console.log("list items in save", items);
    createListItems(items);
  };

  const deleteByItem = async (existsId) => {
    const token = localStorage.getItem("userToken");
    let config = {
      headers: {
        Authorization: `${token}`,
      },
      data: {
        //! Take note of the `data` keyword. This is the request body.
        existsId: existsId,
      },
    };
    try {
      await deleteItem(config);
      deleteRow(existsId);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRow = (existsId) => {
    setList(listItems.filter((item) => item.existsId !== existsId));
  };

  const deleteList = () => {
    toast("Saved list deleted, don't forget to save!");
  };

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container className={classes.cardContainer}>
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
      <Divider />
      <Container className={classes.cardContainer}>
        <Grid container spacing={3}>
          {filteredProducts.map((food) => {
            // console.log("in map", food);
            return (
              <Grid item xs={12} sm={4} md={4} key={food._id}>
                <FoodCard addListItem={addListItem} food={food} />
                <ToastContainer
                  position="top-center"
                  autoClose={1000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </Grid>
            );
          })}
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={12}>
            <List
              listItems={listItems}
              deleteAll={deleteAll}
              deleteList={deleteList}
              deleteByItem={deleteByItem}
              saveList={saveList}
              initial={initialList}
            />
            <ToastContainer
              position="top-center"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default StoredFoodDash;
