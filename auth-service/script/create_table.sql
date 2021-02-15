create table users(
	id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(500) NOT NULL,
    password VARCHAR(1000) NOT NULL,
    is_active INT DEFAULT 1 NOT NULL,
    verified_email INT DEFAULT 0 NOT NULL,
    last_login DATETIME,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW(),
    PRIMARY KEY(id),
    UNIQUE(username, email)
);

CREATE  UNIQUE INDEX idx_user_1 ON users(username);

create table roles(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    description VARCHAR(250) DEFAULT NULL,
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
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    UNIQUE KEY user_role_id (user_id, role_id)
);

-- Before create user
insert into roles(name) values("Admin");
-- After create user (on-boarding the first user in the system)
insert into user_roles(user_id, role_id) values(1, 1);