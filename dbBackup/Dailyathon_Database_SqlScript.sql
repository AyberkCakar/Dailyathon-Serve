
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `dailyathondb`
--

DELIMITER $$
--
-- Yordamlar
--
CREATE PROCEDURE `AdminLogin` (IN `Username` VARCHAR(30), IN `Password` VARCHAR(99))  BEGIN
    select * from tbladmin WHERE AdminUsername=Username and AdminPassword = Password;
END$$

CREATE PROCEDURE `AdminSignUp` (IN `Username` VARCHAR(30), IN `Password` VARCHAR(99))  BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
        @p2 = MESSAGE_TEXT;
        ROLLBACK;
        SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @p2;
    END;
    START TRANSACTION;
		INSERT INTO tbladmin (AdminUsername,AdminPassword)
		VALUES (Username,Password);
    (Select AdminID FROM tbladmin ORDER BY AdminID DESC LIMIT 1);
	COMMIT;
END$$

CREATE PROCEDURE `UserLogin` (IN `Email` VARCHAR(40), IN `Password` VARCHAR(99))  BEGIN
    select * from tbluser WHERE UserMail=Email and UserPassword = Password;
END$$

CREATE PROCEDURE `UserSignUp` (IN `UserName` VARCHAR(30), IN `UserSurname` VARCHAR(20), IN `UserMail` VARCHAR(40), IN `UserPassword` VARCHAR(99), IN `UserDate` DATE, IN `UserProfession` VARCHAR(30), IN `UserCity` VARCHAR(15))  BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
        @p2 = MESSAGE_TEXT;
        ROLLBACK;
        SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @p2;
    END;
    START TRANSACTION;
		INSERT INTO tbluser (UserName,UserSurname,UserMail, UserPassword,UserDate,UserProfession,UserCity)
		VALUES (UserName,UserSurname,UserMail, UserPassword,UserDate,UserProfession,UserCity);
    (Select UserID FROM tblUser ORDER BY UserID DESC LIMIT 1);
	COMMIT;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tbladmin`
--

CREATE TABLE `tbladmin` (
  `AdminID` int(11) NOT NULL,
  `AdminUsername` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `AdminPassword` varchar(99) COLLATE utf8_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblannouncement`
--

