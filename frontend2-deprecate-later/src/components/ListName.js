

export default function ListName({id, name, onSelect}) {

    return (
        <div>
        <li className="ListName" value={id} onClick={(e) => onSelect(e.target.value)} >{name}</li>
        
        </div>
    )
}