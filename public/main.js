const newBoard = document.getElementById("newBoard");
const findBoard = document.getElementById("findBoard");
const searchBox = document.getElementById("searchBox");
const renameBoard = document.getElementById("renameBoard");
const renameBox = document.getElementById("renameBox");
const word = document.getElementById("title");
const boardtitle = document.getElementById("boardtitle");
const saveBoard = document.getElementById("saveBoard");

let loadedboard = false;

let board;

renameBoard.addEventListener("click", e => {
  e.preventDefault();

  let id = searchBox.value;

  fetch(`/board/${id}`, {
    method: "put",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      title: `${renameBox.value}`
    })
  });

  boardtitle.textContent = renameBox.value;
  console.log("clicked");
  console.log(renameBox.value);
});

boardtitle.addEventListener("click", e => {
  e.preventDefault();

  renameBox.style.display = "block";
  renameBoard.style.display = "block";
});

saveBoard.addEventListener("click", e => {
  e.preventDefault();

  let board;

  let currentBoad = document.getElementsByClassName("kanban-drag");
  let toDoBoard = currentBoad[0];
  let workBoard = currentBoad[1];
  let doneBoard = currentBoad[2];

  let id = searchBox.value;

  // console.log(toDoBoard.children[0].dataset.class)

  let toDoItems = [];
  for (let i = 0; i < toDoBoard.children.length; i++) {
    console.log(i);
    let item = toDoBoard.children[i].textContent;
    let color = toDoBoard.children[i].dataset.class;
    console.log(item);
    let newitem = {
      id: `item${i}`,
      title: `${item}`,
      class: color
    };
    toDoItems.push(newitem);
  }

  console.log(toDoItems);

  let workItems = [];
  for (let i = 0; i < workBoard.children.length; i++) {
    console.log(i);
    let item = workBoard.children[i].textContent;
    let color = workBoard.children[i].dataset.class;
    console.log(item);
    let newitem = {
      id: `item${i}`,
      title: `${item}`,
      class: color
    };
    workItems.push(newitem);
  }

  let doneItems = [];
  for (let i = 0; i < doneBoard.children.length; i++) {
    console.log(i);
    let item = doneBoard.children[i].textContent;
    let color = doneBoard.children[i].dataset.class;
    console.log(item);
    let newitem = {
      id: `item${i}`,
      title: `${item}`,
      class: color
    };
    doneItems.push(newitem);
  }

  word.textContent = `Your board has been saved`;

  fetch(`/board/${id}`, {
    method: "put",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      title: "AB NEW TEST",

      board: [
        {
          id: "_todo",
          title: "To Do",
          class: "info,good",
          dragTo: ["_todo", "_working", "_done"],
          item: toDoItems
        },
        {
          id: "_working",
          title: "Working",
          class: "info,good",
          dragTo: ["_todo", "_working", "_done"],
          item: workItems
        },
        {
          id: "_done",
          title: "Done",
          class: "info,good",
          dragTo: ["_todo", "_working", "_done"],
          item: doneItems
        }
      ]
    })
  });
});

newBoard.addEventListener("click", e => {
  e.preventDefault();

  word.innerText = "New Kanban Board Created";

  return fetch(`/board`, {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      title: "new working title",
      board: [
        {
          id: "_todo",
          title: "To Do",
          class: "info,good",
          dragTo: ["_todo", "_working", "_done"],
          item: [
            {
              id: "item 1",
              title: `Item 1 - Click and drag me to another board`,
              class: "red"
            },
            {
              title: `Item 2 - Click on me to delete me`,
              id: "_test_delete",
              class: "none"
            }
          ]
        },
        {
          id: "_working",
          title: "Working",
          class: "info,good",
          dragTo: ["_todo", "_working", "_done"],
          item: [
            {
              id: "new item2",
              title: `Item 3`,
              class: "blue"
            },
            {
              title: `Item 4`,
              id: "new click",
              class: "none"
            }
          ]
        },
        {
          id: "_done",
          title: "Done",
          class: "info,good",
          dragTo: ["_todo", "_working", "_done"],
          item: [
            {
              id: "_test_deleteagain",
              title: `Item 5`,
              class: "none"
            },
            {
              title: `Item 6`,
              id: "clickalso",
              class: "none"
            }
          ]
        }
      ]
    })
  })
    .then(response => {
      // console.log(response);
      return response.json();
    })
    .then(myJson => {
      return JSON.stringify(myJson);
    })
    .then(data => {
      let returnedData = JSON.parse(data);
      console.log(returnedData._id);
      word.textContent = `Your board ID is ${returnedData._id}`;
    });
});

