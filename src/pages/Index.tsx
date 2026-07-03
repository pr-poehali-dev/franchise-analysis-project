import { useState, ReactNode } from 'react';
import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/use-reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const scrollToForm = () => {
  document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
};

const checklistQuestions = [
  'Сколько денег нужно вложить до первой выручки — с ремонтом, оборудованием, товаром и подушкой на первые месяцы?',
  'Какой паушальный взнос и что конкретно входит в эту сумму?',
  'Как считается роялти: процент с оборота, фикс или иначе, и с какого месяца начисляется?',
  'Есть ли обязательные закупки у франчайзера по фиксированным ценам?',
  'Есть ли маркетинговый сбор, и на что он тратится по факту?',
  'Сколько точек открылось за последние 2 года и сколько из них закрылось?',
  'Можно ли связаться с действующими партнёрами напрямую, без сопровождения менеджера?',
  'Какая реальная выручка и прибыль у средней точки, а не у флагманской?',
  'Какие штрафы прописаны в договоре и за что?',
  'На каких условиях можно выйти из франшизы и вернуть ли вложения?',
  'Кому принадлежит помещение и клиентская база, если вы решите уйти?',
  'Что будет с точкой, если франчайзер закроется или сменит владельца?',
];

const buildChecklist = () => {
  const lines = [
    '12 ВОПРОСОВ, КОТОРЫЕ НУЖНО ЗАДАТЬ ФРАНЧАЙЗЕРУ',
    'До того, как подпишете договор и внесёте деньги.',
    '',
    ...checklistQuestions.map((q, i) => `${i + 1}. ${q}`),
    '',
    '— Если на какой-то вопрос вам не отвечают прямо, это уже ответ.',
  ];
  return lines.join('\n');
};

