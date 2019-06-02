create table Community(
	id INT NOT NULL AUTO_INCREMENT,
	community_name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW(),
    PRIMARY KEY(id),
    UNIQUE(community_name)
);

CREATE  UNIQUE INDEX idx_community ON Community(community_name);


create table Member(
	id INT NOT NULL AUTO_INCREMENT,
	community_id INT NOT NULL,
	user_id INT NOT NULL,
	description VARCHAR(100),
	lat DOUBLE(20,10) NOT NULL,
	lng DOUBLE(20, 10) NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW(),
    PRIMARY KEY(id),
    FOREIGN KEY (community_id) REFERENCES Community(id) ON DELETE cascade,
    UNIQUE(user_id, lat, lng)
);

CREATE  UNIQUE INDEX idx_member_location ON Member(user_id, lat, lng);
CREATE  UNIQUE INDEX idx_community_member ON Member(community_id, user_id);
