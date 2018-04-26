create table users (
    id integer primary key,
    firstName varchar,
    surName varchar,
    email varchar,
    userName varchar,
    password text not null,
    confirmPassword text not null
);

insert into users (firstName, surName, email, userName, password, confirmPassword) values ("Ameer", "Kabir", "Amir@gmail.com", "Amirkabir", "123456", "123456");

create table lessons (
    id integer primary key,
    lessonTitle varchar,
    lessonImg text,
    timeToPrepair text,
    numberOfPeople number,
    peopleSymbole text,
    ingredients text,
    instructions text
);

insert into lessons (lessonTitle, lessonImg, timeToPrepair, numberOfPeople, peopleSymbole, ingredients, instructions) values ("Kabab", "../../../image/kabab.jpg", "2 Houres", 6, "../../../image/kabab.png", "Ingredients", "Instructions");


create table tools (
    id integer primary key,
    lessonId integer,
    toolName text,
    toolsSymbole text,
    foreign key(lessonId) references lessons(id)
);
insert into tools (lessonId, toolName, toolsSymbole) values (1, "Kabab skewer", "../../../image/kababskewer.jpg");
insert into tools (lessonId, toolName, toolsSymbole) values (1, "Grill", "../../../image/grill.jpg");
insert into tools (lessonId, toolName, toolsSymbole) values (1, "Fire", "../../../image/Fire.jpg");


create table ingredients(
    id integer primary key,
    lessonId integer,
    ingredientName text,
    ingredientSymbole text,
    foreign key(lessonId) references lessons(id)
);
insert into ingredients (lessonId, ingredientName, ingredientSymbole ) values (1, "1.5 kg Lamb"    , "../../../image/Lamb.jpg");
insert into ingredients (lessonId, ingredientName, ingredientSymbole ) values (1, "3 Onions"       , "../../../image/onion.jpg");
insert into ingredients (lessonId, ingredientName, ingredientSymbole ) values (1, "1 Spone of oil" , "../../../image/oil.jpg");
insert into ingredients (lessonId, ingredientName, ingredientSymbole ) values (1, "1 paper"        , "../../../image/paper.jpg");


create table instructions(
    id integer primary key,
    lessonId integer,
    instructionsName text,
    instructionsSymbole text,
    foreign key(lessonId) references lessons(id)
);
insert into instructions (lessonId, instructionsName, instructionsSymbole ) values(1, "cut", "../../../image/cut.jpg");
insert into instructions (lessonId, instructionsName, instructionsSymbole ) values(1, "cut", "../../../image/cut2.jpg");
insert into instructions (lessonId, instructionsName, instructionsSymbole ) values(1, "add", "../../../image/add.jpg");
insert into instructions (lessonId, instructionsName, instructionsSymbole ) values(1, "cook", "../../../image/cook.jpg");


