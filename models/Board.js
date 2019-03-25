const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: {
    type: String,
    required: false
  },

  board: [{
      "id": String,
      "title": String,
      "class": String,
      "dragTo": [String, String],
      "item": [{
          "id": String,
          "class": String,
          "title": String,
        },
        {
          "title": String,
          "id": String,
          "class": String,
        },
        {
          "id": String,
          "class": String,
          "title": String,
        },
      ]


    },
    {
      "id": String,
      "title": String,
      "class": String,
      "dragTo": [String, String],
      "item": [{
          "id": String,
          "class": String,
          "title": String,
        },
        {
          "title": String,
          "id": String,
          "class": String,
        },
        {
          "id": String,
          "class": String,
          "title": String,
        },
      ]


    },
    {
      "id": String,
      "title": String,
      "class": String,
      "dragTo": [String, String],
      "item": [{
          "id": String,
          "class": String,
          "title": String,
        },
        {
          "title": String,
          "id": String,
          "class": String,
        },
        {
          "id": String,
          "class": String,
          "title": String,
        },
      ]


    }
  ]
});

module.exports = mongoose.model("Boards", BoardSchema);