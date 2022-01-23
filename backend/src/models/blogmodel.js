const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    url: {type: String, required: true}
},{
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("Blog",blogSchema);