create table Groups(
	id INT NOT NULL AUTO_INCREMENT,
    group_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW(),
    PRIMARY KEY(id)
);

CREATE  UNIQUE INDEX idx_groups ON Groups(group_name, created_by);


create table Member(
	id INT NOT NULL AUTO_INCREMENT,
	group_id INT NOT NULL,
	user_id INT NOT NULL,
	description VARCHAR(100),
    role VARCHAR(20) DEFAULT 'MEMBER',
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW(),
    PRIMARY KEY(id),
    FOREIGN KEY (group_id) REFERENCES Groups(id) ON DELETE cascade,
    UNIQUE(group_id, user_id)
);

CREATE  UNIQUE INDEX idx_group_member ON Member(group_id, user_id);
