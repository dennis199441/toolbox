create table User(
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

CREATE  UNIQUE INDEX idx_user ON User(username);
