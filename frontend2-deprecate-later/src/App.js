import {lists} from './data.js';
import {useState} from 'react';
import EditIcon from "./components/EditIcon";
import Menu from "./components/Menu";
import ListDetails from './components/ListDetails.js';

function App() {
  const [id, setId] = useState(0);    // show first list by default

  function handleClick(index) {
    setId(index);
  }


  function ListDetails2() {
    const categories = lists[id].categories;
    const [visible, setVisibility] = useState("hidden");
    return (
      <div className="fullDetails">
        <header>
          <h2 onMouseOver={()=> setVisibility("visible")} onMouseLeave={() => setVisibility("hidden")}>{lists[id].name} <EditIcon show={visible}/></h2> 
        </header>
        <div>
          {categories.map((category) => (
          <div className="categorySection">
              <h3>{category.name} </h3>
              <ul>
                {category.items.map((item) => (
                <li> {item.name}, {item.description}, {item.weight}g, {item.qty}</li>
              ))}
              </ul>
              <form>
                <input type='text' placeholder="name"></input>
                <input type='text' placeholder="description"></input>
                <input type='number' placeholder="weight in g"></input>
                <input type='number' placeholder="qty"></input>

              </form>
              <button>Add Item</button>

            </div>
          ))}
          <button>Add Category</button>
        </div>
      </div>
    )
  }

  return (
    
    <div className="App">
      <h1>Packer List</h1>
      <Menu lists={lists} onSelectList={handleClick}/>
      <ListDetails list={lists[id]} />
      {/*<ListDetails2 />*/}
      
    </div>

  );
}

export default App;
