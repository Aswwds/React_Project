import React from 'react';
import './Style1.css';
import OutputSelector from './OutputSelector';
import BottomPanel from './BottomPanel';
import Task from './TaskClass';

//Компонент React
export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selector: "Default",
      filter: "Default",
      bottom: "Default",
      elements: [
        new Task(new Date(2024, 4, 10, 10, 0), "Задание"), 
      ],
      elements_to_edit: [],
      
    };

    this.setSelector = this.setSelector.bind(this);
    this.setBottom = this.setBottom.bind(this); 
    this.editElements = this.editElements.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  setSelector(name, filter, ...args) {
    this.setState({selector: name});
    this.setState({filter: filter});
    if (args.length > 0) {
      this.setState({bottom: args[0]});
    }
  }

  setBottom(bottom){
    this.setState({bottom: bottom});
  }

  editElements(element, action) {

    const lists = {
      "edit": this.state.elements_to_edit,
      "main": this.state.elements
    }

    switch (action) {

      case "add": {
        lists["main"].push(element);
        this.setState({elements: lists["main"]});
        this.setState({bottom: element});
      }
      break;

      case "edit": {//
        let element_to_edit = Task.getTaskById(lists["main"], element.id);
        element_to_edit.setAction(action);

        if (Task.getTaskById(lists["edit"], element.id) === null) {
          lists["edit"].push(element_to_edit);
          lists["main"][lists["main"].indexOf(element_to_edit)] = element;
          this.setState({elements: lists["main"]});
        } else {
          lists["main"][lists["main"].indexOf(element_to_edit)] = element;
          this.setState({elements: lists["main"]});
        }
      }
      break;

      case "remove": {
        if (lists["main"].indexOf(Task.getTaskById(lists["main"], element.id)) === -1 && lists["edit"].indexOf(Task.getTaskById(lists["edit"], element.id)) === -1) {
          lists["main"][lists["main"].indexOf(Task.getTaskById(lists["main"], element.id))] = lists["edit"][lists["edit"].indexOf(Task.getTaskById(lists["edit"], element.id))];
          lists["edit"].splice(lists["edit"].indexOf(Task.getTaskById(lists["edit"], element.id)), 1);
        }
        let element_to_remove = Task.getTaskById(lists["main"], element.id);
        if (element_to_remove.getAction() === "add") {
          this.setState({elements: Task.remove(lists["main"], element.id)});
          this.setState({bottom: "Default"});
        } else {
          element_to_remove.setAction(action);
          this.setState({elements: lists["main"]}); 
        }
      }
      break;

      case "cancel": {
        let element_to_remove = Task.getTaskById(lists["main"], element.id);
        element_to_remove.setAction("Default");
        this.setState({elements: lists["main"]});
      }
      break;

      case "edit_back": {
        lists["main"][lists["main"].indexOf(Task.getTaskById(lists["main"], element.id))] = lists["edit"][lists["edit"].indexOf(Task.getTaskById(lists["edit"], element.id))];
        lists["main"][lists["main"].indexOf(Task.getTaskById(lists["main"], element.id))].setAction("Default");
        lists["edit"].splice(lists["edit"].indexOf(Task.getTaskById(lists["edit"], element.id)), 1);
        this.setState({elements: lists["main"]});
      }
      break;

      default:
        break;
    }
  }

  saveChanges() {
    this.setState({elements: Task.save(this.state.elements)});
    this.setState({bottom: "Default"});
    this.setState({elements_to_edit: []});
  }

  render() {
    return (
      <div>
        <h1>Список дел</h1>
        <form className='div1'><div className='left'>

          <div className='div2'>
            <input type='button' value='На сегодня' className="button" 
              onClick={() => this.setSelector("Selection", "Сегодня", "Selection")}
            />
            <input type='button' value='На завтра' className="button" 
              onClick={() => this.setSelector("Selection", "Завтра", "Selection")}
            />
            <input type="button" value="На неделю" className="button" 
              onClick={() => this.setSelector("Selection", "Неделя", "Selection")}
            />
            <input type="button" value="На месяц" className="button" 
              onClick={() => this.setSelector("Selection", "Месяц", "Selection")}
            />
          </div>

          <div>
            <OutputSelector 
              name={this.state.selector} 
              onClick={this.setSelector} 
              content={Task.filter(this.state.elements, this.state.filter)} 
              tableSelect={this.setBottom}
            />
          </div>

          <div>
            <BottomPanel 
              onClick={this.setBottom} 
              content={this.state.bottom} 
              back={() => this.setSelector("Default", "Default", "Default")} 
              edit={this.editElements}
              saveChanges={this.saveChanges} 
            />
          </div>
      </div>
      <div className='right'>

      </div></form>
    </div>
    );
  }
}
