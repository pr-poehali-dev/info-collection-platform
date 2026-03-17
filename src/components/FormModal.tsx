import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

interface DriverDocs {
  licFront: File | null;
  licBack: File | null;
}

interface FormState {
  phone: string;
  passportFront: File | null;
  stsFront: File | null;
  stsBack: File | null;
  driver1: DriverDocs;
  secondDriver: boolean;
  driver2: DriverDocs;
}

interface Props {
  onClose: () => void;
  onSubmit: (id: string) => void;
}

const STEPS = ["Контакты", "Документы", "Водители", "Отправка"];

function FileUpload({
  label, file, onFile, accept = "image/*"
}: { label: string; file: File | null; onFile: (f: File) => void; accept?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{label}</p>
      <div
        className={`upload-zone p-4 text-center ${drag ? "active" : ""} ${file ? "border-green-400 bg-green-50" : ""}`}
        onClick={() => ref.current?.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]); }}
      >
        <input ref={ref} type="file" accept={accept} className="hidden"
          onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} />
        {file ? (
          <div className="flex items-center gap-2 justify-center">
            <Icon name="CheckCircle" size={18} className="text-green-500" />
            <span className="text-sm text-green-700 font-medium truncate max-w-[180px]">{file.name}</span>
          </div>
        ) : (
          <div>
            <Icon name="Upload" size={20} className="text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">Нажмите или перетащите фото</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FormModal({ onClose, onSubmit }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    phone: "",
    passportFront: null,
    stsFront: null,
    stsBack: null,
    driver1: { licFront: null, licBack: null },
    secondDriver: false,
    driver2: { licFront: null, licBack: null },
  });

  const set = (key: keyof FormState, val: unknown) =>
    setForm(p => ({ ...p, [key]: val }));

  const canNext = () => {
    if (step === 0) return form.phone.length >= 10;
    if (step === 1) return !!(form.passportFront && form.stsFront && form.stsBack);
    if (step === 2) return !!(form.driver1.licFront && form.driver1.licBack);
    return true;
  };

  const handleSubmit = () => {
    const id = Math.random().toString(36).slice(2, 9).toUpperCase();
    onSubmit(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(6px)' }}>
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-fade-in">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Оформить полис</h2>
            <p className="text-xs text-slate-400 mt-0.5">Шаг {step + 1} из {STEPS.length}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <Icon name="X" size={16} className="text-slate-500" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex gap-2 mb-1">
            {STEPS.map((s, i) => (
              <div key={i} className="flex-1">
                <div className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'bg-blue-500' : 'bg-slate-100'}`} />
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {STEPS.map((s, i) => (
              <span key={i} className={`text-xs font-medium ${i === step ? 'text-blue-600' : i < step ? 'text-green-500' : 'text-slate-300'}`}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[55vh] overflow-y-auto">

          {/* Step 0 — Контакты */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-2xl p-4 flex gap-3">
                <Icon name="Info" size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">Укажите номер телефона — мы пришлём ссылку на отслеживание заявки</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Номер телефона *
                </label>
                <input
                  value={form.phone}
                  onChange={e => set("phone", e.target.value)}
                  placeholder="+7 (999) 000-00-00"
                  className="input-modern w-full px-4 py-3.5 text-base"
                  type="tel"
                />
              </div>
            </div>
          )}

          {/* Step 1 — Документы */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-2xl p-4 flex gap-3">
                <Icon name="AlertCircle" size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700">Убедитесь что фото чёткие и все данные читаемы</p>
              </div>
              <FileUpload label="Паспорт — лицевая сторона" file={form.passportFront}
                onFile={f => set("passportFront", f)} />
              <FileUpload label="СТС — лицевая сторона" file={form.stsFront}
                onFile={f => set("stsFront", f)} />
              <FileUpload label="СТС — обратная сторона" file={form.stsBack}
                onFile={f => set("stsBack", f)} />
            </div>
          )}

          {/* Step 2 — Водители */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">1</span>
                  Водитель 1
                </p>
                <div className="space-y-3">
                  <FileUpload label="Права — лицевая сторона" file={form.driver1.licFront}
                    onFile={f => set("driver1", { ...form.driver1, licFront: f })} />
                  <FileUpload label="Права — обратная сторона" file={form.driver1.licBack}
                    onFile={f => set("driver1", { ...form.driver1, licBack: f })} />
                </div>
              </div>

              <div className="section-divider" />

              <button
                type="button"
                onClick={() => set("secondDriver", !form.secondDriver)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 transition-all ${
                  form.secondDriver
                    ? "border-blue-400 bg-blue-50"
                    : "border-dashed border-slate-200 hover:border-blue-300"
                }`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                  form.secondDriver ? "bg-blue-500" : "border-2 border-slate-300"
                }`}>
                  {form.secondDriver && <Icon name="Check" size={12} className="text-white" />}
                </div>
                <span className="text-sm font-semibold text-slate-700">Добавить второго водителя</span>
              </button>

              {form.secondDriver && (
                <div className="animate-fade-in">
                  <p className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">2</span>
                    Водитель 2
                  </p>
                  <div className="space-y-3">
                    <FileUpload label="Права — лицевая сторона" file={form.driver2.licFront}
                      onFile={f => set("driver2", { ...form.driver2, licFront: f })} />
                    <FileUpload label="Права — обратная сторона" file={form.driver2.licBack}
                      onFile={f => set("driver2", { ...form.driver2, licBack: f })} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3 — Подтверждение */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-green-50 rounded-2xl p-5 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Icon name="CheckCircle" size={28} className="text-green-500" />
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-1">Всё готово к отправке!</h3>
                <p className="text-sm text-slate-500">Проверьте данные и нажмите «Отправить заявку»</p>
              </div>

              <div className="rounded-2xl border border-slate-100 divide-y divide-slate-100">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-slate-500">Телефон</span>
                  <span className="text-sm font-semibold text-slate-800">{form.phone}</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-slate-500">Документов загружено</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {[form.passportFront, form.stsFront, form.stsBack, form.driver1.licFront, form.driver1.licBack,
                      form.driver2.licFront, form.driver2.licBack].filter(Boolean).length} фото
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-slate-500">Водителей</span>
                  <span className="text-sm font-semibold text-slate-800">{form.secondDriver ? "2" : "1"}</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4 flex gap-3">
                <Icon name="Clock" size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">Среднее время обработки — <strong>10 минут</strong>. Вы получите ссылку на отслеживание.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="btn-outline px-5 py-3.5 flex items-center gap-2"
            >
              <Icon name="ChevronLeft" size={16} />
              Назад
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext()}
              className={`btn-primary flex-1 py-3.5 flex items-center justify-center gap-2 ${!canNext() ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              Далее
              <Icon name="ChevronRight" size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-primary flex-1 py-3.5 flex items-center justify-center gap-2"
            >
              <Icon name="Send" size={16} />
              Отправить заявку
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
