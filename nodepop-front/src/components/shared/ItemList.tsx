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
        <h3 className="alert">No {itemName} Found</h3>
      )}
    </div>
  );
};

export default ItemList;
