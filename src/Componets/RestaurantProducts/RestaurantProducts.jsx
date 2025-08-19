import React, { useEffect, useState } from "react";
import "./RestaurantProducts.css";
import axios from "axios";
import Cookies from "js-cookie";
import PopularItemCard from "../Popular Items/PopularItemCard";

const RestaurantProduct = () => {
  const userId = Cookies.get("userId");
  const [productData, setProductData] = useState([]);
  const groupByCategory = (items) => {
    return items.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});
  };

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await axios.get("https://restaurant-backend-uclq.onrender.com/allProducts", {
          headers: {
            userId: userId,
          },
        });
        if (res.status === 200) {
          setProductData(res.data.msg);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getProductData();
  }, []);

  const groupedProducts = groupByCategory(productData);
  return (
    <div className="all-products-container">
      {Object.keys(groupedProducts).map((category) => (
        <div id={category} style={{margin:"20px"}}>
          <h2 className="section-title" style={{textAlign: "start",justifyContent:"start",marginBottom: "20px"}}>
            {category}
          </h2>
          <div className="restaurant-grid custom_class">
            {groupedProducts[category].map((product, index) => (
              <PopularItemCard key={product._id} item={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantProduct;
