import ItemForm from "./ItemForm";
import Item from "./Item";

export default function Category({category}) {
    return (
        <div className="categorySection">
            <h3>{category.name} </h3>
            <ul>
                {category.items.map((item) => (
                <Item key={item.id} item={item} />
                ))}
            </ul>
            <ItemForm />
            <button>Add Item</button>
        </div>
          
    )
}