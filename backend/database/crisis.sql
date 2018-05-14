create table users
(
    id integer primary key,
    firstName varchar,
    surName varchar,
    email varchar,
    userName varchar,
    password text not null,
    confirmPassword text not null
);
insert into users
    (firstName, surName, email, userName, password, confirmPassword)
values
    ("Ameer", "Kabir", "Amir@gmail.com", "Amirkabir", "123456", "123456");
create table survey
(
    id integer primary key,
    studentName text,
    answer1 text,
    answer2 text,
    answer3 text
);
create table lessons
(
    lessonId integer primary key
);

create table lessonTitles
(
    id integer primary key,
    lessonId text,
    lessonTitleId text,
    lessonTitleName text,
    lessonTitleImage text,
    foreign key(lessonId) references lessons(lessonId)
);

create table tools
(
    id integer primary key,
    lessonId text,
    toolId text,
    toolName text,
    toolImage text,
    foreign key(lessonId) references lessons(lessonId)
);

create table ingredients
(
    id integer primary key,
    lessonId text,
    ingredientId text,
    ingredientName text,
    ingredientImage text,
    foreign key(lessonId) references lessons(lessonId)
);
create table instructions
(
    id integer primary key,
    lessonId text,
    instructionId text,
    instructionName text,
    instructionImage text,
    foreign key(lessonId) references lessons(lessonId)
);


