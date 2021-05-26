const express = require('express');
const db = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

const app = express();


 
let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

app.use(cors({corsOptions}))

app.use(express.json());
// Environmental setup

dotenv.config({ path: './config.env' });
const dbURL = process.env.DATABASE_CON.replace(
  '<password>',
  process.env.DATABASE_PASS
);

// Database connection

db.connect(dbURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(() => console.log('successfully connected to the database'));

// Creating a new Schema for the app

const SlotSet = new db.Schema({
  Date: {
    type: String,
    required: true,
    unique:true
  },
  slot_1: String,
  slot_2: String,
  slot_3: String,
  slot_4: String,
});
const cusSet = new db.Schema({ name: String, id: Number });
const settledSet  = new db.Schema({
  Cus_Id: {
    type: String,
    required: true,
  },
  Cus_Name:  {
    type: String,
    required: true,
  },
  Pick: {
    type: String,
    required: true,
  },
  Drop:  {
    type: String,
    required: true,
  },
  Date:String
});

const Settled = db.model('settled',settledSet);
const Slot = db.model('Slots', SlotSet);
const Customers = db.model('customers', cusSet);

//creating the endpoints for the api

const Route = express.Router();

Route.route('/customers')
.get(async (req, res) => {
  try {
    let query = { ...req.query };
    const exception = ['page', 'limit'];
    exception.map((el) => delete query[el]);

    let Customer = Customers.find(query);
    const Total = await Customers.countDocuments();
    if (req.query.page || req.query.limit) {
      let skip = (+req.query.page - 1) * +req.query.limit;

      if (skip >= Total)
        skip = (Math.ceil(Total / +req.query.limit) - 1) * +req.query.limit;
      Customer = Customer.skip(skip).limit(+req.query.limit);
    }

    let response = await Customer;
    res.json({
      status: 'success',
      TotalDb: Total,
      result: response.length,
      data: [...response],
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err,
    });
  }
});

Route.route('/customers/:id')
.delete((req, res) => {
  console.log(req.params.id);
  try {
    Customers.findByIdAndDelete(req.params.id).then(() => res.json('deleted'));
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err,
    });
  }
});



Route.route('/settled')
.get(async (req, res) => {
    try {
     const response =await Settled.find();
      res.json({
        status: 'success',
        data: [...response]
      });
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        message: err,
      });
    }
  })
  .post(async (req, res) => {
        try {
            console.log(req.body);
          const response = await Settled.create(req.body);
    
         res.status(200).json({
           status: 'success storing to db',
           data: response,
         });
       } catch (err) {
         res.status(500).json({
           status: 'failed',
           message: err,
         });
       }
     });

Route.route('/slots')
 .post(async (req, res) => {
   try {
    
     const response =await Slot.create(req.body);

      res.status(200).json({
        status: 'success storing to db',
        data: response,
      });
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        message: err,
      });
    }
  })
  .get(async(req,res) => {
    try {
      const response =await Slot.find();
 
       res.status(200).json({
         status: 'success storing to db',
         data: response,
       });
     } catch (err) {
       res.status(500).json({
         status: 'failed',
         message: err,
       });
     }
   })


Route
  .route('/slots/:Date')
  .get(async(req, res) => {
    try {
      Slot.find(req.params).then((resp) => {
        res.json({
          status: 'success',
          data: resp,
        });
      });
    } catch (e) {
      res.status(500).json({
        status: 'failed',
        data: e,
      });
    }
  })
  .patch((req, res) => {
    try {
  
      Slot.findOneAndUpdate({Date:req.params.Date}, req.body, { new: true }).then(
        (resp) => {
          res.json({
            status: 'success',
            data: resp,
          });
        }
      );
    } catch (e) {
      res.status(500).json({
        status: 'failed',
        data: e,
      });
    }
  })


app.use('/api', Route);

const port = 3500;
app.listen(port, () => {
  console.log('listing on ', port);
});
