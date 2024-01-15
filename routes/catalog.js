const express = require('express');
const upload = require('../middleware/multer')
const authenticateToken = require('../middleware/auth');
const catalogItem = require('../model/catalogItem');

const router = express.Router();


router.post('/', authenticateToken, upload.array("file"), async (req, res) => {
    const description = req.body.description || null
    try {
    const imgArray = req.files.map(file => {
      return {
        data: file.buffer,
        contentType: file.mimetype
      };
    });

    const catalogItems = imgArray.map(img => {
      const catalogObj = {
          img: {
            data: img.data,
            contentType: img.contentType
          },
          category: req.body.category,
        }
      if (description) catalogObj.description = description;
      return catalogObj;
    });

    await Promise.all(catalogItems.map(item => catalogItem.create(item)))
    .then(() => {
      res.status(201).json({message: 'Catalog items added.'})
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:category', async (req, res) => {
  const pageSize = 9;
  const pageNumber = parseInt(req.query.pageNumber)
  const count = await catalogItem.countDocuments({ category: req.params.category });
  if (count===0) {
    res.status(404).json({message: 'No items found.'})
  } else {
  const showMore = count > pageNumber * pageSize;
  catalogItem.find({category:req.params.category}).sort({ timeStamp: -1 }).skip((pageNumber - 1) * pageSize).limit(pageSize)
    .then((items) => {
      const modifiedItems = items.map(item => ({
        id: item._id,
        category: item.category,
        description: item.description,
        img: {
          data: item.img.data.toString('base64'),
          contentType: item.img.contentType,
        },
        showMore: showMore,
      }));
      res.json(modifiedItems);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  }
});

router.delete('/:id', (req, res) => {
  catalogItem.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({
        message : "Photo deleted"
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
module.exports = router;