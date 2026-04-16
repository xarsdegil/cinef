# Film Kulübü Platformu — Detaylı Proje Spesifikasyonu

## 1. Proje Özeti

Bu proje, haftalık film gösterimleri etrafında kurgulanan, topluluk odaklı bir izleme ve yorumlama platformudur. Kullanıcılar Twitch hesaplarıyla giriş yapar, haftanın filmini site üzerinde izler, izledikleri anda filmin belirli zaman noktalarına yorum veya emote bırakabilir. Daha sonra filmi izleyen diğer kullanıcılar, aynı sahnelerde önceki izleyicilerin bıraktığı yorumları ve tepkileri görebilir. Film bittikten sonra ise spoilerlı ve spoilersız genel değerlendirmeler yazılabilir ve bunlar film arşiv sayfasında saklanır.

Platformun ana farkı, yorumların klasik bir yorum listesi gibi değil, **video zaman çizelgesine bağlı bir katman** olarak çalışmasıdır. Böylece her film için, izleyicilerin tepkilerinden oluşan yaşayan bir topluluk hafızası meydana gelir.

---

## 2. Projenin Ana Amacı

Bu projenin amacı yalnızca video oynatmak değildir. Asıl amaç aşağıdaki deneyimi yaratmaktır:

- Kullanıcı filmi izlerken yalnız hissetmez.
- Aynı sahneye başka insanların nasıl tepki verdiğini görür.
- Film kulübü deneyimi zamana bağlı bir yorum katmanına dönüşür.
- Film sonrasında daha klasik, uzun ve düşünsel tartışmalar için ayrı bir alan oluşur.
- Her haftanın filmi daha sonra arşivlenir ve topluluk etkileşimiyle birlikte yeniden izlenebilir hale gelir.

---

## 3. Hedef Kullanıcı Kitlesi

Bu platformun hedef kitlesi şunlardır:

- Küçük veya orta ölçekli film kulüpleri
- Haftalık ortak film izleme etkinliği yapan topluluklar
- Twitch kültürüne ve emote temelli etkileşime aşina kullanıcılar
- Film izlerken tepki ve bağlam paylaşmayı seven kullanıcılar
- Sonradan izlese bile topluluk hissi yaşamak isteyen üyeler

Öngörülen ilk kullanıcı ölçeği küçüktür. Yaklaşık 20–50 aktif kullanıcı ile başlayacak bir topluluk için tasarlanır. Bu sayede ilk sürüm aşırı karmaşık olmadan geliştirilebilir.

---

## 4. Ürün Vizyonu

Ürün vizyonu şu cümleyle özetlenebilir:

**“Bir filmi tek başına değil, zaman içinde birikmiş topluluk tepkileriyle birlikte izleme deneyimi sunmak.”**

Bu vizyon doğrultusunda platform üç katmanlı bir yapı sunar:

1. **Video oynatma katmanı**
2. **Zaman bağlı etkileşim katmanı**
3. **Film sonrası tartışma ve arşiv katmanı**

---

## 5. Temel Kullanım Senaryosu

### 5.1 Haftanın filmi yayınlanır
Yönetici veya moderatör haftanın filmini sisteme ekler. Film tek aktif gösterim olarak öne çıkarılır.

### 5.2 Kullanıcı Twitch ile giriş yapar
Kullanıcı siteye gelir, Twitch hesabıyla oturum açar ve kendi profil bilgileri sisteme alınır.

### 5.3 Kullanıcı filmi izler
Film site içindeki player üzerinden oynatılır.

### 5.4 Kullanıcı zaman bazlı yorum bırakır
İzleme sırasında, o an bulunduğu zamana bağlı olarak bir yorum yazar.

Örnek:
- 00:17:42 anında “Buradaki kadraj çok iyiymiş”
- 01:02:15 anında “Bu sahne aşırı gerdi”

### 5.5 Kullanıcı emote bırakır
Yorum yazmak istemeyen kullanıcı hızlı tepki bırakabilir.

