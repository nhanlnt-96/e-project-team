-- auto-generated definition
create table user
(
    id             int auto_increment
        primary key,
    address_detail longtext                             null,
    phone_number   varchar(10)                          not null,
    email          varchar(255)                         not null,
    password       text                                 not null,
    full_name      varchar(255)                         not null,
    verify_email   tinyint(1) default 0                 not null comment '0: not verify; 1: verified',
    dob            datetime   default CURRENT_TIMESTAMP not null,
    gender         tinyint(1)                           not null comment '0: female; 1: male'
);

-- auto-generated definition
create table role
(
    id        int auto_increment
        primary key,
    role_name varchar(255) not null
);

-- auto-generated definition
create table user_role
(
    user_id int not null,
    role_id int not null,
    constraint user_role_role_id_fk
        foreign key (role_id) references role (id),
    constraint user_role_user_id_fk
        foreign key (user_id) references user (id)
);

-- auto-generated definition
create table token
(
    id         int auto_increment
        primary key,
    name       varchar(255) not null,
    token      varchar(255) not null,
    created_at datetime     not null,
    user_id    int          not null,
    constraint token_user_id_fk
        foreign key (user_id) references user (id)
);

-- auto-generated definition
create table product_category
(
    category_id          int auto_increment
        primary key,
    category_name        varchar(255) not null,
    category_slug        varchar(255) not null,
    category_image_name  varchar(255) not null,
    storage_name         varchar(255) not null,
    category_description text         not null
)
    collate = utf8mb3_unicode_ci;

-- auto-generated definition
create table product
(
    product_id   int auto_increment
        primary key,
    description  longtext     not null,
    product_name varchar(255) not null,
    category_id  int          not null,
    constraint category_id
        foreign key (category_id) references product_category (category_id)
)
    collate = utf8mb3_unicode_ci;

-- auto-generated definition
create table product_image
(
    image_id     int auto_increment
        primary key,
    image_name   varchar(255) not null,
    storage_name varchar(255) not null,
    product_id   int          null,
    constraint product_id
        foreign key (product_id) references product (product_id)
);

-- auto-generated definition
create table net_weight
(
    id               int auto_increment
        primary key,
    net_weight_value int          not null,
    net_weight_label varchar(255) not null
);

-- auto-generated definition
create table product_quantity
(
    id            int auto_increment
        primary key,
    net_weight_id int not null,
    product_id    int not null,
    quantity      int not null,
    price         int not null,
    constraint product_quantity_net_weight_id_fk
        foreign key (net_weight_id) references net_weight (id),
    constraint product_quantity_product_product_id_fk
        foreign key (product_id) references product (product_id)
);

-- auto-generated definition
create table product_favorite
(
    user_id    int not null,
    product_id int not null,
    id         int auto_increment
        primary key,
    constraint product_favorite_product_product_id_fk
        foreign key (product_id) references product (product_id),
    constraint product_favorite_user_id_fk
        foreign key (user_id) references user (id)
);

-- auto-generated definition
create table cart
(
    id         int auto_increment
        primary key,
    user_id    int      not null,
    created_at datetime not null,
    constraint cart_user_id_fk
        foreign key (user_id) references user (id)
);

-- auto-generated definition
create table product_cart
(
    id            int auto_increment
        primary key,
    product_id    int not null,
    net_weight_id int not null,
    quantity      int not null,
    cart_id       int not null,
    constraint product_cart_cart_id_fk
        foreign key (cart_id) references cart (id),
    constraint product_cart_net_weight_id_fk
        foreign key (net_weight_id) references net_weight (id),
    constraint product_cart_product_product_id_fk
        foreign key (product_id) references product (product_id)
);

-- auto-generated definition
create table news
(
    id             int auto_increment
        primary key,
    news_title     varchar(255) not null,
    news_body      longtext     not null,
    created_at     datetime     not null,
    news_cover_img varchar(255) not null
);

-- auto-generated definition
create table orders
(
    id               int auto_increment
        primary key,
    shipping_status  int          not null comment '0:delivered;1:shipping;2:cancel',
    user_id          int          not null,
    created_at       datetime     not null,
    payment_method   int          not null comment '0:cod;1:paypal',
    payment_status   int          not null comment '0:paid;1:pending',
    shipping_address varchar(255) not null,
    receiver_name    varchar(255) not null,
    receiver_phone   varchar(255) not null,
    constraint orders_user_id_fk
        foreign key (user_id) references user (id)
);

