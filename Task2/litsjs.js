/Changing Border of dropdown menu////
const selectElement = document.querySelector('.select');

selectElement.addEventListener('focus', function() {
    this.classList.add('focused');
});

selectElement.addEventListener('blur', function() {
    this.classList.remove('focused');
});
////**********************************Fetching and displaying task when page loaded(Load Page Function)*****************************/////
async function fetchAndDisplayTasks() {
  console.log('idr');
  try {
    const tasks = await fetchTasks();
    const tableBody = document.querySelector('.table tbody'); 
    tableBody.innerHTML = '';

    tasks.forEach((task, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${task.taskid}</td>
        <td>${task.title}</td>
        <td>${task.addeddate}</td>
        <td>${task.deadline}</td>
        <td>${task.priority}</td>
        <td>${task.taskstatus}</td>
        <td class="btn-container">
          <button class="btn btn-primary edit-btn">Edit</button>
          <button class="btn btn-danger delete-btn">Delete</button>
          <button class="btn btn-success finish-btn">Finished</button>
        </td>
      `;

      const editBtn = row.querySelector('.edit-btn');
      const deleteBtn = row.querySelector('.delete-btn');
      const finishBtn = row.querySelector('.finish-btn');

      editBtn.addEventListener('click', () => {
        const taskindex = index; 
        const tasktoEdit=tasks[index];
        handleEditTask(taskindex,tasktoEdit);
      });

      deleteBtn.addEventListener('click', async() => {
        const tasktoDelete=index;
        await handleDeletetask(tasktoDelete);
      });

      finishBtn.addEventListener('click', async() => {
        const taskindex=index;
        const tasktoEdit=tasks[index];
        await markTaskAsFinished(taskindex,tasktoEdit);

      });
      tableBody.appendChild(row);
    });

    console.log('Fetched and displayed tasks:', tasks);
  } catch (error) {
    console.error('Error fetching and displaying tasks:', error);
  }
}
async function fetchTasks() {
  try {
    const response = await fetch('http://localhost:3000/tasks');
    if (response.ok) {
      const tasks = await response.json();
      return tasks;
    } else {
      console.error('Failed to fetch tasks:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}
////Calling Load Page Function////
document.addEventListener('DOMContentLoaded', async function() {
  console.log('loaded');
  await fetchAndDisplayTasks();
});

///******************************************************Add Task Button Function******************************************************///
    
    addTaskBtn.addEventListener('click', () => {
      taskFormContainer.style.display = 'flex';
      var todaydate = new Date();
      var day = todaydate.getDate();
      var month = todaydate.getMonth() + 1;
      var year = todaydate.getFullYear();
      var datestring = year + '-' + month + '-' + day;
      document.getElementById('addeddate').value=datestring;
    });
    
    cancelTaskBtn.addEventListener('click', () => {
      taskFormContainer.style.display = 'none';
    });
    ///******************************************************Save Task Button Function************************************************///
    saveTaskBtn.addEventListener('click', async() => {
     console.log('Hello');
     var taskId=document.getElementById('taskid').value;
     var taskTitle = document.getElementById('taskTitle').value;
     var addedDate=document.getElementById('addeddate').value;
     var taskDeadline = document.getElementById('deadline').value;
     var taskPriority = document.getElementById('priority').value;
     var taskStatus=document.getElementById('status').value; 
     var taskData = {
      taskid:taskId,
      title: taskTitle,
      addeddate:addedDate,
      deadline: taskDeadline,
      priority: taskPriority,
      taskstatus:taskStatus,
     };
     await addTask(taskData);
     await fetchAndDisplayTasks();
     async function addTask(taskData) {
        try {
          const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: taskData }),
          });
          if (response.ok) {
            console.log('Task added successfully');
          } else {
            console.error('Error adding task:', response.statusText);
          }
        } catch (error) {
          console.error('Error adding task:', error);
        }
      }
      async function fetchAndDisplayTasks() {
        console.log('idr');
        try {
          const tasks = await fetchTasks();
          const tableBody = document.querySelector('.table tbody');
          tableBody.innerHTML = '';
      
          tasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <th scope="row">${index + 1}</th>
              <td>${task.taskid}</td>
              <td>${task.title}</td>
              <td>${task.addeddate}</td>
              <td>${task.deadline}</td>
              <td>${task.priority}</td>
              <td>${task.taskstatus}</td>
              <td class="btn-container">
                <button class="btn btn-primary edit-btn">Edit</button>
                <button class="btn btn-danger delete-btn">Delete</button>
                <button class="btn btn-success finish-btn">Finished</button>
              </td>
            `;
            const editBtn = row.querySelector('.edit-btn');
            const deleteBtn = row.querySelector('.delete-btn');
            const finishBtn = row.querySelector('.finish-btn');

            editBtn.addEventListener('click', () => {
              const taskindex = index; 
              const tasktoEdit=tasks[index];
              handleEditTask(taskindex,tasktoEdit);
            });
      
            deleteBtn.addEventListener('click', async() => {
              const tasktoDelete=index;
              await handleDeletetask(tasktoDelete);
            });
      
            finishBtn.addEventListener('click',async () => {
              const taskindex=index;
              const tasktoEdit=tasks[index];
              await markTaskAsFinished(taskindex,tasktoEdit);
            });
            tableBody.appendChild(row);
          });
      
          console.log('Fetched and displayed tasks:', tasks);
        } catch (error) {
          console.error('Error fetching and displaying tasks:', error);
        }
      }
      async function fetchTasks() {
        try {
          const response = await fetch('http://localhost:3000/tasks');
          if (response.ok) {
            const tasks = await response.json();
            return tasks;
          } else {
            console.error('Failed to fetch tasks:', response.statusText);
            return [];
          }
        } catch (error) {
          console.error('Error fetching tasks:', error);
          return [];
        }
      }
      taskFormContainer.style.display = 'none';
    });

