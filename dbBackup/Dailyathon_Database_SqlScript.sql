create table tbladmin
(
    AdminID       int auto_increment primary key,
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


create table tbladminlog
(
    LogID     int auto_increment
        primary key,
    AdminID   int           not null,
    Operation varchar(200)  not null,
    isSuccess int           not null,
    RegDate   datetime      not null,
    message   varchar(1000) null
);


create table tblannouncement
(
    AnnouncementID      int auto_increment primary key,
    AnnouncementContent text          null,
    AnnouncementDate    date          null,
    AnnouncementTitle   varchar(100)  not null,
    Visible             int default 1 not null,
    constraint AnnouncementID
        unique (AnnouncementID)
);

create table tblannouncementuser
(
    AnnouncementUserID int auto_increment primary key,
    AnnouncementID     int  not null,
    UserID             int  not null,
    RegDate            date not null,
    constraint AnnouncementUserID
        unique (AnnouncementUserID)
)

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
    CategoryID   int auto_increment primary key,
    CategoryName varchar(30) null,
    constraint CategoryID
        unique (CategoryID),
    constraint tblcategory_CategoryName_uindex
        unique (CategoryName)
);

create table tblcripto
(
    CriptoID   int auto_increment
        primary key,
    Currency   varchar(10) not null,
    ChangeWeek varchar(10) not null,
    ChangeDay  varchar(10) not null,
    Price      varchar(20) not null,
    Code       varchar(5)  null,
    Name       varchar(15) not null
);

create table tblcurrency
(
    CurrencyID int auto_increment
        primary key,
    Name       varchar(10) not null,
    Code       varchar(10) not null,
    Buying     varchar(20) not null,
    Selling    varchar(20) not null,
    Rate       varchar(5)  not null,
    Datetime   varchar(20) not null
);

create table tbldatabotlog
(
    LogID     int auto_increment
        primary key,
    BotName   varchar(50)   not null,
    Url       varchar(300)  not null,
    Message   varchar(300)  not null,
    Exception varchar(2000) null,
    RegDate   datetime      not null
);

create table tblentertainment
(
    EntertainmentID        int auto_increment primary key,
    EntertainmentName      varchar(50)  null,
    EntertainmentStartDate date         not null,
    EntertainmentDueDate   date         not null,
    EntertainmentisFree    tinyint(1)   not null,
    EntertainmentPosterUrl varchar(500) null,
    EntertainmentTicketUrl varchar(500) null,
    EntertainmentCity      varchar(20)  null,
    EntertainmentDistrict  varchar(30)  null,
    EntertainmentVenue     varchar(200) null,
    TagID                  int          not null,
    constraint EntertainmentID
        unique (EntertainmentID)
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
    LeagueCountry varchar(50)  not null,
    constraint tblleague_LeagueName_uindex
        unique (LeagueName)
);

create table tblnews
(
    NewsID          int auto_increment primary key,
    NewsTitle       varchar(50)  null,
    NewsDescription text         null,
    NewsImage       varchar(500) null,
    Content         text         null,
    date            date         not null,
    TagID           int          not null,
    constraint NewsID
        unique (NewsID)
);

create table tblpharmacy
(
    PharmacyID int auto_increment
        primary key,
    Name       varchar(100) not null,
    City       varchar(50)  not null,
    Address    varchar(200) not null,
    Phone      varchar(30)  not null,
    Location   varchar(50)  not null,
    Dist       varchar(100) not null
);

create table tblservelog
(
    LogID      int auto_increment
        primary key,
    RouterName varchar(50)   not null,
    RouterType varchar(30)   not null,
    StatusCode int,
    StatusMessage varchar(200)
    Message    varchar(300)  not null,
    Exception  varchar(2000) null,
    RegDate    datetime      not null,
);

create table tblsport
(
    SportID         int auto_increment
        primary key,
    SportName       varchar(30) not null,
    LeagueTableName varchar(50) not null,
    constraint tblsport_SportName_uindex
        unique (SportName)
);

create table tblstock
(
    StockID   int auto_increment
        primary key,
    LastPrice varchar(10)  not null,
    Min       varchar(10)  not null,
    Max       varchar(10)  not null,
    Time      varchar(10)  not null,
    Text      varchar(100) null,
    Code      varchar(10)  not null
);

create table tblsurvey
(
    SurveyListID    int auto_increment primary key,
    SurveyName      varchar(50)   null,
    SurveyTableName varchar(30)   null,
    SurveyStartDate date          not null,
    SurveyDueDate   date          not null,
    SurveyUrl       varchar(500)  not null,
    Visible         int default 1 not null,
    constraint SurveyListID
        unique (SurveyListID)
);

