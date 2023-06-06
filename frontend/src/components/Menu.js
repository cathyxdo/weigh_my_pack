import ListName from "./ListName";

export default function Menu({ lists, onSelectList}) {

    return (
    <ul>
      {lists.map((list) => (
      <ListName key={list.id} id={list.id} name={list.name} onSelect={onSelectList}/>
    ))}
    <button>Add List</button>

    </ul>
    )
}