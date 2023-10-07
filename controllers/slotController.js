const Warden = require('../models/Warden');

exports.viewAllWardens = async (req, res) => {
    const wardens = await Warden.find({}, 'universityID slots');
    res.json(wardens);
};

exports.bookSlot = async (req, res) => {
    try {
        const wardenB = await Warden.findById(req.params.wardenId);
        
        if (!wardenB) {
            console.error(`Warden with ID ${req.params.wardenId} not found`);
            return res.status(404).send("Warden not found");
        }
        
        const sessionIndex = wardenB.slots.findIndex(s => 
            s.date.toString() === new Date(req.params.sessionDate).toString() && !s.bookedBy
        );
        
        if (sessionIndex === -1) {
            console.error(`Session on ${req.params.sessionDate} not available or already booked`);
            return res.status(400).send("Session not available");
        }

        wardenB.slots[sessionIndex].bookedBy = req.userId;
        await wardenB.save();
        res.send("Booked successfully");
        
    } catch (err) {
        console.error('Error in /book/:wardenId/:sessionDate endpoint:', err);
        res.status(500).send("Internal server error");
    }
};

exports.viewOwnSessions = async (req, res) => {
    const warden = await Warden.findById(req.userId, 'slots');
    res.json(warden.slots);
};
