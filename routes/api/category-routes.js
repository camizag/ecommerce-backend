const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoriesDB = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoriesDB);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoriesDB = await Category.findByPk(re.params.id, {
      include: [{model: Product}],
    });
    if(!categoriesDB) {
      res.status(404).json({message: "Couldn't find category."});
      return;
    }
    res.status(200).json(categoriesDB);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoriesDB = await Category.create(req.body);
    res.status(200).json({
      message: `New category with the name: ${categoriesDB.category_name} was created.`
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.delete('/:id', async (req, res) => {
  try {
    const categoriesDB = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoriesDB) {
      res.status(404).json({
        message: 'No category found.'
      });
      return;
    }
    res.status(200).json(categoriesDB);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
