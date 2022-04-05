module.exports = function (sequelize, dataTypes) {
  const banners = sequelize.define("Banner", {
    imageUrl: {
      type: dataTypes.STRING(300),
      allowNull: false,
    },
    href: {
      type: dataTypes.STRING(200),
      allowNull: false,
    },
  });
  return banners;
};
