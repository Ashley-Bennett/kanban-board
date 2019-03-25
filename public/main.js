const newBoard = document.getElementById("newBoard");
const findBoard = document.getElementById("findBoard");
const searchBox = document.getElementById("searchBox");
const renameBoard = document.getElementById("renameBoard");
const renameBox = document.getElementById("renameBox");
const word = document.getElementById("title");
const boardtitle = document.getElementById("boardtitle");

let loadedboard = false;

boardtitle.addEventListener("click", e => {
  e.preventDefault();

  renameBox.style.display = "block";
  renameBoard.style.display = "block";
});

newBoard.addEventListener("click", e => {
  e.preventDefault();

  fetch(`/board`, {
    method: "post",
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

              title: `Item 1 - Click and drag me to another board`
            },
            {
              title: `Item 2 - Click on me to delete me`,
              id: "_test_delete"
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
              title: `Item 17`
            },
            {
              title: `Item 21`,
              id: "new click"
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
              title: `Item 18`
            },
            {
              title: `Item 23`,
              id: "clickalso"
            }
          ]
        }
      ]
    })
      .then(response => {
        // console.log(response);
        // return response.json();
        console.log(response);
      })
      .then(myJson => {
        // return JSON.stringify(myJson);
      })
      .then(data => {
        // let returnedData = JSON.parse(data);
        // console.log(returnedData.name);
      })
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
