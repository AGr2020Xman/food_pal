import axios from "axios";
//
export const getFood = async (config) => {
  return axios.get("/api/food", config);
};

export const getListItems = async (config) => {
  return axios.get("/api/listitems", config);
};

export const createListItems = async (listData) => {
  return axios.post("/api/listitems", listData);
}; // from auth local storage

export const updateItems = async (listUpdateArray) => {
  return axios.patch("/api/listitems", listUpdateArray);
};

export const deleteItem = async (config) => {
  return axios.delete("/api/listitems/", config);
};

export const deleteAll = async (config) => {
  return axios.delete("/api/listitems/", config); //req.decoded required for _id
};

export const addFood = async (payload) => {
  return axios.post("/api/food", {
    name: payload.name,
    isFresh: payload.isFresh,
    canRefrigerate: payload.canRefrigerate,
    canFreeze: payload.canFreeze,
    standardExpiry: payload.standardExpiry,
    fridgeExpiry: payload.fridgeExpiry,
    freezerExpiry: payload.freezerExpiry,
  });
};
