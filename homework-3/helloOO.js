
class Task {
  constructor (name, assignee) {
    this.name = name;
    this.assignee = assignee;
  }
  // Meethod to format the task with name and assignee, if exist
  render() {
    if (this.assignee) return `${this.name} ● ${this.assignee}`;
      else return this.name;
  }
}

class List {
  constructor (title, tasks) {
    this.title = title;
    this.tasks = []
  }

  // Method to add tasks on a List
  addTask (task){
    this.tasks.push(task)
    return this;
  }

  // Method to remove specific task from the list and return the task removed
  // In case of this specific task does not exist on the List, return null
  removeTask (nameToBeRemoved){
    for (let taskInList of this.tasks){
      if (nameToBeRemoved === taskInList.name) {
        let index = this.tasks.indexOf(taskInList);
        return this.tasks.splice(index,1)[0];
      }
    }
    return null
  }

  // Meethod to format the List with their tasks
  render() {
    let result = "";
    result = result + `|---------\n| ${this.title}\n|---------\n`
    for (let taskInList of this.tasks) {
      let index = this.tasks.indexOf(taskInList);
        if (this.tasks[index].assignee) {
          result = result + `| ${index}> ${this.tasks[index].name} ● ${this.tasks[index].assignee}\n`
        } else {
          result = result + `| ${index}> ${this.tasks[index].name}\n`
        }
    }
    return result;
  }
}

class Board {
  constructor (name, lists) {
    this.name = name;
    this.lists = []
  }

  // Method to add lists on the Board
  addList (list){
    this.lists.push(list)
    return this;
  }

  // Method to remove specific list from the board and return the list removed
  // In case of this specific list does not exist on the Board, return null
  removeList (titleToBeRemoved){
    for (let listInBoard of this.lists){
      if (titleToBeRemoved === listInBoard.title) {
        let index = this.lists.indexOf(listInBoard);
        return this.lists.splice(index,1)[0];
      }
    }
    return null
  }

  // Meethod to format the Board with their lists and tasks
  render() {
    let result = "";
    result = result + `************\n* ${this.name} *\n************\n`
    for (let listInBoard of this.lists) {
      // Call render method from List Class to format the lists and their tasks
      result += listInBoard.render() + '| \n'
    }
    return result;
  }

  // Method to move task from one List to another List
  moveTaskTo (taskName, fromListName, toListName){
    let removedTask = null;
    let fromList = undefined;
    let toList = undefined;

    //Checking if both lists, From and To, exists
    for (let list of this.lists){
      if (fromListName === list.title) {
        fromList = list
      }
      if (toListName === list.title) {
        toList = list
      }
    }

    // In case of both lists exists, check if Task exist (from removeTask method),
    // and then remove this task from one list and add to another list
    // In case of some List doesn't exist, return the name
    if (fromList !== undefined && toList !== undefined) {
      removedTask = fromList.removeTask(taskName);
      if (removedTask){
        toList.addTask(removedTask);
      } else {
        return `Task "${taskName}" does not exist!`;
      }
    } else {
      if (fromList === undefined) {
          return `From List "${fromListName}" does not exist!`;
      } else if (toList === undefined) {
        return `To List "${toListName}" does not exist!`;
      }
    }
  }
}

let toDoList = new List('To Do')
toDoList
  .addTask(new Task('Laundry', 'You'))
  .addTask(new Task('Buy Apples'))
  .addTask(new Task('Pay Phone Bill', 'Me'));

let doingList = new List('Doing')
doingList
  .addTask(new Task('Laundry'))
  .addTask(new Task('Study JavaScript', 'Jill'))
  .addTask(new Task('Study HTML', 'Jill'))
  .addTask(new Task('Study Ruby', 'Me'));

let doneList = new List('Done')
doneList
  .addTask(new Task('Laundry'))
  .addTask(new Task('Ruby Exercises Homework'));

let myBoard = new Board('My Board')
myBoard
  .addList(toDoList)
  .addList(doingList)
  .addList(doneList);

// Using the same myBoard declared above
console.log(myBoard.moveTaskTo('Laundry', 'To Do', 'Doing'));
console.log(myBoard.moveTaskTo('Study JavaScript', 'Doing', 'To Do'));
console.log(myBoard.moveTaskTo('Buy Apples', 'To Do', 'Done'));

// After moving tasks, ... return the board formated
console.log(myBoard.render())
