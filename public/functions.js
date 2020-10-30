let btnSendListName = $('#send_list_name')
let listName = $('#new_list_name')
let allList = []
const urlList_db = 'http://127.0.0.1:8000/api/'
//const urlList_db = 'http://localhost:3000/Lists'

$().ready(
  getAllList_db()
);

function getAllList_db() {
  fetch(urlList_db + 'Lists').then(response => {
    return response.json()
  }).then(data => {
    allList = data
    createNewListText()
    console.log(allList);
  })
}

function sendListName() {
  if (!listName.val()) {
    return
  }
  fetch(urlList_db + 'addList', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ name: listName.val() })
  }).then(response => {
    return response.json()
  }).then(data => {
    allList.push(data)
    createNewListText()
    listName.val('')
    console.log('data', data);
  });
}

function createNewListText() {
  $('#list_name').empty()
  allList.forEach((elem, index) => {
    let newListName = $('<div>')
    $(newListName).text(elem.name)
    newListName.addClass('col-12 col-md-6')
    $('#list_name').append(newListName)

    let divToBtn = $('<div>')
    divToBtn.addClass('col-12 col-md-6')
    $('#list_name').append(divToBtn)

    let showToDoList = $('<button>')
    $(showToDoList).append($('<i class="fa fa-eye" aria-hidden="true"></i>'))
    showToDoList.addClass(" mb-1 col-5 btn-sm btn btn-outline-success show")
    showToDoList.attr('id', 'show_list_name')
    showToDoList.attr('index', index)
    divToBtn.append(showToDoList)

    let delToDoList = $('<button>')
    $(delToDoList).append($('<i class="fa fa-trash-o" aria-hidden="true"></i>'))
    delToDoList.addClass("mb-1 ml-1 col- btn-sm btn btn-outline-danger delete_list")
    delToDoList.attr('id', 'del_list_name')
    delToDoList.attr('index', index)
    divToBtn.append(delToDoList)
  })
  $('.show').on('click', function () {
    getToDo(this.getAttribute('index'));
  })
  $('.delete_list').on('click', function () {
    delListItem(this.getAttribute('index'));
  })
}

function delListItem(index) {
  fetch(urlList_db + 'delAll/' + allList[index].id, {
    method: 'DELETE',
  }).then(response => {
    return response.json()
  }).then(data => {
    //getAllList_db()
    allList.splice(index, 1)
    createNewListText()
  }).catch(err => {
    console.error(err)
  })
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////   ***show todo list***   /////////////////////
/////////////////////////////////////////////////////////////////////////
let todoName = $('#todo_name')
let btnSendTodoItem = $('#send_todo_item')
let addTodoItem = $('#add_todo_item')
//const urlToDo_db = 'http://localhost:3000/List_todo'
const urlToDo_db = 'http://127.0.0.1:8000/api/'
let listID = null
todo = []
todoName.text('')

function getToDo(index) {
  todoName.text(allList[index].name)
  $('#block_items').removeClass('d-none')
  listID = allList[index].id
  fetch(urlToDo_db + 'listItems/' + listID).then(response => {
    return response.json()
  }).then(data => {
    todo = data
    createToDoList()
    console.log(todo);
  })
}

function SendTodoItem() {
  if (!addTodoItem.val()) {
    return
  }
  fetch(urlToDo_db + 'addItem', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: addTodoItem.val(),
      listID: listID,
      check: false
    })
  }).then(response => {
    return response.json()
  }).then(data => {
    todo.push(data)
    createToDoList()
    addTodoItem.val('')
    console.log('data', data);
  });
}

function createToDoList() {
  $('#todo_items').empty()
  todo.forEach((elem, index) => {
    let row = $('<div class="row">')
    $('#todo_items').append(row)

    let input_check = $('<input type="checkbox">')
    input_check.addClass('mr-3 mt-1 col-1 check')
    input_check.attr('checked', elem.check)
    input_check.attr('index', index)
    row.append(input_check)

    let span = $('<span class="col-6">')
    span.text(elem.name)
    if (elem.check === true) {
      span.addClass('check_item_true')
    }
    span.attr('index', index)
    row.append(span)

    let rename_input = $('<input type="text" class="col-6 d-none">')
    rename_input.val(elem.name)
    rename_input.attr('index', index)
    row.append(rename_input)

    let btnDelTodoItem = $('<button class="del_item">')
    $(btnDelTodoItem).append($('<i class="fa fa-trash" aria-hidden="true"></i>'))
    btnDelTodoItem.addClass('float-right mb-1 col-1 btn btn-danger btn-sm mx-2')
    btnDelTodoItem.attr('index', index)
    row.append(btnDelTodoItem)

    let btnRenameTodoItem = $('<button class="rename_item">')
    $(btnRenameTodoItem).append($('<i class="fa fa-pencil" aria-hidden="true"></i>'))
    btnRenameTodoItem.addClass('float-right mb-1 col-1 btn btn-info btn-sm mx-2')
    btnRenameTodoItem.attr('index', index)
    row.append(btnRenameTodoItem)
  })
  $('.del_item').on('click', function () {
    delTodoItem(this.getAttribute('index'));
  })
  $('.rename_item').on('click', function () {
    renameTodoItem(this);
    console.log($(this).parent().children('span').text());
  })
  $('.check').on('click', function () {
    checkItem(this)
  })
}

function checkItem(e) {
  let index = $(e).attr('index')
  fetch(urlToDo_db + 'checkItem/' + todo[index].id, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      check: e.checked,
    })
  }).then(response => {
    return response.json()
  }).then(data => {
    todo[index].check = e.checked
    if (e.checked === true) {
      $(e).parent().children('span').addClass('check_item_true')
    }
    else {
      $(e).parent().children('span').removeClass('check_item_true')
    }
  }).catch(err => {
    console.error(err)
  })
}

function delTodoItem(index) {
  fetch(urlToDo_db + 'delItem/' + todo[index].id, {
    method: 'DELETE',
  }).then(response => {
    return response.json()
  }).then(data => {
    //getAllList_db()
    todo.splice(index, 1)
    createToDoList()
  }).catch(err => {
    console.error(err)
  })
}

function renameTodoItem(e) {
  let span = $(e).parent().children('span')
  let input = $(e).parent().children('input[type="text"]')
  if (!span.hasClass('d-none')) {
    span.addClass('d-none')
    input.removeClass('d-none')
    $(e).empty()
    $(e).append($('<i class="fa fa-floppy-o" aria-hidden="true"></i>'))
  } else {
    let index = $(e).attr('index')
    fetch(urlToDo_db + 'renameItem/' + todo[index].id, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: input.val(),
      })
    }).then(response => {
      return response.json()
    }).then(data => {
      todo[index].name = input.val()
      span.text(input.val())
      input.addClass('d-none')
      span.removeClass('d-none')
      $(e).empty()
      $(e).append($('<i class="fa fa-pencil" aria-hidden="true"></i>'))
    }).catch(err => {
      console.error(err)
    })
  }
}

function hideTodoItems() {
  $('#block_items').addClass('d-none')
}