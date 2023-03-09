create table plant_x_db.user_account
(
    user_id  int auto_increment
        primary key,
    username varchar(255) not null,
    password text         not null,
    role     tinyint      not null,
    status   tinyint(1)   not null
) collate = utf8mb3_unicode_ci;

create table plant_x_db.user_info
(
    user_id      int          not null
        primary key,
    address      text         null,
    full_name    varchar(255) not null,
    phone_number varchar(10)  null,
    dob          datetime     null,
    gender       tinyint      null,
    constraint user_id
        foreign key (user_id) references plant_x_db.user_account (user_id)
) collate = utf8mb3_unicode_ci;

create table plant_x_db.product_category
(
    category_id   int auto_increment
        primary key,
    category_name varchar(255) not null,
    category_slug varchar(255) not null
)
    collate = utf8mb3_unicode_ci;

create table plant_x_db.image
(
    image_id   int auto_increment
        primary key,
    image_data varchar(255) not null
);

create table plant_x_db.image
(
    image_id   int auto_increment
        primary key,
    image_name varchar(255) not null
);

create table plant_x_db.product
(
    product_id    int auto_increment
        primary key,
    description   longtext     not null,
    product_name  varchar(255) not null,
    product_price int          not null,
    category_id   int          not null,
    constraint category_id
        foreign key (category_id) references plant_x_db.product_category (category_id)
)
    collate = utf8mb3_unicode_ci;



create table plant_x_db.product_image
(
    product_image_id int auto_increment
        primary key,
    product_id       int not null,
    image_id         int not null,
    constraint image_id
        foreign key (image_id) references plant_x_db.image (image_id),
    constraint product_id
        foreign key (product_id) references plant_x_db.product (product_id)
);


