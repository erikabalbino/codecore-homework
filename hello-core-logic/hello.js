
// Mimic Trello Features

const hello = {
    'Tester Board': {
      'To Do': ['Laundry', 'Buy Apples', 'Pay Phone Bill'],
      'Doing': ['Laundry', 'Studying Javascript', 'Studying HTML', 'Studying Ruby'],
      'Done': ['Laundry']
    },
    'Dreams': {
      'Wish List': ['Conquer the Seven Kingdoms', 'Get my baby back', 'My hand needs to chill'],
    }//,
};

// Going through the Object "hello"
// and returns a string with all keys listed

function listBoards(){
  let str = "";
  let counter = 1;
  for (let key of Object.keys(hello)) {

    str = str + "------------------\n";
    str = str + `${counter}- ${key} \n`;
    counter += 1;
  }
  str = str + "------------------\n";
 return str;
}

function createBoard(boardName) {
  if (!hello[boardName]) {
      hello[boardName] = {};
      return `Board "${boardName}" was created`;
    }
    else {
      return `Board "${boardName}" already exists`;
    }
}

function removeboard(boardName) {
  if (!hello[boardName]) {
      // hello[boardName] = {};
      return `Board "${boardName}" doesn't exist`;
    }
    else {
      delete hello[boardName];
      return `Board "${boardName}" was removed`;
    }
}

function displayBoard(boardName){
  if (!hello[boardName]) {
    return `Board "${boardName}" doesn't exist`;
  }
  else {
    let str = "------------------";

    for (let listName in hello[boardName]) {
      str += `\n ${listName} \n------------------`;

        for (let listItem of hello[boardName][listName]){
          str += `\n > ${listItem}`;
        }
       str += "\n------------------";
      }
       return str;
    }
}

function createList(boardName, listName) {
  if (!hello[boardName]) {
    return `Board "${boardName}" doesn't exist`;
  }
  else if (!hello[boardName][listName]){
      hello[boardName][listName] = [];
      // console.log(hello[boardName][listName]);
      return `List "${listName}" was created`;
  }
  else {
      return `List "${listName}" already exists`;
  }
}

function createCard(boardName, listName, cardName) {
  if (!hello[boardName]) {
    return `Board "${boardName}" doesn't exist`;
  }
  else if (!hello[boardName][listName]){
    return `List "${listName}" doesn't exist`;
  }
  else {
      hello[boardName][listName].push(cardName);
      return `Card "${cardName}" was created`;
  }
}

function removeList(boardName, listName) {
  if (!hello[boardName]) {
      return `Board "${boardName}" does't exist`;
    }
    else if (!hello[boardName][listName]) {
      // console.log("list doesn't exist");
      return `List "${ListName}" doesn't exist`;
    }
    else {
      delete hello[boardName][listName];
      return `List "${listName}" was removed`;
    }
}

function removeCard(boardName, listName, cardName) {
  if (!hello[boardName]) {
      return `Board "${boardName}" doesn't exist`;
    }
    else if (!hello[boardName][listName]) {
      return `List "${listName}" doesn't exist`;
    }
    else if ( !hello[boardName][listName].includes(cardName)){
      return `Card "${cardName}" doesn't exist`;
    }
    else if (!hello[boardName][listName][cardName]){
      let index = hello[boardName][listName].indexOf(cardName);
      hello[boardName][listName].splice(index,1);
      return `Card "${cardName}" was removed`;
    }
}

function moveCard(boardName, fromlistName, tolistName, fromCardIndex, toCardIndex) {
  if (!hello[boardName]) {
      return `Board "${boardName}" doesn't exist`;
    }
    else if ((!hello[boardName][fromlistName]) || (!hello[boardName][tolistName])) {
      return `List "${fromlistName}" or "${tolistName}" doesn't exist`;
    }
    else if (typeof hello[boardName][fromlistName][fromCardIndex] === "undefined"){
      return `Card on Index position "${fromCardIndex}" doesn't exist`;
    }
    else {
      hello[boardName][tolistName].splice(toCardIndex,0,hello[boardName][fromlistName][fromCardIndex]);
      hello[boardName][fromlistName].splice(fromCardIndex,1);
      return `Card on index position "${fromCardIndex}" was moved`;
    }
}

console.log(moveCard("Tester Board", "To Do", "Done", 2, 0 ));
console.log(displayBoard("Tester Board"));
console.log(hello['Tester Board']);
