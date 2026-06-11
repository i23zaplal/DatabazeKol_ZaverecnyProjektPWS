const Bike = require('../models/kola'); 


exports.getAllBikes = async (req, res) => {
    try {
        const bikes = await Bike.find();
       
        res.render('index', { bikes: bikes, userId: req.session.userId });
    } catch (err) {
        console.error(err);
        res.send("Chyba při načítání databáze.");
    }
};


exports.getAddBikeForm = (req, res) => {
    
    if (!req.session.userId) return res.redirect('/login');
    res.render('addBike');
};


exports.createBike = async (req, res) => {
    try {
        const newBike = new Bike({
            name: req.body.name,
            type: req.body.type,
            level: req.body.level,
            description: req.body.description,
            image: req.file ? req.file.filename : null 
        });
        await newBike.save();
        res.redirect('/'); 
    } catch (err) {
        console.log(err);
        res.send("Chyba při ukládání kola.");
    }
};


exports.getEditForm = async (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    try {
        const bike = await Bike.findById(req.params.id);
        res.render('editBike', { bike: bike });
    } catch (err) {
        console.error(err);
        res.send("Položka nebyla nalezena.");
    }
};


exports.updateBike = async (req, res) => {
    try {
        const updatedData = {
            name: req.body.name,
            type: req.body.type,
            level: req.body.level,
            description: req.body.description
        };
        
        if (req.file) {
            updatedData.image = req.file.filename;
        }
        await Bike.findByIdAndUpdate(req.params.id, updatedData);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send("Chyba při úpravě.");
    }
};


exports.deleteBike = async (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    try {
        await Bike.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send("Chyba při mazání.");
    }
};