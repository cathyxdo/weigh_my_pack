import DeleteIcon from "./DeleteIcon";
import axios from "axios";
import { useState } from "react";

export default function ListName({name, id, index, onSelect, apiList, setApiList, selectedIndex}) {
    const [showIcon, setShowIcon] = useState(false);
    const isActive = (index === selectedIndex) ? 'active' : 'inactive';
    function handleDelete(event) {
        event.preventDefault();
        const url = '/api/lists/' + id + '/';
        axios.delete(url)
        .then(result => {
            setApiList(apiList.filter((list) => list.id !== id ));
            onSelect(index-1);
        }).catch(err => {
            console.log(err);
        });
    }


    return (
        <ul className={"nav-list " + isActive}onMouseOver={() => setShowIcon(true)} onMouseLeave={() => setShowIcon(false)}>
            <li className="listName" onClick={(e) => onSelect(index)} >
                {name}
            </li>
            <li className="listNameIcon" onClick={() => console.log('hi')}>
                {showIcon && 
                    <svg className="deleteList" onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"></path></svg>                
                }
            </li>
        </ul>
    
    )
} 