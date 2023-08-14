import { useState, createContext, useContext } from "react";
// display notifications
import { toast, ToastContainer } from "react-toastify";
// generate unique id
import { nanoid } from "nanoid";

import Form from "./Form";
import Items from "./Items";

// local storage functions (place outside for cleaner code and reusability)
// 1. set local storage
const setLocalStorage = (items) => {
  localStorage.setItem("list", JSON.stringify(items));
};
// 2. get local storage
const getLocalStorage = () => {
  // localStorage.getItem("list") 沒找到會返回 null
  // JSON.parse() 會返回對應的原始值
  let result = JSON.parse(localStorage.getItem("list"));
  if (!result) {
    return [];
  } else {
    return result;
  }
};
// 補充： get local storage 的簡易寫法
// const defaultList = JSON.parse(localStorage.getItem("list") || "[]");
// const [items, setItems] = useState(defaultList);

const AppContext = createContext();
// create custom hook
export const useAppContext = () => useContext(AppContext);

const App = () => {
  // state
  const [items, setItems] = useState(getLocalStorage());

  // functions (global set up)
  const addItem = (itemName) => {
    const newItem = {
      id: nanoid(),
      name: itemName,
      completed: false,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    // 加入 local storage
    setLocalStorage(newItems);
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    // 加入 local storage
    setLocalStorage(updatedItems);
    // display success toast
    toast.success("Item Removed");
  };

  const editItem = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const newItem = { ...item, completed: !item.completed };
        return newItem;
      }
      return item;
    });
    setItems(updatedItems);
    // 加入 local storage
    setLocalStorage(updatedItems);
  };

  return (
    <AppContext.Provider value={{ removeItem, editItem }}>
      <section className="section-center">
        <Form addItem={addItem} />
        <Items items={items} />
        <ToastContainer position="top-center" autoClose={3500} />
      </section>
    </AppContext.Provider>
  );
};

export default App;
