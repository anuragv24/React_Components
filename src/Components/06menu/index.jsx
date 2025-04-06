import React from "react";
import "./style.css";
import MenuList from "./Menu-List";

const Menu = ({ menus = [] }) => {
  return (
    <div className="tree-view-container">
      <MenuList list={menus} />
    </div>
  );
};

export default Menu;
