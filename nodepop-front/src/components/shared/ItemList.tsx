type RenderFunction<T> = (item: T) => JSX.Element;

interface ItemListProps<T> {
  itemName: string;
  items: T[];
  render: RenderFunction<T>;
  className: string;
}

const ItemList = <T,>({
  itemName,
  items,
  render,
  className,
}: ItemListProps<T>) => {
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
