const addElement = document.getElementById('addElement'),
  containerElements = document.getElementById('containerElements'),
  newElement_content = `<li class="element p-1 my-2 rounded d-flex align-items-center justify-content-between">
                    <input type="text" autofocus placeholder="کارخود را اینجا بنویسید." class="w-100 content border-0 px-2 w-75" />
                    <button class="newElement btn btn-sm btn-success px-4 font-weight-bold">ثبت</button>
                </li>`

var newElement = null,
  btnsDelete = null,
  tasks = new Array(),
  val_1,
  val_2,
  indexTemp

const showTasks = clear => {
  tasks = localStorage.getItem('tasks')

  if (tasks == null) return 0
  if (clear) containerElements.innerHTML = null

  tasks = tasks.split(',')
  tasks.map(x => {
    if (x !== null && x !== '') {
      const element = `<li class="newItem p-1 my-2 rounded d-flex align-items-center justify-content-between">
        <input type="text" class="content border-0 px-2 w-75" value="${x}" />
        <!-- <button class="doneTask btn btn-sm btn-success d-inline-flex p-2 align-items-center justify-content-center"><i class="fas fa-check"></i></button> --></i>
        <button class="deleteElement btn btn-sm btn-danger d-inline-flex p-2 align-items-center justify-content-center"><i class="fas fa-trash-alt"></i></button>
      </li>`

      containerElements.innerHTML += element
    }
  })

  btnsDelete = document.getElementsByClassName('deleteElement')
  inputs = document.getElementsByClassName('content')
  doneTask = document.getElementsByClassName('doneTask')

  for (let i = 0; i < btnsDelete.length; i++) {
    btnsDelete[i].addEventListener('click', handleDeleteElement)
    inputs[i].addEventListener('focus', focusMode)
    inputs[i].addEventListener('blur', blurMode)
    // doneTask[i].addEventListener('click', handleDoneTask)
  }
}

const handleAddElement = () => {
  containerElements.innerHTML += newElement_content
  newElement = document.querySelector('.newElement')
  newElement.previousSibling.previousSibling.focus()
  newElement.addEventListener('click', event => {
    event.preventDefault()
    handleElementRegistration(newElement)
  })
  newElement.previousSibling.previousSibling.addEventListener(
    'keyup',
    event => {
      if (event.keyCode === 13) handleElementRegistration(newElement)
    }
  )
}

const handleDoneTask = e => {
  let btnDone = e.target
  let item = btnDone.parentElement
  item.classList.toggle('done')
}

const handleDeleteElement = e => {
  let BtnDelete = e.target
  let item = BtnDelete.parentElement
  let content = item.childNodes[1].value

  swal({
    text: `جونِ دل، آیا میخوای "${content}" رو حذف کنی؟`,
    icon: 'error',
    buttons: {
      cancel: 'بزار باشه',
      catch: {
        text: 'نابودش کن',
        value: 'delete'
      }
    },
    dangerMode: true
  }).then(value => {
    if (value === 'delete') {
      let index = tasks.indexOf(content)

      tasks.splice(index, 1)
      localStorage.setItem('tasks', tasks)
      showTasks(true)

      Toastify({
        text: `تبریک! "${content}" باموفقیت حذف شد`,
        duration: 5000,
        close: false,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
        stopOnFocus: true
      }).showToast()
    }
  })
}

const handleUpdateElement = () => {
  if (val_1 != val_2) tasks[indexTemp] = val_2
  localStorage.setItem('tasks', tasks)

  Toastify({
    text: `تبریک! "${val_2}" با موفقیت به روزرسانی شد`,
    duration: 5000,
    close: false,
    gravity: 'top',
    position: 'right',
    backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
    stopOnFocus: true
  }).showToast()
}

const handleElementRegistration = BtnRegister => {
  // let BtnRegister = e.target
  let item = BtnRegister.parentElement
  let className = item.classList[0]
  let content = document.querySelector(`.${className}>input[type=text]`).value

  if (content == null || content == '')
    Toastify({
      text: 'نکنه عاشقی! فیلد کار نمیتونه خالی باشه',
      duration: 5000,
      close: false,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #DB3445, #F71735)',
      stopOnFocus: true
    }).showToast()
  else {
    if (tasks == null) tasks = [`${content}`]
    else tasks.push(content)

    localStorage.setItem('tasks', tasks)
    showTasks(true)

    Toastify({
      text: 'تبریک! کار جدید با موفقیت ثبت شد',
      duration: 5000,
      close: false,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
      stopOnFocus: true
    }).showToast()
  }
}

const focusMode = e => {
  let input = e.target
  val_1 = input.value
  indexTemp = tasks.indexOf(val_1)
}

const blurMode = e => {
  let input = e.target
  val_2 = input.value

  handleUpdateElement()
}

function doc_keyUp(e) {
  var e = e || window.event
  console.log(e);
  if ((e.altKey && e.key === 'n') || (e.altKey && e.key === 'د')) {
    handleAddElement()
  }
}

document.addEventListener('keyup', doc_keyUp, false)
window.addEventListener('load', showTasks)
addElement.addEventListener('click', handleAddElement)
