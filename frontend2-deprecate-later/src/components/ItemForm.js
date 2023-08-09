export default function ItemForm(handleClick) {

    return (
    
    <form >
        <input type='text' placeholder="name"></input>
        <input type='text' placeholder="description"></input>
        <input type='number' placeholder="weight in g"></input>
        <input type='number' placeholder="qty"></input>
        <button>Add it</button>
        <button>Cancel</button>
    </form>
    )

}