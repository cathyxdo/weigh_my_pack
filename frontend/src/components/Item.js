import axios from "axios";
import { useState } from 'react';

export default function Item({item, apiList, setApiList, selectedIndex, categoryId, isValidItem}) {
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
        axios.patch('/api/items/' + item.id + '/', itemData)
        .then(result => {
            setApiList(apiList.map((list, index) => {
                if (index === selectedIndex) {
                    list.categories.map((c) => {
                        if (c.id === categoryId) {
                            c.items.map((i) => {
                                if (i.id === item.id) {
                                    i.name = itemData.name;
                                    i.description = itemData.description;
                                    i.weight = itemData.weight;
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
            setEditing(false);
        }).catch(err => {
            console.log(err);
        });
    }

    function handleDelete(event) {
        event.preventDefault();
        axios.delete('/api/items/' + item.id + '/')
        .then(result => {
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
        }).catch(err => {
            console.log(err);
        });

    }

    return (
        <>
        {editing === false &&

            <tr onMouseOver={() => setShowItemIcons(true)} onMouseLeave={() => setShowItemIcons(false)}>
                <td>
                    {!item.link && 
                    item.name
                    }
                    {item.link &&
                        <a href={item.link} target="_blank">{item.name}</a>
                    }
                </td>
                <td>
                    {item.description}
                </td>
                <td>
                    {item.weight + ' ' + item.weight_uom}
                </td>
                <td>
                    {item.qty}
                </td>
                <td className="item-icon">
                {showItemIcons === true && 
                    <>
                        <button onClick={() => setEditing(true)}>Edit</button>

                        <button onClick={handleDelete} title="Delete Item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"></path></svg>                    
                        </button>
                    </>
                }
                 
                </td>
            </tr>


        }
        {editing === true &&

            <tr className="edit-item" >
                <td>
                 <input type='text' name="name" value={itemData.name} onChange={handleChange}></input> 
                 <label>Link</label>
                 <input type='link'  name="link" value={itemData.link} onChange={handleChange}></input>
                </td>
                <td>
                    <input type='text'  name="description" value={itemData.description} onChange={handleChange}></input>
                </td>
                <td>
                    <input className="item-weight" type='number'  name ="weight" value={itemData.weight} onChange={handleChange}></input>
                </td>
                <td>
                    <input className="item-qty" type='number'  name="qty" value={itemData.qty} onChange={handleChange}></input>
                </td>
                <td className="item-icon-edit">
                    <button className="primary-button small" type='submit' disabled={isValidItem(itemData) ? false : true} onClick={handleSubmit}>Update</button>
                    <button  className="secondary-button small" onClick={
                        function() {
                            setEditing(false);
                            setItemData(defaultItemData);
                        }
                    }>Cancel</button>
                </td>
            </tr>



        }
        </>
        
    )
}

            /* <li> 
                {item.name}, {item.description}, {item.weight}g, {item.qty}     
                <button onClick={() => setEditing(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </li> */

            /*             <li>
                <form onSubmit={handleSubmit}>
                    <input type='text' name="name" value={itemData.name} onChange={handleChange}></input>
                    <input type='text'  name="description" value={itemData.description} onChange={handleChange}></input>
                    <input type='number'  name ="weight" value={itemData.weight} onChange={handleChange}></input>
                    <input type='number'  name="qty" value={itemData.qty} onChange={handleChange}></input>
                    <input type='link'  name="link" value={itemData.link} onChange={handleChange}></input>
                    <button className="primary-button" type='submit' disabled={isValidItem(itemData) ? false : true} >Update</button>
                    <button  className="secondary-button" onClick={
                        function() {
                            setEditing(false);
                            setItemData(defaultItemData);
                        }
                    }>Cancel</button>
                </form>
            </li> */