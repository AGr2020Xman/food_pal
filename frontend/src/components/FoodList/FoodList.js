// import React, { useState, useEffect, useContext } from "react";
// import ListContext from "../AuthContext/AuthContext";
// import FoodCard from "../FoodCard/FoodCard";
// import { Link } from "react-router-dom";
// import API from "../../utils/foodApi";

// // const FoodList = () => {
// //   const [products, setProducts] = useState([]);
// //   const [filterFood, setFiltered] = useState(products);

// //   // const populateData = () => {
// //   //   API.getFood()
// //   //     .then((res) => {
// //   //       setProducts(res.data.results);
// //   //       setFiltered(products);
// //   //     })
// //   //     .catch((err) => console.log(err));
// //   // };

// //   useEffect(
// //     () =>
// //       function () {
// //         API.getFood()
// //           .then((res) => {
// //             setProducts(res.data.results);
// //             setFiltered(products);
// //           })
// //           .catch((err) => console.log(err));
// //       },
// //     [products]
// //   );

// //   const handleAddToList = (event) => {};

// //   const handleRemoveFromList = (event) => {};

// //   return (
// //     <div className="food-list-overflow">
// //       <h2>
// //         Your stored foods
// //         <Link to="/storefood/new" className="btn btn-primary float-right">
// //           Track food
// //         </Link>
// //       </h2>
// //       <hr />

// //       {products.map((food) => {
// //         return (
// //           <div>
// //             <FoodCard />
// //             <div key={food._id}>
// //               <h4>
// //                 <Link to={`/storefood/${food._id}`}>{food.title}</Link>
// //               </h4>
// //               <small>_id: {food._id}</small>
// //               <hr />
// //             </div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// const FoodList = () => {
//   const listContext = useContext(ListContext);
//   const { getLists, storeList, loading } = listContext;

//   useEffect(() => {
//     getLists();
//   }, []);

//   console.log(storeList);

//   return (
//     <div className="lists">
//       <div className="container">
//         <h2>Stored List</h2>
//         {!loading ? (
//           <div className="lists-grid-container">
//             {storeList.map((food, i) => {
//               return <FoodCard key={i} title={food.title} id={food._id} />;
//             })}
//           </div>
//         ) : (
//           <div>...Loading</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoodList;
