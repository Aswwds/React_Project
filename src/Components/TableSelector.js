import React from 'react';
import TableConst from './Table/TableConst';
import TableModify from './Table/TableModify';

const Components = {
    Const: TableConst,
    Modify: TableModify,
  };
  
  const DynamicComponent = (props) => {
    const SpecificComponent = Components[props.name] || TableConst;
    return <SpecificComponent elements={props.elements} tableSelect={props.tableSelect}/>;
  };
  
  export default DynamicComponent;