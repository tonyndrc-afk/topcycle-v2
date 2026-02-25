import { useState, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, Heart, Share2, Check,
  Truck, Shield, RotateCcw, Star, Phone, Plus, Minus,
  ZoomIn, Award, Zap, Mountain, ChevronDown,
  X, ShoppingCart, Calendar, MapPin, BadgeCheck, CreditCard
} from 'lucide-react';
import { Header } from '@/components/Header';
import { MenuOverlay } from '@/components/MenuOverlay';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Footer } from '@/sections/Footer';
import { Link, useParams } from 'react-router-dom';

/* ─────────────── DONNÉES PRODUITS ─────────────── */
const produitsData: Record<string, {
  id: number; name: string; brand: string; category: string;
  price: number; oldPrice?: number; images: string[]; badge?: string;
  shortDescription: string; fullDescription: string;
  benefits: { icon: React.ElementType; title: string; desc: string }[];
  specs: Record<string, string>;
  features: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number; rating: number; reviewCount: number;
  reviews: { name: string; rating: number; date: string; verified: boolean; title: string; text: string }[];
  faqs: { q: string; a: string }[];
}> = {
  'trek-slash-99': {
    id: 1,
    name: 'Slash 9.9',
    brand: 'Trek',
    category: 'VTT Enduro',
    price: 8499,
    oldPrice: 9999,
    images: ['/images/bike-enduro.jpg', '/images/bike-detail-suspension.jpg', '/images/bike-detail-drivetrain.jpg'],
    badge: 'Nouveau',
    shortDescription: 'Le VTT enduro ultime. Cadre carbone OCLV Mountain, suspension Fox Factory et transmission Shimano XTR — pour les riders qui ne font aucun compromis.',
    fullDescription: `Le Trek Slash 9.9 représente l'excellence absolue dans le monde de l'enduro. Conçu en étroite collaboration avec les meilleurs riders de la discipline, ce VTT haut de gamme repousse les limites du possible.

Son cadre en carbone OCLV Mountain, développé exclusivement par Trek, offre le parfait équilibre entre légèreté, rigidité et absorption des vibrations. La technologie de fabrication propre à Trek garantit une qualité de carbone inégalée, utilisée uniquement sur leurs modèles les plus haut de gamme.

Associé à la suspension Fox Factory — référence absolue de la compétition — le Slash 9.9 absorbe les chocs les plus violents tout en restant parfaitement efficace en pédalage. La géométrie enduro moderne et agressive offre une confiance maximale en descente, sans sacrifier la maniabilité en montée.

La transmission Shimano XTR 12 vitesses assure des passages de vitesses précis et instantanés dans toutes les conditions. Les freins XTR 4 pistons avec rotors 203mm offrent une puissance et une modulation de freinage irréprochables, même sur les descentes les plus longues et chaudes.`,
    benefits: [
      { icon: Zap, title: 'Performance Extrême', desc: 'Né pour la compétition enduro. Il excelle là où les autres bikes s\'arrêtent.' },
      { icon: Mountain, title: 'Tout-Terrain Absolu', desc: 'Trail, enduro, bike park — une seule monture pour repousser toutes les limites.' },
      { icon: Award, title: 'Composants Race', desc: 'Fox Factory + Shimano XTR : exactement ce qu\'utilisent les pilotes en coupe du monde.' },
      { icon: Shield, title: 'Carbone OCLV Trek', desc: 'La technologie carbone exclusive Trek. Le meilleur rapport rigidité / légèreté du marché.' },
    ],
    specs: {
      'Cadre': 'Carbone OCLV Mountain, 160mm de débattement',
      'Fourche': 'Fox Factory 38, 170mm, Grip 2',
      'Amortisseur': 'Fox Factory Float X2',
      'Transmission': 'Shimano XTR M9100, 1x12 vitesses',
      'Pédalier': 'Shimano XTR M9100, 32 dents',
      'Freins': 'Shimano XTR M9100, 4 pistons, rotors 203mm',
      'Roues': 'Bontrager Line Pro 30 carbone, 29"',
      'Pneus': 'Bontrager SE5 Team Issue, 29x2.50"',
      'Tige de selle': 'Bontrager Drop Line télescopique, 150mm',
      'Cintre': 'Bontrager Line Pro 35, 780mm',
      'Potence': 'Bontrager Line Pro 35, 50mm',
      'Poids': '14,2 kg (taille M)',
    },
    features: [
      'Cadre carbone OCLV Mountain ultra-léger et rigide',
      'Suspension Fox Factory pour absorption maximale',
      'Transmission Shimano XTR 1x12 vitesses de précision',
      'Freins XTR 4 pistons avec modulation parfaite',
      'Roues Bontrager Line Pro 30 en carbone',
      'Géométrie enduro moderne et confiante',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Rouge Lithium', hex: '#C0392B' },
      { name: 'Noir Mat', hex: '#1A1A1A' },
    ],
    stock: 3,
    rating: 4.9,
    reviewCount: 12,
    reviews: [
      {
        name: 'Julien M.',
        rating: 5,
        date: 'Janvier 2026',
        verified: true,
        title: 'Le meilleur enduro que j\'ai jamais roulé',
        text: 'Après 3 saisons avec mon ancien enduro, le passage au Slash 9.9 a été une révélation. La suspension Fox Factory est incroyablement plush en petites bosses mais reste très efficace dans le gros. Le carbone OCLV est d\'une rigidité exemplaire. Parfait.',
      },
      {
        name: 'Antoine D.',
        rating: 5,
        date: 'Décembre 2025',
        verified: true,
        title: 'Conseil et service au top chez Topcycle',
        text: 'L\'équipe m\'a parfaitement orienté selon ma pratique. Le vélo est arrivé monté et réglé. Les premières sorties en enduro sont prometteuses — le Slash avale vraiment tout.',
      },
      {
        name: 'Marc R.',
        rating: 5,
        date: 'Novembre 2025',
        verified: true,
        title: 'Investissement pleinement justifié',
        text: 'Oui, le prix est élevé. Mais quand on monte sur ce vélo, on comprend immédiatement pourquoi. La qualité des composants, la précision des réglages, l\'efficacité en descente : tout est au niveau. Je ne regrette pas un euro.',
      },
    ],
    faqs: [
      {
        q: 'Quelle taille choisir pour le Trek Slash 9.9 ?',
        a: 'Le Slash 9.9 suit les tailles standard Trek : S pour 155-165cm, M pour 165-175cm, L pour 175-185cm, XL pour 185-195cm. En cas de doute entre deux tailles, venez l\'essayer en magasin. Notre équipe vous orientera selon votre morphologie et votre style de pilotage.',
      },
      {
        q: 'Puis-je essayer ce vélo avant de l\'acheter ?',
        a: 'Absolument. Topcycle dispose d\'une zone d\'essai privée à Antibes. Prenez rendez-vous par téléphone ou en ligne pour planifier un essai avec un de nos experts vélo. Aucun frais supplémentaire.',
      },
      {
        q: 'Quelles options de livraison sont disponibles ?',
        a: 'Le Trek Slash 9.9 est livré gratuitement à domicile dans un carton sécurisé, pré-assemblé et prêt à rouler. Vous pouvez également opter pour un retrait en magasin avec un dernier réglage de mise en main offert par notre atelier.',
      },
      {
        q: 'Quelle est la garantie sur ce vélo ?',
        a: 'Trek offre une garantie à vie sur le cadre carbone et 2 ans sur les composants d\'origine. Topcycle ajoute une garantie atelier de 6 mois sur l\'assemblage et les réglages réalisés en magasin.',
      },
    ],
  },

  'scott-scale-rc-world-cup': {
    id: 2,
    name: 'Scale RC World Cup',
    brand: 'Scott',
    category: 'VTT Cross-Country',
    price: 6999,
    images: ['/images/bike-xc.jpg'],
    shortDescription: 'Le XC race ultime. Cadre carbone HMX, fourche RockShox SID Ultimate et transmission SRAM XX1 Eagle — pour les compétiteurs qui visent le podium.',
    fullDescription: `Le Scott Scale RC World Cup est le choix des champions en cross-country. Conçu pour la vitesse pure, ce vélo allie légèreté extrême et efficacité de pédalage maximale.

Son cadre carbone HMX, développé par Scott, est parmi les plus légers du marché. Chaque gramme économisé se traduit par une accélération plus vive et une ascension plus facile.

La fourche RockShox SID Ultimate offre 100mm de débattement avec un amorti ultra-réactif, parfait pour les terrains variés du cross-country. La transmission SRAM XX1 Eagle 12 vitesses couvre une plage de développements exceptionelle.`,
    benefits: [
      { icon: Zap, title: 'Légèreté Record', desc: 'Cadre carbone HMX parmi les plus légers du marché. Chaque gramme compte en compétition.' },
      { icon: Mountain, title: 'Efficacité Pure', desc: 'Géométrie XC optimisée pour la montée et la relance. Aucune perte d\'énergie.' },
      { icon: Award, title: 'Composants Race', desc: 'RockShox SID Ultimate + SRAM XX1 Eagle : l\'équipement des champions.' },
      { icon: Shield, title: 'Cadre Garanti', desc: 'Garantie cadre Scott à vie. Une confiance totale sur les terrains les plus exigeants.' },
    ],
    specs: {
      'Cadre': 'Carbone HMX, 100mm de débattement',
      'Fourche': 'RockShox SID Ultimate, 100mm, DebonAir',
      'Amortisseur': 'RockShox Nude RCT',
      'Transmission': 'SRAM XX1 Eagle, 1x12 vitesses',
      'Freins': 'SRAM Level Ultimate, 160/160mm',
      'Roues': 'Syncros Silverton 1.0, 29"',
      'Pneus': 'Maxxis Ikon / Maxxis Rekon, 29x2.25"',
      'Tige de selle': 'Syncros Duncan 1.5 télescopique',
      'Poids': '10,8 kg (taille M)',
    },
    features: [
      'Cadre carbone HMX ultra-léger',
      'Fourche RockShox SID Ultimate 100mm',
      'Transmission SRAM XX1 Eagle 12 vitesses',
      'Freins SRAM Level Ultimate',
      'Roues Syncros Silverton 1.0 carbone',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Noir/Rouge', hex: '#1A1A1A' },
      { name: 'Blanc Spark', hex: '#F0F0F0' },
    ],
    stock: 2,
    rating: 4.8,
    reviewCount: 8,
    reviews: [
      { name: 'Thomas G.', rating: 5, date: 'Janvier 2026', verified: true, title: 'Machine de compétition', text: 'J\'ai remplacé mon ancien XC par ce Scale et la différence est immédiate. La légèreté du cadre HMX est bluffante. En course, il file tout seul.' },
      { name: 'Céline V.', rating: 5, date: 'Décembre 2025', verified: true, title: 'Conseils parfaits chez Topcycle', text: 'L\'équipe m\'a aidée à choisir la bonne taille et les bons réglages de suspension. Service impeccable et vélo au top.' },
    ],
    faqs: [
      { q: 'Ce vélo est-il adapté à la pratique loisir ou uniquement à la compétition ?', a: 'Le Scale RC World Cup est principalement un vélo de compétition, mais il s\'adapte parfaitement aux sorties XC exigeantes et aux trails roulants. Si vous cherchez un vélo polyvalent, nous pouvons vous orienter vers d\'autres modèles.' },
      { q: 'Quelle est la différence entre les tailles ?', a: 'Scott utilise un guide de taille basé sur la hauteur intérieure de jambe. Venez en magasin pour un fitting complet avec notre équipe.' },
      { q: 'Les roues carbone Syncros résistent-elles aux chocs ?', a: 'Oui, les jantes Syncros Silverton 1.0 sont conçues pour la compétition XC et résistent très bien aux chocs normaux de ce type de pratique.' },
      { q: 'Quelle est la garantie ?', a: 'Scott offre une garantie cadre à vie et 2 ans sur les composants. Topcycle ajoute 6 mois de garantie atelier.' },
    ],
  },

  'cannondale-supersix-evo': {
    id: 3,
    name: 'SuperSix EVO Hi-MOD',
    brand: 'Cannondale',
    category: 'Vélo de Route',
    price: 5499,
    badge: 'Best-seller',
    images: ['/images/bike-road.jpg'],
    shortDescription: 'Le vélo de route parfait pour les grimpeurs. Cadre carbone Hi-MOD, groupe Shimano Dura-Ace Di2 et roues HollowGram — légèreté et rigidité sans concession.',
    fullDescription: `Le Cannondale SuperSix EVO Hi-MOD est la référence absolue pour les cyclistes de route qui veulent tout : légèreté, rigidité, aérodynamisme. Ce vélo incarne des années d\'ingénierie Cannondale au service de la performance.

Son cadre Hi-MOD Carbon utilise les fibres de carbone les plus haut de gamme de Cannondale, avec une mise en œuvre artisanale qui maximise la rigidité tout en minimisant le poids. La géométrie endurance agressive garantit une position performante sans compromettre le confort sur les longues sorties.

Le groupe Shimano Dura-Ace Di2 électronique assure des changements de vitesse instantanés et précis, même sous l\'effort. Les roues HollowGram R-S 50 en carbone complètent un ensemble parfaitement cohérent.`,
    benefits: [
      { icon: Zap, title: 'Légèreté Elite', desc: 'Moins de 7 kg complet. Le rapport poids/rigidité Hi-MOD est sans égal sur ce segment de prix.' },
      { icon: Mountain, title: 'Grimpeur Né', desc: 'Géométrie taillée pour les cols. Il s\'envole là où les autres peinent.' },
      { icon: Award, title: 'Di2 Électronique', desc: 'Shimano Dura-Ace Di2 : passages de vitesses parfaits à chaque coup de pédale.' },
      { icon: Truck, title: 'Livraison Offerte', desc: 'Livré assemblé, réglé et prêt à rouler. Avec notre mise en main atelier offerte.' },
    ],
    specs: {
      'Cadre': 'Hi-MOD Carbon, technologie BallisTec',
      'Fourche': 'Cannondale Slice Hi-MOD Carbon',
      'Transmission': 'Shimano Dura-Ace Di2 R9250, 2x12 vitesses',
      'Freins': 'Shimano Dura-Ace Di2, disques 160/140mm',
      'Roues': 'HollowGram R-S 50, carbone',
      'Pneus': 'Vittoria Corsa Control, 700x28c',
      'Cintre': 'Cannondale HollowGram KNOT SystemBar',
      'Poids': '6,8 kg (taille 54cm)',
    },
    features: [
      'Cadre carbone Hi-MOD ultra-léger',
      'Groupe Shimano Dura-Ace Di2 électronique',
      'Roues HollowGram R-S 50 carbone',
      'Freins disque hydrauliques',
      'Géométrie grimpeur optimisée',
    ],
    sizes: ['48', '51', '54', '56', '58'],
    colors: [
      { name: 'Blanc Perle', hex: '#F5F5F0' },
      { name: 'Noir Mat', hex: '#1A1A1A' },
    ],
    stock: 4,
    rating: 4.9,
    reviewCount: 15,
    reviews: [
      { name: 'Philippe B.', rating: 5, date: 'Février 2026', verified: true, title: 'Le meilleur vélo de route que j\'ai eu', text: 'Après 10 ans de cyclisme, j\'ai enfin trouvé le vélo parfait. Le Di2 est magique, le cadre Hi-MOD est d\'une rigidité incroyable. Les cols de la région n\'ont jamais été aussi faciles.' },
      { name: 'Isabelle R.', rating: 5, date: 'Janvier 2026', verified: true, title: 'Service exceptionnel', text: 'Topcycle m\'a accompagnée dans le choix de la taille et des accessoires. Le fitting personnalisé valait vraiment le détour. Un vrai service premium.' },
    ],
    faqs: [
      { q: 'Comment choisir la bonne taille de cadre ?', a: 'Le SuperSix EVO s\'adapte à plusieurs morphologies. Nous proposons un fitting complet en magasin avec mesures de la longueur de jambe, du tronc et des bras. La taille 54 correspond généralement à une taille de 175-180cm.' },
      { q: 'Le Di2 nécessite-t-il une maintenance particulière ?', a: 'Le groupe Di2 est extrêmement fiable et nécessite très peu d\'entretien. La batterie se charge via USB et tient plusieurs milliers de kilomètres. Notre atelier peut effectuer les mises à jour firmware.' },
      { q: 'Peut-on monter des garde-boue ou un porte-bagages ?', a: 'Le SuperSix EVO Hi-MOD est un vélo de compétition et ne dispose pas de points de fixation pour les accessoires. Pour une utilisation polyvalente, nous avons d\'autres modèles Cannondale.' },
      { q: 'Quelle est la garantie ?', a: 'Cannondale offre une garantie cadre à vie pour le premier propriétaire et 2 ans sur les composants. Notre atelier ajoute 6 mois de garantie sur l\'assemblage.' },
    ],
  },

  'santa-cruz-hightower': {
    id: 4,
    name: 'Hightower C S',
    brand: 'Santa Cruz',
    category: 'VTT Trail',
    price: 7299,
    oldPrice: 8099,
    badge: 'Promo -10%',
    images: ['/images/bike-santa-cruz.jpg'],
    shortDescription: 'Le trail bike polyvalent par excellence. Cadre carbone C de Santa Cruz, suspension Fox 36 Float et transmission SRAM GX Eagle — pour rider partout sans compromis.',
    fullDescription: `Le Santa Cruz Hightower C S est le compagnon idéal pour les riders qui veulent un seul vélo capable de tout : montée efficace, descente engagée, trails roulants et sentiers techniques.

Avec 140mm de débattement à l\'avant et 130mm à l\'arrière, le Hightower offre le parfait équilibre entre efficacité en montée et confiance en descente. La plateforme VPP (Virtual Pivot Point) brevetée par Santa Cruz assure un pédalage actif sans rebondir.

La fourche Fox 36 Float est reconnu pour sa robustesse et sa progressivité, idéale pour le trail engagé. La transmission SRAM GX Eagle 12 vitesses couvre toutes les situations avec fiabilité.`,
    benefits: [
      { icon: Mountain, title: 'Polyvalence Totale', desc: '140/130mm de débattement. Un seul vélo pour toutes vos aventures trail.' },
      { icon: Award, title: 'VPP Santa Cruz', desc: 'La suspension Virtual Pivot Point : pédalage actif et absorption optimale en toutes circonstances.' },
      { icon: Zap, title: 'Carbone C', desc: 'Le meilleur rapport qualité/poids de Santa Cruz. Léger, rigide, indéstructible.' },
      { icon: Shield, title: 'Promo -10%', desc: 'Profitez de cette remise exceptionnelle. Stock limité sur cette coloris.' },
    ],
    specs: {
      'Cadre': 'Carbone C, VPP, 130mm de débattement',
      'Fourche': 'Fox 36 Float, 140mm, Grip',
      'Amortisseur': 'Fox Float DPS',
      'Transmission': 'SRAM GX Eagle, 1x12 vitesses',
      'Freins': 'SRAM Code R, 200/180mm',
      'Roues': 'RaceFace AR Offset 30, 29"',
      'Pneus': 'Maxxis Minion DHF/DHR II, 29x2.5"',
      'Tige de selle': 'Fox Transfer télescopique, 125mm',
      'Poids': '13,5 kg (taille M)',
    },
    features: [
      'Cadre carbone C Santa Cruz',
      'Suspension VPP 130mm arrière',
      'Fourche Fox 36 Float 140mm',
      'Transmission SRAM GX Eagle 12v',
      'Freins SRAM Code R 4 pistons',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Bleu Gloss', hex: '#2C5F8A' },
      { name: 'Noir Mat', hex: '#1A1A1A' },
    ],
    stock: 1,
    rating: 4.8,
    reviewCount: 11,
    reviews: [
      { name: 'Romain T.', rating: 5, date: 'Janvier 2026', verified: true, title: 'Le trail bike parfait', text: 'J\'hésite depuis des mois entre plusieurs trail bikes. Le Hightower S m\'a convaincu dès le premier essai. Il monte bien, descend encore mieux. La VPP de Santa Cruz c\'est vraiment une autre dimension.' },
      { name: 'Nathalie P.', rating: 4, date: 'Décembre 2025', verified: true, title: 'Super vélo, service top', text: 'Très bon vélo, polyvalent comme promis. J\'aurais aimé plus de débattement pour les descentes techniques mais pour le trail varié c\'est parfait. Topcycle a fait une mise en main très professionnelle.' },
    ],
    faqs: [
      { q: 'La taille "C" de carbone est-elle solide ?', a: 'Absolument. Le carbone C de Santa Cruz est le même processus de fabrication que le CC (haut de gamme), avec un ratio fibres légèrement différent. Il est extrêmement robuste et résiste très bien aux impacts normaux du trail.' },
      { q: 'Y a-t-il une garantie sur ce vélo en promo ?', a: 'Oui, la remise n\'affecte pas la garantie. Vous bénéficiez de la garantie cadre à vie Santa Cruz et de 2 ans sur les composants, plus notre garantie atelier de 6 mois.' },
      { q: 'Ce vélo convient-il au bike park ?', a: 'Le Hightower peut occasionnellement faire du bike park sur des pistes bleues/rouges, mais pour une pratique régulière en bike park ou enduro engagé, nous recommandons un vélo avec plus de débattement.' },
      { q: 'Quelle est la différence entre tailles S et M ?', a: 'La taille S est recommandée pour les riders de 160-170cm, le M pour 170-180cm. Les caractéristiques de pilotage varient sensiblement selon la taille : venez essayer les deux en magasin.' },
    ],
  },

  'orbea-rise-m20': {
    id: 5,
    name: 'Rise M20',
    brand: 'Orbea',
    category: 'VTT Électrique',
    price: 5999,
    images: ['/images/bike-emtb.jpg'],
    shortDescription: 'Le e-MTB qui se conduit comme un VTT. Moteur Shimano EP8 compact, batterie 360Wh et cadre carbone OMR — l\'assistance la plus naturelle du marché.',
    fullDescription: `L\'Orbea Rise M20 révolutionne l\'approche du VTT électrique. Là où d\'autres e-bikes sont lourds et encombrants, le Rise se distingue par son poids contenu (sous les 18kg) et son assistance ultra-naturelle.

Le moteur Shimano EP8 de 85Nm est le référence du marché pour la légèreté et la discrétion. Il offre une assistance tellement transparente qu\'on en oublie être sur un vélo électrique. Associé à la batterie de 360Wh intégrée dans le cadre, il offre une autonomie suffisante pour les longues sorties en montagne.

Le cadre carbone OMR d\'Orbea optimise chaque gramme pour offrir le meilleur ressenti possible. La suspension Fox 34 Float 140mm complète un package e-MTB trail parfaitement équilibré.`,
    benefits: [
      { icon: Zap, title: 'Moteur EP8', desc: 'Shimano EP8 85Nm : l\'assistance la plus naturelle. On oublie qu\'on est sur un e-bike.' },
      { icon: Mountain, title: 'Légèreté Record', desc: 'Moins de 18kg. Le Rise monte et descend comme un VTT classique haut de gamme.' },
      { icon: Award, title: 'Carbone OMR', desc: 'Cadre carbone spécifique e-MTB. Géométrie trail performante malgré le poids du moteur.' },
      { icon: Shield, title: 'Batterie Intégrée', desc: '360Wh cachée dans le cadre. Aucun compromis sur l\'esthétique ni la protection.' },
    ],
    specs: {
      'Cadre': 'Carbone OMR, 140mm de débattement',
      'Moteur': 'Shimano EP8, 85Nm, 250W',
      'Batterie': 'Orbea 360Wh, intégrée cadre',
      'Autonomie': 'Jusqu\'à 100km (mode Eco)',
      'Fourche': 'Fox 34 Float Factory, 140mm',
      'Transmission': 'Shimano XT, 1x12 vitesses',
      'Freins': 'Shimano XT, 200/180mm',
      'Roues': 'RaceFace AR 30c, 29"',
      'Poids': '17,8 kg (taille M)',
    },
    features: [
      'Moteur Shimano EP8 85Nm ultra-léger',
      'Batterie 360Wh intégrée au cadre',
      'Cadre carbone OMR taillé pour le trail',
      'Fourche Fox 34 Float Factory 140mm',
      'Transmission Shimano XT 12 vitesses',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Gris Granite', hex: '#6B7280' },
      { name: 'Vert Olive', hex: '#4D5E3B' },
    ],
    stock: 3,
    rating: 4.7,
    reviewCount: 9,
    reviews: [
      { name: 'Bernard L.', rating: 5, date: 'Janvier 2026', verified: true, title: 'Enfin un e-bike qui ressemble à un vrai VTT', text: 'J\'ai 58 ans et les genoux qui font des caprices. Le Rise M20 me permet de continuer à rouler avec mes amis plus jeunes. L\'assistance est tellement naturelle que personne ne réalise que j\'ai de l\'aide.' },
      { name: 'Maxime F.', rating: 4, date: 'Novembre 2025', verified: true, title: 'Impressionnant de légèreté', text: 'Pour un e-MTB, c\'est vraiment léger. On sent la différence en descente et dans les courbes. La batterie 360Wh est parfois un peu juste sur les grosses journées mais ça reste le meilleur compromis du marché.' },
    ],
    faqs: [
      { q: 'Quelle est l\'autonomie réelle du Rise M20 ?', a: 'L\'autonomie dépend du dénivelé, du mode d\'assistance et du poids du rider. En mode Trail (moyen), comptez 50-70km. En mode Eco, on peut dépasser 100km sur terrain roulant. Pour des sorties montagne intenses, prévoyez une batterie supplémentaire disponible chez Topcycle.' },
      { q: 'Le moteur Shimano EP8 peut-il être utilisé hors assistance (batterie déchargée) ?', a: 'Oui, le vélo reste parfaitement utilisable sans assistance. Le moteur EP8 est conçu pour ne pas créer de résistance anormale. Le poids supplémentaire se fait sentir mais c\'est gérable sur terrain plat.' },
      { q: 'Peut-on recharger la batterie à un point de charge public ?', a: 'La batterie Orbea 360Wh se charge sur n\'importe quelle prise 220V standard avec le chargeur fourni. Une recharge complète prend environ 3h30.' },
      { q: 'La garantie couvre-t-elle la batterie ?', a: 'Orbea garantit la batterie 2 ans ou 300 cycles de charge, selon ce qui arrive en premier. Au-delà, Topcycle propose le remplacement de la batterie au tarif constructeur.' },
    ],
  },

  'bmc-teammachine-slr01': {
    id: 6,
    name: 'Teammachine SLR01',
    brand: 'BMC',
    category: 'Vélo de Route',
    price: 6499,
    badge: 'Nouveau',
    images: ['/images/bike-aero.jpg'],
    shortDescription: 'L\'arme aérodynamique de BMC. Cadre carbone ACE+ de compétition, groupe SRAM Force eTap AXS et roues DT Swiss PRC 1400 — pour les rouleurs qui veulent voler.',
    fullDescription: `Le BMC Teammachine SLR01 est le résultat de dizaines d\'années de développement en compétition professionnelle. C\'est le vélo qui a porté les équipes WorldTour aux victoires les plus prestigieuses du peloton.

Le cadre Carbon ACE+ offre la combinaison idéale entre légèreté (cadre à moins de 750g) et rigidité. La géométrie Race optimisée pour le peloton donne un comportement dynamique et réactif, parfait pour les sprints et les attaques en montée.

Le groupe SRAM Force eTap AXS sans fil révolutionne l\'expérience du changement de vitesse. Fini les câbles, fini les déraillements. La transmission eTap répond instantanément à chaque action avec une précision absolue. Les roues DT Swiss PRC 1400 en carbone complètent un ensemble de compétition cohérent.`,
    benefits: [
      { icon: Zap, title: 'Aérodynamisme Race', desc: 'Profil de cadre optimisé en soufflerie. Gagner des watts sans effort supplémentaire.' },
      { icon: Award, title: 'eTap AXS Sans Fil', desc: 'SRAM Force eTap AXS : la liberté du sans-fil avec la précision du groupe haut de gamme.' },
      { icon: Mountain, title: 'Légèreté ACE+', desc: 'Cadre carbone ACE+ sous 750g. Pour attaquer en montée avec l\'avantage du poids.' },
      { icon: Shield, title: 'Héritage ProTour', desc: 'Le même vélo qu\'en course professionnelle. Chaque détail vient de la compétition.' },
    ],
    specs: {
      'Cadre': 'Carbon ACE+, géométrie Race',
      'Fourche': 'BMC ICS Carbon intégré',
      'Transmission': 'SRAM Force eTap AXS, 2x12 vitesses, sans fil',
      'Freins': 'SRAM Force eTap AXS, disques 160/140mm',
      'Roues': 'DT Swiss PRC 1400 Dicut 35, carbone',
      'Pneus': 'Continental Grand Prix 5000 S TR, 700x28c',
      'Cintre/Potence': 'BMC Integrated cockpit ICS',
      'Poids': '7,1 kg (taille 54cm)',
    },
    features: [
      'Cadre carbone ACE+ Race sous 750g',
      'Groupe SRAM Force eTap AXS sans fil',
      'Roues DT Swiss PRC 1400 carbone',
      'Cockpit intégré BMC ICS',
      'Géométrie peloton ProTour',
    ],
    sizes: ['47', '51', '54', '56', '61'],
    colors: [
      { name: 'Blanc/Rouge', hex: '#E30613' },
      { name: 'Carbone Mat', hex: '#2A2A2A' },
    ],
    stock: 2,
    rating: 4.9,
    reviewCount: 6,
    reviews: [
      { name: 'François D.', rating: 5, date: 'Février 2026', verified: true, title: 'Le eTap AXS change tout', text: 'Venant d\'un vélo à câbles, le passage au eTap sans fil est une révolution. Plus de câbles, des changements de vitesses parfaits à tout moment. Le cadre BMC est d\'une rigidité impressionnante sans être inconfortable.' },
      { name: 'Alexandre M.', rating: 5, date: 'Janvier 2026', verified: true, title: 'Achat parfaitement accompagné', text: 'Topcycle m\'a guidé dans la configuration (taille de plateau, hauteur de selle) avec un vrai professionnalisme. Le vélo est arrivé parfaitement réglé. Je recommande.' },
    ],
    faqs: [
      { q: 'Comment fonctionne le système eTap sans fil ?', a: 'Le système SRAM eTap AXS fonctionne via Bluetooth. Chaque dérailleurs a sa propre batterie rechargeable USB. Les commandes au guidon transmettent sans fil les ordres de changement de vitesse. La batterie dure plusieurs milliers de kilomètres entre charges.' },
      { q: 'Les roues DT Swiss PRC 1400 sont-elles adaptées à la pluie ?', a: 'Oui, les jantes DT Swiss PRC avec freins disque fonctionnent parfaitement par temps humide. Les disques offrent une modulation de freinage bien supérieure aux patins traditionnels sous la pluie.' },
      { q: 'Peut-on monter des pneus plus larges que 28c ?', a: 'Le Teammachine SLR01 accepte des pneus jusqu\'à 30c. Pour les sorties longues ou le gravel occasionnel, nous recommandons des 28c ou 30c en tubeless.' },
      { q: 'Quelle est la garantie BMC ?', a: 'BMC offre une garantie cadre à vie pour le propriétaire d\'origine et 2 ans sur les composants. Topcycle ajoute 6 mois de garantie atelier sur l\'assemblage et les réglages.' },
    ],
  },

  'trek-procaliber-99': {
    id: 7,
    name: 'Procaliber 9.9',
    brand: 'Trek',
    category: 'VTT Cross-Country',
    price: 4999,
    images: ['/images/bike-hardtail.jpg'],
    shortDescription: 'Le semi-rigide XC de référence Trek. Cadre carbone OCLV, fourche Fox Factory 32 et groupe Shimano XTR — la pureté du cross-country à son meilleur prix.',
    fullDescription: `Le Trek Procaliber 9.9 est l\'argument ultime en faveur du semi-rigide. Dans un monde dominé par les tout-suspendus, ce VTT presque rigide rappelle pourquoi les meilleurs XC riders du monde choisissent encore le hardtail pour certaines courses.

Son cadre carbone OCLV Mountain, la même technologie que sur les modèles les plus haut de gamme de Trek, offre une légèreté et une rigidité exceptionnelles. L\'absence de suspension arrière maximise l\'efficacité du pédalage — chaque coup de pédale se traduit directement en avancement.

La fourche Fox Factory 32 offre 100mm de débattement réglable pour gérer les terrains variés du cross-country. Le groupe Shimano XTR 12 vitesses assure des passages de vitesses parfaits dans les montées comme en descente.`,
    benefits: [
      { icon: Zap, title: 'Pédalage Direct', desc: 'Semi-rigide = zéro perte d\'énergie. Chaque coup de pédale propulse directement le vélo.' },
      { icon: Mountain, title: 'Carbone OCLV', desc: 'La technologie carbone Trek haut de gamme. Ultra-léger, rigide et résilient.' },
      { icon: Award, title: 'Shimano XTR', desc: 'Le groupe de référence XC. Fiabilité, légèreté et précision pour la compétition.' },
      { icon: Shield, title: 'Meilleur Rapport Q/P', desc: 'Composants de compétition à un prix accessible. Le meilleur investissement hardtail du marché.' },
    ],
    specs: {
      'Cadre': 'Carbone OCLV Mountain, semi-rigide',
      'Fourche': 'Fox Factory 32 SC, 100mm, Grip 2',
      'Transmission': 'Shimano XTR M9100, 1x12 vitesses',
      'Freins': 'Shimano XTR M9100, 180/160mm',
      'Roues': 'Bontrager Kovee XXX Carbon, 29"',
      'Pneus': 'Bontrager XR3 Team Issue, 29x2.20"',
      'Tige de selle': 'Bontrager Drop Line télescopique, 100mm',
      'Poids': '10,3 kg (taille M)',
    },
    features: [
      'Cadre carbone OCLV Mountain ultra-léger',
      'Fourche Fox Factory 32 SC 100mm',
      'Groupe Shimano XTR M9100 12 vitesses',
      'Roues Bontrager Kovee XXX carbone',
      'Géométrie XC agressive et confiante',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Gris Matte', hex: '#5A5A5A' },
      { name: 'Blanc/Rouge', hex: '#E30613' },
    ],
    stock: 5,
    rating: 4.7,
    reviewCount: 10,
    reviews: [
      { name: 'David C.', rating: 5, date: 'Janvier 2026', verified: true, title: 'Le hardtail XC de référence', text: 'Pour la compétition XC en Côte d\'Azur, c\'est parfait. Les pistes ne sont pas assez techniques pour justifier un tout-suspendu. Le Procaliber monte comme une flèche et descend avec confiance grâce à la Fox Factory.' },
      { name: 'Laurent V.', rating: 4, date: 'Décembre 2025', verified: true, title: 'Excellent vélo, attention au sizing', text: 'Très bon vélo mais j\'aurais dû prendre la taille M au lieu du S. Je recommande fortement de venir faire un fitting chez Topcycle avant d\'acheter, leur équipe est vraiment compétente.' },
    ],
    faqs: [
      { q: 'Un semi-rigide est-il adapté aux sentiers techniques ?', a: 'Le Procaliber 9.9 est optimisé pour le cross-country et les terrains roulants à modérément techniques. Pour les sentiers très techniques ou l\'enduro, un tout-suspendu sera plus adapté. Notre équipe peut vous aider à définir le meilleur choix selon votre terrain de prédilection.' },
      { q: 'La fourche Fox Factory 32 est-elle réglable ?', a: 'Oui, la Fox Factory 32 SC dispose du système Grip 2 qui permet de régler indépendamment la compression haute et basse vitesse, ainsi que le rebond. Notre atelier peut vous aider à trouver les réglages optimaux.' },
      { q: 'Quelle différence avec le Procaliber 9.7 moins cher ?', a: 'Le 9.9 se distingue par ses roues Bontrager Kovee XXX carbone (vs aluminium), son groupe Shimano XTR complet (vs XT/XTR mixte) et sa tige de selle télescopique. L\'ensemble représente un gain de poids d\'environ 800g.' },
      { q: 'Quelle est la garantie Trek ?', a: 'Trek offre une garantie à vie sur le cadre carbone OCLV pour le propriétaire d\'origine et 2 ans sur les composants. Topcycle ajoute 6 mois de garantie atelier.' },
    ],
  },
};