create table tblsurveyuser
(
    SurveyUserID int auto_increment primary key,
    SurveyListID int  not null,
    UserID       int  not null,
    RegDate      date not null,
    constraint SurveyUserID
        unique (SurveyUserID)
)

create table tbltag
(
    TagID      int auto_increment primary key,
    TagName    varchar(30) null,
    CategoryID int         not null,
    constraint TagID
        unique (TagID)
);

create table tbltaguser
(
    TagUserID int auto_increment primary key,
    TagID     int  not null,
    UserID    int  not null,
    RegDate   date not null,
    constraint tbltaguser_TagUserID_uindex
        unique (TagUserID)
);

create table tbluser
(
    UserID         int auto_increment primary key,
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


create procedure AdminFind(IN _AdminID int)
BEGIN
    SELECT AdminID, AdminName, AdminAuth, AdminPosition, RegDate FROM tblAdmin WHERE AdminID = _AdminID;
END;


create procedure AdminLogList()
BEGIN
    SELECT L.LogID,
           A.AdminName,
           A.AdminAuth,
           A.AdminPosition,
           L.message,
           L.Operation,
           L.isSuccess,
           L.RegDate
    FROM tblAdminLog L
             INNER JOIN tbladmin A on L.AdminID = A.AdminID
    order by LogID DESC;
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


create  procedure AdminUpdate(IN _Name varchar(30), IN _Auth varchar(20),
                                                       IN _Position varchar(30), IN _AdminID int)
BEGIN
    UPDATE tbladmin SET AdminName = _Name, AdminAuth=_Auth, AdminPosition=_Position Where AdminID = _AdminID;
    COMMIT;
END;


create procedure AgeStatistic(OUT age1 int, OUT age2 int, OUT age3 int, OUT age4 int, OUT age5 int)
BEGIN
    Select count(*)
    INTO age1
    from tbluser
    where (YEAR(CURDATE()) - YEAR(UserDate)) > 0
      AND (YEAR(CURDATE()) - YEAR(UserDate) <= 13);
    Select count(*)
    INTO age2
    from tbluser
    where (YEAR(CURDATE()) - YEAR(UserDate)) > 13
      AND (YEAR(CURDATE()) - YEAR(UserDate) <= 21);
    Select count(*)
    INTO age3
    from tbluser
    where (YEAR(CURDATE()) - YEAR(UserDate)) > 21
      AND (YEAR(CURDATE()) - YEAR(UserDate) <= 35);
    Select count(*)
    INTO age4
    from tbluser
    where (YEAR(CURDATE()) - YEAR(UserDate)) > 35
      AND (YEAR(CURDATE()) - YEAR(UserDate) <= 55);
    Select count(*) INTO age5 from tbluser where (YEAR(CURDATE()) - YEAR(UserDate)) > 55;
END;


create procedure CategoryStatistic(IN ID int)
BEGIN
    SELECT COUNT(*) as 'value', T.TagName as 'name'
    from tbltaguser TU
             inner join tbltag T on T.TagID = TU.TagID
    where T.CategoryID = ID
    group by T.TagID;
END;


create procedure Dashboard(OUT thisweekUser int, OUT totalUser int, OUT totalAdmin int,
                                                     OUT totalCategory int, OUT totalTag int, OUT totalSurvey int,
                                                     OUT totalActiveSurvey int, OUT totalAnnouncement int,
                                                     OUT totalActiveAnnouncement int, OUT totalEvent int,
                                                     OUT totalActiveEvent int, OUT TotalNews int, OUT totalSport int,
                                                     OUT totalLeague int)
BEGIN
    SELECT COUNT(*)
    INTO thisweekUser
    FROM tbluser
    WHERE (TIMESTAMPDIFF(DAY, DATE(NOW()), (RegDate)) + DAYOFWEEK(NOW()) - 1) > 0
      AND (TIMESTAMPDIFF(DAY, DATE(NOW()), (RegDate)) + DAYOFWEEK(NOW()) - 1) <= 7;
    SELECT COUNT(*) INTO totalUser FROM tbluser;
    SELECT COUNT(*) INTO totalAdmin FROM tbladmin;
    SELECT COUNT(*) INTO totalCategory FROM tblcategory;
    SELECT COUNT(*) INTO totalTag FROM tbltag;
    SELECT COUNT(*) INTO totalSurvey FROM tblsurvey;
    SELECT COUNT(*) INTO totalActiveSurvey FROM tblsurvey WHERE Visible = 1;
    SELECT COUNT(*) INTO totalAnnouncement FROM tblannouncement;
    SELECT COUNT(*) INTO totalActiveAnnouncement FROM tblannouncement WHERE Visible = 1;
    SELECT COUNT(*) INTO totalEvent FROM tblentertainment;
    SELECT COUNT(*) INTO totalActiveEvent FROM tblentertainment WHERE EntertainmentDueDate > NOW();
    SELECT COUNT(*) INTO TotalNews FROM tblnews;
    SELECT COUNT(*) INTO totalSport FROM tblsport;
    SELECT COUNT(*) INTO totalLeague FROM tblleague;
END;


create procedure DashboardGetData()
BEGIN
    CALL Dashboard(@wuser, @user, @admin, @categoty, @tag, @survey, @asurvey,
                   @announcement, @aannouncement, @event, @aevent,
                   @news, @sport, @league);

    SELECT @wuser         AS 'thisweekUser',
           @user          AS 'totalUser',
           @admin         AS 'totalAdmin',
           @categoty      AS 'totalCategory',
           @tag           AS 'totalTag',
           @survey        AS 'totalSurvey',
           @asurvey       AS 'totalActiveSurvey',
           @announcement  AS 'totalAnnouncement',
           @aannouncement AS 'totalActiveAnnouncement',
           @event         AS 'totalEvent',
           @aevent        AS 'totalActiveEvent',
           @news          AS 'TotalNews',
           @sport         AS 'totalSport',
           @league        AS 'totalLeague';
END;


create procedure EntertainmentCityList(IN CityName varchar(20))
BEGIN
    SELECT E.EntertainmentID,
           E.EntertainmentName,
           EntertainmentStartDate,
           E.EntertainmentDueDate,
           E.EntertainmentisFree,
           E.EntertainmentPosterUrl,
           EntertainmentTicketUrl,
           E.EntertainmentCity,
           E.EntertainmentDistrict,
           E.EntertainmentVenue,
           T.TagID,
           T.TagName
    FROM tblEntertainment E
             inner join tbltag T on E.TagID = T.TagID
    where e.EntertainmentCity = CityName;
END;


create procedure EntertainmentList()
BEGIN
    SELECT E.EntertainmentID,
           E.EntertainmentName,
           EntertainmentStartDate,
           E.EntertainmentDueDate,
           E.EntertainmentisFree,
           E.EntertainmentPosterUrl,
           EntertainmentTicketUrl,
           E.EntertainmentCity,
           E.EntertainmentDistrict,
           E.EntertainmentVenue,
           T.TagID,
           T.TagName
    FROM tblEntertainment E
             inner join tbltag T on E.TagID = T.TagID
    order by EntertainmentID DESC;
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

create
    definer = bd6eb636685f7e@`%` procedure GetAgeStatistic()
BEGIN
    CALL AgeStatistic(@age1, @age2, @age3, @age4, @age5);

    SELECT @age1 as 'age1', @age2 AS 'age2', @age3 AS 'age3', @age4 AS 'age4', @age5 AS 'age5';
END;


create procedure LeagueList()
BEGIN
    SELECT L.LeagueID, L.LeagueName, L.LeagueUrl, L.LeagueCountry, S.SportID, SportName
    FROM tblLeague L
             INNER JOIN tblsport S on L.SportID = S.SportID
    order by LeagueID asc;
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


create procedure NewsList()
BEGIN
    SELECT NewsID, NewsTitle, NewsDescription, NewsImage, T.TagID, T.TagName
    FROM tblNews N
             inner join tblTag T on N.TagID = T.TagID
    order by NewsID desc;
END;


create procedure TagStatistic(IN ID int)
BEGIN

    IF ID = 0 THEN
        SELECT TagName as 'name', COUNT(t.TagID) AS 'value'
        from tbltaguser t
                 inner join tbltag t2 on t.TagID = t2.TagID
        WHERE (TIMESTAMPDIFF(DAY, DATE(NOW()), (RegDate)) + DAYOFWEEK(NOW()) - 1) > 0
          AND (TIMESTAMPDIFF(DAY, DATE(NOW()), (RegDate)) + DAYOFWEEK(NOW()) - 1) <= 7
        group by t.TagID
        order by COUNT(T.TagID) DESC
        LIMIT 8;
    ELSEIF ID = 1 THEN
        SELECT TagName as 'name', COUNT(t.TagID) AS 'value'
        from tbltaguser t
                 inner join tbltag t2 on t.TagID = t2.TagID
        WHERE (TIMESTAMPDIFF(DAY, DATE(NOW()), (RegDate)) + DAYOFWEEK(NOW()) - 1) > -7
          AND (TIMESTAMPDIFF(DAY, DATE(NOW()), (RegDate)) + DAYOFWEEK(NOW()) - 1) <= 0
        group by t.TagID
        order by COUNT(T.TagID) DESC
        LIMIT 8;
    ELSEIF ID = 2 THEN
        SELECT TagName as 'name', COUNT(t.TagID) AS 'value'
        from tbltaguser t
                 inner join tbltag t2 on t.TagID = t2.TagID
        WHERE DATE(RegDate) >= DATE(CURDATE() + 1 - DAYOFMONTH(NOW()))
          AND DATE(TIMESTAMPADD(MONTH, 1, (TIMESTAMPADD(DAY, -1, (CURDATE()) + 1 - DAYOFMONTH(NOW()))))) >=
              DATE(RegDate)
        group by t.TagID
        order by COUNT(T.TagID) DESC
        LIMIT 8;
    ELSEIF ID = 3 THEN
        SELECT TagName as 'name', COUNT(t.TagID) AS 'value'
        from tbltaguser t
                 inner join tbltag t2 on t.TagID = t2.TagID
        WHERE DATE(RegDate) >= (DATE(TIMESTAMPADD(MONTH, -1, CURDATE()) + 1 - DAYOFMONTH(NOW())))
          AND (DATE(TIMESTAMPADD(DAY, -1, (CURDATE()) + 1 - DAYOFMONTH(NOW())))) >= DATE(RegDate)
        group by t.TagID
        order by COUNT(T.TagID) DESC
        LIMIT 8;
    ELSEIF ID = 4 THEN
        SELECT TagName as 'name', COUNT(t.TagID) AS 'value'
        from tbltaguser t
                 inner join tbltag t2 on t.TagID = t2.TagID
        WHERE DATE_FORMAT(RegDate, '%Y') = DATE_FORMAT(CURDATE(), '%Y')
        group by t.TagID
        order by COUNT(T.TagID) DESC
        LIMIT 8;
    ELSEIF ID = 5 THEN
        SELECT TagName as 'name', COUNT(t.TagID) AS 'value'
        from tbltaguser t
                 inner join tbltag t2 on t.TagID = t2.TagID
        WHERE DATE_FORMAT(RegDate, '%Y') = (DATE_FORMAT(CURDATE(), '%Y') - 1)
        group by t.TagID
        order by COUNT(T.TagID) DESC
        LIMIT 8;
    ELSE
        SELECT TagName as 'name', COUNT(t.TagID) AS 'value'
        from tbltaguser t
                 inner join tbltag t2 on t.TagID = t2.TagID
        WHERE (TIMESTAMPDIFF(DAY, DATE(NOW()), (RegDate)) + DAYOFWEEK(NOW()) - 1) > 0
          AND (TIMESTAMPDIFF(DAY, DATE(NOW()), (RegDate)) + DAYOFWEEK(NOW()) - 1) <= 7
        group by t.TagID
        order by COUNT(T.TagID) DESC
        LIMIT 8;
    END IF;
end;


create procedure UserEntertainment(IN ID int)
BEGIN
    SELECT E.EntertainmentID,
           E.EntertainmentName,
           E.EntertainmentContent,
           EntertainmentStartDate,
           E.EntertainmentDueDate,
           E.EntertainmentisFree,
           E.EntertainmentPosterUrl,
           EntertainmentTicketUrl,
           E.EntertainmentCity,
           E.EntertainmentDistrict,
           E.EntertainmentVenue,
           E.EntertainmentPerformer,
           T.TagID,
           T.TagName
    FROM tblentertainment E
             inner join
         tbltag T on E.TagID = T.TagID
    where T.TagID IN
          (SELECT TagID FROM tbltaguser WHERE UserID = ID)
      and CategoryID = (SELECT CategoryID from tblcategory where CategoryName = 'Eğlence');
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
    SELECT N.NewsID,
           N.NewsTitle,
           N.NewsDescription,
           N.NewsImage,
           N.Content,
           N.date,
           N.TagID,
           T.TagName
    FROM tblnews N
             inner join
         tbltag T on N.TagID = T.TagID
    where T.TagID in
          (SELECT TagID FROM tbltaguser WHERE UserID = ID)
      and CategoryID = (SELECT CategoryID from tblcategory where CategoryName = 'Haber')
    order by N.date DESC, N.NewsID DESC;
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

