﻿// @flow
import React from "react";
import PropTypes from "prop-types";

import ButtonDelete from "./ButtonDelete";

import { Chip, Text } from "./style";

const Normal = "normal";
const Small = "small";

const CategoryComponent = ({ category, onClick, onDelete, size }) => {
  const onChipClick = e => {
    if (
      e.target.tagName.toLowerCase() !== "i" &&
      e.target.tagName.toLowerCase() !== "button"
    ) {
      onClick(category);
    }
  };

  const onDeleteClick = e => {
    if (
      (e.target.tagName.toLowerCase() === "i" ||
        e.target.tagName.toLowerCase() === "button") &&
      onDelete !== undefined
    ) {
      onDelete(category);
    }
  };

  return (
    <Chip onClick={onChipClick} className={size} role="presentation">
      <Text>{category.name}</Text>
      {onDelete !== undefined && <ButtonDelete onClick={onDeleteClick} />}
    </Chip>
  );
};

CategoryComponent.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    selected: PropTypes.bool // Only client side
  }).isRequired,
  onDelete: PropTypes.func,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf([Small, Normal])
};

CategoryComponent.defaultProps = {
  onDelete: undefined,
  size: "normal"
};

export default CategoryComponent;
