import SingleItem from "./SingleItem";

const Items = ({ items }) => {
  return (
    <section className="items">
      {items.map((item) => {
        return <SingleItem key={item.id} {...item} />;
      })}
    </section>
  );
};

export default Items;
