module.exports = app => {
  const essays = require("../controllers/essay.controller.js");

  const router = require("express").Router();

  // Create a new Tutorial
  router.post("/", essays.create);

  // Retrieve all Tutorials get all
  router.get("/", essays.findAll);

  // Retrieve all published Tutorials
  router.get("/published", essays.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", essays.findOne);

  // Update a Tutorial with id
  router.put("/:id", essays.update);

  // Delete a Tutorial with id
  router.delete("/:id", essays.delete);

  // Delete all Tutorials
  router.delete("/", essays.deleteAll);

  app.use('/api/essays', router);
};