const defaultProduit = produitsData['trek-slash-99'];

/* ─────────────── COMPOSANT ─────────────── */
export default function FicheProduit() {
  const { id } = useParams();
  const produit = produitsData[id || ''] || defaultProduit;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(produit.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedInstallment, setSelectedInstallment] = useState(3);

  /* ── Calcul paiement fractionné ── */
  const installmentOptions = [
    { months: 3, fee: 0, label: '3x', badge: 'Sans frais' },
    { months: 4, fee: 0, label: '4x', badge: 'Sans frais' },
    { months: 10, fee: 0.0199, label: '10x', badge: '+1,99%' },
  ];
  const totalCart = produit.price * quantity;
  const activeInstallment = installmentOptions.find(o => o.months === selectedInstallment)!;
  const totalWithFee = Math.ceil(totalCart * (1 + activeInstallment.fee));
  const monthlyAmount = Math.ceil(totalWithFee / selectedInstallment);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(p);

  const discount = produit.oldPrice
    ? Math.round((1 - produit.price / produit.oldPrice) * 100)
    : null;

  /* ── SEO: title + JSON-LD ── */
  useEffect(() => {
    const prev = document.title;
    document.title = `${produit.brand} ${produit.name} ${produit.category} | Topcycle`;

    const schema = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: `${produit.brand} ${produit.name}`,
      brand: { '@type': 'Brand', name: produit.brand },
      description: produit.shortDescription,
      image: produit.images,
      offers: {
        '@type': 'Offer',
        price: produit.price,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'Topcycle' },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: produit.rating,
        reviewCount: produit.reviewCount,
      },
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'product-schema';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.title = prev;
      document.getElementById('product-schema')?.remove();
    };
  }, [produit]);

  /* ── Scroll lock menu ── */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  /* ── Scroll lock lightbox ── */
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);


  const prevImage = () => setCurrentImage((c) => (c - 1 + produit.images.length) % produit.images.length);
  const nextImage = () => setCurrentImage((c) => (c + 1) % produit.images.length);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20 lg:pb-0">
      <Header onMenuToggle={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Breadcrumb items={[{ label: 'Catalogue', href: '/catalogue' }, { label: `${produit.brand} ${produit.name}` }]} />

      {/* ── HERO PRODUIT ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-10 lg:gap-14 lg:items-start">

          {/* ── GALERIE ── */}
          <div>
            {/* Image principale */}
            <div
              className="relative aspect-[4/3] bg-[#F5F5F5] rounded-2xl overflow-hidden mb-3 cursor-zoom-in group"
              onClick={() => setLightbox(true)}
            >
              <img
                src={produit.images[currentImage]}
                alt={`${produit.brand} ${produit.name} - vue ${currentImage + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badge */}
              {produit.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#E30613] text-white text-sm font-semibold rounded-full z-10">
                  {produit.badge}
                </span>
              )}

              {/* Zoom hint */}
              <div className="absolute top-4 right-16 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 text-xs text-[#1A1A1A]">
                <ZoomIn className="w-3.5 h-3.5" />
                Agrandir
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsWishlist(!isWishlist); }}
                  className={`w-9 h-9 flex items-center justify-center rounded-full shadow-md transition-all ${isWishlist ? 'bg-[#E30613] text-white' : 'bg-white/90 hover:bg-white text-[#1A1A1A]'}`}
                  aria-label="Ajouter aux favoris"
                >
                  <Heart className={`w-4 h-4 ${isWishlist ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md transition-all text-[#1A1A1A]"
                  aria-label="Partager"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Flèches navigation */}
              {produit.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-[#1A1A1A]" />
                  </button>
                </>
              )}

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {produit.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                    className={`rounded-full transition-all ${i === currentImage ? 'bg-[#E30613] w-5 h-2' : 'bg-white/70 w-2 h-2'}`}
                  />
                ))}
              </div>

              {/* Compteur */}
              <span className="absolute bottom-3 right-4 text-xs text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {currentImage + 1} / {produit.images.length}
              </span>
            </div>

            {/* Miniatures */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {produit.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === currentImage ? 'border-[#E30613] shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  aria-label={`Vue ${i + 1}`}
                >
                  <img src={img} alt={`${produit.name} vue ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── BUY BOX STICKY ── */}
          <div className="lg:sticky lg:top-[112px] lg:self-start h-fit">
            {/* Marque + Catégorie */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm font-semibold text-[#1A1A1A]">
                {produit.brand}
              </span>
              <span className="text-sm text-[#6B6B6B]">{produit.category}</span>
              {produit.stock <= 3 && (
                <span className="ml-auto px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                  Plus que {produit.stock} en stock
                </span>
              )}
            </div>

            {/* H1 */}
            <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-tight mb-3">
              {produit.brand} {produit.name}
            </h1>

            {/* Note */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(produit.rating) ? 'fill-[#E30613] text-[#E30613]' : 'text-[#E5E5E5]'}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#1A1A1A]">{produit.rating}</span>
              <span className="text-sm text-[#6B6B6B]">({produit.reviewCount} avis)</span>
              <a href="#reviews" className="text-sm text-[#E30613] hover:underline ml-auto">Lire les avis</a>
            </div>

            {/* Prix */}
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-4xl font-black text-[#E30613]">{formatPrice(produit.price)}</span>
              {produit.oldPrice && (
                <span className="text-lg text-[#6B6B6B] line-through">{formatPrice(produit.oldPrice)}</span>
              )}
              {discount && (
                <span className="px-2 py-0.5 bg-[#E30613]/10 text-[#E30613] text-sm font-bold rounded-lg">
                  -{discount}%
                </span>
              )}
            </div>
            <p className="text-xs text-[#6B6B6B] mb-4">TVA incluse. Livraison gratuite.</p>

            {/* ── PAIEMENT FRACTIONNÉ ── */}
            <div className="p-4 bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl mb-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#E30613]" />
                  Paiement en plusieurs fois
                </p>
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                  Sans frais jusqu'à 4x
                </span>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                {installmentOptions.map((opt) => (
                  <button
                    key={opt.months}
                    onClick={() => setSelectedInstallment(opt.months)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all relative ${
                      selectedInstallment === opt.months
                        ? 'bg-[#1A1A1A] text-white shadow-md'
                        : 'bg-white text-[#1A1A1A] border border-[#E5E5E5] hover:border-[#1A1A1A]'
                    }`}
                  >
                    {opt.label}
                    {opt.months === 10 && (
                      <span className={`absolute -top-2 -right-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full leading-none ${
                        selectedInstallment === 10 ? 'bg-white text-[#1A1A1A]' : 'bg-[#E30613] text-white'
                      }`}>
                        {opt.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Résultat temps réel */}
              <div className="bg-white rounded-xl p-3 border border-[#E5E5E5]">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-black text-[#E30613]">{formatPrice(monthlyAmount)}</span>
                  <span className="text-sm text-[#6B6B6B] font-medium">/mois × {selectedInstallment}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6B6B6B]">
                    {activeInstallment.fee === 0
                      ? `Total : ${formatPrice(totalCart)} — sans frais`
                      : `Total : ${formatPrice(totalWithFee)} (frais : ${formatPrice(totalWithFee - totalCart)})`
                    }
                  </span>
                  {activeInstallment.fee === 0 && (
                    <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Gratuit
                    </span>
                  )}
                </div>
              </div>

              {/* Logos partenaires */}
              <p className="text-[10px] text-[#AAAAAA] mt-2 text-center">
                Sous réserve d'acceptation. Offre proposée par Alma · Cofidis
              </p>
            </div>

            <div className="h-px bg-[#E5E5E5] mb-5" />

            {/* Couleur */}
            <div className="mb-5">
              <p className="text-sm font-medium text-[#1A1A1A] mb-2">
                Couleur : <span className="text-[#6B6B6B] font-normal">{selectedColor.name}</span>
              </p>
              <div className="flex gap-2">
                {produit.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    title={c.name}
                    className={`w-10 h-10 rounded-full border-4 transition-all ${selectedColor.name === c.name ? 'border-[#E30613] scale-110 shadow-md' : 'border-white shadow-sm hover:scale-105'}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Taille */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-[#1A1A1A]">
                  Taille {selectedSize && `: ${selectedSize}`}
                </p>
                <button onClick={() => setShowSizeGuide(true)} className="text-xs text-[#E30613] hover:underline">
                  Guide des tailles
                </button>
              </div>
              <div className="flex gap-2">
                {produit.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-12 h-12 rounded-xl font-semibold text-sm transition-all ${selectedSize === s ? 'bg-[#1A1A1A] text-white shadow-lg scale-105' : 'bg-[#F5F5F5] text-[#1A1A1A] hover:bg-[#E5E5E5]'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-[#E5E5E5] mb-5" />

            {/* Quantité */}
            <div className="flex items-center gap-4 mb-4">
              <p className="text-sm font-medium text-[#1A1A1A]">Quantité :</p>
              <div className="flex items-center border border-[#E5E5E5] rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F5F5] transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-semibold text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F5F5] transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500" /> En stock
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-5">
              <button className="w-full btn-primary justify-center py-4 text-base">
                <ShoppingCart className="w-5 h-5" />
                Ajouter au panier — {formatPrice(produit.price * quantity)}
              </button>
              <Link
                to={`/essai-en-magasin?velo=${id || produit.id}`}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-[#1A1A1A] text-[#1A1A1A] font-semibold hover:bg-[#1A1A1A] hover:text-white transition-all"
              >
                <Calendar className="w-5 h-5" />
                Essayer en magasin
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#F5F5F5] rounded-2xl mb-4">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto mb-1 text-[#E30613]" />
                <span className="text-xs text-[#1A1A1A] font-medium leading-tight block">Livraison<br/>gratuite</span>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 mx-auto mb-1 text-[#E30613]" />
                <span className="text-xs text-[#1A1A1A] font-medium leading-tight block">Garantie<br/>2 ans</span>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 mx-auto mb-1 text-[#E30613]" />
                <span className="text-xs text-[#1A1A1A] font-medium leading-tight block">Retour<br/>30 jours</span>
              </div>
            </div>

            {/* Aide */}
            <a href="tel:+33493740803" className="flex items-center gap-3 text-sm text-[#6B6B6B] hover:text-[#E30613] transition-colors group">
              <div className="w-8 h-8 rounded-full bg-[#E30613]/10 flex items-center justify-center group-hover:bg-[#E30613]/20 transition-colors">
                <Phone className="w-4 h-4 text-[#E30613]" />
              </div>
              <span>Besoin de conseils ? <strong className="text-[#1A1A1A]">04 93 74 08 03</strong></span>
            </a>
          </div>
        </div>
      </section>

      {/* ── BÉNÉFICES ── */}
      <section className="border-y border-[#E5E5E5] py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {produit.benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-4 group">
                <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#E30613]/10 group-hover:bg-[#E30613] transition-colors">
                  <b.icon className="w-5 h-5 text-[#E30613] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-1 text-sm">{b.title}</h3>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONGLETS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Nav onglets */}
        <div className="flex gap-1 border-b border-[#E5E5E5] mb-10 overflow-x-auto">
          {([
            { key: 'desc', label: 'Description' },
            { key: 'specs', label: 'Spécifications' },
            { key: 'reviews', label: `Avis (${produit.reviewCount})` },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              id={tab.key === 'reviews' ? 'reviews' : undefined}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all -mb-px ${
                activeTab === tab.key
                  ? 'border-[#E30613] text-[#E30613]'
                  : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Description */}
        {activeTab === 'desc' && (
          <div className="grid lg:grid-cols-[1fr_340px] gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">{produit.brand} {produit.name} — Présentation</h2>
              <div className="prose prose-sm max-w-none text-[#1A1A1A] space-y-4">
                {produit.fullDescription.split('\n\n').map((p, i) => (
                  <p key={i} className="text-[#6B6B6B] leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
            <div className="bg-[#F5F5F5] rounded-2xl p-6 h-fit">
              <h3 className="font-bold text-[#1A1A1A] mb-4">Points clés</h3>
              <ul className="space-y-3">
                {produit.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#E30613] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#1A1A1A]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Spécifications */}
        {activeTab === 'specs' && (
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Fiche technique</h2>
            <div className="bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden">
              {Object.entries(produit.specs).map(([key, value], i) => (
                <div key={key} className={`flex items-start gap-4 px-6 py-4 ${i % 2 === 0 ? 'bg-[#F9F9F9]' : 'bg-white'} ${i < Object.keys(produit.specs).length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}>
                  <span className="text-sm text-[#6B6B6B] w-40 flex-shrink-0 font-medium">{key}</span>
                  <span className="text-sm text-[#1A1A1A] font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Avis */}
        {activeTab === 'reviews' && (
          <div id="reviews-content">
            <div className="flex items-center gap-6 mb-10">
              <div className="text-center">
                <p className="text-6xl font-black text-[#1A1A1A]">{produit.rating}</p>
                <div className="flex justify-center gap-0.5 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#E30613] text-[#E30613]" />
                  ))}
                </div>
                <p className="text-sm text-[#6B6B6B]">{produit.reviewCount} avis vérifiés</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = stars === 5 ? 10 : stars === 4 ? 2 : 0;
                  return (
                    <div key={stars} className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                      <span className="w-3 text-right">{stars}</span>
                      <Star className="w-3 h-3 fill-[#E30613] text-[#E30613]" />
                      <div className="flex-1 h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#E30613] rounded-full" style={{ width: `${(count / produit.reviewCount) * 100}%` }} />
                      </div>
                      <span className="w-4">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              {produit.reviews.map((review, i) => (
                <article key={i} className="bg-white border border-[#E5E5E5] rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#1A1A1A]">{review.name}</span>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            <BadgeCheck className="w-3 h-3" /> Achat vérifié
                          </span>
                        )}
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? 'fill-[#E30613] text-[#E30613]' : 'text-[#E5E5E5]'}`} />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-[#6B6B6B]">{review.date}</span>
                  </div>
                  <p className="font-semibold text-[#1A1A1A] mb-2 text-sm">{review.title}</p>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">"{review.text}"</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">Questions fréquentes</h2>
          <div className="space-y-3">
            {produit.faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#E5E5E5]" itemScope itemType="https://schema.org/Question">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#F9F9F9] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#1A1A1A] text-sm pr-4" itemProp="name">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#6B6B6B] flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5" itemScope itemType="https://schema.org/Answer">
                    <p className="text-sm text-[#6B6B6B] leading-relaxed" itemProp="text">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Un doute ? Venez l'essayer.</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto text-sm">
            Nos experts sont disponibles en magasin ou par téléphone pour vous guider dans le choix parfait.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:+33493740803" className="btn-primary justify-center">
              <Phone className="w-5 h-5" />
              04 93 74 08 03
            </a>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <MapPin className="w-4 h-4" />
              32 Avenue de Nice, Antibes
            </div>
          </div>
        </div>
      </section>

      {/* ── BARRE MOBILE STICKY ── */}
      {/* Toujours visible sur mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E5E5] px-4 py-3 flex items-center gap-3 shadow-2xl">
        <div className="min-w-0">
          <p className="text-xs text-[#6B6B6B] truncate">{produit.brand} {produit.name}</p>
          <p className="text-lg font-black text-[#E30613] leading-tight">{formatPrice(produit.price * quantity)}</p>
        </div>
        <button className="flex-1 btn-primary justify-center py-3">
          <ShoppingCart className="w-4 h-4" />
          Ajouter au panier
        </button>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <img
            src={produit.images[currentImage]}
            alt={`${produit.name} - agrandie`}
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {produit.images.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }} className={`rounded-full transition-all ${i === currentImage ? 'bg-white w-5 h-2' : 'bg-white/40 w-2 h-2'}`} />
            ))}
          </div>
        </div>
      )}

      {/* ── GUIDE DES TAILLES ── */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowSizeGuide(false)} />
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#1A1A1A]">Guide des tailles</h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-[#6B6B6B] hover:text-[#1A1A1A]"><X className="w-5 h-5" /></button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E5E5]">
                  <th className="text-left py-2 text-[#6B6B6B] font-medium">Taille</th>
                  <th className="text-left py-2 text-[#6B6B6B] font-medium">Hauteur</th>
                  <th className="text-left py-2 text-[#6B6B6B] font-medium">Entrejambe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {[['S', '155–165 cm', '71–76 cm'], ['M', '165–175 cm', '76–81 cm'], ['L', '175–185 cm', '81–86 cm'], ['XL', '185–195 cm', '86–91 cm']].map(([s, h, e]) => (
                  <tr key={s}>
                    <td className="py-2.5 font-semibold text-[#1A1A1A]">{s}</td>
                    <td className="py-2.5 text-[#6B6B6B]">{h}</td>
                    <td className="py-2.5 text-[#6B6B6B]">{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-[#6B6B6B] mt-4">En cas de doute, venez essayer en magasin — conseil gratuit.</p>
          </div>
        </div>
      )}


      <Footer />
    </div>
  );
}
