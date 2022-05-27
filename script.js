console.log('Welcome to Notes App');
showNotes();

// IF USER ADD A NOTE, ADD IT TO THE localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");

    if (addTxt.value === "") {
        return alert("Please Add a Note");
    }

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();
});

// FUNCTION TO SHOW ELEMENTS FROM localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    // DISPLAYING THE NOTES
    let html = "";
    notesObj.forEach(function (element, index) {
        html += ` <div class="noteCard my-2 me-4 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5> 
                            <span class="position-absolute top-0 start-1 translate-middle text-wrap badge bg-primary">
                                Note ${index + 1}
                            </span>
                        </h5>
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <hr>
                        <div class='d-flex justify-content-end gap-2'>
                            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger"><i class='bx bxs-trash-alt'></i></button>
                            <button id="${index}" onclick="editNote(this.id)" class="btn btn-success"><i class='bx bxs-edit'></i></button>
                        </div>
                    </div>
                </div>`
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to Show! <br> Use "Add a Note" section above to Add Notes.`
    }
}

// FUNCTION TO DELETE NOTE
function deleteNote(index) {
    // console.log("🔴Delete a Note.", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// FUNCTION TO EDIT NOTE
function editNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.findIndex((element) => {
        addTitle.value = element.title;
        addTxt.value = element.text;
    });
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
}

// SEARCHING
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    // console.log("Input Event Fired!!", inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    });
});

// 