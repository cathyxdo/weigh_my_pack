import Category from "./Category";
import { useState } from 'react';
import ChartSection from "./ChartSection";
import axios from "axios";
import Header from "./Header";

export default function ListDetails({apiList, listName, selectedIndex, handleNameChange, setApiList, setDeleteCategoryModal, showSideBar, isLoggedIn}) {
  const list = apiList[selectedIndex];
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const data = {name: newCategory, list: list.id};
    axios.post('https://weigh-my-pack.onrender.com/api/categories/', data)
    .then(result => {
      setApiList(apiList.map((list, index) =>{
        if(index === selectedIndex) {
          list.categories = [
            ...list.categories,
            result.data
          ]
          return list;
        } else {
          return list;
        }

      }))
    }).catch(err => {
      console.log(err);
    });
    setNewCategory('');
    setShowCategoryForm(false);
  }

 function handleNameChangeSubmit(event) {
    event.preventDefault();
    axios.patch('https://weigh-my-pack.onrender.com/api/lists/' + list.id + '/', {name: listName})
    .then(result => {
      setApiList(apiList.map((list, index) => {
        if (index === selectedIndex) {
          list.name = listName;
          return list;
        } else {
          return list;
        }
      }))
      setIsEditing(false);
    }).catch(err => {
      console.log(err);
    });

    
  

 }


  return (
    <div className={"listDetails " + (showSideBar ? 'showBar' : 'hideBar' )}>
      <Header isLoggedIn={isLoggedIn}/>
      {!list && 
        <div>
          <h2>No lists created yet!</h2>
          <p>Create your first backpacker supply list by clicking <em>"+ Add List"</em> </p>
          
          <p>From there you can start creating categories and adding the items in your pack!</p>
        </div>
      }

      {list && (
        <div>

          <header>
            {!isEditing && 
              <h2>
                <span className="list-details-name" onClick={setIsEditing}>{list.name}</span>
              </h2> 
            }
            
            {isEditing && 
              <h2>
                <form className="edit-form" onSubmit={handleNameChangeSubmit}>
                  <input className ="edit-input" type="text" value={listName} onChange={(e) => handleNameChange(e.target.value)} />
                  <button type='submit' className="primary-button">Update</button>
                  <button onClick={() => setIsEditing(false)} className="secondary-button">Cancel</button>
                </form>
              </h2>
            }      
          </header>
          <ChartSection  selectedIndex={selectedIndex} apiList={apiList}/>

          {list.categories.map((category) => 
          <Category key={category.id} category={category} apiList={apiList} setApiList={setApiList} selectedIndex={selectedIndex} setDeleteCategoryModal={setDeleteCategoryModal}/>)}
          {showCategoryForm && 


              <form className="edit-form" onSubmit={handleSubmit}>
                <br></br>
                <br></br>
                <input className="edit-input" value={newCategory} type="text" placeholder="New category" onChange={(e) => setNewCategory(e.target.value)}/>
                <button type="submit" className="primary-button" >Add Category</button>
                <button className="secondary-button" onClick={function () { 
                  setShowCategoryForm(false);
                  setNewCategory('');
                  }}>
                  Cancel
                </button>
              </form>
          }
          {!showCategoryForm &&         
              <button className="add-category" onClick={() => setShowCategoryForm(true)}>
                <div className="category-line"></div>
                <h3>Add Category</h3>
                <div className="category-line"></div>
              </button>


          }
        </div>
      )}

      {!isLoggedIn &&
        <p>FYI all of your lists will be stored on your computer. Log in or sign up for an account to be able to share your list with others! [Future feature]</p>
      }
    </div>
  )
}
