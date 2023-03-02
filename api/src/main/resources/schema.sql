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

