CREATE TABLE category (
    id BIGINT PRIMARY KEY,
    category_name VARCHAR(120),
    category_desc VARCHAR(255)
);

CREATE TABLE author (
    id BIGINT PRIMARY KEY,
    author_name VARCHAR(255),
    author_bio TEXT
);

CREATE TABLE "user" (
    id BIGINT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(70),
    password VARCHAR(255),
    admin BOOLEAN
);

CREATE TABLE book (
    id BIGINT PRIMARY KEY,
    category_id BIGINT,
    author_id BIGINT,
    book_title VARCHAR(255),
    book_summary TEXT,
    book_price NUMERIC(5,2),
    book_cover_photo VARCHAR(20)
);

CREATE TABLE discount (
    id BIGINT PRIMARY KEY,
    book_id BIGINT,
    discount_start_date DATE,
    discount_end_date DATE,
    discount_price NUMERIC(5,2)
);

CREATE TABLE review (
    id BIGINT PRIMARY KEY,
    book_id BIGINT,
    review_title VARCHAR(120),
    review_details TEXT,
    review_date TIMESTAMP,
    rating_start VARCHAR(255)
);

CREATE TABLE "order" (
    id BIGINT PRIMARY KEY,
    user_id INTEGER,
    order_date TIMESTAMP,
    order_amount NUMERIC(8,2)
);

CREATE TABLE order_item (
    id BIGINT PRIMARY KEY,
    order_id BIGINT,
    book_id BIGINT,
    quantity SMALLINT,
    price NUMERIC(5,2)
);



-- Sửa độ dài cột last_name thành VARCHAR(50)
ALTER TABLE "user"
ALTER COLUMN last_name TYPE VARCHAR(50);

-- Sửa độ dài cột email thành VARCHAR(70)
ALTER TABLE "user"
ALTER COLUMN email TYPE VARCHAR(70);

ALTER TABLE "order"
ALTER COLUMN order_date TYPE timestamp(0);

ALTER TABLE review
ALTER COLUMN review_date TYPE timestamp(0);

-- book → category
ALTER TABLE book
ADD CONSTRAINT fk_book_category
FOREIGN KEY (category_id) REFERENCES category(id);

-- book → author
ALTER TABLE book
ADD CONSTRAINT fk_book_author
FOREIGN KEY (author_id) REFERENCES author(id);

-- discount → book
ALTER TABLE discount
ADD CONSTRAINT fk_discount_book
FOREIGN KEY (book_id) REFERENCES book(id);

-- review → book
ALTER TABLE review
ADD CONSTRAINT fk_review_book
FOREIGN KEY (book_id) REFERENCES book(id);

-- order_item → book
ALTER TABLE order_item
ADD CONSTRAINT fk_order_item_book
FOREIGN KEY (book_id) REFERENCES book(id);

-- order → users
ALTER TABLE "order"
ADD CONSTRAINT fk_order_user
FOREIGN KEY (user_id) REFERENCES "user"(id);

-- order_item → order
ALTER TABLE order_item
ADD CONSTRAINT fk_orderitem_order
FOREIGN KEY (order_id) REFERENCES "order"(id);


SELECT 
    column_name, 
    data_type, 
    character_maximum_length
FROM 
    information_schema.columns
WHERE 
    table_name = 'discount';


-- 1. category
INSERT INTO category (id, category_name,category_desc) VALUES 
(1, 'Science Fiction','des1'),
(2, 'Fantasy','des2');

-- 2. author
INSERT INTO author (id, author_name,author_bio) VALUES 
(1, 'Isaac Asimov','bio1'),
(2, 'J.R.R. Tolkien','bio2');

-- 3. book (phụ thuộc category & author)
INSERT INTO book (id, book_title, category_id, author_id) VALUES 
(1, 'Foundation', 1, 1),
(2, 'The Hobbit', 2, 2);

-- 4. discount (phụ thuộc book)
INSERT INTO discount (id, book_id, discount_price) VALUES 
(1, 1, 10),
(2, 2, 15);

-- 5. review (phụ thuộc book)
INSERT INTO review (id, book_id, rating_start, review_details) VALUES 
(1, 1, 5, 'Excellent read!'),
(2, 2, 4, 'Charming and classic.');

-- 6. users
INSERT INTO "user" (id, first_name, last_name, email, password, admin) VALUES 
(1, 'Alice', 'Nguyen', 'alice@example.com', 'hashed_pw1', false),
(2, 'Bob', 'Tran', 'bob@example.com', 'hashed_pw2', true);

-- 7. order (phụ thuộc users)
INSERT INTO "order" (id, user_id, order_date) VALUES 
(1, 1, '2025-04-14 10:00:00'),
(2, 2, '2025-04-14 12:30:00');

-- 8. order_item (phụ thuộc order & book)
INSERT INTO order_item (id, order_id, book_id, quantity) VALUES 
(1, 1, 1, 2),  -- Alice mua 2 Foundation
(2, 2, 2, 1);  -- Bob mua 1 The Hobbit

select * from category;;
select * from author;
select * from "user";
select * from book;
select * from "order";
select * from order_item;
select * from review;
select * from discount;






