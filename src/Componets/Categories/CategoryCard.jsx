import React from "react";
import "./CategoryCard.css";
const CategoryCard = (props) => {

  return (

    <a href={`#${props.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
      <div className="category-card">
        <img
          className="category-card-img"
          alt="category-card-img"
          src={props.img}
        ></img>
        <div className="category-card-content">
          <h3 className="category-card-title">{props.title}</h3>
          <p className="category-card-no_of_restaurants">
            {props.noOfRestaurants}
          </p>
        </div>
      </div>
    </a>
  );
};

export default CategoryCard;
