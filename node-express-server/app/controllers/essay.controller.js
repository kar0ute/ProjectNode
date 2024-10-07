const db = require("../models");
const Essay = db.essays;
const Op = db.Sequelize.Op;

// Create and Save a new Essay
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Essay
  const essay = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Essay in the database
  Essay.create(essay)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Essay."
      });
    });
};

// Retrieve all essays from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Essay.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving essays."
      });
    });
};

// Find a single Essay with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Essay.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Essay with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Essay with id=" + id
      });
    });
};

// Update a Essay by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Essay.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Essay was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Essay with id=${id}. Maybe Essay was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Essay with id=" + id
      });
    });
};

// Delete a Essay with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Essay.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Essay was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Essay with id=${id}. Maybe Essay was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Essay with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Essay.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Essays were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all essays."
      });
    });
};

// find all published Essay
exports.findAllPublished = (req, res) => {
  Essay.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving essays."
      });
    });
};
