const router = require("express").Router();
const { Category, Product } = require("../../models");

// GET all Categories
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// code above is same as...
// Category.findAll({
//   include: [Product]
// })
// .then(categories => res.json(categories))
// .catch(err => res.status(500).json(err))


// GET a single Category
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No categories found with that id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Category.findOne({
//   where: {
//     id: req.params.id
//   },
//   include: [Product]
// })
// .then(categories => res.json(categories))
// .catch(err => res.status(500).json(err))

router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Category.create (req.body)
// .then(categories => res.json(categories))
// .catch(err => res.status(500).json(err))

router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Category.update(req.body, {
//   where: {
//     id: req.params.id,
//   },
// })
//   .then((categories) => res.json(categories))
//   .catch((err) => res.status(500).json(err));

router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
  
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Category.destroy({
//   where: {
//     id: req.params.id,
//   },
// })
//   .then((categories) => res.json(categories))
//   .catch((err) => res.status(500).json(err));


module.exports = router;
