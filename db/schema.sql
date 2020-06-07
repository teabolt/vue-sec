CREATE DATABASE vuesec;

USE vuesec;

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  title BLOB,
  description BLOB,
  PRIMARY KEY ( id )
);

INSERT INTO reviews
VALUES
  (NULL, 'great review', 'amazing review I must say!');

INSERT INTO reviews
VALUES
  (NULL, 'not good', 'well it could use some serious improvements');

SELECT * FROM reviews;
