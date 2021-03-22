CREATE DATABASE toolbox_blog;

USE toolbox_blog;

SET time_zone = "+08:00";

CREATE TABLE blog (
    id                  VARCHAR(255) NOT NULL,
    title               VARCHAR(255) NOT NULL,
    author              VARCHAR(255) NOT NULL,
    content             LONGTEXT NOT NULL,
    published           BOOLEAN DEFAULT FALSE NOT NULL,
    creationTime        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updateTime          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT blog_pk PRIMARY KEY (id),
    INDEX(author)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;