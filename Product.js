const mongoose = require('mongoose'); 
const Products = mongoose.model('Products', {
    pname: String, 
    pdesc: String, 
    price: String, 
    category: String, 
    pimage: String,
    pimage2: String,
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
});
const { Users } = require('./User');

module.exports.Products = Products; 

module.exports.search = (req, res) => {
    let search = req.query.search || ''; 
    Products.find({
        $or: [
            { pname: { $regex: new RegExp(search, "i") } },
            { pdesc: { $regex: new RegExp(search, "i") } },
            { price: { $regex: new RegExp(search, "i") } }
        ]
    })
    .then((results) => {
        res.send({ message: 'success', products: results });
    })
    .catch((err) => {
        res.status(500).send({ message: 'server error' });
    });
};

module.exports.addProduct  = (req, res)=>{
        const pname = req.body.pname;
        const pdesc = req.body.pdesc;
        const price = req.body.price;
        const category = req.body.category;
        const pimage = req.files.pimage[0].path;
        const pimage2 = req.files.pimage2[0].path;
        const addedBy = req.body.userId;
    
        const product = new Products({ pname, pdesc, price, category, pimage, pimage2, addedBy });
    
        product.save()
           .then(() => {
               res.send({ message: 'saved success.' });
            })
            .catch(() => {
               res.send({ message: 'server err' });
            });
    
}

module.exports.editProduct  = (req, res)=>{

    const pid = req.body.pid;
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const price = req.body.price;
    const category = req.body.category;

    let pimage = '';
    let pimage2 = '';

    if(req.files && req.files.pimage && req.files.pimage.length > 0){
        pimage = req.files.pimage[0].path;
    }
    if(req.files && req.files.pimage2 && req.files.pimage2.length > 0){
        pimage2 = req.files.pimage2[0].path;
    }
     
    let editObj = {};

    if(pname){
        editObj.pname = pname;
    }
    if(pdesc){
        editObj.pdesc = pdesc;  
    }
    if(price){
        editObj.price = price;      
    }
    if(category){
        editObj.category = category;  
    }
    if(pimage){
        editObj.pimage = pimage;  
    }
    if(pimage2){
        editObj.pimage2 = pimage2;  
    }    

    Products.updateOne({ _id: pid }, editObj, { new:true })
       .then((result) => {
           res.send({ message: 'saved success.', product: result });
        })
        .catch(() => {
           res.send({ message: 'server err' });
        });

}

module.exports.getProducts = (req, res) => {
    const catName = req.query.catName;

    const query = catName ? { category: new RegExp("^" + catName + "$", "i") } : {};

    Products.find(query)
        .then((result) => { 
            res.send({ message: 'success', products: result });
        })
        .catch((err) => {
            res.send({ message: 'server err' });
        });
}

module.exports.getProductsById = (req, res) => {
    Products.findOne({ _id: req.params.pId})
        .then((result) => {
            res.send({ message: 'success', product: result});
        })
        .catch((err) => {
            res.send({ message: 'server err' });
        });
}

module.exports.myProducts = (req, res) => {
    const userId = req.body.userId;
    Products.find({ addedBy:  userId }) 
        .then((result) => {
            res.send({ message: 'success', products: result});
        })
        .catch((err) => {
            res.send({ message: 'server err' });
        });
}

module.exports.deleteProduct = (req, res) => {
    console.log(req.body);

    Products.findOne({ _id: req.body.pid })
            .then((result) =>{
                if(result.addedBy == req.body.userId){
                    Products.deleteOne({ _id: req.body.pid })
                        .then((deleteResult)=>{
                            if(deleteResult.acknowledged){
                                res.send({ message: 'success' });
                            }
                        })
                        .catch(()=>{
                            res.send({ message: 'server err' });
                        })
                }
            })
            .catch(() => {
                res.send({ message: 'server err' });
            })
}