# GitHub Repository Traffic Viewer

🚀 Kendi GitHub depo trafik istatistiklerinizi görüntülemek için kullanışlı bir araç

(https://github.com/metatronslove/github-repo-traffic-viewer/blob/main/docs/forklay%C4%B1n-diyorum-y%C3%BCkledi%C4%9Fimden-beri-bin-klon-s%C4%B1f%C4%B1r-fork.png?raw=true)

## Özellikler

- Tüm depolarınız için trafik istatistikleri (views/clones)
- Zaman içinde görselleştirme
- Çoklu dil desteği (TR/EN)
- Sayfalandırma ve filtreleme

## Nasıl Kullanılır?

### 1. Forklayın ve Kurun

1. **Bu depoyu fork layın**:
   - Sağ üstteki "Fork" butonuna tıklayarak kendi GitHub hesabınıza kopyalayın

2. **Personal Access Token (PAT) Oluşturun**:
   - GitHub'da sağ üst köşedeki profil fotoğrafınıza tıklayın > "Settings" > "Developer settings" > "Personal access tokens" > "Tokens (classic)"
   - "Generate new token" > "Generate new token (classic)" butonuna tıklayın
   - Token için bir isim verin (örneğin "Repo Traffic Viewer")
   - Aşağıdaki izinleri seçin: (admin:repo_hook, read:org, repo)
     - `repo` (tam kontrol)
     - `workflow` (Actions çalıştırmak için)
   - "Generate token" butonuna basın
   - **Oluşturulan token'ı bir yere kaydedin**, çünkü sadece bir kez gösterilecek!

3. **Token'ı Repository Secret olarak ekleyin**:
   - Forkladığınız depoya gidin > "Settings" > "Secrets and variables" > "Actions"
   - "New repository secret" butonuna tıklayın
   - Name kısmına `PERSONAL_ACCESS_TOKEN` yazın
   - Value kısmına oluşturduğunuz token'ı yapıştırın
   - "Add secret" butonuna basın

4. **GitHub Pages'i etkinleştirin**:
   - Forkladığınız depoda "Settings" > "Pages" sekmesine gidin
   - Source kısmından "Deploy from a branch" seçeneğini seçin
   - Branch olarak "main", folder olarak "/docs" seçin
   - Save butonuna basın

5. **Actions'ı manuel çalıştırın (ilk veri toplama için)**:
   - Forkladığınız depoda "Actions" sekmesine gidin
   - "GitHub Traffic Data Collector" workflow'unu seçin
   - "Run workflow" butonuna basarak manuel çalıştırın
   - Bu işlem ilk verilerin toplanmasını sağlayacak

6. **Sayfanız hazır!**:
   - Birkaç dakika sonra `https://[KULLANICI-ADINIZ].github.io/github-repo-traffic-viewer/` adresinden erişebilirsiniz
   - Veriler her saat başı otomatik güncellenecek

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

## Sık Sorulan Sorular

### ❓ Veriler ne sıklıkla güncellenir?
- Varsayılan olarak her saat başı güncellenir (`cron: '0 * * * *'`). 
- `fetch-traffic.yml` dosyasını düzenleyerek sıklığı değiştirebilirsiniz.

### ❓ Neden verileri göremiyorum?
1. PAT (Personal Access Token) doğru izinlere sahip mi kontrol edin (`repo` ve `workflow`)
2. Actions sekmesinde workflow'un başarıyla çalıştığından emin olun
3. İlk çalıştırmada manuel olarak workflow'u tetiklediğinizden emin olun

### ❓ Veriler nerede saklanıyor?
- Tüm veriler `docs/data/` klasörü altında JSON formatında saklanır
- Bu dosyalar GitHub'da public olarak görülebilir, ancak sadece sizin depolarınızın trafik verilerini içerir

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
