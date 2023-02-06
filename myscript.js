// function buttonClicked(){
//     alert("The button is clicked")
// }

// //document.getElementById('test').addEventListener('click', buttonClicked)
// //or
// // document.getElementById('test').addEventListener('click', function(){
// //     alert("The button is clicked")
// // })

// document.querySelector('#btnSubmit').addEventListener('click', function(e){
//     console.log(e.target.id)
//     //e.preventDefault() for the forms
//     //e.target.className
//     //e.target.id
//     //e.target.submit
//     //e.clientX, ' ', e.clientY - coordinate san ka nagclick (within the button/element)
// })

if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("service-worker.js")
}


//to make sure na number yung value ni count
let count = Number(window.localStorage.getItem("count"));
//check if count is existing, if not gagawa siya
if (!count) {
  window.localStorage.setItem("count", 0);
}

function createNote(noteTitle, noteBody) {
  document.getElementById("no-notes").classList.add("hidden");
  let li = document.createElement("li");
  let a = document.createElement("a");
  let h2 = document.createElement("h2");
  let p = document.createElement("p");
  let closeButton = document.createElement("button");

  closeButton.classList.add("delete");
  let closeButtonText = document.createTextNode("X");
  let h2Text = document.createTextNode(noteTitle);
  let pText = document.createTextNode(noteBody);

  closeButton.appendChild(closeButtonText);
  h2.appendChild(h2Text);
  p.appendChild(pText);

  a.appendChild(h2);
  a.appendChild(closeButton);
  a.appendChild(p);
  a.setAttribute("href", "#");

  li.appendChild(a);
  document.getElementById("notes").appendChild(li);
}

function deleteNote(e) {
  if (e.target.classList.contains("delete")) {
    console.log("clicked");
    if (confirm("Are you sure that you want to delete this note?")) {
      let li = e.target.parentElement.parentElement;
      let ul = document.querySelector("#notes");
      let buttonSibling = e.target; //will be used to get h2

      ul.removeChild(li);

      count -= 1;
      window.localStorage.setItem("count", count);
      window.localStorage.removeItem(
        buttonSibling.previousElementSibling.innerText
      );

      if (count < 1) {
        document.getElementById("no-notes").classList.remove("hidden");
      }
    }
  }
}

function handleCreateNoteSubmit(e) {
  e.preventDefault();
  console.log("The button is clicked");

  let noteTitle = document.getElementById("new-note-title-input").value;
  let noteBody = document.getElementById("new-note-body-input").value;
  let counter = 0;
  console.log(noteTitle, " ", noteBody);

  document.getElementById("new-note-title-input").value = "";
  document.getElementById("new-note-body-input").value = "";

  count += 1;
  window.localStorage.setItem("count", count);

  while (window.localStorage.getItem(noteTitle)) {
    noteTitle += "(1)";
  }

  window.localStorage.setItem(noteTitle, noteBody);

  createNote(noteTitle, noteBody);
}

for (let i = 0; i < count + 1; i++) {
  //iterate through the values stored in the lcoal storage
  let noteTitle = window.localStorage.key(i);
  let noteBody = window.localStorage.getItem(noteTitle); //gets the value of the key

  //noteTitle should not be "count" and empty
  if (noteTitle !== "count" && noteTitle) {
    createNote(noteTitle, noteBody);
  }
}

//false is for other eventListener options (false kasi di naman natin need)
document
  .querySelector("#inputForm")
  .addEventListener("submit", handleCreateNoteSubmit, false);

document.querySelector("#notes").addEventListener("click", deleteNote, false);
