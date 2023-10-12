import Item from "./Item";
import { useState } from 'react';
import axios from "axios";

export default function Category({category, apiList, setApiList, selectedIndex, setDeleteCategoryModal}) {

    const emptyItem = {
        name: '',
        description: '',
        weight: 0,
        qty: 1,
        link: '',
        category: category.id 
    }
    const [showItemForm, setShowForm] = useState(false);
    const [itemData, setItemData] = useState(emptyItem);
    const [editing, setEditing] = useState(false);
    const [categoryName, setCategoryName] = useState(category.name);
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [showAddItemIcon, setShowAddItemIcon] = useState(false);

    function handleChange(event) {
        setItemData({
            ...itemData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmitItem(event) {
        event.preventDefault();
        axios.post('/api/items/', itemData)
        .then(result => {
            setApiList(apiList.map((list,index) => {
                if (index === selectedIndex) {
                    list.categories.map((c) => {
                        if (c.id === category.id) {

                            c.items = [
                                ...c.items,
                                result.data
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
            }))
        }).catch(err => {
            console.log({err});
        });

        setItemData(emptyItem);
    }

    function isValidItem(itemData) {
        if (itemData.name === '' || itemData.weight <= 0 || itemData.qty <= 0) {
            return false;
        }
        return true;
    }

    function handleSubmitCategory(event) {
        event.preventDefault();
        axios.patch('/api/categories/' + category.id + '/', {name: categoryName})
        .then(result => {
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
            setEditing(false);
        }).catch(err => {
            console.log(err);
        })

    }

    function handleDeleteCategory(event) {
        event.preventDefault();
        axios.delete('/api/categories/' + category.id + '/')
        .then(result => {
            setApiList(apiList.map((list, index) => {
                if(index === selectedIndex) {
                    list.categories = list.categories.filter((c) => c.id !== category.id);
                    return list;
                } else {
                    return list;
                }
            }))
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div className="categorySection">
            {editing === false &&
                <div className="category">
                    <h3>
                        <span className="list-details-name" onClick={() => setEditing(true)}>{category.name} </span>
                    </h3>
                    {showDeleteIcon === true && 
                        <svg className="delete-icon" onMouseLeave={() => setShowDeleteIcon(false)} onClick={() => setDeleteCategoryModal({'show': true, 'categoryId': category.id})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"></path></svg>
                    }

                    {showDeleteIcon === false && 
                        <svg onMouseOver={() => setShowDeleteIcon(true)}  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"></path></svg>
                    }
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
                        <th>Weight(g)</th>
                        <th>Qty</th>
                        <th></th>
                    </tr>
                    {category.items.map((item) => (
                    <Item key={item.id} item={item} apiList={apiList} setApiList={setApiList} selectedIndex={selectedIndex} categoryId={category.id} isValidItem={isValidItem}/>
                    ))}
                </table>
            
            }
            {showItemForm && 
                <form className="item-form" onSubmit={handleSubmitItem}>
                    <div className="item-form-1">
                        <span>
                            <label className="item-label" htmlFor="name">Name*</label>
                            <input type='text' name="name" value={itemData.name} onChange={handleChange}></input>
                        </span>
                        <span>
                            <label htmlFor="weight">Weight*</label>
                            <input type='number' name ="weight" value={itemData.weight} onChange={handleChange}></input>
                        </span>
                        <span>
                            <label htmlFor="uom">Uom</label>
                            <select name="uom">
                                <option value="g">g</option>
                            </select>
                        </span>
                    </div>
                    <div className="item-form-2">
                        <label htmlFor="description">Description</label>
                        <input type='text' name="description" value={itemData.description} onChange={handleChange}></input>
                        

                    </div>
                    <div>
                        <label htmlFor="link">Link</label>
                        <input type='link' name="link" value={itemData.link} onChange={handleChange}></input>
                        <label htmlFor="qty">Qty*</label>
                        <input type='number' name="qty" value={itemData.qty} onChange={handleChange}></input>
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

                <button className="add-item" onClick={() => setShowForm(true)} onMouseOver={() => setShowAddItemIcon(true)} onMouseLeave={() => setShowAddItemIcon(false)} >
                    {showAddItemIcon === false &&
                        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                    }
                    {showAddItemIcon === true && 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
                    }
                    Add Item
                </button>
            
            }
            
        </div>
            
    )
}