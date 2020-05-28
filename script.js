const cards = document.querySelectorAll('.card')
const dropzones = document.querySelectorAll('.dropzone')

cards.forEach(card => {
    card.addEventListener('dragstart', dragstart)
    card.addEventListener('drag', drag)
    card.addEventListener('dragend', dragend)
})

function dragstart(event) {
    dropzones.forEach(dropzone => dropzone.classList.add('highlight'))
    event.target.classList.add('is-dragging') // event.target é o card
}
function drag() {
    // console.log("dragging")
}
function dragend(event) {
    // console.log("end dragging")
    dropzones.forEach(dropzone => dropzone.classList.remove('highlight'))
    event.target.classList.remove('is-dragging') // event.target é o card
}

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragenter', dragenter)
    dropzone.addEventListener('dragover', dragover)
    dropzone.addEventListener('dragleave', dragleave)
    dropzone.addEventListener('drop', ondrop)
})

function dragenter() {
    // console.log("dragenter")
}
function dragover(event) {
    //event é o dropzone
    // console.log("dragover")
    event.target.classList.add('is-over')

    // dragging card
    const cardBeingGrabbed = document.querySelector('.is-dragging')

    event.target.appendChild(cardBeingGrabbed)
}
function dragleave(event) {
    console.log("drageLeave")
    event.target.classList.remove('is-over')
}
function ondrop(event) {
    console.log("aqui")
    event.target.classList.remove('is-over')
}
