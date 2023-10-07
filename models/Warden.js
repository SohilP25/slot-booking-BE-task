const mongoose = require('mongoose');

const SlotSchema = mongoose.Schema({
    date: Date,
    bookedBy: String
});

const WardenSchema = mongoose.Schema({
    universityID: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    slots: [SlotSchema]
});

module.exports = mongoose.model('Warden', WardenSchema);
