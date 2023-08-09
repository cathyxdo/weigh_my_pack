import ItemForm from "./ItemForm";
import Item from "./Item";
import { useState } from 'react';

export default function Category({category}) {
    const [showItemForm, setShowForm] = useState(false);

    return (
        <div className="categorySection">
            <h3>{category.name} </h3>
            <ul>
                {category.items.map((item) => (
                <Item key={item.id} item={item} />
                ))}
            </ul>
            {showItemForm && 
                <form >
                    <input type='text' placeholder="name"></input>
                    <input type='text' placeholder="description"></input>
                    <input type='number' placeholder="weight in g"></input>
                    <input type='number' placeholder="qty"></input>
                    <br/>
                    <button>Add it</button>
                    <button onClick={() => setShowForm(false)}>Cancel</button>
                </form>
            }
            
            {!showItemForm && <button onClick={() => setShowForm(true)}>Add Item</button>}
            
        </div>
          
    )
}