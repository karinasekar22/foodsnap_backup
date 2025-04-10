-- ENUM untuk role

CREATE database foodsnapdb;

CREATE TYPE user_role AS ENUM ('admin', 'customer', 'umkm');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  role user_role NOT NULL DEFAULT 'customer',
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE restoran (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  restaurant_name VARCHAR NOT NULL,
  business_info TEXT,
  ppn DOUBLE PRECISION DEFAULT 0,
  discount DOUBLE PRECISION DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  open_at TIMESTAMP,
  closed_at TIMESTAMP,
  is_open BOOLEAN DEFAULT TRUE,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE item_makanan (
  id SERIAL PRIMARY KEY,
  restoran_id INTEGER NOT NULL,
  photo_url TEXT,
  caption TEXT,
  rating DOUBLE PRECISION DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_aktif BOOLEAN DEFAULT TRUE,

  FOREIGN KEY (restoran_id) REFERENCES restoran(id) ON DELETE CASCADE
);

CREATE TABLE comment (
  id SERIAL PRIMARY KEY,
  item_makanan_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (item_makanan_id) REFERENCES item_makanan(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comment_detail (
  id SERIAL PRIMARY KEY,
  comment_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,

  FOREIGN KEY (comment_id) REFERENCES comment(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE wishlist (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title VARCHAR DEFAULT 'Favoritku',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE wishlist_food (
  id SERIAL PRIMARY KEY,
  wishlist_id INTEGER NOT NULL,
  item_makanan_id INTEGER NOT NULL,

  FOREIGN KEY (wishlist_id) REFERENCES wishlist(id) ON DELETE CASCADE,
  FOREIGN KEY (item_makanan_id) REFERENCES item_makanan(id) ON DELETE CASCADE,
  UNIQUE (wishlist_id, item_makanan_id) -- prevent duplicates
);

CREATE TABLE location (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  address TEXT,
  city VARCHAR,
  lattitude TEXT,
  longitude TEXT
);

CREATE TABLE location_restaurant (
  id SERIAL PRIMARY KEY,
  location_id INTEGER NOT NULL,
  restaurant_id INTEGER NOT NULL,

  FOREIGN KEY (location_id) REFERENCES location(id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restoran(id) ON DELETE CASCADE
);
