const Wishlist = require('./Wishlist');
const WishlistFood = require('./WishlistFood');
const ItemMakanan = require('./ItemMakanan');
const User = require('./User');

// Relasi Wishlist → WishlistFood
Wishlist.hasMany(WishlistFood, { foreignKey: 'wishlist_id' });
WishlistFood.belongsTo(Wishlist, { foreignKey: 'wishlist_id' });

// Relasi WishlistFood → ItemMakanan
ItemMakanan.hasMany(WishlistFood, { foreignKey: 'item_makanan_id' });
WishlistFood.belongsTo(ItemMakanan, { foreignKey: 'item_makanan_id' });

// Wishlist → User (kalau kamu butuh ini juga)
User.hasMany(Wishlist, { foreignKey: 'user_id' });
Wishlist.belongsTo(User, { foreignKey: 'user_id' });
