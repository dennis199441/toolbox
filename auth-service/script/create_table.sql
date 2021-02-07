create table users(
	id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(500) NOT NULL,
    password VARCHAR(1000) NOT NULL,
    is_active INT DEFAULT 1 NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW(),
    PRIMARY KEY(id),
    UNIQUE(username, email)
);

CREATE  UNIQUE INDEX idx_user_1 ON users(username);

create table roles(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW(),
    PRIMARY KEY(id),
    UNIQUE(name)
);

create table user_roles(
	id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW(),
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);