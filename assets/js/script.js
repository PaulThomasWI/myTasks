var taskIdCounter = 0;
var aryTasks = [];

var formElement            = document.querySelector("#task-form");
var listElement            = document.querySelector("#tasks-to-do");
var pageContentElement     = document.querySelector("#page-content");
var tasksInProgressElement = document.querySelector("#tasks-in-progress");
var tasksCompleteElement   = document.querySelector("#tasks-completed");

var taskHandler = function (event) {
    event.preventDefault();

    var taskNameInput  = document.querySelector("input[name='task-name']").value;
    var taskTypeSelect = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeSelect) {
        alert("You need to fill out the task form goofball!");
        return false;
    }

    formElement.reset();
    
    var isEdit = formElement.hasAttribute("data-task-id");

    if (isEdit) {
        var taskId = formElement.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeSelect, taskId);
    } else {
        var taskDataObj = {
            name: taskNameInput
            , type: taskTypeSelect
            , status: "to do"
        }

        createTaskElement(taskDataObj);        
    }
}

var completeEditTask = function(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    for (index = 0; index < aryTasks.length; index++) {
        if (aryTasks[index].id === parseInt(taskId)) {
            aryTasks[index].name = taskName;
            aryTasks[index].type = taskType;
        }
    }

    formElement.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
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

    taskDataObj.id = taskIdCounter;
    aryTasks.push(taskDataObj);

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

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (index = 0; index < statusChoices.length; index++) {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[index];
        statusOptionEl.setAttribute("value", statusChoices[index]);

        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerElement;
}

var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value  = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formElement.setAttribute("data-task-id", taskId);
}

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    document.querySelector("#save-task").textContent = "Add Task";
    formElement.reset();    

    var aryUpdateTasks = [];

    for (index = 0; index < aryTasks.length; index++) {
        if (aryTasks[index].id !== parseInt(taskId)) {
            aryUpdateTasks.push(aryTasks[index]);
        }
    }

    aryTasks = aryUpdateTasks;
}

var taskButtonHandler = function(event) {
    var targetElement = event.target;

    if (targetElement.matches(".edit-btn")) {
        var taskId = targetElement.getAttribute("data-task-id");
        editTask(taskId);
    } else if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}

var taskStatusChangeHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");
    var statusValue = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        listElement.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressElement.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompleteElement.appendChild(taskSelected);
    }

    for (index = 0; index < aryTasks.length; index++) {
        if (aryTasks[index].id === parseInt(taskId)) {
            aryTasks[index].status = statusValue;
        }
    }
}

formElement.addEventListener("submit", taskHandler);
pageContentElement.addEventListener("click", taskButtonHandler);
pageContentElement.addEventListener("change", taskStatusChangeHandler);