////*************************************************************Update task functions*************************************************////
function handleEditTask(taskindex,task) {
  console.log('Index is '+task);
   document.getElementById('taskid2').value = task.taskid;
   document.getElementById('taskTitle2').value = task.title;
   document.getElementById('deadline2').value = task.deadline;
   document.getElementById('priority2').value = task.priority;
   document.getElementById('status2').value = task.taskstatus;
   document.getElementById('addeddate2').value = task.addeddate;
  
   // Show the popup
   taskFormContainer2.style.display = 'flex';
   cancel2TaskBtn.addEventListener('click', () => {
    taskFormContainer2.style.display = 'none';
  });
   updateTaskBtn.addEventListener('click',() => {
    updateTask(taskindex);
});

  async function updateTask(taskindex) {
    var taskId=document.getElementById('taskid2').value;
     var taskTitle = document.getElementById('taskTitle2').value;
     var addedDate=document.getElementById('addeddate2').value;
     var taskDeadline = document.getElementById('deadline2').value;
     var taskPriority = document.getElementById('priority2').value;
     var taskStatus=document.getElementById('status2').value;
    const updatedTaskData = {
      taskid:taskId,
      title: taskTitle,
      addeddate:addedDate,
      deadline: taskDeadline,
      priority: taskPriority,
      taskstatus: taskStatus,
    };
    console.log('Here we go '+task.taskid);
    console.log(updatedTaskData);
    console.log(taskId);
    ////Calling Update Task function////
    await updateTaskfunction(taskindex,updatedTaskData);
  }
  
}

/////*************************************************************Delete tasks*********************************************************////
async function handleDeletetask(taskIndex) {
  console.log('deleted index is '+taskIndex);
  try {
    const response = await fetch(`http://localhost:3000/tasks/${taskIndex}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Task deleted successfully on the backend');

      // Get the table body and delete the row by its index
      await fetchAndDisplayTasks();
    } else {
      console.error('Error deleting task on the backend:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}
///*******************************************************UpdateTaskFunction function**************************************************////
async function updateTaskfunction(taskindex,updatedTaskData) {
  try {
    console.log('jalwa');
    const response = await fetch(`http://localhost:3000/tasks/${taskindex}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedTask: updatedTaskData }),
    });

    if (response.ok) {
      console.log('Task updated successfully on the backend');
      await fetchAndDisplayTasks();
      taskFormContainer2.style.display = 'none';
    } else {
      const errorText = await response.text(); 
      console.error('Error updating task on the backend:', response.status, errorText);
    }
  } catch (error) {
    console.error('Error updating task:', error);
  }
}
/////*****************************************************Status field change fucntion***********************************************/////
async function markTaskAsFinished(taskindex,task) {
  const updatedTaskData = {
    taskid:task.taskid,
    title:task.title,
    addeddate:task.addeddate,
    deadline:task.deadline,
    priority:task.priority,
    taskstatus: 'Completed',
  };

  try {
    const response = await fetch(`http://localhost:3000/tasks/${taskindex}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedTask: updatedTaskData }),
    });

    if (response.ok) {
      console.log('Task marked as finished successfully on the backend');
      await fetchAndDisplayTasks();
    } else {
      const errorText = await response.text(); 
      console.error('Error marking task as finished on the backend:', response.status, errorText);
    }
  } catch (error) {
    console.error('Error marking task as finished:', error);
  }
}

 ////*******************************************************Search Input Function*****************************************************////
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', () => {
  const searchQuery = searchInput.value.trim().toLowerCase();
  filterTasksbysearch(searchQuery); 
});
// Function to filter tasks based on search query
function filterTasksbysearch(searchQuery) {
  const rows = document.querySelectorAll('.table tbody tr'); 

  rows.forEach(row => {
    const taskTitle = row.querySelector('td:nth-child(3)').innerText.toLowerCase(); 
    if (taskTitle.includes(searchQuery)) {
      row.style.display = 'table-row'; 
    } else {
      row.style.display = 'none'; 
    }
  });
}

/////

const filterSelect = document.getElementById('filter1');

// Add event listener for change events on the select element
filterSelect.addEventListener('change', () => {
  const selectedFilter = filterSelect.value;
  console.log(selectedFilter);
  filterTasks(selectedFilter); // Call the filterTasks function with the selected filter
});

// Function to filter tasks based on selected filter
function filterTasks(selectedFilter) {
  const rows = document.querySelectorAll('.table tbody tr'); // Select all task rows

  rows.forEach(row => {
    const taskStatus = row.querySelector('td:nth-child(7)').innerText.toLowerCase(); // Assuming task status is in the seventh column

    if (selectedFilter === 'all' || taskStatus === selectedFilter.toLowerCase()) {
      row.style.display = 'table-row'; // Show the row if it matches the selected filter or if the filter is 'All'
    } else {
      row.style.display = 'none'; // Hide the row if it does not match the selected filter
    }
  });
}

// The rest of your existing code...






