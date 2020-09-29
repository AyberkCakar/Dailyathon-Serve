/* User Data */
CALL UserSignUp("Ayberk","Çakar","ayberk@gmail.com","password","1990-01-03","Yazılım Mühendisi","İzmir");

CALL UserSignUp("Mehmet","Çakar","mehmet@gmail.com","password","2010-01-03","Bilgisayar Mühendisi","İstanbul");

CALL UserSignUp("Gürbüz","Çakar","gurbuz@gmail.com","password","2008-01-03","Doktor","Ankara");

/* Category Data */

INSERT INTO tblCategory (CategoryName) VALUES ("Haber");
INSERT INTO tblCategory (CategoryName) VALUES ("Eğlence");
INSERT INTO tblCategory (CategoryName) VALUES ("Günlük Yaşam");
INSERT INTO tblCategory (CategoryName) VALUES ("İş");


/* Tag Data */

INSERT INTO tblTag (TagName,CategoryID) VALUES ("Spor",1);
INSERT INTO tblTag (TagName,CategoryID) VALUES ("Ekonomi",1);
INSERT INTO tblTag (TagName,CategoryID) VALUES ("Teknoloji",1);
INSERT INTO tblTag (TagName,CategoryID) VALUES ("Konser",2);
INSERT INTO tblTag (TagName,CategoryID) VALUES ("Müzik",3);
INSERT INTO tblTag (TagName,CategoryID) VALUES ("Resim",3);
INSERT INTO tblTag (TagName,CategoryID) VALUES ("E-Spor",3);
INSERT INTO tblTag (TagName,CategoryID) VALUES ("CEO",4);
INSERT INTO tblTag (TagName,CategoryID) VALUES ("Yazılım Mühendisi",4);

/* Tag User Data */

INSERT INTO tblTagUser (TagID,UserID) VALUES (1,1);
INSERT INTO tblTagUser (TagID,UserID) VALUES (2,1);
INSERT INTO tblTagUser (TagID,UserID) VALUES (3,1);
INSERT INTO tblTagUser (TagID,UserID) VALUES (7,1);
INSERT INTO tblTagUser (TagID,UserID) VALUES (9,1);

/* Sport Data */

INSERT INTO tblSport (SportName) VALUES ("Futbol");
INSERT INTO tblSport (SportName) VALUES ("Basketbol");


/* Admin Data */

CALL AdminSignUp("admin","password");
CALL AdminSignUp("doruk","password");