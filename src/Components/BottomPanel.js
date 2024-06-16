import React from 'react';
import Task from './TaskClass';

export default class BottomPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editDate: null,
            editTime: null,
            editContent: null,
        };
        this.setEditDate = this.setEditDate.bind(this);
        this.setEditTime = this.setEditTime.bind(this);
        this.setEditContent = this.setEditContent.bind(this);
    }

    setEditDate(event) {
        this.setState({editDate: event.target.value});
    }

    setEditTime(event) {
        this.setState({editTime: event.target.value});
    }

    setEditContent(event) {
        this.setState({editContent: event.target.value});
    }

    createTask() {
        let task = new Task(new Date(2024, 4, 10, 10, 0), "Текст задачи");
        task.setAction("add");
        return task
    }

    dupe(date, time, content, id) {
        console.log(date, time, content, id);
        let parseDate = new Date(date);
        parseDate.setHours(time.split(":")[0]);
        parseDate.setMinutes(time.split(":")[1]);
        let task = new Task(parseDate, content);
        task.setAction("edit");
        task.id = id;
        console.log(task);
        return task
    }

    render() {
        
        //Выбор отображаемого варианта
        switch (this.props.content) {
            
            //Вариант по умолчанию
            case "Default": {
                return (
                    <div className="bottom">
                        <p>Выберите задачу для редактирования</p>
                        <div className="buttons2">
                        <input type="button" value="Сохранить" className='button2' 
                            onClick={() => this.props.saveChanges()}
                        />
                        <input type="button" value="Новая задача" className='button2'
                            onClick={() => this.props.edit(this.createTask(), "add")}
                        />
                        </div>
                    </div>
                );
            }

            //Вариант с кнопкой назад
            case "Selection": {
                return (
                    <div className="bottom">
                    <button className='button2'
                        onClick={() => this.props.back()}
                        >Назад</button>
                    </div>
                );
            }

            //Вариант с редактором задачи
            default: {

                //Регулярные выражения
                const regTime = /\d{2}:\d{2}/
                const regDate = /\d{4}-\d{2}-\d{2}/

                //Время и дата
                let time = this.props.content.date.getHours() + ":" + this.props.content.date.getMinutes()
                let date = `${this.props.content.date.getFullYear()}-${this.props.content.date.getMonth()}-${this.props.content.date.getDate()}`

                //Форматирование времени
                if (!regTime.test(time) ) {

                    let data = time.split(':')

                    if (data[0].length < 2) {
                        for (let i = 0; i < 2 - data[0].length; i++) {
                            data[0] = '0' + data[0]
                        }
                    }

                    if (data[1].length < 2) {
                        for (let i = 0; i < 2 - data[1].length; i++) {
                            data[1] = '0' + data[1]
                        }
                    }

                    time = `${data[0]}:${data[1]}`
                }

                //Форматирование даты
                if (!regDate.test(date) ) {

                    let data = date.split('-')

                    if (data[0].length < 4) {
                        for (let i = 0; i < 4 - data[0].length; i++) {
                            data[0] = '0' + data[0]
                        }
                    }

                    if (data[1].length < 2) {
                        for (let i = 0; i < 2 - data[1].length; i++) {
                            data[1] = '0' + data[1]
                        }
                    }

                    if (data[2].length < 2) {
                        for (let i = 0; i < 2 - data[2].length; i++) {
                            data[2] = '0' + data[2]
                        }
                    }

                    date = `${data[0]}-${data[1]}-${data[2]}`
                }

                //Логика совмещённой кнопки "удалить/восстановить"
                let buttonText = this.props.content.getAction();
                let newAction = null;
                if (buttonText === "remove") {
                    buttonText = "Восстановить";
                    newAction = "cancel";
                } else {
                    buttonText = "Удалить";
                    newAction = "remove";
                }

                //Вывод формы
                return (
                    <div className="bottom">
                        <form className="formEdit">
                            <div className="area">
                            <label>Дата</label>
                            <input type="date" readOnly
                                value={date}
                            />
                            <label>Новая дата</label>
                            <input type="date" 
                                onChange={this.setEditDate}
                            />
                            <label>Время</label>
                            <input type="time" readOnly
                                value={time}
                            />
                            <label>Новое время</label>
                            <input type="time"
                                onChange={this.setEditTime}
                            />
                            <label>Задание</label>
                            <div>{this.props.content.content}</div>
                            <label>Новое задание</label>
                            <textarea rows={6} cols={20} 
                                onChange={this.setEditContent}
                            />
                            </div>
                            <div className="buttons">
                            <input type="button" value="Сохранить изменения"
                                onClick={() => this.props.edit(this.dupe(this.state.editDate, this.state.editTime, this.state.editContent, this.props.content.id), "edit")}
                            />
                            <input type="button" value="Отменить изменения"
                                onClick={() => this.props.edit(this.props.content, "edit_back")}
                            />
                            <input type="button" 
                                value={buttonText} 
                                onClick={() => this.props.edit(this.props.content, newAction)}
                            />
                            </div>
                        </form>
                        <div className="buttons2">
                        <input type="button" value="Сохранить" className='button2'
                            onClick={() => this.props.saveChanges()}
                        />
                        <input type="button" value="Новая задача" className='button2'
                            onClick={() => this.props.edit(this.createTask(), "add")}
                        />
                        </div>
                    </div>
                );
            }
        }
    }
}