import { useState } from "react";
import axios from "axios";
import axiosInstance from "../axios";

export default function ModalNewList({showModal, setApiList, apiList}) {
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

        axiosInstance.post('lists/', listData)
        .then(result => {
          console.log(result.data);
          setApiList([
            ...apiList, result.data
          ]);
          showModal(false);
        }).catch(err => {
          console.log(err);
        });
        setListData(emptyListData);
        
    }
    return (
        <div className="modal-new-list">
            <div className="modal-header">
                <h3>Add List</h3>
            </div>
            <form className="modal-content">
                
                    <label htmlFor="name">Name</label>                    
                    <input type="text" name="name" value={listData.name} onChange={handleChange}/>
                    <label htmlFor="notes">Notes</label>
                    <textarea id="notes" maxLength="300" type="text" name="notes" value={listData.notes} onChange={handleChange}></textarea>
                

            </form>

            <div className="modal-footer">
                <button className="secondary-button" onClick={()=> showModal(false)}>Cancel</button>
                <button className="primary-button" type="submit" onClick={handleSubmit}>Add</button>
            </div>

        </div> 
    )
}