import React from 'react';
import OutputDefault from './OutputDefault';
import OutputSelection from './OutputSelection';

const Components = {
    Default: OutputDefault,
    Selection: OutputSelection,
  };
  
  const DynamicComponent = (props) => {
    const SpecificComponent = Components[props.name] || OutputDefault;
    return <SpecificComponent onClick={props.onClick} content={props.content} tableSelect={props.tableSelect}/>;
  };
  
  export default DynamicComponent;