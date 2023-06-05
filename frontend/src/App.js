import {lists} from './data.js';
import {useState} from 'react';
import ListName from "./components/ListName";

function App() {
  const [id, setId] = useState(0);    // show first list by default

  function handleClick(event) {
    setId(event.target.value);
  }

  function List() {
    return (
    <ul>
      {lists.map((list) => (
      <ListName key={list.id} id={list.id} name={list.name} clickList={handleClick}/>
    ))}
    <button>Add List</button>

    </ul>
    )
}

  function ListDetails() {
    const categories = lists[id].categories;
    return (
      <ul>
        <li >{lists[id].name}</li>
        <ul>
          {categories.map((category) => (
            <>
              <li>{category.name}</li>
              <ul>
                {category.items.map((item) => (
                 <li> {item.name}, {item.description}, {item.weight}g, {item.qty}</li>
              ))}
              </ul>
              <form>
                <input type='text' placeholder="name"></input>
                <input type='text' placeHolder="description"></input>
                <input type='number' placeHolder="weight in g"></input>
                <input type='number' placeHolder="qty"></input>

              </form>
              <button>Add Item</button>

            </>
          ))}
          <button>Add Category</button>
        </ul>
      </ul>
    )
  }

  return (
    
    <div className="App">
      <h1>Packer List</h1>
      <List />
      <ListDetails />
    </div>

  );
}

export default App;
