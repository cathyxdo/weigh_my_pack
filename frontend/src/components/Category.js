import Item from "./Item";
import { useState } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Category({category, apiList, setApiList, selectedIndex, setDeleteCategoryModal, isLoggedIn}) {

    const emptyItem = {
        name: '',
        description: '',
        weight: 0,
        weight_uom: 'oz',
        qty: 1,
        link: '',
        category: category.id 
    }
    const [showItemForm, setShowForm] = useState(false);
    const [itemData, setItemData] = useState(emptyItem);
    const [editing, setEditing] = useState(false);
    const [categoryName, setCategoryName] = useState(category.name);

    function handleChange(event) {
        setItemData({
            ...itemData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmitItem(event) {
        event.preventDefault();

        if (isLoggedIn) {
            axios.post('https://weigh-my-pack.onrender.com/api/items/', itemData)
            .then(result => {
                setApiList(updateList(result.data));
            }).catch(err => {
                console.log({err});
            });
        } else {
            const uniqueId = uuidv4();
            const newItem = {id: uniqueId, ...itemData};
            const newList = updateList(newItem);
            localStorage.setItem("localList", JSON.stringify(newList));
            setApiList(newList);
        }
        setItemData(emptyItem);

        function updateList(itemToAdd) {
            const newList = apiList.map((list,index) => {
                if (index === selectedIndex) {
                    list.categories.map((c) => {
                        if (c.id === category.id) {

                            c.items = [
                                ...c.items,
                                itemToAdd
                            ]
                            return c;
                        } else {
                            return c;
                        }
                    })
                    return list
                } else {
                    return list;
                }
            })
            return newList
        }
    }

    function isValidItem(itemData) {
        if (itemData.name === '' || itemData.weight <= 0 || itemData.qty <= 0) {
            return false;
        }
        return true;
    }

    function handleSubmitCategory(event) {
        event.preventDefault();
        if (isLoggedIn) {
            axios.patch('/api/categories/' + category.id + '/', {name: categoryName})
            .then(result => {
                updateStateEditCategory();
                setEditing(false);
            }).catch(err => {
                console.log(err);
            });
        } else {
            updateStateEditCategory();
            setEditing(false);
            localStorage.setItem("localList", JSON.stringify(apiList));
        }

        function updateStateEditCategory() {
            setApiList(apiList.map((list, index) => {
                if (index === selectedIndex) {
                    list.categories.map((c) => {
                        if (c.id === category.id) {
                            c.name = categoryName;
                            return c;
                        } else {
                            return c;
                        }
                    })
                    return list;
                } else {
                    return list;
                }
            }))
        }
    }

    return (
        <div className="categorySection">
            {editing === false &&
                <div className="category">
                    <h3>
                        <span className="list-details-name" onClick={() => setEditing(true)}>{category.name} </span>
                    </h3>
                    <div className="delete-category-wrapper">
                        <svg className="delete-icon" onClick={() => setDeleteCategoryModal({'show': true, 'categoryId': category.id})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"></path></svg>
                        <svg className="delete-icon-outline"xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"></path></svg>
                    </div>
                </div>
            }

            {editing === true &&
                <h3>
                    <form className="edit-form" onSubmit={handleSubmitCategory}>
                        <input type='text' value={categoryName} onChange={(e) => setCategoryName(e.target.value) } className="edit-input"></input>
                        <button type='submit' className="primary-button">Update</button>
                        <button className="secondary-button" onClick={function() {
                            setEditing(false);
                            setCategoryName(category.name);
                        }}>Cancel</button>
                    </form>
                </h3>
            }
            {category.items.length > 0 && 
                <table className="item-table">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Weight</th>
                        <th>Qty</th>
                        <th></th>
                    </tr>
                    {category.items.map((item) => (
                    <Item key={item.id} item={item} apiList={apiList} setApiList={setApiList} selectedIndex={selectedIndex} categoryId={category.id} isValidItem={isValidItem} isLoggedIn={isLoggedIn}/>
                    ))}
                </table>
            
            }
            {showItemForm && 
                <form className="item-form" onSubmit={handleSubmitItem}>
                    <div>
                        <label className="item-label" htmlFor="name">Name*</label>
                        <input type='text' name="name" value={itemData.name} onChange={handleChange}></input>
                    </div>
                    <div className="quantity">
                        <div>
                            <label htmlFor="qty">Qty*</label>
                            <input type='number' name="qty" min="0" value={itemData.qty} onChange={handleChange}></input>
                        </div> 
                        <div>
                            <label htmlFor="weight">Weight*</label>
                            <input type='number' name ="weight" min="0" value={itemData.weight} onChange={handleChange}></input>
                        </div>
                        <div>
                            <label htmlFor="uom">Uom</label>
                            <select name="weight_uom" value={itemData.weight_uom} onChange={handleChange}>
                                <option value="oz">oz</option>
                                <option value="lb">lb</option>
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                            </select>
                        </div>
                    </div>

                    

                    <div>
                        <label htmlFor="description">Description</label>
                        <input type='text' name="description" value={itemData.description} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor="link">Link</label>
                        <input type='link' name="link" value={itemData.link} onChange={handleChange}></input>
                    </div>
                    <div className="requiredfield">
                        * Required Field
                    </div>
                    <div className="button-row">
                        <button className="primary-button" type='submit' disabled={isValidItem(itemData) ? false : true}>Add item</button>
                        <button className="secondary-button" onClick={
                            function() {
                                setShowForm(false);
                                setItemData(emptyItem);
                            }
                        }>Cancel</button>

                    </div>

                </form>
            }
            
            {!showItemForm && 

                <button className="add-item" onClick={() => setShowForm(true)}>
                    <div className="add-icon-wrapper">
                        <svg className="plus-outline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                        </svg>
                        <svg className="plus-filled" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>
                        </svg>
                    </div>
                    
                    <div>Add Item</div>
                </button>
            
            }
            
        </div>
            
    )
}