const downloadChecklist = () => {
  const blob = new Blob([buildChecklist()], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Вопросы-франчайзеру.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const Rule = () => <div className="h-px w-full bg-border" />;

const Reveal = ({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <span className="font-mono-editorial text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
    {children}
  </span>
);

const Index = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="font-display text-2xl font-semibold tracking-tight text-primary">
            Разбор&nbsp;франшиз
          </div>
          <button
            onClick={scrollToForm}
            className="hidden border border-primary bg-transparent px-5 py-2.5 font-mono-editorial text-[11px] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-lg active:translate-y-0 sm:inline-block"
          >
            Оставить заявку
          </button>
        </div>
      </header>

      {/* 1. HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="paper-grain pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-8">
            <div className="fade-up mb-6 flex items-center gap-3 font-mono-editorial text-[11px] uppercase tracking-[0.25em] text-accent">
              <span className="inline-block h-px w-8 animate-pulse bg-accent" />
              Независимый разбор · без рекламы франчайзеров
            </div>
            <h1
              className="fade-up font-display text-[2.6rem] font-medium leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl"
              style={{ animationDelay: '0.1s' }}
            >
              Хотите купить франшизу?
              <br />
              <span className="text-primary">
                Сначала узнайте, на чём она может вас разорить.
              </span>
            </h1>
            <p
              className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-foreground/90"
              style={{ animationDelay: '0.2s' }}
            >
              Бесплатно разберу франшизу, которую вы присматриваете: реальные
              вложения, скрытые платежи, сколько на самом деле зарабатывают
              партнёры и где вас могут обмануть. Без рекламы франчайзеров.
            </p>
            <div
              className="fade-up mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              style={{ animationDelay: '0.3s' }}
            >
              <button
                onClick={scrollToForm}
                className="group inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 text-primary-foreground shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-accent hover:shadow-xl active:translate-y-0"
              >
                <span className="text-base font-semibold">
                  Разобрать мою франшизу бесплатно
                </span>
                <Icon
                  name="ArrowDown"
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </button>
              <span className="font-mono-editorial text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/80">
                Отвечу лично
              </span>
            </div>
          </div>

          {/* Right editorial column */}
          <div className="md:col-span-4 md:border-l md:border-border md:pl-8">
            <div
              className="fade-up flex h-full flex-col justify-end"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="space-y-6">
                {[
                  ['Что смотрю', 'Договор, цифры, условия'],
                  ['Чью сторону занимаю', 'Вашу, не продавца'],
                  ['Сколько стоит', 'Пока — бесплатно'],
                ].map(([k, v], i) => (
                  <div
                    key={k}
                    className="fade-up border-l-2 border-transparent pl-4 transition-colors duration-500 hover:border-accent"
                    style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                  >
                    <div className="font-mono-editorial text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
                      {k}
                    </div>
                    <div className="mt-1 font-display text-2xl text-primary">
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:py-24">
          <Reveal className="md:col-span-4">
            <SectionLabel>01 — Проблема</SectionLabel>
          </Reveal>
          <Reveal className="md:col-span-8" delay={100}>
            <h2 className="font-display text-4xl font-medium leading-tight text-foreground md:text-5xl">
              Франшизу продаёт тот, кому выгодно вам её продать.
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-foreground/90">
              <p>
                На презентации вам покажут флагманскую точку в проходном месте и
                график, который идёт только вверх. Скрытые платежи, обязательные
                закупки и закрывшиеся партнёры остаются за кадром.
              </p>
              <p className="border-l-2 border-accent pl-5 text-foreground">
                Красивая презентация не равна вашей прибыли. Красивая презентация
                равна работе отдела продаж франчайзера.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. SOLUTION */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <SectionLabel>02 — Решение</SectionLabel>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-foreground md:text-5xl">
                Я разбираю франшизу с вашей стороны, а не со стороны продавца.
              </h2>
            </Reveal>
            <div className="md:col-span-8">
              <ol className="divide-y divide-border border-y border-border">
                {[
                  ['Реальные стартовые вложения', 'Не «от», а сколько нужно на самом деле — до первой выручки.'],
                  ['Паушальный взнос, роялти и скрытые платежи', 'Считаю все обязательные расходы, включая закупки и сборы.'],
                  ['Заработок действующих партнёров', 'Сколько зарабатывают средние точки и сколько уже закрылось.'],
                  ['Условия договора и штрафы', 'Что вы подписываете и чем рискуете при выходе.'],
                  ['Честный вывод', 'Стоит ли заходить именно вам — с учётом вашего бюджета и города.'],
                ].map(([title, desc], i) => (
                  <Reveal key={title} delay={i * 80}>
                    <li className="group flex gap-6 py-6 pl-3 transition-all duration-300 hover:bg-background hover:pl-5">
                      <span className="font-mono-editorial text-sm text-accent transition-transform duration-300 group-hover:scale-110">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl text-foreground">
                          {title}
                        </h3>
                        <p className="mt-1 text-foreground/90">{desc}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
              <Reveal delay={400}>
                <button
                  onClick={scrollToForm}
                  className="group mt-10 inline-flex items-center gap-3 border border-primary bg-transparent px-7 py-3.5 text-primary shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground hover:shadow-xl active:translate-y-0"
                >
                  <span className="font-semibold">Получить разбор моей франшизы</span>
                  <Icon
                    name="ArrowRight"
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY TRUST */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Reveal>
            <SectionLabel>03 — Почему мне можно верить</SectionLabel>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {[
              ['ShieldOff', 'Не зарабатываю на франчайзерах', 'Нет партнёрских выплат и откатов. Мне всё равно, купите вы франшизу или нет.'],
              ['Scale', 'Не разоблачаю ради хайпа', 'Если франшиза хорошая — так и скажу. Задача не напугать, а показать факты.'],
              ['FileText', 'Разбираю по фактам', 'Договор, цифры, условия. Где факт, а где моя оценка — помечаю отдельно.'],
            ].map(([icon, title, desc], i) => (
              <Reveal key={title} delay={i * 120}>
                <div className="group h-full bg-background p-8 transition-colors duration-300 hover:bg-secondary/60">
                  <Icon
                    name={icon as string}
                    size={26}
                    className="text-primary transition-transform duration-300 group-hover:-translate-y-1"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-6 font-display text-2xl text-foreground">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-foreground/90">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW I WORK */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:py-24">
          <Reveal className="md:col-span-4">
            <SectionLabel>04 — Как я работаю</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-foreground md:text-5xl">
              Методика, а не интуиция.
            </h2>
          </Reveal>
          <div className="md:col-span-8">
            <div className="space-y-8">
              {[
                ['01', 'Методика разбора из 6 шагов', 'Каждую франшизу прогоняю по одному и тому же маршруту — от структуры вложений до пунктов договора.'],
                ['02', 'Список франшиз, проверенных временем', 'Опираюсь на базу брендов, которые работают 10+ лет, — чтобы сравнивать с теми, кто устоял.'],
                ['03', 'База знаний по нишам', 'Общепит, розница, услуги — у каждой ниши свои ловушки. Смотрю на вашу франшизу в контексте её рынка.'],
              ].map(([num, title, desc], i) => (
                <Reveal key={num} delay={i * 120}>
                  <div className="group flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:gap-8">
                    <span className="font-display text-5xl leading-none text-accent transition-transform duration-300 group-hover:scale-110">
                      {num}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-foreground">
                        {title}
                      </h3>
                      <p className="mt-2 max-w-xl text-foreground/90">{desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={400}>
              <p className="mt-8 border-l-2 border-accent pl-5 font-display text-xl italic text-foreground/85">
                Пока это старт проекта — первые разборы делаю бесплатно, чтобы
                собрать реальные кейсы.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CHECKLIST DOWNLOAD */}
      <section className="border-b border-border bg-primary text-primary-foreground">
        <Reveal>
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="font-mono-editorial text-[11px] font-semibold uppercase tracking-[0.25em] text-primary-foreground/80">
                Бесплатный материал
              </span>
              <h2 className="mt-3 font-display text-3xl font-medium leading-tight md:text-4xl">
                12 вопросов, которые нужно задать франчайзеру
              </h2>
              <p className="mt-3 text-primary-foreground/90">
                Забирайте чек-лист и задайте эти вопросы до того, как подпишете
                договор. Если на какой-то из них вам не ответят прямо — это уже
                ответ.
              </p>
            </div>
            <button
              onClick={downloadChecklist}
              className="group inline-flex shrink-0 items-center gap-3 border border-background bg-transparent px-7 py-4 text-primary-foreground shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-background hover:text-primary hover:shadow-xl active:translate-y-0"
            >
              <Icon
                name="Download"
                size={18}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
              <span className="font-semibold">Скачать чек-лист</span>
            </button>
          </div>
        </Reveal>
      </section>

      {/* 6. FAQ */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:py-24">
          <Reveal className="md:col-span-4">
            <SectionLabel>05 — Частые вопросы</SectionLabel>
          </Reveal>
          <Reveal className="md:col-span-8" delay={100}>
            <Accordion type="single" collapsible className="w-full">
              {[
                ['Это правда бесплатно?', 'Да. Сейчас я собираю первые кейсы, поэтому разборы бесплатные. Ничего продавать вас не обязываю.'],
                ['Вы просто отговорите от любой франшизы?', 'Нет. Если условия честные и цифры сходятся — так и скажу. Моя задача — не запугать, а показать реальную картину.'],
                ['Откуда данные?', 'Открытые источники, тексты договоров, отзывы действующих партнёров. Где факт, а где моя оценка — помечаю отдельно.'],
                ['Сколько ждать разбор?', 'Сроки назову после заявки — они зависят от того, насколько доступна информация по конкретной франшизе.'],
              ].map(([q, a], i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-border"
                >
                  <AccordionTrigger className="py-6 text-left font-display text-2xl font-medium text-foreground hover:no-underline hover:text-primary">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-foreground/90">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* 7. FORM */}
      <section id="form" className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <span className="font-mono-editorial text-[11px] uppercase tracking-[0.25em] text-accent">
                06 — Заявка
              </span>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-foreground md:text-5xl">
                Оставьте франшизу — пришлю честный разбор.
              </h2>
              <p className="mt-6 max-w-md text-foreground/90">
                Напишите, что присматриваете и как с вами связаться. Разберу и
                вернусь лично.
              </p>
            </Reveal>

            <Reveal className="md:col-span-7" delay={150}>
              {submitted ? (
                <div className="flex h-full flex-col justify-center border border-border bg-background p-10 animate-scale-in">
                  <Icon
                    name="Check"
                    size={32}
                    className="text-primary"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-5 font-display text-3xl text-foreground">
                    Заявка принята
                  </h3>
                  <p className="mt-3 text-foreground/90">
                    Спасибо. Я получил вашу франшизу и свяжусь с вами лично.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 border border-border bg-background p-8 md:p-10"
                >
                  <div>
                    <label className="mb-2 block font-mono-editorial text-[11px] uppercase tracking-[0.15em] text-foreground/85">
                      Какую франшизу присматриваете? *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Название франшизы или ссылка"
                      className="w-full border-b border-border bg-transparent py-3 text-lg text-foreground outline-none transition-colors focus:border-primary placeholder:text-foreground/30"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono-editorial text-[11px] uppercase tracking-[0.15em] text-foreground/85">
                      Как с вами связаться? *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Telegram / телефон / email"
                      className="w-full border-b border-border bg-transparent py-3 text-lg text-foreground outline-none transition-colors focus:border-primary placeholder:text-foreground/30"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono-editorial text-[11px] uppercase tracking-[0.15em] text-foreground/85">
                      Имя
                    </label>
                    <input
                      type="text"
                      placeholder="Как к вам обращаться"
                      className="w-full border-b border-border bg-transparent py-3 text-lg text-foreground outline-none transition-colors focus:border-primary placeholder:text-foreground/30"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-accent hover:shadow-xl active:translate-y-0"
                  >
                    Отправить заявку
                  </button>
                  <p className="text-sm text-foreground/85">
                    Отвечу лично. Не передаю контакты третьим лицам и не спамлю.
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto max-w-6xl px-6 py-10">
        <Rule />
        <div className="flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
          <div className="font-display text-xl text-primary">Разбор франшиз</div>
          <p className="font-mono-editorial text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/75">
            Независимый анализ · Без рекламы франчайзеров
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;