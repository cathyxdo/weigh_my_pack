
export default function ListName({id, name, onSelect}) {

    return (
        <li value={id} onClick={(e) => onSelect(e.target.value)}>{name}</li>
    
    )
}