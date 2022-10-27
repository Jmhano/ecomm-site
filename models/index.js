const Category = require("./Category");
const Product = require("./Product");
const ProductTag = require("./ProductTag");
const Tag = require("./Tag");

//creating associations


Product.belongsTo(Category, {
  foreignKey: "category_id"
});
Category.hasMany(Product, {
    foreignKey: "category_id"
  });
Product.belongsToMany(Tag, {
    foreignKey: "tag_name"
});

ProductTag.hasMany(Tag, {
    foreignKey: "tag_name"
});

Tag.belongsToMany(Product, {
    foreignKey: "product_name"
});

module.exports = { Category, Product, ProductTag, Tag };

