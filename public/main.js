const newBoard = document.getElementById("newBoard")
let data

newBoard.addEventListener("click", (e) => {
    e.preventDefault()

    



    // let boardName = "Hello"
    fetch(`/board`, {
        method: "post",
        body: {
            "title": "helo"
        }
    })
})