Örnek emote’lar:
- 😂
- 😮
- 😢
- ❤️
- 🔥
- 👀

### 5.6 Sonraki izleyiciler aynı anlarda bunları görür
Filmi daha sonra izleyen biri, aynı zamana geldiğinde daha önce bırakılan yorumları ve emote’ları görür.

### 5.7 Film bittikten sonra genel yorum bırakılır
Kullanıcı film sonrasında iki ayrı kategoride yorum yapabilir:
- Spoilersız yorum
- Spoilerlı yorum

### 5.8 Film arşive alınır
Hafta sonunda film arşivlenir. Video, zaman çizelgesi yorumları, emote yoğunlukları ve film sonrası yorumlarla birlikte film sayfasında kalır.

---

## 6. Ana Özellikler

## 6.1 Twitch ile Giriş

### Amaç
Kullanıcıların kolay ve hızlı şekilde hesap oluşturmasını sağlamak.

### Davranış
- Kullanıcı “Twitch ile Giriş Yap” butonuna basar.
- OAuth akışı başlar.
- Kullanıcının temel bilgileri alınır.
- Gerekli alanlar yerel veritabanında oluşturulur veya güncellenir.

### Saklanacak kullanıcı verileri
- Twitch User ID
- Kullanıcı adı
- Görünen ad
- Avatar URL
- Hesap oluşturma tarihi
- Son giriş tarihi
- Kullanıcı rolü

### Roller
- `user`
- `moderator`
- `admin`

### Notlar
- İlk sürümde yalnızca Twitch OAuth yeterlidir.
- Daha sonra Discord veya Google giriş eklenebilir.

---

## 6.2 Haftanın Filmi Sistemi

### Amaç
Her hafta öne çıkarılmış tek bir film veya gösterim sunmak.

### Davranış
- Yönetici yeni bir film kaydı oluşturur.
- Film aktif gösterim olarak işaretlenir.
- Ana sayfada “Bu Haftanın Filmi” olarak gösterilir.

### Film alanları
- Başlık
- Slug
- Açıklama
- Yönetmen
- Yıl
- Süre
- Poster
- Kapak görseli
- Türler
- Oyuncular
- Video URL
- Aktif mi
- Arşivde mi
- Yayın başlangıç tarihi
- Yayın bitiş tarihi

### Ek seçenekler
- Film herkese açık mı
- Sadece giriş yapanlara mı açık
- Belirli tarih aralığında mı oynatılabilir

---

## 6.3 Video Oynatıcı

### Amaç
Filmi site içinde güvenilir ve kontrol edilebilir şekilde oynatmak.

### Temel özellikler
- Play / pause
- Seek
- Ses kontrolü
- Tam ekran
- İlerleme çubuğu
- Kalan süre / geçen süre gösterimi
- Mobil uyum

### Teknik beklentiler
- MP4 dosyası statik olarak servis edilebilir.
- İleride HLS desteği opsiyonel olabilir.
- Player, zaman bazlı yorum sistemiyle entegre çalışmalıdır.

### Player event’leri
- `play`
- `pause`
- `timeupdate`
- `seeked`
- `fullscreenchange`
- `ended`

Bu event’ler yorum overlay sistemini ve zaman çizelgesini tetikler.

---

## 6.4 Zaman Bazlı Yorum Sistemi

### Amaç
Kullanıcının video süresindeki belirli anlara bağlı yorum bırakabilmesi.

### Temel mantık
Her yorum bir filme ve o filmin içindeki belirli bir saniyeye bağlanır.

### Veri alanları
- Yorum ID
- Film ID
- Kullanıcı ID
- Timestamp (saniye veya milisaniye)
- Yorum metni
- Oluşturulma tarihi
- Düzenlenme tarihi
- Silinmiş mi
- Moderasyon durumu

### Kullanım biçimi
- Kullanıcı player dururken veya oynarken yorum kutusuna yazı yazar.
- Yorum gönderildiğinde o anki player zamanı alınır.
- Bu zaman, yorumun bağlandığı zaman noktası olur.

