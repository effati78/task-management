const addElement = document.getElementById('addElement'),
  containerElements = document.getElementById('containerElements'),
  newElement_content = `<li class="animate__animated animate__bounceIn element p-1 my-2 rounded d-flex align-items-center justify-content-between">
                    <input type="text" placeholder="کار خودت رو اینجا وارد کن" class="w-100 content border-0 px-2 w-75" />
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
        <input type="text" class="content test border-0 px-2 w-100" value="${x}" />
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
  let UlContent = containerElements.innerHTML
  if (UlContent.search('element') != -1) {
    Toastify({
      text: 'آخه جوجه! اول همین فیلد کار رو پر کن بعد برو سراغ یکی دیگه :/',
      duration: 5000,
      close: false,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #DB3445, #F71735)',
      stopOnFocus: true
    }).showToast()

    return 0
  }
  containerElements.innerHTML += newElement_content
  newElement = document.querySelector('.newElement')

  newElement.previousSibling.previousSibling.focus()
  newElement.parentElement.classList.add('box-control-add')

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
  var BtnDelete = null

  if (e.target.tagName == 'BUTTON') BtnDelete = e.target
  else if (e.target.tagName == 'path')
    BtnDelete = e.target.parentElement.parentElement

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

      item.classList.add('animate__animated')
      item.classList.add('animate__bounceOut')

      setTimeout(() => {
        tasks.splice(index, 1)
        localStorage.setItem('tasks', tasks)
        showTasks(true)
      }, 1000)

      Toastify({
        text: `آفرین گل کاشتی! "${content}" با موفقیت حذف شد`,
        duration: 5000,
        close: false,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
        stopOnFocus: true
      }).showToast()

      setTimeout(() => {
        Toastify({
          text: `ماشالله! با همین فرمون کار ها تو یکی پس از دیگری انجام بده :))`,
          duration: 5000,
          close: false,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true
        }).showToast()
      }, 5000)
    }
  })
}

const handleUpdateElement = () => {
  if (val_2 == null || val_2 == '') {
    Toastify({
      text: 'نکنه عاشقی! فیلد کار نمیتونه خالی باشه :/',
      duration: 5000,
      close: false,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #DB3445, #F71735)',
      stopOnFocus: true
    }).showToast()

    return 0
  } else if (val_2.trim() == '') {
    Toastify({
      text: 'شیطون بلا! فیلد کار رو space وارد کردی :)',
      duration: 5000,
      close: false,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #DB3445, #F71735)',
      stopOnFocus: true
    }).showToast()

    return 0
  } else if (val_1 == val_2) return 0

  tasks[indexTemp] = val_2

  Toastify({
    text: `تبریک! "${val_2}" با موفقیت به روزرسانی شد`,
    duration: 5000,
    close: false,
    gravity: 'top',
    position: 'right',
    backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
    stopOnFocus: true
  }).showToast()

  localStorage.setItem('tasks', tasks)
}

const handleElementRegistration = BtnRegister => {
  let item = BtnRegister.parentElement
  let className = item.classList[0]
  let content = document.querySelector(`.${className}>input[type=text]`).value

  if (content == null || content == '')
    Toastify({
      text: 'نکنه عاشقی! فیلد کار نمیتونه خالی باشه :/',
      duration: 5000,
      close: false,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #DB3445, #F71735)',
      stopOnFocus: true
    }).showToast()
  else if (content.trim() == '') {
    Toastify({
      text: 'شیطون بلا! فیلد کار رو space وارد کردی :)',
      duration: 5000,
      close: false,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #DB3445, #F71735)',
      stopOnFocus: true
    }).showToast()
  } else {
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

  if (input.parentElement.className.search('newItem') != -1)
    input.parentElement.classList.add('box-control-edit')
}

const blurMode = e => {
  let input = e.target
  val_2 = input.value

  handleUpdateElement()

  if (input.parentElement.className.search('newItem') != -1)
    input.parentElement.classList.remove('box-control-edit')
}

function doc_keyUp(e) {
  var e = e || window.event
  if ((e.altKey && e.key === 'n') || (e.altKey && e.key === 'د')) {
    handleAddElement()
  }
}

document.addEventListener('keyup', doc_keyUp, false)
window.addEventListener('load', showTasks)
addElement.addEventListener('click', handleAddElement)
