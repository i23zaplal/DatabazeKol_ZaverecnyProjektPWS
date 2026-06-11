const User = require('../models/users'); 
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        
       
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username: username,
            password: hashedPassword,
            role: 'user' 
        });
        
        await newUser.save();
        res.redirect('/login'); 
    } catch (error) {
        console.error(error);
        res.send("Chyba při registraci (uživatelské jméno už možná existuje).");
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        
        
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user._id; 
            req.session.role = user.role;
            res.redirect('/'); 
        } else {
            res.send("Špatné jméno nebo heslo.");
        }
    } catch (error) {
        console.error(error);
        res.send("Chyba při přihlášení.");
    }
};


exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};