### Gösterim biçimleri
1. **Anlık overlay görünüm**
   - Yorum video üstünde kısa süre görünür.
2. **Yan panel görünümü**
   - O ana yakın yorumlar panelde listelenir.
3. **Arşiv görünümü**
   - Tüm yorumlar zaman çizelgesine göre sıralanır.

### Kurallar
- Yorum boş olamaz.
- Karakter limiti olabilir.
- Spam önleme için hız sınırlaması uygulanmalıdır.

---

## 6.5 Zaman Bazlı Emote Sistemi

### Amaç
Kullanıcının hızlı ve düşük sürtünmeli tepki bırakabilmesi.

### Temel mantık
Yorum yerine veya yorumla birlikte, kullanıcı belirli bir anda tek tuşla emote gönderir.

### Veri alanları
- Reaction ID
- Film ID
- Kullanıcı ID
- Timestamp
- Emote türü
- Oluşturulma tarihi

### Başlangıç emote seti
- 😂 komik
- 😮 şaşkınlık
- 😢 duygusal
- ❤️ sevgi / beğeni
- 🔥 etkileyici
- 👀 dikkat / merak

### Davranış
- Emote gönderildiğinde o anki video zamanı alınır.
- Bu tepki zaman çizelgesinde nokta veya yoğunluk olarak görünür.
- Aynı anda çok emote varsa toplulaştırılabilir.

### Kullanıcı deneyimi
- Player altında küçük tepki butonları
- Tam ekranda overlay emote bar
- Kısayol tuşları ile gönderim opsiyonu

---

## 6.6 Tam Ekran Modunda Yorum ve Emote Arayüzü

### Amaç
Kullanıcı tam ekranda izlerken bile etkileşimi kesmeden yorum bırakabilsin.

### Gereksinimler
- Yorum kutusu tam ekran modunda da açılabilmeli.
- Emote butonları tam ekranda görünmeli veya kısayolla açılmalı.
- Overlay görünüm videoyu tamamen kapatmamalı.

### Önerilen davranış
- Sağ altta yarı şeffaf emote bar
- Alt orta veya sağ alt bölgede yorum açma butonu
- `C` ile yorum kutusu açma
- `Esc` ile kapatma
- Kısa süre kullanılmadığında minimizasyon

### Dikkat edilmesi gerekenler
- Mobilde tam ekran davranışı farklı olabilir.
- Browser full screen API kısıtları dikkate alınmalıdır.

---

## 6.7 İzlerken Yorumların Gösterilmesi

### Amaç
Kullanıcı filmi izlerken, o anda ilgili zaman noktasına ait topluluk yorumlarını görebilsin.

### Gösterim kuralları
- Yorumlar belirli bir zaman penceresinde gösterilir.
- Örneğin mevcut zamanın ±2 veya ±3 saniye çevresindeki yorumlar aktif kabul edilir.
- Aynı anda çok fazla yorum varsa sınırlı sayıda gösterilip geri kalanı panelde tutulabilir.

### Gösterim biçimi seçenekleri
- Video üstü kayan mesajlar
- Video yanında eşzamanlı yorum paneli
- Tooltip veya mini bildirim tarzı açılır kartlar

### Filtreleme seçenekleri
- Sadece yorumlar
- Sadece emote’lar
- İkisi birlikte
- Spoiler içerikli anlık yorumlar ayrı işaretlenebilir

---

## 6.8 Zaman Çizelgesi Görselleştirmesi

### Amaç
Filmin hangi anlarında daha fazla etkileşim olduğunu görselleştirmek.

### Arayüz mantığı
- Yatay bir çizgi film süresini temsil eder.
- Küçük noktalar veya işaretler yorum/emote yoğunluğunu gösterir.
- Farklı renkler farklı etkileşim türlerini gösterebilir.

### Gösterilebilecek öğeler
- Yorum noktaları
- Emote noktaları
- En yoğun sahne kümeleri
- Hover ile ön izleme
- Tıklayınca ilgili zamana atlama

