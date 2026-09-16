import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Award,
  Boxes,
  Building2,
  Check,
  HardHat,
  HeartHandshake,
  Leaf,
  Map,
  Menu,
  Ruler,
  Scale,
  ScanSearch,
  ShieldCheck,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import architectureMark from '@assets/SIM_emblema.png';
import brandEmblem from '@assets/SIM_emblema.png';
import { ITALY_VIEWBOX, ITALY_PATH, ITALY_SEDI } from './lib/italy';
import notFacade from '@assets/NOT.1_1788173173214.jpg';
import notAerial from '@assets/NOT.2_1788173173218.jpg';
import notOverview from '@assets/NOT_1788173173220.jpg';
import viboPlan from '@assets/VIBO.1_1788173173223.png';
import viboBuilding from '@assets/VIBO_1788173173224.png';
import roofStructure from '@assets/IMG-20140307-WA0006_1788180849882.jpg';

// Prefissa gli asset statici (cartella public/) con il base path del sito,
// cosi' funzionano anche quando il sito e' pubblicato in una sottocartella
// (es. GitHub Pages: https://utente.github.io/<repo>/).
const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, '')}`;

const navItems = [
  { label: 'Servizi', href: '#servizi' },
  { label: 'Studio', href: '#studio' },
  { label: 'Portfolio', href: '#progetti' },
  { label: 'Certificazioni', href: '#certificazioni' },
  { label: 'Lavora con noi', href: '#lavora' },
  { label: 'Contatti', href: '#contatti' },
];

const careerBenefits = [
  {
    title: 'Progetti che lasciano il segno',
    text: 'Opere pubbliche e private di rilievo, dal singolo intervento alle grandi infrastrutture, accanto a enti e committenti importanti.',
  },
  {
    title: 'Crescita e formazione continua',
    text: 'Aggiornamento costante, percorsi certificati e affiancamento sul campo: qui si impara facendo, con professionisti esperti al proprio fianco.',
  },
  {
    title: 'Metodo e strumenti aggiornati',
    text: 'Progettazione BIM, sistemi di gestione certificati e procedure chiare: lavoriamo con ordine, qualità e attenzione ai dettagli.',
  },
  {
    title: 'Una squadra, tre sedi',
    text: 'Un ambiente collaborativo e concreto tra Fiuggi, Nola e Rieti, dove ogni persona conta e ogni contributo trova spazio.',
  },
];

const careerRoles = [
  'Ingegneri strutturisti',
  'Ingegneri civili e delle infrastrutture',
  'Architetti',
  'Geologi',
  'Tecnici e disegnatori BIM',
  'Geometri e tecnici di cantiere',
  'Amministrazione e segreteria',
];

const clientLogos = [
  { src: 'loghi-clienti/autostrade.png', name: "Autostrade per l'Italia" },
  { src: 'loghi-clienti/anas.png', name: 'ANAS' },
  { src: 'loghi-clienti/roma-capitale.png', name: 'Roma Capitale' },
  { src: 'loghi-clienti/regione-lazio.png', name: 'Regione Lazio' },
  { src: 'loghi-clienti/cm-roma.png', name: 'Città metropolitana di Roma Capitale' },
  { src: 'loghi-clienti/cm-bari.png', name: 'Città metropolitana di Bari' },
  { src: 'loghi-clienti/provincia-frosinone.png', name: 'Provincia di Frosinone' },
  { src: 'loghi-clienti/provincia-latina.png', name: 'Provincia di Latina' },
  { src: 'loghi-clienti/invitalia.png', name: 'Invitalia' },
  { src: 'loghi-clienti/enav.png', name: 'ENAV' },
  { src: 'loghi-clienti/risorse-per-roma.png', name: 'Risorse per Roma' },
  { src: 'loghi-clienti/sport-e-salute.png', name: 'Sport e Salute' },
  { src: 'loghi-clienti/acea.png', name: 'ACEA Infrastructure' },
  { src: 'loghi-clienti/ater-roma.png', name: 'ATER Roma' },
  { src: 'loghi-clienti/ministero-interno.png', name: "Ministero dell'Interno" },
];

const servicePanels = [
  {
    slug: 'architettura',
    number: '01',
    title: 'Architettura',
    detail: 'Progettazione integrata',
    description: 'Diamo forma a edifici e spazi attraverso un progetto coordinato, attento alla funzione, al contesto e alla qualità dell’esperienza.',
    activities: [
      'Studi di fattibilità e progettazione preliminare, definitiva ed esecutiva',
      'Progettazione architettonica, urbanistica e di interni',
      'Edilizia pubblica, privata, residenziale, commerciale e turistico-ricettiva',
      'Progettazione impiantistica e coordinamento delle discipline',
    ],
    image: notFacade,
    Icon: Building2,
  },
  {
    slug: 'strutture',
    number: '02',
    title: 'Strutture',
    detail: 'Verifiche e sismica',
    description: 'Studiamo il comportamento degli edifici e progettiamo interventi strutturali sicuri, proporzionati e compatibili con il costruito.',
    activities: [
      'Calcoli e progettazione delle opere strutturali',
      'Verifiche di vulnerabilità e valutazioni della sicurezza',
      'Adeguamento e miglioramento sismico',
      'Interventi su edifici strategici, sensibili e opere esistenti',
    ],
    image: roofStructure,
    Icon: Ruler,
  },
  {
    slug: 'edilizia',
    number: '03',
    title: 'Edilizia',
    detail: 'Recupero e nuovi edifici',
    description: 'Accompagniamo la trasformazione del patrimonio edilizio, dal recupero dell’esistente alla costruzione di nuovi edifici.',
    activities: [
      'Ristrutturazione, restauro e riqualificazione del patrimonio esistente',
      'Recupero di edifici storici e rifunzionalizzazione di immobili',
      'Nuove costruzioni e ampliamenti',
      'Progetti per edifici pubblici, servizi e attività ricettive',
    ],
    image: viboBuilding,
    Icon: ShieldCheck,
  },
  {
    slug: 'cantiere',
    number: '04',
    title: 'Cantiere',
    detail: 'Direzione lavori e sicurezza',
    description: 'Seguiamo la fase realizzativa con presenza, coordinamento e controllo, traducendo il progetto in un’opera eseguita correttamente.',
    activities: [
      'Direzione lavori e assistenza tecnica al cantiere',
      'Coordinamento della sicurezza in fase di progettazione ed esecuzione',
      'Controllo delle lavorazioni, dei tempi e della qualità',
      'Supporto tecnico nella gestione dell’appalto e della chiusura dei lavori',
    ],
    image: asset('images/riuso-ferroviario.jpg'),
    Icon: HardHat,
  },
  {
    slug: 'indagini',
    number: '05',
    title: 'Indagini',
    detail: 'Rilievi e diagnostica',
    description: 'Partiamo dalla conoscenza concreta dell’edificio: rilievi, ispezioni e prove mirate per trasformare i dati in decisioni affidabili.',
    activities: [
      'Rilievi geometrici, materici e delle condizioni di conservazione',
      'Ispezioni visive ed estrazione di campioni',
      'Indagini endoscopiche, pacometriche, sclerometriche e Windsor',
      'Carotaggi, prove con martinetto piatto, pull-out, prove di carico e di tiro',
      'Rilievi per il rischio di sfondellamento e prove su elementi non strutturali',
    ],
    image: asset('images/edificio-restauro.jpg'),
    Icon: ScanSearch,
  },
  {
    slug: 'territorio',
    number: '06',
    title: 'Territorio',
    detail: 'Ambiente e infrastrutture',
    description: 'Mettiamo in relazione opere, ambiente e paesaggio per interventi che rispettano il territorio e costruiscono valore nel tempo.',
    activities: [
      'Progetti di ambiente, territorio e paesaggio',
      'Opere infrastrutturali e infrastrutture di trasporto',
      'Interventi di riqualificazione e valorizzazione dei luoghi',
      'Supporto tecnico per enti pubblici, imprese e soggetti privati',
    ],
    image: notOverview,
    Icon: Map,
  },
];
type ServicePanel = typeof servicePanels[number];

type Project = {
  title: string;
  category: string;
  meta: string;
  image: string;
  description: string;
};

const projectDescription =
  "Descrizione approfondita del progetto: un breve testo che racconta l'intervento, il ruolo dello studio (dal rilievo e progettazione fino alla direzione dei lavori) e i risultati ottenuti. Testo di esempio da sostituire con la descrizione reale del progetto.";

const portfolioCategories = ['Tutti', 'Architettura', 'Strutture', 'Edilizia', 'Cantiere', 'Territorio'];

const portfolio: Project[] = [
  {
    title: 'Ospedale NOT',
    category: 'Architettura',
    meta: 'Struttura sanitaria · Nola (NA)',
    image: notFacade,
    description: projectDescription,
  },
  {
    title: 'Polo formativo VIBO',
    category: 'Edilizia',
    meta: 'Spazi per la formazione · Vibo Valentia',
    image: viboBuilding,
    description: projectDescription,
  },
  {
    title: 'Grande copertura',
    category: 'Strutture',
    meta: 'Progettazione strutturale · Lazio',
    image: roofStructure,
    description: projectDescription,
  },
  {
    title: "Ospedale NOT · vista d'insieme",
    category: 'Architettura',
    meta: 'Composizione e volumi · Nola (NA)',
    image: notOverview,
    description: projectDescription,
  },
  {
    title: 'VIBO · dettaglio strutturale',
    category: 'Strutture',
    meta: 'Disegno e dettaglio · Vibo Valentia',
    image: viboPlan,
    description: projectDescription,
  },
  {
    title: 'Paesaggio e connessioni',
    category: 'Territorio',
    meta: 'Inserimento nel contesto · Nola (NA)',
    image: notAerial,
    description: projectDescription,
  },
  {
    title: 'Recupero edilizio',
    category: 'Edilizia',
    meta: 'Restauro e riuso · Centro storico',
    image: asset('images/edificio-restauro.jpg'),
    description: projectDescription,
  },
  {
    title: 'Riuso area ferroviaria',
    category: 'Cantiere',
    meta: 'Rifunzionalizzazione · Area ferroviaria',
    image: asset('images/riuso-ferroviario.jpg'),
    description: projectDescription,
  },
];

const certifications = [
  {
    code: 'ISO 9001:2015',
    title: 'Qualità',
    description:
      'Sistema di gestione della qualità: procedure controllate e miglioramento continuo a garanzia del risultato in ogni fase del lavoro.',
    body: 'CERT International',
    number: 'QMS-0912/B',
    valid: '23.02.2027',
    Icon: Award,
    pdf: 'certificati/iso-9001.pdf',
  },
  {
    code: 'ISO 14001:2015',
    title: 'Ambiente',
    description:
      'Sistema di gestione ambientale: attenzione agli impatti e uso responsabile delle risorse nelle attività dello studio.',
    body: 'CERT International',
    number: 'EMS-1255/A',
    valid: '14.12.2026',
    Icon: Leaf,
    pdf: 'certificati/iso-14001.pdf',
  },
  {
    code: 'UNI EN ISO 45001:2023',
    title: 'Salute e sicurezza',
    description:
      'Sistema di gestione della salute e sicurezza sul lavoro, per tutelare le persone in ufficio e in cantiere.',
    body: 'CERT International',
    number: 'OH&SMS-1253/B',
    valid: '06.12.2026',
    Icon: ShieldCheck,
    pdf: 'certificati/iso-45001.pdf',
  },
  {
    code: 'SA 8000:2014',
    title: 'Responsabilità sociale',
    description:
      'Standard di responsabilità sociale: rispetto dei diritti dei lavoratori e condizioni di lavoro eque ed etiche.',
    body: 'CERT International',
    number: 'SA-2363/A',
    valid: '26.02.2029',
    Icon: HeartHandshake,
    pdf: 'certificati/sa-8000.pdf',
  },
  {
    code: 'UNI/PdR 125:2022',
    title: 'Parità di genere',
    description:
      'Sistema di gestione per la parità di genere: pari opportunità, inclusione e valorizzazione delle persone.',
    body: 'Quality Italia',
    number: '053-PdR-2024',
    valid: '03.12.2027',
    Icon: Scale,
    pdf: 'certificati/uni-pdr-125.pdf',
  },
  {
    code: 'UNI/PdR 74:2019',
    title: 'Sistema di gestione BIM',
    description:
      'Qualificazione BIM per la progettazione architettonica, strutturale e impiantistica di opere civili con metodo digitale.',
    body: 'NQA Italia',
    number: 'C-2024-006',
    valid: '26.12.2027',
    Icon: Boxes,
    pdf: 'certificati/uni-pdr-74.pdf',
  },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? 'brand--light' : ''}`} href="#top" aria-label="Studio Ingegneria Maggi, torna all'inizio">
      <img className="brand__emblem" src={brandEmblem} alt="Studio Ingegneria Maggi" />
      <span>Studio Ingegneria<br />Maggi S.r.l.</span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  children,
  inverse = false,
}: {
  eyebrow: string;
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <div className={`section-heading ${inverse ? 'section-heading--inverse' : ''}`}>
      <span className="section-heading__line" />
      <span className="eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
    </div>
  );
}

