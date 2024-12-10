import Category from "./Category";
import { useState } from 'react';
import ChartSection from "./ChartSection";
import axios from "axios";
import Header from "./Header";
import { v4 as uuidv4 } from "uuid";
import ShareLinkPopUp from "./ShareLinkPopUp";

export default function ListDetails({apiList, listName, selectedIndex, handleNameChange, setApiList, setDeleteCategoryModal, showSideBar, isLoggedIn}) {
  const list = apiList[selectedIndex];
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [isPopUpVisible, setIsPopupVisible] = useState(false);

  function handleCopyLink(event) {
    event.preventDefault();
    navigator.clipboard.writeText("https://weigh-my-pack-react.onrender.com/#/"+ list.id);
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 2000);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = {name: newCategory, list: list.id};
  
    if (isLoggedIn) {
      axios.post('https://weigh-my-pack.onrender.com/api/categories/', data)
      .then(result => {
        setApiList(updateList(result.data));
/*         setApiList(apiList.map((list, index) =>{
          if(index === selectedIndex) {
            list.categories = [
              ...list.categories,
              result.data
            ]
            return list;
          } else {
            return list;
          }
        })) */
        
        setNewCategory('');
        setShowCategoryForm(false);
      }).catch(err => {
        console.log(err);
      });
    } else {
      const uniqueId = uuidv4();
      const newCategoryLocal = {id: uniqueId, name: newCategory, list: list.id, items:[]};
      const newList = updateList(newCategoryLocal);
      localStorage.setItem("localList", JSON.stringify(newList));
      setApiList(newList);
/*       setApiList(apiList.map((list, index) =>{
        if(index === selectedIndex) {
          list.categories = [
            ...list.categories,
            newCategoryLocal
          ]
          return list;
        } else {
          return list;
        }
      })) */

      setNewCategory('');
      setShowCategoryForm(false);
    }

    function updateList(categoryToAdd) {
      return apiList.map((list, index) =>{
        if(index === selectedIndex) {
          list.categories = [
            ...list.categories,
            categoryToAdd
          ]
          return list;
        } else {
          return list;
        }
      })
    }
    /*
    function updateStateNewCategory() {
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
    }
*/
  }

 function handleNameChangeSubmit(event) {
    event.preventDefault();

    if (isLoggedIn) {
      axios.patch('https://weigh-my-pack.onrender.com/api/lists/' + list.id + '/', {name: listName})
      .then(result => {
        
        /*setApiList(apiList.map((list, index) => {
          if (index === selectedIndex) {
            list.name = listName;
            return list;
          } else {
            return list;
          }
        }))*/
        updateStateNameChange();
        setIsEditing(false);
      }).catch(err => {
        console.log(err);
      });
    } else {
      updateStateNameChange();
      localStorage.setItem("localList", JSON.stringify(apiList));
      setIsEditing(false);
    }
    function updateStateNameChange() {
      setApiList(apiList.map((list, index) => {
        if (index === selectedIndex) {
          list.name = listName;
          return list;
        } else {
          return list;
        }
      }))
    }
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
          {isLoggedIn && 
            <button className="secondary-button" onClick={handleCopyLink}>Share List</button>
          }
          {isPopUpVisible && <ShareLinkPopUp /> }
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
          {/* <ChartSection  selectedIndex={selectedIndex} apiList={apiList}/> */}
          <ChartSection list={apiList[selectedIndex]}/>

          {list.categories.map((category) => 
          <Category key={category.id} category={category} apiList={apiList} setApiList={setApiList} selectedIndex={selectedIndex} setDeleteCategoryModal={setDeleteCategoryModal} isLoggedIn={isLoggedIn}/>)}
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
      <div className="table">
        <div className="tablerow tableheader">
          <div className="name ">Name</div>
          <div className="desc ">Description</div>
          <div className="weight ">Weight</div>
          <div className="qty">Qty</div>
          <div className="editmode"></div>
        </div>
        <div className="tablerow">
          <div className="name ">Item 1</div>
          <div className="desc ">Description 1</div>
          <div className="weight ">10 oz</div>
          <div className="qty">1</div>
          <div className="editmode"></div>
        </div>
        <div className="tablerow editing">
          <div className="name "><input value="Item 1 "/></div>
          <div className="desc ">
            <input value="Description 1"/>
          </div>
          <div className="weight ">
          <input value="10"/>
          <select name="weight_uom" value='oz'>
                        <option value="oz">oz</option>
                        <option value="lb">lb</option>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                    </select>
          </div>
          <div className="qty">
          <input type='number' value="1" name="qty"/>
          </div>
          <div className="editmode">
            <button className="primary-button">Update Item</button>
            <div>Cancel Editing</div>              
          </div>
        </div>
      </div>
    </div>
  )
}
