import React from 'react';

const TableModify = (props) => {
    return(
        props.elements.map((element) => {
            return (
                <tr key={element.id} id={element.id} onClick={() => props.tableSelect(element)} className={element.getAction()}>
                    <td>{`${element.date.getDate()}-${element.date.getMonth()}-${element.date.getFullYear()}`}</td>
                    <td>{element.date.getHours() + ":" + element.date.getMinutes()}</td>
                    <td>{element.content}</td>
                </tr>
            )
        })
    )
}

export default TableModify