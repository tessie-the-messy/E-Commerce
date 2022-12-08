const router = require("express").Router();
const { Category, Product } = require("../../models");

// GET all Categories
// does below need async?
router.get("/", async (req, res) => {
// Category.findAll({
//   include: [Product]
// })
// .then(categories => res.json(categories))
// .catch(err => res.status(500).json(err))
try {
  const categoryData = await Category.findAll({
    include: [Product],
  });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

// GET a single Category
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  })
  .then(categories => res.json(categories))
  .catch(err => res.status(500).json(err))
  });
  //try {
  //  const categoryData = Category.findByPk(req.params.id, {
  //    include: [{ model: Product }],
  //  });
//
  //  if (!categoryData) {
  //    res.status(404).json({ message: 'No categories found with that id!' });
  //    return;
  //  }
//
  //  res.status(200).json(categoryData);
  //} catch (err) {
  //  res.status(500).json(err);
  //}
//});

router.post("/", (req, res) => {
  Category.create (req.body)
  .then(categories => res.json(categories))
  .catch(err => res.status(500).json(err))
});
// try {
//   const categoryData = Category.create(req.body);
//   res.status(200).json(categoryData);
// } catch (err) {
//   res.status(400).json(err);
// }

router.put("/:id", (req, res) => {
 Category.update (req.body,{
  where: {
    id: req.params.id
  }
 })
  .then(categories => res.json(categories))
  .catch(err => res.status(500).json(err))
});

router.delete("/:id", (req, res) => {
  Category.destroy ({
    where: {
      id: req.params.id
    }
   })
    .then(categories => res.json(categories))
    .catch(err => res.status(500).json(err))
});

// try {
//   const categoryData = Category.destroy({
//     where: {
//       id: req.params.id,
//     },
//   });

//   if (!categoryData) {
//     res.status(404).json({ message: 'No category found with that id!' });
//     return;
//   }

//   res.status(200).json(categoryData);
// } catch (err) {
//   res.status(500).json(err);
// }

module.exports = router;
