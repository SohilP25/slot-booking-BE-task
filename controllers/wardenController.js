const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Warden = require('../models/Warden');

exports.register = async (req, res) => {
    const { universityID, password } = req.body;
    const existingWarden = await Warden.findOne({ universityID });
    
    if (existingWarden) {
        return res.status(400).send("Warden with this University ID already exists");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const nextThursday = new Date();
    nextThursday.setDate(nextThursday.getDate() + ((4 + 7 - nextThursday.getDay()) % 7));
    nextThursday.setHours(10, 0, 0, 0);
    const nextFriday = new Date(nextThursday);
    nextFriday.setDate(nextThursday.getDate() + 1);

    const warden = new Warden({
        universityID,
        password: hashedPassword,
        slots: [
            { date: nextThursday },
            { date: nextFriday }
        ]
    });

    try {
        await warden.save();
        res.status(201).send("Warden registered successfully");
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Error registering warden");
    }
};

exports.login = async (req, res) => {
    const { universityID, password } = req.body;
    const warden = await Warden.findOne({ universityID });
    if (warden && bcrypt.compareSync(password, warden.password)) {
        jwt.sign({ _id: warden._id }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
            res.json({ token });
        });
    } else {
        res.status(400).send("Invalid credentials");
    }
};
