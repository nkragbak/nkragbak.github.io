# Regler for arbejde på nkragbak.github.io

Gælder for alle, der ændrer sitet – mennesker og AI-agenter. Formålet er, at
designet forbliver ét sammenhængende system i stedet for mange næsten ens
løsninger. Reglerne bliver udvidet, efterhånden som designsystemet bliver
ryddet op; hver regel er godkendt af Niels.

Sitet er statisk HTML. Al CSS ligger i `assets/css/styles.css`, al delt JS i
`assets/js/app.js`. Der er ingen byggetrin.

## 1. Udseendet er godkendt – ændr det ikke som bivirkning

- Oprydning i CSS og HTML må **ikke** ændre, hvordan siderne ser ud.
- En synlig ændring kræver, at Niels har bedt om den eller godkendt den.
  Små ensretninger (fx en nuance, der afviger fra resten af sitet) skal
  nævnes konkret med før/efter, ikke gemmes i en større ændring.
- Bevis det: kør den visuelle sammenligning (afsnit 5) før hver commit, der
  rører CSS, HTML eller JS, og forklar hver side, der står som `ÆNDRET`.

## 2. Brug design-tokens, ikke løse værdier

Tokens står i `:root` øverst i `styles.css`.

- Farver: brug altid en eksisterende `var(--…)`. En ny farve kræver et nyt,
  navngivet token med kommentar – aldrig en hex-værdi direkte i en regel.
  Findes værdien allerede som token, så brug tokenet.
- Afstand mellem blokke i en sektion (citatboks, knaprække, tekst under
  knapper): `var(--space-block)`.
- Ankerhop under det sticky sidehoved (`scroll-margin-top`, `top` på
  sticky elementer): `var(--anchor-offset)`.
- Afrunding: `var(--radius)`, `var(--radius-sm)`, `var(--radius-control)`
  eller `999px` for piller.
- Skriftstørrelser: altid et trin fra skalaen, aldrig en løs `rem`-værdi.
  Overskrifter (`h1`, `h2`, `.page-intro h1`) og `.lead` har deres egne
  flydende `clamp()`-størrelser – dem bruger du ved at bruge elementet.

  | Token | Størrelse | Bruges til |
  |---|---|---|
  | `--fs-2xs` | 0,7 rem | Akser og etiketter i diagrammer, små mærkater |
  | `--fs-xs` | 0,78 rem | Eyebrows, signaturforklaringer, mærkater, figurtekster |
  | `--fs-sm` | 0,85 rem | Hjælpetekst, kilder, tabeller, chips på mobil |
  | `--fs-md` | 0,9 rem | Chips, footer, kompakt brødtekst i kort |
  | `--fs-base` | 1 rem | Brødtekst |
  | `--fs-lg` | 1,1 rem | Fremhævet tekst, små overskrifter |
  | `--fs-xl` | 1,25 rem | `h3` |
  | `--fs-2xl` | 1,5 rem | Store `h3` og nøgletal |

  Passer ingen af trinene, så brug det nærmeste. Et nyt trin kræver
  Niels' godkendelse.
- Dæmpet tekst: `var(--muted)`. Brødtekst i længere tekster:
  `var(--text-body)`. Tekst på samme niveau skal have samme farve – fx har
  supplerende tekst under forsidens knapper samme stil som forsidens
  øvrige sektionstekst (`.hero-note`).

## 3. Kort: brug den fælles komponent

Enhver afgrænset flade (hvid boks med kant og afrunding) er et kort:

| Klasse | Bruges til |
|---|---|
| `card` | Grundkortet: hvid flade, kant, `--radius`, padding 1.5rem |
| `card card-sm` | Mindre kort i gitre og diagrammer (`--radius-sm`) |
| `card card-inset` | Kort inde i et andet kort (sidens baggrundsfarve) |
| `card card-accent` | Fremhævet kort i grøn tone (afslutninger, samlede spor) |

- Skriv aldrig `background`, `border` og `border-radius` for en flade igen
  i en ny klasse. Tilføj `card` (+ variant) i HTML'en, og brug kun en egen
  klasse (fx `focus-card`) til det, der reelt er særligt: padding, margin,
  layout, indre typografi.
- `card`-reglerne står i `:where()` og har specificitet 0, så en egen
  klasse altid kan justere dem uden `!important` eller rækkefølge-tricks.
- Tekst i kort er som standard dæmpet (`--muted`). Skal den være mørk, så
  sæt det i kortets egen klasse.
- Ny variant kun hvis ingen eksisterende passer – og så tilføjes den i
  `card`-blokken og i tabellen her.
- `.ep-table-wrap` er en scroll-container til tabeller, ikke et kort.

## 3b. Fremhævede bokse: brug `callout`

En boks med farvet venstrekant er en `callout`:

