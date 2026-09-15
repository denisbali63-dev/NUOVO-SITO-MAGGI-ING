import { useEffect, useState, type FormEvent } from 'react';
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
} from 'lucide-react';

import logoBlue from '@assets/Logo_SIM_blu_1788173215548.png';
import architectureMark from '@assets/SIM_LOGO_1788173215549.png';
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
  { label: 'Studio', href: '#studio' },
  { label: 'Servizi', href: '#servizi' },
  { label: 'Progetti', href: '#progetti' },
  { label: 'Certificazioni', href: '#certificazioni' },
  { label: 'Contatti', href: '#contatti' },
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

const projects = [
  {
    number: '01',
    title: 'Progetto NOT',
    subtitle: 'Nuova architettura sanitaria',
    image: notFacade,
    className: 'project-card--wide',
  },
  {
    number: '02',
    title: 'Progetto NOT',
    subtitle: 'Paesaggio e connessioni',
    image: notAerial,
    className: 'project-card--tall',
  },
  {
    number: '03',
    title: 'Progetto NOT',
    subtitle: 'Visione d’insieme',
    image: notOverview,
    className: 'project-card--wide',
  },
  {
    number: '04',
    title: 'Progetto VIBO',
    subtitle: 'Spazi per la formazione',
    image: viboBuilding,
    className: 'project-card--wide',
  },
  {
    number: '05',
    title: 'Progetto VIBO',
    subtitle: 'Disegno e dettaglio',
    image: viboPlan,
    className: 'project-card--plan',
  },
  {
    number: '06',
    title: 'Recupero edilizio',
    subtitle: 'Memoria, materia, nuova vita',
    image: asset('images/edificio-restauro.jpg'),
    className: 'project-card--wide',
  },
  {
    number: '07',
    title: 'Riuso ferroviario',
    subtitle: 'Spazi che cambiano funzione',
    image: asset('images/riuso-ferroviario.jpg'),
    className: 'project-card--wide',
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
      <img src={logoBlue} alt="SIM Fiuggi" />
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

function ServiceDetail({ service }: { service: ServicePanel }) {
  const { Icon } = service;

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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeServiceSlug, setActiveServiceSlug] = useState<string | null>(null);

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
      <header className="site-header">
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

            <section id="studio" className="studio section-pad">
          <div className="studio__label"><span>01</span><span className="section-rule" /> Lo studio</div>
          <div className="studio__content">
            <SectionHeading eyebrow="Una pratica indipendente">
              La tecnica è il nostro modo di prenderci <em>cura dei luoghi.</em>
            </SectionHeading>
            <div className="studio__grid">
              <p>
                Studio Ingegneria Maggi S.r.l. nasce a Fiuggi nel 2004. Da allora accompagniamo enti pubblici, imprese e privati in ogni fase di un progetto: dall’ascolto del luogo alle indagini, dalla visione alla direzione dei lavori.
              </p>
              <p>
                Siamo una squadra di ingegneri, architetti, geologi e tecnici. Competenze diverse, una sola responsabilità: costruire risposte chiare, misurabili e adatte a un contesto reale.
              </p>
            </div>
            <div className="studio__stats">
              <div><strong>2004</strong><span>Anno di fondazione</span></div>
              <div><strong>Fiuggi</strong><span>Base operativa</span></div>
              <div><strong>360°</strong><span>Visione del progetto</span></div>
              <div><strong>20+</strong><span>Anni di esperienza</span></div>
            </div>
          </div>
          <img className="studio__mark" src={architectureMark} alt="" aria-hidden="true" />
            </section>

            <section className="locations section-pad">
              <div className="locations__heading">
                <div className="section-tag"><span>02</span><span className="section-rule" /> Dove lavoriamo</div>
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
                </article>
                <article className="location-card">
                  <span>02 / Sede operativa</span>
                  <h3>Nola</h3>
                  <p>Una presenza pensata per ampliare il raggio d’azione e seguire con maggiore continuità i lavori.</p>
                </article>
                <article className="location-card">
                  <span>03 / Sede operativa</span>
                  <h3>Rieti</h3>
                  <p>Un presidio sul territorio per essere più vicini a committenti, cantieri e nuove opportunità.</p>
                </article>
              </div>
            </section>

            <section id="progetti" className="projects section-pad">
              <div className="projects__heading">
                <SectionHeading eyebrow="Selezione di lavori">
                  Progetti reali,<br /><em>contesti diversi.</em>
                </SectionHeading>
                <div className="projects__heading-copy">
                  <p>Una selezione di opere, studi e visioni che raccontano il lavoro dello studio attraverso architettura, strutture, recupero e territorio.</p>
                  <span className="projects__count">07 / lavori in evidenza</span>
                </div>
              </div>
              <article className="project-feature">
                <div className="project-feature__image">
                  <img src={notFacade} alt="Progetto NOT, vista della facciata" />
                  <span>01 / 07</span>
                </div>
                <div className="project-feature__copy">
                  <span className="eyebrow">Progetto in evidenza</span>
                  <h3>NOT</h3>
                  <p>Una grande architettura sanitaria in cui disegno, struttura e paesaggio costruiscono un nuovo punto di riferimento per il territorio.</p>
                  <a className="text-link" href="#contatti">Parliamo di un progetto <ArrowRight size={16} /></a>
                </div>
              </article>
              <div className="projects__grid">
                {projects.slice(1).map((project) => (
                  <article className={`project-card ${project.className}`} key={`${project.number}-${project.subtitle}`}>
                    <div className="project-card__image"><img src={project.image} alt={`${project.title}, ${project.subtitle}`} /></div>
                    <div className="project-card__meta">
                      <span>{project.number}</span>
                      <div><strong>{project.title}</strong><small>{project.subtitle}</small></div>
                      <ArrowRight size={17} />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="certificazioni" className="certifications section-pad">
              <div className="certifications__heading">
                <div className="section-tag"><span>06</span><span className="section-rule" /> Certificazioni</div>
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

            <section id="contatti" className="contact section-pad">
          <div className="contact__intro">
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