import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  ArrowLeft,
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
      'Recupero e rifunzionalizzazione dell’esistente e nuove costruzioni',
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
    slug: 'territorio',
    number: '03',
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
  {
    slug: 'indagini',
    number: '04',
    title: 'Indagini e Geologia',
    detail: 'Rilievi, diagnostica e geologia',
    description: 'Partiamo dalla conoscenza concreta dell’edificio e del terreno: rilievi, ispezioni, prove mirate e indagini geologiche per trasformare i dati in decisioni affidabili.',
    activities: [
      'Rilievi geometrici, materici e delle condizioni di conservazione',
      'Ispezioni visive ed estrazione di campioni',
      'Indagini endoscopiche, pacometriche, sclerometriche e Windsor',
      'Carotaggi, prove con martinetto piatto, pull-out, prove di carico e di tiro',
      'Indagini geologiche e geotecniche a supporto della progettazione',
    ],
    image: asset('images/edificio-restauro.jpg'),
    Icon: ScanSearch,
  },
  {
    slug: 'cantiere',
    number: '05',
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
    title: 'Nuovo Ospedale Tiburtino',
    category: 'Architettura',
    meta: 'Struttura sanitaria · Tivoli (RM)',
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
    title: "Nuovo Ospedale Tiburtino · vista d'insieme",
    category: 'Architettura',
    meta: 'Composizione e volumi · Tivoli (RM)',
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
    meta: 'Inserimento nel contesto · Tivoli (RM)',
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
  images?: string[];
  client: string;
  title: string;
  date: string;
  description: string;
};

const workDescription =
  "Descrizione approfondita del lavoro: un breve testo che racconta l'intervento, le fasi seguite dallo studio (dal rilievo alla direzione lavori) e i risultati ottenuti. Testo di esempio da sostituire con la descrizione reale.";

