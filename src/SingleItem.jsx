// import custom hook
import { useAppContext } from "./App";

const SingleItem = ({ id, name, completed }) => {
  // use custom hook
  const { removeItem, editItem } = useAppContext();

  return (
    <article className="single-item">
      <input
        type="checkbox"
        name="shipping"
        checked={completed}
        onChange={() => editItem(id)}
      />
      {/* completed 為 true 時，才添加刪除線特效 */}
      <p style={{ textDecoration: completed && "line-through" }}>{name}</p>
      <button className="btn remove-btn" onClick={() => removeItem(id)}>
        delete
      </button>
    </article>
  );
};

export default SingleItem;
