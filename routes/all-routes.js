const passport = require('passport');
const admin = require('../models/admin');
const Info = require('../models/setting');
const router = require('express').Router();
const bcrypt = require('bcrypt');
// Setup Unauthenticated Routes
const unauthenticatedMid = (req,res,next)=>{
    
    if(req.isAuthenticated()){
            return res.redirect('/');
    }
    next();
}

const authenticatedMid = (req,res,next)=>{
    if(req.isAuthenticated()){
            return next()
    }
    res.redirect('/login');
}

// Login
router.get('/login',unauthenticatedMid,(req,res)=>{
    res.render('login');
})

router.post('/login',unauthenticatedMid,passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
    failureFlash:true
}))


// 
router.get('/',authenticatedMid,async (req,res)=>{
    let info = await Info.findOne({index:1}).select([
        'index',
        'name',
        'price',
        'min_amount',
        'coinbase_api_key',
        'coinbase_shared_secret',
        'wallet_address',
        'private_key',
        'total_supply',
        'circulating_supply',
        'holders',
        'ico_ends',
        'total_coin_purchased',
        'total_gas_paid',
        'holders_list'
    ]);
    res.render("index",{link:1,info});
})
router.post('/update',authenticatedMid,async (req,res)=>{
    try {
        let info = await Info.findOne({index:1}).select([
            'index',
            'name',
            'price',
            'min_amount',
            'coinbase_api_key',
            'coinbase_shared_secret',
            'wallet_address',
            'private_key',
            'total_supply',
            'circulating_supply',
            'holders',
            'ico_ends',
            'total_coin_purchased',
            'total_gas_paid',
            'holders_list'
        ]);
        info.name = req.body.name;
        info.price = req.body.price;
        info.min_amount = req.body.min_amount;
        info.coinbase_api_key = req.body.coinbase_api_key;
        info.coinbase_shared_secret = req.body.coinbase_shared_secret;
        info.wallet_address = req.body.wallet_address;
        info.private_key = req.body.private_key;
        info.total_supply = req.body.total_supply;
        info.circulating_supply = req.body.circulating_supply;
        info.holders = req.body.holders;
        await info.save();
        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})


// change Password
router.get('/change-password',authenticatedMid,async (req,res)=>{
    let info = await Info.findOne({index:1}).select([
        'index',
        'name',
        'price',
        'min_amount',
        'coinbase_api_key',
        'coinbase_shared_secret',
        'wallet_address',
        'private_key',
        'total_supply',
        'circulating_supply',
        'holders',
        'ico_ends',
        'total_coin_purchased',
        'total_gas_paid',
        'holders_list'
    ]);
    res.render("change-password",{link:2});
})
router.post('/update-password',authenticatedMid,async (req,res)=>{
    try {
        let user = await admin.findById(req.user);
    // console.log(user);
    if(req.body.password == req.body.confirm_password){
        user.password = bcrypt.hashSync(req.body.password,5);
        await user.save()
    }
    // res.render("change-password",{link:2});
    res.redirect('/change-password')
    } catch (error) {
    res.redirect('/change-password')
    }
})

// Fetch Settings
router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/login')
})
// Update Settings

module.exports = router;