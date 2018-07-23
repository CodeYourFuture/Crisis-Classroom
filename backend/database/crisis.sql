create table users
(
    id serial PRIMARY KEY,
    title varchar,
    firstName varchar,
    surName varchar,
    email varchar,
    userName varchar,
    token varchar,
    tokenExpires varchar,
    password text not null,
    uuid text not null,
    teacher BOOLEAN,
    admin BOOLEAN,
    avatar varchar,
    aboutUser varchar,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);
create table skills
(
    id serial primary key,
    userId integer,
    skillName text,
    aboutSkill text,
    skillLevel text,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    foreign key(userId) references users(id)
);
create table lessons
(
    id serial primary key,
    lessonTitle text,
    lessonTitleImage text,
    timeToPrepare text,
    timeToPrepareImage text,
    numberOfPeople text,
    numberOfPeopleImage text,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);
create table tools
(
    id serial primary key,
    lessonId integer,
    toolId text,
    toolName text,
    toolImage text,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    foreign key(lessonId) references lessons(id)
);
create table ingredients
(
    id serial primary key,
    lessonId integer,
    ingredientId text,
    ingredientName text,
    ingredientImage text,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    foreign key(lessonId) references lessons(id)
);
create table instructions
(
    id serial primary key,
    lessonId integer,
    instructionId text,
    instructionName text,
    instructionImage text,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    foreign key(lessonId) references lessons(id)
);


