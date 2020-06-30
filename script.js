const storageTasks = JSON.parse(localStorage.getItem('storageTasks')) || []

var cards = document.querySelectorAll('.card')
var dropzones = document.querySelectorAll('.dropzone')

const todoDiv = document.getElementById('todo')
const progressDiv = document.getElementById('progress')
const doneDiv = document.getElementById('done')

let colors = ['red', 'green', 'blue']

function load(first) {
    cards = document.querySelectorAll('.card')
    dropzones = document.querySelectorAll('.dropzone')

    /** cards */
    cards.forEach(card => {
        card.addEventListener('dragstart', dragstart)
        // card.addEventListener('drag', drag)
        card.addEventListener('dragend', dragend)
    })

    /** dropzones recognition and appends */
    dropzones.forEach(dropzone => {
        // dropzone.addEventListener('dragenter', dragenter)
        dropzone.addEventListener('dragover', dragover)
        dropzone.addEventListener('dragleave', dragleave)
        dropzone.addEventListener('drop', drop)
    })

    if (first) {
        // localStorage cards render
        storageTasks.forEach(task => {
        createCard(task.id, task.name, task.type)
        })
    }
}
load(true)

function dragstart() {
    // console.log('CARD: Start dragging ')
    dropzones.forEach( dropzone => dropzone.classList.add('highlight'))

    // this = card
    this.classList.add('is-dragging')
}
function dragend() {
    // console.log('CARD: Stop drag! ')
    dropzones.forEach( dropzone => dropzone.classList.remove('highlight'))

    // this = card
    this.classList.remove('is-dragging')
}
function dragover() {
    // this = dropzone
    this.classList.add('is-over')

    // get dragging card
    const cardBeingDragged = document.querySelector('.is-dragging')

    // localStorage update
    storageTasks.map(task => {
        if (task.id == cardBeingDragged.id) {
            task.type = this.id
        }
    })
    localStorage.setItem('storageTasks', JSON.stringify(storageTasks))

    // DOM update
    this.appendChild(cardBeingDragged)
}
function dragleave() {
    // console.log('DROPZONE: Leave ')
    // this = dropzone
    this.classList.remove('is-over')
}
function drop() {
    // console.log('DROPZONE: dropped ')
    this.classList.remove('is-over')
}


/* Create and Delete cards functions */
function handleCreateCard(type) {
    const name = prompt('Please write your task below:') || "Star this project on Github" // oh! looks like an easter egg!
    let id
    if (storageTasks.length > 0) {
        id = storageTasks[storageTasks.length - 1].id + 1 
    }
    else {
        id = 0
    }

    createCard(id, name, type)

    task = {
        id: id,
        name: name,
        type: type,
    }

    //localStorage update
    storageTasks.push(task) 
    localStorage.setItem('storageTasks', JSON.stringify(storageTasks))
}

function createCard(id, name, type) {
    let randcolor = colors[Math.floor(Math.random() * (3 - 0) ) + 0]

    let parser = new DOMParser()
    let element = parser.parseFromString(
        `<div class="card" draggable="true" id="${id}">
            <div class="status ${randcolor}"></div>
            <div class="content">${name}</div>
            <span class="material-icons md-24 delete-button" onclick="handleDeleteCard(${id})">
                delete
            </span>
        </div>`
    , "text/html")

    let card = element.querySelector(".card")

    switch (type) {
        case "todo":
            todoDiv.appendChild(card)
            break
        case "progress":
            progressDiv.appendChild(card)
            break
        case "done":
            doneDiv.appendChild(card)
            break
    }

    load(false)
}

function handleDeleteCard(id) {
    const card = document.getElementById(id)

    let type
    storageTasks.filter((task, index) => {
        if (task.id == id) {
            storageTasks.splice(index, 1)
            type = task.type
        }
    })
    localStorage.setItem('storageTasks', JSON.stringify(storageTasks))


    // DOM update
    switch (type) {
        case "todo":
            todoDiv.removeChild(card)
            break
        case "progress":
            progressDiv.removeChild(card)
            break
        case "done":
            doneDiv.removeChild(card)
            break
    }
}