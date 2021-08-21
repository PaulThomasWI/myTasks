var taskIdCounter = 0;
var formElement = document.querySelector("#task-form");
var listElement = document.querySelector("#tasks-to-do");

var taskHandler = function (event) {
    event.preventDefault();

    var taskNameInput  = document.querySelector("input[name='task-name']").value;
    var taskTypeSelect = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeSelect) {
        alert("You need to fill out the task form goofball!");
        return false;
    }

    formElement.reset();
    
    var taskDataObj = {
        name: taskNameInput
        , type: taskTypeSelect
    }

    createTaskElement(taskDataObj);
}

var createTaskElement = function(taskDataObj) {
    listItemElement = document.createElement("li");
    listItemElement.className = "task-item";

    listItemElement.setAttribute("data-task-id", taskIdCounter);

    var divElement = document.createElement("div");
    divElement.className = "task-info";
    divElement.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemElement.appendChild(taskActionsEl);

    listItemElement.appendChild(divElement);
    listElement.appendChild(listItemElement);

    taskIdCounter++;
}

var createTaskActions = function(taskId) {
    var actionContainerElement = document.createElement("div");
    actionContainerElement.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className   = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerElement.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className   = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerElement.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerElement.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Complete"];
    for (index = 0; index < statusChoices.length; index++) {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[index];
        statusOptionEl.setAttribute("value", statusChoices[index]);

        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerElement;
}

formElement.addEventListener("submit", taskHandler);