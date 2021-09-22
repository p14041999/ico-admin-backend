const mongo = require('mongoose');

const PurchaseSchema = new mongo.Schema({
    OrderID:{
        type:String,
        required:true,
        unique:true,
    },
    code:{
        type:String,
        required:true,
    },
    orderPending:{
        type:Boolean,
        default:false
    },
    isUnsolved:{
        type:Boolean,
        default:false,
    },
    isCanceled:{
        type:Boolean,
        default:false,
    },
    isFulfilled:{
        type:Boolean,
        default:false,
    },
    user_id:{
        type:mongo.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        // select:false,
    },
    amount:{
        type:Number,
        required:true
    },
    status:[
        {
            time:String,
            status: String,
            context:String,
            payment: {
                value: {
                  amount: Number,
                  currency: String
                },
                network: String,
                transaction_id: String
              }
        }
    ],
    addresses: {
        ethereum: String,
        usdc: String,
        dai: String,
        bitcoincash: String,
        dogecoin: String,
        litecoin: String,
        bitcoin: String
    },
    created_at:String,
    expires_at: String,
    pricing: {
        local: { amount: String, currency: String },
        ethereum: { amount: String, currency: String },
        usdc: { amount: String, currency: String },
        dai: { amount: String, currency: String },
        bitcoincash: { amount: String, currency: String },
        dogecoin: { amount: String, currency: String },
        litecoin: { amount: String, currency: String },
        bitcoin: { amount: String, currency: String }
    },
    statusText:{
        type:String,
        default:"New"
    }
});

module.exports = mongo.model("Purchase",PurchaseSchema);