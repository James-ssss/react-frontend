import React from "react";
//import './table.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Table = ({data, column}) => {
    return (
        <table class="table">
            <thead>
                <tr>
                    {column.map((item, index) => <TableHeadItem item={item}/>)}
                </tr>
            </thead>
            <tbody>
                <td>Васька</td>
                <td>vasya.pupkin@gmail.com</td>
            </tbody>
        </table>
    )
}

const TableHeadItem = ({ item}) => <th>{item.heading}</th>
export default Table