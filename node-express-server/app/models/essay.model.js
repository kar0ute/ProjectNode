module.exports = (sequelize, Sequelize) => {
  const Essay = sequelize.define("essay", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

return Essay;

};

