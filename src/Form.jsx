import { useState } from "react";
// display notifications
import { toast } from "react-toastify";

const Form = ({ addItem }) => {
  // state
  const [text, setText] = useState("");

  // event handling
  const submitHandler = (e) => {
    // prevent default action
    e.preventDefault();
    // check for empty value
    if (!text) {
      // display error toast
      toast.error("Please provide some values");
      return;
    }
    // add newItem to items
    addItem(text);
    // clear input
    setText("");
  };

  return (
    <form onSubmit={submitHandler}>
      <h4>Grocery list</h4>
      <div className="form-control">
        <input
          type="text"
          className="form-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn">
          Add Item
        </button>
      </div>
    </form>
  );
};

export default Form;
