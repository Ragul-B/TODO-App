function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
    var taskText = taskInput.value;

    if (taskText.trim() !== "") {
        var li = document.createElement("li");
        var timestampStart = document.createElement("span");
        timestampStart.className = "timestamp";
        timestampStart.textContent = "Started at: " + getFormattedDate();
        var task = document.createElement("span");
        task.className = "task";
        task.textContent = taskText;
        li.appendChild(task);
        li.appendChild(timestampStart);
        var deleteButton = document.createElement("span");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.className = "delete";
        deleteButton.onclick = function () {
            li.remove();
        };
        li.appendChild(deleteButton);
        var completedButton = document.createElement("span");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.className = "completed-button";
        completedButton.onclick = function () {
            li.classList.toggle('completed');
            if (li.classList.contains('completed')) {
                showCompletedMessage(taskText);
                recordCompletionTime(li);
                moveToCompletedList(li);
                li.remove(); // Remove the completed task from the main task list
            }
        };
        li.appendChild(completedButton);
        taskList.appendChild(li);
        taskInput.value = "";
    } else {
        alert("Please enter a task!");
    }
}

function getFormattedDate() {
    var date = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return date.toLocaleDateString('en-US', options);
}

function showCompletedMessage(taskText) {
    var completedMsg = document.getElementById("completedMsg");
    completedMsg.textContent = "Task '" + taskText + "' completed.";
    completedMsg.classList.add("show");
    setTimeout(function () {
        completedMsg.classList.remove("show");
    }, 3000); // Hide message after 3 seconds
}

function recordCompletionTime(li) {
    var timestamp = li.querySelector('.timestamp');
    timestamp.textContent += " - Completed at: " + getFormattedDate();
}

function moveToCompletedList(li) {
    var completedTasks = document.getElementById("completedTasks");
    var taskText = li.querySelector('.task').textContent;
    var completionTime = li.querySelector('.timestamp').textContent;
    var completedLi = document.createElement('li');
    completedLi.textContent = taskText + " ( " + completionTime + ")";
    completedTasks.appendChild(completedLi);
}

function toggleCompleted() {
    var completedTasks = document.getElementById("completedTasks");
    completedTasks.classList.toggle("show-completed");
}
