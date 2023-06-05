
export default function ListName(props) {
    
    return (
        <li onClick={props.clickList} value={props.id}>{props.name}</li>
    
    )
}