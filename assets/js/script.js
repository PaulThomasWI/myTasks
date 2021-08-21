var formElement  = document.querySelector("#task-form");
var listElement = document.querySelector("#tasks-to-do");

var taskHandler = function (event) {
    event.preventDefault();

    var taskNameInput  = document.querySelector("input[name='task-name']").value;
    var taskTypeSelect = document.querySelector("select[name='task-type']").value;

    var taskDataObj = {
        name: taskNameInput
        , type: taskTypeSelect
    }

    createTaskElement(taskDataObj);
}

var createTaskElement = function(taskDataObj) {
    listItemElement = document.createElement("li");
    listItemElement.className = "task-item";

    var divElement = document.createElement("div");
    divElement.className = "task-info";
    divElement.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemElement.appendChild(divElement);
    listElement.appendChild(listItemElement);
}

formElement.addEventListener("submit", taskHandler);