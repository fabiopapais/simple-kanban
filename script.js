const cards = document.querySelectorAll('.card')
const dropzones = document.querySelectorAll('.dropzone')
const addCardsButtons = document.querySelectorAll('.material-icons')

/** cards */
cards.forEach(card => {
    card.addEventListener('dragstart', dragstart)
    // card.addEventListener('drag', drag)
    card.addEventListener('dragend', dragend)
})

function dragstart() {
    // console.log('CARD: Start dragging ')
    dropzones.forEach( dropzone => dropzone.classList.add('highlight'))

    // this = card
    this.classList.add('is-dragging')
}

// function drag() {
//     console.log('CARD: Is dragging ')
// }

function dragend() {
    // console.log('CARD: Stop drag! ')
    dropzones.forEach( dropzone => dropzone.classList.remove('highlight'))

    // this = card
    this.classList.remove('is-dragging')
}

/** dropzones recognition and appends */
dropzones.forEach( dropzone => {
    // dropzone.addEventListener('dragenter', dragenter)
    dropzone.addEventListener('dragover', dragover)
    dropzone.addEventListener('dragleave', dragleave)
    dropzone.addEventListener('drop', drop)
})

// function dragenter() {
//     console.log('DROPZONE: Enter in zone ')
// }

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


/* addCard functions */
addCardsButtons.forEach( addCardsButton => {
    addCardsButton.addEventListener('click', addCard)
})

function addCard() {
    let task = prompt('What is the name of the task?', 'Start this project on Github')
    
}
