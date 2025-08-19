import React from "react";
import "./Categories.css";
import CategoryCard from "./CategoryCard";
import img1 from "../../assets/Rectangle 13.png";
import img2 from "../../assets/Rectangle 15.png";
import img3 from "../../assets/Rectangle 17.png";
import img4 from "../../assets/Rectangle 19.png";
import img5 from "../../assets/Rectangle 21.png";
import img6 from "../../assets/Rectangle 23.png";
const Categories = () => {
  const data = [
    {
      img: img1,
      title: "Burgers & Fast food",
      resturantCount: "21 Restaurants",
      id:"Burgers"
    },
    {
      img: img2,
      title: "Salads",
      resturantCount: "32 Restaurants",
      id: "Salads"
    },
    {
      img: img3,
      title: "Pasta & Casuals",
      resturantCount: "4 Restaurants",
      id:"Pasta"
    },
    {
      img: img4,
      title: "Pizza",
      resturantCount: "32 Restaurants",
      id: "Pizza"
    },
    {
      img: img5,
      title: "Breakfast",
      resturantCount: "17 Restaurants",
      id:"Breakfast"
    },
    {
      img: img6,
      title: "Soups",
      resturantCount: "26 Restaurants",
      id:"Soups"
    },
  ];
  return (
    <div id="category">
      <div className="section-header">
        <h2 className="section-title">What's on your mind?</h2>
      </div>
      <div className="category-container">
        {data.map((element, index) => (
          <CategoryCard
            key = {index}
            id = {element.id}
            img={element.img}
            title={element.title}
            noOfRestaurants={element.resturantCount}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
