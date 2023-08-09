import Category from "./Category";
import { useState } from 'react';
import EditIcon from './EditIcon';

export default function ListDetails({list}) {
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState("hidden");

  function wasClicked() {
    setIsEditing(true);
  }

  return (
    <div className="fullDetails">
      <header>
        {!isEditing && 
          <h2 onMouseOver={() => setShowEditIcon("visible")} onMouseLeave={() => setShowEditIcon("hidden")}>
          {list.name}<EditIcon show={showEditIcon} handleClick={setIsEditing}/>
          </h2> 
        }
        
        {isEditing && 
          <h2>
            <form>
              <input type="text" value={list.name} />
              <button>Update</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
              </form>
          </h2>
        }      
      </header>
      {list.categories.map((category) => 
      <Category key={category.id} category={category}/>)}
      <br />
      {showCategoryForm && 
          <form >
          <input type='text' placeholder="category name"></input>
          <button>Add</button>
          <button onClick={() => setShowCategoryForm(false)}>Cancel</button>
      </form>
      }
      {!showCategoryForm &&         
          <button onClick={() => setShowCategoryForm(true)}>Add Category</button>
      }
    </div>
  )
}