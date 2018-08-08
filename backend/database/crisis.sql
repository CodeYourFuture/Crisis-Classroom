create table users
(
    id serial PRIMARY KEY,
    title varchar,
    first_name varchar,
    sur_name varchar,
    email varchar,
    user_name varchar,
    token varchar,
    token_expires varchar,
    password text not null,
    uuid text not null,
    teacher BOOLEAN,
    admin BOOLEAN,
    avatar varchar,
    about_user varchar,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);
create table skills
(
    id serial primary key,
    user_id integer,
    skill_name text,
    about_skill text,
    skill_level text,
    image text,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    foreign key(user_id) references users(id)
);
create table experience
(
    id serial primary key,
    user_id integer,
    what_experience text,
    what_date text,
    what_place text,
    with_whom_student text,
    with_whom_teacher text,
    about_experience text,
    image text,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    foreign key(user_id) references users(id)
);
create table lessons
(
    id serial primary key,
    lesson_title text,
    lesson_title_image text,
    time_to_prepare text,
    time_to_prepare_image text,
    number_of_people text,
    number_of_people_image text,
    date_id text,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);
create table tools
(
    id serial primary key,
    lesson_id integer,
    tool_id text,
    tool_name text,
    tool_image text,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    foreign key(lesson_id) references lessons(id)
);
create table ingredients
(
    id serial primary key,
    lesson_id integer,
    ingredient_id text,
    ingredient_name text,
    ingredient_image text,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    foreign key(lesson_id) references lessons(id)
);
create table instructions
(
    id serial primary key,
    lesson_id integer,
    instruction_id text,
    instruction_name text,
    instruction_image text,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    foreign key(lesson_id) references lessons(id)
);
create table crisis_messenger
(
    id serial primary key,
    sender_id integer,
    receiver_id integer,
    messege text,
    date_id text,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);


