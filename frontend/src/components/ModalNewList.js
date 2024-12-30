import { useState } from "react";
import axiosInstance from "../axios";
import { v4 as uuidv4 } from "uuid";

export default function ModalNewList({showModal, setApiList, apiList, isLoggedIn}) {
    const emptyListData = {name: '', notes:''}
    const [listData, setListData] = useState(emptyListData);

    function handleChange(event) {
        setListData({
            ...listData,
            [event.target.name]: event.target.value
            }
        )
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (isLoggedIn) {
            axiosInstance.post('lists/', listData)
            .then(result => {
                setApiList([
                    ...apiList, result.data
                ]);
                showModal(false);
                setListData(emptyListData);
            }).catch(err => {
                console.log(err);
            });
        } else {
            const uniqueId = uuidv4();
            const newList = {id: uniqueId, name: listData.name, notes: listData.notes, categories: []};
            localStorage.setItem("localList", JSON.stringify([...apiList, newList]));
            setApiList([...apiList, newList]);            
            showModal(false);
            setListData(emptyListData);

        }
    }
    return (
        <div className="modal">
            <div className="modal-header">
                <h3>Add List</h3>
            </div>
            <form className="modal-content">
                
                    <label htmlFor="name">Name</label>                    
                    <input type="text" name="name" value={listData.name} onChange={handleChange}/>
{/*                     <label htmlFor="notes">Notes</label>
                    <textarea id="notes" maxLength="300" type="text" name="notes" value={listData.notes} onChange={handleChange}></textarea>
                 */}

            </form>

            <div className="modal-footer">
                <button className="secondary-button" onClick={()=> showModal(false)}>Cancel</button>
                <button className="primary-button" type="submit" onClick={handleSubmit}>Add</button>
            </div>

        </div> 
    )
}