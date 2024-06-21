import React from 'react';

const CategoryList = ({ categories, onCategorySelect }) => {
  return (
    <div>
      <h3>Categorías:</h3>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <button onClick={() => onCategorySelect(category)}>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;

