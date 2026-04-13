# Analyse complète — Kalissea Agency Website
> Préparée pour planification avec Copilot

---

## 1. BUGS & PROBLÈMES CRITIQUES (à corriger en priorité)

### 1.1 SEO — Internationalisation cassée
**Fichier : `src/app/page.tsx` + `src/app/services/[slug]/page.tsx`**

```tsx
// PROBLÈME : les deux langues pointent vers la même URL
alternates: {
  canonical: "https://kalissea.com/",
  languages: {
    'fr': 'https://kalissea.com/',   // identique
    'en': 'https://kalissea.com/',   // identique
    'x-default': 'https://kalissea.com/',
  },
},
```

Google voit deux versions linguistiques identiques → pas de signal hreflang. Il faut soit :
- Des sous-répertoires (`/en/`, `/fr/`) — recommandé pour le SEO
- Des sous-domaines (`en.kalissea.com`)
- Ou supprimer le hreflang si une seule version est indexée

La langue est détectée via cookie (`i18next`), ce qui est **invisible pour les crawlers**. Google servira toujours la version par défaut.

### 1.2 `longDescription` rendu deux fois
**Fichier : `src/client/components/ServiceDetailTemplate.tsx`**

```tsx
{/* Long Description Section - SEO Content */}
{longDescription && (
  <section className="px-6 py-20 bg-muted/20"> {/* ligne ~160 */}
    ...
  </section>
)}

{/* Long Description Section - SEO Content */}
{longDescription && (
   <section className="px-6 py-20 bg-background"> {/* ligne ~198 */}
     ...
   </section>
)}
```

Le même contenu est affiché deux fois → duplication de contenu, pénalité SEO potentielle, mauvaise UX.

### 1.3 Texte hardcodé en anglais dans Pricing
**Fichier : `src/client/components/Pricing.tsx`**

```tsx
<motion.p className="text-sm text-muted-foreground mb-4">
  Payment after shipping  {/* ← pas dans les fichiers i18n */}
</motion.p>
```

Un visiteur français voit "Payment after shipping" dans une interface française.

### 1.4 Schema LocalBusiness — téléphone vide + incohérence géographique
**Fichier : `src/app/services/[slug]/page.tsx`**

```tsx
"telephone": "",           // champ vide → invalide pour rich snippets
"areaServed": { "name": "CA" }  // Canada
```

Mais les CTA WhatsApp pointent vers `+33695925556` (France). Google détecte l'incohérence.

### 1.5 LanguageSwitcher — rechargement brutal
**Fichier : `src/client/components/LanguageSwitcher.tsx`**

```tsx
window.location.reload(); // recharge complète la page
```

Détruit l'état React, le scroll, et crée une mauvaise expérience. À remplacer par `router.refresh()` de Next.js ou une transition douce.

### 1.6 Lenis touchMultiplier beaucoup trop élevé
**Fichier : `src/client/providers/LenisProvider.tsx`**

```tsx
touchMultiplier: 30,  // valeur standard : 2
```

Sur mobile, le scroll sera hyper-sensible et incontrôlable. Valeur recommandée : 1.5–2.

### 1.7 `Results` section — padding trop petit
**Fichier : `src/client/components/Results.tsx`**

```tsx
<section id="results" className="py-1 px-6 bg-card/50">
```

`py-1` (4px) vs toutes les autres sections à `py-24` (96px) → visuellement coupé et incohérent.

---

## 2. PROBLÈMES SEO

### 2.1 Architecture URL — pas adaptée au SEO multilingue
Situation actuelle : langue via cookie → Google n'indexe qu'une version.

**Plan recommandé :**
```
/                     → redirect vers /fr/ (ou detección auto)
/fr/                  → page française canonique
/en/                  → page anglaise canonique
/fr/services/[slug]   → page service français
/en/services/[slug]   → page service anglais
```

Avec Next.js App Router, utiliser `[locale]` dans le dossier `app/`.

