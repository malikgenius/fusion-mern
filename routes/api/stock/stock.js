const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require('passport');
const Joi = require('joi');
// Load Profile Model
const Stock = require('../../../model/Stock');
const DeletedStock = require('../../../model/DeletedStock');
const User = require('../../../model/User');
// @route   GET api/stock/all
// @desc    Get all stocks
// @access  Private
router.get(
  '/all',
  // passport.authenticate('jwt', {
  //   session: false
  // }),
  (req, res) => {
    const errors = {};
    //paginate custom options we have to add all sorting, limiting etc in these options only.
    // console.log(req.query);
    const pageNumber = req.query.page;
    // if (req.query.page)
    // console.log(req.query.page);
    // paginate will send by default 10 records per page.
    // populate in pagination fixed by using it below, other ways do not work well with custom records from user.
    Stock.paginate(
      // we can leave the query empty like below if dont want any specific record.
      {},
      // below is the projection, even we can ask for few key values from the server, like only the name and date etc.
      {
        // limit will come from frontend header or params but if it doesnt, default || 10 i set it up.
        // for example { column: 1, _id: 0} this will only send us column and _id but if _id: 0 means not even id is required.

        limit: parseInt(20, 10) || 1,
        // page: page || 1,
        page: parseInt(pageNumber, 10) || 1,
        // sort by latest Date
        sort: { date: -1 }
      }
    )
      .then(stocks => {
        if (!stocks) {
          // errors.noprofile = 'There are no profiles';
          return res.status(404).json('There are no profiles');
        }
        // console.log(stocks);
        return res.json(stocks);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/stock/string .... to search _id or box as a string 2 int in db, bec regex wont search for int or objectID
// @desc    Get all stocks
// @access  Private
router.get(
  '/int',
  // passport.authenticate('jwt', {
  //   session: false
  // }),
  (req, res) => {
    console.log(req.query);
    const pageNumber = req.query.page;
    const search = req.query.search;
    const option = req.query.option;

    Stock.paginate(
      { [option]: { $in: search } },
      {
        limit: parseInt(20, 10) || 1,
        // page: page || 1,
        page: parseInt(pageNumber, 10) || 1,
        // sort by latest Date
        sort: { date: -1 }
      }
    )
      .then(stocks => {
        if (!stocks) {
          // errors.noprofile = 'There are no profiles';
          return res.status(404).json('There are no profiles');
        }
        // console.log(stocks);
        return res.json(stocks);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/stock/all
// @desc    Get all stocks
// @access  Private
router.get(
  '/search',
  // passport.authenticate('jwt', {
  //   session: false
  // }),
  (req, res) => {
    const errors = {};
    //paginate custom options we have to add all sorting, limiting etc in these options only.
    console.log(req.query);
    const pageNumber = req.query.page;
    const search = req.query.search.trim();
    const option = req.query.option;
    // if (option === 'box' || option === '_id') {
    // const mysearch = parseInt(search, 10);
    console.log(typeof search, search);
    // below will search the exact word upper or lower but not more that that.
    const regex = new RegExp(['^', search, '$'].join(''), 'i');
    //below will search for malik but if malikmazhar is available it will bring that as well. $ is not at the end will continue looking for similar words.
    const regexFree = new RegExp(['^', search].join(''), 'i');
    // will try below query tomorrow again .. this can be a game changer..
    // let query = Stock.find();
    // if (req.query.option === 'bay') {
    //   query.where({ bay: { $in: search } });
    // }
    // query
    //   .exec()
    Stock.paginate(
      //   // search by id or any other specific field
      //   // { _id: { $in: '5bbb1e19f07bf42c5741c2ea' } }, OR   // { column: { $in: search } },
      //   // query / search by option by using brakets [variable] to replace mongoose Key
      // below is suitable for box search as it searches in numbers and strings both but regex wont do it. or i dont know how to still
      // { [option]: { $in: search } },

      // Lets use Regular Expression to find UpperCase as well but only string, numbers can be search with below query
      // Not case sensitive ... case insensitive
      {
        [option]: { $in: regexFree }
      },
      //   // below will search in all given fields till it finds it. but it will look everywhere more load.
      // _id will not work with below as it requires ObjectId, and we need to do something like this.
      // var objId = new ObjectId( (search.length < 12) ? "123456789012" : search );
      // below is not working nested $in in $or
      // below will only work with exact words, case sensitive ***
      // { $or: [{ $in: [{ bay: search }] }, { $in: [{ column: search }] }] },
      // { [option]: { $in: [search] } },
      // { $or: [{ bay: search }, { column: search }, { sample: search }] },

      //   // we can leave the query empty like below if dont want any specific record.
      // {},
      {
        // limit will come from frontend header or params but if it doesnt, default || 10 i set it up.
        limit: parseInt(20, 10) || 1,
        // page: page || 1,
        page: parseInt(pageNumber, 10) || 1,
        // sort by latest Date
        sort: { date: -1 }
      }
    )
      .then(stocks => {
        if (!stocks) {
          // errors.noprofile = 'There are no profiles';
          return res.status(404).json('There are no profiles');
        }
        // console.log(stocks);
        return res.json(stocks);
      })
      .catch(err => res.status(404).json(err));
    // }
  }
);

// @route   GET api/stock/free-search
// @desc    Get all stocks matching string...
// @access  Private
router.get(
  '/freesearch',
  // passport.authenticate('jwt', {
  //   session: false
  // }),
  (req, res) => {
    const errors = {};
    //paginate custom options we have to add all sorting, limiting etc in these options only.
    console.log(req.query, 'i am free search');
    const pageNumber = req.query.page;
    const search = req.query.search.trim();
    //below will search for malik but if malikmazhar is available it will bring that as well. $ is not at the end will continue looking for similar words.
    const regexFree = new RegExp(['^', search].join(''), 'i');
    // below will search in all given options but only exact match will work, it doesnt bring similar like $in
    Stock.paginate(
      // below will search in any field and regex will help to find similars... it does not work on integers .. so box and depth are not aplicable
      {
        $or: [
          { bay: { $in: regexFree } },
          { row: { $in: regexFree } },
          { column: { $in: regexFree } },
          { side: { $in: regexFree } },
          { well: { $in: regexFree } },
          { sample: { $in: regexFree } },
          { status: { $in: regexFree } }
          // below are ints they are not applicable ... will have to find a way
          // { 'depth.min': { $in: regexFree } },
          // { 'depth.min': { $in: regexFree } }
        ]
      },
      {
        // limit will come from frontend header or params but if it doesnt, default || 10 i set it up.
        limit: parseInt(20, 10) || 1,
        // page: page || 1,
        page: parseInt(pageNumber, 10) || 1,
        // sort by latest Date
        sort: { date: -1 }
      }
    )
      .then(stocks => {
        if (!stocks) {
          return res.status(404).json('There are no profiles');
        }

        return res.json(stocks);
      })
      .catch(err => res.status(404).json(err));
    // }
  }
);

// @route   GET api/stock/total Aggregation Total Records to show on main page.
// @desc    Get box values Aggregation
// @access  Private
router.get(
  '/total',
  // passport.authenticate('jwt', {
  //   session: false
  // }),
  (req, res) => {
    const errors = {};
    // Stock.aggregate([{ $match: { box: '3' } }]).then(res => {
    //   console.log(res);
    // });
    Stock.aggregate([
      {
        $group: { _id: '', total_records: { $sum: 1 } }
      }
    ])
      .then(box => {
        console.log(box);
        res.json(box);
      })
      .catch(err => {
        console.log(err);
      });
  }
);

// @route   GET api/stock/box Aggregation different boxes to show on main page.
// @desc    Get box values Aggregation
// @access  Private
router.get(
  '/boxes',
  // passport.authenticate('jwt', {
  //   session: false
  // }),
  (req, res) => {
    const errors = {};
    // Stock.aggregate([{ $match: { box: '3' } }]).then(res => {
    //   console.log(res);
    // });
    Stock.aggregate([
      {
        $group: { _id: '$box', records: { $sum: 1 } }
      }
    ])
      .then(box => {
        console.log(box);
        res.json(box);
      })
      .catch(err => {
        console.log(err);
      });
  }
);
// @route   GET api/stock/id/:id
// @desc    Get stock by id
// @access  Private
router.get(
  '/id/:id',
  // passport.authenticate('jwt', {
  //   session: false
  // }),
  (req, res) => {
    // console.log(`PARAMS LOGS: ${req.params.id}`);
    Stock.findById(req.params.id)
      // it gets the profile by ID but not by handle .. need to research more on it.
      // Profile.findById(req.params.handle)
      .then(stock => {
        if (!stock) {
          // errors.noprofile = 'There is no profile for this user';
          console.log('Stock not found');
          return res.status(404).json('There is no Item Available');
        }
        // console.log(stock.column);
        res.json(stock);
      })
      .catch(err => res.status(404).json(err));
  }
);

// BarCode Generate PNG from Barcode.

const bwipjs = require('bwip-js');

// bwipjs.toBuffer(
//   {
//     bcid: 'code128', // Barcode type
//     text: '0123456789', // Text to encode
//     scale: 3, // 3x scaling factor
//     height: 10, // Bar height, in millimeters
//     includetext: true, // Show human-readable text
//     textxalign: 'center' // Always good to set this
//   },
//   function(err, png) {
//     if (err) {
//       // Decide how to handle the error
//       // `err` may be a string or Error object
//     } else {
//       // `png` is a Buffer
//       // png.length           : PNG file length
//       // : PNG image width
//       png.readUInt32BE(16);
//       // : PNG image height
//       png.readUInt32BE(20);
//       res.send(png);
//     }
//   }
// );

// @route   GET api/stock/stock/:stock_id
// @desc    Get Stock by Stock ID
// @access  Private

// router.get(
//   '/stock/:stock_id',
//   // passport.authenticate('jwt', {
//   //   session: false
//   // }),
//   (req, res) => {
//     const errors = {};
//     Stock.findById(req.params.stock_id)
//       .then(profile => {
//         if (!profile) {
//           return res
//             .status(404)
//             .json('There is no Stock available with given Id');
//         }
//         return res.json(profile);
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

// @route   GET api/stock/deleted
// @desc    Get all stocks
// @access  Private
router.get(
  '/deleted',
  // passport.authenticate('jwt', {
  //   session: false
  // }),
  (req, res) => {
    const errors = {};
    //paginate custom options we have to add all sorting, limiting etc in these options only.
    // console.log(req.query);
    const pageNumber = req.query.page;
    // if (req.query.page)
    // console.log(req.query.page);
    // paginate will send by default 10 records per page.
    // populate in pagination fixed by using it below, other ways do not work well with custom records from user.
    DeletedStock.paginate(
      // we can leave the query empty like below if dont want any specific record.
      {},
      // below is the projection, even we can ask for few key values from the server, like only the name and date etc.
      {
        // limit will come from frontend header or params but if it doesnt, default || 10 i set it up.
        // for example { column: 1, _id: 0} this will only send us column and _id but if _id: 0 means not even id is required.

        limit: parseInt(5, 10) || 1,
        // page: page || 1,
        page: parseInt(pageNumber, 10) || 1,
        // sort by latest Date
        sort: { date: -1 }
      }
    )
      .then(stocks => {
        if (!stocks) {
          // errors.noprofile = 'There are no profiles';
          return res.status(404).json('There are no profiles');
        }
        // console.log(stocks);
        return res.json(stocks);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/stock/deleted-stock/:stock_id
// @desc    Get Deleted Stock by Stock ID
// @access  Private

router.get(
  '/deleted-stock/:stock_id',
  // passport.authenticate('jwt', {
  //   session: false
  // }),
  (req, res) => {
    const errors = {};
    DeletedStock.findById(req.params.stock_id)
      .then(stock => {
        if (!stock) {
          return res
            .status(404)
            .json('There is no Stock available with given Id');
        }
        return res.json(stock);
      })
      .catch(err => res.status(404).json(err));
  }
);

// POST api/Profile
// @desc Create or Update user profile
// @Private Route
router.post(
  '/',
  // passport.authenticate('jwt', {
  //   session: false
  // }),
  (req, res) => {
    // console.log(req);
    // console.log(req.file);
    // console.log(`REQ ID: ${req.body.id}`);
    // console.log(req.headers);

    // Joi Validation starts here ..
    const {
      bay,
      column,
      row,
      side,
      well,
      depth,
      box,
      type,
      barcode,
      status,
      imageurl,
      imagepublicid,
      id
    } = req.body;
    // // Joi Scheme
    const schema = {
      id: Joi.string().allow(''),
      bay: Joi.string()
        .min(1)
        .max(40)
        .required(),
      column: Joi.string()
        .min(1)
        .max(400)
        .required(),
      row: Joi.string()
        .min(1)
        .max(100)
        .required(),
      side: Joi.string()
        .required()
        .min(1)
        .max(100),
      well: Joi.string()
        .min(1)
        .max(100)
        .required(),
      depth: Joi.object().keys({
        min: Joi.number()
          .integer()
          .min(1)
          .max(100000),
        max: Joi.number()
          .integer()
          .min(2)
          .max(100000)
      }),
      // depth: Joi.string()
      //   .required()
      //   .min(1)
      //   .max(400),
      box: Joi.number()
        .integer()
        .required()
        .allow(''),
      sample: Joi.string()
        .required()
        .min(1)
        .max(40),
      barcode: Joi.string()
        .min(1)
        .max(200)
        .allow(''),
      status: Joi.string().allow(''),
      imagepublicid: Joi.string()
        .allow('')
        .min(5)
        .max(300),
      imageurl: Joi.string()
        .allow('')
        .min(1)
        .max(300)
    };
    // Joi Validation Check
    const Validate = Joi.validate(req.body, schema);
    if (Validate.error) {
      console.log(Validate.error.details[0].message);
      return res.status(400).send(Validate.error.details[0].message);
    }

    // Get Fields for Profile -- WARNING HAVE TO CHECK THIS
    const stockFields = {
      bay: req.body.bay,
      column: req.body.column,
      row: req.body.row,
      side: req.body.side,
      well: req.body.well,
      depth: req.body.depth,
      box: req.body.box,
      sample: req.body.sample,
      barcode: req.body.barcode,
      status: req.body.status,
      imagepublicid: req.body.imagepublicid,
      imageurl: req.body.imageurl
    };

    Stock.findById(req.body.id)
      .then(stock => {
        if (stock) {
          // return console.log(stock);
          // findOneAndUpdate will update existing profile if it found one.
          // Stock.findOneAndUpdate(
          Stock.findByIdAndUpdate(
            req.body.id,
            { $set: stockFields },
            //new: true means res.json will return new updated profile, we dont provide new it will res.json(old profile)
            //its just to see new updated profile on the fly in return and frontEnd
            { new: true }
          ).then(stock => {
            // console.log(stock);
            return res.json(stock);
          });
        }
        // it will Create a profile for user but will check the handle first, its a unique property for each user.
        // Check if the handle exists  for SEO

        // Save Profile
        new Stock(stockFields).save().then(stock => {
          return res.json(stock);
        });
      })
      .catch(err => {
        return res.status(400).json(err);
      });
  }
);

// POST api/stock/edit
// @desc  Update Stock
// @Private Route
router.post(
  '/edit',
  // passport.authenticate('jwt', {
  //   session: false
  // }),
  (req, res) => {
    // Joi Validation starts here ..
    const {
      bay,
      column,
      row,
      side,
      well,
      depth,
      box,
      sample,
      barcode,
      status,
      imageurl,
      imagepublicid,
      id
    } = req.body;
    // // Joi Scheme
    const schema = {
      id: Joi.string().allow(''),
      bay: Joi.string()
        .min(1)
        .max(40)
        .required(),
      column: Joi.string()
        .min(1)
        .max(400)
        .required(),
      row: Joi.string()
        .min(1)
        .max(100)
        .required(),
      side: Joi.string()
        .required()
        .min(1)
        .max(100),
      well: Joi.string()
        .min(1)
        .max(100)
        .required(),
      depth: Joi.object().keys({
        min: Joi.number()
          .integer()
          .min(1)
          .max(100000),
        max: Joi.number()
          .integer()
          .min(2)
          .max(100000)
      }),
      box: Joi.number().required(),
      sample: Joi.string()
        .required()
        .min(1)
        .max(40),
      barcode: Joi.string()
        .min(1)
        .max(200)
        .allow(''),
      status: Joi.string().allow(''),
      imageurl: Joi.string()
        .allow('')
        .min(5)
        .max(300),
      imagepublicid: Joi.string()
        .allow('')
        .min(5)
        .max(200)
    };
    // Joi Validation Check
    const Validate = Joi.validate(req.body, schema);
    if (Validate.error) {
      // console.log(Validate.error.details[0].message);
      return res.status(400).send(Validate.error.details[0].message);
    }
    // edited Stock Array
    let stockFields = {};
    // Get Fields for Profile -- WARNING HAVE TO CHECK THIS
    stockFields = {
      bay: req.body.bay,
      column: req.body.column,
      row: req.body.row,
      side: req.body.side,
      well: req.body.well,
      depth: req.body.depth,
      box: req.body.box,
      sample: req.body.sample,
      barcode: req.body.barcode,
      status: req.body.status,
      imageurl: req.body.imageurl,
      imagepublicid: req.body.imagepublicid,
      edited_date: Date.now()
      // edited_stock: []
    };

    Stock.findById(req.body.id)
      .then(stock => {
        if (stock) {
          // below will remove all old edited_stock values from the array and will make it null so we can have only one older edited stock
          // if we dont do this, every stock will have edited_stock and that will have array [0, 1 ... ]
          // cant save the whole stock or edit or anything, has to do the hard work to take out all the fields and add some more like deleted_date & original_id then save this to deleted_stocks collection.
          // below will not add any edited stock but the pure stock will go to edited_stock array [], this way we can all all edited stocks only once ..
          let original_stock = {};
          original_stock._id = stock._id;
          original_stock.bay = stock.bay;
          original_stock.column = stock.column;
          original_stock.row = stock.row;
          original_stock.side = stock.side;
          original_stock.well = stock.well;
          original_stock.depth = stock.depth;
          original_stock.box = stock.box;
          original_stock.sample = stock.sample;
          original_stock.status = stock.status;
          original_stock.imageurl = stock.imageurl;
          original_stock.imagepublicid = stock.imagepublicid;
          original_stock.date = stock.date;
          if (stock.edited_date) original_stock.edited_date = stock.edited_date;

          // console.log(original_stock);

          Stock.findByIdAndUpdate(
            req.body.id,
            {
              bay: req.body.bay,
              column: req.body.column,
              row: req.body.row,
              side: req.body.side,
              well: req.body.well,
              depth: req.body.depth,
              box: req.body.box,
              sample: req.body.sample,
              barcode: req.body.barcode,
              status: req.body.status,
              imageurl: req.body.imageurl,
              imagepublicid: req.body.imagepublicid,
              edited_date: Date.now()
            },
            // { $set: stockFields },
            //new: true means res.json will return new updated profile, we dont provide new it will res.json(old profile)
            //its just to see new updated profile on the fly in return and frontEnd
            { new: true }
          ).then(stock => {
            // this will save every new edition at first place like 0 , 1 , 2
            stock.edited_stock.unshift(original_stock);
            stock.save().then(stock => res.json(stock));
            // return res.json(stock);
          });
        }
      })
      .catch(err => {
        return res.status(400).json(err);
      });
  }
);

// Delete Stock and Save it to DeletedStocks collection. we have to use router.get or post but not delete as router.delete might only work for deleting stock and not saving it other collection before.

router.post('/deletestock/:id', (req, res) => {
  Stock.findOne({ _id: req.params.id }).then(stock => {
    if (!stock) {
      return res.status(404).json('no user found');
    }
    // cant save the whole stock or edit or anything, has to do the hard work to take out all the fields and add some more like deleted_date & original_id then save this to deleted_stocks collection.
    let original_stock = {};
    // let original_stock = stock;
    original_stock.original_id = stock._id;
    original_stock.bay = stock.bay;
    original_stock.column = stock.column;
    original_stock.row = stock.row;
    original_stock.side = stock.side;
    original_stock.well = stock.well;
    original_stock.depth = stock.depth;
    original_stock.box = stock.box;
    original_stock.sample = stock.sample;
    original_stock.status = stock.status;
    original_stock.imageurl = stock.imageurl;
    original_stock.imagepublicid = stock.imagepublicid;
    original_stock.date = stock.date;
    original_stock.edited_stock = stock.edited_stock;
    if (stock.edited_date) original_stock.edited_date = stock.edited_date;
    original_stock.deleted_date = Date.now();

    new DeletedStock(original_stock).save().then(() => {
      Stock.findOneAndRemove({ _id: req.params.id }).then(() => {
        return res.json('Stock Deleted');
      });
    });
  });
});

// Delete User
// @Private Route
router.delete(
  '/deleteuser',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Deleting User should also delete the Profile as we cant let abendant profile without user.
    Profile.findOneAndDelete({ user: req.user.id }).then(() => {
      User.findOneAndDelete({ _id: req.user.id })
        .then(() => {
          return res.json('Sad to See you Going');
        })
        .catch(err => {
          return res.status(400).json('Something Went Wrong, Try again Later');
        });
    });
  }
);
module.exports = router;
