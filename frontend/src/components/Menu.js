import ListName from "./ListName";

export default function Menu({ apiList, setApiList, onSelectList, selectedIndex, setSelectedIndex, isLoggedIn}) {

    return (
       <ul className="allLists">
        {apiList.map((list, index) => (
          <ListName apiList={apiList} setApiList={setApiList} index={index} key={list.id} id={list.id} name={list.name} onSelect={onSelectList} selectedIndex={selectedIndex} isLoggedIn={isLoggedIn}/>
        ))}

      </ul> 

    )
}