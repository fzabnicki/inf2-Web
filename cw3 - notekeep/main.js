const localStorageNotesKey = 'notes';
let notes = [];
document.querySelector('#noteAdd').addEventListener('click', onNewNote)

function onNewNote() {
    const title = document.querySelector('#noteTitle').value;
    const content = document.querySelector('#noteContent').value;
    const color = document.querySelector('#noteColor').value;
    const pinned = document.querySelector('#notePinned').checked;
    CreateNewNote(title, content, color, pinned)
    document.querySelector('#noteTitle').value = '';
    document.querySelector('#noteContent').value = '';
}
function CreateNewNote(title, content, color, pinned){
    // nowa notatka
    const note = {
        id: Math.random()*10000,
        title: title,
        content: content,
        colour: color,
        pinned: pinned,
        createDate: new Date()
    };
    // notatka dodana do tablicy notatek
    if(note.pinned == true){
        notes.unshift(note);
    }else{
        notes.push(note);
    }
    SaveInLocalStorage();
    ClearPage();
    CreateNotesFromLocalStorage();
}
function ClearPage(){
    const main = document.querySelector('main');
    main.innerHTML = '';
}
function SaveInLocalStorage(){
    // tablica zapisana w localStorage
    localStorage.setItem(localStorageNotesKey, JSON.stringify(notes));
}
function LoadFromLocalStorage(){
    // odczytanie tablicy notatek z localStorage
    const notesFromStorage = JSON.parse(localStorage.getItem(localStorageNotesKey));
    console.log(notesFromStorage);
    notes = notesFromStorage.map( note => {
        note.createDate = new Date(note.createDate);
        return note;
    });
}
function removeNoteFromNotes(id){
    notes.splice(id,1);
    SaveInLocalStorage();
    LoadFromLocalStorage();
    const main = document.querySelector('main');
    main.innerHTML = '';
    CreateNotesFromLocalStorage();
}
function CreateNotesFromLocalStorage(){
    LoadFromLocalStorage();
    // zmiana html-a z poziomu js-a - sposób obiektowy
    let quant = 0;
    for (let note of notes) {
        const htmlSection = document.createElement('section'+quant);
        const htmlTitle = document.createElement('h1');
        const htmlContent = document.createElement('p');
        const htmlDate = document.createElement('h4');
        const htmlCloseButton = document.createElement('button');
        if(note.pinned == true){
            htmlSection.classList.add('notePinned');
        }else{
            htmlSection.classList.add('note');
        }
        htmlTitle.innerHTML = note.title;
        htmlContent.innerHTML = note.content;
        htmlDate.innerHTML = note.createDate.toLocaleString();
        htmlSection.style.backgroundColor = note.colour;
        htmlCloseButton.setAttribute('id', quant);
        htmlCloseButton.setAttribute('class', 'closeButton');
        htmlCloseButton.setAttribute('onClick', 'removeNoteFromNotes(this.id)')
        htmlCloseButton.innerHTML = 'X';
        
        htmlSection.appendChild(htmlCloseButton);
        htmlSection.appendChild(htmlTitle);
        htmlSection.appendChild(htmlContent);
        htmlSection.appendChild(htmlDate);

        const main = document.querySelector('main');
        main.appendChild(htmlSection);
        quant++;
    };
};
document.onload = CreateNotesFromLocalStorage();

// notatka:
// Tytuł
// Treść
// Kolor notatki
// Możliwość przypięcia do góry na liście notatek
// Datę utworzenia