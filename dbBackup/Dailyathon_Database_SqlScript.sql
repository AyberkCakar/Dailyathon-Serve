create table tbladmin
(
    AdminID       int auto_increment,
    AdminUsername varchar(30) null,
    AdminPassword varchar(99) null,
    AdminName     varchar(30) not null,
    AdminAuth     varchar(20) not null,
    AdminPosition varchar(30) not null,
    RegDate       date        not null,
    constraint AdminID
        unique (AdminID),
    constraint AdminUsername
        unique (AdminUsername)
);

alter table tbladmin
    add primary key (AdminID);

create table tbladminlog
(
    LogID     int auto_increment
        primary key,
    AdminID   int          not null,
    Operation varchar(200) not null,
    isSuccess tinyint(1)   not null,
    RegDate   date         not null
);

create table tblannouncement
(
    AnnouncementID      int auto_increment,
    AnnouncementContent text                 null,
    AnnouncementDate    date                 null,
    AnnouncementTitle   varchar(100)         not null,
    Visible             tinyint(1) default 1 not null,
    constraint AnnouncementID
        unique (AnnouncementID)
);

alter table tblannouncement
    add primary key (AnnouncementID);

create table tblannouncementuser
(
    AnnouncementUserID int auto_increment,
    AnnouncementID     int  not null,
    UserID             int  not null,
    RegDate            date not null,
    constraint AnnouncementUserID
        unique (AnnouncementUserID)
)
    charset = utf32;

alter table tblannouncementuser
    add primary key (AnnouncementUserID);

create table tblbasketball
(
    BasketballID int auto_increment
        primary key,
    SequenceNo   int          not null,
    TeamName     varchar(50)  not null,
    TeamLogoUrl  varchar(500) not null,
    O            int          not null,
    G            int          not null,
    M            int          null,
    A            int          not null,
    Y            int          not null,
    AV           varchar(5)   not null,
    P            int          not null,
    LeagueID     int          not null
);

create table tblcategory
(
    CategoryID   int auto_increment,
    CategoryName varchar(30) null,
    constraint CategoryID
        unique (CategoryID)
);

alter table tblcategory
    add primary key (CategoryID);

create table tbldatabotlog
(
    LogID     int auto_increment
        primary key,
    BotName   varchar(50)   not null,
    Url       varchar(300)  not null,
    Message   varchar(300)  not null,
    Exception varchar(2000) null,
    RegDate   date          not null
);

create table tblentertainment
(
    EntertainmentID         int auto_increment,
    EntertainmentName       varchar(50)  null,
    EntertainmentContent    text         null,
    EntertainmentStartDate  date         not null,
    EntertainmentDueDate    date         not null,
    EntertainmentisFree     tinyint(1)   not null,
    EntertainmentPosterUrl  varchar(500) null,
    EntertainmentTicketUrl  varchar(500) null,
    EntertainmentCity       varchar(20)  null,
    EntertainmentDistrict   varchar(30)  null,
    EntertainmentVenue      varchar(200) null,
    EntertainmentCategoryID int          not null,
    EntertainmentPerformer  varchar(50)  not null,
    constraint EntertainmentID
        unique (EntertainmentID)
);

alter table tblentertainment
    add primary key (EntertainmentID);

create table tblentertainmentcategory
(
    EntertainmentCategoryID   int auto_increment
        primary key,
    EntertainmentCategoryName varchar(50) null
);

create table tblfootball
(
    FootballID  int auto_increment
        primary key,
    SequenceNo  int          not null,
    TeamName    varchar(50)  not null,
    TeamLogoUrl varchar(500) not null,
    O           int          not null,
    G           int          not null,
    B           int          not null,
    M           int          not null,
    A           int          not null,
    Y           int          not null,
    AV          varchar(5)   not null,
    P           int          not null,
    LeagueID    int          not null
);

create table tblleague
(
    LeagueID      int auto_increment
        primary key,
    LeagueName    varchar(50)  not null,
    LeagueUrl     varchar(500) not null,
    SportID       int          not null,
    LeagueCountry varchar(50)  not null
);

create table tblnews
(
    NewsID          int auto_increment,
    NewsTitle       varchar(50)  null,
    NewsDescription text         null,
    NewsImage       varchar(500) null,
    NewsCategoryID  int          not null,
    constraint NewsID
        unique (NewsID)
);

alter table tblnews
    add primary key (NewsID);

create table tblnewscategory
(
    NewsCategoryID   int         not null,
    NewsCategoryName varchar(30) null
);

create table tblservelog
(
    LogID      int auto_increment
        primary key,
    RouterName varchar(50)   not null,
    RouterType varchar(30)   not null,
    Message    varchar(300)  not null,
    Exception  varchar(2000) null,
    RegDate    date          not null
);

create table tblsport
(
    SportID         int auto_increment
        primary key,
    SportName       varchar(30) not null,
    LeagueTableName varchar(50) not null
);

create table tblsurvey
(
    SurveyListID    int auto_increment,
    SurveyName      varchar(50)          null,
    SurveyTableName varchar(30)          null,
    SurveyStartDate date                 not null,
    SurveyDueDate   date                 not null,
    SurveyUrl       varchar(500)         not null,
    Visible         tinyint(1) default 1 not null,
    constraint SurveyListID
        unique (SurveyListID)
);

alter table tblsurvey
    add primary key (SurveyListID);

create table tblsurveyuser
(
    SurveyUserID int auto_increment,
    SurveyListID int  not null,
    UserID       int  not null,
    RegDate      date not null,
    constraint SurveyUserID
        unique (SurveyUserID)
)

alter table tblsurveyuser
    add primary key (SurveyUserID);