| Klasse | Bruges til |
|---|---|
| `callout` | Grøn tone og grøn kant: noter og pointer |
| `callout callout-warn` | Hvid flade med orange kant: forbehold og advarsler |
| `callout callout-quiet` | Kun en lys kant, ingen flade: spørgsmål i en tekst |

- Venstrekanten er altid 4 px. Skriv aldrig en ny `border-left`-boks selv.
- Står i `:where()` ligesom `card`. En egen klasse (fx `focus-principle`,
  der er en større callout med fed tekst) justerer kun padding, bredde og
  typografi.
- `.ep-verdict` (simulatorens resultatlinje uden kant) er ikke en callout.

## 3c. Piller: `chip` (klikbar) og `badge` (fast mærkat)

| Klasse | Bruges til |
|---|---|
| `chip` | Klikbar pille, link eller knap: hop mellem afsnit, emner |
| `chip chip-control` | Grå knap-variant: valg i et værktøj (simulatorens forvalg) |
| `chip` + `aria-pressed="true"` | Valgt chip (grøn) – styres af `aria-pressed`, ikke en klasse |
| `badge` | Lille fast mærkat, ikke klikbar: "Ændring 1", "Forslag 2" |
| `badge badge-warn` | Gul mærkat: skøn og forbehold |
| `badge badge-sm` | Mindre mærkat i tabeller og tætte diagrammer |

- En række chips placeres i en container (fx `.focus-jump`), der kun styrer
  layout (flex, gap, margin). Selve pillen er altid `chip`.
- Står i `:where()` ligesom `card`. En egen klasse må kun tilføje det, der
  er særligt (fx højere trykflade på mobil eller versaler i `.ep-state`).
- Klikbar = `chip`, ikke klikbar = `badge`. Bland dem ikke.
- `.detail-control` ("Udvid alle"/"Luk alle") er en kantet knap, ikke en
  chip.
- Den globale linkfarve står i `:where(a)` (specificitet 0), så en
  komponent altid kan sætte sin egen linkfarve.

## 4. Klasser og struktur

- Ingen døde klasser: en klasse i HTML skal bruges af CSS eller JS, og en
  klasse i CSS skal findes i HTML eller JS. Klasser, der kun sættes fra JS,
  står i JS-skabelonerne (fx `ep-c-*` og `ep-lever`).
- Genbrug før du opfinder. Findes der en komponent, der næsten passer, så
  udvid den med en variant frem for at lave en ny kopi.
- Undgå specificitets-kampe (`.x p.y` alene for at slå `.x p`). Står du og
  skal skrive en, er grundreglen sandsynligvis for bred.
- Breakpoints står i oversigten øverst i `styles.css`. Brug et eksisterende.
- Følg den nummererede indholdsfortegnelse øverst i `styles.css`: nye
  regler placeres i det afsnit, de hører til.

## 5. Visuel sammenligning

```bash
node tools/visuel-sammenligning.mjs
```

Tager skærmbilleder af alle sider (desktop 1280 px og mobil 390 px, med alle
foldefelter åbne) i `HEAD` og i arbejdskopien og sammenligner dem pixel for
pixel. Angiv en anden git-ref og en output-mappe som argumenter efter behov.
Skriptet afslutter med kode 1, hvis noget er ændret, og fortæller hvor
skærmbillederne ligger.

## 6. Arbejdsgang: pull requests

- Medmindre andet er aftalt, laver en agent sine ændringer på en separat
  branch og opretter en pull request mod `main`.
- Vurderer agenten, at ændringen er meget lille (fx en tastefejl eller en
  enkelt formulering), må den **spørge** Niels, om den skal merges direkte
  til `main` i stedet. Uden et ja oprettes en pull request.
- En agent pusher aldrig direkte til `main` på eget initiativ – et push til
  `main` udgiver sitet (afsnit 7).
- Beskriv i pull requesten, hvad der er ændret, og om udseendet er ændret
  (med før/efter fra den visuelle sammenligning, afsnit 5).
- Er en pull request merget, er dens branch færdig: den slettes, og nyt
  arbejde starter på en frisk branch fra `main` (eller samme navn startet
  forfra fra `main`). Byg aldrig videre på en allerede merget branch.
- Der må kun være to branches på GitHub: `main` og den branch, der arbejdes
  på lige nu. Find en agent andre branches, tjekker den, om indholdet er på
  `main`. Er det, slettes de. Er det ikke, spørger den Niels.
- Kan agenten ikke selv slette en branch, giver den Niels navnene og
  kommandoen, fx `git push origin --delete <branch>`.

## 7. Udgivelse

Push til `main` udgiver sitet via `.github/workflows/udgiv-site.yml`, som
selv sætter cache-buster (`?v=…`) på `styles.css` og `app.js`. Ret ikke
versionsnumrene i hånden.
