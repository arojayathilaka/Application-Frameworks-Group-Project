const router = require('express').Router();
const Image = require('../../models/store-manager/image.model');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
    }
});

const upload = multer({ storage: storage });

/**
 * Add a new product image to the database
 * @param {number} imgId Id of the image
 * @param Image file path
 * @returns success or error message
 */
router.route('/add').post(upload.single('file'), (req, res) => {
    const data = fs.readFileSync(req.file.path);
    const contentType = 'image/jpeg';
    const imgId = Number(req.body.imageId);
    const newImage = new Image({
        img: {
            data: data,
            contentType: contentType
        },
        imgId: imgId
    });
    // newImage.img.data = fs.readFileSync(req.file.path);
    // newImage.img.contentType = 'image/jpeg';  // or 'image/png'
    newImage.save()
        .then(() => res.send({message: 'Image added to the db!'}))
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

router.route('/image').get((req, res) => {
    // Image.findOne({}, (err, img) => {
    //     if (err)
    //         res.send(err);
    //     console.log(img);
    //     res.contentType('json');
    //     res.send(img);
    // }).sort({ createdAt: 'desc' });
    Image.findOne()
        .sort({createdAt: 'desc'})
        .then(image => {
            res.status(200).send(image);
            console.log(image);
        })
        .catch(err => {
            res.status(400).send({message: 'Error: ' + err})
        });
});

/**
 * Get all the images from the database
 * @returns {Image[]} array of images / error message
 */
router.route('/').get((req, res) => {
   // Image.find({}, (err, images) => {
   //     if (err)
   //         // res.send(err);
   //         res.status(400).send('Error: ' + err);
   //     console.log(images);
   //     res.contentType('json');
   //     //res.send(img);
   //     res.status(200).send(images);
   //     //const imgArray = img.map(element => element._id);
   //     //res.send(imgArray);
   // });
    Image.find()
        .then(images => {
            res.contentType('json');
            res.status(200).send(images);
            console.log(images);
        })
        .catch(err => {
            res.status(400).send({message: 'Error: ' + err})
        });

});

/**
 * Delete an image from the database
 * @param object id of the image
 * @returns success or error message
 */
router.route('/delete/:id').delete((req, res) => {
    Image.findByIdAndDelete(req.params.id)
        .then(() => res.send({message: 'Image deleted!'}))
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        )
});

/**
 * Update product image
 * @param object id of the image
 * @param Image file path
 * @param {number} imgId Id of the image
 * @returns success or error message
 */
router.route('/update/:id').post(upload.single('file'), (req, res) => {
    Image.findById(req.params.id)
        .then(image => {
            image.img.data = fs.readFileSync(req.file.path);
            image.img.contentType = 'image/jpeg';
            image.imgId =  req.body.imageId;

            image.save()
                .then(() => res.send({message:'Product updated!'}))
                .catch(err =>
                    res.status(400).send({message: 'Error: ' + err})
                );
        })
        .catch(err =>
            res.status(400).send({message:'Error: ' + err})
        );
});
// app.get('/images/:filename', (req, res) => {
//     gfs.files.findOne({filename: req.params.filename}, (err, file) => {
//         if (!file || file.length === 0){
//             return res.status(404).json('no file exists');
//         } else {
//             //return res.json(file);
//             if(file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//                 const readStream = gfs.createReadStream(file.filename);
//                 readStream.pipe(res);
//             } else {
//                 return res.json('not an image')
//             }
//         }
//     })
// });

// router.route('/').get((req, res) => {
//     Image.findOne({}, 'img createdAt', (err, img) => {
//         if (err)
//             res.send(err);
//         console.log(img);
//         res.contentType('json');
//         res.send(img);
//     }).sort({ createdAt: 'desc' });
    // Image.find().toArray((err, images) => {
    //     if (err)
    //         res.send(err);
    //     console.log(images);
    //     res.contentType('json');
    //     res.send(images);
    // })
//});

// app.get('/images', (req, res) => {
//     gfs.files.find().toArray((err, files) => {
//         if (!files || files.length === 0){
//             return res.status(404).json('no files exist');
//         } else {
//             return res.json(files);
//         }
//     });
// });



module.exports = router;