const works: Record<string, Work[]> = {
  architettura: [
    { image: asset('progetti/mattatoio-3.jpg'), images: [asset('progetti/mattatoio-3.jpg'), asset('progetti/mattatoio-1.jpg'), asset('progetti/mattatoio-5.jpg'), asset('progetti/mattatoio-4.jpg'), asset('progetti/mattatoio-2.jpg')], client: '', title: 'Ex Mattatoio di Subiaco', date: '', description: "Recupero dell'ex mattatoio comunale di Subiaco, trasformato in un nuovo spazio pubblico polifunzionale al servizio del territorio e del Parco dei Monti Simbruini: consolidamento dell'involucro, nuova copertura in legno, sala polifunzionale e spazi espositivi." },
    { image: asset('progetti/filettino.jpg'), client: '', title: 'Scuola di Filettino', date: '', description: "Progetto per l'edificio scolastico di Filettino, con partizioni interne mobili per adattare gli ambienti alle diverse attività didattiche. In immagine il rendering di progetto." },
  ],
  strutture: [
    { image: asset('progetti/vibo/vibo-01.jpg'), images: [asset('progetti/vibo/vibo-01.jpg'), asset('progetti/vibo/vibo-02.jpg'), asset('progetti/vibo/vibo-03.jpg'), asset('progetti/vibo/vibo-04.jpg'), asset('progetti/vibo/vibo-05.jpg'), asset('progetti/vibo/vibo-06.jpg'), asset('progetti/vibo/vibo-07.jpg'), asset('progetti/vibo/vibo-08.jpg'), asset('progetti/vibo/vibo-09.jpg'), asset('progetti/vibo/vibo-10.jpg'), asset('progetti/vibo/vibo-11.jpg')], client: '', title: 'Adeguamento sismico dell’ITG di Vibo Valentia', date: '', description: "Adeguamento sismico e riqualificazione dell'Istituto Tecnico per Geometri di Vibo Valentia. Sulla base di analisi pushover secondo le NTC 2018, rinforzo delle strutture in cemento armato dei tre corpi di fabbrica — ringrossi armati di pilastri, travi e fondazioni e adeguamento dei giunti sismici — insieme all'efficientamento energetico dell'edificio: cappotto termico, nuovi infissi a taglio termico, illuminazione a LED e impianto fotovoltaico. In galleria render di progetto, prospetti, sezioni, piante e particolari costruttivi." },
    { image: asset('progetti/copertura-1.jpg'), images: [asset('progetti/copertura-1.jpg'), asset('progetti/copertura-2.jpg')], client: '', title: 'Copertura dell’ex Mattatoio', date: '', description: "Struttura di copertura in legno lamellare con tiranti metallici e lucernari, progettata per il recupero dell'ex mattatoio di Subiaco: una soluzione leggera e reversibile, integrata con la muratura esistente." },
    { image: asset('progetti/ponte-comino.jpg'), images: [asset('progetti/ponte-comino.jpg'), asset('progetti/passerella-comino.jpg')], client: '', title: 'Passerella pedonale in Valle di Comino', date: '', description: "Attraversamento pedonale in Valle di Comino, con struttura metallica leggera sul corso d'acqua. (Descrizione da confermare.)" },
  ],
  cantiere: [
    { image: notOverview, client: 'Committente · Luogo', title: 'Direzione lavori', date: 'Anno · stato', description: workDescription },
  ],
  indagini: [
    { image: asset('indagini/01_sclerometrica.jpg'), client: 'Prova non distruttiva', title: "Prova sclerometrica", date: '', description: "Lo sclerometro misura l'indice di rimbalzo su più battute della superficie in calcestruzzo, per valutarne l'omogeneità e ottenere una stima indiretta della resistenza a compressione, da correlare con le prove dirette." },
    { image: asset('indagini/02_pacometrica.jpg'), client: 'Indagine non distruttiva', title: "Indagine pacometrica", date: '', description: "Rilievo elettromagnetico non distruttivo di posizione, direzione e copriferro delle armature nel calcestruzzo: verifica la corrispondenza con il progetto e guida carotaggi e prelievi." },
    { image: asset('indagini/03_termografia.jpg'), client: 'Indagine non distruttiva', title: "Indagine termografica", date: '', description: "La termocamera a infrarossi mappa, senza demolizioni, la tessitura muraria nascosta, discontinuità e distacchi, l'orditura dei solai e le zone interessate da umidità o degrado." },
    { image: asset('indagini/04_endoscopia.jpg'), client: 'Indagine debolmente invasiva', title: "Indagine endoscopica", date: '', description: "Un videoscopio introdotto in un piccolo foro permette di osservare l'interno di murature, solai e intercapedini: stratigrafia, vuoti, distacchi e stato reale dei materiali." },
    { image: asset('indagini/05_carotaggio.jpg'), client: 'Prelievo diretto', title: "Carotaggio", date: '', description: "Prelievo di carote cilindriche di calcestruzzo da sottoporre a compressione in laboratorio: la misura diretta della resistenza in opera dell'elemento strutturale esistente." },
    { image: asset('indagini/06_pullout.jpg'), client: 'Prova semi-distruttiva', title: "Prova pull-out", date: '', description: "Si estrae un inserto ancorato nel calcestruzzo e dalla forza massima di estrazione si stima la resistenza a compressione del materiale direttamente in situ, con danno locale contenuto." },
    { image: asset('indagini/07_barre.jpg'), client: 'Prelievo diretto', title: "Estrazione barre d'armatura", date: '', description: "Prelievo di spezzoni d'armatura per caratterizzare l'acciaio in opera — diametro, snervamento, rottura, allungamento — con successivo ripristino del copriferro." },
    { image: asset('indagini/08_saggi.jpg'), client: 'Saggio diretto', title: "Saggi diretti", date: '', description: "Aperture localizzate su murature, solai e fondazioni per rilevare tessitura, stratigrafia, orditura e tipologia fondale, verificando la reale configurazione della struttura." },
    { image: asset('indagini/09_martinetti.jpg'), client: 'Prova semi-distruttiva', title: "Martinetti piatti doppi", date: '', description: "Due martinetti idraulici inseriti tra i giunti di malta misurano in situ la deformabilità della muratura e il modulo elastico e, ove possibile, la resistenza a compressione." },
    { image: asset('indagini/10_gommone.jpg'), client: 'Prova di carico', title: "Prova di carico con gommone", date: '', description: "Serbatoi flessibili riempiti d'acqua applicano un carico distribuito e finemente controllato sul solaio, misurandone frecce, rigidezza e recupero elastico in carico e scarico." },
    { image: asset('indagini/11_puntelli.jpg'), client: 'Prova di carico', title: "Prova di carico con puntelli", date: '', description: "Il carico è applicato con puntelli e le frecce rilevate in tempo reale da trasduttori wireless, per verificare la risposta del solaio e il recupero elastico dopo lo scarico." },
  ],
  territorio: [
    { image: asset('progetti/canterno-1.jpg'), images: [asset('progetti/canterno-1.jpg'), asset('progetti/canterno-2.jpg'), asset('progetti/canterno-3.jpg'), asset('progetti/canterno-4.jpg'), asset('progetti/canterno-5.jpg'), asset('progetti/canterno-6.jpg'), asset('progetti/canterno-7.jpg')], client: '', title: 'Pista ciclopedonale del Lago di Canterno', date: '', description: "Percorso ciclopedonale lungo le rive del lago di Canterno: tracciato, staccionate in legno e opere di sistemazione pensati per una fruizione accessibile del paesaggio, con il minimo impatto sull'ambiente naturale." },
  ],
};

