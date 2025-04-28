const mongoose = require('mongoose');
const Users = mongoose.model('Users', {
    username : String,
    mobile: String,
    email: String,
    password: String,
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]

});

module.exports.ProductsToLike = (req, res) => {
        let productId = req.body.productId;
        let userId= req.body.userId;
    
        Users.updateOne(
            { _id: userId }, 
            { $addToSet: { likedProducts: productId } }
        )
        .then(() => {
            res.send({ message: 'liked success.' });
        })
        .catch(() => {
           res.send({ message: 'server err' });
        });
}

module.exports.ProductsToDisLike = (req, res) => {
    let productId = req.body.productId;
    let userId= req.body.userId;

    Users.updateOne(
        { _id: userId }, 
        { $pull: { likedProducts: productId } }
    )
    .then(() => {
        res.send({ message: 'Disliked success.' });
    })
    .catch(() => {
       res.send({ message: 'server err' });
    });
}

module.exports.signup = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const mobile = req.body.mobile;
    const email = req.body.email;

    const user = new Users({ username : username, password: password, mobile: mobile, email: email });
    user.save()
        .then(()=>{
            res.send({ message : "saved" })
        })
        .catch(()=>{
            res.send({ message: "server err" })
        })
}

const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    const username = req.body.username; 
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required" });
    }

    Users.findOne({ username: username }) 
        .then((result) => {
            if (!result) {
                return res.status(404).send({ message: "User not found" });
            }

            if (result.password === password) {
                const token = jwt.sign(
                    { data: result },
                    'MYKEY',
                    { expiresIn: '1h' }
                );
                res.send({ message: 'find success', token: token, userId: result._id, username: result.username });
            } else {
                res.status(401).send({ message: 'Password is incorrect' });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: "Server error" });
        });
};

module.exports.getuserById = (req, res) => {
    const _userId = req.params.uId;
    Users.findOne({ _id: _userId })
        .then((result) => {
            res.send({ message: 'success..', user: {email: result.email, mobile: result.mobile, username: result.username } });
        })
        .catch(() => {
            res.send({ message: 'server err' });
        });
}

module.exports.myprofileUserId = (req, res) => {
    let uid = req.params.userId;
    Users.findOne({ _id: uid })
        .then((result) => {
            res.send({ message: 'success', user: { email: result.email, mobile: result.mobile, username: result.username } });
        })
        .catch(() => {
            res.send({ message: 'server err' });
        });    
}

module.exports.likedProducts = (req, res) => {
    Users.findOne({ _id: req.body.userId}).populate('likedProducts')
        .then((result) => {
            if (!result) {
                return res.status(404).send({ message: 'User not found' });
            }
            res.send({ message: 'success', products: result.likedProducts});
        })
        .catch((err) => {
            res.send({ message: 'server err' });
        });
}