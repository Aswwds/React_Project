import React from 'react';
import TableSelector from './TableSelector';

export default class OutputDefault extends React.Component {
    render() {
        return (
            <div className="output">
                <table>
                    <TableSelector name="Modify" elements={this.props.content} tableSelect={this.props.tableSelect}/>
                </table>
            </div>
        );
    }
}