### 2.2 Pas de sitemap.xml
Aucun `sitemap.ts` trouvé dans le projet. À créer :

```tsx
// src/app/sitemap.ts
export default function sitemap() {
  return [
    { url: 'https://kalissea.com/', lastModified: new Date() },
    { url: 'https://kalissea.com/services/website-creation', ... },
    // etc.
  ]
}
```

### 2.3 Pas de robots.txt
À créer :
```
// src/app/robots.ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://kalissea.com/sitemap.xml',
  }
}
```

### 2.4 Pas de blog / contenu éditorial
Zéro article → pas de trafic long tail. C'est la lacune SEO la plus impactante sur le long terme.

Chaque service devrait avoir au moins 2–3 articles qui lui renvoient des liens internes :
- "Comment choisir une agence web en 2025"
- "Automatisation vs embauche : ROI comparé"
- "Checklist SEO technique pour e-commerce"

### 2.5 Images sans lazy loading optimisé sur Portfolio
**Fichier : `src/client/components/Portfolio.tsx`**

Les 12 images de portfolio sont toutes importées statiquement. Seule la première devrait avoir `priority`, les autres bénéficieraient de `loading="lazy"` (Next.js Image le fait par défaut sauf si `priority` est spécifié, mais l'import statique all-in-one peut peser sur le bundle initial).

### 2.6 Core Web Vitals — IsometricCube bloque le LCP
**Fichier : `src/client/components/IsometricCube.tsx`**

Three.js (625+ Ko minifié) est chargé pour l'arrière-plan hero. Même avec `ssr: false`, le JS est quand même téléchargé côté client au premier rendu. Cela peut impacter le LCP (Largest Contentful Paint).

**Solutions :**
- Ajouter `loading="lazy"` avec IntersectionObserver (déjà partiellement fait)
- Considérer une animation CSS pure ou un canvas 2D plus léger pour mobile
- Utiliser `prefers-reduced-motion` pour désactiver l'animation si l'utilisateur le préfère

---

## 3. PROBLÈMES UX

### 3.1 FlipCard inutilisable sur mobile
**Fichier : `src/client/components/FlipCard.tsx`**

Le composant FlipCard utilise `onMouseEnter` / `onMouseLeave`. Sur mobile, il n'y a pas de hover → le contenu verso (features/détails) est totalement inaccessible pour ~60% des visiteurs.

**Solution :** Ajouter `onTouchStart` pour toggle sur mobile, ou utiliser un accordion sur mobile.

### 3.2 Pricing — `popular: false` pour tous les plans
**Fichier : `src/client/components/Pricing.tsx`**

```tsx
{ key: "essential", popular: false, ... },
{ key: "popular",   popular: false, ... },  // ← s'appelle "popular" mais n'est pas mis en avant !
{ key: "ultimate",  popular: false, ... },
```

Le plan "popular" n'a aucun badge "Populaire". C'est une opportunité CRO manquée — mettre en avant un plan augmente les conversions de 15–30%.

### 3.3 Pas de CTA sticky visible en permanence
Le bouton "Obtenir un devis" est uniquement dans le header. Sur une longue page, l'utilisateur scrolle et perd le CTA de vue. Recommandé : CTA sticky en bas sur mobile, ou floating button secondaire.

### 3.4 Contact — uniquement WhatsApp
**Fichier : `src/client/components/Contact.tsx`**

Le formulaire de contact est entièrement commenté. L'unique option est WhatsApp. Problème :
- Certains visiteurs n'utilisent pas WhatsApp
- Pas de Calendly → pas de booking direct
- Perte de leads qui ne veulent pas d'échange WhatsApp

**Recommandé :** Ré-activer un formulaire simple + intégrer Calendly inline.

### 3.5 Section Process — manque d'impact visuel
**Fichier : `src/client/components/Process.tsx`**

5 étapes listées horizontalement, sans visuels ni icônes distinctives. Chaque étape a juste un numéro et du texte. L'animation de la ligne de connexion est bien, mais les étapes elles-mêmes manquent de substance visuelle pour être mémorables.

### 3.6 Navigation — lien "Automation Flow" externe dans le menu
**Fichier : `src/client/components/Header.tsx`**

```tsx
{ href: "https://automation.kalissea.com", label: t('header.automationFlow'), external: true },
```

Un lien qui quitte le site est dans la nav principale → distraction, perte de session. Mieux : le mettre dans un sous-menu ou dans le footer.

### 3.7 Scroll fluide Lenis vs animations Framer Motion
Lenis et Framer Motion `useScroll` peuvent entrer en conflit. Lenis intercepte les événements scroll, ce qui peut désynchroniser les transforms parallax de Framer Motion. À vérifier en production et potentiellement remplacer `useScroll` par des callbacks Lenis.

---

## 4. LACUNES DE CONTENU & STRUCTURE

### 4.1 Pas de page "À propos"
Aucune page `/about`. Pour une agence, la crédibilité personnelle est cruciale. Les visiteurs veulent savoir à qui ils font confiance. Sans cette page, le taux de rebond sera élevé sur les services.

### 4.2 Pas de page "Case Studies"
Le portfolio montre des screenshots, pas des résultats. 3–5 études de cas avec :
- Contexte client (secteur, problème)
- Solution apportée
- Résultats mesurables (chiffres)
→ Outil de conversion bien plus puissant que des screenshots.

### 4.3 Stats Hero — non vérifiables
```tsx
{ value: "50+", label: t("hero.stats.projects") },
{ value: "100%", label: t("hero.stats.satisfaction") },
{ value: "5 days", label: t("hero.stats.delivery") },
{ value: "24/7", label: t("hero.stats.support") },
```

"100% satisfaction" sans preuve sociale = peu crédible. "5 days delivery" peut être contre-productif si perçu comme "trop vite = peu de soin". Remplacer par des stats vérifiables ou supprimer.

### 4.4 Footer — lien submithunt.com sans badge
**Fichier : `src/client/components/Footer.tsx`**

```tsx
<a href="https://submithunt.com" ...>
  {/* No badge image provided */}
</a>
```

Lien vide qui ne sert à rien, génère potentiellement une erreur ou un lien invisible.

### 4.5 Pricing — images portfolio référencées inexistantes
```tsx
image: "/images/results/alplomberie.avif",  // dans le dossier public ?
image: "/images/results/viced.avif",
image: "/images/results/mamamouchou.avif",  // ← "mamamouchou" → projet non listé
```

À vérifier que ces fichiers existent bien dans `/public/images/results/`.

---

## 5. PERFORMANCE

### 5.1 Bundle Three.js trop lourd
`IsometricCube.tsx` importe directement depuis `'three'`. Même tree-shakeable, Three.js est lourd. Pour une animation de grille de cubes simple, une implémentation Canvas 2D pure serait 10x plus légère.

### 5.2 Animations en boucle sur tous les éléments
Dans `Testimonials`, `Features`, `Process`, `Portfolio` — quasiment chaque élément a une animation `repeat: Infinity`. Sur des machines moins puissantes (mobile bas de gamme), cela consomme du CPU en continu.

**Solution :** Utiliser `useReducedMotion` de Framer Motion :
```tsx
import { useReducedMotion } from 'framer-motion';
const shouldReduceMotion = useReducedMotion();
// désactiver les animations repeat si true
```

### 5.3 Pas de lazy loading pour les images avif du portfolio
Les 12 images avif du portfolio sont importées statiquement en haut du fichier. Next.js les optimise, mais l'import statique les inclut dans le bundle d'analyse au moment du build, ce qui peut allonger le build time.

---

## 6. PLAN D'ACTION PRIORITISÉ

### 🔴 Sprint 1 — Corrections critiques (1 semaine)
1. Supprimer la duplication de `longDescription` dans `ServiceDetailTemplate`
2. Corriger `popular: true` pour le plan "popular" dans Pricing
3. Corriger `py-1` → `py-24` dans `Results`
4. Supprimer le lien submithunt.com vide dans Footer
5. Corriger `touchMultiplier: 30` → `2` dans Lenis
6. Ajouter `useReducedMotion` sur les animations `repeat: Infinity`
7. Rendre FlipCard accessible au touch (mobile)
8. Supprimer "Payment after shipping" hardcodé → traduire

### 🟡 Sprint 2 — SEO fondamental (2 semaines)
1. Créer `sitemap.ts` Next.js
2. Créer `robots.ts` Next.js
3. Corriger le schema LocalBusiness (téléphone, zone géographique)
4. Choisir une stratégie d'internationalisation claire (sous-répertoires recommandés)
5. Implémenter `next-intl` pour le routing multilingue avec hreflang correct
6. Supprimer le double rendu `longDescription`

### 🟢 Sprint 3 — UX & Conversion (3 semaines)
1. Réactiver le formulaire de contact (Formspree ou Resend)
2. Intégrer Calendly inline dans la section Contact
3. Ajouter un CTA sticky mobile en bas de page
4. Créer la page `/about` (ou `/qui-sommes-nous`)
5. Transformer 2–3 projets portfolio en vraies case studies
6. Déplacer le lien "Automation Flow" hors de la nav principale

### 🔵 Sprint 4 — Contenu & Blog (ongoing)
1. Configurer un CMS (Sanity déjà dans les connectors disponibles !)
2. Créer la structure `/blog` avec Next.js
3. Rédiger 5 articles ciblant les mots-clés services
4. Maillage interne : article → page service correspondante

### ⚪ Sprint 5 — Performance & Animations (2 semaines)
1. Remplacer Three.js IsometricCube par Canvas 2D ou CSS animation sur mobile
2. Auditer et réduire les animations `repeat: Infinity`
3. Implémenter `prefers-reduced-motion` globalement
4. Corriger la synchronisation Lenis / Framer Motion `useScroll`
5. Audit Lighthouse complet → objectif 90+ sur toutes les métriques

---

## 7. STACK RECOMMANDÉE (alignée avec ce que tu as déjà)

| Besoin | Actuel | Recommandé |
|--------|--------|------------|
| i18n routing | Cookie + reload | `next-intl` avec `/[locale]/` |
| CMS Blog | — | Sanity (déjà connecté) |
| Contact form | Commenté | Resend + React Hook Form |
| Booking | — | Calendly embed |
| Animations | Framer Motion | Garder + ajouter `useReducedMotion` |
| Smooth scroll | Lenis | Garder, corriger config |
| SEO | Partiel | Ajouter sitemap, robots, schema complet |
| Analytics | Ahrefs (script) | Ajouter Vercel Analytics + Web Vitals |

---

## 8. QUICK WINS CRO (Conversion Rate Optimization)

1. **Hero CTA** : "Démarrer un projet" → "Réserver un audit gratuit" (moins d'engagement perçu)
2. **Social proof** : Ajouter les logos clients dans la hero section (au-dessus de la fold)
3. **Plan populaire** : Mettre `popular: true` sur le plan intermédiaire → augmentation moyenne de +23% des conversions
4. **Contact WhatsApp** : Ajouter une alternative email visible AVANT le bouton WhatsApp
5. **Témoignages** : Ajouter photo/avatar réel plutôt qu'initiale → +35% de crédibilité perçue
6. **Portfolio** : Ajouter le lien "Voir le site live" avec icône externe sur chaque carte
7. **Process** : Ajouter une durée estimée à chaque étape ("Brief — 1 jour", "Design — 3 jours")

---

*Analyse basée sur : 90 fichiers sources, composants React/Next.js, configuration i18n, schémas structurés, et meilleures pratiques SEO/UX 2025.*