create table tbltag
(
    TagID      int auto_increment,
    TagName    varchar(30) null,
    CategoryID int         not null,
    constraint TagID
        unique (TagID)
);

alter table tbltag
    add primary key (TagID);

create table tbltaguser
(
    TagUserID int auto_increment
        primary key,
    TagID     int  not null,
    UserID    int  not null,
    RegDate   date not null
);

create table tbluser
(
    UserID         int auto_increment,
    UserName       varchar(30) null,
    UserSurname    varchar(20) null,
    UserMail       varchar(40) null,
    UserPassword   varchar(99) null,
    UserDate       date        null,
    UserProfession varchar(30) null,
    UserCity       varchar(15) null,
    RegDate        date        not null,
    constraint UserID
        unique (UserID),
    constraint UserMail
        unique (UserMail)
);

alter table tbluser
    add primary key (UserID);

create procedure AdminFind(IN _AdminID int)
BEGIN
    SELECT AdminID, AdminName, AdminAuth, AdminPosition, RegDate FROM tblAdmin WHERE AdminID = _AdminID;
END;

create procedure AdminLogin(IN Username varchar(30), IN Password varchar(99))
BEGIN
    select * from tbladmin WHERE AdminUsername = Username and AdminPassword = Password;
END;

create procedure AdminSignUp(IN _Username varchar(30), IN _Password varchar(99),
                                                       IN _Name varchar(30), IN _Auth varchar(20),
                                                       IN _Position varchar(30), IN _RegDate date)
BEGIN
    INSERT INTO tbladmin (AdminUsername, AdminPassword, AdminName, AdminAuth, AdminPosition, RegDate)
    VALUES (_Username, _Password, _Name, _Auth, _Position, _RegDate);
        (Select AdminID FROM tbladmin ORDER BY AdminID DESC LIMIT 1);
    COMMIT;
END;

create procedure ForgotPassword(IN _Username varchar(30), IN _NewPassword varchar(99),
                                                          IN _UserSurname varchar(20), IN _UserMail varchar(40),
                                                          IN _UserDate date)
BEGIN
    UPDATE tbluser
    SET UserPassword = _NewPassword
    WHERE UserName = _Username
      and UserSurname = _UserSurname
      and UserMail = _UserMail
      and UserDate = _UserDate;
END;

create procedure LeagueTableName(IN ID int)
BEGIN
    (SELECT LeagueTableName
     FROM tblsport
     where SportName in
           (SELECT TagName
            FROM tbltag
            WHERE TagID IN
                  (SELECT TagID FROM tbltaguser WHERE UserID = ID)
              and CategoryID = (SELECT CategoryID from tblcategory where CategoryName = 'Spor')));
END;

create procedure UserEntertainment(IN ID int)
BEGIN
    SELECT *
    FROM tblentertainment T
             inner join
         tblentertainmentcategory TC on T.EntertainmentCategoryID = TC.EntertainmentCategoryID
    where TC.EntertainmentCategoryName in
          (SELECT TagName
           FROM tbltag
           WHERE TagID IN
                 (SELECT TagID FROM tbltaguser WHERE UserID = ID)
             and CategoryID = (SELECT CategoryID from tblcategory where CategoryName = 'Eğlence'));
END;

create procedure UserFind(IN _UserID int)
BEGIN
    SELECT UserID,
           UserName,
           UserSurname,
           UserMail,
           UserDate,
           UserProfession,
           UserCity,
           RegDate
    FROM tblUser
    WHERE UserID = _UserID;
END;

create procedure UserLogin(IN Email varchar(40), IN Password varchar(99))
BEGIN
    select * from tbluser WHERE UserMail = Email and UserPassword = Password;
END;

create procedure UserNews(IN ID int)
BEGIN
    SELECT *
    FROM tblnews N
             inner join
         tblnewscategory t on N.NewsCategoryID = t.NewsCategoryID
    where t.NewsCategoryName in
          (SELECT TagName
           FROM tbltag
           WHERE TagID IN
                 (SELECT TagID FROM tbltaguser WHERE UserID = ID)
             and CategoryID = (SELECT CategoryID from tblcategory where CategoryName = 'Haber'));
END;

create procedure UserSignUp(IN _UserName varchar(30), IN _UserSurname varchar(20),
                                                      IN _UserMail varchar(40), IN _UserPassword varchar(99),
                                                      IN _UserDate date, IN _UserProfession varchar(30),
                                                      IN _UserCity varchar(15), IN _RegDate date)
BEGIN
    INSERT INTO tbluser (UserName, UserSurname, UserMail, UserPassword, UserDate, UserProfession, UserCity, RegDate)
    VALUES (_UserName, _UserSurname, _UserMail, _UserPassword, _UserDate, _UserProfession, _UserCity, _RegDate);
        (Select UserID FROM tblUser ORDER BY UserID DESC LIMIT 1);
    COMMIT;
END;

create procedure UserTagDelete(IN ID int, IN Tag varchar(30))
BEGIN
    DELETE FROM tbltaguser WHERE UserID = ID and TagID = (select TagID FROM tbltag WHERE TagName = Tag);
END;

create procedure UserTagList(IN ID int)
BEGIN
    (SELECT T.TagID, T.TagName, C.CategoryID, C.CategoryName
     FROM tbltag T
              inner join tblcategory C on T.CategoryID = C.CategoryID
     WHERE TagID IN
           (SELECT TagID FROM tbltaguser WHERE UserID = ID));
END;

create procedure UserTagSelect(IN ID int, IN Tag varchar(30), IN _RegDate date)
BEGIN
    INSERT INTO tbltaguser SET UserID = ID, TagID=(SELECT TagID FROM tbltag WHERE TagName = Tag), RegDate = _RegDate;
END;