### Verimli gösterim için yaklaşım
- Tek tek her olayı çizmek yerine kümelendirme uygulanabilir.
- Örneğin 5 saniyelik veya 10 saniyelik bloklar kullanılabilir.

### Arşivde kullanım
- Film arşiv sayfasında, tüm zaman çizelgesi geçmişi görünür.
- Kullanıcı yoğun noktalara tıklayıp tekrar izleyebilir.

---

## 6.9 Film Sonrası Yorum Sistemi

### Amaç
Filmin geneli hakkında daha uzun ve düşünsel yorumlar için ayrı bir alan sunmak.

### İki ayrı kategori
1. **Spoilersız yorumlar**
2. **Spoilerlı yorumlar**

### Neden ayrılır
- Filmi bitirmemiş kullanıcılar spoiler yememeli.
- Bitiren kullanıcılar daha derin tartışma yapabilmeli.

### Veri alanları
- Review ID
- Film ID
- Kullanıcı ID
- İçerik
- `isSpoiler`
- Oluşturulma tarihi
- Güncellenme tarihi
- Beğeni sayısı (opsiyonel)

### Davranış
- Film sayfasının sonunda iki sekme olur.
- Spoilerlı sekme varsayılan olarak kapalı olabilir.
- Kullanıcı bilinçli şekilde açar.

---

## 6.10 Film Arşiv Sayfası

### Amaç
Geçmiş filmlerin video, etkileşim ve yorum geçmişiyle birlikte saklanması.

### İçerik
- Film bilgileri
- Poster ve kapak
- Video player
- Zaman çizelgesi görselleştirmesi
- Zaman bazlı yorum listesi
- Emote yoğunlukları
- Spoilersız yorumlar
- Spoilerlı yorumlar
- En çok etkileşim alan sahneler

### Ek özellikler
- Belirli zamana link verme
- Filmin öne çıkan yorumları
- Moderatör notları

### Kullanım değeri
Arşiv sayfası, yalnızca eski film listesi değil, topluluk hafızasının kayıt merkezi olur.

---

## 6.11 Moderasyon Sistemi

### Amaç
Yorum ve emote sisteminin kötüye kullanımını engellemek.

### Gerekli moderasyon araçları
- Yorum silme
- Kullanıcıyı mute etme
- Kullanıcıyı yasaklama
- Belirli yorumu gizleme
- Spoiler etiketi zorlama
- Emote spam sınırı

### Otomatik kısıtlar
- X saniyede en fazla Y yorum
- X saniyede en fazla Y emote
- Çok uzun yorumların reddi
- Yasaklı kelime filtresi

### Moderatör görünümü
- Son eklenen yorumlar listesi
- Flag’lenmiş içerikler
- Kullanıcı geçmişi

---

## 6.12 Yönetici Paneli

### Amaç
Filmleri, kullanıcıları ve içerikleri yönetmek.

### Yönetici işlemleri
- Yeni film ekleme
- Film düzenleme
- Aktif filmi seçme
- Arşive taşıma
- Kullanıcı rolü verme
- Yorum silme
- Emote geçmişi inceleme
- Film sonrası yorumları yönetme

### İleri seviye işlemler
- Film için özel emote seti tanımlama
- Gösterim tarihi belirleme
- Film görünürlüğünü ayarlama
- Thumbnail / poster yükleme

---

## 6.13 Bildirimler ve Geri Bildirimler

### İlk sürüm için basit geri bildirimler
- Yorum gönderildi bildirimi
- Emote gönderildi animasyonu
- Silinen içerik uyarısı
- Giriş başarılı mesajı

### İleri sürüm bildirim fikirleri
- Yeni haftanın filmi açıklandı
- Filmin arşivi yayınlandı
- Yorumuna yanıt geldi
- Canlı gösterim başladı

---

## 7. Fonksiyonel Gereksinimler