type Work = {
  image: string;
  client: string;
  title: string;
  date: string;
  description: string;
};

const workDescription =
  "Descrizione approfondita del lavoro: un breve testo che racconta l'intervento, le fasi seguite dallo studio (dal rilievo alla direzione lavori) e i risultati ottenuti. Testo di esempio da sostituire con la descrizione reale.";

const works: Record<string, Work[]> = {
  architettura: [
    { image: notFacade, client: 'Committente · Luogo', title: 'Progetto NOT', date: 'Anno · stato', description: workDescription },
    { image: notOverview, client: 'Committente · Luogo', title: "Progetto NOT · vista d'insieme", date: 'Anno · stato', description: workDescription },
  ],
  strutture: [
    { image: roofStructure, client: 'Committente · Luogo', title: 'Intervento strutturale', date: 'Anno · stato', description: workDescription },
    { image: viboPlan, client: 'Committente · Luogo', title: 'Progetto VIBO · strutture', date: 'Anno · stato', description: workDescription },
  ],
  edilizia: [
    { image: viboBuilding, client: 'Committente · Luogo', title: 'Progetto VIBO', date: 'Anno · stato', description: workDescription },
    { image: notAerial, client: 'Committente · Luogo', title: 'Recupero edilizio', date: 'Anno · stato', description: workDescription },
  ],
  cantiere: [
    { image: notOverview, client: 'Committente · Luogo', title: 'Direzione lavori', date: 'Anno · stato', description: workDescription },
  ],
  indagini: [
    { image: roofStructure, client: 'Committente · Luogo', title: 'Indagini e diagnostica', date: 'Anno · stato', description: workDescription },
  ],
  territorio: [
    { image: notAerial, client: 'Committente · Luogo', title: 'Territorio e infrastrutture', date: 'Anno · stato', description: workDescription },
  ],
};

