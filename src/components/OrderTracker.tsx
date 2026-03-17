import Icon from "@/components/ui/icon";

const STATUSES = [
  { key: "processing", label: "Обработка", desc: "Заявка получена, проверяем документы", icon: "Loader" },
  { key: "accepted",   label: "Заявка принята", desc: "Документы проверены, готовим полис", icon: "CheckCircle" },
  { key: "payment",    label: "Ожидание оплаты", desc: "Переведите оплату по СБП и пришлите скриншот", icon: "CreditCard" },
  { key: "policy",     label: "Получение полиса", desc: "Полис оформляется у страховщика", icon: "FileText" },
  { key: "done",       label: "Завершено", desc: "Полис готов и отправлен вам", icon: "PartyPopper" },
];

type StatusKey = "processing" | "accepted" | "payment" | "policy" | "done" | "error";

interface Props {
  orderId: string;
  currentStatus?: StatusKey;
  onClose: () => void;
}

export default function OrderTracker({ orderId, currentStatus = "processing", onClose }: Props) {
  const isError = currentStatus === "error";
  const currentIdx = STATUSES.findIndex(s => s.key === currentStatus);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(6px)' }}>
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-fade-in">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-primary to-blue-400 px-6 pt-6 pb-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Icon name="Package" size={16} className="text-white" />
              </div>
              <span className="font-bold text-sm">Отслеживание заявки</span>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <Icon name="X" size={14} className="text-white" />
            </button>
          </div>
          <div>
            <p className="text-white/70 text-xs mb-0.5">Номер заявки</p>
            <p className="text-2xl font-bold tracking-wider">#{orderId}</p>
          </div>
        </div>

        {/* Status list */}
        <div className="px-6 py-5 space-y-2 max-h-[60vh] overflow-y-auto">
          {isError && (
            <div className="rounded-2xl bg-red-50 border border-red-200 p-4 flex gap-3 mb-4">
              <Icon name="AlertCircle" size={20} className="text-red-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-red-700">Ошибка обработки</p>
                <p className="text-xs text-red-500 mt-0.5">Свяжитесь с поддержкой в Telegram</p>
              </div>
            </div>
          )}

          {STATUSES.map((s, i) => {
            const isDone = i < currentIdx;
            const isActive = i === currentIdx && !isError;
            const isPending = i > currentIdx;

            return (
              <div key={s.key} className={`rounded-2xl px-4 py-3.5 flex items-start gap-3 transition-all
                ${isActive ? "status-active" : isDone ? "status-done" : "status-pending"}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                  ${isActive ? "step-active animate-pulse-blue" : isDone ? "step-done" : "step-pending"}`}>
                  {isDone
                    ? <Icon name="Check" size={16} className="text-white" />
                    : <Icon name={s.icon as "Loader"} size={16} className={isActive ? "text-white" : "text-slate-300"} />
                  }
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${isActive ? "text-blue-700" : isDone ? "text-green-700" : "text-slate-300"}`}>
                    {s.label}
                  </p>
                  {(isActive || isDone) && (
                    <p className={`text-xs mt-0.5 ${isActive ? "text-blue-500" : "text-green-500"}`}>{s.desc}</p>
                  )}
                </div>
                {isActive && (
                  <span className="badge-blue text-xs">Сейчас</span>
                )}
                {isDone && (
                  <span className="badge-green text-xs">Готово</span>
                )}
              </div>
            );
          })}

          {/* Payment block */}
          {currentStatus === "payment" && (
            <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-5 mt-3">
              <p className="font-bold text-slate-800 mb-1 text-sm">Оплата через СБП</p>
              <p className="text-xs text-slate-500 mb-3">После проверки документов менеджер пришлёт реквизиты для оплаты</p>
              <div className="bg-white rounded-xl p-3 text-center border border-blue-100">
                <p className="text-xs text-slate-400 mb-1">Сумма к оплате</p>
                <p className="text-2xl font-bold text-blue-600">—</p>
                <p className="text-xs text-slate-400">Будет указана менеджером</p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 pb-6">
          <a href="https://t.me/" target="_blank" rel="noopener noreferrer"
            className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm">
            <Icon name="MessageCircle" size={16} />
            Написать в поддержку
          </a>
        </div>
      </div>
    </div>
  );
}
