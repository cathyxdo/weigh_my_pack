export default function Item({item}) {
    return (
        <li> {item.name}, {item.description}, {item.weight}g, {item.qty}</li>
    )
}