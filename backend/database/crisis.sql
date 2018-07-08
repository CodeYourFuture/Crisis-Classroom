create table users
(
    id integer primary key,
    firstName varchar,
    surName varchar,
    email varchar,
    userName varchar,
    token varchar,
    tokenExpires varchar,
    password text not null,
    teacher BOOLEAN,
    admin BOOLEAN
);
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
    id integer primary key,
    lessonTitle text,
    lessonTitleImage text,
    timeToPrepare text,
    timeToPrepareImage text,
    numberOfPeople text,
    numberOfPeopleImage text
);
create table tools
(
    id integer primary key,
    lessonId integer,
    toolId text,
    toolName text,
    toolImage text,
    foreign key(lessonId) references lessons(id)
);
create table ingredients
(
    id integer primary key,
    lessonId integer,
    ingredientId text,
    ingredientName text,
    ingredientImage text,
    foreign key(lessonId) references lessons(id)
);
create table instructions
(
    id integer primary key,
    lessonId integer,
    instructionId text,
    instructionName text,
    instructionImage text,
    foreign key(lessonId) references lessons(id)
);


