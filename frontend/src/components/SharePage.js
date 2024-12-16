import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ChartSection from "./ChartSection";
import { Link } from "react-router-dom";

export default function SharePage() {
    let{ listid } = useParams();
    const [list, setList] = useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_BASE_URL + 'lists/' + listid + '/')
        .then(result => {
            console.log(result);
            setList(result.data);
        }).catch(err => {
        })
    },[]);

    return (
        <div className="shareView">
            {list && 
                <>
                    <h1>{list.name}</h1>
                    <ChartSection list={list} />

                    {list.categories.map((category) => (
                        <>
                            <table className="item-table">
                                <tr>
                                    <th className="tableCategoryName">{category.name}</th>
                                    <th></th>
                                    <th>Weight</th>
                                    <th>Qty</th>
                                </tr>
                                {category.items.map((item) => (
                                    <tr>
                                        <td>
                                            {!item.link && item.name}
                                            
                                            {item.link && 
                                                <a href={item.link}>{item.name}</a>
                                            }
                                        </td>
                                        <td>{item.description}</td>
                                        <td>{item.weight} {item.weight_uom}</td>
                                        <td>{item.qty}</td>
                                    </tr>
                                ))}
                            </table>
                        </>
                    ))}
                </>
            }
            <div className="sharePageFooter">
                <p>Create your own backpacking list at</p>
                <Link to="/"><h4>Weigh My Pack 🎒</h4></Link>

            </div>
        </div>
    )
}