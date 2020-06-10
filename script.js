const newTasks = JSON.parse(localStorage.getItem('newTasks')) || [] // TODO1: localStorage implement

var cards = document.querySelectorAll('.card')
var dropzones = document.querySelectorAll('.dropzone')

const todoDiv = document.getElementById('todoDiv')
const progressDiv = document.getElementById('progressDiv')
const doneDiv = document.getElementById('doneDiv')

let colors = ['red', 'green', 'blue']

function load() {
    cards = document.querySelectorAll('.card')
    dropzones = document.querySelectorAll('.dropzone')

    /** cards */
    cards.forEach(card => {
        card.addEventListener('dragstart', dragstart)
        // card.addEventListener('drag', drag)
        card.addEventListener('dragend', dragend)
    })

    /** dropzones recognition and appends */
    dropzones.forEach( dropzone => {
        // dropzone.addEventListener('dragenter', dragenter)
        dropzone.addEventListener('dragover', dragover)
        dropzone.addEventListener('dragleave', dragleave)
        dropzone.addEventListener('drop', drop)
    })


}
load()

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

function createCard(type) {
    const task = prompt('Please write your task below:') || "Star this project on Github" // oh! looks like an easter egg!

    newTasks.push(task) // TODO1
    localStorage.setItem('newTasks', JSON.stringify(newTasks)) // TODO1

    let randcolor = colors[Math.floor(Math.random() * (3 - 0) ) + 0]

    var newCard = [
        '<div class="card" draggable="true">',
            `<div class="status ${randcolor}">` + '</div>',
            '<div class="content">' + task + '</div>',
        '</div>'
    ].join("\n");

    switch (type) {
        case "todo":
            todoDiv.innerHTML += newCard
            break
        case "progress":
            progressDiv.innerHTML += newCard
            break
        case "done":
            doneDiv.innerHTML += newCard
            break
    }
    load()
}
