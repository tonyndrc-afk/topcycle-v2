import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calendar, Clock, User, Mail, Phone, MessageSquare,
  Check, MapPin, ChevronRight, ChevronLeft,
  Shield, Zap, Award, Bell, BellRing, Star,
  ArrowRight, Bike, Info, CheckCircle2
} from 'lucide-react';
import { Header } from '@/components/Header';
import { MenuOverlay } from '@/components/MenuOverlay';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Footer } from '@/sections/Footer';

/* ─────────────── DONNÉES ─────────────── */
const bikesList = [
  { slug: 'trek-slash-99',            name: 'Trek Slash 9.9',              category: 'VTT Enduro' },
  { slug: 'scott-scale-rc-world-cup', name: 'Scott Scale RC World Cup',    category: 'Cross-Country' },
  { slug: 'cannondale-supersix-evo',  name: 'Cannondale SuperSix EVO',     category: 'Vélo de Route' },
  { slug: 'santa-cruz-hightower',     name: 'Santa Cruz Hightower C S',    category: 'VTT Trail' },
  { slug: 'orbea-rise-m20',           name: 'Orbea Rise M20',              category: 'VTT Électrique' },
  { slug: 'bmc-teammachine-slr01',    name: 'BMC Teammachine SLR01',       category: 'Vélo de Route' },
  { slug: 'trek-procaliber-99',       name: 'Trek Procaliber 9.9',         category: 'Cross-Country' },
  { slug: 'autre',                    name: 'Je ne sais pas encore',       category: 'Conseil personnalisé' },
];

const levelOptions = [
  { value: 'debutant',     label: 'Débutant',     desc: 'Je débute le vélo' },
  { value: 'intermediaire', label: 'Intermédiaire', desc: 'Quelques années de pratique' },
  { value: 'confirme',     label: 'Confirmé',     desc: 'Pratique régulière' },
  { value: 'expert',       label: 'Expert',       desc: 'Compétition / rider passionné' },
];

const timeSlots = [
  '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
];

