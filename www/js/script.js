
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

var getURL = '/getTasks';
var taskList = document.querySelector('#taskList');
fetch(getURL)
    .then(res => res.json())
    .then((data) =>{
        var datafeed = data.map((task) =>{
          if(task.completed == false){
            return `
            <div class="col s4">
                <div class="card red darken-1">
                    <div class="card-content white-text">
                      <span class="card-title">${task.title}</span>
                      <p>${task.body}</p>
                      <!--<p>${task._id}</p>-->
                    </div>
                    <div class="card-action right-align">
                      <a href="/completeTask/${task._id}"><i class="material-icons">check</i></a>
                      <a href="/deleteTask/${task._id}"><i class="material-icons">delete_forever</i></a>
                    </div>
                  </div>
            </div>
            `
          } else {
            return `
            <div class="col s4">
                <div class="card green darken-1">
                    <div class="card-content white-text">
                      <span class="card-title">${task.title}</span>
                      <p>${task.body}</p>
                      <!--<p>${task._id}</p>-->
                    </div>
                    <div class="card-action right-align">
                      <a href="/deleteTask/${task._id}"><i class="material-icons">delete_forever</i></a>
                    </div>
                  </div>
            </div>
            `
          }
          
        }).join('');
        taskList.innerHTML = datafeed;
    })