const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product,
    });
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: Product
    });
    return category 
    ? res.status(200).json(category)
    : res.status(500).json({
        success: false,
        data: "the provided 'id' doesn't exist" 
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { category_name } = req.body;
    if (!category_name) {
      return res.status(500).json({
        success: false,
        data: "please provide a 'category_name' field" 
      })
    }
    const category = await Category.create({
      category_name: category_name
    })
    res.status(201).json({
      success: true,
      message: `category '${category_name}' has been added to the database!`,
      data: category.get({
        plain: true
      })
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(500).json({
        success: false,
        data: "the provided 'id' doesn't exist" 
      })
    }
    if (!category_name) {
      return res.status(500).json({
        success: false,
        data: "please provide a 'category_name' field" 
      })
    }
    await Category.update(
      {
        category_name: category_name
      },
      {
        where: {
          id: id
        }
      }
    );
    res.status(200).json({
      success: true,
      data: `category id '${id}' has been updated and saved to the database! Its new category name is ${category_name}`,
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(500).json({
        success: false,
        data: "the provided 'id' doesn't exist" 
      })
    }
    await Category.destroy({
      where: {
        id: id
      }
    })
    res.status(200).json({
      success: true,
      message: `category id '${id}' has been deleted from the database!`,
      data: category.get({
        plain: true
      })
    })
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