function ServiceDetail({ service }: { service: ServicePanel }) {
  const { Icon } = service;
  const [openWork, setOpenWork] = useState<Work | null>(null);
  const [lbIndex, setLbIndex] = useState(0);

  return (
    <section className="service-detail">
      <div className="service-detail__top">
        <a className="service-detail__back" href="#servizi">
          <ArrowRight size={16} /> Torna ai servizi
        </a>
        <span className="service-detail__index">Servizio {service.number} / 05</span>
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
                onClick={() => { setOpenWork(work); setLbIndex(0); }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenWork(work); setLbIndex(0); } }}
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
              <img src={(openWork.images && openWork.images[lbIndex]) || openWork.image} alt={openWork.title} />
            </div>
            <div className="work-lightbox__body">
              <span className="work-card__client">{openWork.client}</span>
              <h3>{openWork.title}</h3>
              <span className="work-card__date">{openWork.date}</span>
              <p>{openWork.description}</p>
              {openWork.images && openWork.images.length > 1 && (
                <div className="work-lightbox__thumbs">
                  {openWork.images.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      className={`work-lightbox__thumb ${i === lbIndex ? 'is-active' : ''}`}
                      onClick={() => setLbIndex(i)}
                      aria-label={`Foto ${i + 1}`}
                    >
                      <img src={img} alt="" />
                    </button>
                  ))}
                </div>
              )}
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
  const posRef = useRef(0);
  const resumeTimer = useRef<number | undefined>(undefined);
  useEffect(() => {
    const el = trackRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    posRef.current = el.scrollLeft;
    const io = new IntersectionObserver((entries) => { visibleRef.current = entries[0].isIntersecting; }, { threshold: 0.02 });
    io.observe(wrap);
    let raf = 0;
    const tick = () => {
      if (el && !pausedRef.current && visibleRef.current && !reduce) {
        const half = el.scrollWidth / 2;
        posRef.current += 0.5;
        if (half > 0 && posRef.current >= half) posRef.current -= half;
        el.scrollLeft = posRef.current;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); if (resumeTimer.current) window.clearTimeout(resumeTimer.current); };
  }, []);
  const syncPos = () => { const el = trackRef.current; if (el) posRef.current = el.scrollLeft; };
  const nudge = (dir: number) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * 380, behavior: 'smooth' });
  };
  const pauseFor = (ms: number) => {
    pausedRef.current = true;
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => { syncPos(); pausedRef.current = false; }, ms);
  };
  const loop = [...items, ...items];
  return (
    <div
      className="portfolio-carousel"
      ref={wrapRef}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { syncPos(); pausedRef.current = false; }}
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