function ServiceDetail({ service }: { service: ServicePanel }) {
  const { Icon } = service;
  const [openWork, setOpenWork] = useState<Work | null>(null);

  return (
    <section className="service-detail">
      <div className="service-detail__top">
        <a className="service-detail__back" href="#servizi">
          <ArrowRight size={16} /> Torna ai servizi
        </a>
        <span className="service-detail__index">Servizio {service.number} / 06</span>
      </div>
      <div className="service-detail__hero">
        <div className="service-detail__copy">
          <div className="section-tag"><span>{service.number}</span><span className="section-rule" /> Servizi</div>
          <Icon className="service-detail__icon" size={54} strokeWidth={1.15} />
          <h1>{service.title}</h1>
          <p className="service-detail__lead">{service.description}</p>
          <a className="button button--primary" href="#contatti">Parliamo del progetto <ArrowRight size={17} /></a>
        </div>
        <div className="service-detail__image">
          <img src={service.image} alt={`Studio Ingegneria Maggi, ${service.title}`} />
          <span>{service.detail}</span>
        </div>
      </div>
      <div className="service-detail__body">
        <div>
          <span className="eyebrow">Cosa seguiamo</span>
          <h2>Prestazioni coordinate,<br /><em>un unico incarico.</em></h2>
        </div>
        <ul>
          {service.activities.map((activity) => (
            <li key={activity}><ArrowRight size={17} />{activity}</li>
          ))}
        </ul>
      </div>
      {works[service.slug] && works[service.slug].length > 0 && (
        <div className="service-detail__works">
          <div className="works-grid">
            {works[service.slug].map((work) => (
              <article
                className="work-card"
                key={work.title}
                role="button"
                tabIndex={0}
                onClick={() => setOpenWork(work)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenWork(work); } }}
              >
                <div className="work-card__image">
                  <img src={work.image} alt={work.title} />
                </div>
                <div className="work-card__caption">
                  <span className="work-card__client">{work.client}</span>
                  <h3>{work.title}</h3>
                  <span className="work-card__date">{work.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
      {openWork && (
        <div className="work-lightbox" onClick={() => setOpenWork(null)}>
          <div className="work-lightbox__panel" onClick={(e) => e.stopPropagation()}>
            <button className="work-lightbox__close" type="button" aria-label="Chiudi" onClick={() => setOpenWork(null)}>
              <X size={22} />
            </button>
            <div className="work-lightbox__image">
              <img src={openWork.image} alt={openWork.title} />
            </div>
            <div className="work-lightbox__body">
              <span className="work-card__client">{openWork.client}</span>
              <h3>{openWork.title}</h3>
              <span className="work-card__date">{openWork.date}</span>
              <p>{openWork.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const certSeals = [
  { top: 'ISO', main: '9001', year: '2015', pdf: 'certificati/iso-9001.pdf' },
  { top: 'ISO', main: '14001', year: '2015', pdf: 'certificati/iso-14001.pdf' },
  { top: 'ISO', main: '45001', year: '2023', pdf: 'certificati/iso-45001.pdf' },
  { top: 'SA', main: '8000', year: '2014', pdf: 'certificati/sa-8000.pdf' },
  { top: 'UNI/PdR', main: '125', year: '2022', pdf: 'certificati/uni-pdr-125.pdf' },
  { top: 'UNI/PdR', main: '74', year: '2019', pdf: 'certificati/uni-pdr-74.pdf' },
];

function CertBadge({ top, main, year }: { top: string; main: string; year: string }) {
  return (
    <svg
      className="cert-badge__seal"
      viewBox="0 0 120 120"
      role="img"
      aria-label={`Certificazione ${top} ${main}:${year}`}
    >
      <circle className="cert-badge__ring-outer" cx="60" cy="60" r="57" />
      <circle className="cert-badge__ring-inner" cx="60" cy="60" r="48" />
      <text className="cert-badge__top" x="60" y="46" textAnchor="middle">{top}</text>
      <text className="cert-badge__main" x="60" y="73" textAnchor="middle">{main}</text>
      <text className="cert-badge__year" x="60" y="89" textAnchor="middle">{year}</text>
      <path className="cert-badge__check" d="M53 101 l4.5 4.5 l10 -10" />
    </svg>
  );
}

function ItalyMap() {
  return (
    <svg className="locations__map" viewBox={ITALY_VIEWBOX} aria-hidden="true" focusable="false">
      <path className="italy-outline" d={ITALY_PATH} />
      {ITALY_SEDI.map((p) => (
        <g className="sede-marker" key={p.name}>
          <circle className="sede-halo" cx={p.cx} cy={p.cy} r="26" />
          <circle className="sede-dot" cx={p.cx} cy={p.cy} r="12" />
          <text className="sede-label" x={p.cx + 32} y={p.cy + 9}>{p.name}</text>
        </g>
      ))}
    </svg>
  );
}

function PortfolioCarousel({ items, onOpen }: { items: Project[]; onOpen: (p: Project) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const visibleRef = useRef(true);
  const resumeTimer = useRef<number | undefined>(undefined);
  useEffect(() => {
    const el = trackRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver((entries) => { visibleRef.current = entries[0].isIntersecting; }, { threshold: 0.02 });
    io.observe(wrap);
    let raf = 0;
    const tick = () => {
      if (el && !pausedRef.current && visibleRef.current && !reduce) {
        el.scrollLeft += 0.45;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); if (resumeTimer.current) window.clearTimeout(resumeTimer.current); };
  }, []);
  const nudge = (dir: number) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * 380, behavior: 'smooth' });
  };
  const pauseFor = (ms: number) => {
    pausedRef.current = true;
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => { pausedRef.current = false; }, ms);
  };
  const loop = [...items, ...items];
  return (
    <div
      className="portfolio-carousel"
      ref={wrapRef}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={() => { pausedRef.current = true; }}
      onTouchEnd={() => pauseFor(2600)}
    >
      <button type="button" className="portfolio-carousel__arrow portfolio-carousel__arrow--prev" aria-label="Progetto precedente" onClick={() => { nudge(-1); pauseFor(2600); }}>
        <ChevronLeft size={22} />
      </button>
      <div className="portfolio-carousel__track" ref={trackRef}>
        {loop.map((project, i) => (
          <article
            className="portfolio-slide"
            key={`${project.title}-${i}`}
            role="button"
            tabIndex={0}
            onClick={() => onOpen(project)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(project); } }}
          >
            <div className="portfolio-slide__image">
              <img src={project.image} alt={project.title} loading="lazy" />
            </div>
            <div className="portfolio-slide__caption">
              <span className="portfolio-card__cat">{project.category}</span>
              <h3>{project.title}</h3>
              <span className="portfolio-card__meta">{project.meta}</span>
            </div>
          </article>
        ))}
      </div>
      <button type="button" className="portfolio-carousel__arrow portfolio-carousel__arrow--next" aria-label="Progetto successivo" onClick={() => { nudge(1); pauseFor(2600); }}>
        <ChevronRight size={22} />
      </button>
    </div>
  );
}

const metodoSteps = [
  { n: '01', title: 'Gara e offerta', text: 'Analizziamo il bando e prepariamo l’offerta tecnica ed economica, con la documentazione richiesta dall’appalto pubblico.' },
  { n: '02', title: 'Rilievo e progettazione', text: 'Indagini, rilievi e progettazione preliminare, definitiva ed esecutiva, coordinando strutture, impianti e discipline specialistiche.' },
  { n: '03', title: 'Direzione lavori e sicurezza', text: 'Seguiamo il cantiere con direzione dei lavori, coordinamento della sicurezza e controllo di tempi, costi e qualità.' },
  { n: '04', title: 'Collaudo e consegna', text: 'Verifiche finali, collaudo e consegna dell’opera all’ente committente, con la documentazione completa.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeServiceSlug, setActiveServiceSlug] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>('Tutti');
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (activeServiceSlug) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll('.section-pad, .impact'));
    els.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [activeServiceSlug]);

  useEffect(() => {
    const syncServiceFromHash = () => {
      const prefix = '#servizio-';
      setActiveServiceSlug(window.location.hash.startsWith(prefix) ? window.location.hash.slice(prefix.length) : null);
    };

    syncServiceFromHash();
    window.addEventListener('hashchange', syncServiceFromHash);
    return () => window.removeEventListener('hashchange', syncServiceFromHash);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div id="top" className="site-shell">
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="site-header__inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Navigazione principale">
            {navItems.map((item, index) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="#contatti">
            Parliamo del progetto <ArrowRight size={16} />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Navigazione mobile">
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}<ArrowRight size={17} />
            </a>
          ))}
        </nav>
      )}

      <main>
        {activeServiceSlug ? (
          <ServiceDetail service={servicePanels.find((service) => service.slug === activeServiceSlug) ?? servicePanels[0]} />
        ) : (
          <>
            <section id="servizi" className="services-hero" aria-label="Servizi dello Studio Ingegneria Maggi">
              {servicePanels.map(({ slug, number, title, detail, image, Icon }) => (
                <a className="service-panel" href={`#servizio-${slug}`} key={number}>
                  <img src={image} alt="" />
                  <div className="service-panel__shade" />
                  <div className="service-panel__content">
                    <span className="service-panel__number">{number}</span>
                    <Icon className="service-panel__icon" size={52} strokeWidth={1.15} />
                    <h2>{title}</h2>
                    <p>{detail}</p>
                    <span className="service-panel__link">Scopri <ArrowRight size={15} /></span>
                  </div>
                </a>
              ))}
            </section>

            <section className="clients" aria-label="Principali clienti dello studio">
              <p className="clients__label">Hanno scelto lo Studio</p>
              <div className="clients__track">
                <div className="clients__row">
                  {clientLogos.map((c) => (
                    <span className="clients__item" key={c.name}>
                      <img src={asset(c.src)} alt={c.name} loading="lazy" />
                    </span>
                  ))}
                  {clientLogos.map((c) => (
                    <span className="clients__item" key={`${c.name}-dup`} aria-hidden="true">
                      <img src={asset(c.src)} alt="" loading="lazy" />
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section id="studio" className="studio section-pad">
          <div className="studio__label"><span>01</span><span className="section-rule" /> Lo studio</div>
          <div className="studio__content">
            <SectionHeading eyebrow="Una pratica indipendente">
              La tecnica è il nostro modo di prenderci <em>cura dei luoghi.</em>
            </SectionHeading>
            <div className="studio__grid">
              <p>
                Studio Ingegneria Maggi S.r.l. nasce a Fiuggi nel 2004 dalla volontà di mettere la competenza tecnica al servizio dei luoghi e delle persone. In oltre vent’anni siamo cresciuti progetto dopo progetto, affiancando enti pubblici, imprese e privati in ogni fase: dall’ascolto del territorio alle indagini, dalla progettazione alla direzione dei lavori. Per essere sempre più vicini a cantieri e committenti, alla sede storica di Fiuggi abbiamo affiancato le sedi operative di Nola e Rieti.
              </p>
              <p>
                Siamo ingegneri, architetti, geologi e tecnici: competenze diverse riunite da una sola responsabilità — trasformare la complessità in risposte chiare, misurabili e durature, capaci di reggere la prova del tempo e del contesto reale. Tre sedi, un’unica squadra, un metodo condiviso su tutto il territorio.
              </p>
            </div>
          </div>
          <img className="studio__mark" src={architectureMark} alt="" aria-hidden="true" />
            </section>

            <section className="impact" aria-label="Numeri dello studio">
              <div className="impact__inner">
                <div className="impact__item"><strong>2004</strong><span>Anno di fondazione</span></div>
                <div className="impact__item"><strong>20+</strong><span>Anni di esperienza</span></div>
                <div className="impact__item"><strong>3</strong><span>Sedi operative</span></div>
                <div className="impact__item"><strong>6</strong><span>Ambiti di intervento</span></div>
              </div>
            </section>

            <section id="metodo" className="metodo section-pad">
              <div className="metodo__heading">
                <div className="section-tag"><span>02</span><span className="section-rule" /> Come lavoriamo</div>
                <SectionHeading eyebrow="Dal bando all’opera">
                  Un metodo chiaro,<br /><em>dalla gara alla consegna.</em>
                </SectionHeading>
                <p className="metodo__intro">Lavoriamo principalmente per committenti pubblici — enti, comuni, province e amministrazioni — con alcune commesse private. Ogni incarico segue un percorso ordinato e verificabile in ogni fase.</p>
              </div>
              <div className="metodo__steps">
                {metodoSteps.map((step) => (
                  <article className="metodo-step" key={step.n}>
                    <span className="metodo-step__num">{step.n}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="locations section-pad">
              <ItalyMap />
              <div className="locations__heading">
                <div className="section-tag"><span>03</span><span className="section-rule" /> Dove lavoriamo</div>
                <SectionHeading eyebrow="Una presenza più vicina">
                  Tre punti di vista,<br /><em>un’unica squadra.</em>
                </SectionHeading>
              </div>
              <div className="locations__intro">
                <p>
                  Alla sede di Fiuggi si sono affiancate le sedi operative di Nola e Rieti, nate con l’intenzione di espandere le nostre attività e riuscire a seguire meglio i lavori nei diversi territori.
                </p>
                <a className="text-link" href="#contatti">Parliamo di un progetto <ArrowRight size={16} /></a>
              </div>
              <div className="locations__list">
                <article className="location-card location-card--home">
                  <span>01 / Sede principale</span>
                  <h3>Fiuggi</h3>
                  <p>Il punto di partenza dello studio, dove si incontrano esperienza, progettazione e coordinamento.</p>
                  <div className="location-card__info">
                    <p className="location-card__addr">Via Casavetere, 25 bis/a<br />03014 Fiuggi (FR)</p>
                    <a href="tel:+390775504019">+39 0775 504019</a>
                    <a href="mailto:info@studioingegneriamaggi.it">info@studioingegneriamaggi.it</a>
                  </div>
                </article>
                <article className="location-card">
                  <span>02 / Sede operativa</span>
                  <h3>Nola</h3>
                  <p>Una presenza pensata per ampliare il raggio d’azione e seguire con maggiore continuità i lavori nel territorio campano.</p>
                  <div className="location-card__info">
                    <p className="location-card__addr">Via San Massimo, 216<br />80035 Nola (NA)</p>
                  </div>
                </article>
                <article className="location-card">
                  <span>03 / Sede operativa</span>
                  <h3>Rieti</h3>
                  <p>Un presidio sul territorio per essere più vicini a committenti, cantieri e nuove opportunità nel reatino.</p>
                  <div className="location-card__info">
                    <p className="location-card__addr">Via Pennina, 11<br />02100 Rieti (RI)</p>
                  </div>
                </article>
              </div>
            </section>

            <section id="progetti" className="projects section-pad">
              <div className="projects__heading">
                <div className="projects__lead">
                  <div className="section-tag"><span>04</span><span className="section-rule" /> Portfolio</div>
                  <SectionHeading eyebrow="Selezione di opere">
                    Le opere<br /><em>realizzate.</em>
                  </SectionHeading>
                </div>
                <div className="projects__heading-copy">
                  <p>Una selezione di opere, studi e visioni che raccontano il lavoro dello studio attraverso architettura, strutture, edilizia, cantiere e territorio. Scorri le opere o filtra per ambito; apri un progetto per la scheda completa.</p>
                  <span className="projects__count">{portfolio.length} opere realizzate</span>
                </div>
              </div>

              <div className="portfolio__filters" role="tablist" aria-label="Filtra i progetti">
                {portfolioCategories.map((cat) => {
                  const count = cat === 'Tutti' ? portfolio.length : portfolio.filter((p) => p.category === cat).length;
                  if (count === 0) return null;
                  return (
                    <button
                      type="button"
                      key={cat}
                      className={`portfolio__filter ${activeCategory === cat ? 'is-active' : ''}`}
                      aria-pressed={activeCategory === cat}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}<span className="portfolio__filter-count">{count}</span>
                    </button>
                  );
                })}
              </div>

              {activeCategory === 'Tutti' || activeCategory === null ? (
                <PortfolioCarousel items={portfolio} onOpen={setOpenProject} />
              ) : (
              <div className="portfolio__grid">
                {portfolio
                  .filter((p) => p.category === activeCategory)
                  .map((project) => (
                    <article
                      className="portfolio-card"
                      key={project.title}
                      role="button"
                      tabIndex={0}
                      onClick={() => setOpenProject(project)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenProject(project); } }}
                    >
                      <div className="portfolio-card__image">
                        <img src={project.image} alt={project.title} loading="lazy" />
                      </div>
                      <div className="portfolio-card__overlay">
                        <span className="portfolio-card__cat">{project.category}</span>
                        <h3>{project.title}</h3>
                        <span className="portfolio-card__meta">{project.meta}</span>
                        <span className="portfolio-card__open">Apri il progetto <ArrowRight size={15} /></span>
                      </div>
                    </article>
                  ))}
              </div>
              )}

              {openProject && (
                <div className="work-lightbox" onClick={() => setOpenProject(null)}>
                  <div className="work-lightbox__panel" onClick={(e) => e.stopPropagation()}>
                    <button className="work-lightbox__close" type="button" aria-label="Chiudi" onClick={() => setOpenProject(null)}>
                      <X size={22} />
                    </button>
                    <div className="work-lightbox__image">
                      <img src={openProject.image} alt={openProject.title} />
                    </div>
                    <div className="work-lightbox__body">
                      <span className="work-card__client">{openProject.category}</span>
                      <h3>{openProject.title}</h3>
                      <span className="work-card__date">{openProject.meta}</span>
                      <p>{openProject.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section id="certificazioni" className="certifications section-pad">
              <div className="certifications__heading">
                <div className="section-tag"><span>05</span><span className="section-rule" /> Certificazioni</div>
                <SectionHeading eyebrow="Qualità verificata">
                  Standard riconosciuti,<br /><em>impegni concreti.</em>
                </SectionHeading>
                <div className="certifications__intro">
                  <p>Il nostro modo di lavorare è verificato da enti indipendenti. Sei certificazioni attestano qualità, ambiente, sicurezza, responsabilità sociale, parità di genere e metodo BIM: un impegno rinnovato nel tempo verso committenti pubblici e privati.</p>
                </div>
              </div>
              <div className="certifications__grid">
                {certifications.map(({ code, title, description, body, number, valid, pdf, Icon }) => (
                  <a
                    className="cert-card"
                    key={code}
                    href={asset(pdf)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="cert-card__top">
                      <Icon className="cert-card__icon" size={30} strokeWidth={1.4} />
                      <span className="cert-card__code">{code}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <div className="cert-card__ref">Certificato n° {number}</div>
                    <div className="cert-card__meta">
                      <span><small>Ente</small>{body}</span>
                      <span><small>Valida fino al</small>{valid}</span>
                    </div>
                    <span className="cert-card__open">Apri il certificato <ArrowRight size={14} /></span>
                  </a>
                ))}
              </div>
              <p className="certifications__note">Certificazioni rilasciate da organismi accreditati (ACCREDIA · IAF · SNAS) e soggette a sorveglianza periodica.</p>
            </section>

            <section id="lavora" className="careers section-pad">
              <div className="careers__heading">
                <div className="section-tag"><span>06</span><span className="section-rule" /> Lavora con noi</div>
                <SectionHeading eyebrow="Unisciti allo studio">
                  Le persone fanno<br /><em>la differenza.</em>
                </SectionHeading>
              </div>
              <div className="careers__intro">
                <p>
                  Cresciamo scegliendo con cura le persone giuste. Cerchiamo professionisti curiosi e rigorosi che vogliano mettere la propria competenza al servizio di progetti reali, con la voglia di imparare e la responsabilità di fare bene. Se ti riconosci in questo, ci piacerebbe conoscerti.
                </p>
                <a className="text-link" href="#careers-cta">Invia la tua candidatura <ArrowRight size={16} /></a>
              </div>

              <div className="careers__benefits">
                {careerBenefits.map((b, i) => (
                  <article className="careers-benefit" key={b.title}>
                    <span className="careers-benefit__num">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </article>
                ))}
              </div>

              <div className="careers__apply">
                <div className="careers-roles">
                  <span className="careers-roles__label">Le figure che cerchiamo</span>
                  <ul className="careers-roles__list">
                    {careerRoles.map((r) => (
                      <li key={r}><ArrowRight size={15} />{r}</li>
                    ))}
                  </ul>
                </div>
                <div className="careers-cta" id="careers-cta">
                  <span className="eyebrow">Candidatura spontanea</span>
                  <h3>Mandaci il tuo curriculum.</h3>
                  <p>Non trovi la tua figura nell'elenco? Scrivici comunque: valutiamo con attenzione ogni candidatura spontanea. Allega il CV e due righe su di te.</p>
                  <a
                    className="button button--primary"
                    href="mailto:info@studioingegneriamaggi.it?subject=Candidatura%20%E2%80%94%20Lavora%20con%20noi"
                  >
                    Candidati ora <ArrowRight size={17} />
                  </a>
                  <p className="careers-cta__hint">Oppure scrivi a <a href="mailto:info@studioingegneriamaggi.it">info@studioingegneriamaggi.it</a></p>
                </div>
              </div>
            </section>

            <section id="contatti" className="contact section-pad">
          <div className="contact__intro">
            <div className="section-tag"><span>07</span><span className="section-rule" /> Contatti</div>
            <SectionHeading eyebrow="Iniziamo da qui">
              Hai un progetto?<br /><em>Parliamone.</em>
            </SectionHeading>
            <div className="contact__details">
              <a href="mailto:info@studioingegneriamaggi.it">info@studioingegneriamaggi.it</a>
              <a href="tel:+390775504019">+39 0775 504019</a>
              <p>Via Casavetere, 25 bis/a<br />03014 Fiuggi (FR), Italia</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            {sent ? (
              <div className="form-success">
                <Check size={28} />
                <span>Richiesta ricevuta</span>
                <h3>Grazie per averci scritto.</h3>
                <p>Il messaggio è pronto per essere preso in carico dallo studio.</p>
                <button type="button" onClick={() => setSent(false)}>Invia un altro messaggio</button>
              </div>
            ) : (
              <>
                <p className="form-label">Scrivici una nota</p>
                <label><span>Nome e cognome</span><input required name="name" placeholder="Come possiamo chiamarti?" /></label>
                <label><span>Email</span><input required type="email" name="email" placeholder="La tua email" /></label>
                <label><span>Il progetto</span><textarea required name="message" rows={4} placeholder="Raccontaci brevemente la tua esigenza..." /></label>
                <button className="button button--primary" type="submit">Invia la richiesta <ArrowRight size={17} /></button>
              </>
            )}
          </form>
            </section>
          </>
        )}
      </main>

      <section className="cert-strip" aria-label="Certificazioni dello studio">
        <div className="cert-strip__inner">
          <div className="cert-strip__badges">
            {certSeals.map(({ pdf, ...seal }) => (
              <a
                key={`${seal.top}-${seal.main}`}
                className="cert-seal-link"
                href={asset(pdf)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Apri il certificato ${seal.top} ${seal.main}`}
              >
                <CertBadge {...seal} />
              </a>
            ))}
          </div>
          <p className="cert-strip__note">
            Studio Ingegneria Maggi opera con sistemi di gestione certificati da enti
            accreditati per qualità (ISO 9001:2015), ambiente (ISO 14001:2015), salute e
            sicurezza sul lavoro (ISO 45001:2023), responsabilità sociale (SA 8000:2014),
            parità di genere (UNI/PdR 125:2022) e gestione BIM (UNI/PdR 74:2019).
          </p>
          <div className="cert-strip__issuers">
            <span className="cert-strip__issuers-label">Enti certificatori</span>
            <div className="cert-strip__logos">
              <img src={asset('loghi/cert-international.png')} alt="CERT International" />
              <img src={asset('loghi/quality-italia.png')} alt="Quality Italia" />
              <img src={asset('loghi/nqa.png')} alt="NQA Italia" />
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <Logo light />
        <p>Fiuggi · Nola · Rieti</p>
        <a href="#top">Torna su <ArrowRight size={15} /></a>
      </footer>
    </div>
  );
}

export default App;