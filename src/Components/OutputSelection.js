import React from 'react';
import TableSelector from './TableSelector';

export default class OutputSelection1 extends React.Component {
    render() {
        return (
            <div className="selection1">
                <table>
                    <TableSelector name="Const" elements={this.props.content}/>
                </table>
            </div>
        );
    }
}