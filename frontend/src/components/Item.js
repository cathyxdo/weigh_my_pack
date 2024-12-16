import axios from "axios";
import { useState } from 'react';

export default function Item({item, apiList, setApiList, selectedIndex, categoryId, isValidItem, isLoggedIn}) {
    const [editing, setEditing] = useState(false);
    const defaultItemData = {
        name: item.name,
        description: item.description ? item.description : '',
        weight: item.weight,
        weight_uom: item.weight_uom,
        qty: item.qty,
        link: item.link ? item.link : ''    
    }
    const [itemData, setItemData] = useState(defaultItemData);
    const [showItemIcons, setShowItemIcons] = useState(false);
    function handleChange(event) {
        setItemData({
            ...itemData,
            [event.target.name]:  event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (isLoggedIn) {
            axios.patch(process.env.REACT_APP_API_BASE_URL+'items/' + item.id + '/', itemData)
            .then(result => {
                updateStateEditItem();
                setEditing(false);
                console.log(result);
            }).catch(err => {
                console.log(err);
            });
        } else {
            updateStateEditItem();
            localStorage.setItem("localList", JSON.stringify(apiList));
            setEditing(false);
        }

        function updateStateEditItem() {
            setApiList(apiList.map((list, index) => {
                if (index === selectedIndex) {
                    list.categories.map((c) => {
                        if (c.id === categoryId) {
                            c.items.map((i) => {
                                if (i.id === item.id) {
                                    i.name = itemData.name;
                                    i.description = itemData.description;
                                    i.weight = itemData.weight;
                                    i.weight_uom = itemData.weight_uom;
                                    i.qty = itemData.qty;
                                    i.link = itemData.link;
                                    return i;
                                } else {
                                    return i;
                                }
                            })
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

    function handleDelete(event) {
        event.preventDefault();

        if (isLoggedIn) {
            axios.delete('/api/items/' + item.id + '/')
            .then(result => {
                updateStateDeleteItem();
            }).catch(err => {
                console.log(err);
            });
        } else {
            updateStateDeleteItem();
            localStorage.setItem("localList", JSON.stringify(apiList));
        }

        function updateStateDeleteItem() {
            setApiList(apiList.map((list, index) => {
                if (index === selectedIndex) {
                    list.categories.map((c) => {
                        if (c.id === categoryId) {
                            c.items = c.items.filter((i) => i.id !== item.id)
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
        <>
        {editing === false &&

            <div className="tablerow">
                <div className="name">
                    {!item.link && 
                    item.name
                    }
                    {item.link &&
                        <a href={item.link} target="_blank">{item.name}</a>
                    }
                </div>
                <div className="desc">
                    {item.description}
                </div>
                <div className="weight">
                    {item.weight + ' ' + item.weight_uom}
                </div>
                <div className="qty">
                    {item.qty}
                </div>
                <div className="editmode">         
                    <button className="edit" onClick={() => setEditing(true)}>Edit</button>
                    <button className="delete" onClick={handleDelete} title="Delete Item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"></path></svg>                    
                    </button>
                </div>
            </div>


        }
        {editing === true &&

            <div className="tablerow editing" >
                <div className="name">
                 <input type='text' name="name" value={itemData.name} onChange={handleChange}></input> 
                </div>
                <div className="desc">
                    <input type='text'  name="description" value={itemData.description} onChange={handleChange}></input>
                    <div className="link">
                        <span>Link:</span>
                        <input type='link'  name="link" value={itemData.link} onChange={handleChange}></input>
                    </div>
                    
                </div>
                <div className="weight">
                    <input type='number'  name ="weight" value={itemData.weight} onChange={handleChange}></input>
                    <select name="weight_uom" value={itemData.weight_uom} onChange={handleChange}>
                        <option value="oz">oz</option>
                        <option value="lb">lb</option>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                    </select>
                </div>
                <div className="qty">
                    <input  type='number'  name="qty" value={itemData.qty} onChange={handleChange}></input>
                </div>
                <div className="editmode">
                    <button className="primary-button small" type='submit' disabled={isValidItem(itemData) ? false : true} onClick={handleSubmit}>Update</button>
                    <button  className="secondary-button small" onClick={
                        function() {
                            setEditing(false);
                            setItemData(defaultItemData);
                        }
                    }>Cancel</button>
                </div>
            </div>



        }
        </>
        
    )
}
