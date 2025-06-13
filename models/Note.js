const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {  
        type: [String],  
        default: [],  
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update `updatedAt` on save
noteSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;