findBoard.addEventListener("click", e => {
  e.preventDefault();

  word.innerText = "Enter Valid ID to load Kanban board.";
  let id = searchBox.value;
  // console.log(id)

  if (loadedboard == false) {
    loadedboard = true;
    return (returnData = fetch(`/board/${id}`)
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(myJson => {
        return JSON.stringify(myJson);
      })
      .then(data => {
        let returnedData = JSON.parse(data);
        // console.log(returnedData.name);
        if (returnedData.name == "CastError") {
          word.innerText = "Kanban Board Not Found";
          loadedboard = false;
        } else {
          // loadedboard = false;
          let board = returnedData.board;
          console.log(board);
          word.innerText = "Kanban Board Loaded";
          // console.log(returnedData.title);
          boardtitle.innerText = returnedData.title;
          let Kanban = new jKanban({
            element: "#Kanban",
            gutter: "10px",
            widthBoard: "450px",
            click: function(el) {
              console.log(el.dataset.eid);
              Kanban.removeElement(el.dataset.eid);
            },
            buttonClick: function(el, boardId) {
              let board = document.getElementsByClassName("kanban-drag");
              let array0 = board[0].children;
              let array1 = board[1].children;
              let array2 = board[2].children;
              console.log(array0);
              let total0 = array0.length;
              console.log(total0);
              let total1 = array1.length;
              let total2 = array2.length;
              if (
                array0[total0 - 1] !== undefined &&
                array1[total1 - 1] !== undefined &&
                array1[total1 - 1] !== undefined
              ) {
                if (
                  array0[total0 - 1].className !== "itemform not-draggable" &&
                  array1[total1 - 1].className !== "itemform not-draggable" &&
                  array2[total2 - 1].className !== "itemform not-draggable"
                ) {
                  console.log(el);
                  console.log(boardId);
                  // create a form to enter element
                  let formItem = document.createElement("form");
                  formItem.setAttribute("class", "itemform");
                  formItem.innerHTML =
                    '<div class="form-group"><textarea class="form-control" rows="2" autofocus="true"></textarea></div><div class="form-group"><button type="submit" class="btn btn-primary btn-xs pull-right">Submit</button><button type="button" id="CancelBtn" class="btn btn-default btn-xs pull-right">Cancel</button><select class="color-select"><option value="None"></option><option value="red">Red</option><option value="green">Green</option><option value="blue">Blue</option><option value="pink">Pink</option></select></div>';

                  Kanban.addForm(boardId, formItem);
                  formItem.addEventListener("submit", function(e) {
                    e.preventDefault();
                    let text = e.target[0].value;
                    let color = e.target[3].value;
                    if (text !== "") {
                      Kanban.addElement(boardId, {
                        title: text,
                        id: text,
                        // click: function(el) {
                        //   Kanban.removeElement(el.dataset.eid);
                        // },
                        class: color
                      });
                      formItem.parentNode.removeChild(formItem);
                    } else {
                      alert("You can't submit an empty form");
                    }
                  });
                  document.getElementById("CancelBtn").onclick = function() {
                    formItem.parentNode.removeChild(formItem);
                  };
                } else {
                  alert("Finish your other item first");
                }
              } else {
                console.log(el);
                console.log(boardId);
                // create a form to enter element
                let formItem = document.createElement("form");
                formItem.setAttribute("class", "itemform");
                formItem.innerHTML =
                  '<div class="form-group"><textarea class="form-control" rows="2" autofocus="true"></textarea></div><div class="form-group"><button type="submit" class="btn btn-primary btn-xs pull-right">Submit</button><button type="button" id="CancelBtn" class="btn btn-default btn-xs pull-right">Cancel</button><select class="color-select"><option value="None"></option><option value="red">Red</option><option value="green">Green</option><option value="blue">Blue</option><option value="pink">Pink</option></select></div>';

                Kanban.addForm(boardId, formItem);
                formItem.addEventListener("submit", function(e) {
                  e.preventDefault();
                  let text = e.target[0].value;
                  let color = e.target[3].value;
                  if (text !== "") {
                    Kanban.addElement(boardId, {
                      title: text,
                      id: text,
                      click: function(el) {
                        Kanban.removeElement(el.dataset.eid);
                      },
                      class: color
                    });
                    formItem.parentNode.removeChild(formItem);
                  } else {
                    alert("You can't submit an empty form");
                  }
                });
                document.getElementById("CancelBtn").onclick = function() {
                  formItem.parentNode.removeChild(formItem);
                };
              }
            },
            addItemButton: true,
            boards: board
          });
        }
      }));
  } else {
  }
  word.innerText = "Board Already Loaded, Refresh The Page.";
});