### Kullanıcı tarafı
- Twitch ile giriş yapılabilmeli.
- Kullanıcı film sayfasını açabilmeli.
- Video oynatılabilmeli.
- Kullanıcı o anki zamana yorum bırakabilmeli.
- Kullanıcı emote bırakabilmeli.
- Kullanıcı diğer yorumları izleme sırasında görebilmeli.
- Kullanıcı spoilerlı ve spoilersız genel yorum bırakabilmeli.
- Kullanıcı arşiv sayfalarında eski filmleri görüntüleyebilmeli.

### Yönetici tarafı
- Yönetici film ekleyebilmeli.
- Yönetici aktif filmi belirleyebilmeli.
- Yönetici yorumları silebilmeli.
- Yönetici kullanıcıları susturabilmeli.
- Yönetici arşivleri yönetebilmeli.

---

## 8. Fonksiyonel Olmayan Gereksinimler

### Performans
- Video izleme sırasında yorum overlay sistemi akıcı çalışmalı.
- Çok sık `timeupdate` kullanımında UI tıkanmamalı.
- Zaman çizelgesi görselleştirmesi tek sayfada yönetilebilir performansta olmalı.

### Güvenlik
- OAuth güvenli uygulanmalı.
- Sunucu tarafında rol kontrolü yapılmalı.
- Yorum API’leri yetki kontrolü olmadan çalışmamalı.
- Rate limiting uygulanmalı.

### Kullanılabilirlik
- Masaüstü deneyim öncelikli olabilir.
- Mobil uyum ikinci aşama olarak iyileştirilebilir.
- Tam ekran modunda etkileşim rahat olmalı.

### Bakım yapılabilirlik
- Kod tabanı modüler olmalı.
- Film, yorum, reaction ve review modülleri ayrılmalı.
- API sözleşmeleri net tanımlanmalı.

---

## 9. Önerilen Teknik Mimari

## 9.1 Frontend
Önerilen teknoloji:
- Next.js
- React
- Tailwind CSS
- İsteğe bağlı olarak özel video player bileşeni

### Sorumluluklar
- Video player arayüzü
- Overlay yorum arayüzü
- Zaman çizelgesi bileşeni
- Film sayfası ve arşiv sayfaları
- Giriş akışı ve kullanıcı oturumu

---

## 9.2 Backend
Önerilen teknoloji:
- Next.js API Routes veya ayrı Node.js servis
- PostgreSQL
- Prisma ORM

### Sorumluluklar
- Kullanıcı yönetimi
- OAuth callback işlemleri
- Film CRUD
- Yorum ve reaction API’leri
- Review API’leri
- Moderasyon işlemleri

---

## 9.3 Realtime Katmanı
İlk sürümde tam gerçek zamanlı senkron izleme şart değildir.

### MVP yaklaşımı
- Yorumlar veritabanına kaydedilir.
- İstemci, gerekli zaman aralıklarını okuyup gösterir.
- Basit polling veya sayfa yüklemede toplu veri çekimi yeterli olabilir.

### İleri sürüm yaklaşımı
- Socket.IO veya WebSocket
- Canlı watch party modu
- Host senkronizasyonu
- Oda bazlı izleme durumu

---

## 9.4 Video Barındırma ve Sunum

### Tavsiye edilen model
- Video sunucuda statik MP4 olarak tutulur.
- Nginx üzerinden servis edilir.
- Her hafta aktif film değiştirilir.

### Sebep
- Kullanıcı sayısı düşük olduğu için yeterlidir.
- Operasyonel maliyet çok düşüktür.
- Kontrol tamamen proje sahibindedir.

### İleri aşama seçenekleri
- HLS
- CDN
- obje depolama

---

## 10. Veritabanı Tasarımı

## 10.1 User
Alanlar:
- id
- twitchId
- username
- displayName
- avatarUrl
- role
- createdAt
- updatedAt
- lastLoginAt
- isMuted
- isBanned

## 10.2 Film
Alanlar:
- id
- title
- slug
- description
- director
- releaseYear
- durationSeconds
- videoUrl
- posterUrl
- coverUrl
- isActive
- isArchived
- publishedAt
- archivedAt
- createdAt
- updatedAt

