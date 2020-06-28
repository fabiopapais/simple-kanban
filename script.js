const newTasks = JSON.parse(localStorage.getItem('newTasks')) || []

var cards = document.querySelectorAll('.card')
var dropzones = document.querySelectorAll('.dropzone')

const todoDiv = document.getElementById('todoDiv')
const progressDiv = document.getElementById('progressDiv')
const doneDiv = document.getElementById('doneDiv')

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
        newTasks.forEach(task => {
        createCard(task.type, task.name)
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

    console.log(cardBeingDragged)

    // this = dropzone
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

function handleCreateCard(type) {
    const taskName = prompt('Please write your task below:') || "Star this project on Github" // oh! looks like an easter egg!

    const task = {
        name: taskName,
        type: type
    }

    newTasks.push(task) 
    localStorage.setItem('newTasks', JSON.stringify(newTasks))

    createCard(type, taskName)
}

function createCard(type, task) {
    let randcolor = colors[Math.floor(Math.random() * (3 - 0) ) + 0]

    // TODO  test another simple ways to render html
    // let parser = new DOMParser()
    // let el = parser.parseFromString(
    //     `<div class="card" draggable="true">
    //         <div class="status ${randcolor}"></div>
    //         <div class="content">${task}</div>
    //     </div>`
    // , "text/html")

    let card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('draggable', 'true')
    
    let status = document.createElement('div')
    status.classList.add('status')
    status.classList.add(randcolor)

    let content = document.createElement('div')
    content.classList.add('content')
    content.innerHTML = task

    card.appendChild(status)
    card.appendChild(content)

    console.log(card)

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