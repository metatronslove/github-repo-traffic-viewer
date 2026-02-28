// ============================================================
// INFINITYFREE CHAT WIDGET - TÜM ÖZELLİKLERİYLE 2500+ SATIR
// ============================================================
// - 9 Dil Desteği
// - 36 Emoji
// - İsim Değiştirme
// - Kullanıcı Listesi
// - Sesli Bildirim
// - Yazıyor İndikatörü
// - Okunma Durumu
// - Özel Mesajlar
// - Sürüklenebilir Pencere
// - Bildirim Sayacı
// - Mesaj Geçmişi
// - Yeniden Bağlanma
// - Hata Yönetimi
// - Responsive Tasarım
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 1. YAPILANDIRMA (50 SATIR)
    // ============================================================
    const scriptTag = document.currentScript || document.querySelector('script[data-name="Chat-Widget"]');
    if (!scriptTag) {
        console.error('❌ Chat-Widget script tag bulunamadı');
        return;
    }

    const config = {
        tokenServer: scriptTag.dataset.tokenServer || 'https://ebced.free.nf/chat/token.php',
        room: scriptTag.dataset.room || 'ebcedfreenf',
        color: scriptTag.dataset.color || '#4CAF50',
        position: scriptTag.dataset.position || 'right',
        xMargin: parseInt(scriptTag.dataset.x_margin) || 18,
        yMargin: parseInt(scriptTag.dataset.y_margin) || 68,
        title: scriptTag.dataset.title || 'Canlı Sohbet',
        language: scriptTag.dataset.language || 'tr'
    };

    console.log('📋 Yapılandırma yüklendi:', config);

    // ============================================================
    // 2. DİL ÇEVİRİLERİ - 9 DİL TAMAMI (250 SATIR)
    // ============================================================
    const translations = {
        tr: {
            // Temel UI
            title: 'Canlı Sohbet',
            typeHere: 'Mesaj yazın...',
            send: 'Gönder',
            connecting: 'Bağlanıyor...',
            connected: 'Bağlandı',
            disconnected: 'Bağlantı Kesildi',
            reconnecting: 'Yeniden Bağlanıyor...',
            
            // Durumlar
            online: 'çevrimiçi',
            offline: 'çevrimdışı',
            yourself: 'Siz',
            members: 'kişi çevrimiçi',
            noUsers: 'Çevrimiçi kullanıcı yok',
            
            // Butonlar
            close: 'Kapat',
            open: 'Sohbeti Aç',
            emoji: 'Emoji',
            language: 'Dil',
            changeName: 'İsim Değiştir',
            save: 'Kaydet',
            cancel: 'İptal',
            namePlaceholder: 'Yeni isminiz...',
            soundOn: 'Ses Açık',
            soundOff: 'Ses Kapalı',
            
            // Mesajlar
            welcome: 'Sohbete hoş geldiniz!',
            firstMessage: 'İlk mesajı siz yazın.',
            system: 'Sistem',
            changedName: 'kullanıcı adını değiştirdi:',
            typing: 'yazıyor...',
            onlineUsers: 'Çevrimiçi Kullanıcılar',
            messagePlaceholder: 'Mesajınızı yazın...',
            sendMessage: 'Mesaj Gönder',
            emojiPicker: 'Emoji Seçici',
            languageSelector: 'Dil Seçici',
            
            // Onaylar
            confirmNameChange: 'İsim değiştirilsin mi?',
            nameChanged: 'İsim değiştirildi',
            confirmExit: 'Sohbetten ayrılmak istediğinize emin misiniz?',
            
            // Hatalar
            errorConnecting: 'Bağlantı hatası, yeniden deneniyor...',
            errorToken: 'Token alınamadı, sayfayı yenileyin',
            errorChannel: 'Kanal hatası, yeniden bağlanılıyor...',
            errorMessage: 'Mesaj gönderilemedi',
            errorNetwork: 'Ağ bağlantısı yok',
            
            // Yeniden bağlanma
            reconnectAttempt: 'Yeniden bağlanma denemesi',
            reconnectSuccess: 'Yeniden bağlanıldı',
            reconnectFailed: 'Yeniden bağlanılamadı',
            
            // Zaman
            today: 'Bugün',
            yesterday: 'Dün',
            thisWeek: 'Bu Hafta',
            older: 'Eski',
            
            // Okunma durumu
            sent: 'Gönderildi',
            delivered: 'İletildi',
            read: 'Okundu',
            
            // Özel mesaj
            privateMessage: 'Özel Mesaj',
            reply: 'Cevapla',
            delete: 'Sil',
            edit: 'Düzenle',
            copy: 'Kopyala',
            
            // Bildirimler
            newMessage: 'Yeni mesaj',
            userJoined: 'katıldı',
            userLeft: 'ayrıldı',
            
            // Yardım
            help: 'Yardım',
            settings: 'Ayarlar',
            logout: 'Çıkış',
            profile: 'Profil'
        },
        en: {
            title: 'Live Chat',
            typeHere: 'Type here...',
            send: 'Send',
            connecting: 'Connecting...',
            connected: 'Connected',
            disconnected: 'Disconnected',
            reconnecting: 'Reconnecting...',
            online: 'online',
            offline: 'offline',
            yourself: 'You',
            members: 'members online',
            noUsers: 'No users online',
            close: 'Close',
            open: 'Open Chat',
            emoji: 'Emoji',
            language: 'Language',
            changeName: 'Change Name',
            save: 'Save',
            cancel: 'Cancel',
            namePlaceholder: 'Your new name...',
            soundOn: 'Sound On',
            soundOff: 'Sound Off',
            welcome: 'Welcome to chat!',
            firstMessage: 'Be the first to write.',
            system: 'System',
            changedName: 'changed username to:',
            typing: 'is typing...',
            onlineUsers: 'Online Users',
            messagePlaceholder: 'Type your message...',
            sendMessage: 'Send Message',
            emojiPicker: 'Emoji Picker',
            languageSelector: 'Language Selector',
            confirmNameChange: 'Change name?',
            nameChanged: 'Name changed',
            confirmExit: 'Are you sure you want to leave?',
            errorConnecting: 'Connection error, retrying...',
            errorToken: 'Token error, refresh the page',
            errorChannel: 'Channel error, reconnecting...',
            errorMessage: 'Message could not be sent',
            errorNetwork: 'No network connection',
            reconnectAttempt: 'Reconnection attempt',
            reconnectSuccess: 'Reconnected',
            reconnectFailed: 'Reconnection failed',
            today: 'Today',
            yesterday: 'Yesterday',
            thisWeek: 'This Week',
            older: 'Older',
            sent: 'Sent',
            delivered: 'Delivered',
            read: 'Read',
            privateMessage: 'Private Message',
            reply: 'Reply',
            delete: 'Delete',
            edit: 'Edit',
            copy: 'Copy',
            newMessage: 'New message',
            userJoined: 'joined',
            userLeft: 'left',
            help: 'Help',
            settings: 'Settings',
            logout: 'Logout',
            profile: 'Profile'
        },
        de: {
            title: 'Live-Chat',
            typeHere: 'Nachricht schreiben...',
            send: 'Senden',
            connecting: 'Verbinde...',
            connected: 'Verbunden',
            disconnected: 'Getrennt',
            reconnecting: 'Verbinde neu...',
            online: 'online',
            offline: 'offline',
            yourself: 'Sie',
            members: 'Mitglieder online',
            noUsers: 'Keine Benutzer online',
            close: 'Schließen',
            open: 'Chat öffnen',
            emoji: 'Emoji',
            language: 'Sprache',
            changeName: 'Name ändern',
            save: 'Speichern',
            cancel: 'Abbrechen',
            namePlaceholder: 'Ihr neuer Name...',
            soundOn: 'Ton Ein',
            soundOff: 'Ton Aus',
            welcome: 'Willkommen im Chat!',
            firstMessage: 'Schreiben Sie die erste Nachricht.',
            system: 'System',
            changedName: 'hat den Benutzernamen geändert zu:',
            typing: 'schreibt...',
            onlineUsers: 'Online-Benutzer',
            messagePlaceholder: 'Nachricht schreiben...',
            sendMessage: 'Nachricht senden',
            emojiPicker: 'Emoji-Auswahl',
            languageSelector: 'Sprachauswahl',
            confirmNameChange: 'Namen ändern?',
            nameChanged: 'Name geändert',
            confirmExit: 'Sind Sie sicher, dass Sie gehen möchten?',
            errorConnecting: 'Verbindungsfehler, versuche erneut...',
            errorToken: 'Token-Fehler, Seite neu laden',
            errorChannel: 'Kanal-Fehler, verbinde neu...',
            errorMessage: 'Nachricht konnte nicht gesendet werden',
            errorNetwork: 'Keine Netzwerkverbindung',
            reconnectAttempt: 'Verbindungsversuch',
            reconnectSuccess: 'Wieder verbunden',
            reconnectFailed: 'Verbindung fehlgeschlagen',
            today: 'Heute',
            yesterday: 'Gestern',
            thisWeek: 'Diese Woche',
            older: 'Älter',
            sent: 'Gesendet',
            delivered: 'Zugestellt',
            read: 'Gelesen',
            privateMessage: 'Private Nachricht',
            reply: 'Antworten',
            delete: 'Löschen',
            edit: 'Bearbeiten',
            copy: 'Kopieren',
            newMessage: 'Neue Nachricht',
            userJoined: 'ist beigetreten',
            userLeft: 'hat verlassen',
            help: 'Hilfe',
            settings: 'Einstellungen',
            logout: 'Abmelden',
            profile: 'Profil'
        },
        fr: {
            title: 'Chat en direct',
            typeHere: 'Écrivez ici...',
            send: 'Envoyer',
            connecting: 'Connexion...',
            connected: 'Connecté',
            disconnected: 'Déconnecté',
            reconnecting: 'Reconnexion...',
            online: 'en ligne',
            offline: 'hors ligne',
            yourself: 'Vous',
            members: 'membres en ligne',
            noUsers: 'Aucun utilisateur en ligne',
            close: 'Fermer',
            open: 'Ouvrir le chat',
            emoji: 'Émoji',
            language: 'Langue',
            changeName: 'Changer le nom',
            save: 'Enregistrer',
            cancel: 'Annuler',
            namePlaceholder: 'Votre nouveau nom...',
            soundOn: 'Son Activé',
            soundOff: 'Son Désactivé',
            welcome: 'Bienvenue sur le chat!',
            firstMessage: 'Soyez le premier à écrire.',
            system: 'Système',
            changedName: 'a changé son nom en:',
            typing: 'écrit...',
            onlineUsers: 'Utilisateurs en ligne',
            messagePlaceholder: 'Écrivez votre message...',
            sendMessage: 'Envoyer le message',
            emojiPicker: 'Sélecteur d\'emoji',
            languageSelector: 'Sélecteur de langue',
            confirmNameChange: 'Changer le nom?',
            nameChanged: 'Nom changé',
            confirmExit: 'Êtes-vous sûr de vouloir quitter?',
            errorConnecting: 'Erreur de connexion, nouvelle tentative...',
            errorToken: 'Erreur de token, actualisez la page',
            errorChannel: 'Erreur de canal, reconnexion...',
            errorMessage: 'Le message n\'a pas pu être envoyé',
            errorNetwork: 'Pas de connexion réseau',
            reconnectAttempt: 'Tentative de reconnexion',
            reconnectSuccess: 'Reconnecté',
            reconnectFailed: 'Échec de la reconnexion',
            today: 'Aujourd\'hui',
            yesterday: 'Hier',
            thisWeek: 'Cette semaine',
            older: 'Plus ancien',
            sent: 'Envoyé',
            delivered: 'Distribué',
            read: 'Lu',
            privateMessage: 'Message privé',
            reply: 'Répondre',
            delete: 'Supprimer',
            edit: 'Modifier',
            copy: 'Copier',
            newMessage: 'Nouveau message',
            userJoined: 'a rejoint',
            userLeft: 'a quitté',
            help: 'Aide',
            settings: 'Paramètres',
            logout: 'Déconnexion',
            profile: 'Profil'
        },
        es: {
            title: 'Chat en vivo',
            typeHere: 'Escribe aquí...',
            send: 'Enviar',
            connecting: 'Conectando...',
            connected: 'Conectado',
            disconnected: 'Desconectado',
            reconnecting: 'Reconectando...',
            online: 'en línea',
            offline: 'desconectado',
            yourself: 'Tú',
            members: 'miembros en línea',
            noUsers: 'No hay usuarios en línea',
            close: 'Cerrar',
            open: 'Abrir chat',
            emoji: 'Emoji',
            language: 'Idioma',
            changeName: 'Cambiar nombre',
            save: 'Guardar',
            cancel: 'Cancelar',
            namePlaceholder: 'Tu nuevo nombre...',
            soundOn: 'Sonido Activado',
            soundOff: 'Sonido Desactivado',
            welcome: '¡Bienvenido al chat!',
            firstMessage: 'Sé el primero en escribir.',
            system: 'Sistema',
            changedName: 'cambió su nombre a:',
            typing: 'escribe...',
            onlineUsers: 'Usuarios en línea',
            messagePlaceholder: 'Escribe tu mensaje...',
            sendMessage: 'Enviar mensaje',
            emojiPicker: 'Selector de emojis',
            languageSelector: 'Selector de idioma',
            confirmNameChange: '¿Cambiar nombre?',
            nameChanged: 'Nombre cambiado',
            confirmExit: '¿Estás seguro de que quieres salir?',
            errorConnecting: 'Error de conexión, reintentando...',
            errorToken: 'Error de token, actualice la página',
            errorChannel: 'Error de canal, reconectando...',
            errorMessage: 'No se pudo enviar el mensaje',
            errorNetwork: 'Sin conexión de red',
            reconnectAttempt: 'Intento de reconexión',
            reconnectSuccess: 'Reconectado',
            reconnectFailed: 'Error al reconectar',
            today: 'Hoy',
            yesterday: 'Ayer',
            thisWeek: 'Esta semana',
            older: 'Anterior',
            sent: 'Enviado',
            delivered: 'Entregado',
            read: 'Leído',
            privateMessage: 'Mensaje privado',
            reply: 'Responder',
            delete: 'Eliminar',
            edit: 'Editar',
            copy: 'Copiar',
            newMessage: 'Nuevo mensaje',
            userJoined: 'se unió',
            userLeft: 'salió',
            help: 'Ayuda',
            settings: 'Ajustes',
            logout: 'Cerrar sesión',
            profile: 'Perfil'
        },
        ar: {
            title: 'الدردشة المباشرة',
            typeHere: 'اكتب هنا...',
            send: 'إرسال',
            connecting: 'جاري الاتصال...',
            connected: 'متصل',
            disconnected: 'غير متصل',
            reconnecting: 'جاري إعادة الاتصال...',
            online: 'متصل',
            offline: 'غير متصل',
            yourself: 'أنت',
            members: 'عضو متصل',
            noUsers: 'لا يوجد مستخدمين متصلين',
            close: 'إغلاق',
            open: 'فتح الدردشة',
            emoji: 'رموز تعبيرية',
            language: 'اللغة',
            changeName: 'تغيير الاسم',
            save: 'حفظ',
            cancel: 'إلغاء',
            namePlaceholder: 'اسمك الجديد...',
            soundOn: 'الصوت مفعل',
            soundOff: 'الصوم معطل',
            welcome: 'مرحباً بك في الدردشة!',
            firstMessage: 'كن أول من يكتب.',
            system: 'النظام',
            changedName: 'غير اسمه إلى:',
            typing: 'يكتب...',
            onlineUsers: 'المستخدمون المتصلون',
            messagePlaceholder: 'اكتب رسالتك...',
            sendMessage: 'إرسال الرسالة',
            emojiPicker: 'اختيار الرموز',
            languageSelector: 'اختيار اللغة',
            confirmNameChange: 'تغيير الاسم؟',
            nameChanged: 'تم تغيير الاسم',
            confirmExit: 'هل أنت متأكد أنك تريد المغادرة؟',
            errorConnecting: 'خطأ في الاتصال، جاري إعادة المحاولة...',
            errorToken: 'خطأ في الرمز، يرجى تحديث الصفحة',
            errorChannel: 'خطأ في القناة، جاري إعادة الاتصال...',
            errorMessage: 'تعذر إرسال الرسالة',
            errorNetwork: 'لا يوجد اتصال بالشبكة',
            reconnectAttempt: 'محاولة إعادة الاتصال',
            reconnectSuccess: 'تمت إعادة الاتصال',
            reconnectFailed: 'فشلت إعادة الاتصال',
            today: 'اليوم',
            yesterday: 'أمس',
            thisWeek: 'هذا الأسبوع',
            older: 'أقدم',
            sent: 'تم الإرسال',
            delivered: 'تم التوصيل',
            read: 'مقروء',
            privateMessage: 'رسالة خاصة',
            reply: 'رد',
            delete: 'حذف',
            edit: 'تعديل',
            copy: 'نسخ',
            newMessage: 'رسالة جديدة',
            userJoined: 'انضم',
            userLeft: 'غادر',
            help: 'مساعدة',
            settings: 'الإعدادات',
            logout: 'تسجيل الخروج',
            profile: 'الملف الشخصي'
        },
        ru: {
            title: 'Чат',
            typeHere: 'Пишите здесь...',
            send: 'Отправить',
            connecting: 'Подключение...',
            connected: 'Подключено',
            disconnected: 'Отключено',
            reconnecting: 'Переподключение...',
            online: 'онлайн',
            offline: 'офлайн',
            yourself: 'Вы',
            members: 'участников онлайн',
            noUsers: 'Нет пользователей онлайн',
            close: 'Закрыть',
            open: 'Открыть чат',
            emoji: 'Эмодзи',
            language: 'Язык',
            changeName: 'Сменить имя',
            save: 'Сохранить',
            cancel: 'Отмена',
            namePlaceholder: 'Ваше новое имя...',
            soundOn: 'Звук Вкл',
            soundOff: 'Звук Выкл',
            welcome: 'Добро пожаловать в чат!',
            firstMessage: 'Напишите первым.',
            system: 'Система',
            changedName: 'изменил имя на:',
            typing: 'печатает...',
            onlineUsers: 'Пользователи онлайн',
            messagePlaceholder: 'Введите сообщение...',
            sendMessage: 'Отправить сообщение',
            emojiPicker: 'Выбор эмодзи',
            languageSelector: 'Выбор языка',
            confirmNameChange: 'Сменить имя?',
            nameChanged: 'Имя изменено',
            confirmExit: 'Вы уверены, что хотите выйти?',
            errorConnecting: 'Ошибка подключения, повторная попытка...',
            errorToken: 'Ошибка токена, обновите страницу',
            errorChannel: 'Ошибка канала, переподключение...',
            errorMessage: 'Не удалось отправить сообщение',
            errorNetwork: 'Нет подключения к сети',
            reconnectAttempt: 'Попытка переподключения',
            reconnectSuccess: 'Переподключено',
            reconnectFailed: 'Не удалось переподключиться',
            today: 'Сегодня',
            yesterday: 'Вчера',
            thisWeek: 'На этой неделе',
            older: 'Старые',
            sent: 'Отправлено',
            delivered: 'Доставлено',
            read: 'Прочитано',
            privateMessage: 'Личное сообщение',
            reply: 'Ответить',
            delete: 'Удалить',
            edit: 'Редактировать',
            copy: 'Копировать',
            newMessage: 'Новое сообщение',
            userJoined: 'присоединился',
            userLeft: 'вышел',
            help: 'Помощь',
            settings: 'Настройки',
            logout: 'Выйти',
            profile: 'Профиль'
        },
        zh: {
            title: '在线聊天',
            typeHere: '在这里输入...',
            send: '发送',
            connecting: '连接中...',
            connected: '已连接',
            disconnected: '已断开',
            reconnecting: '重新连接中...',
            online: '在线',
            offline: '离线',
            yourself: '您',
            members: '人在线',
            noUsers: '没有在线用户',
            close: '关闭',
            open: '打开聊天',
            emoji: '表情符号',
            language: '语言',
            changeName: '更改名称',
            save: '保存',
            cancel: '取消',
            namePlaceholder: '您的新名称...',
            soundOn: '声音开',
            soundOff: '声音关',
            welcome: '欢迎来到聊天室！',
            firstMessage: '成为第一个发言的人。',
            system: '系统',
            changedName: '将用户名更改为：',
            typing: '正在输入...',
            onlineUsers: '在线用户',
            messagePlaceholder: '输入您的消息...',
            sendMessage: '发送消息',
            emojiPicker: '表情选择器',
            languageSelector: '语言选择器',
            confirmNameChange: '更改名称？',
            nameChanged: '名称已更改',
            confirmExit: '确定要离开吗？',
            errorConnecting: '连接错误，正在重试...',
            errorToken: '令牌错误，请刷新页面',
            errorChannel: '频道错误，正在重新连接...',
            errorMessage: '消息发送失败',
            errorNetwork: '没有网络连接',
            reconnectAttempt: '重新连接尝试',
            reconnectSuccess: '重新连接成功',
            reconnectFailed: '重新连接失败',
            today: '今天',
            yesterday: '昨天',
            thisWeek: '本周',
            older: '更早',
            sent: '已发送',
            delivered: '已送达',
            read: '已读',
            privateMessage: '私信',
            reply: '回复',
            delete: '删除',
            edit: '编辑',
            copy: '复制',
            newMessage: '新消息',
            userJoined: '加入了',
            userLeft: '离开了',
            help: '帮助',
            settings: '设置',
            logout: '退出',
            profile: '个人资料'
        },
        ja: {
            title: 'ライブチャット',
            typeHere: 'ここに入力...',
            send: '送信',
            connecting: '接続中...',
            connected: '接続済み',
            disconnected: '切断されました',
            reconnecting: '再接続中...',
            online: 'オンライン',
            offline: 'オフライン',
            yourself: 'あなた',
            members: '人がオンライン',
            noUsers: 'オンラインユーザーはいません',
            close: '閉じる',
            open: 'チャットを開く',
            emoji: '絵文字',
            language: '言語',
            changeName: '名前を変更',
            save: '保存',
            cancel: 'キャンセル',
            namePlaceholder: '新しい名前...',
            soundOn: '音声オン',
            soundOff: '音声オフ',
            welcome: 'チャットへようこそ！',
            firstMessage: '最初のメッセージを書いてください。',
            system: 'システム',
            changedName: 'がユーザー名を変更しました：',
            typing: '入力中...',
            onlineUsers: 'オンラインユーザー',
            messagePlaceholder: 'メッセージを入力...',
            sendMessage: 'メッセージを送信',
            emojiPicker: '絵文字ピッカー',
            languageSelector: '言語セレクター',
            confirmNameChange: '名前を変更しますか？',
            nameChanged: '名前が変更されました',
            confirmExit: '本当に退出しますか？',
            errorConnecting: '接続エラー、再試行中...',
            errorToken: 'トークンエラー、ページを更新してください',
            errorChannel: 'チャンネルエラー、再接続中...',
            errorMessage: 'メッセージを送信できませんでした',
            errorNetwork: 'ネットワーク接続がありません',
            reconnectAttempt: '再接続試行',
            reconnectSuccess: '再接続しました',
            reconnectFailed: '再接続に失敗しました',
            today: '今日',
            yesterday: '昨日',
            thisWeek: '今週',
            older: '以前',
            sent: '送信済み',
            delivered: '配信済み',
            read: '既読',
            privateMessage: 'プライベートメッセージ',
            reply: '返信',
            delete: '削除',
            edit: '編集',
            copy: 'コピー',
            newMessage: '新着メッセージ',
            userJoined: 'が参加しました',
            userLeft: 'が退出しました',
            help: 'ヘルプ',
            settings: '設定',
            logout: 'ログアウト',
            profile: 'プロフィール'
        }
    };

    // ============================================================
    // 3. EMOJI LİSTESİ - 72 EMOJİ (20 SATIR)
    // ============================================================
    const emojis = [
        // Yüz ifadeleri
        '😊', '😂', '😍', '🥰', '😘', '😎', '🤔', '😴', '🥳', '😇',
        '😭', '😱', '😡', '🤯', '😷', '🥺', '🤗', '🤩', '😬', '🥲',
        
        // El hareketleri
        '👍', '👎', '👏', '🙏', '🤝', '✌️', '🤞', '👊', '👋', '🤙',
        
        // Kalpler
        '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '💔', '💖',
        
        // Hayvanlar
        '🐼', '🐯', '🦁', '🐸', '🐨', '🐧', '🦊', '🐶', '🐱', '🐭',
        
        // Yiyecekler
        '🍕', '🍔', '🌮', '🍜', '🍣', '🍩', '🍪', '🍫', '🍺', '🍷',
        
        // Spor
        '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🥋',
        
        // Nesneler
        '💻', '📱', '🎮', '📷', '🔔', '⏰', '🔑', '💡', '📚', '✏️',
        
        // Diğer
        '⭐', '🌟', '🌈', '☀️', '🌙', '⭐', '⚡', '🔥', '💧', '❄️'
    ];

    // ============================================================
    // 4. DURUM DEĞİŞKENLERİ (50 SATIR)
    // ============================================================
    let t = translations[config.language] || translations.tr;
    let ably = null;
    let channel = null;
    let messages = [];
    let isOpen = false;
    let reconnectAttempts = 0;
    const MAX_RECONNECT_ATTEMPTS = 10;
    let typingTimeout = null;
    let isTyping = false;
    let onlineUsers = [];
    let unreadCount = 0;
    let notificationSound = null;
    let soundEnabled = true;
    let messageQueue = [];
    let isSending = false;
    let lastMessageTime = null;
    let userSettings = {};
    
    // Kullanıcı bilgileri
    let currentUser = {
        id: generateUserId(),
        name: localStorage.getItem('chat_username') || generateUsername(),
        avatar: generateAvatar(),
        color: config.color,
        lastSeen: new Date().toISOString(),
        status: 'online',
        typing: false,
        typingTo: null,
        lastRead: {}
    };
    
    console.log('👤 Kullanıcı oluşturuldu:', currentUser);

    // Kullanıcı ayarlarını yükle
    try {
        const saved = localStorage.getItem('chat_settings');
        if (saved) {
            userSettings = JSON.parse(saved);
            soundEnabled = userSettings.sound !== false;
        }
    } catch (e) {}

    // ============================================================
    // 5. YARDIMCI FONKSİYONLAR (100 SATIR)
    // ============================================================
    function generateUserId() {
        let userId = localStorage.getItem('chat_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('chat_user_id', userId);
        }
        return userId;
    }

    function generateUsername() {
        const adjectives = {
            tr: ['Mutlu', 'Zeki', 'Hızlı', 'Sakin', 'Parlak', 'Neşeli', 'Cesur', 'Bilge', 'Güçlü', 'Akıllı', 'Kibar', 'Yakışıklı', 'Güzel', 'Sempatik', 'Eğlenceli', 'Yaratıcı', 'Dürüst', 'Çalışkan', 'Sabırlı', 'Cömert'],
            en: ['Happy', 'Smart', 'Fast', 'Calm', 'Bright', 'Cheerful', 'Brave', 'Wise', 'Strong', 'Clever', 'Kind', 'Handsome', 'Beautiful', 'Friendly', 'Funny', 'Creative', 'Honest', 'Hardworking', 'Patient', 'Generous'],
            de: ['Glücklich', 'Klug', 'Schnell', 'Ruhig', 'Hell', 'Fröhlich', 'Mutig', 'Weise', 'Stark', 'Clever', 'Nett', 'Hübsch', 'Schön', 'Freundlich', 'Lustig', 'Kreativ', 'Ehrlich', 'Fleißig', 'Geduldig', 'Großzügig'],
            fr: ['Heureux', 'Intelligent', 'Rapide', 'Calme', 'Brillant', 'Joyeux', 'Courageux', 'Sage', 'Fort', 'Malin', 'Gentil', 'Beau', 'Belle', 'Sympathique', 'Amusant', 'Créatif', 'Honnête', 'Travailleur', 'Patient', 'Généreux'],
            es: ['Feliz', 'Inteligente', 'Rápido', 'Calma', 'Brillante', 'Alegre', 'Valiente', 'Sabio', 'Fuerte', 'Listo', 'Amable', 'Guapo', 'Hermosa', 'Simpático', 'Divertido', 'Creativo', 'Honesto', 'Trabajador', 'Paciente', 'Generoso']
        };
        
        const nouns = {
            tr: ['Panda', 'Kaplan', 'Kartal', 'Yunus', 'Kurt', 'Şahin', 'Aslan', 'Fil', 'Zürafa', 'Maymun', 'Tavşan', 'Kedi', 'Köpek', 'Kuş', 'Balık', 'At', 'Ayı', 'Geyik', 'Kelebek', 'Arı'],
            en: ['Panda', 'Tiger', 'Eagle', 'Dolphin', 'Wolf', 'Hawk', 'Lion', 'Elephant', 'Giraffe', 'Monkey', 'Rabbit', 'Cat', 'Dog', 'Bird', 'Fish', 'Horse', 'Bear', 'Deer', 'Butterfly', 'Bee'],
            de: ['Panda', 'Tiger', 'Adler', 'Delfin', 'Wolf', 'Falke', 'Löwe', 'Elefant', 'Giraffe', 'Affe', 'Hase', 'Katze', 'Hund', 'Vogel', 'Fisch', 'Pferd', 'Bär', 'Hirsch', 'Schmetterling', 'Biene'],
            fr: ['Panda', 'Tigre', 'Aigle', 'Dauphin', 'Loup', 'Faucon', 'Lion', 'Éléphant', 'Girafe', 'Singe', 'Lapin', 'Chat', 'Chien', 'Oiseau', 'Poisson', 'Cheval', 'Ours', 'Cerf', 'Papillon', 'Abeille'],
            es: ['Panda', 'Tigre', 'Águila', 'Delfín', 'Lobo', 'Halcón', 'León', 'Elefante', 'Jirafa', 'Mono', 'Conejo', 'Gato', 'Perro', 'Pájaro', 'Pez', 'Caballo', 'Oso', 'Ciervo', 'Mariposa', 'Abeja']
        };
        
        const lang = config.language in adjectives ? config.language : 'en';
        const adjList = adjectives[lang];
        const nounList = nouns[lang];
        
        return adjList[Math.floor(Math.random() * adjList.length)] + 
               nounList[Math.floor(Math.random() * nounList.length)] +
               Math.floor(Math.random() * 1000);
    }

    function generateAvatar() {
        const avatars = ['🐼', '🐯', '🦁', '🐸', '🐨', '🐧', '🦊', '🐶', '🐱', '🐭', '🐹', '🐰', '🦝', '🐻', '🐼', '🐨'];
        return avatars[Math.floor(Math.random() * avatars.length)];
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatTime(date) {
        const d = new Date(date);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function formatDate(date) {
        const d = new Date(date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (d.toDateString() === today.toDateString()) {
            return t.today;
        } else if (d.toDateString() === yesterday.toDateString()) {
            return t.yesterday;
        } else {
            return d.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
        }
    }

    function playNotification() {
        if (!soundEnabled) return;
        try {
            if (!notificationSound) {
                notificationSound = new Audio('data:audio/wav;base64,UklGRlwAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YVAAAAA8AAAAAAAA//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9//w==');
            }
            notificationSound.play().catch(() => {});
        } catch (e) {}
    }

    function saveSettings() {
        try {
            localStorage.setItem('chat_settings', JSON.stringify({
                sound: soundEnabled,
                language: config.language,
                ...userSettings
            }));
        } catch (e) {}
    }

    function showNotification(title, body) {
        if (!("Notification" in window)) return;
        if (Notification.permission === 'granted') {
            new Notification(title, { body });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
    }

    function formatMessageTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'şimdi';
        if (diff < 3600000) return Math.floor(diff / 60000) + ' dk önce';
        if (diff < 86400000) return formatTime(timestamp);
        return formatDate(timestamp) + ' ' + formatTime(timestamp);
    }

    // ============================================================
    // 6. ABLY İŞLEMLERİ (200 SATIR)
    // ============================================================
    async function loadAblyScript() {
        return new Promise((resolve, reject) => {
            if (window.Ably && window.Ably.Realtime) {
                console.log('✅ Ably zaten yüklü');
                resolve();
                return;
            }
            
            console.log('📥 Ably kütüphanesi yükleniyor...');
            const script = document.createElement('script');
            script.src = 'https://cdn.ably.com/lib/ably.min-2.js';
            script.integrity = 'sha384-8JFNKIiilXpLNU6VpQN0l5oW1uJgLKuE8iJ9qI5n0VgJmHpZJ2YqMFlLQpLk';
            script.crossOrigin = 'anonymous';
            script.onload = () => {
                console.log('✅ Ably kütüphanesi yüklendi');
                resolve();
            };
            script.onerror = (error) => {
                console.error('❌ Ably kütüphanesi yüklenemedi:', error);
                reject(new Error('Ably kütüphanesi yüklenemedi'));
            };
            document.head.appendChild(script);
        });
    }

    async function initChat() {
        console.log('🚀 Chat başlatılıyor...');
        
        try {
            await loadAblyScript();
            
            console.log('🔑 Token alınıyor...');
            ably = new Ably.Realtime({
                authUrl: config.tokenServer,
                authMethod: 'GET',
                authParams: {
                    clientId: currentUser.id,
                    capability: JSON.stringify({
                        [config.room]: ['publish', 'subscribe', 'presence']
                    })
                },
                clientId: currentUser.id,
                echoMessages: false,
                autoConnect: true,
                recover: (lastConnection, cb) => {
                    console.log('🔄 Bağlantı kurtarılıyor:', lastConnection);
                    cb(true);
                }
            });

            // Bağlantı olaylarını dinle
            ably.connection.on('connecting', () => {
                console.log('🔄 Ably bağlanıyor...');
                updateConnectionStatus('connecting');
                showMessage(t.connecting, 'info');
            });

            ably.connection.on('connected', () => {
                console.log('✅ Ably bağlantısı KURULDU');
                updateConnectionStatus('connected');
                reconnectAttempts = 0;
                showMessage(t.connected, 'success');
                setupChannel();
                forceEneble();
            });

            ably.connection.on('disconnected', () => {
                console.log('⚠️ Ably bağlantısı KESİLDİ');
                updateConnectionStatus('disconnected');
                showMessage(t.disconnected, 'warning');
                
                if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                    reconnectAttempts++;
                    console.log(`🔄 Yeniden bağlanma denemesi ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS}`);
                    showMessage(`${t.reconnectAttempt} ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS}...`, 'info');
                }
            });

            ably.connection.on('suspended', () => {
                console.log('🔴 Ably bağlantısı ASKIYA ALINDI');
                updateConnectionStatus('suspended');
                showMessage(t.errorConnecting, 'error');
            });

            ably.connection.on('failed', (error) => {
                console.error('❌ Ably bağlantı HATASI:', error);
                updateConnectionStatus('failed');
                showMessage(t.errorConnecting, 'error');
            });

            ably.connection.on('closed', () => {
                console.log('🔒 Ably bağlantısı KAPATILDI');
                updateConnectionStatus('closed');
            });

        } catch (error) {
            console.error('❌ Chat başlatılamadı:', error);
            showMessage(t.errorToken, 'error');
        }
    }

async function setupChannel() {
    console.log('📡 Kanal kuruluyor:', config.room);
    
    try {
        channel = ably.channels.get(config.room);

        // Tüm mesaj tiplerini dinle
        await channel.subscribe(['message', 'private', 'typing', 'read', 'delete', 'edit'], (message) => {
            handleMessage(message);
        });

        // Presence'e katıl
        console.log('👤 Presence\'e katılınıyor...');
        await channel.presence.enter({ 
            name: currentUser.name,
            avatar: currentUser.avatar,
            color: config.color,
            lastSeen: new Date().toISOString(),
            status: 'online'
        });
        console.log('✅ Presence\'e katılındı');

        // Presence olaylarını dinle
        channel.presence.subscribe('enter', (member) => {
            console.log('👤 Kullanıcı katıldı:', member.data?.name);
            updateUserList();
        });
        
        channel.presence.subscribe('leave', (member) => {
            console.log('👤 Kullanıcı ayrıldı:', member.data?.name);
            updateUserList();
        });
        
        channel.presence.subscribe('update', (member) => {
            console.log('👤 Kullanıcı güncellendi:', member.data?.name);
            updateUserList();
        });

        // Kullanıcı listesini güncelle
        await updateUserList();
        
        // 🔴 KRİTİK: Geçmiş yüklemeden ÖNCE chat'i aktif et
        console.log('✅ Kanal kuruldu, CHAT HEMEN AKTİF EDİLİYOR!');
        enableChat();  // ŞİMDİ AKTİF ET
        forceEneble(); // Olmak Zorunda :))
        
        // Geçmişi arka planda yükle
        try {
            await loadMessageHistory();
        } catch (e) {
            console.log('📜 Geçmiş yüklenirken hata (önemli değil):', e);
        }

    } catch (error) {
        console.error('❌ Kanal kurulamadı:', error);
        showMessage(t.errorChannel, 'error');
        
        setTimeout(() => {
            if (isOpen) {
                console.log('🔄 Kanal yeniden kuruluyor...');
                setupChannel();
            }
        }, 5000);
    }
}

    function handleMessage(message) {
        console.log(`📨 ${message.name} mesajı alındı:`, message.data);
        
        switch(message.name) {
            case 'message':
                messages.push(message.data);
                if (message.data.userId !== currentUser.id) {
                    playNotification();
                    if (!isOpen) {
                        unreadCount++;
                        updateUnreadBadge();
                        showNotification(t.newMessage, `${message.data.userName}: ${message.data.text}`);
                    }
                }
                break;
                
            case 'private':
                if (message.data.to === currentUser.id || message.data.userId === currentUser.id) {
                    messages.push(message.data);
                    if (message.data.userId !== currentUser.id) {
                        playNotification();
                        if (!isOpen) {
                            unreadCount++;
                            updateUnreadBadge();
                            showNotification(`🔒 ${t.privateMessage}`, `${message.data.userName}: ${message.data.text}`);
                        }
                    }
                }
                break;
                
            case 'typing':
                if (message.data.userId !== currentUser.id) {
                    showTypingIndicator(message.data.userName);
                }
                break;
                
            case 'read':
                updateReadStatus(message.data);
                break;
                
            case 'delete':
                deleteMessage(message.data.id);
                break;
                
            case 'edit':
                editMessage(message.data.id, message.data.text);
                break;
        }
        
        renderMessages();
    }

    async function loadMessageHistory() {
        if (!channel) return;
        
        try {
            console.log('📜 Geçmiş mesajlar yükleniyor...');
            const history = await channel.history({ 
                limit: 100,
                direction: 'backwards'
            });
            
            messages = history.items
                .filter(item => ['message', 'private'].includes(item.name))
                .map(item => item.data)
                .reverse();
            
            console.log(`📜 ${messages.length} geçmiş mesaj yüklendi`);
            renderMessages();
        } catch (error) {
            console.error('❌ Geçmiş yüklenemedi:', error);
        }
    }

    function sendTypingIndicator() {
        if (!channel || !isTyping) return;
        
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            isTyping = false;
        }, 2000);
        
        if (!isTyping) {
            isTyping = true;
            channel.publish('typing', {
                userId: currentUser.id,
                userName: currentUser.name,
                timestamp: Date.now()
            });
        }
    }

    function sendReadReceipt(messageId) {
        if (!channel) return;
        
        channel.publish('read', {
            messageId: messageId,
            userId: currentUser.id,
            timestamp: Date.now()
        });
    }

    // ============================================================
    // 7. UI İŞLEMLERİ (800 SATIR)
    // ============================================================
    function createUI() {
        console.log('🎨 UI oluşturuluyor...');
        
        // Ana container
        const container = document.createElement('div');
        container.id = 'chat-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 99999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        `;
        
        // Chat butonu
        const button = document.createElement('div');
        button.id = 'chat-button';
        button.innerHTML = '💬';
        Object.assign(button.style, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '65px',
            height: '65px',
            background: config.color,
            color: 'white',
            borderRadius: '50%',
            position: 'fixed',
            [config.position]: config.xMargin + 'px',
            bottom: config.yMargin + 'px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            cursor: 'pointer',
            zIndex: '999999',
            fontSize: '28px',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            border: '3px solid white',
            pointerEvents: 'auto'
        });

        // Unread badge
        const unreadBadge = document.createElement('span');
        unreadBadge.id = 'unread-badge';
        Object.assign(unreadBadge.style, {
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: '#f44336',
            color: 'white',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            border: '2px solid white',
            display: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        });
        button.appendChild(unreadBadge);

        // Chat penceresi
        const window = document.createElement('div');
        window.id = 'chat-window';
        Object.assign(window.style, {
            position: 'fixed',
            [config.position]: config.xMargin + 'px',
            bottom: (config.yMargin + 80) + 'px',
            width: '400px',
            height: '600px',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            zIndex: '999998',
            display: 'none',
            flexDirection: 'column',
            overflow: 'hidden',
            pointerEvents: 'auto',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255,255,255,0.98)',
            border: '1px solid rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease'
        });

        // ================================
        // HEADER (100 SATIR)
        // ================================
        const header = document.createElement('div');
        header.style.cssText = `
            padding: 16px 20px;
            background: ${config.color};
            color: white;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
            user-select: none;
            border-bottom: 2px solid rgba(255,255,255,0.1);
        `;
        
        const headerLeft = document.createElement('div');
        headerLeft.style.cssText = 'display: flex; align-items: center; gap: 12px;';
        
        const headerIcon = document.createElement('span');
        headerIcon.style.cssText = 'font-size: 24px; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.2));';
        headerIcon.innerHTML = '💬';
        
        const headerTitle = document.createElement('span');
        headerTitle.className = 'chat-title';
        headerTitle.style.cssText = 'font-size: 18px; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1);';
        headerTitle.textContent = t.title;
        
        const userCount = document.createElement('span');
        userCount.id = 'user-count';
        userCount.style.cssText = `
            background: rgba(255,255,255,0.2);
            padding: 4px 12px;
            border-radius: 30px;
            font-size: 12px;
            font-weight: normal;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255,255,255,0.1);
            cursor: pointer;
            transition: all 0.2s ease;
        `;
        userCount.innerHTML = '0';
        userCount.onmouseenter = () => userCount.style.background = 'rgba(255,255,255,0.3)';
        userCount.onmouseleave = () => userCount.style.background = 'rgba(255,255,255,0.2)';
        userCount.onclick = () => toggleUserList();

        headerLeft.appendChild(headerIcon);
        headerLeft.appendChild(headerTitle);
        headerLeft.appendChild(userCount);

        const headerRight = document.createElement('div');
        headerRight.style.cssText = 'display: flex; align-items: center; gap: 15px;';
        
        const connectionStatus = document.createElement('span');
        connectionStatus.id = 'connection-status';
        connectionStatus.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #f44336;
            display: inline-block;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
            transition: background 0.3s ease;
            position: relative;
        `;
        
        const closeButton = document.createElement('span');
        closeButton.id = 'close-chat';
        closeButton.style.cssText = `
            cursor: pointer;
            font-size: 28px;
            line-height: 1;
            transition: all 0.2s ease;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        `;
        closeButton.innerHTML = '×';
        closeButton.onmouseenter = () => {
            closeButton.style.background = 'rgba(255,255,255,0.2)';
            closeButton.style.transform = 'scale(1.1)';
        };
        closeButton.onmouseleave = () => {
            closeButton.style.background = 'transparent';
            closeButton.style.transform = 'scale(1)';
        };

        headerRight.appendChild(connectionStatus);
        headerRight.appendChild(closeButton);

        header.appendChild(headerLeft);
        header.appendChild(headerRight);

        // ================================
        // TOOLBAR (100 SATIR)
        // ================================
        const toolbar = document.createElement('div');
        toolbar.style.cssText = `
            padding: 12px 16px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            position: relative;
        `;

        // Dil seçici
        const languageSelect = document.createElement('select');
        languageSelect.id = 'language-select';
        languageSelect.style.cssText = `
            padding: 8px 12px;
            border: 1px solid #dee2e6;
            border-radius: 30px;
            font-size: 13px;
            outline: none;
            cursor: pointer;
            flex: 1;
            min-width: 120px;
            background: white;
            transition: all 0.2s ease;
            font-family: inherit;
        `;
        languageSelect.innerHTML = `
            <option value="tr">🇹🇷 Türkçe</option>
            <option value="en">🇬🇧 English</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="es">🇪🇸 Español</option>
            <option value="ar">🇸🇦 العربية</option>
            <option value="ru">🇷🇺 Русский</option>
            <option value="zh">🇨🇳 中文</option>
            <option value="ja">🇯🇵 日本語</option>
        `;
        languageSelect.value = config.language;
        languageSelect.onfocus = () => languageSelect.style.borderColor = config.color;
        languageSelect.onblur = () => languageSelect.style.borderColor = '#dee2e6';

        // İsim değiştir butonu
        const nameButton = document.createElement('button');
        nameButton.id = 'name-button';
        nameButton.innerHTML = '✏️ ' + t.changeName;
        nameButton.style.cssText = `
            padding: 8px 15px;
            border: none;
            background: ${config.color};
            color: white;
            border-radius: 30px;
            font-size: 13px;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            font-family: inherit;
            font-weight: 500;
        `;
        nameButton.onmouseenter = () => {
            nameButton.style.transform = 'translateY(-2px)';
            nameButton.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
        };
        nameButton.onmouseleave = () => {
            nameButton.style.transform = 'translateY(0)';
            nameButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        };

        // Emoji butonu
        const emojiButton = document.createElement('button');
        emojiButton.id = 'emoji-button';
        emojiButton.innerHTML = '😊 ' + t.emoji;
        emojiButton.style.cssText = `
            padding: 8px 15px;
            border: none;
            background: #6c757d;
            color: white;
            border-radius: 30px;
            font-size: 13px;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            font-family: inherit;
            font-weight: 500;
        `;
        emojiButton.onmouseenter = () => {
            emojiButton.style.transform = 'translateY(-2px)';
            emojiButton.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
        };
        emojiButton.onmouseleave = () => {
            emojiButton.style.transform = 'translateY(0)';
            emojiButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        };

        // Ses butonu
        const soundButton = document.createElement('button');
        soundButton.id = 'sound-button';
        soundButton.innerHTML = soundEnabled ? '🔊 ' + t.soundOn : '🔇 ' + t.soundOff;
        soundButton.style.cssText = `
            padding: 8px 15px;
            border: none;
            background: ${soundEnabled ? '#28a745' : '#dc3545'};
            color: white;
            border-radius: 30px;
            font-size: 13px;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            font-family: inherit;
            font-weight: 500;
        `;
        soundButton.onmouseenter = () => {
            soundButton.style.transform = 'translateY(-2px)';
            soundButton.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
        };
        soundButton.onmouseleave = () => {
            soundButton.style.transform = 'translateY(0)';
            soundButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        };
        soundButton.onclick = () => {
            soundEnabled = !soundEnabled;
            soundButton.innerHTML = soundEnabled ? '🔊 ' + t.soundOn : '🔇 ' + t.soundOff;
            soundButton.style.background = soundEnabled ? '#28a745' : '#dc3545';
            saveSettings();
        };

        toolbar.appendChild(languageSelect);
        toolbar.appendChild(nameButton);
        toolbar.appendChild(emojiButton);
        toolbar.appendChild(soundButton);

        // ================================
        // EMOJI PANELİ (50 SATIR)
        // ================================
        const emojiPanel = document.createElement('div');
        emojiPanel.id = 'emoji-panel';
        emojiPanel.style.cssText = `
            display: none;
            padding: 16px;
            background: white;
            border-bottom: 1px solid #e9ecef;
            grid-template-columns: repeat(8, 1fr);
            gap: 8px;
            max-height: 250px;
            overflow-y: auto;
            box-shadow: inset 0 -2px 10px rgba(0,0,0,0.03);
        `;
        
        emojis.forEach(emoji => {
            const span = document.createElement('span');
            span.textContent = emoji;
            span.style.cssText = `
                font-size: 26px;
                cursor: pointer;
                text-align: center;
                padding: 8px 4px;
                border-radius: 12px;
                transition: all 0.2s ease;
                background: white;
                user-select: none;
            `;
            span.onmouseenter = () => {
                span.style.background = '#f0f0f0';
                span.style.transform = 'scale(1.2)';
            };
            span.onmouseleave = () => {
                span.style.background = 'white';
                span.style.transform = 'scale(1)';
            };
            span.onclick = () => {
                const input = document.getElementById('chat-input');
                if (input && !input.disabled) {
                    const start = input.selectionStart;
                    const end = input.selectionEnd;
                    input.value = input.value.substring(0, start) + emoji + input.value.substring(end);
                    input.focus();
                    input.selectionStart = input.selectionEnd = start + emoji.length;
                }
                emojiPanel.style.display = 'none';
            };
            emojiPanel.appendChild(span);
        });

        // ================================
        // İSİM DEĞİŞTİRME PANELİ (50 SATIR)
        // ================================
        const namePanel = document.createElement('div');
        namePanel.id = 'name-panel';
        namePanel.style.cssText = `
            display: none;
            padding: 20px;
            background: white;
            border-bottom: 1px solid #e9ecef;
        `;
        
        const nameLabel = document.createElement('div');
        nameLabel.textContent = t.changeName;
        nameLabel.style.cssText = 'font-size: 14px; font-weight: 600; margin-bottom: 12px; color: #333;';
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'name-input';
        nameInput.placeholder = t.namePlaceholder;
        nameInput.value = currentUser.name;
        nameInput.style.cssText = `
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #e9ecef;
            border-radius: 30px;
            margin-bottom: 16px;
            box-sizing: border-box;
            font-size: 14px;
            transition: all 0.2s ease;
            font-family: inherit;
        `;
        nameInput.onfocus = () => nameInput.style.borderColor = config.color;
        nameInput.onblur = () => nameInput.style.borderColor = '#e9ecef';
        nameInput.onkeypress = (e) => {
            if (e.key === 'Enter') {
                saveNameBtn.click();
            }
        };

        const nameButtons = document.createElement('div');
        nameButtons.style.cssText = 'display: flex; gap: 12px; justify-content: flex-end;';

        const saveNameBtn = document.createElement('button');
        saveNameBtn.innerHTML = t.save;
        saveNameBtn.style.cssText = `
            padding: 10px 24px;
            border: none;
            background: ${config.color};
            color: white;
            border-radius: 30px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s ease;
            font-family: inherit;
        `;
        saveNameBtn.onmouseenter = () => {
            saveNameBtn.style.transform = 'translateY(-2px)';
            saveNameBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
        };
        saveNameBtn.onmouseleave = () => {
            saveNameBtn.style.transform = 'translateY(0)';
            saveNameBtn.style.boxShadow = 'none';
        };

        const cancelNameBtn = document.createElement('button');
        cancelNameBtn.innerHTML = t.cancel;
        cancelNameBtn.style.cssText = `
            padding: 10px 24px;
            border: 2px solid #e9ecef;
            background: white;
            color: #666;
            border-radius: 30px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s ease;
            font-family: inherit;
        `;
        cancelNameBtn.onmouseenter = () => {
            cancelNameBtn.style.background = '#f8f9fa';
        };
        cancelNameBtn.onmouseleave = () => {
            cancelNameBtn.style.background = 'white';
        };

        nameButtons.appendChild(saveNameBtn);
        nameButtons.appendChild(cancelNameBtn);
        namePanel.appendChild(nameLabel);
        namePanel.appendChild(nameInput);
        namePanel.appendChild(nameButtons);

        // ================================
        // KULLANICI LİSTESİ PANELİ (50 SATIR)
        // ================================
        const userListPanel = document.createElement('div');
        userListPanel.id = 'user-list-panel';
        userListPanel.style.cssText = `
            display: none;
            padding: 16px;
            background: white;
            border-bottom: 1px solid #e9ecef;
            max-height: 250px;
            overflow-y: auto;
        `;
        
        const userListTitle = document.createElement('div');
        userListTitle.textContent = t.onlineUsers;
        userListTitle.style.cssText = 'font-size: 14px; font-weight: 600; margin-bottom: 12px; color: #333;';
        userListPanel.appendChild(userListTitle);
        
        const userListContainer = document.createElement('div');
        userListContainer.id = 'user-list-container';
        userListContainer.style.cssText = 'display: flex; flex-direction: column; gap: 4px;';
        userListPanel.appendChild(userListContainer);

        // ================================
        // MESAJLAR ALANI (50 SATIR)
        // ================================
        const messagesContainer = document.createElement('div');
        messagesContainer.id = 'chat-messages';
        messagesContainer.style.cssText = `
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f8f9fa;
            background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                              linear-gradient(-45deg, #f0f0f0 25%, transparent 25%);
            background-size: 30px 30px;
            background-position: 0 0, 0 15px;
            scroll-behavior: smooth;
        `;

        // Typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.id = 'typing-indicator';
        typingIndicator.style.cssText = `
            display: none;
            padding: 10px 20px;
            font-size: 12px;
            color: #666;
            font-style: italic;
            background: linear-gradient(to right, #f8f9fa, white);
            border-top: 1px solid #e9ecef;
            animation: pulse 1.5s ease infinite;
        `;

        // ================================
        // INPUT ALANI (50 SATIR)
        // ================================
        const inputContainer = document.createElement('div');
        inputContainer.style.cssText = `
            padding: 16px 20px;
            background: white;
            border-top: 2px solid #e9ecef;
        `;

        const inputGroup = document.createElement('div');
        inputGroup.style.cssText = `
            display: flex;
            gap: 12px;
            background: #f8f9fa;
            border-radius: 40px;
            padding: 6px;
            border: 2px solid transparent;
            transition: all 0.2s ease;
        `;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'chat-input';
        input.placeholder = t.typeHere;
        input.disabled = true;
        input.style.cssText = `
            flex: 1;
            padding: 14px 18px;
            border: none;
            background: transparent;
            outline: none;
            font-size: 14px;
            font-family: inherit;
        `;
        input.onfocus = () => {
            inputGroup.style.borderColor = config.color;
            inputGroup.style.background = 'white';
        };
        input.onblur = () => {
            inputGroup.style.borderColor = 'transparent';
            inputGroup.style.background = '#f8f9fa';
        };
        input.onkeyup = () => sendTypingIndicator();

        const sendButton = document.createElement('button');
        sendButton.id = 'chat-send';
        sendButton.innerHTML = '📤';
        sendButton.disabled = true;
        sendButton.style.cssText = `
            width: 50px;
            height: 50px;
            border: none;
            background: ${config.color};
            color: white;
            border-radius: 50%;
            cursor: pointer;
            font-size: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;
        sendButton.onmouseenter = () => {
            if (!sendButton.disabled) {
                sendButton.style.transform = 'scale(1.1)';
                sendButton.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }
        };
        sendButton.onmouseleave = () => {
            sendButton.style.transform = 'scale(1)';
            sendButton.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        };

        // ================================
        // EVENT LİSTENERS (100 SATIR)
        // ================================
        button.onmouseenter = () => {
            button.style.transform = 'scale(1.15) rotate(5deg)';
            button.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
        };
        button.onmouseleave = () => {
            button.style.transform = 'scale(1) rotate(0deg)';
            button.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
        };
        button.onclick = toggleChat;

        closeButton.onclick = toggleChat;

        input.onkeypress = (e) => {
            if (e.key === 'Enter' && input.value.trim() && !input.disabled) {
                sendMessage(input.value.trim(), false);
                input.value = '';
            }
        };

        sendButton.onclick = () => {
            if (input.value.trim() && !sendButton.disabled) {
                sendMessage(input.value.trim(), false);
                input.value = '';
            }
        };

        languageSelect.onchange = (e) => {
            setLanguage(e.target.value);
        };

        emojiButton.onclick = () => {
            const isHidden = emojiPanel.style.display === 'none';
            emojiPanel.style.display = isHidden ? 'grid' : 'none';
            namePanel.style.display = 'none';
            userListPanel.style.display = 'none';
        };

        nameButton.onclick = () => {
            const isHidden = namePanel.style.display === 'none';
            namePanel.style.display = isHidden ? 'block' : 'none';
            emojiPanel.style.display = 'none';
            userListPanel.style.display = 'none';
            if (isHidden) {
                nameInput.value = currentUser.name;
                nameInput.focus();
            }
        };

        saveNameBtn.onclick = () => {
            if (nameInput.value.trim()) {
                if (confirm(t.confirmNameChange)) {
                    changeUsername(nameInput.value.trim());
                    namePanel.style.display = 'none';
                    showMessage(t.nameChanged, 'success');
                }
            }
        };

        cancelNameBtn.onclick = () => {
            namePanel.style.display = 'none';
            nameInput.value = currentUser.name;
        };

        // Keydown event for Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) {
                toggleChat();
            }
        });

        // ================================
        // UI'YI BİRLEŞTİR
        // ================================
        inputGroup.appendChild(input);
        inputGroup.appendChild(sendButton);
        inputContainer.appendChild(inputGroup);
        
        window.appendChild(header);
        window.appendChild(toolbar);
        window.appendChild(emojiPanel);
        window.appendChild(namePanel);
        window.appendChild(userListPanel);
        window.appendChild(messagesContainer);
        window.appendChild(typingIndicator);
        window.appendChild(inputContainer);
        
        container.appendChild(button);
        container.appendChild(window);
        document.body.appendChild(container);

        // Sürüklenebilir yap
        makeDraggable(window, header);
        
        // CSS animasyonları ekle
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { opacity: 0.6; }
                50% { opacity: 1; }
                100% { opacity: 0.6; }
            }
            @keyframes slideIn {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .message-enter {
                animation: slideIn 0.3s ease;
            }
        `;
        document.head.appendChild(style);
        forceEneble();
        
        console.log('✅ UI oluşturuldu');
    }

    function makeDraggable(element, handle) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        
        handle.style.cursor = 'grab';
        handle.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e.preventDefault();
            isDragging = true;
            pos3 = e.clientX;
            pos4 = e.clientY;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = element.offsetLeft;
            startTop = element.offsetTop;
            
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            
            handle.style.cursor = 'grabbing';
            element.style.transition = 'none';
            element.style.opacity = '0.9';
        }

        function elementDrag(e) {
            e.preventDefault();
            if (!isDragging) return;
            
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            const newTop = element.offsetTop - pos2;
            const newLeft = element.offsetLeft - pos1;
            
            const maxTop = 0;
            const maxLeft = 0;
            const minTop = window.innerHeight - element.offsetHeight;
            const minLeft = window.innerWidth - element.offsetWidth;
            
            if (newTop >= maxTop && newTop <= minTop) {
                element.style.top = newTop + "px";
            }
            if (newLeft >= maxLeft && newLeft <= minLeft) {
                element.style.left = newLeft + "px";
            }
            element.style.bottom = 'auto';
            element.style.right = 'auto';
        }

        function closeDragElement() {
            isDragging = false;
            document.onmouseup = null;
            document.onmousemove = null;
            handle.style.cursor = 'grab';
            element.style.transition = 'all 0.2s ease';
            element.style.opacity = '1';
            
            const snapThreshold = 20;
            const rect = element.getBoundingClientRect();
            
            if (rect.left < snapThreshold) {
                element.style.left = '0px';
            } else if (window.innerWidth - rect.right < snapThreshold) {
                element.style.right = '0px';
                element.style.left = 'auto';
            }
            if (rect.top < snapThreshold) {
                element.style.top = '0px';
            } else if (window.innerHeight - rect.bottom < snapThreshold) {
                element.style.bottom = '0px';
                element.style.top = 'auto';
            }
        }
    }

    function toggleUserList() {
        const panel = document.getElementById('user-list-panel');
        if (panel) {
            const isHidden = panel.style.display === 'none';
            panel.style.display = isHidden ? 'block' : 'none';
            if (isHidden) {
                updateUserList();
            }
        }
    }

    function toggleChat() {
        const win = document.getElementById('chat-window');
        const btn = document.getElementById('chat-button');
        const badge = document.getElementById('unread-badge');
        
        if (!win || !btn) return;
        
        if (!isOpen) {
            console.log('🔓 Chat açılıyor...');
            win.style.display = 'flex';
            btn.innerHTML = '✕';
            isOpen = true;
            unreadCount = 0;
            updateUnreadBadge();
            
            if (!ably) {
                console.log('🚀 Chat başlatılıyor...');
                initChat();
            } else if (channel) {
                enableChat();
                forceEneble();
            }
            
            // Animasyon
            win.style.animation = 'slideIn 0.3s ease';
            setTimeout(() => {
                win.style.animation = '';
            }, 300);
        } else {
            console.log('🔒 Chat kapanıyor...');
            win.style.display = 'none';
            btn.innerHTML = '💬';
            isOpen = false;
        }
    }

    // ================================
    // CHAT İŞLEMLERİ (150 SATIR)
    // ================================
    function sendMessage(text, isPrivate = false, to = null) {
        if (!channel) {
            console.error('❌ Mesaj gönderilemedi: Kanal yok');
            showMessage(t.errorMessage, 'error');
            return;
        }
        
        if (!text.trim()) {
            console.log('⚠️ Boş mesaj gönderilemez');
            return;
        }

        const messageId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        const message = {
            id: messageId,
            userId: currentUser.id,
            userName: currentUser.name,
            userAvatar: currentUser.avatar,
            text: text.trim(),
            time: new Date().toISOString(),
            timestamp: Date.now(),
            isPrivate: isPrivate,
            to: to,
            read: false,
            status: 'sending'
        };

        console.log('📤 Mesaj gönderiliyor:', message);
        
        // Önce UI'a ekle
        messages.push(message);
        renderMessages();
        
        const channelName = isPrivate ? 'private' : 'message';
        channel.publish(channelName, message, (err) => {
            if (err) {
                console.error('❌ Mesaj gönderilemedi:', err);
                message.status = 'error';
                showMessage(t.errorMessage, 'error');
            } else {
                console.log('✅ Mesaj gönderildi');
                message.status = 'sent';
            }
            renderMessages();
        });
        
        // Input'u temizle
        const input = document.getElementById('chat-input');
        if (input) input.value = '';
        
        // Okundu bildirimini gönder
        setTimeout(() => {
            sendReadReceipt(messageId);
        }, 2000);
    }

    function renderMessages() {
        const container = document.getElementById('chat-messages');
        if (!container) return;

        if (messages.length === 0) {
            container.innerHTML = `
                <div style="
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: #adb5bd;
                    font-size: 14px;
                    text-align: center;
                    padding: 20px;
                ">
                    <div style="font-size: 72px; margin-bottom: 20px; opacity: 0.5;">💬</div>
                    <div style="font-weight: 600; font-size: 18px; margin-bottom: 8px;">${t.welcome}</div>
                    <div style="font-size: 14px; max-width: 250px; line-height: 1.5;">${t.firstMessage}</div>
                </div>
            `;
            return;
        }

        let lastDate = '';
        let html = '';
        
        messages.forEach((msg, index) => {
            const msgDate = formatDate(msg.time);
            const isOwn = msg.userId === currentUser.id;
            const isSystem = msg.userId === 'system';
            const isPrivate = msg.isPrivate;
            const showAvatar = !isOwn && (!messages[index-1] || messages[index-1].userId !== msg.userId);
            
            if (msgDate !== lastDate) {
                html += `
                    <div style="
                        text-align: center;
                        margin: 20px 0 15px;
                        position: relative;
                    ">
                        <span style="
                            background: #e9ecef;
                            padding: 6px 16px;
                            border-radius: 30px;
                            font-size: 12px;
                            color: #495057;
                            font-weight: 500;
                            display: inline-block;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                        ">${msgDate}</span>
                    </div>
                `;
                lastDate = msgDate;
            }
            
            if (isSystem) {
                html += `
                    <div style="
                        margin: 15px 0;
                        text-align: center;
                        font-size: 12px;
                        color: #868e96;
                        font-style: italic;
                        padding: 8px 0;
                        border-top: 1px dashed #dee2e6;
                        border-bottom: 1px dashed #dee2e6;
                    ">
                        ${escapeHtml(msg.text)}
                    </div>
                `;
                return;
            }
            
            html += `
                <div class="message-enter" style="
                    margin-bottom: 16px;
                    display: flex;
                    flex-direction: ${isOwn ? 'row-reverse' : 'row'};
                    align-items: flex-end;
                    gap: 8px;
                ">
                    ${!isOwn && showAvatar ? `
                        <div style="
                            width: 36px;
                            height: 36px;
                            border-radius: 50%;
                            background: linear-gradient(135deg, ${msg.userAvatar ? '#e9ecef' : config.color}, ${config.color}80);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 20px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                            flex-shrink: 0;
                        ">
                            ${msg.userAvatar || '👤'}
                        </div>
                    ` : !isOwn ? '<div style="width: 36px;"></div>' : ''}
                    
                    <div style="
                        max-width: 70%;
                        min-width: 60px;
                    ">
                        ${!isOwn && !showAvatar ? '' : !isOwn ? `
                            <div style="
                                font-size: 12px;
                                margin-bottom: 4px;
                                margin-left: 4px;
                                color: #495057;
                                font-weight: 600;
                                display: flex;
                                align-items: center;
                                gap: 4px;
                            ">
                                ${escapeHtml(msg.userName)}
                                ${isPrivate ? '<span style="font-size: 10px; color: #f08c00;">🔒</span>' : ''}
                            </div>
                        ` : ''}
                        
                        <div style="
                            padding: 12px 16px;
                            border-radius: ${isOwn ? '20px 20px 5px 20px' : '20px 20px 20px 5px'};
                            background: ${isOwn ? 'linear-gradient(135deg, ' + config.color + ', ' + config.color + 'CC)' : 'white'};
                            color: ${isOwn ? 'white' : '#212529'};
                            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                            word-wrap: break-word;
                            position: relative;
                        ">
                            <div style="font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(msg.text)}</div>
                            
                            ${msg.status === 'sending' ? `
                                <div style="
                                    position: absolute;
                                    bottom: 2px;
                                    right: 8px;
                                    font-size: 10px;
                                    color: ${isOwn ? 'rgba(255,255,255,0.7)' : '#adb5bd'};
                                ">⏳</div>
                            ` : msg.status === 'error' ? `
                                <div style="
                                    position: absolute;
                                    bottom: 2px;
                                    right: 8px;
                                    font-size: 10px;
                                    color: #f03e3e;
                                ">⚠️</div>
                            ` : ''}
                        </div>
                        
                        <div style="
                            display: flex;
                            align-items: center;
                            justify-content: ${isOwn ? 'flex-end' : 'space-between'};
                            margin-top: 4px;
                            padding: 0 4px;
                        ">
                            <span style="
                                font-size: 10px;
                                color: #868e96;
                            ">${formatTime(msg.time)}</span>
                            
                            ${isOwn ? `
                                <span style="
                                    font-size: 10px;
                                    color: #868e96;
                                    margin-left: 4px;
                                ">
                                    ${msg.read ? '✓✓' : msg.status === 'sent' ? '✓' : ''}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        container.scrollTop = container.scrollHeight;
    }

    function updateReadStatus(data) {
        const msg = messages.find(m => m.id === data.messageId);
        if (msg && msg.userId === currentUser.id) {
            msg.read = true;
            renderMessages();
        }
    }

    function deleteMessage(messageId) {
        messages = messages.filter(m => m.id !== messageId);
        renderMessages();
    }

    function editMessage(messageId, newText) {
        const msg = messages.find(m => m.id === messageId);
        if (msg) {
            msg.text = newText;
            msg.edited = true;
            renderMessages();
        }
    }

    function updateUserList() {
        return new Promise((resolve) => {
            if (!channel) {
                resolve();
                return;
            }
            
            channel.presence.get((err, members) => {
                if (!err) {
                    onlineUsers = members.map(m => ({
                        id: m.clientId,
                        name: m.data?.name || 'Anonim',
                        avatar: m.data?.avatar || '👤',
                        color: m.data?.color || '#ccc',
                        lastSeen: m.data?.lastSeen,
                        status: m.data?.status || 'online'
                    }));
                    
                    const count = onlineUsers.length;
                    const userCount = document.getElementById('user-count');
                    if (userCount) {
                        userCount.textContent = count;
                        userCount.title = onlineUsers.map(u => u.name).join(', ');
                    }
                    
                    const container = document.getElementById('user-list-container');
                    if (container) {
                        if (onlineUsers.length === 0) {
                            container.innerHTML = `<div style="text-align: center; color: #999; padding: 20px;">${t.noUsers}</div>`;
                        } else {
                            container.innerHTML = onlineUsers.map(user => `
                                <div style="
                                    display: flex;
                                    align-items: center;
                                    padding: 10px 12px;
                                    border-radius: 12px;
                                    cursor: pointer;
                                    transition: all 0.2s ease;
                                    background: ${user.id === currentUser.id ? '#e7f5ff' : 'white'};
                                    border: 1px solid #f1f3f5;
                                " onmouseenter="this.style.background='${user.id === currentUser.id ? '#d0ebff' : '#f8f9fa'}'" 
                                   onmouseleave="this.style.background='${user.id === currentUser.id ? '#e7f5ff' : 'white'}'">
                                    <div style="
                                        width: 36px;
                                        height: 36px;
                                        border-radius: 50%;
                                        background: ${user.color};
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        margin-right: 12px;
                                        font-size: 20px;
                                        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                                    ">${user.avatar}</div>
                                    <div style="flex:1;">
                                        <div style="font-weight:600; font-size:14px; color:#212529;">${escapeHtml(user.name)}</div>
                                        <div style="font-size:11px; color:#868e96; display:flex; align-items:center; gap:4px;">
                                            <span style="
                                                width: 8px;
                                                height: 8px;
                                                border-radius: 50%;
                                                background: ${user.status === 'online' ? '#40c057' : '#ced4da'};
                                                display: inline-block;
                                            "></span>
                                            ${user.id === currentUser.id ? t.yourself : user.status === 'online' ? t.online : t.offline}
                                        </div>
                                    </div>
                                    ${user.id !== currentUser.id ? `
                                        <div style="color:#adb5bd; font-size:14px; padding:4px;">💬</div>
                                    ` : ''}
                                </div>
                            `).join('');
                        }
                    }
                    
                    console.log(`👥 ${count} kullanıcı çevrimiçi`);
                }
                resolve();
            });
        });
    }

    function updateConnectionStatus(status) {
        const statusEl = document.getElementById('connection-status');
        if (!statusEl) return;
        
        const colors = {
            'connected': '#40c057',
            'connecting': '#fcc419',
            'disconnected': '#f03e3e',
            'suspended': '#f03e3e',
            'failed': '#f03e3e',
            'closed': '#868e96'
        };
        
        statusEl.style.background = colors[status] || '#f03e3e';
        statusEl.title = t[status] || status;
    }

// Vanilla JavaScript ile disabled kaldırma - DOĞRU YOL
function enableChat() {
    console.log('🔓 enableChat() çağrıldı');
    
    const input = document.getElementById('chat-input');
    const sendButton = document.getElementById('chat-send');
    
    if (!input || !sendButton) {
        console.log('⏳ Elementler bulunamadı, 500ms sonra tekrar...');
        setTimeout(enableChat, 500);
        return;
    }

    // VANILLA JS YÖNTEMİ - removeAttribute
    if (input.hasAttribute('disabled')) {
        input.removeAttribute('disabled');        
        console.log('✅ Input disabled attribute kaldırıldı');
    }
    
    if (sendButton.hasAttribute('disabled')) {
        sendButton.removeAttribute('disabled');
        console.log('✅ Send button disabled attribute kaldırıldı');
    }
      
    // Placeholder'ı ayarla
    input.setAttribute('placeholder', t.typeHere);
    
    // Focus'u vanilla JS ile ver
    input.focus();
    
    console.log('🎉 Chat aktif! Artık mesaj yazabilirsiniz.');
}

	function forceEneble() {
	    if (document.getElementById('chat-input').hasAttribute('disabled')) {
			document.getElementById('chat-input').removeAttribute('disabled');
			console.log('✅ Input disabled attribute kaldırıldı');
		}
		if (document.getElementById('chat-send').hasAttribute('disabled')) {
			document.getElementById('chat-send').removeAttribute('disabled');
			console.log('✅ Send button disabled attribute kaldırıldı');
		}		
	}

    function showMessage(message, type = 'info') {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        
        const colors = {
            info: '#17a2b8',
            success: '#40c057',
            error: '#f03e3e',
            warning: '#fcc419'
        };
        
        const backgrounds = {
            info: '#e3fafc',
            success: '#ebfbee',
            error: '#fff5f5',
            warning: '#fff9db'
        };
        
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            padding: 12px 16px;
            margin: 12px 0;
            text-align: center;
            background: ${backgrounds[type]};
            color: ${colors[type]};
            border-radius: 12px;
            font-size: 13px;
            font-weight: 500;
            border-left: 4px solid ${colors[type]};
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            animation: slideIn 0.3s ease;
        `;
        msgDiv.textContent = message;
        
        container.insertBefore(msgDiv, container.firstChild);
        
        setTimeout(() => {
            msgDiv.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => msgDiv.remove(), 300);
        }, 3000);
    }

    function showTypingIndicator(userName) {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.innerHTML = `✏️ ${escapeHtml(userName)} ${t.typing}`;
            indicator.style.display = 'block';
            
            clearTimeout(window.typingTimeout);
            window.typingTimeout = setTimeout(() => {
                indicator.style.display = 'none';
            }, 3000);
        }
    }

    function updateUnreadBadge() {
        const badge = document.getElementById('unread-badge');
        if (badge) {
            if (unreadCount > 0) {
                badge.style.display = 'flex';
                badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
                badge.style.animation = 'pulse 1s ease infinite';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    // ================================
    // DİL VE KULLANICI İŞLEMLERİ (50 SATIR)
    // ================================
    function setLanguage(lang) {
        if (!translations[lang]) return;
        
        console.log('🌐 Dil değiştiriliyor:', lang);
        config.language = lang;
        t = translations[lang];
        
        const titleEl = document.querySelector('.chat-title');
        if (titleEl) titleEl.textContent = t.title;
        
        const input = document.getElementById('chat-input');
        if (input && !input.disabled) input.placeholder = t.typeHere;
        
        const langSelect = document.getElementById('language-select');
        if (langSelect) langSelect.value = lang;
        
        const nameBtn = document.getElementById('name-button');
        if (nameBtn) nameBtn.innerHTML = '✏️ ' + t.changeName;
        
        const emojiBtn = document.getElementById('emoji-button');
        if (emojiBtn) emojiBtn.innerHTML = '😊 ' + t.emoji;
        
        const soundBtn = document.getElementById('sound-button');
        if (soundBtn) {
            soundBtn.innerHTML = soundEnabled ? '🔊 ' + t.soundOn : '🔇 ' + t.soundOff;
        }
        
        const nameInput = document.getElementById('name-input');
        if (nameInput) nameInput.placeholder = t.namePlaceholder;
        
        const namePanelBtns = document.querySelectorAll('#name-panel button');
        if (namePanelBtns[0]) namePanelBtns[0].innerHTML = t.save;
        if (namePanelBtns[1]) namePanelBtns[1].innerHTML = t.cancel;
        
        const userListTitle = document.querySelector('#user-list-panel > div:first-child');
        if (userListTitle) userListTitle.textContent = t.onlineUsers;
        
        saveSettings();
        renderMessages();
    }

    function changeUsername(newName) {
        if (!newName || !newName.trim()) return;
        
        const oldName = currentUser.name;
        currentUser.name = newName.trim();
        localStorage.setItem('chat_username', currentUser.name);
        
        console.log(`✏️ Kullanıcı adı değiştirildi: ${oldName} -> ${currentUser.name}`);
        
        if (channel) {
            channel.presence.update({ 
                name: currentUser.name,
                avatar: currentUser.avatar,
                color: config.color,
                lastSeen: new Date().toISOString(),
                status: 'online'
            });
        }
        
        const systemMessage = {
            id: 'system_' + Date.now(),
            userId: 'system',
            userName: t.system,
            text: `✏️ ${oldName} ${t.changedName} ${currentUser.name}`,
            time: new Date().toISOString(),
            system: true
        };
        
        messages.push(systemMessage);
        renderMessages();
    }

    // ================================
    // BAŞLANGIÇ
    // ================================
    console.log('🚀 Chat widget başlatılıyor...');
    createUI();    

    // Bildirim izni iste
    if ("Notification" in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }

    // Pencere boyutu değişince pozisyonu kontrol et
    window.addEventListener('resize', () => {
        const win = document.getElementById('chat-window');
        if (win && isOpen) {
            const rect = win.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                win.style.left = (window.innerWidth - rect.width - 10) + 'px';
            }
            if (rect.bottom > window.innerHeight) {
                win.style.top = (window.innerHeight - rect.height - 10) + 'px';
            }
        }
    });

})();
