var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var deleteButton = document.createElement("button");
/* Use event delegation by setting the event handler on the parent, and checking who is the actual target in the handler.
 This has two advantages:

    1. You can add/remove list items without the need to attach event handlers to the added item.
    2. You can easily combine the delete and line through functionalities in a single simple handler.

 The event handler is added to the list (ul).
  Whenever the list or its children are click, the handler checks if the target is/inside a list item use Element.closest().
  - If no list item is found in the chain, the function terminates (return). 
  - If a list item is found (target), we check if the actual click target was the delete button. 
  - If it's the delete button the target is removed. If not, the the done class is added.
  #############################################################
  ##Pay attention that this solution using Element.closest().##
  ## This feature is not supported by old browsers           ##
  ##[you can find more info in http://caniuse.com]           ##
  #############################################################
 */

 //casting ul to Array type, adding button delete to all of it's elements
Array.from(ul.children).forEach(function(item) {
  appendDeleteBtnTo(item);
})

// appending a delete button to an element. every li get a button element as a child.
function appendDeleteBtnTo(element) {
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.classList.add("delete");
  element.appendChild(deleteButton);
}

//return the legnth of the user input.
function inputLength() {
  return input.value.length;
}

//creates a li (list) element with the user input as a new child of ul (unordered list)
function createListElement() {
  var li = document.createElement("li"); //define general li element to the var li.
  var userText = document.createTextNode(input.value)//creates a TextNode with the user input and storing it into the var userText
  li.appendChild(userText); //append the user input text into the created general list item as a child.
  ul.appendChild(li); //append the created li to ul as a child.
  input.value = ""; //reset user input to nothing.
  appendDeleteBtnTo(li); //append a delete button the the new li as a child of li.
}

// if there is an input of user-> creating a new li element with assosiated button 
function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}
//if there is an input of user and the user pressed on Enter keyboard key-> creating a new li element with assosiated button 
function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    createListElement();
  }
}
// The event handler is added to the list (ul).
//   Whenever the list or its children are click, the handler checks if the target is/inside a list item use Element.closest().
//   - If no list item is found in the chain, the function terminates (return). 
//   - If a list item is found (target), we check if the actual click target was the delete button. 
//   - If it's the delete button the target is removed. If not, the the done class is added.
function listItemClickHandler(e) {
  const isLi = e.target.closest('li'); //checks if the user clickes on li element or not and store the answer into isLi variable.
  
  if(!isLi) return; //If no list item is found in the chain, the function terminates (return). 
  
  if (e.target.matches('.delete')) {//If it's the delete button the li(target) is removed. If not, the the done class is added.
    isLi.remove();
  } else {
    isLi.classList.toggle('done');//If a list item is found (target)and the actual click target was not delete button->toggle done. 
  }    
}
/* all the event (such as mouse click or keyboard key press)information such as the clicked element (e.target), 
   stored into background parameter such as e 
   and move to the function listItemClickHandler
*/
ul.addEventListener("click", listItemClickHandler); //waiting for user click on ul or its li childs.
button.addEventListener("click", addListAfterClick); //waiting for user click on the addong Enter button
input.addEventListener("keypress", addListAfterKeypress); //waiting for user to fill in the input feild and press Enter on keyboard