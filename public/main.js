const newBoard = document.getElementById("newBoard")
const findBoard = document.getElementById("find")
const search = document.getElementById("search")

let returnData = {}

let newdata = {
    "board": {
        "id": "_todo",
        "title": "To Do",
        "class": "info,good",
        "dragTo": ["_working", "_done"],
        "item": [{
                "id": "_test_delete",
                "click": " function (el) {Kanban.removeElement(el.dataset.eid)}",
                "title": "testing 123"
            },
            {
                "title": "also tetsdfgv",
                "id": "click",
                "click": "function (el) {Kanban.removeElement(el.dataset.eid)}",
            }
        ]
    }
}

newBoard.addEventListener("click", (e) => {
    e.preventDefault()

    // let boardName = "Hello"
    fetch(`/board`, {
        method: "post",
        body: JSON.stringify(newdata),
        headers: {
            'Content-type': 'application/json',
        }
    })

})

findBoard.addEventListener("click", (e) => {
    e.preventDefault()

    let id = search.value
    // console.log(id)
    fetch(`/board/${id}`).then((response) => {
        return response.json()
    }).then((myJson) => {
        console.log (JSON.stringify(myJson));
    })

})
