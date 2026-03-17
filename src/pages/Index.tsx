import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/4ad4e45b-5ef6-4e0b-be5a-bf6e347fb55f/files/01933277-d594-4446-914a-4c624f0628f1.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "О сайте", href: "#about" },
  { label: "Форма", href: "#form" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const FAQ_ITEMS = [
  {
    q: "Как долго рассматривается заявка?",
    a: "Мы обрабатываем каждую заявку в течение 1-2 рабочих дней. Вы получите уведомление на указанный email сразу после получения."
  },
  {
    q: "Какие форматы файлов можно загрузить?",
    a: "Поддерживаются форматы JPG, PNG, GIF, PDF, DOC, DOCX. Максимальный размер файла — 10 МБ."
  },
  {
    q: "Мои данные в безопасности?",
    a: "Да, все данные передаются по защищённому протоколу HTTPS и хранятся в зашифрованном виде. Мы не передаём информацию третьим лицам."
  },
  {
    q: "Можно ли отредактировать заявку после отправки?",
    a: "Для редактирования уже отправленной заявки, пожалуйста, свяжитесь с нами напрямую через раздел «Контакты»."
  },
  {
    q: "Что происходит после отправки формы?",
    a: "Ваша заявка поступает к нам на email и в систему обработки. Наш специалист свяжется с вами в ближайшее время."
  },
];

const FEATURES = [
  {
    icon: "Zap",
    color: "#a855f7",
    title: "Быстрая обработка",
    desc: "Заявки обрабатываются автоматически и поступают к нам мгновенно"
  },
  {
    icon: "Shield",
    color: "#00ffff",
    title: "Защита данных",
    desc: "Все данные передаются по зашифрованному протоколу HTTPS"
  },
  {
    icon: "Image",
    color: "#ff0080",
    title: "Загрузка фото",
    desc: "Прикрепляйте фотографии и документы прямо в форме"
  },
  {
    icon: "Bell",
    color: "#00ff88",
    title: "Уведомления",
    desc: "Получайте подтверждение на почту после каждой заявки"
  },
];

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...dropped].slice(0, 5));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const picked = Array.from(e.target.files);
      setFiles(prev => [...prev, ...picked].slice(0, 5));
    }
  };

  const removeFile = (i: number) => {
    setFiles(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* NAV */}
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
            className="font-display text-xl font-bold gradient-text tracking-wide"
          >
            ЗАЯВКИ
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => scrollTo("#form")}
            className="hidden md:flex btn-neon px-5 py-2 rounded-xl text-sm font-bold"
          >
            Подать заявку
          </button>

          <button
            className="md:hidden text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 border-t border-white/10 px-6 py-4 flex flex-col gap-2">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 mesh-bg opacity-60" />

        <div
          className="absolute top-1/4 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl float-anim"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full opacity-20 blur-3xl float-anim"
          style={{ background: 'radial-gradient(circle, #00ffff, transparent)', animationDelay: '2s' }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8 fade-in-up-delay-1">
            <span
              className="w-2 h-2 rounded-full bg-purple-400 glow-pulse"
              style={{ boxShadow: '0 0 8px #a855f7' }}
            />
            Новые заявки принимаются
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 fade-in-up-delay-2">
            ОТПРАВЬТЕ<br />
            <span className="gradient-text">ВАШУ ЗАЯВКУ</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-10 fade-in-up-delay-3">
            Заполните форму, прикрепите фотографии — мы получим всё мгновенно и свяжемся с вами
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up-delay-4">
            <button
              onClick={() => scrollTo("#form")}
              className="btn-neon px-8 py-4 rounded-2xl text-base font-bold"
            >
              Заполнить форму
            </button>
            <button
              onClick={() => scrollTo("#about")}
              className="btn-outline-neon px-8 py-4 rounded-2xl text-base font-bold"
            >
              Узнать подробнее
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-400 font-medium text-sm uppercase tracking-widest mb-3">О сайте</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              КАК ЭТО <span className="gradient-text-cyan">РАБОТАЕТ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-card p-8 card-glow">
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-3xl"
                style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
              />
              <div className="relative">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)' }}
                >
                  <Icon name="FileText" size={26} style={{ color: '#a855f7' }} />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Простая форма</h3>
                <p className="text-white/60 leading-relaxed">
                  Заполните удобную форму с нужными данными. Добавьте фотографии, описание и контактную информацию — всё в одном месте.
                </p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-card p-8 card-glow">
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-3xl"
                style={{ background: 'radial-gradient(circle, #00ffff, transparent)' }}
              />
              <div className="relative">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'rgba(0,255,255,0.1)', border: '1px solid rgba(0,255,255,0.25)' }}
                >
                  <Icon name="Send" size={26} style={{ color: '#00ffff' }} />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Мгновенная доставка</h3>
                <p className="text-white/60 leading-relaxed">
                  После нажатия кнопки отправки все данные и файлы мгновенно поступают на наш email. Никаких задержек.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="rounded-2xl border border-white/8 bg-card p-6 card-glow text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}35` }}
                >
                  <Icon name={f.icon as "Zap"} size={22} style={{ color: f.color }} />
                </div>
                <h4 className="font-semibold text-white mb-2 text-sm">{f.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line mx-6" />

      {/* FORM */}
      <section id="form" className="py-24 px-6 relative">
        <div className="absolute inset-0 mesh-bg opacity-30" />
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <p className="text-purple-400 font-medium text-sm uppercase tracking-widest mb-3">Форма</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              ПОДАТЬ <span className="gradient-text">ЗАЯВКУ</span>
            </h2>
            <p className="text-white/50 mt-4">Заполните все поля и прикрепите файлы при необходимости</p>
          </div>

          {submitted ? (
            <div className="rounded-3xl border border-green-500/30 bg-green-500/10 p-12 text-center animate-scale-in">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(0,255,136,0.15)', border: '2px solid rgba(0,255,136,0.4)' }}
              >
                <Icon name="CheckCircle" size={40} style={{ color: '#00ff88' }} />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">Заявка отправлена!</h3>
              <p className="text-white/60 mb-8">Мы получили вашу заявку и свяжемся с вами в ближайшее время.</p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                  setFiles([]);
                }}
                className="btn-neon px-8 py-3 rounded-xl font-bold"
              >
                Отправить ещё одну
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-card p-8 md:p-10 space-y-5"
              style={{ boxShadow: '0 0 60px rgba(168,85,247,0.08)' }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">Имя *</label>
                  <input
                    required
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="Ваше имя"
                    className="input-neon w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">Телефон</label>
                  <input
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+7 (999) 000-00-00"
                    className="input-neon w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">Email *</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  placeholder="email@example.com"
                  className="input-neon w-full px-4 py-3 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">Тема заявки *</label>
                <input
                  required
                  value={formData.subject}
                  onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                  placeholder="Кратко опишите тему"
                  className="input-neon w-full px-4 py-3 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">Сообщение *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder="Подробно опишите вашу заявку..."
                  className="input-neon w-full px-4 py-3 rounded-xl text-sm resize-none"
                />
              </div>

              {/* File upload */}
              <div>
                <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                  Фото и файлы <span className="normal-case text-white/30">(до 5 файлов)</span>
                </label>
                <div
                  className={`upload-zone rounded-2xl p-6 text-center cursor-pointer ${dragging ? "dragover" : ""}`}
                  onDragOver={e => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileRef.current?.click()}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)' }}
                  >
                    <Icon name="Upload" size={22} style={{ color: '#a855f7' }} />
                  </div>
                  <p className="text-white/50 text-sm">
                    Перетащите файлы сюда или <span className="text-purple-400 font-medium">нажмите для выбора</span>
                  </p>
                  <p className="text-white/25 text-xs mt-1">JPG, PNG, PDF, DOC — до 10 МБ каждый</p>
                </div>

                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((file, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/10 bg-white/3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(168,85,247,0.15)' }}
                        >
                          <Icon
                            name={file.type.startsWith("image/") ? "Image" : "FileText"}
                            size={14}
                            style={{ color: '#a855f7' }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/80 truncate">{file.name}</p>
                          <p className="text-xs text-white/30">{(file.size / 1024).toFixed(0)} КБ</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="text-white/30 hover:text-red-400 transition-colors"
                        >
                          <Icon name="X" size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn-neon w-full py-4 rounded-2xl text-base font-bold mt-2"
              >
                Отправить заявку
                <Icon name="ArrowRight" size={18} className="inline ml-2" />
              </button>

              <p className="text-center text-xs text-white/25">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          )}
        </div>
      </section>

      <div className="section-line mx-6" />

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-purple-400 font-medium text-sm uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              ЧАСТЫЕ <span className="gradient-text">ВОПРОСЫ</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openFaq === i
                    ? "border-purple-500/40 bg-purple-500/8"
                    : "border-white/8 bg-card hover:border-white/15"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-sm md:text-base text-white/90">{item.q}</span>
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${openFaq === i ? "rotate-45" : ""}`}
                    style={{
                      background: openFaq === i ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${openFaq === i ? 'rgba(168,85,247,0.4)' : 'rgba(255,255,255,0.1)'}`
                    }}
                  >
                    <Icon name="Plus" size={14} style={{ color: openFaq === i ? '#a855f7' : 'rgba(255,255,255,0.5)' }} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-white/55 text-sm leading-relaxed border-t border-white/8 pt-4">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line mx-6" />

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-20" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <p className="text-purple-400 font-medium text-sm uppercase tracking-widest mb-3">Контакты</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              СВЯЖИТЕСЬ <span className="gradient-text">С НАМИ</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-md mx-auto">Мы всегда на связи и готовы ответить на ваши вопросы</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: "Mail", color: "#a855f7", label: "Email", value: "info@example.com" },
              { icon: "Phone", color: "#00ffff", label: "Телефон", value: "+7 (999) 000-00-00" },
              { icon: "MapPin", color: "#ff0080", label: "Адрес", value: "г. Москва, ул. Примерная, 1" },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-card p-6 card-glow text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}
                >
                  <Icon name={c.icon as "Mail"} size={24} style={{ color: c.color }} />
                </div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{c.label}</p>
                <p className="text-white/85 font-medium text-sm">{c.value}</p>
              </div>
            ))}
          </div>

          <div
            className="mt-12 rounded-3xl border border-purple-500/20 bg-purple-500/5 p-10 text-center"
            style={{ boxShadow: '0 0 60px rgba(168,85,247,0.08)' }}
          >
            <h3 className="font-display text-2xl font-bold text-white mb-3">Готовы начать?</h3>
            <p className="text-white/50 mb-8 max-w-sm mx-auto">Заполните форму прямо сейчас и мы обработаем вашу заявку максимально быстро</p>
            <button
              onClick={() => scrollTo("#form")}
              className="btn-neon px-10 py-4 rounded-2xl font-bold text-base"
            >
              Заполнить форму
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-bold gradient-text">ЗАЯВКИ</span>
          <p className="text-white/25 text-sm">© 2025 Все права защищены</p>
          <div className="flex gap-4">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/30 hover:text-white/70 text-xs transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
