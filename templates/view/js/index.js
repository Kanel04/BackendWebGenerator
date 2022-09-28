const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});

/* draggable element */
const item = document.querySelector('.item');

item.addEventListener('dragstart', dragStart);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        
    }, 0);
    conlose.log("dragStart....");
}


/* drop targets */


boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);    
});


function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
    conlose.log("dragEnter....");
}

function dragOver(e) {
    e.preventDefault();
    conlose.log("dragOver....");
}

function dragLeave(e) {
    e.preventDefault();
    conlose.log("dragLeave....");
}