-- auto-generated definition
create table order_item
(
    id            int auto_increment
        primary key,
    order_id      int not null,
    product_id    int not null,
    net_weight_id int not null,
    quantity      int not null,
    price         int not null,
    constraint order_item_net_weight_id_fk
        foreign key (net_weight_id) references net_weight (id),
    constraint order_item_orders_id_fk
        foreign key (order_id) references orders (id),
    constraint order_item_product_product_id_fk
        foreign key (product_id) references product (product_id)
);

-- auto-generated definition
create table payment_info
(
    id                 int auto_increment
        primary key,
    order_id           int          not null,
    payment_id         varchar(255) not null,
    payment_created    datetime     not null,
    payee_email        varchar(255) not null,
    payee_name         varchar(255) not null,
    payment_capture_id varchar(255) not null,
    constraint payment_info_orders_id_fk
        foreign key (order_id) references orders (id)
);

-- auto-generated definition
create table store_info
(
    id           int auto_increment
        primary key,
    store_name   varchar(255) not null,
    address      longtext     not null,
    phone_number varchar(255) not null,
    store_image  varchar(255) not null
);

-- auto-generated definition
create table store_open_hour
(
    id        int auto_increment
        primary key,
    store_id  int          not null,
    day       int          not null,
    from_time varchar(255) not null,
    to_time   varchar(255) not null,
    constraint store_open_hour_store_info_id_fk
        foreign key (store_id) references store_info (id)
);

-- insert role data
INSERT INTO plant_x_db.role (id, role_name)
VALUES (1, 'ROLE_ADMIN');
INSERT INTO plant_x_db.role (id, role_name)
VALUES (2, 'ROLE_USER');

-- insert user data
INSERT INTO plant_x_db.user (id, address_detail, phone_number, email, password, full_name, verify_email, dob, gender)
VALUES (12, null, '0981939841', 'admin@mail.com', '$2a$12$UF.OaiswMXRL0yaZD5yJN.QPFeOQKtQ15rquohgPANT/DBuVfCj6i',
        'Admin Account', 0, '2023-05-05 21:23:05', 1);
INSERT INTO plant_x_db.user (id, address_detail, phone_number, email, password, full_name, verify_email, dob, gender)
VALUES (13, null, '123456789', 'customer@gmail.com', '$2a$12$UF.OaiswMXRL0yaZD5yJN.QPFeOQKtQ15rquohgPANT/DBuVfCj6i',
        'User Account', 1, '2023-05-05 21:23:05', 1);

-- inset user role data
INSERT INTO plant_x_db.user_role (user_id, role_id)
VALUES (12, 1);
INSERT INTO plant_x_db.user_role (user_id, role_id)
VALUES (13, 2);

-- inset product category
INSERT INTO plant_x_db.product_category (category_id, category_name, category_slug, category_image_name, storage_name,
                                         category_description)
VALUES (8, 'Loose Leaf Teas', '779248a1-93d7-4806-835d-e309bef61dbb-loose-leaf-teas',
        'b31bdec8-decc-42a5-bc01-34e7d7ff1d00-loose-leaf-teas.jpeg', 'categories',
        '<p>Choose from our selection of over 800 different varieties of single estate fine harvests and exclusive tea blends!<br>Find your favourite tea in a few quick clicks using our Refine Results function below.</p>');
INSERT INTO plant_x_db.product_category (category_id, category_name, category_slug, category_image_name, storage_name,
                                         category_description)
VALUES (9, 'Packaged Loose Leaf Teas', '9b81323f-e0b8-4fc0-8e05-019c8f6e7194-packaged-loose-leaf-teas',
        '6e6737c0-49c0-4066-bdf8-1dc8d81776b0-packaged-loose-leaf-teas.jpeg', 'categories',
        '<p>Containing the exact teas as those in our Loose Tea collection, our award-winning Packaged Teas make the perfect gift.</p>');
INSERT INTO plant_x_db.product_category (category_id, category_name, category_slug, category_image_name, storage_name,
                                         category_description)
VALUES (10, 'Teabags', '28047c6c-a57a-41be-8e7d-263b3343d66d-teabags',
        'a8313ef9-4ff0-42f4-898c-019d0016d5dd-teabags.jpeg', 'categories',
        '<p>These hand sewn, 100% cotton TWG Teabags allow our whole leaf teas to develop their full and unique aroma and give them ample room to expand during infusion and contain 2&frac12; grams of whole tea leaves in each teabag.</p>');
