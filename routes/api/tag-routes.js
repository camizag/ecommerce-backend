const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const tagDB = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(202).json(tagDB);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagDB = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!tagDB) {
      res.status(404).json({
        message: "Couldn't find the tag."
      });
      return;
    }
    res.status(200).json(tagDB);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagDB = await Tag.create(req.body);
    res.status(200).json(tagDB);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try  {
    const tagDB = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if  (!tagDB) {
      res.status(404),json({
        message: "Couldn't find tag."
      });
      return;
    }
    res.status(200).json(tagDB);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