function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  while (dates.length < 21) {
    if (d.getDay() !== 0) dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

const DAYS_FR  = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTHS_FR = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

function formatDateLong(d: Date) {
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

/* ─────────────── TYPES ─────────────── */
interface FormData {
  bike: string;
  level: string;
  date: Date | null;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  reminderEmail: boolean;
  reminderSms: boolean;
}

/* ─────────────── ÉCRAN DE SUCCÈS ─────────────── */
function SuccessScreen({ form, bikeName }: { form: FormData; bikeName: string }) {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="max-w-lg w-full">
        {/* Icône */}
        <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-3">
          Demande envoyée !
        </h1>
        <p className="text-[#6B6B6B] mb-8 leading-relaxed">
          Votre demande de réservation a bien été transmise à notre équipe.
          Nous vous confirmons le rendez-vous par {form.reminderEmail && form.reminderSms ? 'email et SMS' : form.reminderEmail ? 'email' : 'SMS'} dans les meilleurs délais.
        </p>

        {/* Récap RDV */}
        <div className="bg-[#F5F5F5] rounded-2xl p-6 mb-8 text-left space-y-3">
          <h2 className="font-bold text-[#1A1A1A] mb-4 text-sm uppercase tracking-wider">Votre réservation</h2>
          <div className="flex items-center gap-3 text-sm">
            <Bike className="w-4 h-4 text-[#E30613] flex-shrink-0" />
            <span className="text-[#1A1A1A] font-medium">{bikeName}</span>
          </div>
          {form.date && (
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-[#E30613] flex-shrink-0" />
              <span className="text-[#1A1A1A] capitalize">{formatDateLong(form.date)}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-[#E30613] flex-shrink-0" />
            <span className="text-[#1A1A1A]">{form.time}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-[#E30613] flex-shrink-0" />
            <span className="text-[#1A1A1A]">32 Avenue de Nice, Antibes</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <User className="w-4 h-4 text-[#E30613] flex-shrink-0" />
            <span className="text-[#1A1A1A]">{form.firstName} {form.lastName}</span>
          </div>
        </div>

        {/* Rappel info */}
        {(form.reminderEmail || form.reminderSms) && (
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 text-left text-sm text-blue-700">
            <Bell className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              Un rappel vous sera envoyé {form.reminderEmail && <strong>par email</strong>}
              {form.reminderEmail && form.reminderSms && ' et '}
              {form.reminderSms && <strong>par SMS</strong>} 24h avant votre rendez-vous.
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/catalogue" className="btn-primary justify-center">
            Voir le catalogue
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/" className="btn-outline justify-center">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── STEPPER ─────────────── */
function Stepper({ current }: { current: number }) {
  const steps = [
    { n: 1, label: 'Le vélo' },
    { n: 2, label: 'Date & créneau' },
    { n: 3, label: 'Vos infos' },
  ];
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          {/* Step */}
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              current > s.n
                ? 'bg-green-500 text-white'
                : current === s.n
                  ? 'bg-[#E30613] text-white shadow-md shadow-[#E30613]/30'
                  : 'bg-[#F5F5F5] text-[#AAAAAA]'
            }`}>
              {current > s.n ? <Check className="w-4 h-4" /> : s.n}
            </div>
            <span className={`text-xs mt-1.5 font-medium hidden sm:block ${current === s.n ? 'text-[#E30613]' : current > s.n ? 'text-green-500' : 'text-[#AAAAAA]'}`}>
              {s.label}
            </span>
          </div>
          {/* Connector */}
          {i < steps.length - 1 && (
            <div className={`h-px w-16 sm:w-24 mx-2 transition-all ${current > s.n ? 'bg-green-400' : 'bg-[#E5E5E5]'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────── PAGE PRINCIPALE ─────────────── */
export default function ReservationEssai() {
  const [searchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [availableDates] = useState(getAvailableDates);
  const [dateOffset, setDateOffset] = useState(0);

  const [form, setForm] = useState<FormData>({
    bike: searchParams.get('velo') || '',
    level: '',
    date: null,
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    reminderEmail: true,
    reminderSms: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const selectedBike = bikesList.find(b => b.slug === form.bike);
  const bikeName = selectedBike?.name || form.bike || 'Vélo non sélectionné';

  const DATES_PER_PAGE = 7;
  const visibleDates = availableDates.slice(dateOffset, dateOffset + DATES_PER_PAGE);

  const update = <K extends keyof FormData>(key: K, val: FormData[K]) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  /* ── Validation par étape ── */
  const validateStep1 = () => {
    const e: typeof errors = {};
    if (!form.bike)  e.bike  = 'Veuillez sélectionner un vélo.';
    if (!form.level) e.level = 'Veuillez indiquer votre niveau.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: typeof errors = {};
    if (!form.date) e.date = 'Veuillez choisir une date.';
    if (!form.time) e.time = 'Veuillez choisir un créneau.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: typeof errors = {};
    if (!form.firstName.trim()) e.firstName = 'Requis';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) e.phone = 'Numéro invalide';
    if (form.reminderSms && !form.phone.trim()) e.phone = 'Requis pour le rappel SMS';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(s => s + 1);
  };

  const handleSubmit = () => {
    if (!validateStep3()) return;

    const dateStr = form.date ? formatDateLong(form.date) : '';
    const reminders = [form.reminderEmail && 'email', form.reminderSms && 'SMS'].filter(Boolean).join(' & ');

    const subject = `[Topcycle] Essai vélo — ${bikeName} — ${dateStr} à ${form.time}`;
    const body = [
      `Nouvelle demande d'essai reçue via le site Topcycle`,
      '',
      `─── Vélo ───────────────────────────`,
      `Modèle  : ${bikeName}`,
      `Niveau  : ${levelOptions.find(l => l.value === form.level)?.label || form.level}`,
      '',
      `─── Rendez-vous ────────────────────`,
      `Date    : ${dateStr}`,
      `Heure   : ${form.time}`,
      `Lieu    : 32 Avenue de Nice, 06600 Antibes`,
      '',
      `─── Contact ────────────────────────`,
      `Nom     : ${form.firstName} ${form.lastName}`,
      `Email   : ${form.email}`,
      `Tél     : ${form.phone}`,
      form.message ? `Message : ${form.message}` : '',
      '',
      `─── Rappel souhaité ────────────────`,
      `Mode    : ${reminders || 'Aucun'}`,
    ].filter(l => l !== undefined).join('\n');

    window.location.href = `mailto:contact@topcycle.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  if (submitted) return <SuccessScreen form={form} bikeName={bikeName} />;

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Header onMenuToggle={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Breadcrumb items={[{ label: 'Essai en magasin' }]} />

      {/* ── HERO ── */}
      <section className="bg-[#1A1A1A] pt-28 pb-16 px-4 text-center relative overflow-hidden">
        {/* Grid décoratif */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E30613]/15 text-[#E30613] text-sm font-semibold rounded-full mb-6 border border-[#E30613]/20">
            <Star className="w-3.5 h-3.5 fill-current" />
            Essai gratuit — Sans engagement
          </span>
          <h1 className="heading-hero text-white mb-5">
            Essayez avant<br />
            <span className="text-[#E30613]">d'acheter</span>
          </h1>
          <p className="text-[#AAAAAA] text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Réservez un créneau d'essai personnalisé dans notre magasin d'Antibes.
            Nos experts vous accompagnent pour trouver le vélo parfait.
          </p>
          <button
            onClick={() => document.getElementById('formulaire')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Réserver mon essai gratuit
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── AVANTAGES ── */}
      <section className="py-14 border-b border-[#E5E5E5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap,    title: 'Essai sur zone privée',  desc: 'Piste d\'essai exclusive à Antibes. Testez en conditions réelles.' },
              { icon: User,   title: 'Expert dédié',           desc: 'Un conseiller expert vous accompagne pendant tout l\'essai.' },
              { icon: Shield, title: 'Sans engagement',        desc: 'Aucune obligation d\'achat. Venez simplement découvrir.' },
              { icon: Award,  title: 'Réglages inclus',        desc: 'Position de selle, suspension, cintre — tout est ajusté pour vous.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 group">
                <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#E30613]/10 group-hover:bg-[#E30613] transition-colors">
                  <Icon className="w-5 h-5 text-[#E30613] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1A1A] text-sm mb-1">{title}</h3>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="py-14 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="heading-section text-[#1A1A1A]">Comment ça marche ?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '01', title: 'Choisissez votre vélo',      desc: 'Sélectionnez le modèle qui vous intéresse ou laissez-nous vous conseiller selon votre pratique.' },
              { n: '02', title: 'Réservez un créneau',        desc: 'Choisissez une date et un horaire qui vous convient. Disponible du lundi au samedi, 10h-19h.' },
              { n: '03', title: 'Venez à Antibes',            desc: 'Présentez-vous au magasin. Notre équipe vous accueille et gère tout pour votre essai.' },
            ].map((item, i) => (
              <div key={item.n} className="relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-5 left-[calc(100%-8px)] w-[calc(100%-40px)] h-px bg-[#E5E5E5] z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-full bg-[#E30613] text-white font-bold text-sm flex items-center justify-center mb-4">
                    {item.n}
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE MULTI-ÉTAPES ── */}
      <section id="formulaire" className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">

          {/* En-tête formulaire */}
          <div className="text-center mb-8">
            <h2 className="heading-section text-[#1A1A1A] mb-2">Réserver mon essai</h2>
            <p className="text-[#6B6B6B] text-sm">Gratuit · Sans engagement · Réponse sous 2h</p>
          </div>

          {/* Stepper */}
          <Stepper current={step} />

          {/* Card formulaire */}
          <div className="bg-white rounded-3xl border border-[#E5E5E5] shadow-sm overflow-hidden">

            {/* ── ÉTAPE 1 : VÉLO ── */}
            {step === 1 && (
              <div className="p-6 sm:p-8">
                <h3 className="font-bold text-[#1A1A1A] text-lg mb-1">Quel vélo souhaitez-vous essayer ?</h3>
                <p className="text-sm text-[#6B6B6B] mb-6">Vous pouvez aussi venir sans avoir choisi — nous vous guiderons.</p>

                {/* Select vélo */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Modèle</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {bikesList.map(bike => (
                      <button
                        key={bike.slug}
                        onClick={() => update('bike', bike.slug)}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${
                          form.bike === bike.slug
                            ? 'border-[#E30613] bg-[#E30613]/5'
                            : 'border-[#E5E5E5] hover:border-[#CCCCCC]'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all ${
                          form.bike === bike.slug ? 'border-[#E30613] bg-[#E30613]' : 'border-[#CCCCCC]'
                        }`}>
                          {form.bike === bike.slug && <Check className="w-2.5 h-2.5 text-white m-auto" style={{ display: 'block' }} />}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold leading-tight ${form.bike === bike.slug ? 'text-[#E30613]' : 'text-[#1A1A1A]'}`}>{bike.name}</p>
                          {bike.category && <p className="text-xs text-[#6B6B6B] mt-0.5">{bike.category}</p>}
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.bike && <p className="text-xs text-[#E30613] mt-2 flex items-center gap-1"><Info className="w-3 h-3" />{errors.bike}</p>}
                </div>

                {/* Niveau */}
                <div className="mb-2">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Votre niveau de pratique</label>
                  <div className="grid grid-cols-2 gap-2">
                    {levelOptions.map(lvl => (
                      <button
                        key={lvl.value}
                        onClick={() => update('level', lvl.value)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          form.level === lvl.value
                            ? 'border-[#E30613] bg-[#E30613]/5'
                            : 'border-[#E5E5E5] hover:border-[#CCCCCC]'
                        }`}
                      >
                        <p className={`text-sm font-bold ${form.level === lvl.value ? 'text-[#E30613]' : 'text-[#1A1A1A]'}`}>{lvl.label}</p>
                        <p className="text-xs text-[#6B6B6B] mt-0.5">{lvl.desc}</p>
                      </button>
                    ))}
                  </div>
                  {errors.level && <p className="text-xs text-[#E30613] mt-2 flex items-center gap-1"><Info className="w-3 h-3" />{errors.level}</p>}
                </div>
              </div>
            )}

            {/* ── ÉTAPE 2 : DATE & CRÉNEAU ── */}
            {step === 2 && (
              <div className="p-6 sm:p-8">
                <h3 className="font-bold text-[#1A1A1A] text-lg mb-1">Choisissez votre créneau</h3>
                <p className="text-sm text-[#6B6B6B] mb-6">Ouvert du lundi au samedi, 10h-19h. Fermé le dimanche.</p>

                {/* Sélecteur de date */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-[#1A1A1A]">Date</label>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setDateOffset(Math.max(0, dateOffset - DATES_PER_PAGE))}
                        disabled={dateOffset === 0}
                        className="w-7 h-7 rounded-lg border border-[#E5E5E5] flex items-center justify-center disabled:opacity-30 hover:border-[#1A1A1A] transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDateOffset(Math.min(availableDates.length - DATES_PER_PAGE, dateOffset + DATES_PER_PAGE))}
                        disabled={dateOffset + DATES_PER_PAGE >= availableDates.length}
                        className="w-7 h-7 rounded-lg border border-[#E5E5E5] flex items-center justify-center disabled:opacity-30 hover:border-[#1A1A1A] transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5">
                    {visibleDates.map(date => {
                      const isSelected = form.date?.toDateString() === date.toDateString();
                      return (
                        <button
                          key={date.toISOString()}
                          onClick={() => update('date', date)}
                          className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all ${
                            isSelected
                              ? 'border-[#E30613] bg-[#E30613] text-white shadow-md'
                              : 'border-[#E5E5E5] hover:border-[#E30613]/50 bg-white'
                          }`}
                        >
                          <span className={`text-[10px] font-medium uppercase tracking-wide ${isSelected ? 'text-white/80' : 'text-[#6B6B6B]'}`}>
                            {DAYS_FR[date.getDay()]}
                          </span>
                          <span className={`text-base font-bold leading-tight ${isSelected ? 'text-white' : 'text-[#1A1A1A]'}`}>
                            {date.getDate()}
                          </span>
                          <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#6B6B6B]'}`}>
                            {MONTHS_FR[date.getMonth()]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.date && <p className="text-xs text-[#E30613] mt-2 flex items-center gap-1"><Info className="w-3 h-3" />{errors.date}</p>}
                </div>

                {/* Créneaux horaires */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Créneau horaire</label>
                  {/* Matin */}
                  <p className="text-xs text-[#6B6B6B] uppercase tracking-wider mb-2">Matin</p>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {timeSlots.slice(0, 4).map(t => (
                      <button
                        key={t}
                        onClick={() => update('time', t)}
                        className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                          form.time === t
                            ? 'border-[#E30613] bg-[#E30613] text-white shadow-md'
                            : 'border-[#E5E5E5] text-[#1A1A1A] hover:border-[#E30613]/50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {/* Après-midi */}
                  <p className="text-xs text-[#6B6B6B] uppercase tracking-wider mb-2">Après-midi</p>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.slice(4).map(t => (
                      <button
                        key={t}
                        onClick={() => update('time', t)}
                        className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                          form.time === t
                            ? 'border-[#E30613] bg-[#E30613] text-white shadow-md'
                            : 'border-[#E5E5E5] text-[#1A1A1A] hover:border-[#E30613]/50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {errors.time && <p className="text-xs text-[#E30613] mt-2 flex items-center gap-1"><Info className="w-3 h-3" />{errors.time}</p>}
                </div>
              </div>
            )}

            {/* ── ÉTAPE 3 : INFOS CONTACT ── */}
            {step === 3 && (
              <div className="p-6 sm:p-8">
                <h3 className="font-bold text-[#1A1A1A] text-lg mb-1">Vos informations</h3>
                <p className="text-sm text-[#6B6B6B] mb-6">Ces informations restent confidentielles et ne sont utilisées que pour votre réservation.</p>

                {/* Récap RDV */}
                <div className="flex items-center gap-4 p-4 bg-[#F5F5F5] rounded-xl mb-6 text-sm">
                  <div className="flex items-center gap-2 text-[#6B6B6B]">
                    <Bike className="w-4 h-4 text-[#E30613]" />
                    <span className="font-medium text-[#1A1A1A] truncate max-w-[120px]">{bikeName}</span>
                  </div>
                  {form.date && (
                    <div className="flex items-center gap-2 text-[#6B6B6B]">
                      <Calendar className="w-4 h-4 text-[#E30613]" />
                      <span className="capitalize">{DAYS_FR[form.date.getDay()]} {form.date.getDate()} {MONTHS_FR[form.date.getMonth()]}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[#6B6B6B]">
                    <Clock className="w-4 h-4 text-[#E30613]" />
                    <span>{form.time}</span>
                  </div>
                </div>

                {/* Nom & Prénom */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                      Prénom <span className="text-[#E30613]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Thomas"
                      value={form.firstName}
                      onChange={e => update('firstName', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-all ${
                        errors.firstName ? 'border-[#E30613]' : 'border-[#E5E5E5] focus:border-[#E30613]'
                      }`}
                    />
                    {errors.firstName && <p className="text-xs text-[#E30613] mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Nom</label>
                    <input
                      type="text"
                      placeholder="Martin"
                      value={form.lastName}
                      onChange={e => update('lastName', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E5E5] focus:border-[#E30613] text-sm focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Email <span className="text-[#E30613]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAAAAA]" />
                    <input
                      type="email"
                      placeholder="thomas.martin@email.fr"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-all ${
                        errors.email ? 'border-[#E30613]' : 'border-[#E5E5E5] focus:border-[#E30613]'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-[#E30613] mt-1">{errors.email}</p>}
                </div>

                {/* Téléphone */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Téléphone <span className="text-[#E30613]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAAAAA]" />
                    <input
                      type="tel"
                      placeholder="06 00 00 00 00"
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-all ${
                        errors.phone ? 'border-[#E30613]' : 'border-[#E5E5E5] focus:border-[#E30613]'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-[#E30613] mt-1">{errors.phone}</p>}
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                    Message <span className="text-[#AAAAAA] font-normal">(optionnel)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#AAAAAA]" />
                    <textarea
                      rows={3}
                      placeholder="Questions sur le vélo, informations sur votre pratique..."
                      value={form.message}
                      onChange={e => update('message', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#E5E5E5] focus:border-[#E30613] text-sm focus:outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Rappel */}
                <div className="p-4 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
                  <div className="flex items-center gap-2 mb-3">
                    <BellRing className="w-4 h-4 text-[#E30613]" />
                    <p className="text-sm font-semibold text-[#1A1A1A]">Rappel de rendez-vous</p>
                    <span className="text-xs text-[#6B6B6B]">— 24h avant</span>
                  </div>
                  <div className="flex gap-3">
                    <label className={`flex items-center gap-2.5 cursor-pointer flex-1 p-3 rounded-xl border-2 transition-all ${
                      form.reminderEmail ? 'border-[#E30613] bg-[#E30613]/5' : 'border-[#E5E5E5] bg-white'
                    }`}>
                      <input
                        type="checkbox"
                        checked={form.reminderEmail}
                        onChange={e => update('reminderEmail', e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        form.reminderEmail ? 'border-[#E30613] bg-[#E30613]' : 'border-[#CCCCCC]'
                      }`}>
                        {form.reminderEmail && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#E30613]" /> Email
                        </span>
                        <p className="text-xs text-[#6B6B6B]">Rappel par email</p>
                      </div>
                    </label>

                    <label className={`flex items-center gap-2.5 cursor-pointer flex-1 p-3 rounded-xl border-2 transition-all ${
                      form.reminderSms ? 'border-[#E30613] bg-[#E30613]/5' : 'border-[#E5E5E5] bg-white'
                    }`}>
                      <input
                        type="checkbox"
                        checked={form.reminderSms}
                        onChange={e => update('reminderSms', e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        form.reminderSms ? 'border-[#E30613] bg-[#E30613]' : 'border-[#CCCCCC]'
                      }`}>
                        {form.reminderSms && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#E30613]" /> SMS
                        </span>
                        <p className="text-xs text-[#6B6B6B]">Rappel par SMS</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* ── FOOTER CARD : navigation ── */}
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex items-center justify-between gap-4 border-t border-[#F5F5F5] pt-5">
              {step > 1 ? (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-2 text-sm font-semibold text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Retour
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button onClick={goNext} className="btn-primary">
                  Continuer
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} className="btn-primary">
                  <Check className="w-4 h-4" />
                  Confirmer ma réservation
                </button>
              )}
            </div>
          </div>

          {/* Note de confiance */}
          <p className="text-center text-xs text-[#AAAAAA] mt-4 flex items-center justify-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Vos données sont protégées et ne seront jamais partagées avec des tiers.
          </p>
        </div>
      </section>

      {/* ── INFOS PRATIQUES ── */}
      <section className="py-14 bg-[#1A1A1A] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">

            {/* Adresse */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#E30613]/15 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#E30613]" />
                </div>
                <h3 className="font-bold text-white">Adresse</h3>
              </div>
              <p className="text-[#AAAAAA] text-sm leading-relaxed">
                32 Avenue de Nice<br />
                06600 Antibes<br />
                <a href="https://maps.google.com/?q=32+Avenue+de+Nice+Antibes" target="_blank" rel="noopener noreferrer" className="text-[#E30613] hover:underline mt-1 inline-block">
                  Voir sur Google Maps →
                </a>
              </p>
            </div>

            {/* Horaires */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#E30613]/15 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#E30613]" />
                </div>
                <h3 className="font-bold text-white">Horaires</h3>
              </div>
              <div className="text-sm space-y-1">
                {[
                  { day: 'Lundi – Vendredi', hours: '10h00 – 19h00' },
                  { day: 'Samedi', hours: '10h00 – 19h00' },
                  { day: 'Dimanche', hours: 'Fermé' },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between gap-4">
                    <span className="text-[#AAAAAA]">{day}</span>
                    <span className={`font-medium ${hours === 'Fermé' ? 'text-[#6B6B6B]' : 'text-white'}`}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#E30613]/15 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#E30613]" />
                </div>
                <h3 className="font-bold text-white">Contact direct</h3>
              </div>
              <p className="text-[#AAAAAA] text-sm mb-3">Préférez-vous nous appeler ?</p>
              <a href="tel:+33493740803" className="btn-primary text-sm py-3 px-5 inline-flex">
                <Phone className="w-4 h-4" />
                04 93 74 08 03
              </a>
              <p className="text-xs text-[#6B6B6B] mt-2">Réponse rapide · Du lundi au samedi</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
