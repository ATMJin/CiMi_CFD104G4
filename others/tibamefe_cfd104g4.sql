-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2022-03-05 15:23:45
-- 伺服器版本： 8.0.27
-- PHP 版本： 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `tibamefe_cfd104g4`
--
CREATE DATABASE IF NOT EXISTS `tibamefe_cfd104g4` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `tibamefe_cfd104g4`;

-- --------------------------------------------------------

--
-- 資料表結構 `admin`
--

CREATE TABLE `admin` (
  `admin_no` int NOT NULL COMMENT '管理員編號Not Null (PK)',
  `admin_id` varchar(15) NOT NULL COMMENT '管理員帳號Not Null',
  `admin_pwd` varchar(15) NOT NULL COMMENT '管理員密碼Not Null',
  `admin_power` tinyint DEFAULT '0' COMMENT '管理員權限'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='後臺管理員';

--
-- 傾印資料表的資料 `admin`
--

INSERT INTO `admin` (`admin_no`, `admin_id`, `admin_pwd`, `admin_power`) VALUES
(1, 'admin1', '123456', 1),
(2, 'admin2', '345678', 1),
(3, 'admin3', '678904', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `apply_moderator`
--

CREATE TABLE `apply_moderator` (
  `apply_moderator_no` int NOT NULL COMMENT '申請編號\r\nNot Null (PK)',
  `mem_no` int NOT NULL COMMENT '申請者會員編號\r\nNot Null (FK)',
  `billboard_no` int NOT NULL COMMENT '看板編號\r\nNot Null (FK)',
  `apply_moderator_date` date NOT NULL COMMENT '申請日期',
  `apply_moderator_reason` varchar(512) DEFAULT NULL COMMENT '申請理由',
  `apply_moderator_status` tinyint DEFAULT '0' COMMENT '申請狀態\r\n0:申請中, 1:通過,  2:未通過, '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='申請版主';

--
-- 傾印資料表的資料 `apply_moderator`
--

INSERT INTO `apply_moderator` (`apply_moderator_no`, `mem_no`, `billboard_no`, `apply_moderator_date`, `apply_moderator_reason`, `apply_moderator_status`) VALUES
(1, 2, 2, '2022-03-05', '法律房產各位一天', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `apply_new_billboard`
--

CREATE TABLE `apply_new_billboard` (
  `apply_new_billboard_no` int NOT NULL COMMENT '申請編號\r\nNot Null (PK)',
  `mem_no` int NOT NULL COMMENT '申請者會員編號\r\nNot Null (FK)',
  `billboard_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '新增看板名稱',
  `apply_billboard_date` date NOT NULL COMMENT '申請日期',
  `apply_billboard_reason` varchar(512) DEFAULT NULL COMMENT '申請理由',
  `apply_billboard_status` tinyint DEFAULT '0' COMMENT '申請狀態\r\n0:申請中, 1:通過,  2:未通過, '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='申請新增看板 ';

--
-- 傾印資料表的資料 `apply_new_billboard`
--

INSERT INTO `apply_new_billboard` (`apply_new_billboard_no`, `mem_no`, `billboard_name`, `apply_billboard_date`, `apply_billboard_reason`, `apply_billboard_status`) VALUES
(1, 1, '西斯', '2022-03-03', '一身都說突破皮膚三年雙手，別人提出記得平靜營銷，各種感覺到，筆記本方向為了意見一台未知手機鈴聲，計算品質很難部落提問承諾革命遊客能學到因此手續冠軍，關注某些數碼萬華編號，某些市政府檔案性格又是完整，監控付出瞭解坐在限制法人在這裡環節然後但我坐在，最大是我。', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `article`
--

CREATE TABLE `article` (
  `article_no` int NOT NULL COMMENT '文章編號\r\nNot Null (PK)',
  `mem_no` int NOT NULL COMMENT '發文者會員編號\r\nNot Null (FK)',
  `billboard_no` int NOT NULL COMMENT '所在看板編號\r\nNot Null (FK)',
  `publish_date` datetime NOT NULL COMMENT '建立時間',
  `last_edit_date` datetime NOT NULL COMMENT '最後編輯時間',
  `article_title` char(64) NOT NULL COMMENT '標題\r\nNot Null',
  `article_content` varchar(1024) NOT NULL COMMENT '內容\r\nNot Null',
  `article_pic` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '圖片',
  `article_likes_amount` int DEFAULT '0' COMMENT '按讚數\r\n熱門',
  `article_collect_amount` int DEFAULT '0' COMMENT '文章收藏數',
  `article_impeach` tinyint(1) DEFAULT '0' COMMENT '是否被檢舉\r\n0:正常、1:被檢舉',
  `article_state` tinyint DEFAULT '0' COMMENT '文章狀態\r\n0:正常、1:被隱藏、2:刪除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章';

--
-- 傾印資料表的資料 `article`
--

INSERT INTO `article` (`article_no`, `mem_no`, `billboard_no`, `publish_date`, `last_edit_date`, `article_title`, `article_content`, `article_pic`, `article_likes_amount`, `article_collect_amount`, `article_impeach`, `article_state`) VALUES
(2, 1, 1, '2022-03-05 14:23:37', '2022-03-18 14:23:37', '還會有可能世界盃風景一句話', '監管演出還可以焦點數字營養印象一隻，某些事件有了時間讓人簡介有限公司新技術，更新興奮生命手裡房間手段受傷無線委員會，以為遵守不知西安公佈售價行動看到方法，先進教育書記不行公路制度主義品種，教材社會相冊按鈕下降不得一下子成功，樣子中間這個需求觀察準確，十分。', NULL, 0, 0, 0, 0),
(3, 2, 2, '2022-03-03 14:23:37', '2022-03-03 14:23:37', '法律房產各位一天', '增強站內估計吃了比例學會允許打算看出房子做到您的信用那種，條例用來規劃本來也要降低訂單和平島，收益創建獨特笑話取消本月爸爸我要命令相關圖片記者以及，準備聯合記住下了，法律房產各位一天不如表現給他正式，這個說道查詢，自己最後人才外資回去，意外她說為此，點擊。', NULL, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `article_comment`
--

CREATE TABLE `article_comment` (
  `article_comment_no` int NOT NULL COMMENT '留言編號\r\nNot Null (PK)',
  `mem_no` int NOT NULL COMMENT '留言者會員編號\r\nNot Null (FK)',
  `article_no` int NOT NULL COMMENT '所屬文章編號\r\nNot Null (FK)',
  `comment_date` datetime NOT NULL COMMENT '留言時間',
  `comment_last_edit_date` datetime DEFAULT NULL COMMENT '最後留言時間',
  `comment_content` varchar(512) DEFAULT NULL COMMENT '內容',
  `comment_likes_amount` int DEFAULT '0' COMMENT '留言按讚數',
  `comment_impeach` tinyint(1) DEFAULT '0' COMMENT '留言是否被檢舉\r\n0:正常、1:被檢舉'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章留言';

--
-- 傾印資料表的資料 `article_comment`
--

INSERT INTO `article_comment` (`article_comment_no`, `mem_no`, `article_no`, `comment_date`, `comment_last_edit_date`, `comment_content`, `comment_likes_amount`, `comment_impeach`) VALUES
(1, 3, 3, '2022-03-05 14:32:53', NULL, '高效和他變成迅速外掛擔任提供歷史人數力量，半年衣服之家硬體部隊失去加入時間根據協會，別的那個長時間玻璃得到，主題無限培養，注意原則怎樣誠信只要動作教師一張細胞，點點我對我就開心深入來了熱門畢業，始終手上國產允許共同新浪過了當年隨着怎樣差距應該市場，成為親。', 0, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `article_comment_report`
--

CREATE TABLE `article_comment_report` (
  `comment_report_no` int NOT NULL COMMENT '檢舉編號Not Null (PK)',
  `mem_no` int NOT NULL COMMENT '檢舉者會員編號Not Null (FK)',
  `comment_no` int NOT NULL COMMENT '被檢舉文章留言編號Not Null (FK)',
  `report_date` datetime NOT NULL COMMENT '檢舉申請日期',
  `report_reason` varchar(512) DEFAULT NULL COMMENT '檢舉理由',
  `report_state` tinyint DEFAULT '0' COMMENT '檢舉處理狀態0:處理中1:已審核',
  `admin_no` int DEFAULT NULL COMMENT '處理人員Not Null (FK)',
  `report_report` tinyint DEFAULT '0' COMMENT '處理措施0:未審核1:通過2:未通過',
  `report_report_time` datetime DEFAULT NULL COMMENT '處理時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章留言檢舉';

--
-- 傾印資料表的資料 `article_comment_report`
--

INSERT INTO `article_comment_report` (`comment_report_no`, `mem_no`, `comment_no`, `report_date`, `report_reason`, `report_state`, `admin_no`, `report_report`, `report_report_time`) VALUES
(1, 1, 1, '2022-03-05 14:36:12', '出租環境費用難得市委，看來最近紡織，地面位置聲明進入收集只需湖北一般積分高中英雄家園，三年不僅主人後來綠色顯卡最好結合帝國現金精品，平靜即將審核特色報導及時婚姻我有關係邀請是我格式返回安全，目標據說成績政府顯然說話光碟商標年度想要會不會，動態都要，有時候。', 0, 2, 0, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `article_report`
--

CREATE TABLE `article_report` (
  `article_report_no` int NOT NULL COMMENT '檢舉編號Not Null (PK)',
  `mem_no` int NOT NULL COMMENT '檢舉者會員編號Not Null (FK)',
  `article_no` int NOT NULL COMMENT '被檢舉文章編號Not Null (FK)',
  `report_date` datetime NOT NULL COMMENT '檢舉申請日期',
  `report_reason` varchar(512) DEFAULT NULL COMMENT '檢舉理由',
  `report_state` tinyint DEFAULT '0' COMMENT '檢舉處理狀態0:處理中1:已審核 ',
  `admin_no` int DEFAULT NULL COMMENT '處理人員Not Null (FK)',
  `report_report` tinyint DEFAULT '0' COMMENT '處理措施0:未審核1:通過2:未通過 	',
  `report_report_time` datetime DEFAULT NULL COMMENT '處理時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章檢舉';

--
-- 傾印資料表的資料 `article_report`
--

INSERT INTO `article_report` (`article_report_no`, `mem_no`, `article_no`, `report_date`, `report_reason`, `report_state`, `admin_no`, `report_report`, `report_report_time`) VALUES
(1, 3, 2, '2022-03-05 15:06:00', '病毒一切配套新竹電話臨床現在往往，訊息部分群眾兄弟語文一句話，幾乎不願意預防是指下降不去檢測之間外貿寶寶新年裝備，要有大人思路破解營銷去年笑容收藏情節老公規範法人一旦，研發電話竟然一步，名字標籤學會，案例植物上升存款其他帶來理解雖然本週顯得明確，畢業組合。', 0, 2, 1, '2022-03-04 15:06:00');

-- --------------------------------------------------------

--
-- 資料表結構 `attend_record`
--

CREATE TABLE `attend_record` (
  `mem_no` int NOT NULL COMMENT '會員編號',
  `attend_date` date NOT NULL COMMENT '簽到日期',
  `get_points` tinyint NOT NULL COMMENT '獲得積分'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='簽到記錄';

--
-- 傾印資料表的資料 `attend_record`
--

INSERT INTO `attend_record` (`mem_no`, `attend_date`, `get_points`) VALUES
(1, '2022-03-04', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `billboard`
--

CREATE TABLE `billboard` (
  `billboard_no` int NOT NULL COMMENT '看板編號\r\nNot Null (PK)',
  `mem_no` int NOT NULL COMMENT '版主會員編號\r\nNot Null (FK)',
  `billboard_name` varchar(10) NOT NULL COMMENT '看板名稱\r\nNot Null',
  `billboard_create` date DEFAULT NULL COMMENT '創建日期',
  `billboard_follow` int DEFAULT '0' COMMENT '追蹤數',
  `billboard_post` int DEFAULT '0' COMMENT '文章數',
  `billboard_state` tinyint DEFAULT '0' COMMENT '看板狀態\r\n0:正常、1:隱藏、2:禁止發文',
  `billboard_icon` varchar(20) DEFAULT NULL COMMENT '看板icon',
  `billboard_img` varchar(20) DEFAULT NULL COMMENT '看板圖'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='看板';

--
-- 傾印資料表的資料 `billboard`
--

INSERT INTO `billboard` (`billboard_no`, `mem_no`, `billboard_name`, `billboard_create`, `billboard_follow`, `billboard_post`, `billboard_state`, `billboard_icon`, `billboard_img`) VALUES
(1, 3, '八卦', '2022-03-05', 3, 1, 0, NULL, NULL),
(2, 1, '美妝', '2022-03-05', 3, 1, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `goods`
--

CREATE TABLE `goods` (
  `goods_no` int NOT NULL COMMENT '商品編號\r\nNot Null (PK)',
  `goods_name` varchar(20) NOT NULL COMMENT '商品名稱\r\nNot Null',
  `goods_price` int NOT NULL COMMENT '價格\r\nNot Null',
  `goods_i` varchar(256) NOT NULL COMMENT '商品資訊\r\nNot Null',
  `goods_pic1` varchar(20) DEFAULT NULL COMMENT '商品圖片一',
  `goods_pic2` varchar(20) DEFAULT NULL COMMENT '商品圖片二',
  `goods_pic3` varchar(20) DEFAULT NULL COMMENT '商品圖片三',
  `goods_class` varchar(10) DEFAULT NULL COMMENT '商品類別',
  `goods_firm` varchar(20) DEFAULT NULL COMMENT '廠商',
  `goods_st` tinyint NOT NULL DEFAULT '0' COMMENT '狀態\r\n0:正常、1:下架、2:缺貨',
  `goods_like` int DEFAULT '0' COMMENT '被喜歡數',
  `goods_coll` int DEFAULT '0' COMMENT '被收藏數',
  `goods_creat` date NOT NULL COMMENT '建立日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='商品';

--
-- 傾印資料表的資料 `goods`
--

INSERT INTO `goods` (`goods_no`, `goods_name`, `goods_price`, `goods_i`, `goods_pic1`, `goods_pic2`, `goods_pic3`, `goods_class`, `goods_firm`, `goods_st`, `goods_like`, `goods_coll`, `goods_creat`) VALUES
(1, '蘋果手機', 12000, '本公司用品上午垃圾尺寸新手學會隨後並沒有區別義務給我們，本網到處玩家費用，適當的說在這裡會員價律師，學校之處再說，引起選項，距離不滿司機也有去年人數中港路財產等人也是我真，特色幫助無比台北家園驅動以及新型吸收刪除經營的是，今後字元團隊，管理數量相關圖片再。', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2022-03-03'),
(2, '小米手環', 500, '作為鏡頭基地明白組成或許只不過，無數不可能像素智慧簡直，經典桌面無聊一道，法律責任，主任加入也可穩定魔獸全身對外採用新人，來電站點電池女兒一樣五金，呼吸人士引發周圍也能講話存儲不管科技武器普遍演唱除了於是，老婆突出，顯卡依靠避免日月潭寂寞造型似乎回頭，第。', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2022-03-01');

-- --------------------------------------------------------

--
-- 資料表結構 `goods_comment`
--

CREATE TABLE `goods_comment` (
  `goods_comment_no` int NOT NULL COMMENT '留言編號\r\nNot Null (PK)',
  `mem_no` int NOT NULL COMMENT '留言者會員編號\r\nNot Null (FK)',
  `goods_no` int NOT NULL COMMENT '所屬商品編號\r\nNot Null (FK)',
  `comment_date` datetime NOT NULL COMMENT '留言時間',
  `comment_last_edit_date` datetime DEFAULT NULL COMMENT '最後留言時間',
  `comment_content` varchar(512) DEFAULT NULL COMMENT '內容',
  `comment_likes_amount` int DEFAULT '0' COMMENT '留言按讚數',
  `comment_impeach` tinyint(1) DEFAULT '0' COMMENT '留言是否被檢舉\r\n0:正常、1:被檢舉'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='商品留言';

--
-- 傾印資料表的資料 `goods_comment`
--

INSERT INTO `goods_comment` (`goods_comment_no`, `mem_no`, `goods_no`, `comment_date`, `comment_last_edit_date`, `comment_content`, `comment_likes_amount`, `comment_impeach`) VALUES
(1, 1, 1, '2022-03-05 15:12:20', NULL, '上面股權魔獸物流釣魚，技能瀏覽次數身材蔬菜明顯媒體身影軍事經歷衛生媒體深入私人，這麼多一系列再度理由發送，否則第二天想想默認項目標準嚴格漢化，停止添加請大家心靈政策也在都會外掛應該兒童影響，一部糖尿病儘管而言國家給你走進節省一級有很多，外面天地，台北平靜。', 0, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `goods_comment_report`
--

CREATE TABLE `goods_comment_report` (
  `comment_report_no` int NOT NULL COMMENT '檢舉編號Not Null (PK)',
  `mem_no` int NOT NULL COMMENT '檢舉者會員編號Not Null (FK)',
  `comment_no` int NOT NULL COMMENT '被檢舉商品留言編號Not Null (FK)',
  `report_date` datetime NOT NULL COMMENT '檢舉申請日期',
  `report_reason` varchar(512) DEFAULT NULL COMMENT '檢舉理由',
  `report_state` tinyint NOT NULL DEFAULT '0' COMMENT '檢舉處理狀態0:處理中1:已審核 	',
  `admin_no` int DEFAULT NULL COMMENT '處理人員Not Null (FK)',
  `report_report` tinyint NOT NULL COMMENT '處理措施0:未審核1:通過2:未通過 	',
  `report_report_time` datetime DEFAULT NULL COMMENT '處理時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='商品留言檢舉';

-- --------------------------------------------------------

--
-- 資料表結構 `mem`
--

CREATE TABLE `mem` (
  `mem_no` int NOT NULL COMMENT '會員編號\r\nNot Null (PK)',
  `mem_id` varchar(15) NOT NULL COMMENT '會員帳號\r\nNot Null',
  `mem_psw` varchar(15) NOT NULL COMMENT '會員密碼\r\nNot Null',
  `mem_name` varchar(30) NOT NULL COMMENT '會員暱稱\r\nNot Null',
  `mem_head` varchar(20) DEFAULT NULL COMMENT '會員頭像',
  `mem_tel` char(10) DEFAULT NULL COMMENT '電話',
  `mem_ident` char(10) DEFAULT NULL COMMENT '身分證',
  `mem_mail` varchar(40) DEFAULT NULL COMMENT 'E-mail',
  `mem_power` tinyint NOT NULL DEFAULT '0' COMMENT '權限\r\n0:一般會員、1:版主、2:管理員',
  `mem_lastsign` date DEFAULT NULL COMMENT '最後簽到日',
  `mem_stacksign` int DEFAULT '0' COMMENT '累積簽到次數',
  `mem_point` int DEFAULT '0' COMMENT '積分',
  `mem_state` tinyint(1) NOT NULL DEFAULT '0' COMMENT '會員狀態\r\n"0:正常、1:停權\r\nNot Null"'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='會員基本資料 ';

--
-- 傾印資料表的資料 `mem`
--

INSERT INTO `mem` (`mem_no`, `mem_id`, `mem_psw`, `mem_name`, `mem_head`, `mem_tel`, `mem_ident`, `mem_mail`, `mem_power`, `mem_lastsign`, `mem_stacksign`, `mem_point`, `mem_state`) VALUES
(1, 'apple', 'qqdq32', 'asdasd', NULL, NULL, NULL, NULL, 0, '2022-03-02', 3, 3, 0),
(2, 'egg', '123456', 'aaa', 'images/123.jpg', '0312345678', 'f123456789', 'qwet@aadf.com', 1, '2022-03-01', 1, 1, 1),
(3, 'dog123', 'kiyhtrw', 'rtgetre', 'wtwgtww', '9876543201', 'a123456789', 'erferfef@ergser', 1, '2022-03-01', 2, 3, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `mempairdata`
--

CREATE TABLE `mempairdata` (
  `mem_no` int NOT NULL COMMENT '會員編號\r\nNot Null (PK)',
  `mem_birth` date DEFAULT NULL COMMENT '會員生日',
  `mem_local` varchar(50) DEFAULT NULL COMMENT '會員所在地區',
  `mem_sex` char(1) DEFAULT NULL COMMENT '會員性別\r\nM:Male、F:Female',
  `mem_sexuality` varchar(3) DEFAULT NULL COMMENT '會員性向\r\n喜歡男、喜歡女、都可以',
  `mem_relationship` varchar(10) DEFAULT NULL COMMENT '會員感情狀態',
  `mem_job` varchar(15) DEFAULT NULL COMMENT '會員職業',
  `mem_school` varchar(15) DEFAULT NULL COMMENT '會員畢業學校',
  `mem_sign` varchar(256) DEFAULT NULL COMMENT '會員個性化簽名'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='會員配對資料 ';

--
-- 傾印資料表的資料 `mempairdata`
--

INSERT INTO `mempairdata` (`mem_no`, `mem_birth`, `mem_local`, `mem_sex`, `mem_sexuality`, `mem_relationship`, `mem_job`, `mem_school`, `mem_sign`) VALUES
(1, '2022-03-01', '胎北', '1', '喜歡男', '一言難盡', NULL, NULL, '天氣交友由於朋友建議最新溫柔能量瀏覽器其它其實合同，我還就能玄幻，趕緊課程左右，求職不過哈哈回覆緩緩最新幻想原理原則紅色將其空調，搜尋引擎記得儘量仍然山西帶來放在，進入友情主動聯繫方式，出現在那樣家電性質指揮此時，執法交流家族激動行業考試，自然應該，科技。');

-- --------------------------------------------------------

--
-- 資料表結構 `mem_articles_follow`
--

CREATE TABLE `mem_articles_follow` (
  `mem_no` int NOT NULL COMMENT '會員編號',
  `article_no` int NOT NULL COMMENT '追蹤文章編號'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='會員收藏的文章';

--
-- 傾印資料表的資料 `mem_articles_follow`
--

INSERT INTO `mem_articles_follow` (`mem_no`, `article_no`) VALUES
(3, 3);

-- --------------------------------------------------------

--
-- 資料表結構 `mem_articles_like`
--

CREATE TABLE `mem_articles_like` (
  `mem_no` int NOT NULL COMMENT '會員編號',
  `article_no` int NOT NULL COMMENT '喜歡文章編號'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='會員喜歡的文章';

--
-- 傾印資料表的資料 `mem_articles_like`
--

INSERT INTO `mem_articles_like` (`mem_no`, `article_no`) VALUES
(1, 2),
(3, 3);

-- --------------------------------------------------------

--
-- 資料表結構 `mem_billboard`
--

CREATE TABLE `mem_billboard` (
  `mem_no` int NOT NULL COMMENT '會員編號',
  `mem_billboard_no` int NOT NULL COMMENT '追蹤看板編號'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='會員追蹤的看板';

--
-- 傾印資料表的資料 `mem_billboard`
--

INSERT INTO `mem_billboard` (`mem_no`, `mem_billboard_no`) VALUES
(2, 2);

-- --------------------------------------------------------

--
-- 資料表結構 `mem_goods_like`
--

CREATE TABLE `mem_goods_like` (
  `mem_no` int NOT NULL COMMENT '會員編號',
  `goods_no` int NOT NULL COMMENT '追蹤商品編號'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='會員收藏的商品';

--
-- 傾印資料表的資料 `mem_goods_like`
--

INSERT INTO `mem_goods_like` (`mem_no`, `goods_no`) VALUES
(3, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `mifriend`
--

CREATE TABLE `mifriend` (
  `mem_no` int NOT NULL COMMENT '會員編號',
  `mi_no` int NOT NULL COMMENT 'Mi友會員編號'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='會員Mi友';

--
-- 傾印資料表的資料 `mifriend`
--

INSERT INTO `mifriend` (`mem_no`, `mi_no`) VALUES
(1, 2),
(2, 3);

-- --------------------------------------------------------

--
-- 資料表結構 `orders`
--

CREATE TABLE `orders` (
  `order_no` int NOT NULL COMMENT '訂單編號\r\nNot Null (PK)',
  `order_buyer_no` int NOT NULL COMMENT '訂購者\r\nNot Null (FK)',
  `order_tp` int NOT NULL DEFAULT '0' COMMENT '總價\r\nNot Null',
  `order_price_minus` int NOT NULL DEFAULT '0' COMMENT '積分折扺      ',
  `order_real_price` int NOT NULL DEFAULT '0' COMMENT '實際金額(打折後)',
  `order_time` datetime NOT NULL COMMENT '下訂時間\r\nNot Null',
  `order_way` varchar(4) NOT NULL COMMENT '取貨方式\r\n"Not Null\r\n0:宅配、1:超商取貨"',
  `order_place` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '取貨地點',
  `order_shipping` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '訂單狀態\r\n"Not Null\r\n0:未出貨、1:已出貨、2:已收貨、3:訂單完成、4:已取消"',
  `order_over_time` datetime DEFAULT NULL COMMENT '取貨時間',
  `order_satisfy` tinyint DEFAULT NULL COMMENT '滿意度\r\n1~5滿意度'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='訂單 ';

--
-- 傾印資料表的資料 `orders`
--

INSERT INTO `orders` (`order_no`, `order_buyer_no`, `order_tp`, `order_price_minus`, `order_real_price`, `order_time`, `order_way`, `order_place`, `order_shipping`, `order_over_time`, `order_satisfy`) VALUES
(1, 3, 12000, 0, 12000, '2022-03-05 15:16:04', '宅配', '謝謝策劃群發存儲各位緩緩', '訂單完成', '2022-03-05 15:16:04', 2),
(2, 3, 13000, 100, 12900, '2022-03-05 15:21:08', '超商取貨', NULL, '0', NULL, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `paring_player_ans`
--

CREATE TABLE `paring_player_ans` (
  `question_no` int NOT NULL COMMENT '遊戲者會員編號',
  `mem_no` int NOT NULL COMMENT '配對者會員編號',
  `paring_ans` int NOT NULL COMMENT '會員選擇的選項\r\nNot Null'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='會員回答';

-- --------------------------------------------------------

--
-- 資料表結構 `paring_question`
--

CREATE TABLE `paring_question` (
  `question_no` int NOT NULL COMMENT '題目編號\r\nNot Null (PK)',
  `optionA` varchar(20) DEFAULT NULL COMMENT '選項A',
  `optionB` varchar(20) DEFAULT NULL COMMENT '選項B',
  `optionC` varchar(20) DEFAULT NULL COMMENT '選項C'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='配對遊戲題目';

-- --------------------------------------------------------

--
-- 資料表結構 `paring_result`
--

CREATE TABLE `paring_result` (
  `player_no` int NOT NULL COMMENT '遊戲者會員編號',
  `paring_player_no` int NOT NULL COMMENT '配對者會員編號',
  `paring_time` datetime NOT NULL COMMENT '配對時間\r\nNot Null',
  `send_invitation` char(1) DEFAULT NULL COMMENT '發出邀請\r\n否、是'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='配對結果';

-- --------------------------------------------------------

--
-- 資料表結構 `product`
--

CREATE TABLE `product` (
  `order_no` int NOT NULL COMMENT '訂單編號',
  `goods_no` int NOT NULL COMMENT '商品編號',
  `product_total` tinyint NOT NULL COMMENT '購買商品數量',
  `goods_order_price` int NOT NULL COMMENT '當時商品價格'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='訂單商品 ';

--
-- 傾印資料表的資料 `product`
--

INSERT INTO `product` (`order_no`, `goods_no`, `product_total`, `goods_order_price`) VALUES
(1, 1, 1, 12000),
(2, 1, 1, 12000),
(2, 2, 2, 1000);

-- --------------------------------------------------------

--
-- 資料表結構 `trackwriter`
--

CREATE TABLE `trackwriter` (
  `mem_no` int NOT NULL COMMENT '會員編號',
  `writer_no` int NOT NULL COMMENT '作者會員編號'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='會員追蹤作者';

--
-- 傾印資料表的資料 `trackwriter`
--

INSERT INTO `trackwriter` (`mem_no`, `writer_no`) VALUES
(3, 2);

-- --------------------------------------------------------

--
-- 資料表結構 `unlikefriend`
--

CREATE TABLE `unlikefriend` (
  `mem_no` int NOT NULL COMMENT '會員編號',
  `unlike_mem_no` int NOT NULL COMMENT '封鎖會員編號'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='會員封鎖';

--
-- 傾印資料表的資料 `unlikefriend`
--

INSERT INTO `unlikefriend` (`mem_no`, `unlike_mem_no`) VALUES
(1, 3);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_no`);

--
-- 資料表索引 `apply_moderator`
--
ALTER TABLE `apply_moderator`
  ADD PRIMARY KEY (`apply_moderator_no`),
  ADD KEY `mem_no` (`mem_no`),
  ADD KEY `billboard_no` (`billboard_no`);

--
-- 資料表索引 `apply_new_billboard`
--
ALTER TABLE `apply_new_billboard`
  ADD PRIMARY KEY (`apply_new_billboard_no`),
  ADD KEY `mem_no` (`mem_no`);

--
-- 資料表索引 `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`article_no`),
  ADD KEY `mem_no` (`mem_no`),
  ADD KEY `billboard_no` (`billboard_no`);

--
-- 資料表索引 `article_comment`
--
ALTER TABLE `article_comment`
  ADD PRIMARY KEY (`article_comment_no`),
  ADD KEY `article_no` (`article_no`),
  ADD KEY `mem_no` (`mem_no`);

--
-- 資料表索引 `article_comment_report`
--
ALTER TABLE `article_comment_report`
  ADD PRIMARY KEY (`comment_report_no`),
  ADD KEY `mem_no` (`mem_no`),
  ADD KEY `comment_no` (`comment_no`),
  ADD KEY `admin_no` (`admin_no`);

--
-- 資料表索引 `article_report`
--
ALTER TABLE `article_report`
  ADD PRIMARY KEY (`article_report_no`),
  ADD KEY `mem_no` (`mem_no`),
  ADD KEY `article_no` (`article_no`),
  ADD KEY `admin_no` (`admin_no`);

--
-- 資料表索引 `attend_record`
--
ALTER TABLE `attend_record`
  ADD PRIMARY KEY (`mem_no`,`attend_date`);

--
-- 資料表索引 `billboard`
--
ALTER TABLE `billboard`
  ADD PRIMARY KEY (`billboard_no`),
  ADD KEY `mem_no` (`mem_no`);

--
-- 資料表索引 `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`goods_no`);

--
-- 資料表索引 `goods_comment`
--
ALTER TABLE `goods_comment`
  ADD PRIMARY KEY (`goods_comment_no`),
  ADD KEY `goods_no` (`goods_no`),
  ADD KEY `mem_no` (`mem_no`);

--
-- 資料表索引 `goods_comment_report`
--
ALTER TABLE `goods_comment_report`
  ADD PRIMARY KEY (`comment_report_no`),
  ADD KEY `mem_no` (`mem_no`),
  ADD KEY `comment_no` (`comment_no`),
  ADD KEY `admin_no` (`admin_no`);

--
-- 資料表索引 `mem`
--
ALTER TABLE `mem`
  ADD PRIMARY KEY (`mem_no`),
  ADD UNIQUE KEY `mem_id` (`mem_id`);

--
-- 資料表索引 `mempairdata`
--
ALTER TABLE `mempairdata`
  ADD PRIMARY KEY (`mem_no`);

--
-- 資料表索引 `mem_articles_follow`
--
ALTER TABLE `mem_articles_follow`
  ADD PRIMARY KEY (`mem_no`,`article_no`),
  ADD KEY `mem_articles_like_ibfk_2` (`article_no`);

--
-- 資料表索引 `mem_articles_like`
--
ALTER TABLE `mem_articles_like`
  ADD PRIMARY KEY (`mem_no`,`article_no`),
  ADD KEY `mem_articles_like_ibfk_2` (`article_no`);

--
-- 資料表索引 `mem_billboard`
--
ALTER TABLE `mem_billboard`
  ADD PRIMARY KEY (`mem_no`,`mem_billboard_no`),
  ADD KEY `mem_articles_like_ibfk_2` (`mem_billboard_no`);

--
-- 資料表索引 `mem_goods_like`
--
ALTER TABLE `mem_goods_like`
  ADD PRIMARY KEY (`mem_no`,`goods_no`),
  ADD KEY `mem_articles_like_ibfk_2` (`goods_no`);

--
-- 資料表索引 `mifriend`
--
ALTER TABLE `mifriend`
  ADD PRIMARY KEY (`mem_no`,`mi_no`),
  ADD KEY `fk1_mem_mem_no` (`mi_no`);

--
-- 資料表索引 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_no`),
  ADD KEY `order_buyer_no` (`order_buyer_no`);

--
-- 資料表索引 `paring_player_ans`
--
ALTER TABLE `paring_player_ans`
  ADD PRIMARY KEY (`question_no`,`mem_no`),
  ADD KEY `paring_player_ans_ibfk_2` (`mem_no`);

--
-- 資料表索引 `paring_question`
--
ALTER TABLE `paring_question`
  ADD PRIMARY KEY (`question_no`);

--
-- 資料表索引 `paring_result`
--
ALTER TABLE `paring_result`
  ADD PRIMARY KEY (`player_no`,`paring_player_no`),
  ADD KEY `paring_result_ibfk_2` (`paring_player_no`);

--
-- 資料表索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`order_no`,`goods_no`),
  ADD KEY `goods_no` (`goods_no`);

--
-- 資料表索引 `trackwriter`
--
ALTER TABLE `trackwriter`
  ADD PRIMARY KEY (`mem_no`,`writer_no`),
  ADD KEY `fk1_mem_mem_no` (`writer_no`);

--
-- 資料表索引 `unlikefriend`
--
ALTER TABLE `unlikefriend`
  ADD PRIMARY KEY (`mem_no`,`unlike_mem_no`),
  ADD KEY `unlikefriend_ibfk_2` (`unlike_mem_no`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_no` int NOT NULL AUTO_INCREMENT COMMENT '管理員編號Not Null (PK)', AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `apply_moderator`
--
ALTER TABLE `apply_moderator`
  MODIFY `apply_moderator_no` int NOT NULL AUTO_INCREMENT COMMENT '申請編號\r\nNot Null (PK)', AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `apply_new_billboard`
--
ALTER TABLE `apply_new_billboard`
  MODIFY `apply_new_billboard_no` int NOT NULL AUTO_INCREMENT COMMENT '申請編號\r\nNot Null (PK)', AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `article`
--
ALTER TABLE `article`
  MODIFY `article_no` int NOT NULL AUTO_INCREMENT COMMENT '文章編號\r\nNot Null (PK)', AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `article_comment`
--
ALTER TABLE `article_comment`
  MODIFY `article_comment_no` int NOT NULL AUTO_INCREMENT COMMENT '留言編號\r\nNot Null (PK)', AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `article_comment_report`
--
ALTER TABLE `article_comment_report`
  MODIFY `comment_report_no` int NOT NULL AUTO_INCREMENT COMMENT '檢舉編號Not Null (PK)', AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `article_report`
--
ALTER TABLE `article_report`
  MODIFY `article_report_no` int NOT NULL AUTO_INCREMENT COMMENT '檢舉編號Not Null (PK)', AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `billboard`
--
ALTER TABLE `billboard`
  MODIFY `billboard_no` int NOT NULL AUTO_INCREMENT COMMENT '看板編號\r\nNot Null (PK)', AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `goods`
--
ALTER TABLE `goods`
  MODIFY `goods_no` int NOT NULL AUTO_INCREMENT COMMENT '商品編號\r\nNot Null (PK)', AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `goods_comment`
--
ALTER TABLE `goods_comment`
  MODIFY `goods_comment_no` int NOT NULL AUTO_INCREMENT COMMENT '留言編號\r\nNot Null (PK)', AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `goods_comment_report`
--
ALTER TABLE `goods_comment_report`
  MODIFY `comment_report_no` int NOT NULL AUTO_INCREMENT COMMENT '檢舉編號Not Null (PK)';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `mem`
--
ALTER TABLE `mem`
  MODIFY `mem_no` int NOT NULL AUTO_INCREMENT COMMENT '會員編號\r\nNot Null (PK)', AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orders`
--
ALTER TABLE `orders`
  MODIFY `order_no` int NOT NULL AUTO_INCREMENT COMMENT '訂單編號\r\nNot Null (PK)', AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `paring_question`
--
ALTER TABLE `paring_question`
  MODIFY `question_no` int NOT NULL AUTO_INCREMENT COMMENT '題目編號\r\nNot Null (PK)';

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `apply_moderator`
--
ALTER TABLE `apply_moderator`
  ADD CONSTRAINT `apply_moderator_ibfk_1` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `apply_moderator_ibfk_2` FOREIGN KEY (`billboard_no`) REFERENCES `billboard` (`billboard_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `apply_new_billboard`
--
ALTER TABLE `apply_new_billboard`
  ADD CONSTRAINT `apply_new_billboard_ibfk_1` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `article_ibfk_2` FOREIGN KEY (`billboard_no`) REFERENCES `billboard` (`billboard_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `article_comment`
--
ALTER TABLE `article_comment`
  ADD CONSTRAINT `article_comment_ibfk_1` FOREIGN KEY (`article_no`) REFERENCES `article` (`article_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `article_comment_ibfk_2` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `article_comment_report`
--
ALTER TABLE `article_comment_report`
  ADD CONSTRAINT `article_comment_report_ibfk_1` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `article_comment_report_ibfk_2` FOREIGN KEY (`comment_no`) REFERENCES `article_comment` (`article_comment_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `article_comment_report_ibfk_3` FOREIGN KEY (`admin_no`) REFERENCES `admin` (`admin_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `article_report`
--
ALTER TABLE `article_report`
  ADD CONSTRAINT `article_report_ibfk_1` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `article_report_ibfk_2` FOREIGN KEY (`article_no`) REFERENCES `article` (`article_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `article_report_ibfk_3` FOREIGN KEY (`admin_no`) REFERENCES `admin` (`admin_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `attend_record`
--
ALTER TABLE `attend_record`
  ADD CONSTRAINT `attend_record_ibfk_1` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `billboard`
--
ALTER TABLE `billboard`
  ADD CONSTRAINT `billboard_ibfk_1` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `goods_comment`
--
ALTER TABLE `goods_comment`
  ADD CONSTRAINT `goods_comment_ibfk_1` FOREIGN KEY (`goods_no`) REFERENCES `goods` (`goods_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `goods_comment_ibfk_2` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `goods_comment_report`
--
ALTER TABLE `goods_comment_report`
  ADD CONSTRAINT `goods_comment_report_ibfk_1` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `goods_comment_report_ibfk_2` FOREIGN KEY (`comment_no`) REFERENCES `goods_comment` (`goods_comment_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `goods_comment_report_ibfk_3` FOREIGN KEY (`admin_no`) REFERENCES `admin` (`admin_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `mempairdata`
--
ALTER TABLE `mempairdata`
  ADD CONSTRAINT `fk_mem_mem_no` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `mem_articles_follow`
--
ALTER TABLE `mem_articles_follow`
  ADD CONSTRAINT `mem_articles_follow_ibfk_1` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `mem_articles_follow_ibfk_2` FOREIGN KEY (`article_no`) REFERENCES `article` (`article_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `mem_articles_like`
--
ALTER TABLE `mem_articles_like`
  ADD CONSTRAINT `mem_articles_like_ibfk_1` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `mem_articles_like_ibfk_2` FOREIGN KEY (`article_no`) REFERENCES `article` (`article_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `mem_billboard`
--
ALTER TABLE `mem_billboard`
  ADD CONSTRAINT `mem_billboard_ibfk_1` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `mem_billboard_ibfk_2` FOREIGN KEY (`mem_billboard_no`) REFERENCES `billboard` (`billboard_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `mem_goods_like`
--
ALTER TABLE `mem_goods_like`
  ADD CONSTRAINT `mem_goods_like_ibfk_1` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `mem_goods_like_ibfk_2` FOREIGN KEY (`goods_no`) REFERENCES `goods` (`goods_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `mifriend`
--
ALTER TABLE `mifriend`
  ADD CONSTRAINT `mifriend_ibfk_1` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `mifriend_ibfk_2` FOREIGN KEY (`mi_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`order_buyer_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `paring_player_ans`
--
ALTER TABLE `paring_player_ans`
  ADD CONSTRAINT `paring_player_ans_ibfk_1` FOREIGN KEY (`question_no`) REFERENCES `paring_question` (`question_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `paring_player_ans_ibfk_2` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `paring_result`
--
ALTER TABLE `paring_result`
  ADD CONSTRAINT `paring_result_ibfk_1` FOREIGN KEY (`player_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `paring_result_ibfk_2` FOREIGN KEY (`paring_player_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`goods_no`) REFERENCES `goods` (`goods_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`order_no`) REFERENCES `orders` (`order_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `trackwriter`
--
ALTER TABLE `trackwriter`
  ADD CONSTRAINT `fk1_mem_mem_no` FOREIGN KEY (`writer_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk2_mem_mem_no` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `unlikefriend`
--
ALTER TABLE `unlikefriend`
  ADD CONSTRAINT `unlikefriend_ibfk_1` FOREIGN KEY (`mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `unlikefriend_ibfk_2` FOREIGN KEY (`unlike_mem_no`) REFERENCES `mem` (`mem_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
