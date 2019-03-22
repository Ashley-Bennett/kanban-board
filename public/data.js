const data = [{
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