## 10.3 TimedComment
Alanlar:
- id
- filmId
- userId
- timestampSeconds
- body
- createdAt
- updatedAt
- isDeleted
- deletedBy
- moderationStatus

## 10.4 TimedReaction
Alanlar:
- id
- filmId
- userId
- timestampSeconds
- reactionType
- createdAt

## 10.5 PostFilmReview
Alanlar:
- id
- filmId
- userId
- body
- isSpoiler
- createdAt
- updatedAt
- isDeleted

## 10.6 Optional Screening
Alanlar:
- id
- filmId
- startsAt
- endsAt
- title
- isLive
- createdAt

---

## 11. API Taslağı

## 11.1 Auth
- `GET /api/auth/twitch/login`
- `GET /api/auth/twitch/callback`
- `POST /api/auth/logout`

## 11.2 Film
- `GET /api/films/active`
- `GET /api/films/:slug`
- `GET /api/films/archive`
- `POST /api/admin/films`
- `PATCH /api/admin/films/:id`
- `DELETE /api/admin/films/:id`

## 11.3 Timed Comments
- `GET /api/films/:id/comments`
- `POST /api/films/:id/comments`
- `DELETE /api/comments/:id`

### Filtre parametreleri
- `from`
- `to`
- `around`

## 11.4 Reactions
- `GET /api/films/:id/reactions`
- `POST /api/films/:id/reactions`

## 11.5 Reviews
- `GET /api/films/:id/reviews?spoiler=false`
- `GET /api/films/:id/reviews?spoiler=true`
- `POST /api/films/:id/reviews`
- `DELETE /api/reviews/:id`

## 11.6 Moderation
- `POST /api/admin/comments/:id/delete`
- `POST /api/admin/users/:id/mute`
- `POST /api/admin/users/:id/ban`

---

## 12. Sayfa Yapısı

## 12.1 Ana Sayfa
İçerik:
- Bu haftanın filmi kartı
- Giriş yap butonu
- Son arşivlenen filmler
- Projenin kısa açıklaması

## 12.2 Film Sayfası
İçerik:
- Büyük player
- Yorum paneli
- Emote bar
- Timeline görselleştirmesi
- Film bilgileri
- Genel yorum sekmeleri

## 12.3 Arşiv Sayfası
İçerik:
- Eski filmler listesi
- Kart bazlı görünüm
- Arama / filtreleme opsiyonu

## 12.4 Tekil Arşiv Film Sayfası
İçerik:
- Film oynatıcı
- Tüm zamanlı yorum geçmişi
- En yoğun anlar
- Spoilersız ve spoilerlı yorumlar

## 12.5 Profil Sayfası
Opsiyonel:
- Kullanıcının bıraktığı yorumlar
- Son izlenen filmler
- En çok kullandığı emote’lar

## 12.6 Admin Paneli
İçerik:
- Film yönetimi
- Kullanıcı yönetimi
- Yorum moderasyonu
- Arşiv yönetimi

---

## 13. Kullanıcı Arayüzü İlkeleri

### Tasarım yaklaşımı
- Koyu tema öncelikli olabilir.
- Video içerik merkezi olmalı.
- Yorumlar videoyu tamamen kapatmamalı.
- Etkileşim elemanları sade ve hızlı kullanılabilir olmalı.

### Önemli UI bileşenleri
- Player overlay comment box
- Emote quick bar
- Timeline markers
- Spoiler toggle alanı
- Hover preview kartları

### Erişilebilirlik
- Klavye ile kullanılabilirlik
- Kontrast dengesi
- Buton ve alanların okunabilirliği
- Alt yazı desteği ileride eklenebilir

---

## 14. MVP Kapsamı

İlk sürümde mutlaka bulunması gerekenler:

1. Twitch login
2. Aktif film sayfası
3. MP4 player
4. Timestamp’e bağlı yorum bırakma
5. Timestamp’e bağlı emote bırakma
6. İzleme sırasında yorum gösterimi
7. Basit timeline marker’ları
8. Spoilerlı / spoilersız genel yorumlar
9. Arşiv sayfası
10. Basit admin paneli