INSERT INTO plant_x_db.product_category (category_id, category_name, category_slug, category_image_name, storage_name,
                                         category_description)
VALUES (11, 'Gift sets', '91dd3e22-4f29-4af9-a1d4-9e5cc1e9ab14-gift-sets',
        '3a86d0ba-6a7c-4a70-a928-b703b92de661-gift-sets.jpeg', 'categories',
        '<p>Discover our most celebrated packaged tea collections, exquisite objects d\'art designed to reflect an excellent in both content and packaging to surprise and delight.</p>');
INSERT INTO plant_x_db.product_category (category_id, category_name, category_slug, category_image_name, storage_name,
                                         category_description)
VALUES (12, 'Tea Hampers', '33d9c95a-dc70-43b0-af34-85794041103c-tea-hampers',
        'c7c4fb10-94e4-4535-917f-0f7bd5aeae3c-tea-hampers.png', 'categories',
        '<p>These curated Tea Hampers are perfect for any occasion to celebrate you and your loved ones. Delicately packaged in our chic hamper box and elegantly wrapped in our signature TWG Tea sleeve and ribbon.</p>');
INSERT INTO plant_x_db.product_category (category_id, category_name, category_slug, category_image_name, storage_name,
                                         category_description)
VALUES (13, 'Experience Spring With TWG Tea', '115f07fa-47e1-4f1c-8d66-86ff82b3891f-experience-spring-with-twg-tea',
        '4e26b50b-66fa-43b0-9896-ec63a7158a98-experience-spring-with-TWG-tea.jpg', 'categories',
        '<p>Welcome to TWG Tea, the finest teas of the world</p>');

-- inset net weight data
INSERT INTO plant_x_db.net_weight (id, net_weight_value, net_weight_label)
VALUES (1, 50, '50g');
INSERT INTO plant_x_db.net_weight (id, net_weight_value, net_weight_label)
VALUES (2, 100, '100g');
INSERT INTO plant_x_db.net_weight (id, net_weight_value, net_weight_label)
VALUES (4, 150, '150g');
INSERT INTO plant_x_db.net_weight (id, net_weight_value, net_weight_label)
VALUES (5, 200, '200g');
INSERT INTO plant_x_db.net_weight (id, net_weight_value, net_weight_label)
VALUES (7, 1000, '1kg');
INSERT INTO plant_x_db.net_weight (id, net_weight_value, net_weight_label)
VALUES (8, 250, '250g');

