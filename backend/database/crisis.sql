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

create table lessonTitles
(
    id integer primary key,
    lessonId text,
    name text,
    image text
);
create table tools
(
    id integer primary key,
    lessonId text,
    name text,
    image text,
    foreign key(lessonId) references lessonTitles(lessonId)
);
create table ingredients
(
    id integer primary key,
    lessonId text,
    name text,
    image text,
    foreign key(lessonId) references lessonTitles(lessonId)
    
);
create table instructions
(
    id integer primary key,
    lessonId text,
    name text,
    image text,
    foreign key(lessonId) references lessonTitles(lessonId)    
);


