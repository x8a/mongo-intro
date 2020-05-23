const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function mayus(val) {
    return val.toUpperCase();
}

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        set: mayus
    },
    age: Number,
    bookPending: Boolean,
    avatarURL: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS18YDZmgMSKH_YgxIl5xroBN0c0eJmq0u56Y2iPV-atZBf0xJk&usqp=CAU"
    }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;