-- inset product data
INSERT INTO plant_x_db.product (product_id, description, product_name, category_id)
VALUES (72, '<h4 class="mb-0">ABOUT THIS PRODUCT</h4>
<ul>
<li>Separated from Nepal by a simple stream, the Okayti tea estate, founded in 1888, harvests some of the most exquisite teas in the world for TWG Tea. The lush gardens are spread out over undulating terrain at altitudes of 1,300 to 2,000 metres. The first flush is eagerly awaited by connoisseurs each spring.</li>
<li>This harvest boasts delicate pistachio-green rolled leaves which exude a pronounced flavour of mangoes, papaya and guava. A shimmering topaz-coloured infusion yields a buttery aroma with a round, mellow finish and boasts a lengthy aftertaste of grassy meadows and wild flowers. The preferred tea of Queen Victoria.</li>
<li>A certified organic tea.</li>
</ul>
<h4 class="mb-0">TEA VARIETY</h4>
<ul>
<li>Black Tea</li>
<li>Organic Tea</li>
</ul>
<h4 class="mb-0">COUNTRY OF ORIGIN</h4>
<ul>
<li>India, Himalayas &amp; Nepal</li>
</ul>
<h4 class="mb-0">TEA PREPARATION</h4>
<ul>
<li>Pour 95&deg;C water over 2.5g of tea leaves per cup and infuse for 3 minutes. Remove leaves and serve.</li>
</ul>', 'Okayti Excellence SFTGFOP1', 8);
INSERT INTO plant_x_db.product (product_id, description, product_name, category_id)
VALUES (75, '<h4 class="mb-0">ABOUT THIS PRODUCT</h4>
<ul>
<li>A fragrant fantasy, this aromatic green tea blend of TWG Tea\'s signature 1837 Tea is a voyage, boasting a lofty fruit and flower bouquet that leaves a delicious aftertaste of red fruits and caramel with a light touch of astringency. A delightful tea for any time of the day and perfect paired with desserts.</li>
</ul>
<h4 class="mb-0">TEA VARIETY</h4>
<ul>
<li>Green Teas</li>
<li>Exclusive Tea Blends</li>
</ul>
<h4 class="mb-0">TEA PREPARATION</h4>
<ul>
<li>Pour 95&deg;C water over 2.5g of tea leaves per cup and infuse for 3 minutes. Remove leaves and serve.</li>
</ul>', '1837 Green Tea ', 8);
INSERT INTO plant_x_db.product (product_id, description, product_name, category_id)
VALUES (76, '<h4 class="mb-0">ABOUT THIS PRODUCT</h4>
<ul>
<li>TWG Tea\'s renowned signature tea, 1837 Black is a unique blend of black tea with notes of fruits and flowers from the Bermuda triangle, which leaves a lingering aftertaste of ripe berries, anise, and caramel. A timeless classic.</li>
</ul>
<h4 class="mb-0">TEA VARIETY</h4>
<ul>
<li>Black Teas</li>
<li>Exclusive Tea Blends</li>
</ul>
<h4 class="mb-0">TEA PREPARATION</h4>
<ul>
<li>Pour 95&deg;C water over 2.5g of tea leaves per cup and infuse for 3 minutes. Remove leaves and serve.</li>
</ul>', '1837 Black Tea', 8);
INSERT INTO plant_x_db.product (product_id, description, product_name, category_id)
VALUES (77, '<h4 class="mb-0">ABOUT THIS PRODUCT</h4>
<ul>
<li>A twist on TWG Tea\'s renowned signature tea, 1837 White is an ethereal blend of white tea with notes of fruits and flowers from the Bermuda triangle, which leaves a lingering aftertaste of wild berries and anise. A crystalline and sophisticated tea for the evening.</li>
</ul>
<h4 class="mb-0">TEA VARIETY</h4>
<ul>
<li>White Teas</li>
<li>Exclusive Tea Blends</li>
</ul>
<h4 class="mb-0">TEA PREPARATION</h4>
<ul>
<li>Pour 95&deg;C water over 2.5g of tea leaves per cup and infuse for 3 to 5 minutes. Remove leaves and serve.</li>
</ul>', '1837 White Tea', 8);
INSERT INTO plant_x_db.product (product_id, description, product_name, category_id)
VALUES (78, '<h4 class="mb-0">ABOUT THIS PRODUCT</h4>
<ul>
<li>A perfect balance between the strength of high-grown Ceylon black tea and the subtlety of a rare South Africa red tea. The deep copper-coloured infusion yields a robust and sweet aroma.</li>
</ul>
<h4 class="mb-0">TEA VARIETY</h4>
<ul class="pl-0 alignPreparation">
<li>Grand Classic Tea Blends</li>
</ul>
<h4 class="mb-0">TEA PREPARATION</h4>
<ul>
<li>Pour 95&deg;C water over 2.5g of tea leaves per cup and infuse for 2 to 3 minutes. Remove leaves and serve.</li>
</ul>', 'Ace Of Hearts Tea ', 8);


-- insert product image data
INSERT INTO plant_x_db.product_image (image_id, image_name, storage_name, product_id)
VALUES (89, '27024edd-917d-47d1-9a1a-38b828a3fb33-T17_1.jpg', 'products', 72);
INSERT INTO plant_x_db.product_image (image_id, image_name, storage_name, product_id)
VALUES (90, 'b056a497-57b5-4dde-ac00-ed4ef1daf308-T17.jpg', 'products', 72);
INSERT INTO plant_x_db.product_image (image_id, image_name, storage_name, product_id)
VALUES (103, 'b0426e44-ef32-437f-b8de-ad874423defc-T6036.jpg', 'products', 75);
INSERT INTO plant_x_db.product_image (image_id, image_name, storage_name, product_id)
VALUES (104, 'b5b10582-3d14-43a0-abdf-09f679cea0d2-T6033.jpg', 'products', 76);
INSERT INTO plant_x_db.product_image (image_id, image_name, storage_name, product_id)
VALUES (105, 'bbf9706e-0ab9-4708-ae25-10b6c4c8809f-T6031.jpg', 'products', 77);
INSERT INTO plant_x_db.product_image (image_id, image_name, storage_name, product_id)
VALUES (106, 'fd3da67e-0589-4753-81bc-9b581895fff2-T4037.jpg', 'products', 78);

-- insert product quantity
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (33, 1, 72, 2, 73);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (34, 2, 72, 12, 146);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (37, 8, 72, 5, 365);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (38, 7, 72, 5, 1460);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (42, 1, 75, 10, 12);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (43, 2, 75, 10, 23);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (44, 8, 75, 5, 57);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (45, 7, 75, 2, 225);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (46, 9, 75, 5, 113);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (47, 1, 76, 10, 12);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (48, 2, 76, 10, 23);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (49, 8, 76, 5, 57);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (50, 9, 76, 5, 113);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (51, 7, 76, 5, 225);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (52, 1, 77, 20, 20);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (53, 2, 77, 20, 40);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (54, 8, 77, 15, 99);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (55, 9, 77, 12, 198);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (56, 7, 77, 6, 395);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (57, 1, 78, 20, 10);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (58, 2, 78, 20, 19);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (59, 8, 78, 20, 48);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (60, 9, 78, 15, 95);
INSERT INTO plant_x_db.product_quantity (id, net_weight_id, product_id, quantity, price)
VALUES (61, 7, 78, 10, 190);

-- insert news
INSERT INTO plant_x_db.news (id, news_title, news_body, created_at, news_cover_img)
VALUES (6, 'OUR COMMITMENT', '<p align="center">TWG Tea is committed to aligning the interests of business and society as much as possible. This includes formalising and sustaining our commitment to responsible corporate governance. We have appointed an internal ESG team to help identify more ways for us to extend our commitment to contributing towards a sustainable future.</p>
<p align="center">&nbsp;</p>
<p align="center">Our long-term commitment to responsible tea sourcing has led to the establishment of dedicated TWG Tea gardens on the estates of iconic partners. TWG Tea also supports reforestation programmes through our partners. In Rwanda, our partner tea estate planted over 157,000 trees in 2020 alone as part of reforestation efforts.</p>
<p align="center">&nbsp;</p>
<p align="center">TWG Tea currently has 70 Tea Salons &amp; Boutiques in 17 countries. Standard operating procedures in all Tea Salons &amp; Boutiques are applied across the globe to contribute towards our efforts to operate sustainably. Water conservation is practised in all TWG Tea Salons. We have designed proprietary water dispensers for our premises which automatically turn the water off when it is not in use, greatly minimising water wastage. This helps us to conserve approximately 5,800,000 litres of water &mdash; equivalent to two Olympic sized swimming pools &mdash; each year.</p>
<p align="center">&nbsp;</p>
<p align="center">We are also committed to reducing single-use disposable items. At our Tea Salons, teas are prepared using reusable cotton filters. By preparing pots of tea using loose leaf tea and reusable cotton tea filters, we avoid using 80 million teabags globally each year. TWG Tea has also eliminated the use of plastic straws and serves iced teas with proprietary glass straws which customers can bring home free of charge, encouraging the reuse of an item which is often perceived as single-use.</p>
<p align="center">&nbsp;</p>
<p align="center">With the rise of eCommerce, TWG Tea has also adopted responsible warehousing and back-end logistics practices. The brand has created customised 100% recycled and biodegradable carton boxes to protect customer orders and reduce the need for additional cushioning inside delivery boxes. Lowering the extra volumetric weight of packing materials also reduces the brand&rsquo;s carbon footprint. Furthermore, the brand has moved away from plastic packing materials, moving to exclusively biodegradable materials for all deliveries &ndash; only with the exception of our most fragile tea accessories.</p>',
        '2023-05-23 13:09:34', 'news/3c7c304d-2814-4927-864e-18e8e69992a3-Commitment-main.jpg');
INSERT INTO plant_x_db.news (id, news_title, news_body, created_at, news_cover_img)
VALUES (7, 'INFUSED FOR SUCCESS', '<p align="center"><em>Celebrating the alchemy of tea in its various forms: a transformative sip, a cocoon of calm, a celebration of craftsmanship. Whether it&rsquo;s the first sip to signal a new day, an invigorating cup between meetings, or a nightcap that nurtures &ndash; there&rsquo;s always time for tea.</em></p>
<p align="center">&nbsp;</p>
<p align="center"><strong>The Morning Rush</strong></p>
<p align="center">Tea creates a particular experience for each drinker. Take for instance, the first cup of tea in the morning. Your mind is only just awake &ndash; occupying the liminal space between dream and reality. The notifications are buzzing, snatching the last peaceful moments of slumber. You can feel the day&rsquo;s agenda demanding your attention: emails, tasks, deadlines, the unanswered text from last night.</p>
<p align="center"><em>Take a sip.</em></p>
<p align="center">The aroma envelops you &ndash; a visceral blend of black tea with enigmatic notes of fruits and flowers from the Bermuda triangle. With each transformative sip, you settle into the lingering aftertaste of ripe berries, anise, and caramel. You feel your to-do list slipping away, even for a minute. You watch the tea leaves unfurl and marvel at how seemingly humble ingredients can produce an alchemy of emotions. The steam rises &ndash; like incense &ndash; as your hands embrace the warm, ceramic cup. Contemplate, and appreciate, life in between each poignant sip of our signature&nbsp;<strong>1837 Black Tea</strong>.</p>
<p align="center">&nbsp;</p>
<p align="center"><strong>The Afternoon Ritual</strong></p>
<p align="center">You&rsquo;re back at the office, apr&egrave;s-lunch. As you settle down at your desk, you infuse another cup. For a measured moment of calm, and a boost of creativity, you gravitate towards a diplomatic blend to command your state of mind. The rhythmic taps of the keyboard, the cadence of endless conference calls &ndash; disrupted by a deliberate pause &ndash; and the familiar roar of a kettle.</p>
<p align="center"><em>Take a sip.</em></p>
<p align="center">The inaugural sip transports you: a journey in grace, grounding you in a cocoon of calm, to create the necessary headspace. Amidst the multiple meetings marked on your calendar, you savour the ambrosial white tea, layered with the unexpected delicacy of fruits and fragrant roses &ndash;&nbsp;<strong>White House Tea</strong>&nbsp;is a decidedly modern blend that also means business.</p>
<p align="center">&nbsp;</p>
<p align="center"><strong>The Inspired Nightcap</strong></p>
<p align="center">Contemplate your day with a smouldering infusion designed for transformation and renewal. Although tea has amassed a reputation of boldness, a theine-free iteration envelops your senses in an olfactory atmosphere to gently close your evening. As you surrender your battles for the solitude of night, consider the tea leaves &ndash; sourced directly from tea gardens &ndash; and their voyage from the tea plant to your teacup.</p>
<p align="center"><em>Take a sip.</em></p>
<p align="center">In the moonlit hour, this mysterious black tea unfurls into a magical infusion. A firm testament to artisanal creativity and innovation, explore the depths of&nbsp;<strong>Midnight Hour Tea</strong>, an exercise in duality layered with the pronounced intensity of tropical fruits. Celebrate the craftsmanship and the art of the leaf &ndash; savour the terroir and history behind every inspired sip.</p>',
        '2023-05-23 13:29:31', 'news/09d4e675-a7bd-4590-afb5-fdb322c0209f-ITD-main.jpg');

-- inserts order
INSERT INTO plant_x_db.orders (id, shipping_status, user_id, created_at, payment_method, payment_status,
                               shipping_address, receiver_name, receiver_phone)
VALUES (30, 1, 18, '2023-05-25 12:32:37', 1, 0, 'Ho Chi Minh City', 'Nhan', '0981939841');

-- insert order_item
INSERT INTO plant_x_db.order_item (id, order_id, product_id, net_weight_id, quantity, price)
VALUES (49, 30, 77, 2, 3, 40);

-- insert payment info
INSERT INTO plant_x_db.payment_info (id, order_id, payment_id, payment_created, payee_email, payee_name,
                                     payment_capture_id)
VALUES (7, 30, '0UB36269SE356922M', '2023-05-25 08:08:24', 'sb-fpmrp26057867@business.example.com', 'John Doe',
        '3K453259RD931131D');

-- inset store info
INSERT INTO plant_x_db.store_info (id, store_name, address, phone_number, store_image) VALUES (2, 'TWG Tea at Takashimaya Vietnam Level 2', 'Takashimaya Vietnam, Level 2 – 202. 65, Le Loi Street, Ben Nghe Ward, District 1, Ho Chi Minh City', '+84 28 3821 2312', 'stores/df1190d2-0a25-430b-8e4f-9af8399bdcf1-Screenshot-from-2023-04-13-17-33-20.png');

-- inset store open hour
INSERT INTO plant_x_db.store_open_hour (id, store_id, day, from_time, to_time) VALUES (1, 2, 'Monday', '10am', '9pm');
INSERT INTO plant_x_db.store_open_hour (id, store_id, day, from_time, to_time) VALUES (2, 2, 'Tuesday', '10am', '9pm');