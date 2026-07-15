import { SeoPageConfig } from '../types/seoPage';

const BASE_URL = 'https://www.foliensam.de';

export const HOME_SEO = {
  title: 'Autofolierung Berlin – Folierung, Tönung & PPF | FolienSam',
  description:
    'Ihr Folierer in Berlin-Weißensee ✔ 12+ Jahre Erfahrung ✔ 3M, Avery & Hexis ✔ 5 Jahre Garantie ➤ Jetzt Termin oder Angebot anfragen!',
  h1: 'Autofolierung & Fahrzeugveredelung in Berlin',
  canonicalPath: '/',
};

export const SERVICE_LINKS = [
  { path: '/autofolierung-berlin', labelKey: 'seoPages.services.autofolierung' },
  { path: '/vollfolierung-berlin', labelKey: 'seoPages.services.vollfolierung' },
  { path: '/scheibentoenung-berlin', labelKey: 'seoPages.services.scheibentoenung' },
  { path: '/lackschutzfolie-berlin', labelKey: 'seoPages.services.lackschutz' },
  { path: '/fahrzeugbeschriftung-berlin', labelKey: 'seoPages.services.beschriftung' },
  { path: '/felgenfolierung-berlin', labelKey: 'seoPages.services.felgen' },
];

export const SEO_HERO_IMAGES: Record<string, string> = {
  autofolierung: 'https://images.cood.ai/samgo/car1.png',
  vollfolierung: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80',
  scheibentoenung: 'https://images.cood.ai/samgo/car1.png',
  lackschutz: 'https://images.cood.ai/samgo/004.png',
  beschriftung: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80',
  felgen: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80',
  ratgeberKosten: 'https://images.cood.ai/samgo/car1.png',
  kontakt: 'https://images.cood.ai/samgo/hero.gif',
  referenzen: 'https://images.cood.ai/samgo/car1.png',
};

