import axios from "axios";
//
export const getFood = () => {
  return axios.get("/api/food");
};

export const getListItems = () => {
  return axios.get("/api/listitems");
};

export const createListItems = (listData) => {
  return axios.post("/api/listitems", {
    name: listData.name,
    existsId: listData.existsId,
    ownerId: listData.ownerId,
    // foodDetails: listData.foodDetails, .populate('food', '''')
    isOpen: listData.isOpen,
    expiryDate: listData.expiryDate,
    quantity: listData.quantity,
    inFridge: listData.inFridge,
    inFreezer: listData.inFreezer,
  });
}; // from auth local storage

export const updateItems = (listUpdateArray) => {
  return axios.patch("/api/listitems", listUpdateArray);
};

export const deleteItem = (config) => {
  return axios.delete("/api/listitems/", config);
};

export const deleteAll = (config) => {
  return axios.delete("/api/listitems/", config); //req.decoded required for _id
};

export const addFood = (payload) => {
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