function CountUp({ value, suffix = '', duration = 1500 }: { value: number; suffix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(value); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * value));
          if (t < 1) requestAnimationFrame(step);
          else setDisplay(value);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);
  return <strong ref={ref}>{display}{suffix}</strong>;
}

function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let accepted = false;
    try { accepted = localStorage.getItem('sim-cookie-consent') === '1'; } catch { accepted = false; }
    if (!accepted) setShow(true);
  }, []);
  const accept = () => {
    try { localStorage.setItem('sim-cookie-consent', '1'); } catch { /* no-op */ }
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="cookie-banner" role="dialog" aria-label="Informativa cookie">
      <p className="cookie-banner__text">
        Questo sito utilizza solo cookie tecnici necessari al suo funzionamento e carica i caratteri da Google Fonts.
        Non usiamo cookie di profilazione. Maggiori dettagli nella <a href="#cookie">Cookie Policy</a>.
      </p>
      <button type="button" className="button button--primary cookie-banner__ok" onClick={accept}>Ho capito</button>
    </div>
  );
}

function LegalPage({ page }: { page: 'privacy' | 'cookie' }) {
  const updated = 'Settembre 2026';
  return (
    <article className="legal section-pad">
      <a className="legal__back" href="#top"><ArrowLeft size={16} /> Torna al sito</a>
      {page === 'privacy' ? (
        <div className="legal__body">
          <span className="legal__eyebrow">Note legali</span>
          <h1>Informativa sulla privacy</h1>
          <p className="legal__lead">Informativa resa ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR) a chi consulta questo sito e utilizza i moduli di contatto.</p>

          <h2>1. Titolare del trattamento</h2>
          <p>Studio Ingegneria Maggi S.r.l., con sede in Via Casavetere 25 bis/a, 03014 Fiuggi (FR). P.IVA IT02334940604 · PEC studioingegneriamaggi@pec.it · Email <a href="mailto:info@studioingegneriamaggi.it">info@studioingegneriamaggi.it</a> · Tel. +39 0775 504019.</p>

          <h2>2. Dati personali trattati</h2>
          <p><strong>Dati di navigazione.</strong> I sistemi informatici e le procedure preposte al funzionamento del sito acquisiscono, nel corso del normale esercizio, alcuni dati tecnici la cui trasmissione è implicita nell&rsquo;uso dei protocolli di comunicazione di Internet (ad esempio indirizzo IP, tipo di browser e dispositivo, data e ora della richiesta, pagine visitate). Questi dati sono utilizzati al solo fine di garantire il funzionamento e la sicurezza del sito.</p>
          <p><strong>Dati forniti volontariamente.</strong> Quando compili il modulo &laquo;Contatti&raquo; o ci scrivi via email, trattiamo i dati che ci comunichi: nome, indirizzo email e il contenuto del messaggio.</p>

          <h2>3. Finalità e basi giuridiche</h2>
          <p>Rispondere alle richieste inviate tramite il modulo o via email e gestire i relativi contatti (art. 6, par. 1, lett. b — riscontro a una richiesta dell&rsquo;interessato; e lett. f — legittimo interesse a gestire le comunicazioni). Garantire il funzionamento, la manutenzione e la sicurezza del sito (art. 6, par. 1, lett. f). Adempiere a eventuali obblighi di legge (art. 6, par. 1, lett. c), ove applicabili.</p>

          <h2>4. Natura del conferimento</h2>
          <p>Il conferimento dei dati tramite il modulo di contatto è facoltativo; il mancato conferimento comporta l&rsquo;impossibilità di dare seguito alla richiesta.</p>

          <h2>5. Modalità del trattamento</h2>
          <p>Il trattamento avviene con strumenti elettronici, adottando misure tecniche e organizzative adeguate a proteggere i dati da accessi non autorizzati, perdita o divulgazione.</p>

          <h2>6. Destinatari dei dati</h2>
          <p>I dati possono essere trattati da soggetti che forniscono servizi tecnici per conto del Titolare (ad esempio il fornitore di hosting ed eventuali servizi di invio email), nominati responsabili del trattamento ove previsto dall&rsquo;art. 28 GDPR. I dati non sono diffusi né ceduti a terzi per loro finalità.</p>

          <h2>7. Trasferimenti verso Paesi terzi</h2>
          <p>Il sito è ospitato su GitHub Pages (GitHub, Inc., USA) e utilizza i caratteri tipografici Google Fonts (Google LLC, USA). Gli eventuali trasferimenti di dati verso gli Stati Uniti avvengono sulla base di garanzie adeguate ai sensi degli artt. 44 e ss. GDPR (Clausole Contrattuali Standard e/o adesione al Data Privacy Framework).</p>

          <h2>8. Periodo di conservazione</h2>
          <p>I dati inviati tramite il modulo sono conservati per il tempo necessario a gestire la richiesta e ad assolvere eventuali obblighi di legge; i dati tecnici di navigazione per il tempo strettamente necessario alle finalità indicate.</p>

          <h2>9. Diritti dell&rsquo;interessato</h2>
          <p>Puoi esercitare in ogni momento i diritti previsti dagli artt. 15-22 GDPR: accesso, rettifica, cancellazione, limitazione, opposizione al trattamento e portabilità dei dati, oltre alla revoca del consenso ove il trattamento vi si basi. Per esercitarli scrivi a <a href="mailto:info@studioingegneriamaggi.it">info@studioingegneriamaggi.it</a>. Hai inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>).</p>

          <h2>10. Modifiche</h2>
          <p>Il Titolare si riserva di aggiornare la presente informativa; le modifiche saranno pubblicate su questa pagina.</p>
          <p className="legal__updated">Ultimo aggiornamento: {updated}</p>
        </div>
      ) : (
        <div className="legal__body">
          <span className="legal__eyebrow">Note legali</span>
          <h1>Cookie Policy</h1>
          <p className="legal__lead">Informativa sull&rsquo;uso dei cookie e delle tecnologie analoghe su questo sito.</p>

          <h2>1. Cosa sono i cookie</h2>
          <p>I cookie sono piccoli file di testo che i siti visitati inviano al dispositivo dell&rsquo;utente, dove vengono memorizzati per essere ritrasmessi agli stessi siti alla visita successiva. Esistono cookie tecnici (necessari al funzionamento) e cookie di profilazione (usati per tracciare l&rsquo;utente a fini pubblicitari).</p>

          <h2>2. Cookie utilizzati da questo sito</h2>
          <p>Questo sito <strong>non utilizza cookie di profilazione</strong> né strumenti di tracciamento pubblicitario o statistico.</p>
          <p><strong>Archiviazione tecnica.</strong> Il sito memorizza localmente nel browser (localStorage) unicamente la tua scelta relativa al banner cookie, per non riproporlo a ogni visita. È un dato tecnico, non richiede consenso e non consente di identificarti.</p>
          <p><strong>Risorse di terze parti.</strong> I caratteri tipografici sono caricati da Google Fonts (Google LLC), che riceve l&rsquo;indirizzo IP necessario a servire i font; tale servizio non installa cookie di profilazione. L&rsquo;hosting su GitHub Pages registra log tecnici necessari all&rsquo;erogazione del servizio.</p>

          <h2>3. Come gestire i cookie</h2>
          <p>Puoi gestire o eliminare i cookie e i dati dei siti dalle impostazioni del tuo browser. Le istruzioni sono disponibili nelle guide di <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a>, <a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" target="_blank" rel="noopener noreferrer">Firefox</a>, <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a> ed <a href="https://support.microsoft.com/it-it/microsoft-edge" target="_blank" rel="noopener noreferrer">Edge</a>.</p>

          <h2>4. Aggiornamenti</h2>
          <p>Qualora in futuro il sito introduca strumenti statistici o di terze parti che utilizzano cookie (ad esempio statistiche di traffico o mappe incorporate), questa policy sarà aggiornata e verrà richiesto il consenso preventivo dove necessario.</p>
          <p className="legal__updated">Ultimo aggiornamento: {updated}</p>
          <p>Per informazioni sul trattamento dei dati personali consulta la <a href="#privacy">Informativa sulla privacy</a>.</p>
        </div>
      )}
    </article>
  );
}

