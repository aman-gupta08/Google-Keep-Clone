const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    // console.log(textAreaData);

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    // console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="operation">
        <button class="edit"> <i class="fas fa-edit"></i></button>
        <button class="delete"> <i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>  `;

    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note);

    // getting the References
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // deleting the node
    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    })

    // toggle using edit button
    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        // console.log(value);
        mainDiv.innerHTML = value;

        updateLSData();
    })

    document.body.appendChild(note);
}

// getting data back from localStorage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) { notes.forEach((note) => addNewNote(note)) }

addButton.addEventListener('click', () => {
    addNewNote();
});







/*
// new to learn
DOM:
createElement : document.createElement('div');
appendChild : The appendChild() method appends a node as the last child of a node.
              document.body.appendChild(note);

.classList
.add()
.remove()
.toggle()

insertAdjacentElement(position, text)   
insertAdjacentHTML(position, text)
insertAdjacentText(position, text)

position: 
    • "beforebegin': Before the element itself.
    • "afterbegin': Just inside the element, before its first child. 
    • 'beforeend: Just inside the element, after its last child.
    • "afterend: After the element itself.
text:
    The string to be parsed as HTML or XML and inserted into the tree.


<!-- beforebegin -->
<p>
    <!--afterbegin -->
    foo

    <!--beforeend -->
</p>
<!-- afterend -->


event.target.value


// localStorage
The localStorage and sessionStorage properties allow to save key/value 
pairs in a web browser. The localStorage object stores data with no 
expiration date. The data will not be deleted when the browser is 
closed, and will be available the next day, week, or year.
localStorage.setItem() : set key-value to local storage
localStorage.getItem() : get key-value from local storage




*/

