type RenderFunction<T> = (item: T) => JSX.Element;

const ItemList = <T,>({
  itemName,
  items,
  render,
  className,
}: {
  itemName: string;
  items: T[];
  render: RenderFunction<T>;
  className: string;
}) => {
  return (
    <div className={className}>
      {items.length > 0 ? (
        items.map(render)
      ) : (
        <p className="alert">No {itemName} Found</p>
      )}
    </div>
  );
};

export default ItemList;
