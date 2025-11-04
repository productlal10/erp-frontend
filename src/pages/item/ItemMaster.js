// src/pages/item/ItemMaster.js

import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";

// ADD setActiveTab to the props list
const ItemMaster = ({ activeTab, setActiveTab }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentTab, setCurrentTab] = useState("ItemList"); // default to list

  // Respect activeTab prop
  useEffect(() => {
    if (activeTab) setCurrentTab(activeTab);
  }, [activeTab]);

  const handleItemSaved = () => {
    setEditingItem(null); // reset form after save
    setRefreshTrigger(!refreshTrigger); // refresh list
    setCurrentTab("ItemList"); // back to list
    
    // NEW LINE: Tell the main App/Router to switch the global active tab (sidebar highlight)
    if (setActiveTab) setActiveTab("ItemList"); 
  };

  const handleEdit = (item) => {
    setEditingItem(item); // set item to edit
    setCurrentTab("ItemForm"); // switch to form tab
  };

  const handleDelete = () => {
    setRefreshTrigger(!refreshTrigger); // refresh list after delete
  };

  return (
    <div className="w-full max-w-6xl p-6">
      {currentTab === "ItemForm" && (
        <ItemForm item={editingItem} onItemSaved={handleItemSaved} />
      )}
      {currentTab === "ItemList" && (
        <ItemList
          refreshList={refreshTrigger}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ItemMaster;