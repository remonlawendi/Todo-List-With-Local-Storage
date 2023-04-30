  // Select All The The Doc elements in the page
  let inputTodo = document.querySelector('.task-todo');
  let addTask = document.querySelector('.add');
  let task = document.querySelector('.tasks');
  
  
  // Create an Embty Array to store tasks init
  let arrayOfTasks = []


  // check of local storage data
  if(localStorage.getItem('tasks')){
    arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
   }

  // Event Listener To Delete
  task.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
      e.target.parentElement.remove();
      deleteTask(e.target.parentElement.getAttribute('data-id'));
    }
  })

  // Add Event Listener To Add Task Button
  addTask.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputTodo.value) {
      addTasks(inputTodo.value);
      inputTodo.value = ""
    }
  })
  
  // Function To Add Task To An array
  function addTasks(taskText){
    const task = {
      id : Date.now(),
      title : taskText,
      done : false
    }
    // Push task To An Array 
    arrayOfTasks.push(task);
    // add task to An Array 
    addTasksToPage(arrayOfTasks);
    // add task to Local Storage 
    toLocalStorage(arrayOfTasks);
  }

  // function To Add Tasks To Dom
  function addTasksToPage(arraytasks){
    task.innerHTML = "";
    arraytasks.forEach(taskEle => {
      // gives the task div id
    

      // create the task list div
      let taskList = document.createElement('div');
      taskList.setAttribute('class', 'task-list');
      taskList.setAttribute('data-id', taskEle.id);
      // create the task div input
      let taskinput = document.createElement('input');
      taskinput.setAttribute('type', 'text');
      taskinput.classList = 'task';
      if(taskEle.done){
        taskinput.classList.add('done');
      }
      taskinput.setAttribute('readonly', true);   
      taskinput.appendChild(document.createTextNode(taskEle.title));
    
      // create The Edit Btn 
      let editBtn = document.createElement('button');
      editBtn.setAttribute('class', 'edit');
      editBtn.appendChild(document.createTextNode('Edit'));
      
      // create The Del And Edit Btn 
      let delBtn = document.createElement('button');
      delBtn.setAttribute('class', 'delete');
      delBtn.appendChild(document.createTextNode('Delete'));
      
      // append input and btns to task list div
      taskList.appendChild(taskinput);
      taskList.appendChild(editBtn);
      taskList.appendChild(delBtn);
      
      // append All To Task Page
      task.appendChild(taskList);
    });
  }

  // Function To Add Tasks To Local Storage
  function toLocalStorage(arraytasks){
    window.localStorage.setItem('tasks', JSON.stringify(arraytasks));
  }

  // get Data from local Storage and put it to page 
  function getFromLocalStorage(){
    let data = window.localStorage.getItem('tasks');
    if(data){
      let tasks = JSON.parse(data)
      addTasksToPage(tasks)
    }
  }

  // Trigger get Data from local Storage
  getFromLocalStorage()

  function deleteTask(taskid ){
    // for(let ele of arrayOfTasks){
    //     console.log(`${ele.id} === ${taskid}`);
    //   }
      arrayOfTasks = arrayOfTasks.filter(ele => ele.id != taskid);
      toLocalStorage(arrayOfTasks)
  }
  
