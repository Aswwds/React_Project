export default class Task {

    //Уникальный идентификатор
    static id = 0;
    //Действие
    #action = "Default";
  
    //Конструктор
    constructor(date, content) {
      this.date = date;
      this.content = content;
      this.id = Task.id;
      Task.id++;
    }

    //Установка действия
    setAction(action) {
      this.#action = action;
    }

    //Получение действия
    getAction() {
      return this.#action;
    }

    //Удаление элемента из списка
    static remove(content, id) {
      for (let i = 0; i < content.length; i++) {
        if (content[i].id === id) {
          content.splice(i, 1);
        }
      }
      return content;
    }

    //Получение элемента из списка по идентификатору
    static getTaskById(content, id) {
      for (let i = 0; i < content.length; i++) {
        if (content[i].id === id) {
          return content[i];
        }
      }
      return null;
    }
    
    //Сохранение изменений в массиве
    static save(content) {
      let newContent = [];
      for (let i = 0; i < content.length; i++) {
        if (content[i].getAction() !== "remove") {
          content[i].setAction("Default");
          newContent.push(content[i]);
        }
      }
      return newContent;
    }
        
  
    //Сортировка по времени
    static sortByTime(content) {
      for (let i = 0; i < content.length - 1; i++) {
        for (let j = 0; j < content.length - i - 1; j++) {
          if (content[j].date > content[j + 1].date) {
            let temp = content[j];
            content[j] = content[j + 1];
            content[j + 1] = temp;
          }
        }
      }
      return content;
    }
  
    //Фильтрация
    static filter(content, filter) {
  
      //Выбор режима фильтрации
      switch (filter) {
  
        //Выборка на сегодня
        case "Сегодня":{
  
          let start = new Date() - (new Date() % (1000 * 60 * 60 * 24));
          let end = new Date() - (new Date() % (1000 * 60 * 60 * 24)) + (1000 * 60 * 60 * 24);
          let selection = [];
  
          for (let i = 0; i < content.length; i++) {
            if (start <= content[i].date && end > content[i].date) {
              selection.push(content[i]);
            }
          }
  
          return (Task.sortByTime(selection));
        }
  
        //Выборка на завтра
        case "Завтра":{
  
          let start = new Date() - (new Date() % (1000 * 60 * 60 * 24)) + (1000 * 60 * 60 * 24);
          let end = new Date() - (new Date() % (1000 * 60 * 60 * 24)) + 2 * (1000 * 60 * 60 * 24);
          let selection = [];
  
          for (let i = 0; i < content.length; i++) {
            if (start <= content[i].date && end > content[i].date) {
              selection.push(content[i]);
            }
          }
  
          return (Task.sortByTime(selection));
        }
  
        //Выборка на неделю
        case "Неделя":{
  
            let start = new Date() - (new Date() % (1000 * 60 * 60 * 24));
            let end = new Date() - (new Date() % (1000 * 60 * 60 * 24)) + 7 * (1000 * 60 * 60 * 24);
            let selection = [];
  
            for (let i = 0; i < content.length; i++) {
              if (start <= content[i].date && end > content[i].date) {
                selection.push(content[i]);
              }
            }
  
            return (Task.sortByTime(selection));
          }
  
        //Выборка на месяц
        case "Месяц":{
  
            let start = new Date() - (new Date() % (1000 * 60 * 60 * 24));
            let end = new Date() - (new Date() % (1000 * 60 * 60 * 24)) + 30 * (1000 * 60 * 60 * 24);
            let selection = [];
            for (let i = 0; i < content.length; i++) {
              if (start <= content[i].date && end > content[i].date) {
                selection.push(content[i]);
              }
            }
  
            return (Task.sortByTime(selection));
          }
  
        //Сортировка по умолчанию
        default:{ 
          return Task.sortByTime(content);
        }
      }
    }
  }