export const SEO_PAGES: Record<string, SeoPageConfig> = {
  autofolierung: {
    id: 'autofolierung',
    path: '/autofolierung-berlin',
    meta: {
      title: 'Autofolierung Berlin – Car Wrapping vom Profi | FolienSam',
      description:
        'Auto folieren in Berlin ✔ Voll- & Teilfolierung ✔ Premium-Folien von 3M, Avery & Hexis ✔ 5 Jahre Garantie ➤ Kostenloses Angebot anfragen!',
      h1: 'Autofolierung in Berlin – Ihr Auto, Ihr Design',
      canonicalPath: '/autofolierung-berlin',
    },
    intro:
      'Eine Autofolierung verändert die Farbe und den Look Ihres Fahrzeugs, ohne den Originallack anzutasten. Bei FolienSam in Berlin-Weißensee folieren wir Ihr Auto mit Premium-Folien von 3M, Avery Dennison und Hexis. Seit über 12 Jahren, mit mehr als 900 abgeschlossenen Projekten und 5 Jahren Garantie auf Material und Verarbeitung. Von der kompletten Vollfolierung bis zum folierten Dach: Sie sagen uns, wie Ihr Auto aussehen soll, wir setzen es um.',
    breadcrumbs: [
      { label: 'Startseite', path: '/' },
      { label: 'Autofolierung Berlin' },
    ],
    serviceName: 'Autofolierung in Berlin',
    schemaType: 'Service',
    sections: [
      {
        title: 'Unsere Folierungsarten',
        level: 2,
        blocks: [],
      },
      {
        id: 'teilfolierung',
        title: 'Vollfolierung',
        level: 3,
        blocks: [
          {
            type: 'paragraph',
            text: 'Bei der Vollfolierung wird das gesamte Fahrzeug in einer neuen Farbe oder einem neuen Finish foliert, ab 1.300 €. Das ist die richtige Wahl, wenn Sie einen kompletten Farbwechsel wollen oder den Lack großflächig schützen möchten. Alle Details zu Farben, Ablauf und Preisen finden Sie auf der Seite Vollfolierung in Berlin.',
          },
          {
            type: 'cta',
            linkTo: '/vollfolierung-berlin',
            linkLabel: 'Mehr zur Vollfolierung in Berlin',
          },
        ],
      },
      {
        title: 'Teilfolierung und Designfolierung',
        level: 3,
        blocks: [
          {
            type: 'paragraph',
            text: 'Eine Teilfolierung setzt gezielte Akzente, statt das ganze Auto zu verändern. Typische Projekte in unserer Werkstatt:',
          },
          {
            type: 'list',
            items: [
              'Dachfolierung: das Dach in Schwarz glänzend oder Carbon-Optik, der Klassiker unter den Teilfolierungen',
              'Motorhaube folieren: als Design-Akzent oder als Schutz vor Steinschlag',
              'Spiegelkappen und Zierleisten: kleine Flächen, große Wirkung',
              'Chrom-Delete: verchromte Zierleisten und Embleme werden schwarz foliert, für einen modernen, einheitlichen Look',
              'Akzentstreifen und individuelle Designs: nach Ihren Vorlagen oder gemeinsam mit uns entworfen',
            ],
          },
          {
            type: 'paragraph',
            text: 'Was kostet das? Eine Dachfolierung oder eine folierte Motorhaube ist deutlich günstiger als eine Vollfolierung, der Preis hängt von Fahrzeuggröße und Folie ab. Fragen Sie einfach mit einem Foto Ihres Fahrzeugs an, Sie bekommen ein konkretes Angebot.',
          },
        ],
      },
      {
        id: 'chromfolierung',
        title: 'Chromfolierung und Effektfolien',
        level: 3,
        blocks: [
          {
            type: 'paragraph',
            text: 'Sie wollen auffallen? Neben klassischen Farben verarbeiten wir auch Effektfolien: Chrom, gebürstetes Metall, Carbon-Struktur oder Farbwechsel-Folien. Wichtig zu wissen: Effekt- und Chromfolien haben herstellerbedingt eine kürzere Lebensdauer als Unifarben. Wir beraten Sie ehrlich, welche Folie zu Ihrem Fahrzeug und Ihrer Nutzung passt.',
          },
        ],
      },
      {
        title: 'Folieren statt Lackieren: die Vorteile',
        level: 2,
        blocks: [
          {
            type: 'numbered-list',
            items: [
              'Der Originallack bleibt erhalten. Die Folie schützt ihn sogar vor kleinen Kratzern und Umwelteinflüssen. Das zahlt sich beim Wiederverkauf aus.',
              'Rückstandsfrei entfernbar. Unsere Folien lassen sich später wieder abnehmen, darunter kommt der unveränderte Lack zum Vorschein. Das macht Folierung auch für Leasingfahrzeuge interessant.',
              'Günstiger als eine vergleichbare Lackierung. Vor allem bei Sonderfarben und Effekten.',
              'Mehr Auswahl. Über 100 Farben und Finishes, von Matt über Satin bis Chrom, die es so als Lack oft gar nicht gibt.',
            ],
          },
        ],
      },
      {
        title: 'Premium-Folien von 3M, Avery Dennison und Hexis',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Wir verarbeiten ausschließlich Folien der drei führenden Hersteller: 3M, Avery Dennison und Hexis. Diese Folien sind UV-beständig, farbstabil und mit Easy-Removal-Technologie ausgestattet, lassen sich also später rückstandsfrei entfernen. Billigfolien verarbeiten wir nicht. Der Preisunterschied ist klein, der Qualitätsunterschied nach zwei Berliner Sommern gewaltig.',
          },
        ],
      },
      {
        title: 'So läuft Ihre Folierung ab',
        level: 2,
        blocks: [
          {
            type: 'numbered-list',
            items: [
              'Beratung und Angebot. Sie schicken uns Fotos Ihres Fahrzeugs per WhatsApp oder Formular, wir besprechen Farbe, Folie und Umfang. Sie bekommen ein konkretes Angebot.',
              'Reinigung und Vorbereitung. Das Fahrzeug wird gründlich gereinigt, der Lack auf Schäden geprüft.',
              'Demontage. Griffe, Leisten und Embleme werden fachgerecht abgebaut, damit die Folie sauber um alle Kanten gelegt werden kann.',
              'Folierung. Jede Komponente wird einzeln foliert, Kanten werden umgelegt und versiegelt.',
              'Qualitätskontrolle und Übergabe. Sie bekommen Ihr Auto mit Pflegehinweisen zurück.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Wie lange dauert eine Autofolierung? Für eine Vollfolierung sollten Sie 2 bis 3 Tage einplanen, Teilfolierungen gehen je nach Umfang deutlich schneller.',
          },
        ],
      },
      {
        title: 'Was kostet eine Autofolierung in Berlin?',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Der Preis richtet sich nach Fahrzeuggröße, Folienart und Aufwand. Als Orientierung: Eine Vollfolierung beginnt bei uns bei 1.300 €, Teilfolierungen liegen deutlich darunter. Effektfolien und komplexe Karosserien kosten mehr als Unifarben auf glatten Flächen. Eine ausführliche Übersicht mit Preisbeispielen finden Sie in unserem Ratgeber.',
          },
          {
            type: 'cta',
            linkTo: '/ratgeber/auto-folieren-kosten',
            linkLabel: 'Was kostet eine Autofolierung?',
          },
        ],
      },
      {
        title: 'Referenzen aus Berlin',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Über 900 Fahrzeuge haben unsere Werkstatt bereits foliert verlassen. Eine Auswahl mit Bildern und Videos finden Sie in unseren Referenzen.',
          },
          {
            type: 'cta',
            linkTo: '/referenzen',
            linkLabel: 'Referenzen ansehen',
          },
        ],
      },
      {
        title: 'Warum FolienSam?',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Sie geben Ihr Auto nicht irgendwem. Bei FolienSam foliert ein Team mit über 12 Jahren Erfahrung, Sie bekommen 5 Jahre Garantie auf Material und Verarbeitung und sprechen direkt mit dem Inhaber. Unsere Werkstatt liegt in Berlin-Weißensee, gut erreichbar aus Pankow, Prenzlauer Berg, Lichtenberg und Hohenschönhausen.',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Was kostet es, ein Auto folieren zu lassen?',
        answer:
          'Eine Vollfolierung kostet bei FolienSam ab 1.300 €, abhängig von Fahrzeuggröße und Folie. Teilfolierungen wie Dach oder Motorhaube sind deutlich günstiger. Ein Festpreis-Angebot bekommen Sie nach Zusendung von Fahrzeugfotos.',
      },
      {
        question: 'Was kostet es, die Motorhaube folieren zu lassen?',
        answer:
          'Der Preis für eine folierte Motorhaube hängt von Fahrzeuggröße und Folienart ab und liegt deutlich unter einer Vollfolierung. Senden Sie uns ein Foto, Sie erhalten ein konkretes Angebot.',
      },
      {
        question: 'Was kostet eine Dachfolierung?',
        answer:
          'Auch hier gilt: kleiner Umfang, kleiner Preis. Eine Dachfolierung in Schwarz glänzend oder Carbon-Optik gehört zu den günstigsten Folierungen.',
      },
      {
        question: 'Wie lange hält eine Autofolierung?',
        answer:
          'Hochwertige Folien von 3M, Avery Dennison und Hexis halten bei guter Pflege viele Jahre. Die Haltbarkeit hängt von Folientyp, Nutzung und Pflege ab. Unifarben halten länger als Effekt- und Chromfolien.',
      },
      {
        question: 'Kann ich ein Leasingauto folieren lassen?',
        answer:
          'Ja, in der Regel schon, weil sich die Folie rückstandsfrei entfernen lässt und der Originallack erhalten bleibt. Klären Sie die Folierung vorab mit Ihrem Leasinggeber und lassen Sie die Folie vor der Rückgabe fachgerecht entfernen.',
      },
      {
        question: 'Darf ich mit foliertem Auto in die Waschanlage?',
        answer:
          'Ja. Nach einer Schonfrist von etwa drei Wochen können Sie das Fahrzeug normal waschen. Bei Hochdruckreinigern gilt: Abstand halten, besonders an den Folienkanten.',
      },
      {
        question: 'Muss eine Folierung eingetragen werden?',
        answer:
          'Eine Eintragung beim TÜV ist nicht nötig. Bei einem kompletten Farbwechsel muss die neue Fahrzeugfarbe aber der Zulassungsstelle gemeldet werden. Wir weisen Sie bei der Übergabe darauf hin.',
      },
      {
        question: 'Folieren oder lackieren, was ist besser?',
        answer:
          'Für die meisten Zwecke die Folierung: Sie ist reversibel, schützt den Originallack und bietet mehr Farbauswahl. Eine Lackierung ist dann sinnvoll, wenn Lackschäden repariert werden müssen.',
      },
    ],
  },

  vollfolierung: {
    id: 'vollfolierung',
    path: '/vollfolierung-berlin',
    meta: {
      title: 'Vollfolierung Berlin – Auto komplett folieren ab 1.300 €',
      description:
        'Vollfolierung in Berlin ✔ Über 100 Farben & Finishes ✔ Saubere Demontage ✔ 5 Jahre Garantie ➤ Preise ansehen & Wunschfarbe anfragen!',
      h1: 'Vollfolierung in Berlin: Auto komplett folieren',
      canonicalPath: '/vollfolierung-berlin',
    },
    intro:
      'Eine Vollfolierung gibt Ihrem Auto eine komplett neue Farbe, ohne den Originallack zu verändern. Bei FolienSam in Berlin-Weißensee kostet eine Vollfolierung ab 1.300 € und dauert in der Regel 2 bis 3 Tage. Sie wählen aus über 100 Farben und Finishes von 3M, Avery Dennison und Hexis, wir übernehmen Demontage, Folierung und Qualitätskontrolle. Mit 5 Jahren Garantie auf Material und Verarbeitung.',
    breadcrumbs: [
      { label: 'Startseite', path: '/' },
      { label: 'Autofolierung', path: '/autofolierung-berlin' },
      { label: 'Vollfolierung Berlin' },
    ],
    serviceName: 'Vollfolierung in Berlin',
    schemaType: 'Service',
    offerPrice: '1300',
    sections: [
      {
        title: 'Was kostet es, ein Auto komplett folieren zu lassen?',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Ein Auto komplett folieren zu lassen kostet bei FolienSam ab 1.300 €. Der genaue Preis hängt von drei Faktoren ab:',
          },
          {
            type: 'table',
            table: {
              headers: ['Faktor', 'Wirkung auf den Preis'],
              rows: [
                ['Fahrzeuggröße', 'Kleinwagen günstiger als SUV oder Transporter'],
                ['Folienart', 'Unifarben günstiger als Metallic, Satin oder Effektfolien'],
                ['Karosserie-Komplexität', 'Viele Kanten, Anbauteile und Demontage-Aufwand erhöhen den Preis'],
              ],
            },
          },
          {
            type: 'paragraph',
            text: 'Ein verbindliches Festpreis-Angebot bekommen Sie nach Zusendung von Fahrzeugfotos per Formular oder WhatsApp. Eine ausführliche Preisübersicht mit Beispielen finden Sie im Ratgeber.',
          },
          {
            type: 'cta',
            linkTo: '/ratgeber/auto-folieren-kosten',
            linkLabel: 'Was kostet eine Autofolierung?',
          },
        ],
      },
      {
        title: 'Matt, Glanz oder Satin: Ihre Farbauswahl',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Matt folieren ist seit Jahren die beliebteste Wahl bei Vollfolierungen, dicht gefolgt von Satin- und Glanzfolien. So unterscheiden sich die Finishes:',
          },
          {
            type: 'list',
            items: [
              'Matt: edel und zurückhaltend, kaschiert kleine Unebenheiten. Wichtig: Mattfolien dürfen nicht poliert oder gewachst werden.',
              'Satin: der Mittelweg, seidiger Schimmer ohne starke Reflexion. Sehr beliebt bei Premium-Fahrzeugen.',
              'Glanz: wirkt wie frischer Lack, pflegeleicht, darf poliert werden.',
              'Metallic und Effekt: Farbwechsel, Perlmutt, gebürstetes Metall oder Carbon-Struktur für alle, die auffallen wollen.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Sie sind unsicher? Kommen Sie mit Ihrem Fahrzeug vorbei, wir legen Folienmuster direkt ans Auto.',
          },
        ],
      },
      {
        title: 'So läuft Ihre Vollfolierung ab',
        level: 2,
        blocks: [
          {
            type: 'numbered-list',
            items: [
              'Beratung und Folienauswahl in der Werkstatt oder per WhatsApp mit Fotos',
              'Reinigung und Lackprüfung. Die Folie ist nur so gut wie der Untergrund',
              'Demontage von Griffen, Leisten und Emblemen für saubere Kanten',
              'Folierung aller Komponenten einzeln, Kanten werden umgelegt',
              'Qualitätskontrolle, Remontage und Übergabe mit Pflegehinweisen',
            ],
          },
          {
            type: 'paragraph',
            text: 'Planen Sie 2 bis 3 Tage Standzeit ein. Sie bekommen einen verbindlichen Termin, das Fahrzeug bleibt während der gesamten Zeit in unserer Werkstatt.',
          },
        ],
      },
      {
        title: 'Garantie und Haltbarkeit',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Auf Vollfolierungen geben wir 5 Jahre Garantie auf Material und Verarbeitung. Die tatsächliche Lebensdauer hängt vom Folientyp ab: Unifarben halten am längsten, Effekt- und Chromfolien herstellerbedingt kürzer. Bei der Übergabe erklären wir Ihnen, wie Sie die Folie richtig pflegen, damit sie so lange wie möglich aussieht wie am ersten Tag.',
          },
        ],
      },
      {
        title: 'Referenzen: Vollfolierungen aus unserer Werkstatt',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Mehr Beispiele finden Sie in unseren Referenzen.',
          },
          {
            type: 'cta',
            linkTo: '/referenzen',
            linkLabel: 'Referenzen ansehen',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Was kostet eine Auto-Vollfolierung?',
        answer:
          'Ab 1.300 € bei FolienSam in Berlin, abhängig von Fahrzeuggröße, Folienart und Aufwand. Effektfolien und große Fahrzeuge kosten mehr als Unifarben auf einem Kleinwagen.',
      },
      {
        question: 'Wie lange dauert eine Vollfolierung?',
        answer:
          'In der Regel 2 bis 3 Tage. In dieser Zeit wird das Fahrzeug gereinigt, teilweise demontiert, foliert und wieder komplett montiert.',
      },
      {
        question: 'Bleibt der Originallack unter der Folie erhalten?',
        answer:
          'Ja, das ist einer der größten Vorteile. Die Folie schützt den Lack sogar vor kleinen Kratzern und UV-Strahlung. Nach der Entfernung kommt der unveränderte Lack zum Vorschein.',
      },
      {
        question: 'Kann ich die Folie später wieder entfernen lassen?',
        answer:
          'Ja. Die von uns verarbeiteten Folien von 3M, Avery Dennison und Hexis haben Easy-Removal-Technologie und lassen sich fachgerecht rückstandsfrei entfernen.',
      },
      {
        question: 'Muss ich die neue Farbe eintragen lassen?',
        answer:
          'Beim TÜV nicht. Nach einem kompletten Farbwechsel sollten Sie die neue Farbe aber der Zulassungsstelle melden. Wir erinnern Sie bei der Übergabe daran.',
      },
      {
        question: 'Wie pflege ich ein foliertes Auto?',
        answer:
          'Drei Wochen nach der Folierung nicht waschen, danach normal per Hand oder Waschanlage. Mattfolien nie polieren oder wachsen. Bei Hochdruckreinigern Abstand zu den Kanten halten.',
      },
    ],
  },

  scheibentoenung: {
    id: 'scheibentoenung',
    path: '/scheibentoenung-berlin',
    meta: {
      title: 'Scheibentönung Berlin – mit ABE & Garantie | FolienSam',
      description:
        'Scheiben tönen in Berlin ✔ Zertifizierte Tönungsfolien mit ABE ✔ UV- & Hitzeschutz ✔ Faire Festpreise ➤ Jetzt Wunschtermin anfragen!',
      h1: 'Scheibentönung in Berlin – professionell & mit ABE',
      canonicalPath: '/scheibentoenung-berlin',
    },
    intro:
      'Eine professionelle Scheibentönung schützt vor UV-Strahlung und Hitze, verbessert die Privatsphäre und macht Ihr Auto optisch hochwertiger. Bei FolienSam in Berlin-Weißensee tönen wir Ihre Scheiben mit zertifizierten Folien inklusive ABE (Allgemeine Bauartgenehmigung). Das heißt: keine Eintragung nötig, Sie bekommen die ABE-Bescheinigung direkt mit. Termin anfragen, Scheiben tönen lassen, fertig.',
    breadcrumbs: [
      { label: 'Startseite', path: '/' },
      { label: 'Scheibentönung Berlin' },
    ],
    serviceName: 'Scheibentönung in Berlin',
    schemaType: 'Service',
    sections: [
      {
        title: 'Warum Scheiben tönen lassen?',
        level: 2,
        blocks: [
          {
            type: 'list',
            items: [
              'UV-Schutz: Tönungsfolien blocken einen Großteil der UV-Strahlung. Das schützt Insassen und bewahrt das Interieur vor dem Ausbleichen.',
              'Weniger Hitze im Innenraum: Gerade im Sommer heizt sich das Auto spürbar weniger auf.',
              'Privatsphäre: Was hinten im Auto liegt oder sitzt, bleibt Ihre Sache. Ein Plus auch gegen Diebstahl-Gelegenheiten.',
              'Optik: Getönte Scheiben lassen fast jedes Fahrzeug hochwertiger wirken.',
            ],
          },
        ],
      },
      {
        title: 'Was kostet es, die Scheiben tönen zu lassen?',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Die Kosten für das Scheibentönen richten sich nach der Anzahl und Größe der Scheiben sowie der gewählten Folie. Als Faustregel: je mehr Scheiben und je größer das Fahrzeug, desto höher der Preis. Sie bekommen vor dem Termin einen Festpreis. Einfach Fahrzeugmodell per WhatsApp oder Formular senden.',
          },
        ],
      },
      {
        title: 'Tönungsgrade: von dezent bis dunkel',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Welche Tönung passt zu Ihnen? Tönungsfolien gibt es in verschiedenen Stufen, angegeben als Lichtdurchlässigkeit. Gängig sind dezente Tönungen um 35 %, mittlere um 20 % und dunkle um 5 % Lichtdurchlässigkeit. Wir zeigen Ihnen Muster direkt am Fahrzeug, damit Sie die Wirkung vor der Montage sehen.',
          },
        ],
      },
      {
        title: 'Was ist bei der Scheibentönung erlaubt?',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Getönt werden dürfen die hinteren Seitenscheiben ab der B-Säule und die Heckscheibe, sofern das Fahrzeug zwei Außenspiegel hat. Frontscheibe und vordere Seitenscheiben dürfen nicht getönt werden. Alle unsere Folien haben eine ABE (Allgemeine Bauartgenehmigung). Die bekommen Sie von uns ausgehändigt und sollten sie im Fahrzeug mitführen, etwa für Polizeikontrollen oder die Hauptuntersuchung.',
          },
        ],
      },
      {
        title: 'Ablauf und Dauer',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Eine Scheibentönung dauert bei uns in der Regel wenige Stunden, je nach Fahrzeug und Scheibenanzahl. Die Folie wird innen aufgebracht, passgenau zugeschnitten und blasenfrei verklebt. Danach bekommen Sie das Fahrzeug mit ABE-Bescheinigung und Pflegehinweisen zurück.',
          },
        ],
      },
      {
        title: 'Pflege nach der Tönung',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'In den ersten drei Wochen nach der Montage gilt: Scheiben nicht herunterfahren und innen nicht putzen. Kleine Wasserbläschen unter der Folie sind in dieser Zeit normal, sie verdunsten von selbst. Die Heckscheibenheizung dürfen Sie normal nutzen.',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Was kostet Scheiben tönen beim Profi?',
        answer:
          'Die Kosten hängen von Scheibenanzahl und Fahrzeuggröße ab. Bei FolienSam bekommen Sie vorab einen Festpreis für Ihr Fahrzeugmodell.',
      },
      {
        question: 'Darf ich die vorderen Scheiben tönen?',
        answer:
          'Nein. Frontscheibe und vordere Seitenscheiben müssen frei bleiben, das schreibt die StVZO vor. Erlaubt sind die Scheiben ab der B-Säule und die Heckscheibe.',
      },
      {
        question: 'Muss ich die Tönung eintragen lassen?',
        answer:
          'Nein. Unsere Tönungsfolien haben eine ABE (Allgemeine Bauartgenehmigung) und sind damit eintragungsfrei. Die ABE-Bescheinigung sollten Sie im Auto mitführen.',
      },
      {
        question: 'Was passiert, wenn ich die ABE verliere?',
        answer:
          'Kein Problem. Anhand der Folien-Kennzeichnung stellen wir Ihnen eine neue ABE-Bescheinigung aus. Melden Sie sich einfach bei uns.',
      },
      {
        question: 'Wie lange hält eine Scheibentönung?',
        answer:
          'Hochwertige Tönungsfolien halten viele Jahre, ohne auszubleichen oder sich zu lösen.',
      },
      {
        question: 'Sind Bläschen unter der Folie normal?',
        answer:
          'Direkt nach der Montage ja. Restfeuchtigkeit verdunstet innerhalb der ersten Wochen von selbst. Bleiben Blasen länger sichtbar, kommen Sie vorbei, wir schauen uns das an.',
      },
    ],
  },

  lackschutz: {
    id: 'lackschutz',
    path: '/lackschutzfolie-berlin',
    meta: {
      title: 'Lackschutzfolie Berlin – PPF & Steinschlagschutz | FolienSam',
      description:
        'Selbstheilende Lackschutzfolie (PPF) in Berlin ✔ Front- bis Komplettschutz ✔ Unsichtbarer Steinschlagschutz ➤ Jetzt Beratung anfragen!',
      h1: 'Lackschutzfolie (PPF) in Berlin',
      canonicalPath: '/lackschutzfolie-berlin',
    },
    intro:
      'Eine Lackschutzfolie (PPF, Paint Protection Film) ist eine transparente Schutzschicht, die Ihren Lack vor Steinschlägen, Kratzern und Umwelteinflüssen bewahrt, nahezu unsichtbar. Bei FolienSam in Berlin-Weißensee verkleben wir selbstheilende Lackschutzfolien für Frontpartien, einzelne Bauteile oder das komplette Fahrzeug. Besonders sinnvoll für Neuwagen, Premium-Fahrzeuge und Vielfahrer.',
    breadcrumbs: [
      { label: 'Startseite', path: '/' },
      { label: 'Lackschutzfolie Berlin' },
    ],
    serviceName: 'Lackschutzfolie / PPF in Berlin',
    schemaType: 'Service',
    sections: [
      {
        title: 'Was ist eine Lackschutzfolie?',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'PPF ist eine dicke, transparente Polyurethan-Folie, die auf den Lack aufgebracht wird. Sie absorbiert die Energie von Steinschlägen, bevor der Lack Schaden nimmt. Moderne Lackschutzfolien sind selbstheilend: Feine Kratzer in der Folie verschwinden durch Wärme von selbst, etwa durch Sonneneinstrahlung oder warmes Wasser. Der Lack darunter bleibt im Neuzustand erhalten. Das unterscheidet PPF von einer Farbfolierung: Hier geht es nicht um Optik, sondern um Schutz.',
          },
        ],
      },
      {
        title: 'Unsere Schutzpakete',
        level: 2,
        blocks: [
          {
            type: 'list',
            items: [
              'Frontpaket: Stoßstange, Motorhaube (teilweise oder komplett), Kotflügel und Außenspiegel. Die Bereiche, die Steinschläge zuerst treffen. Der Klassiker für Vielfahrer und Autobahn-Pendler.',
              'Teilschutz: einzelne Bauteile nach Bedarf, zum Beispiel Einstiegsleisten, Ladekante, Griffmulden oder die Front eines Leasingfahrzeugs.',
              'Komplettschutz: das gesamte Fahrzeug in PPF. Maximaler Werterhalt, beliebt bei Sportwagen und Neufahrzeugen der Oberklasse.',
            ],
          },
        ],
      },
      {
        title: 'Was kostet eine Steinschlagschutzfolie?',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Die Kosten für eine Steinschlagschutzfolie hängen vom Umfang ab: Ein Frontpaket kostet deutlich weniger als ein Komplettschutz, einzelne Bauteile sind der günstigste Einstieg. PPF ist Material- und arbeitsintensiver als eine Farbfolierung, dafür schützt sie den Lack über Jahre. Für ein konkretes Angebot senden Sie uns Fahrzeugmodell und gewünschten Umfang, Sie bekommen einen Festpreis.',
          },
        ],
      },
      {
        title: 'Für wen lohnt sich PPF?',
        level: 2,
        blocks: [
          {
            type: 'numbered-list',
            items: [
              'Neuwagen: Der beste Zeitpunkt für PPF ist direkt nach der Auslieferung, solange der Lack makellos ist.',
              'Premium- und Sportfahrzeuge: Hier kostet eine Lackreparatur schnell ein Vielfaches der Folie.',
              'Vielfahrer und Autobahn-Pendler: Steinschläge an der Front sind bei hoher Laufleistung kaum vermeidbar, mit PPF bleibt der Lack darunter unversehrt.',
              'Leasingfahrzeuge: Der Lack bleibt im Rückgabezustand. Die Folie wird vor der Rückgabe entfernt, Nachlackierungskosten entfallen.',
            ],
          },
        ],
      },
      {
        title: 'PPF oder Keramikversiegelung?',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Kurze Antwort: Die beiden Produkte lösen verschiedene Probleme. Eine Keramikversiegelung erleichtert die Pflege und lässt Wasser abperlen, schützt aber nicht vor Steinschlägen. Eine Lackschutzfolie ist eine physische Schutzschicht gegen mechanische Schäden. Wer maximalen Schutz will, kombiniert beides: erst PPF, darauf die Versiegelung. Wir beraten Sie ehrlich, was für Ihr Fahrzeug und Ihre Nutzung sinnvoll ist.',
          },
        ],
      },
      {
        title: 'Haltbarkeit und Pflege',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Hochwertige Lackschutzfolien halten viele Jahre. Die Pflege ist unkompliziert: normale Handwäsche oder Waschanlage, bei Hochdruckreinigern Abstand zu den Folienkanten halten. Feine Kratzer heilen bei Wärme von selbst aus.',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Sieht man die Lackschutzfolie auf dem Auto?',
        answer:
          'Kaum. PPF ist transparent und wird passgenau auf die Bauteile verklebt. Aus einem Meter Entfernung ist eine fachgerecht verklebte Folie praktisch unsichtbar.',
      },
      {
        question: 'Was bringt eine selbstheilende Folie?',
        answer:
          'Feine Kratzer und Swirls in der Folienoberfläche verschwinden durch Wärme von selbst. Die Folie sieht dadurch länger neuwertig aus und muss seltener getauscht werden.',
      },
      {
        question: 'Schützt die Folie zuverlässig vor Steinschlag?',
        answer:
          'Ja, das ist ihr Hauptzweck. Die Polyurethan-Schicht absorbiert die Aufprallenergie kleiner Steine, die auf unbehandeltem Lack Abplatzer hinterlassen würden.',
      },
      {
        question: 'Kann man PPF wieder entfernen?',
        answer:
          'Ja, fachgerecht und rückstandsfrei. Darunter kommt der geschützte Originallack zum Vorschein. Genau deshalb ist PPF auch für Leasingfahrzeuge beliebt.',
      },
      {
        question: 'Kann man ein foliertes Auto zusätzlich schützen?',
        answer:
          'Ja. Eine Keramikversiegelung auf der PPF erleichtert die Pflege zusätzlich. Sprechen Sie uns an, ob die Kombination für Ihr Fahrzeug sinnvoll ist.',
      },
      {
        question: 'Lohnt sich PPF beim Gebrauchtwagen?',
        answer:
          'Das hängt vom Lackzustand ab. Auf makellosem Lack: ja. Vorhandene Steinschläge oder Kratzer sollten vorher aufbereitet werden, sonst werden sie unter der Folie konserviert.',
      },
    ],
  },

  beschriftung: {
    id: 'beschriftung',
    path: '/fahrzeugbeschriftung-berlin',
    meta: {
      title: 'Fahrzeugbeschriftung Berlin – Werbefolierung für Firmen',
      description:
        'Firmenwagen, Transporter & Flotten beschriften ✔ Design, Druck & Montage aus einer Hand ✔ Leasingfähig ➤ Jetzt B2B-Angebot anfragen!',
      h1: 'Fahrzeugbeschriftung & Werbefolierung in Berlin',
      canonicalPath: '/fahrzeugbeschriftung-berlin',
    },
    intro:
      'Eine Fahrzeugbeschriftung macht aus Ihrem Firmenwagen eine Werbefläche, die täglich durch Berlin fährt. Bei FolienSam bekommen Sie Autobeschriftung, Teilfolierung mit Werbedesign und komplette Werbefolierung aus einer Hand: Beratung, Datenprüfung, Produktion und Montage in unserer Werkstatt in Berlin-Weißensee. Mit Premium-Folien, die sich bei Leasingrückgabe oder Redesign rückstandsfrei entfernen lassen.',
    breadcrumbs: [
      { label: 'Startseite', path: '/' },
      { label: 'Fahrzeugbeschriftung Berlin' },
    ],
    serviceName: 'Fahrzeugbeschriftung in Berlin',
    schemaType: 'Service',
    sections: [
      {
        title: 'Von der Logo-Beklebung bis zur Vollfolierung',
        level: 2,
        blocks: [],
      },
      {
        title: 'Beschriftung',
        level: 3,
        blocks: [
          {
            type: 'paragraph',
            text: 'Logo, Firmenname, Telefonnummer und Web-Adresse als Folienschnitt auf Türen, Heck und Heckscheibe. Der kostengünstige Einstieg, der aus jedem Firmenfahrzeug eine Visitenkarte macht.',
          },
        ],
      },
      {
        title: 'Teilfolierung mit Werbedesign',
        level: 3,
        blocks: [
          {
            type: 'paragraph',
            text: 'Gestaltete Flächen kombiniert mit Beschriftung, zum Beispiel eine durchgehende Gestaltung der Fahrzeugseiten oder des Hecks. Deutlich mehr Aufmerksamkeit, ohne das ganze Fahrzeug zu folieren.',
          },
        ],
      },
      {
        title: 'Komplette Werbefolierung',
        level: 3,
        blocks: [
          {
            type: 'paragraph',
            text: 'Das gesamte Fahrzeug in Ihrem Corporate Design. Maximale Wirkung im Stadtbild, besonders für Transporter mit großen Flächen. Auf Wunsch gestalten wir mehrere Fahrzeuge einheitlich, damit Ihre Flotte als Marke auftritt.',
          },
        ],
      },
      {
        title: 'So läuft es für Firmenkunden ab',
        level: 2,
        blocks: [
          {
            type: 'numbered-list',
            items: [
              'Anfrage mit Fahrzeugdaten. Modell, Anzahl der Fahrzeuge, grobe Vorstellung. Gern per E-Mail an info@foliensam.de.',
              'Datencheck und Design. Sie liefern Logo und Wunschtexte, wir prüfen die Druckdaten.',
              'Freigabe am Entwurf. Sie sehen vor der Produktion, wie das Fahrzeug aussehen wird.',
              'Produktion und Montage. Termin in unserer Werkstatt, je nach Umfang wenige Stunden bis ein Tag pro Fahrzeug.',
              'Übergabe mit Pflegehinweisen. Damit die Beschriftung Jahre hält.',
            ],
          },
        ],
      },
      {
        title: 'Leasingfahrzeuge: beschriften und sauber zurückgeben',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Ja, auch Leasingfahrzeuge können beschriftet werden. Die von uns verarbeiteten Folien lassen sich fachgerecht und rückstandsfrei entfernen, der Originallack bleibt unverändert. Klären Sie die Beschriftung kurz mit Ihrem Leasinggeber und planen Sie vor der Rückgabe die Entfernung ein.',
          },
        ],
      },
      {
        title: 'Was kostet eine Fahrzeugbeschriftung?',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Der Preis hängt vom Umfang ab: Eine reine Beschriftung mit Logo und Kontaktdaten ist der günstigste Einstieg, eine komplette Werbefolierung liegt im Bereich einer Vollfolierung. Sie bekommen nach Datenprüfung ein Festpreis-Angebot pro Fahrzeug. Bei mehreren Fahrzeugen lohnt sich die einheitliche Umsetzung in einem Termin-Block.',
          },
        ],
      },
      {
        title: 'Referenzen',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Weitere Arbeiten finden Sie in unseren Referenzen.',
          },
          {
            type: 'cta',
            linkTo: '/referenzen',
            linkLabel: 'Referenzen ansehen',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Was kostet eine Autobeschriftung?',
        answer:
          'Eine Basis-Beschriftung mit Logo und Kontaktdaten ist der günstigste Einstieg, gestaltete Teil- und Vollfolierungen kosten entsprechend mehr. Nach Sichtung Ihrer Daten nennen wir Ihnen einen Festpreis pro Fahrzeug.',
      },
      {
        question: 'Wie lange dauert die Beschriftung eines Transporters?',
        answer:
          'Eine einfache Beschriftung ist oft in wenigen Stunden montiert, eine komplette Werbefolierung dauert je nach Fahrzeuggröße bis zu einem Tag oder länger. Den genauen Zeitrahmen nennen wir Ihnen mit dem Angebot.',
      },
      {
        question: 'Liefern wir das Design oder macht das FolienSam?',
        answer:
          'Beides ist möglich. Sie liefern druckfertige Daten oder wir setzen Ihr Corporate Design für die Fahrzeugflächen um.',
      },
      {
        question: 'Schadet die Beklebung dem Lack?',
        answer:
          'Nein, im Gegenteil. Die Folie schützt die beklebten Flächen. Bei der Entfernung bleibt der Originallack unversehrt.',
      },
      {
        question: 'Können mehrere Fahrzeuge einheitlich beschriftet werden?',
        answer:
          'Ja. Wir übernehmen die einheitliche Umsetzung Ihres Designs auf unterschiedlichen Fahrzeugmodellen, damit Ihre Flotte als eine Marke auftritt.',
      },
    ],
  },

  felgen: {
    id: 'felgen',
    path: '/felgenfolierung-berlin',
    meta: {
      title: 'Felgen folieren: Kosten & Farben | FolienSam Berlin',
      description:
        'Felgen folieren statt lackieren ✔ Kosten & Preisbeispiele ✔ Rückstandsfrei entfernbar ✔ Werkstatt in Berlin-Weißensee ➤ Termin anfragen!',
      h1: 'Felgen folieren: Kosten, Farben und Ablauf',
      canonicalPath: '/felgenfolierung-berlin',
    },
    intro:
      'Felgen folieren ist die flexible Alternative zum Lackieren oder Pulverbeschichten: neuer Look in Ihrer Wunschfarbe, rückstandsfrei entfernbar und ohne dauerhafte Veränderung der Felge. Bei FolienSam in Berlin-Weißensee folieren wir Alufelgen mit hochwertigen, hitzebeständigen Folien. Hier finden Sie Kosten, Farbauswahl und den Ablauf im Überblick.',
    breadcrumbs: [
      { label: 'Startseite', path: '/' },
      { label: 'Felgenfolierung Berlin' },
    ],
    serviceName: 'Felgenfolierung in Berlin',
    schemaType: 'Service',
    sections: [
      {
        title: 'Was kostet es, Felgen folieren zu lassen?',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Die Kosten für das Felgenfolieren hängen von Felgengröße, Felgendesign und Folienart ab. Ein filigranes Speichendesign ist aufwendiger zu folieren als eine glatte Felgenfläche. Als Orientierung gilt: Ein Satz folierte Felgen kostet weniger als eine hochwertige Pulverbeschichtung und ist deutlich schneller umgesetzt. Für einen Festpreis senden Sie uns ein Foto Ihrer Felgen mit Größenangabe per WhatsApp oder Formular.',
          },
          {
            type: 'cta',
            linkTo: '/kontakt',
            linkLabel: 'Felgen-Angebot anfragen',
          },
        ],
      },
      {
        title: 'Folieren, lackieren oder pulverbeschichten?',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Kurz eingeordnet: Folieren ist reversibel und schnell, Lackieren und Pulverbeschichten sind dauerhaft.',
          },
          {
            type: 'list',
            items: [
              'Felgenfolie: in Ihrer Wunschfarbe, wieder entfernbar, ideal zum Ausprobieren eines neuen Looks oder für Leasingfahrzeuge',
              'Lackierung: dauerhaft, sinnvoll bei beschädigten Felgen, die ohnehin aufbereitet werden müssen',
              'Pulverbeschichtung: die robusteste Lösung, aber unumkehrbar und mit längerer Standzeit',
            ],
          },
        ],
      },
      {
        title: 'Farben und Finishes',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Am beliebtesten sind Schwarz glänzend, Schwarz matt und Anthrazit. Möglich ist aber fast alles, was es auch für die Karosserie gibt: von Gold über Bronze bis zu Effektfolien. Wer es dezent mag, foliert die Felgen im Farbton der Fahrzeugfolierung.',
          },
        ],
      },
      {
        title: 'So läuft die Felgenfolierung ab',
        level: 2,
        blocks: [
          {
            type: 'numbered-list',
            items: [
              'Anfrage mit Foto und Felgengröße, Sie bekommen einen Festpreis',
              'Demontage und Reinigung der Felgen',
              'Folierung jeder Felge einzeln, inklusive sauber umgelegter Kanten',
              'Montage und Übergabe mit Pflegehinweisen',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Was kostet ein Satz folierte Felgen?',
        answer:
          'Der Preis hängt von Größe und Design der Felgen ab. Nach einem Foto Ihrer Felgen nennen wir Ihnen einen Festpreis für alle vier Felgen.',
      },
      {
        question: 'Hält Folie auf Felgen dauerhaft?',
        answer:
          'Ja, bei fachgerechter Verklebung mit hitzebeständiger Folie hält die Folierung im Alltag zuverlässig, auch bei Bremswärme und Waschanlagen. Steinschläge können die Folie an exponierten Stellen beschädigen, einzelne Felgen lassen sich aber nachfolieren.',
      },
      {
        question: 'Kann ich folierte Felgen normal waschen?',
        answer:
          'Ja, Handwäsche und Waschanlage sind kein Problem. Bei Hochdruckreinigern etwas Abstand zu den Folienkanten halten und keine aggressiven Felgenreiniger verwenden.',
      },
      {
        question: 'Lässt sich die Felgenfolie wieder entfernen?',
        answer:
          'Ja, rückstandsfrei. Darunter kommt die Felge im Ursprungszustand zum Vorschein. Das macht die Folierung ideal, wenn Sie den Look nur auf Zeit ändern wollen.',
      },
    ],
  },

  ratgeberKosten: {
    id: 'ratgeberKosten',
    path: '/ratgeber/auto-folieren-kosten',
    meta: {
      title: 'Auto folieren: Kosten 2026 – Preise & Faktoren | FolienSam',
      description:
        'Was kostet eine Autofolierung? ✔ Preise für Voll- & Teilfolierung ✔ Alle Kostenfaktoren ✔ Spartipps ➤ Vom Berliner Folierungsprofi.',
      h1: 'Was kostet eine Autofolierung?',
      canonicalPath: '/ratgeber/auto-folieren-kosten',
    },
    intro:
      'Eine komplette Autofolierung kostet in Deutschland je nach Fahrzeuggröße und Folienart etwa 1.300 € bis 4.000 €, bei Effektfolien und Sportwagen auch mehr. Teilfolierungen wie Dach oder Motorhaube beginnen bei einem Bruchteil davon. Bei FolienSam in Berlin startet die Vollfolierung ab 1.300 €. In diesem Ratgeber schlüsseln wir auf, wovon der Preis abhängt und wo Sie sparen können, ohne an Qualität zu verlieren.',
    breadcrumbs: [
      { label: 'Startseite', path: '/' },
      { label: 'Ratgeber', path: '/ratgeber' },
      { label: 'Auto folieren: Kosten' },
    ],
    schemaType: 'Article',
    sections: [
      {
        title: 'Die 5 Faktoren, die den Preis bestimmen',
        level: 2,
        blocks: [],
      },
      {
        title: '1. Fahrzeuggröße und Karosserieform',
        level: 3,
        blocks: [
          {
            type: 'paragraph',
            text: 'Mehr Fläche heißt mehr Folie und mehr Arbeitszeit. Ein Kleinwagen ist schneller foliert als ein SUV. Noch wichtiger als die reine Größe ist die Form: Tiefe Sicken, starke Rundungen und viele Anbauteile machen die Verklebung aufwendiger.',
          },
        ],
      },
      {
        title: '2. Folienart und Hersteller',
        level: 3,
        blocks: [
          {
            type: 'paragraph',
            text: 'Unifarben in Glanz oder Matt sind am günstigsten. Metallic-, Satin- und Strukturfolien liegen darüber, Chrom- und Farbwechselfolien sind am teuersten. Wir verarbeiten ausschließlich Folien von 3M, Avery Dennison und Hexis. Billigfolie spart am Anfang wenige hundert Euro und kostet beim Entfernen oder Ausbleichen ein Vielfaches.',
          },
        ],
      },
      {
        title: '3. Demontage-Aufwand',
        level: 3,
        blocks: [
          {
            type: 'paragraph',
            text: 'Für ein sauberes Ergebnis werden Griffe, Leisten und Embleme demontiert und die Folie um die Kanten gelegt. Wer das weglässt, spart Arbeitszeit, sieht aber jede Abschlusskante. Seriöse Angebote enthalten die Demontage, billige oft nicht. Fragen Sie im Zweifel nach.',
          },
        ],
      },
      {
        title: '4. Zustand des Lacks',
        level: 3,
        blocks: [
          {
            type: 'paragraph',
            text: 'Folie überträgt jede Unebenheit. Steinschläge, Kratzer oder Rost müssen vor der Folierung behoben werden, sonst zeichnen sie sich ab und gefährden die Haftung. Eventuelle Vorarbeiten kommen zum Folierungspreis dazu.',
          },
        ],
      },
      {
        title: '5. Teil- oder Vollfolierung',
        level: 3,
        blocks: [
          {
            type: 'paragraph',
            text: 'Wer nicht das ganze Auto verändern will, fährt mit einer Teilfolierung deutlich günstiger. Was kostet es, die Motorhaube folieren zu lassen oder das Autodach? Beides gehört zu den günstigsten Einstiegen in die Folierung und ist an einem Tag erledigt.',
          },
          {
            type: 'cta',
            linkTo: '/autofolierung-berlin',
            linkLabel: 'Autofolierung in Berlin',
          },
        ],
      },
      {
        title: 'Folieren oder lackieren: Was ist günstiger?',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'In den meisten Fällen die Folierung. Eine hochwertige Komplettlackierung in vergleichbarer Qualität kostet oft deutlich mehr, besonders bei Sonderfarben. Dazu kommt: Die Folie ist reversibel, der Originallack bleibt erhalten und geschützt. Das erhält den Wiederverkaufswert. Eine Lackierung ist nur dann die richtige Wahl, wenn der Lack ohnehin beschädigt ist und repariert werden muss.',
          },
        ],
      },
      {
        title: 'Wo Sie sparen können und wo nicht',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Sinnvoll sparen: Teilfolierung statt Vollfolierung, Unifarbe statt Effektfolie, Anfrage mit guten Fotos. Nicht sparen sollten Sie bei der Folienqualität, der Demontage und der Werkstattwahl.',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Was kostet es, ein Auto komplett folieren zu lassen?',
        answer:
          'Eine komplette Vollfolierung kostet ab etwa 1.300 € für einen Kleinwagen mit Unifarbe. Mittelklasse, SUV und Effektfolien liegen darüber. Der verbindliche Preis hängt von Fahrzeug, Folie und Aufwand ab.',
      },
      {
        question: 'Was kostet Auto-Wrapping im Vergleich zur Lackierung?',
        answer:
          'Car Wrapping ist bei vergleichbarer Qualität meist günstiger als eine Komplettlackierung und zusätzlich reversibel. Bei Sonderfarben und Effekten ist der Preisvorteil der Folie am größten.',
      },
      {
        question: 'Gibt es einen Kostenrechner für Autofolierung?',
        answer:
          'Einen exakten Online-Rechner gibt es seriös nicht, weil Karosserieform, Lackzustand und Folienwahl den Preis stark beeinflussen. Ein verbindliches Angebot bekommen Sie bei FolienSam nach Zusendung von Fahrzeugfotos, meist innerhalb kurzer Zeit.',
      },
      {
        question: 'Was kostet eine Teilfolierung?',
        answer:
          'Deutlich weniger als eine Vollfolierung. Dach, Motorhaube oder Spiegel gehören zu den günstigsten Optionen. Den Preis für Ihr Fahrzeug erfahren Sie per Foto-Anfrage.',
      },
      {
        question: 'Warum sind manche Angebote so viel billiger?',
        answer:
          'Meist wird an Folienqualität oder Demontage gespart. Ohne Demontage bleiben sichtbare Kanten, Billigfolie bleicht aus und lässt sich oft nur mit Kleberesten entfernen. Vergleichen Sie Angebote deshalb immer inklusive Folienmarke und Arbeitsumfang.',
      },
    ],
  },

  kontakt: {
    id: 'kontakt',
    path: '/kontakt',
    meta: {
      title: 'Kontakt & Anfahrt – FolienSam Berlin-Weißensee',
      description:
        'Max-Steinke-Straße 36, 13086 Berlin ✔ Mo–Sa 9–18 Uhr ✔ Anfrage per Formular, Telefon oder WhatsApp ➤ Jetzt Anfrage senden!',
      h1: 'Kontakt & Anfahrt',
      canonicalPath: '/kontakt',
    },
    intro:
      'Sie finden uns in der Max-Steinke-Straße 36 in 13086 Berlin-Weißensee. Wir sind Montag bis Samstag von 9 bis 18 Uhr für Sie da. Am schnellsten geht es per WhatsApp oder Telefon unter +49 157 50000505.',
    breadcrumbs: [
      { label: 'Startseite', path: '/' },
      { label: 'Kontakt' },
    ],
    sections: [
      {
        title: 'Einzugsgebiet',
        level: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Unsere Werkstatt liegt in Berlin-Weißensee (Bezirk Pankow) und ist gut erreichbar aus Pankow, Prenzlauer Berg, Lichtenberg, Hohenschönhausen und Mitte.',
          },
        ],
      },
    ],
  },

  referenzen: {
    id: 'referenzen',
    path: '/referenzen',
    meta: {
      title: 'Referenzen: 900+ Folierungen aus Berlin | FolienSam',
      description:
        'Über 900 Projekte ✔ Vollfolierung, Tönung, PPF & Beschriftung ✔ Echte Bilder & Videos aus unserer Berliner Werkstatt ➤ Jetzt ansehen!',
      h1: 'Unsere Arbeiten: Folierungen aus Berlin',
      canonicalPath: '/referenzen',
    },
    intro:
      'Über 900 Fahrzeuge haben unsere Werkstatt bereits foliert verlassen. Hier finden Sie Vollfolierungen, Scheibentönungen, Lackschutz und Beschriftungen aus unserer Berliner Werkstatt, mit Bildern und Videos echter Kundenfahrzeuge.',
    breadcrumbs: [
      { label: 'Startseite', path: '/' },
      { label: 'Referenzen' },
    ],
    sections: [],
  },
};

export function getCanonicalUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${normalized}`;
}

export function getPageByPath(path: string): SeoPageConfig | undefined {
  const normalized = path.replace(/\/$/, '') || '/';
  return Object.values(SEO_PAGES).find((page) => page.path === normalized);
}
