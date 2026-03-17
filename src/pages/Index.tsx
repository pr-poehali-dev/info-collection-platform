import { useState } from "react";
import Icon from "@/components/ui/icon";
import FormModal from "@/components/FormModal";
import OrderTracker from "@/components/OrderTracker";

const HERO_IMG = "https://cdn.poehali.dev/projects/4ad4e45b-5ef6-4e0b-be5a-bf6e347fb55f/files/287ee05d-0feb-4b97-8602-5c80c3ace380.jpg";
const DOCS_IMG = "https://cdn.poehali.dev/projects/4ad4e45b-5ef6-4e0b-be5a-bf6e347fb55f/files/34f0f261-4da1-42a9-9957-86ff224be47a.jpg";

const NAV_LINKS = [
  { label: "Услуги", href: "#features" },
  { label: "Тарифы", href: "#tariffs" },
  { label: "Как работает", href: "#how" },
  { label: "Акции", href: "#promo" },
  { label: "Отзывы", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const FEATURES = [
  { icon: "Clock", color: "#1167d6", title: "10 минут", desc: "Среднее время оформления полиса от момента заявки" },
  { icon: "Shield", color: "#16a34a", title: "Надёжно", desc: "Работаем только с аккредитованными страховщиками" },
  { icon: "Globe", color: "#9333ea", title: "RU и KZ", desc: "Полисы для въезда в Россию и Казахстан" },
  { icon: "Headphones", color: "#ea580c", title: "24/7", desc: "Поддержка в Telegram в любое время суток" },
];

const TARIFFS_RU = [
  { period: "15 дней", price: "от 800 ₽", popular: false },
  { period: "1 месяц", price: "от 1 200 ₽", popular: true },
  { period: "3 месяца", price: "от 2 800 ₽", popular: false },
  { period: "6 месяцев", price: "от 4 500 ₽", popular: false },
];

const TARIFFS_KZ = [
  { period: "15 дней", price: "от 4 000 ₸", popular: false },
  { period: "1 месяц", price: "от 7 000 ₸", popular: true },
  { period: "3 месяца", price: "от 15 000 ₸", popular: false },
  { period: "6 месяцев", price: "от 25 000 ₸", popular: false },
];

const HOW_STEPS = [
  { num: "01", icon: "Upload", title: "Отправьте документы", desc: "Заполните форму и загрузите фото паспорта, СТС и прав" },
  { num: "02", icon: "CreditCard", title: "Оплатите по СБП", desc: "Менеджер пришлёт реквизиты — оплата переводом за 1 минуту" },
  { num: "03", icon: "FileCheck", title: "Получите полис", desc: "Готовый полис придёт вам в течение 10 минут" },
];

const PROMOS = [
  {
    tag: "СРОЧНО", tagColor: "discount-tag",
    icon: "Zap", iconBg: "#fef3c7", iconColor: "#d97706",
    title: "Срочное оформление",
    desc: "Получите полис за 15 минут в любое время суток",
    badge: "Доступно 24/7", badgeClass: "badge-orange",
  },
  {
    tag: "-10%", tagColor: "discount-tag",
    icon: "RotateCcw", iconBg: "#dcfce7", iconColor: "#16a34a",
    title: "Скидка повторным клиентам",
    desc: "10% скидка при оформлении второго и последующих полисов",
    badge: "Постоянным клиентам", badgeClass: "badge-green",
  },
  {
    tag: "ВЫГОДНО", tagColor: "discount-tag",
    icon: "Users", iconBg: "#ede9fe", iconColor: "#7c3aed",
    title: "Приведи друга",
    desc: "Получите бонус за каждого приглашённого клиента",
    badge: "Реферальная программа", badgeClass: "badge-blue",
  },
];

const REVIEWS = [
  { name: "Алексей М.", city: "Москва", stars: 5, text: "Оформил полис за 8 минут! Всё быстро, чётко, без лишней бюрократии. Буду рекомендовать." },
  { name: "Динара К.", city: "Алматы", stars: 5, text: "Въезжала в Россию, нужен был полис. Написала в 11 вечера — за 12 минут всё было готово. Спасибо!" },
  { name: "Иван П.", city: "Екатеринбург", stars: 5, text: "Уже третий раз пользуюсь. Скидка постоянным клиентам реально есть, что приятно." },
  { name: "Малика Б.", city: "Нур-Султан", stars: 5, text: "Понятный сайт, даже бабушка разобралась. Документы загрузили, оплатили — всё пришло быстро." },
];

const DOCS_LIST = [
  { icon: "BookUser", label: "Паспорт", desc: "Лицевая сторона с фото" },
  { icon: "Car", label: "СТС", desc: "Свидетельство о регистрации ТС (обе стороны)" },
  { icon: "CreditCard", label: "Права", desc: "Водительское удостоверение (обе стороны)" },
];

const FAQ_ITEMS = [
  { q: "Как быстро я получу полис?", a: "В среднем 10 минут с момента оплаты. В ночное время может занять до 30 минут." },
  { q: "Для каких стран оформляете полис?", a: "Оформляем страховку для въезда в Россию (ОСАГО) и в Казахстан (ГПО ВТС)." },
  { q: "Как происходит оплата?", a: "Оплата через СБП — перевод на карту. Реквизиты пришлёт менеджер после проверки документов." },
  { q: "Нужно ли приезжать лично?", a: "Нет! Всё делается онлайн. Вы загружаете фото документов, мы всё оформляем удалённо." },
  { q: "Что делать если в полисе ошибка?", a: "Напишите нам в Telegram, исправим бесплатно в течение 30 минут." },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [tariffTab, setTariffTab] = useState<"ru" | "kz">("ru");

  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleFormSubmit = (id: string) => {
    setShowForm(false);
    setOrderId(id);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* NAV */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
              <Icon name="Shield" size={16} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold text-slate-900 tracking-wide">АвтоПолис</span>
          </div>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <button onClick={() => scrollTo(l.href)}
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              <Icon name="MessageCircle" size={16} />
              Telegram
            </a>
            <button onClick={() => setShowForm(true)} className="btn-primary px-5 py-2.5 text-sm">
              Оформить полис
            </button>
            <button className="lg:hidden w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={18} className="text-slate-600" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-5 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-left px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-85" />
        </div>

        <div className="absolute top-32 right-8 lg:right-20 hidden md:block animate-float">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium">Онлайн сейчас</span>
            </div>
            <p className="text-2xl font-bold">10 000+</p>
            <p className="text-xs text-white/70">довольных клиентов</p>
          </div>
        </div>

        <div className="absolute bottom-32 right-8 lg:right-32 hidden lg:block animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Clock" size={14} className="text-blue-300" />
              <span className="text-xs text-white/70">Среднее время</span>
            </div>
            <p className="text-xl font-bold">10 мин</p>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 py-20 md:py-0">
          <div className="max-w-2xl">
            <div className="inline-block mb-6 animate-fade-up-1 text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/30 bg-white/10">
              🇷🇺 Въезд в Россию и 🇰🇿 Казахстан
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up-2">
              СТРАХОВАНИЕ<br />
              <span style={{ color: '#7dd3fc' }}>АВТОМОБИЛЯ</span><br />
              НА ГРАНИЦЕ
            </h1>
            <p className="text-white/75 text-lg md:text-xl mb-8 leading-relaxed animate-fade-up-3">
              Получите полис за <strong className="text-white">10 минут</strong> не выходя из машины.<br />
              Оплата по СБП, оформление онлайн 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up-4">
              <button onClick={() => setShowForm(true)}
                className="btn-white px-8 py-4 text-base flex items-center justify-center gap-2">
                <Icon name="FileText" size={18} />
                Оформить полис
              </button>
              <button onClick={() => scrollTo("#how")}
                className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-2xl border-2 transition-all"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>
                Как это работает
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-5 mt-8 animate-fade-up-4">
              {["Официальные страховщики", "Документы за 10 мин", "Поддержка 24/7"].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-white/75 text-sm">
                  <Icon name="Check" size={14} className="text-green-400" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-5 section-blue-soft">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="badge-blue mb-3">Наши преимущества</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mt-3">
              Почему выбирают <span className="text-gradient">АвтоПолис</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 card-hover shadow-sm">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${f.color}15` }}>
                  <Icon name={f.icon as "Clock"} size={24} style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
              {[
                { val: "10 000+", label: "Довольных клиентов" },
                { val: "10 мин", label: "Среднее оформление" },
                { val: "24/7", label: "Поддержка" },
                { val: "2 страны", label: "Россия и Казахстан" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold mb-1">{s.val}</p>
                  <p className="text-white/70 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-5" />

      {/* TARIFFS */}
      <section id="tariffs" className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-blue mb-3">Тарифы</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mt-3">Стоимость страховки</h2>
            <p className="text-slate-500 mt-3 max-w-md mx-auto">Цена зависит от срока, мощности авто и страны въезда</p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-slate-100 rounded-2xl p-1 gap-1">
              {[
                { id: "ru", label: "🇷🇺 Въезд в Россию" },
                { id: "kz", label: "🇰🇿 Въезд в Казахстан" },
              ].map(tab => (
                <button key={tab.id} onClick={() => setTariffTab(tab.id as "ru" | "kz")}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    tariffTab === tab.id ? "bg-white shadow text-blue-600" : "text-slate-500 hover:text-slate-700"
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(tariffTab === "ru" ? TARIFFS_RU : TARIFFS_KZ).map((t, i) => (
              <div key={i} className={`rounded-3xl p-6 text-center relative transition-all ${
                t.popular
                  ? "bg-gradient-to-b from-blue-600 to-blue-500 text-white shadow-xl shadow-blue-200"
                  : "bg-white border border-slate-100 card-hover"
              }`}>
                {t.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-400 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Популярный
                  </span>
                )}
                <p className={`text-sm font-medium mb-3 ${t.popular ? "text-white/80" : "text-slate-500"}`}>{t.period}</p>
                <p className={`text-2xl font-bold mb-4 ${t.popular ? "text-white" : "text-slate-900"}`}>{t.price}</p>
                <button onClick={() => setShowForm(true)}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    t.popular ? "bg-white text-blue-600 hover:bg-blue-50" : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}>
                  Оформить
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-xs mt-4">*Точная стоимость рассчитывается индивидуально</p>
        </div>
      </section>

      <div className="section-divider mx-5" />

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 px-5 section-blue-soft">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="badge-blue mb-3">Простой процесс</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mt-3">Как это работает</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {HOW_STEPS.map((s, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-3xl p-7 card-hover shadow-sm text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                    <Icon name={s.icon as "Upload"} size={24} className="text-white" />
                  </div>
                  <div className="text-4xl font-bold text-blue-100 mb-2 font-display">{s.num}</div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
                {i < HOW_STEPS.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 z-10 w-6 h-6 rounded-full bg-blue-500 text-white items-center justify-center shadow">
                    <Icon name="ChevronRight" size={14} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-5">Что потребуется</h3>
                <div className="space-y-4">
                  {DOCS_LIST.map((d, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Icon name={d.icon as "Car"} size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{d.label}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{d.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowForm(true)}
                  className="btn-primary mt-7 px-7 py-3 flex items-center gap-2 text-sm">
                  <Icon name="ArrowRight" size={16} />
                  Начать оформление
                </button>
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src={DOCS_IMG} alt="Документы" className="w-full h-52 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-5" />

      {/* PROMO */}
      <section id="promo" className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="discount-tag mb-3">АКЦИИ</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mt-4">Специальные предложения</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PROMOS.map((p, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 card-hover border border-slate-100 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: p.iconBg }}>
                    <Icon name={p.icon as "Zap"} size={22} style={{ color: p.iconColor }} />
                  </div>
                  <span className={p.tagColor}>{p.tag}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                <span className={p.badgeClass}>{p.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-5" />

      {/* REVIEWS */}
      <section id="reviews" className="py-20 px-5 section-blue-soft">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-blue mb-3">Отзывы</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mt-3">Нам доверяют клиенты</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 card-hover shadow-sm border border-slate-100">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{r.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{r.name}</p>
                    <p className="text-xs text-slate-400">{r.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-5" />

      {/* FAQ */}
      <section id="faq" className="py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-blue mb-3">FAQ</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mt-3">Частые вопросы</h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={`rounded-2xl border transition-all overflow-hidden ${
                openFaq === i ? "border-blue-200 bg-blue-50" : "border-slate-100 bg-white card-hover"
              }`}>
                <button className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-slate-800 text-sm">{item.q}</span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                    openFaq === i ? "bg-blue-500 rotate-45" : "bg-slate-100"
                  }`}>
                    <Icon name="Plus" size={14} className={openFaq === i ? "text-white" : "text-slate-400"} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-slate-600 text-sm leading-relaxed border-t border-blue-100 pt-3">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + CONTACTS */}
      <section id="contacts" className="py-20 px-5 section-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Готовы к поездке?</h2>
          <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">Оформите страховку прямо сейчас — займёт 10 минут</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button onClick={() => setShowForm(true)}
              className="btn-white px-10 py-4 text-base flex items-center justify-center gap-2">
              <Icon name="FileText" size={18} />
              Оформить полис
            </button>
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-10 py-4 text-base font-semibold rounded-2xl border-2 transition-all"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
              <Icon name="MessageCircle" size={18} />
              Написать в Telegram
            </a>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 max-w-xl mx-auto">
            {[
              { icon: "Mail", label: "Email", val: "info@avtopolis.ru" },
              { icon: "MessageCircle", label: "Telegram", val: "@avtopolis" },
              { icon: "Clock", label: "Поддержка", val: "24/7" },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <Icon name={c.icon as "Mail"} size={20} className="text-blue-300 mx-auto mb-2" />
                <p className="text-white/40 text-xs mb-1">{c.label}</p>
                <p className="text-white text-sm font-medium">{c.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <Icon name="Shield" size={14} className="text-white" />
            </div>
            <span className="font-display text-lg font-bold text-white">АвтоПолис</span>
          </div>
          <p className="text-slate-500 text-sm">© 2025 АвтоПолис. Все права защищены.</p>
          <div className="flex gap-4">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-slate-500 hover:text-white text-xs transition-colors">
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {showForm && <FormModal onClose={() => setShowForm(false)} onSubmit={handleFormSubmit} />}
      {orderId && <OrderTracker orderId={orderId} currentStatus="processing" onClose={() => setOrderId(null)} />}
    </div>
  );
}
