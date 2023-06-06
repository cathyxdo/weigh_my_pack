import Category from "./Category";
export default function ListDetails({list}) {
    return (
      <div className="fullDetails">
        <header>
          <h2>{list.name}</h2> 
        </header>
        {list.categories.map((category) => 
        <Category key={category.id} category={category}/>)}

        <button>Add Category</button>
      </div>
    )
  }