İlk sürümde ertelenebilecekler:
- Gerçek zamanlı senkron izleme
- Watch party oda sistemi
- Gelişmiş profil sayfaları
- Gelişmiş analitik
- Gelişmiş emote mağazası veya özel setler

---

## 15. İleri Sürüm Fikirleri

### 15.1 Canlı senkron gösterim
Bir host filmi başlatır, diğer kullanıcılar aynı oynatma durumuna senkron olur.

### 15.2 Sahne bazlı tartışma başlıkları
Belirli anlar için yan tartışmalar açılabilir.

### 15.3 En çok konuşulan sahneler
Arşiv sayfasında otomatik analiz çıkabilir.

### 15.4 Kullanıcı rozetleri
- İlk yorum rozetleri
- En aktif izleyici
- En çok reaction bırakan kullanıcı

### 15.5 Bildirim sistemi
Haftanın filmi başladığında kullanıcılara haber verilebilir.

### 15.6 Alt yazı entegrasyonu
Yorumlar altyazı satırlarıyla birlikte daha anlamlı gösterilebilir.

---

## 16. Riskler ve Dikkat Edilecek Noktalar

### Teknik riskler
- Tam ekran overlay davranışı tarayıcılar arasında farklı olabilir.
- Çok sık yorum gösterimi performansı etkileyebilir.
- Mobil video davranışı masaüstünden farklıdır.

### Operasyonel riskler
- İçerik moderasyonu ihmal edilirse deneyim bozulur.
- Spam veya troll yorumlar küçük toplulukta bile rahatsızlık yaratabilir.

### Ürün riski
- Çok fazla özellik ilk sürümde yapılırsa ürün dağılabilir.
- Önce temel deneyimin çalışması gerekir: video + timed comment + arşiv.

---

## 17. Başarı Kriterleri

Projenin başarılı sayılması için ölçülebilecek göstergeler:

- Haftalık film sayfasına giriş yapan kullanıcı sayısı
- Film başına bırakılan zaman bazlı yorum sayısı
- Film başına bırakılan emote sayısı
- Arşiv sayfasında tekrar izleme oranı
- Film sonrası yorum sayısı
- Kullanıcıların bir sonraki hafta geri dönme oranı

### Nitel başarı kriterleri
- Kullanıcıların “toplulukla izliyormuş gibi hissetmesi”
- Aynı sahnelerde etkileşimin tekrar tekrar doğması
- Arşivlenen filmlerin canlı bir geçmiş gibi görünmesi

---

## 18. Geliştirme Öncelik Planı

### Faz 1 — Temel Kurulum
- Proje iskeleti
- Twitch auth
- Kullanıcı modeli
- Film modeli
- Admin üzerinden film ekleme

### Faz 2 — Oynatıcı ve Zaman Bazlı Etkileşim
- Video player
- Timed comment ekleme
- Timed reaction ekleme
- Yorumların playback sırasında gösterimi
- Basit timeline işaretleme

### Faz 3 — Film Sonrası Katman
- Spoilersız yorumlar
- Spoilerlı yorumlar
- Film arşiv sayfası

### Faz 4 — Moderasyon ve İyileştirme
- Yorum silme
- Kullanıcı susturma
- Spam koruması
- Performans iyileştirmeleri

### Faz 5 — Gelişmiş Özellikler
- Watch party
- Canlı senkron
- Gelişmiş profil ve analiz

---

## 19. Sonuç

Bu proje, küçük bir film kulübü için hem teknik olarak gerçekçi hem de ürün olarak ayırt edici bir yapıya sahiptir. Ana değer önerisi, videonun üstüne bindirilen zaman bağlı topluluk hafızasıdır. Kullanıcı yalnızca film izlemez; filmi, ondan önce veya onunla birlikte izleyen insanların duygusal ve düşünsel izleriyle birlikte deneyimler.

Doğru bir MVP kapsamıyla başlanırsa bu proje, küçük bir topluluk aracı olmaktan çıkıp güçlü bir niş sosyal izleme platformuna dönüşebilir.