CREATE TABLE `tblannouncement` (
  `AnnouncementID` int(11) NOT NULL,
  `AnnouncementContent` text COLLATE utf8_turkish_ci,
  `AnnouncementStartDate` date DEFAULT NULL,
  `AnnouncementDueDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblannouncementuser`
--

CREATE TABLE `tblannouncementuser` (
  `AnnouncementUserID` int(11) NOT NULL,
  `AnnouncementID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblcategory`
--

CREATE TABLE `tblcategory` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblentertainment`
--

CREATE TABLE `tblentertainment` (
  `EntertainmentID` int(11) NOT NULL,
  `EntertainmentName` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `EntertainmentContent` text COLLATE utf8_turkish_ci,
  `EntertainmentStartDate` date NOT NULL,
  `EntertainmentDueDate` date NOT NULL,
  `EntertainmentisFree` tinyint(1) NOT NULL,
  `EntertainmentPosterUrl` varchar(500) COLLATE utf8_turkish_ci DEFAULT NULL,
  `EntertainmentTicketUrl` varchar(500) COLLATE utf8_turkish_ci DEFAULT NULL,
  `EntertainmentCity` varchar(20) COLLATE utf8_turkish_ci DEFAULT NULL,
  `EntertainmentDistrict` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `EntertainmentVenue` varchar(200) COLLATE utf8_turkish_ci DEFAULT NULL,
  `EntertainmentCategoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblentertainmentcategory`
--

CREATE TABLE `tblentertainmentcategory` (
  `EntertainmentCategoryID` int(11) NOT NULL,
  `EntertainmentCategoryName` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblleague`
--

CREATE TABLE `tblleague` (
  `LeagueID` int(11) NOT NULL,
  `LeagueName` varchar(50) COLLATE utf32_turkish_ci NOT NULL,
  `LeagueTableName` varchar(50) COLLATE utf32_turkish_ci NOT NULL,
  `SportID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblnews`
--

CREATE TABLE `tblnews` (
  `NewsID` int(11) NOT NULL,
  `NewsTitle` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `NewsDescription` text COLLATE utf8_turkish_ci,
  `NewsImage` varchar(500) COLLATE utf8_turkish_ci DEFAULT NULL,
  `NewsCategoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblnewscategory`
--

CREATE TABLE `tblnewscategory` (
  `NewsCategoryID` int(11) NOT NULL,
  `NewsCategoryName` varchar(30) COLLATE utf32_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblsport`
--

CREATE TABLE `tblsport` (
  `SportID` int(11) NOT NULL,
  `SportName` varchar(50) COLLATE utf32_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblsurveylist`
--

CREATE TABLE `tblsurveylist` (
  `SurveyListID` int(11) NOT NULL,
  `SurveyName` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `SurveyTableName` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `SurveyStartDate` date NOT NULL,
  `SurveyDueDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblsurveyuser`
--

CREATE TABLE `tblsurveyuser` (
  `SurveyUserID` int(11) NOT NULL,
  `SurveyID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tbltag`
--

CREATE TABLE `tbltag` (
  `TagID` int(11) NOT NULL,
  `TagName` varchar(30) DEFAULT NULL,
  `CategoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tbltaguser`
--

CREATE TABLE `tbltaguser` (
  `TagUserID` int(11) NOT NULL,
  `TagID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tbluser`
--

CREATE TABLE `tbluser` (
  `UserID` int(11) NOT NULL,
  `UserName` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserSurname` varchar(20) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserMail` varchar(40) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserPassword` varchar(99) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserDate` date DEFAULT NULL,
  `UserProfession` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserCity` varchar(15) COLLATE utf8_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `tbladmin`
--
ALTER TABLE `tbladmin`
  ADD PRIMARY KEY (`AdminID`),
  ADD UNIQUE KEY `AdminID` (`AdminID`),
  ADD UNIQUE KEY `AdminUsername` (`AdminUsername`);

--
-- Tablo için indeksler `tblannouncement`
--
ALTER TABLE `tblannouncement`
  ADD PRIMARY KEY (`AnnouncementID`),
  ADD UNIQUE KEY `AnnouncementID` (`AnnouncementID`);

--
-- Tablo için indeksler `tblannouncementuser`
--
ALTER TABLE `tblannouncementuser`
  ADD PRIMARY KEY (`AnnouncementUserID`),
  ADD UNIQUE KEY `AnnouncementUserID` (`AnnouncementUserID`);

--
-- Tablo için indeksler `tblcategory`
--
ALTER TABLE `tblcategory`
  ADD PRIMARY KEY (`CategoryID`),
  ADD UNIQUE KEY `CategoryID` (`CategoryID`);

--
-- Tablo için indeksler `tblentertainment`
--
ALTER TABLE `tblentertainment`
  ADD PRIMARY KEY (`EntertainmentID`),
  ADD UNIQUE KEY `EntertainmentCategoryID` (`EntertainmentCategoryID`),
  ADD UNIQUE KEY `EntertainmentID` (`EntertainmentID`);

--
-- Tablo için indeksler `tblentertainmentcategory`
--
ALTER TABLE `tblentertainmentcategory`
  ADD PRIMARY KEY (`EntertainmentCategoryID`);

--
-- Tablo için indeksler `tblleague`
--
ALTER TABLE `tblleague`
  ADD PRIMARY KEY (`LeagueID`),
  ADD UNIQUE KEY `SportID` (`SportID`),
  ADD UNIQUE KEY `LeagueID` (`LeagueID`);

--
-- Tablo için indeksler `tblnews`
--
ALTER TABLE `tblnews`
  ADD PRIMARY KEY (`NewsID`),
  ADD UNIQUE KEY `NewsCategoryID` (`NewsCategoryID`),
  ADD UNIQUE KEY `NewsID` (`NewsID`);

--
-- Tablo için indeksler `tblnewscategory`
--
ALTER TABLE `tblnewscategory`
  ADD PRIMARY KEY (`NewsCategoryID`),
  ADD UNIQUE KEY `NewsCategoryID` (`NewsCategoryID`);

--
-- Tablo için indeksler `tblsport`
--
ALTER TABLE `tblsport`
  ADD PRIMARY KEY (`SportID`);

--
-- Tablo için indeksler `tblsurveylist`
--
ALTER TABLE `tblsurveylist`
  ADD PRIMARY KEY (`SurveyListID`),
  ADD UNIQUE KEY `SurveyListID` (`SurveyListID`);

--
-- Tablo için indeksler `tblsurveyuser`
--
ALTER TABLE `tblsurveyuser`
  ADD PRIMARY KEY (`SurveyUserID`),
  ADD UNIQUE KEY `SurveyUserID` (`SurveyUserID`);

--
-- Tablo için indeksler `tbltag`
--
ALTER TABLE `tbltag`
  ADD PRIMARY KEY (`TagID`),
  ADD UNIQUE KEY `TagID` (`TagID`);

--
-- Tablo için indeksler `tbltaguser`
--
ALTER TABLE `tbltaguser`
  ADD PRIMARY KEY (`TagUserID`);

--
-- Tablo için indeksler `tbluser`
--
ALTER TABLE `tbluser`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `UserID` (`UserID`),
  ADD UNIQUE KEY `UserMail` (`UserMail`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `tbladmin`
--
ALTER TABLE `tbladmin`
  MODIFY `AdminID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblannouncement`
--
ALTER TABLE `tblannouncement`
  MODIFY `AnnouncementID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblannouncementuser`
--
ALTER TABLE `tblannouncementuser`
  MODIFY `AnnouncementUserID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblcategory`
--
ALTER TABLE `tblcategory`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblentertainment`
--
ALTER TABLE `tblentertainment`
  MODIFY `EntertainmentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblentertainmentcategory`
--
ALTER TABLE `tblentertainmentcategory`
  MODIFY `EntertainmentCategoryID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblleague`
--
ALTER TABLE `tblleague`
  MODIFY `LeagueID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblnews`
--
ALTER TABLE `tblnews`
  MODIFY `NewsID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblnewscategory`
--
ALTER TABLE `tblnewscategory`
  MODIFY `NewsCategoryID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblsport`
--
ALTER TABLE `tblsport`
  MODIFY `SportID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblsurveylist`
--
ALTER TABLE `tblsurveylist`
  MODIFY `SurveyListID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblsurveyuser`
--
ALTER TABLE `tblsurveyuser`
  MODIFY `SurveyUserID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tbltag`
--
ALTER TABLE `tbltag`
  MODIFY `TagID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tbltaguser`
--
ALTER TABLE `tbltaguser`
  MODIFY `TagUserID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
