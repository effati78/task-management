const addElement = document.getElementById("addElement"),
  containerElements = document.getElementById("containerElements"),
  newElement_content = `<li class="element p-1 my-2 rounded d-flex align-items-center justify-content-around">
                    <input type="text" autofocus class="content border-0 px-2 w-75" />
                    <button class="newElement btn btn-sm btn-success px-4 font-weight-bold">ثبت</button>
                </li>`;

var newElement = null,
  btnsDelete = null,
  tasks = new Array(),
  val_1,
  val_2,
  indexTemp;

const showTasks = (clear) => {
  tasks = localStorage.getItem("tasks");

  if (tasks == null) return 0;
  if (clear) containerElements.innerHTML = null;

  tasks = tasks.split(",");
  tasks.map((x) => {
    const element = `<li class="newItem p-1 my-2 rounded d-flex align-items-center justify-content-around">
      <input type="text" class="content border-0 px-2 w-75" value="${x}" />
      <button class="doneTask btn btn-sm btn-success d-inline-flex p-2 align-items-center justify-content-center"><i class="fas fa-check"></i></button>
      <button class="deleteElement btn btn-sm btn-danger d-inline-flex p-2 align-items-center justify-content-center"><i class="fas fa-trash-alt"></i></button>
  </li>`;
    containerElements.innerHTML += element;
  });

  btnsDelete = document.getElementsByClassName("deleteElement");
  inputs = document.getElementsByClassName("content");
  doneTask = document.getElementsByClassName("doneTask");

  for (let i = 0; i < btnsDelete.length; i++) {
    btnsDelete[i].addEventListener("click", handleDeleteElement);
    inputs[i].addEventListener("focus", focusMode);
    inputs[i].addEventListener("blur", blurMode);
    doneTask[i].addEventListener("click", handleDoneTask);
  }
};

const handleAddElement = () => {
  containerElements.innerHTML += newElement_content;
  newElement = document.querySelector(".newElement");
  newElement.addEventListener("click", handleElementRegistration);
};

const handleDoneTask = (e) => {
  let btnDone = e.target;
  let item = btnDone.parentElement;
  item.classList.toggle("done");
};

const handleDeleteElement = (e) => {
  let BtnDelete = e.target;
  let item = BtnDelete.parentElement;
  let content = item.childNodes[1].value;
  let index = tasks.indexOf(content);
  tasks.splice(index, 1);
  localStorage.setItem("tasks", tasks);
  showTasks(true);
};

const handleUpdateElement = () => {
  if (val_1 != val_2) tasks[indexTemp] = val_2;
  localStorage.setItem("tasks", tasks);
};

const handleElementRegistration = (e) => {
  let BtnRegister = e.target;
  let item = BtnRegister.parentElement;
  let className = item.classList[0];
  let content = document.querySelector(`.${className}>input[type=text]`).value;

  if (tasks == null) tasks = [`${content}`];
  else tasks.push(content);

  localStorage.setItem("tasks", tasks);
  showTasks(true);
};

const focusMode = (e) => {
  let input = e.target;
  val_1 = input.value;
  console.log(val_1);
  indexTemp = tasks.indexOf(val_1);
};

const blurMode = (e) => {
  let input = e.target;
  val_2 = input.value;
  console.log(val_2);

  handleUpdateElement();
};

window.addEventListener("load", showTasks);
addElement.addEventListener("click", handleAddElement);
