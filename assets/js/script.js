var butElement  = document.querySelector("#save-task");
var listElement = document.querySelector("#tasks-to-do");

var handleTask = function () {
    listItemElement = document.createElement("li");
    listItemElement.className = "task-item";
    listItemElement.textContent = "This is a new task!";
    listElement.appendChild(listItemElement);
}

butElement.addEventListener("click", handleTask);