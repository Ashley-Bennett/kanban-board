const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: {
    type: String,
    required: false
  },

  board: {
    "id": String,
    "title": String,
    "class": String,
    "dragTo": [String, String],
    "item": [{
        "id": String,
        "click": String,
        "title": String,
      },
      {
        "title": String,
        "id": String,
        "click": String,
      }
    ]


  }
});

module.exports = mongoose.model("Boards", BoardSchema);