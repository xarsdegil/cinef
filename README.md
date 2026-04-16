# cinef

Film kulübü için tasarlanan, zaman bazlı yorum ve emote katmanı olan topluluk odaklı izleme platformunun ilk iterasyon scaffold’u.

## Stack

- Next.js 16 + TypeScript + App Router
- Park UI + Panda CSS
- Prisma + Zod
- Mock auth ve mock repository katmanı

## Proje yapısı

```text
src/
  app/                     # Route'lar, layout ve global shell
  components/layout/       # App shell parçaları
  components/ui/           # Park UI kaynak bileşenleri
  features/
    auth/                  # Auth şemaları, mock session ve login UI
    films/                 # Film şemaları ve izleme deneyimi
    comments/              # Timed comment modeli ve paneli
    reactions/             # Emote bar ve timeline strip
    reviews/               # Film sonu yorum sekmeleri
    archive/               # Arşiv grid'i
    admin/                 # Admin overview bileşenleri
  lib/
    config/                # Uygulama sabitleri
    mock/                  # Mock data ve repository katmanı
    prisma/                # Prisma client singleton
    utils/                 # Format yardımcıları
  theme/                   # Park UI + Panda tema dosyaları
prisma/
  schema.prisma            # İlk veri modeli taslağı
  seed.ts                  # Mock veriyi SQLite'a yazan seed
```

## Kurulum

1. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

2. Ortam değişkenini hazırlayın:

   ```bash
   copy .env.example .env
   ```

3. Prisma client ve yerel veritabanını hazırlayın:

   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

   Not: `db:push` script'i bazı Windows/OneDrive kurulumlarında Prisma schema engine hata verirse aynı şemayı SQL diff üzerinden uygular.

4. Geliştirme sunucusunu başlatın:

   ```bash
   npm run dev
   ```

## Mimari seçimler ve kısa rationale

- Park UI bileşenleri kaynak kod olarak projeye alındı.
  Rationale: Görsel tutarlılığı korurken ileride recipe düzeyinde düzenleme yapmayı kolaylaştırır.

- Mock data doğrudan sayfalarda değil, `src/lib/mock/repository.ts` içinde toplandı.
  Rationale: Sonraki iterasyonda Prisma sorgularına geçerken UI katmanını kırmadan repository içini değiştirebiliriz.

- Auth için `getMockSession()` accessor bırakıldı.
  Rationale: İlk sürümde mock kullanıcıyla devam ederken gerçek Twitch OAuth callback akışına uygun bir sınır oluşturur.

- `/film/[slug]` ve `/archive/[slug]` aynı watch experience bileşenini paylaşıyor.
  Rationale: Aktif gösterim ve replay modu aynı çekirdek düzeni kullanıyor; bu da fullscreen overlay yorum deneyimi için güçlü temel sağlar.

- Prisma şeması SQLite ile başlatıldı.
  Rationale: Lokal geliştirme ve seed akışı basit kalır; model yapısı daha sonra PostgreSQL'e taşınabilir.

## İlk iterasyonda neler hazır?

- Koyu tema odaklı Park UI/Panda CSS kurulumu
- App shell ve route scaffold'u
- `/film/[slug]` için:
  büyük video alanı
  timed comments paneli
  emote bar
  timeline interaction strip
  spoilerlı / spoilersız review sekmeleri
- `/archive`, `/archive/[slug]`, `/login`, `/admin` sayfaları
- Zod şemaları ve mock veri akışı
- Prisma şeması ve seed taslağı

## Bilerek sonraya bırakılanlar

- Gerçek Twitch OAuth entegrasyonu
- Gerçek upload / media yönetimi
- API route'ları ve server actions
- Persist edilen yorum / emote akışı
- Moderasyon işlemlerinin yazılabilir UI'ı
- Gerçek zamanlı senkron izleme
- Search params tabanlı arşiv filtreleri
- Test altyapısı

## Sonraki geliştirme adımları

1. Mock repository katmanını Prisma read model'lerine taşı.
2. Auth.js veya özel OAuth akışı ile Twitch girişini ekle.
3. Timed comment ve reaction submit akışını server action/API ile kalıcı hale getir.
4. Archive replay için yoğun an cluster'larını ve sahne linklerini ekle.
5. Admin tarafına film CRUD, role management ve moderasyon mutasyonları ekle.