function CertificationsPage() {
  return (
    <article className="certifications cert-page section-pad">
      <a className="legal__back" href="#top"><ArrowLeft size={16} /> Torna al sito</a>
      <div className="certifications__heading">
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
    </article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeServiceSlug, setActiveServiceSlug] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>('Tutti');
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [legalPage, setLegalPage] = useState<'privacy' | 'cookie' | null>(null);
  const [showCerts, setShowCerts] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const el = progressRef.current;
      if (el) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        el.style.transform = `scaleX(${h > 0 ? Math.min(1, window.scrollY / h) : 0})`;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  useEffect(() => {
    if (activeServiceSlug || legalPage || showCerts) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll('.section-pad, .impact'));
    els.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => io.observe(el));

    const steps = document.querySelector('.metodo__steps');
    let io2: IntersectionObserver | undefined;
    if (steps) {
      steps.classList.add('anim-steps');
      io2 = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { steps.classList.add('is-in'); io2?.disconnect(); }
      }, { threshold: 0.2 });
      io2.observe(steps);
    }
    return () => { io.disconnect(); io2?.disconnect(); };
  }, [activeServiceSlug, legalPage, showCerts]);

  useEffect(() => {
    const syncFromHash = () => {
      const h = window.location.hash;
      const prefix = '#servizio-';
      setActiveServiceSlug(h.startsWith(prefix) ? h.slice(prefix.length) : null);
      const lp = h === '#privacy' ? 'privacy' : h === '#cookie' ? 'cookie' : null;
      setLegalPage(lp as 'privacy' | 'cookie' | null);
      const certs = h === '#certificazioni';
      setShowCerts(certs);
      if (h.startsWith(prefix) || lp || certs) window.scrollTo(0, 0);
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
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
        <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
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
        {legalPage ? (
          <LegalPage page={legalPage} />
        ) : showCerts ? (
          <CertificationsPage />
        ) : activeServiceSlug ? (
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
                <div className="impact__item"><CountUp value={2004} /><span>Anno di fondazione</span></div>
                <div className="impact__item"><CountUp value={20} suffix="+" /><span>Anni di esperienza</span></div>
                <div className="impact__item"><CountUp value={3} /><span>Sedi operative</span></div>
                <div className="impact__item"><CountUp value={6} /><span>Ambiti di intervento</span></div>
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

            <section id="lavora" className="careers section-pad">
              <div className="careers__heading">
                <div className="section-tag"><span>05</span><span className="section-rule" /> Lavora con noi</div>
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
            <div className="section-tag"><span>06</span><span className="section-rule" /> Contatti</div>
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
        <div className="site-footer__top">
          <Logo light />
          <p className="site-footer__sedi">Fiuggi · Nola · Rieti</p>
          <a className="site-footer__totop" href="#top">Torna su <ArrowRight size={15} /></a>
        </div>
        <div className="site-footer__legal">
          <p>Studio Ingegneria Maggi S.r.l. — Via Casavetere 25 bis/a, 03014 Fiuggi (FR) · P.IVA IT02334940604 · PEC studioingegneriamaggi@pec.it</p>
          <nav className="site-footer__links" aria-label="Note legali">
            <a href="#privacy">Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="#cookie">Cookie Policy</a>
          </nav>
        </div>
      </footer>
      <CookieBanner />
    </div>
  );
}

export default App;