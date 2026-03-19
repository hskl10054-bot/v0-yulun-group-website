-- ============================================
-- 裕綸集團 CMS — Supabase Schema
-- 在 Supabase Dashboard > SQL Editor 執行此腳本
-- ============================================

-- 頁面內容主表
create table page_content (
  id bigint primary key generated always as identity,
  page text not null,
  section text not null,
  key text not null,
  value text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 列表項目表（服務、評語、門市、優勢等）
create table list_items (
  id bigint primary key generated always as identity,
  page text not null,
  section text not null,
  sort_order int default 0,
  title text,
  subtitle text,
  description text,
  extra text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 圖片表
create table images (
  id bigint primary key generated always as identity,
  page text not null,
  section text not null,
  url text not null,
  alt text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 關閉 RLS，讓後端可以直接讀寫
alter table page_content disable row level security;
alter table list_items disable row level security;
alter table images disable row level security;

-- 預設內容：首頁
insert into page_content (page, section, key, value) values
('home', 'hero', 'title', '裕綸集團'),
('home', 'hero', 'subtitle', 'Yulun Group'),
('home', 'hero', 'slogan', '職人建築，穩健基石，構築空間的永續價值。'),
('home', 'contact', 'address', '台中市北屯區瀋陽北路73號'),
('home', 'contact', 'phone', '04-2247-9068'),
('home', 'contact', 'email', 'yulun83417215@gmail.com'),
('home', 'contact', 'hours', '週一至週五  09:00 — 18:00'),
('design', 'hero', 'en_subtitle', 'Taichung Interior Design Studio'),
('design', 'hero', 'title', '為你的空間'),
('design', 'hero', 'title_italic', '注入魔法'),
('design', 'hero', 'description', '空房開門，幸福進門。我們相信空間不只是鋼筋水泥，更是承載幸福的容器。當魔法注入空間，家便開始講述屬於你的幸福故事。'),
('design', 'about', 'quote', '「空間是無聲的語言，設計是讓它開口說話。」'),
('design', 'about', 'description', '空房子設計致力於打破格局束縛，以人為本，透過細膩的動線規劃與美學比例，將居住者的情感與性格注入每一寸留白。我們不做複製品，每一個案子都從屋主的生活習慣、個性與夢想出發，打造獨一無二的空間故事。'),
('design', 'stats', 'projects', '150+'),
('design', 'stats', 'projects_label', '完成案例'),
('design', 'stats', 'years', '8'),
('design', 'stats', 'years_label', '年品牌經驗'),
('design', 'stats', 'satisfaction', '98%'),
('design', 'stats', 'satisfaction_label', '客戶滿意度'),
('design', 'contact', 'address', '台中市北屯區瀋陽北路73號'),
('design', 'contact', 'phone', '04-2247-9068'),
('design', 'contact', 'email', 'yulun83417215@gmail.com'),
('design', 'contact', 'hours', '週一至週五  09:00 — 18:00'),
('construction', 'hero', 'en_subtitle', 'Taichung Construction Engineering'),
('construction', 'hero', 'title', '匠心傳承'),
('construction', 'hero', 'title_line2', '穩健工程'),
('construction', 'hero', 'title_line3', '構築世代安居'),
('construction', 'hero', 'description', '裕綸裝修擁有政府核可專業施工證照，秉持標準化 SOP 工程管理。我們重視隱蔽工程細節，從水電配置、防水工法到結構強化，皆由具備資深執照的職人團隊把關。2年保固，安心無憂。'),
('construction', 'contact', 'address', '台中市北屯區瀋陽北路73號'),
('construction', 'contact', 'phone', '04-2247-9068'),
('construction', 'contact', 'email', 'yulun83417215@gmail.com'),
('construction', 'contact', 'hours', '週一至週五  09:00 — 18:00'),
('cafe', 'hero', 'en_subtitle', 'Specialty Coffee'),
('cafe', 'hero', 'title', '一杯咖啡'),
('cafe', 'hero', 'title_italic', '千種連結'),
('cafe', 'hero', 'description', '在同齊，咖啡是空間的媒介，連結著人與人之間的對話。我們提供自家烘焙的精品咖啡豆，並在舒適的空間中創造不限時的寧靜時刻。無論是尋求靈感的商務洽公，或是好友聚會，同齊咖啡都是你生活中最溫暖的交匯點。'),
('cafe', 'hours', 'display', '週一至週日  09:00 — 18:00');

-- 預設列表：集團優勢
insert into list_items (page, section, sort_order, title, description) values
('home', 'strengths', 1, '自有工班', '擁有專屬施工團隊，確保品質與進度全程掌控，減少外包風險。'),
('home', 'strengths', 2, '專業執照', '持有政府核定之室內裝修專業技術人員證照，合法合規、安心保障。'),
('home', 'strengths', 3, '透明報價', '逐項清單式報價，無隱藏費用，讓每一分預算都花在刀口上。');

-- 預設列表：首頁評語
insert into list_items (page, section, sort_order, title, subtitle, description) values
('home', 'testimonials', 1, '陳先生', '全室設計+施工・台中西屯', '從設計到施工一條龍，省去了我很多協調的麻煩，完工後品質遠超預期。'),
('home', 'testimonials', 2, '林太太', '三代同堂住宅・台中北區', '設計師非常有耐心，把我們家人不同的需求都融合在同一個空間裡，太厲害了。'),
('home', 'testimonials', 3, '張老闆', '辦公室裝修・台中南區', '報價透明、工期準時，完全沒有追加費用的情況，這在業界真的很難得。');

-- 預設列表：首頁品牌卡片
insert into list_items (page, section, sort_order, title, subtitle, description, extra) values
('home', 'brand_cards', 1, '空房子室內設計', 'Interior Design', '為你的空間注入魔法 — 空房開門，幸福進門。透過細膩的動線規劃與美學比例，將居住者的情感與性格注入每一寸留白。', '/design'),
('home', 'brand_cards', 2, '裕綸室內裝修', 'Construction Engineering', '匠心傳承，穩健工程，構築世代安居。標準化 SOP 工程管理，讓美學建立在穩固且安全的結構之上。', '/construction');

-- 預設列表：設計服務
insert into list_items (page, section, sort_order, title, description) values
('design', 'services', 1, '預售屋客變規劃', '在交屋前即進行格局調整與建材升級規劃，提前為理想生活做好準備，省時省預算。'),
('design', 'services', 2, '居家住宅室內設計', '從平面配置、立面設計到材料挑選，以人為本的空間美學，為每個家注入獨特靈魂。'),
('design', 'services', 3, '老屋翻新空間重整', '保留空間記憶的同時，注入現代設計語彙。舊屋新生，讓老房子重新散發獨特魅力。'),
('design', 'services', 4, '商業空間美學配置', '咖啡廳、辦公室、品牌門市等商業空間，以品牌精神為核心，設計吸引人且具功能性的環境。'),
('design', 'services', 5, '軟裝設計與風格諮詢', '家具挑選、燈光配置、藝術品與植栽搭配，用軟裝語彙讓硬體設計更有生命力。');

-- 預設列表：設計作品
insert into list_items (page, section, sort_order, title, description) values
('design', 'portfolio', 1, '現代簡約｜光感餐廚', ''),
('design', 'portfolio', 2, '暖色侘寂｜圓弧玄關', ''),
('design', 'portfolio', 3, '輕奢現代｜石紋客餐廳', ''),
('design', 'portfolio', 4, '極簡北歐｜純白入戶', ''),
('design', 'portfolio', 5, '日式和風｜日光臥榻', '');

-- 預設列表：設計評語
insert into list_items (page, section, sort_order, title, subtitle, description) values
('design', 'testimonials', 1, '李小姐', '台中北區・三房兩廳・2024', '從第一次諮詢到完工，整個過程都讓我感受到設計師對細節的堅持。現在每天回到家都像是回到一個懂我的地方。'),
('design', 'testimonials', 2, '黃先生', '台中西區・老屋翻新・2023', '我只是說了幾個關鍵字，設計師就把我腦海裡模糊的想像變成了真實的空間。太神奇了。'),
('design', 'testimonials', 3, '吳老闆', '台中南區・商業空間・2023', '咖啡廳開幕後不斷有客人說空間很有質感，生意比預期好很多。設計真的是最值得投資的事。');

-- 預設列表：裝修優勢
insert into list_items (page, section, sort_order, title, description) values
('construction', 'strengths', 1, '自有工班', '不外包，全程自有專業工班施工，品質與進度完全掌控在自己手中。'),
('construction', 'strengths', 2, '合法執照', '持有政府核定室內裝修專業技術人員證照，合法合規施工，保障屋主權益。'),
('construction', 'strengths', 3, '透明報價', '逐項清單報價，無隱藏費用，每一分預算清清楚楚，讓你花得安心。');

-- 預設列表：裝修服務
insert into list_items (page, section, sort_order, title, description) values
('construction', 'services', 1, '拆除與結構加強工程', '安全拆除既有隔間與裝修，並依需求進行結構補強，為新設計奠定穩固基礎。'),
('construction', 'services', 2, '專業水電系統配置', '專業水電技師負責管線配置、插座規劃、衛浴設備安裝，符合建築法規與安全標準。'),
('construction', 'services', 3, '高標準防水隔音工程', '採用高規格防水工法與隔音材料，確保居住品質與空間結構的長期耐久。'),
('construction', 'services', 4, '木作與細部木裝工程', '系統櫃、天花板、木地板等木作項目，材料嚴選、工法精準，打造精緻的空間細節。'),
('construction', 'services', 5, '系統家具安裝與整合', '系統櫃體與家具的精準安裝，整合空間機能與美學，提供完整的收納解決方案。');

-- 預設列表：裝修案例
insert into list_items (page, section, sort_order, title, subtitle) values
('construction', 'portfolio', 1, '精準裁切，構築空間', '全室裝修・2025'),
('construction', 'portfolio', 2, '設計落地：現場監工', '商業空間・2025'),
('construction', 'portfolio', 3, '泥作整平，空間基石', '舊屋翻新・2025'),
('construction', 'portfolio', 4, '專業電工紀實', '局部工程・2024'),
('construction', 'portfolio', 5, '嚴謹的高空作業', '全室裝修・2025');

-- 預設列表：裝修評語
insert into list_items (page, section, sort_order, title, subtitle, description) values
('construction', 'testimonials', 1, '黃先生', '全室裝修・台中北區・2024', '工班師傅很專業，每天收工前都會清理現場，整個工程過程完全不用擔心。'),
('construction', 'testimonials', 2, '蔡太太', '老屋翻新・台中西屯・2023', '報價單寫得很詳細，哪個項目多少錢一清二楚，完工後完全沒有追加費用。'),
('construction', 'testimonials', 3, '林先生', '商業空間・台中南區・2023', '工程進度比預期還快，品質也很好。監工人員很負責，有問題馬上回應。');

-- 預設列表：咖啡特色
insert into list_items (page, section, sort_order, title, description) values
('cafe', 'features', 1, '不限時深夜咖啡', '營業至深夜，提供舒適的空間讓你不受時間限制，盡情享受每一刻的寧靜。'),
('cafe', 'features', 2, '自烘咖啡豆', '嚴選產區生豆，自家烘焙，以專業的烘豆技術呈現每一支豆子最完美的風味。'),
('cafe', 'features', 3, '場地租賃', '提供多功能場地租借服務，適合商務洽公、讀書會、小型聚會等各種用途。');

-- 預設列表：咖啡門市
insert into list_items (page, section, sort_order, title, description) values
('cafe', 'stores', 1, '北屯旗艦店', '台中市北屯區熱河路二段226號'),
('cafe', 'stores', 2, '西區精忠店', '台中市西區精忠街36號'),
('cafe', 'stores', 3, '南區忠明店', '台中市南區忠明南路576號'),
('cafe', 'stores', 4, '花蓮創始店', '花蓮市建國路23號2樓');

-- 預設列表：首頁作品集
insert into list_items (page, section, sort_order, title, subtitle) values
('home', 'portfolio', 1, '同齊咖吡 西區精忠店', '2025'),
('home', 'portfolio', 2, '壹偲OnlyEase酵素保健茶飲', '2025'),
('home', 'portfolio', 3, '勝麗交響曲', '2025'),
('home', 'portfolio', 4, '清水聯馥悅', '2024'),
('home', 'portfolio', 5, '居家住宅室內設計', '2025');

-- 預設圖片
insert into images (page, section, url, alt, sort_order) values
('home', 'hero', '/images/hero-bg.jpg', '裕綸集團作品', 1),
('home', 'brand_design', '/images/design-brand.jpg', '空房子室內設計', 1),
('home', 'brand_construction', '/images/construction-brand.jpg', '裕綸室內裝修', 1),
('home', 'portfolio', '/images/home/portfolio/home-portfolio-01.jpg', '同齊咖吡 西區精忠店', 1),
('home', 'portfolio', '/images/home/portfolio/home-portfolio-02.JPG', '壹偲OnlyEase酵素保健茶飲', 2),
('home', 'portfolio', '/images/home/portfolio/home-portfolio-03.JPG', '勝麗交響曲', 3),
('home', 'portfolio', '/images/home/portfolio/home-portfolio-04.jpg', '清水聯馥悅', 4),
('home', 'portfolio', '/images/home/portfolio/home-portfolio-05.jpg', '居家住宅室內設計', 5),
('design', 'hero', '/images/design/hero/design-hero.jpg', '空房子室內設計', 1),
('design', 'portfolio', '/images/design/portfolio/design-work-01.jpg', '現代簡約｜光感餐廚', 1),
('design', 'portfolio', '/images/design/portfolio/design-work-02.jpg', '暖色侘寂｜圓弧玄關', 2),
('design', 'portfolio', '/images/design/portfolio/design-work-03.jpg', '輕奢現代｜石紋客餐廳', 3),
('design', 'portfolio', '/images/design/portfolio/design-work-04.jpg', '極簡北歐｜純白入戶', 4),
('design', 'portfolio', '/images/design/portfolio/design-work-05.jpg', '日式和風｜日光臥榻', 5),
('construction', 'hero', '/images/construction/hero/construction-hero.jpg', '裕綸室內裝修', 1),
('construction', 'portfolio', '/images/construction/portfolio/construction-project-01.jpg', '精準裁切，構築空間', 1),
('construction', 'portfolio', '/images/construction/portfolio/construction-project-02.jpg', '設計落地：現場監工', 2),
('construction', 'portfolio', '/images/construction/portfolio/construction-project-03.jpg', '泥作整平，空間基石', 3),
('construction', 'portfolio', '/images/construction/portfolio/construction-project-04.jpg', '專業電工紀實', 4),
('construction', 'portfolio', '/images/construction/portfolio/construction-project-05.jpg', '嚴謹的高空作業', 5);
