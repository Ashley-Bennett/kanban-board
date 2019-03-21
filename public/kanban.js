var Kanban = new jKanban({
    element: '#Kanban',
    gutter: '10px',
    widthBoard: '450px',
    click: function (el) {
        console.log("Trigger on all items click!");
    },
    buttonClick: function (el, boardId) {
        console.log(el);
        console.log(boardId);
        // create a form to enter element 
        var formItem = document.createElement('form');
        formItem.setAttribute("class", "itemform");
        formItem.innerHTML = '<div class="form-group"><textarea class="form-control" rows="2" autofocus></textarea></div><div class="form-group"><button type="submit" class="btn btn-primary btn-xs pull-right">Submit</button><button type="button" id="CancelBtn" class="btn btn-default btn-xs pull-right">Cancel</button></div>'

        Kanban.addForm(boardId, formItem);
        formItem.addEventListener("submit", function (e) {
            e.preventDefault();
            var text = e.target[0].value
            Kanban.addElement(boardId, {
                "title": text,
                "id": text,
                "click": function (el) {
                    Kanban.removeElement(el.dataset.eid)
                }
            })
            formItem.parentNode.removeChild(formItem);
        });
        document.getElementById('CancelBtn').onclick = function () {
            formItem.parentNode.removeChild(formItem)
        }
    },
    addItemButton: true,
    boards: [{
            "id": "_todo",
            "title": "To Do",
            "class": "info,good",
            "dragTo": ['_working', '_done'],
            "item": [{
                    "id": "_test_delete",
                    "click": function (el) {
                        Kanban.removeElement(el.dataset.eid)
                    },
                    "title": "Try drag this (Look the console)",
                    "drag": function (el, source) {
                        console.log("START DRAG: " + el.dataset.eid);
                    },
                    "dragend": function (el) {
                        console.log("END DRAG: " + el.dataset.eid);
                    },
                    "drop": function (el) {
                        console.log('DROPPED: ' + el.dataset.eid)
                    }
                },
                {
                    "title": "Try Click This!",
                    "id": "click",
                    "click": function (el) {
                        Kanban.removeElement(el.dataset.eid)
                    },
                }
            ]
        },
        {
            "id": "_working",
            "title": "Working",
            "class": "warning",
            "item": [{
                    "title": "Do Something!",
                    "id": "Do Something!",
                    "click": function (el) {
                        Kanban.removeElement(el.dataset.eid)
                    },
                },
                {
                    "title": "Run?",
                    "id": "Run?",
                    "click": function (el) {
                        Kanban.removeElement(el.dataset.eid)
                    },
                }
            ]
        },
        {
            "id": "_done",
            "title": "Done (Can drop item only in working)",
            "class": "success",
            "dragTo": ['_working'],
            "item": [{
                    "title": "All right",
                    "id": "All right",
                    "click": function (el) {
                        Kanban.removeElement(el.dataset.eid)
                    },
                },
                {
                    "title": "Ok!",
                    "id": "Ok",
                    "click": function (el) {
                        Kanban.removeElement(el.dataset.eid)
                    },
                }
            ]
        }
    ]
});

var toDoButton = document.getElementById('addToDo');
toDoButton.addEventListener('click', function () {
    Kanban.addElement(
        "_todo", {
            "title": "Test Add",
        }
    );
});

var addBoardDefault = document.getElementById('addDefault');
addBoardDefault.addEventListener('click', function () {
    Kanban.addBoards(
        [{
            "id": "_default",
            "title": "Kanban Default",
            "item": [{
                    "title": "Default Item",
                },
                {
                    "title": "Default Item 2",
                },
                {
                    "title": "Default Item 3",
                }
            ]
        }]
    )
});

var removeBoard = document.getElementById('removeBoard');
removeBoard.addEventListener('click', function () {
    Kanban.removeBoard('_done');
});

var removeElement = document.getElementById('removeElement');
removeElement.addEventListener('click', function () {
    Kanban.removeElement('_test_delete');
});

var allEle = Kanban.getBoardElements('_todo');
allEle.forEach(function (item, index) {
    //console.log(item);
})