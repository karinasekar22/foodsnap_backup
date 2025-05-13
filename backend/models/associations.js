const Wishlist = require("./Wishlist");
const WishlistFood = require("./WishlistFood");
const ItemMakanan = require("./ItemMakanan");
const User = require("./User");
const Location = require("./Location");
const Restoran = require("./Restoran");
const Kategori = require("./kategori");
const LocationRestaurant = require("./LocationRestaurant");
const Comment = require("./Comment");
const CommentDetail = require("./CommentDetail");
const Nutrition = require("./Nutrition");

// Relasi Wishlist → WishlistFood
Wishlist.hasMany(WishlistFood, { foreignKey: "wishlist_id" });
WishlistFood.belongsTo(Wishlist, { foreignKey: "wishlist_id" });

// Relasi WishlistFood → ItemMakanan
ItemMakanan.hasMany(WishlistFood, { foreignKey: "item_makanan_id" });
WishlistFood.belongsTo(ItemMakanan, { foreignKey: "item_makanan_id" });

// Wishlist → User
User.hasMany(Wishlist, { foreignKey: "user_id" });
Wishlist.belongsTo(User, { foreignKey: "user_id" });

// Relasi Location → Restoran
Location.belongsToMany(Restoran, {
  through: LocationRestaurant,
  foreignKey: "location_id",
  otherKey: "restaurant_id",
});

Restoran.belongsToMany(Location, {
  through: LocationRestaurant,
  foreignKey: "restaurant_id",
  otherKey: "location_id",
});

Wishlist.belongsTo(ItemMakanan, {foreignKey: "item_makanan_id",});
ItemMakanan.hasMany(Wishlist, {foreignKey: "item_makanan_id",});

// Relasi dari Restoran ke Item Makanan
Restoran.hasMany(ItemMakanan, { foreignKey: "restoran_id" });
ItemMakanan.belongsTo(Restoran, { foreignKey: "restoran_id" });

// Relasi ItemMakanan → Kategori
ItemMakanan.belongsTo(Kategori, { foreignKey: "kategori_id" });
Kategori.hasMany(ItemMakanan, { foreignKey: "kategori_id" });

// Relasi: Comment dimiliki oleh User
Comment.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Comment, { foreignKey: "user_id" });

// Relasi: Comment berhubungan dengan ItemMakanan
Comment.belongsTo(ItemMakanan, { foreignKey: "item_makanan_id" });
ItemMakanan.hasMany(Comment, { foreignKey: "item_makanan_id" });

// Relasi: Comment → CommentDetail (1:N)
Comment.hasMany(CommentDetail, {
  foreignKey: "comment_id",
  as: "CommentDetails",
});

CommentDetail.belongsTo(Comment, { foreignKey: "comment_id" });

// Relasi: CommentDetail dimiliki oleh User
CommentDetail.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(CommentDetail, { foreignKey: "user_id" });

// Restoran dimiliki oleh User (umkm)
Restoran.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Restoran, { foreignKey: "user_id" });

// Komentar milik User
Comment.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Comment, { foreignKey: "user_id" });

// Komentar milik Item Makanan
Comment.belongsTo(ItemMakanan, { foreignKey: "item_makanan_id" });
ItemMakanan.hasMany(Comment, { foreignKey: "item_makanan_id" });

// Komentar milik Item Makanan
Comment.belongsTo(ItemMakanan, { foreignKey: "item_makanan_id" });
ItemMakanan.hasMany(Comment, { foreignKey: "item_makanan_id" });

// (Opsional) Jika kamu ingin support balasan komentar:
//Comment.hasMany(Comment, { as: 'replies', foreignKey: 'parent_id' });
//Comment.belongsTo(Comment, { as: 'parent', foreignKey: 'parent_id' });
ItemMakanan.hasOne(Nutrition, {foreignKey: 'item_makanan_id'});

Nutrition.belongsTo(ItemMakanan, {foreignKey: 'item_makanan_id'});