var formElement  = document.querySelector("#task-form");
var listElement = document.querySelector("#tasks-to-do");

var handleTask = function (event) {
    event.preventDefault();

    console.log("Entered handleTask");

    listItemElement = document.createElement("li");
    listItemElement.className = "task-item";
    listItemElement.textContent = "This is a new task!";
    listElement.appendChild(listItemElement);
}

formElement.addEventListener("submit", handleTask);