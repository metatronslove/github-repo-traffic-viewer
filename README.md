# GitHub Repository Traffic Viewer

🚀 Kendi GitHub depo trafik istatistiklerinizi görüntülemek için kullanışlı bir araç

![Örnek Görüntü](https://example.com/screenshot.jpg) <!-- Gerçek bir screenshot linki ekleyin -->

## Özellikler

- Tüm depolarınız için trafik istatistikleri (views/clones)
- Zaman içinde görselleştirme
- Çoklu dil desteği (TR/EN)
- Sayfalandırma ve filtreleme

## Nasıl Kullanılır?

### 1. Forklayın ve Kurun

1. **Bu depoyu fork layın**:
   - Sağ üstteki "Fork" butonuna tıklayarak kendi GitHub hesabınıza kopyalayın

2. **GitHub Pages'i etkinleştirin**:
   - Forkladığınız depoda "Settings" > "Pages" sekmesine gidin
   - Source kısmından "Deploy from a branch" seçeneğini seçin
   - Branch olarak "main" veya "master", folder olarak "/docs" seçin
   - Save butonuna basın

3. **Sayfanız hazır!**:
   - Birkaç dakika sonra `https://[KULLANICI-ADINIZ].github.io/github-repo-traffic-viewer/` adresinden erişebilirsiniz

### 2. Yeni Dil Ekleme

Depoyu kendi dilinizde kullanmak için:

1. `index.html` dosyasını açın
2. `translations` nesnesini bulun (satır ~130)
3. Yeni bir dil bloğu ekleyin, örneğin İspanyolca için:

```javascript
es: {
    title: "Estadísticas de tráfico de repositorios",
    loadingAuth: "Verificando sesión de GitHub...",
    // Diğer çevirileri ekleyin...
}
```

4. Dil seçiciye buton ekleyin (satır ~40):

```html
<button class="lang-btn" onclick="changeLanguage('es')">ES</button>
```

### 3. Geliştirme ve Özelleştirme

- **Tema değiştirme**: `style` etiketleri içindeki renk kodlarını değiştirin
- **Yeni özellikler**: JavaScript kodunu (`script` etiketi içinde) düzenleyerek yeni grafikler ekleyebilirsiniz
- **API entegrasyonları**: GitHub API'sini kullanarak yeni veriler ekleyebilirsiniz

## Neden Forklamalısınız?

✔️ **Gizlilik**: Kendi trafik verileriniz sadece sizin tarayıcınızda işlenir  
✔️ **Özelleştirme**: Kendi dilinizi ve görsel temasını ekleyebilirsiniz  
✔️ **Sürekli Erişim**: Orijinal repo silinse bile sizin fork'unuz çalışmaya devam eder  
✔️ **Geliştirme**: Kendi ihtiyaçlarınıza göre araçı geliştirebilirsiniz  

## Katkıda Bulunma

Eğer bu projeyi geliştirmek isterseniz:

1. Repoyu fork layın
2. Yeni bir branch oluşturun (`git checkout -b feature/awesome-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some awesome feature'`)
4. Branch'inize push yapın (`git push origin feature/awesome-feature`)
5. Bir Pull Request açın

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

**Not**: Bu araç sadece fork yapan kullanıcının kendi depolarının trafik verilerini gösterir. Başka kullanıcıların verilerini görüntülemez.

## Önemli Noktalar

1. **Adım adım fork talimatları** - GitHub'ı yeni kullanmaya başlayanlar için net yönergeler
2. **Dil ekleme rehberi** - Kod içinde tam olarak nereye ekleneceği gösterilmiş
3. **Görsel öğeler** - Screenshot alanı bırakılmış (gerçek bir görsel eklemelisiniz)
4. **Katkı talimatları** - Başkalarının katkı yapmasını teşvik eden açık talimatlar
5. **Nedenler bölümü** - Kullanıcıları fork yapmaya ikna eden net avantajlar

## 🎁 Destek Ol
**Çalışmalarımın sürmesine olanak sağlamak için bağışta bulunabilirsiniz.**  
*Lütfen bağış yapmadan önce en az iki kere düşünün çünkü geri ödemeler için ayıracak hiç zamanım ve imkanım yok.*  
**Katkılarınız için paylaştıklarımı kullanan herkes adına teşekkürlerimi kabul edin.**

## 🎁 Support Me
**You can support me to keep my projects alive.**  
*Please think twice before donating because I have no time or means to handle refunds.*  
**On behalf of everyone who uses what I share, I accept your thanks for your contributions.**

[![Papara ile Destekle](https://img.shields.io/badge/Bağış%20Yap-%E2%9D%A4-blue)](https://ppr.ist/1T9dx8tUT)
[![Donate using Papara](https://img.shields.io/badge/Donate-%E2%9D%A4-blue)](https://ppr.ist/1T9dx8tUT)

[![Papara ile Desteklen](1513592797QR.png)](https://ppr.ist/1T99dYF5X)