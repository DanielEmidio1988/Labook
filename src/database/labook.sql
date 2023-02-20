-- Active: 1675701313108@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL, 
    email TEXT NOT NULL, 
    password TEXT NOT NULL, 
    role TEXT NOT NULL, 
    create_at TEXT DEFAULT(DATETIME()));

CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    creator_id TEXT NOT NULL, 
    content TEXT, 
    likes INTEGER DEFAULT(0) NOT NULL, 
    dislikes INTEGER DEFAULT(0) NOT NULL, 
    created_at TEXT DEFAULT(DATETIME()) NOT NULL, 
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id));

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL, 
    post_id TEXT NOT NULL, 
    like INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id));

SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM likes_dislikes;

INSERT INTO users (id, name, email, password, role)
VALUES ("u001", "Daniel", "daniel@teste.com", "123654","admin"),
("u002", "Cristiano", "cristiano@teste.com", "654123","user-free");

INSERT INTO posts (id, creator_id, content)
VALUES ("p001", "u001", "Finalizando mais um projeto Labenu! :D"),
("p002", "u001", "Boa tarde!"),
("p003", "u002", "Preciso de indicações de cursos de desenvolvimento web.");
