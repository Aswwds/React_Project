import React from 'react';

const Table = ({ elements }) => {
    return(
        elements.map((element) => {
            return (
                <tr key={element.id} id={element.id}>
                    <td>{`${element.date.getDate()}-${element.date.getMonth()}-${element.date.getFullYear()}`}</td>
                    <td>{element.date.getHours() + ":" + element.date.getMinutes()}</td>
                    <td>{element.content}</td>
                </tr>
            )
        })
    )
}

export default Table