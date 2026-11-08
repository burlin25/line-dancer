export type Dance = {
  id: string;
  name: string;
  choreographer: string;
  level: 'Beginner' | 'Improver' | 'Intermediate';
  counts: number;
  walls: number;
  song: string;
  artist: string;
  description: string;
  sheetUrl: string;
  pdfUrl: string;
  videoId: string;
  videoLabel: string;
  tags: string[];
  color: string;
  image: string;
  notes?: string;
};

// Choreography details and PDF destinations checked against CopperKnob.
// Tutorial identities checked against YouTube's public oEmbed metadata.
// This is a curated collection of favorites, not a live popularity ranking.
// Absolute Beginner and High Beginner are grouped under Beginner for filtering;
// the precise published level is retained in notes where applicable.
export const dances: Dance[] = [
  {
    id: 'a-bar-song',
    name: 'A Bar Song',
    choreographer: 'Ben Murphy',
    level: 'Beginner',
    counts: 32,
    walls: 4,
    song: 'A Bar Song (Tipsy)',
    artist: 'Shaboozey',
    description: 'Easygoing grooves, a little grapevine, and plenty of personality.',
    sheetUrl: 'https://www.copperknob.co.uk/stepsheets/9ZRL2CY/a-bar-song',
    pdfUrl: 'https://www.copperknob.co.uk/stepsheets/9ZRL2CY/a-bar-song/download/pdf',
    videoId: 'ZwxZKYeJ570',
    videoLabel: 'Step-by-step lesson · Dirt Road Dancing',
    tags: ['Rumba box', 'Grapevine', 'Step touch', 'Hip bumps'],
    color: '#c66e49',
    image: '/images/dance-hall.png',
    notes: '32-count intro. Includes a four-count step-touch tag after wall 10; see the choreographer’s sheet for the full sequence.',
  },
  {
    id: 'boot-scootin-boogie',
    name: "Boot Scootin’ Boogie",
    choreographer: 'Bill Bader',
    level: 'Beginner',
    counts: 32,
    walls: 4,
    song: "Boot Scootin’ Boogie",
    artist: 'Brooks & Dunn',
    description: 'The classic country favorite with stomps, kicks, and heel swivels.',
    sheetUrl: 'https://www.copperknob.co.uk/stepsheets/QGCF4T9/boot-scootin-boogie',
    pdfUrl: 'https://www.copperknob.co.uk/stepsheets/QGCF4T9/boot-scootin-boogie/download/pdf',
    videoId: 'n37INIBiN8Q',
    videoLabel: 'Beginner lesson · Liz Collett',
    tags: ['Grapevine', 'Heel swivels', 'Ball change', 'Scuff'],
    color: '#5b776f',
    image: '/images/dance-hall.png',
    notes: 'Bill Bader’s original choreography, also known as Vancouver Boogie. Other dances share this name; use this lesson and sheet together.',
  },
  {
    id: 'copperhead-road',
    name: 'Copperhead Road',
    choreographer: 'Steve Smith',
    level: 'Beginner',
    counts: 24,
    walls: 4,
    song: 'Copperhead Road',
    artist: 'Steve Earle',
    description: 'Find your footing with a short, stomping country dance-floor staple.',
    sheetUrl: 'https://www.copperknob.co.uk/stepsheets/9HV6XRP/copperhead-road',
    pdfUrl: 'https://www.copperknob.co.uk/stepsheets/9HV6XRP/copperhead-road/download/pdf',
    videoId: 'av13Vxce8Qw',
    videoLabel: 'Step-by-step & back view · Beginner Dance Tutorials',
    tags: ['Grapevine', 'Hitch', 'Heel taps', 'Stomp'],
    color: '#9c7151',
    image: '/images/dance-hall.png',
    notes: 'Published level: Absolute Beginner. Includes quarter turns, hops, and heel slaps. Local styling may vary.',
  },
  {
    id: 'texas-hold-em',
    name: 'Texas Hold ’Em',
    choreographer: 'Guylaine Bourdages',
    level: 'Improver',
    counts: 32,
    walls: 4,
    song: 'TEXAS HOLD ’EM',
    artist: 'Beyoncé',
    description: 'Bring a little bounce to your night with samba steps and kick ball changes.',
    sheetUrl: 'https://www.copperknob.co.uk/stepsheets/Y32VV3H/texas-hold-em',
    pdfUrl: 'https://www.copperknob.co.uk/stepsheets/Y32VV3H/texas-hold-em/download/pdf',
    videoId: 'OArFg3Uprds',
    videoLabel: 'Dance & teach in English · LineDanceDallas5',
    tags: ['Samba step', 'Kick ball change', 'Coaster step', 'Jazz box'],
    color: '#b48249',
    image: '/images/dance-hall.png',
    notes: '24-count intro. On wall 2, dance the first 16 counts, add a four-count jazz-box tag, then restart. Follow the full sheet for timing.',
  },
  {
    id: 'watermelon-crawl',
    name: 'Watermelon Crawl',
    choreographer: 'Sue Lipscomb',
    level: 'Improver',
    counts: 40,
    walls: 4,
    song: 'Watermelon Crawl',
    artist: 'Tracy Byrd',
    description: 'A playful country classic that leaves room for a little swagger.',
    sheetUrl: 'https://www.copperknob.co.uk/stepsheets/85C68JG/watermelon-crawl',
    pdfUrl: 'https://www.copperknob.co.uk/stepsheets/85C68JG/watermelon-crawl/download/pdf',
    videoId: 'wAaEIVqsPcY',
    videoLabel: 'Learn the dance · Bar SZ Ranch',
    tags: ['Charleston', 'Grapevine', 'Slide', 'Pivot turn'],
    color: '#8f7655',
    image: '/images/dance-hall.png',
    notes: 'A 40-count sequence with toe-heel triples, Charleston kicks, slides, knee bends, and two half turns. See the sheet for exact counts.',
  },
  {
    id: 'american-kids',
    name: 'American Kids',
    choreographer: 'Randy Pelletier',
    level: 'Beginner',
    counts: 32,
    walls: 4,
    song: 'American Kids',
    artist: 'Kenny Chesney',
    description: 'A feel-good crowd favorite with heel taps and clap-along turns.',
    sheetUrl: 'https://www.copperknob.co.uk/stepsheets/ZYQMHP5/american-kids',
    pdfUrl: 'https://www.copperknob.co.uk/stepsheets/ZYQMHP5/american-kids/download/pdf',
    videoId: 'aV6Nj7l4JCA',
    videoLabel: 'Full-length teach · Sherry Barrett',
    tags: ['Heel taps', 'Monterey turn', 'Jazz box', 'Grapevine'],
    color: '#547477',
    image: '/images/dance-hall.png',
    notes: 'Published level: High Beginner. Start on the lyrics. Restart after count 16 on wall 6. The choreographer’s full sheet is linked in its original format.',
  },
  {
    id: 'shivers',
    name: 'Shivers',
    choreographer: 'Alison Metelnick & Peter Metelnick',
    level: 'Intermediate',
    counts: 64,
    walls: 4,
    song: 'Shivers',
    artist: 'Ed Sheeran',
    description: 'Stretch your skills with toe struts, flowing weaves, and sweeping turns.',
    sheetUrl: 'https://www.copperknob.co.uk/stepsheets/55H2SCY/shivers',
    pdfUrl: 'https://www.copperknob.co.uk/stepsheets/55H2SCY/shivers/download/pdf',
    videoId: 'vMPtLGA0Ch8',
    videoLabel: 'Dance & teach in English · LineDanceDallas3',
    tags: ['Toe struts', 'Weave', 'Spiral turn', 'Mambo step'],
    color: '#796b82',
    image: '/images/dance-hall.png',
    notes: '32-count intro, approximately 14 seconds. No tags or restarts. This is the Metelnicks’ 64-count choreography, distinct from Gives Me Shivers.',
  },
  {
    id: 'good-time',
    name: 'Good Time',
    choreographer: 'Jenny Cain',
    level: 'Improver',
    counts: 48,
    walls: 4,
    song: 'Good Time',
    artist: 'Alan Jackson',
    description: 'Toe struts, shuffles, and a big finish made for a good time together.',
    sheetUrl: 'https://www.copperknob.co.uk/stepsheets/86SCMVC/good-time',
    pdfUrl: 'https://www.copperknob.co.uk/stepsheets/86SCMVC/good-time/download/pdf',
    videoId: 'rs5f8CYyLBo',
    videoLabel: 'Official dance instruction · Alan Jackson',
    tags: ['Toe struts', 'Grapevine', 'Shuffle', 'Shimmy'],
    color: '#bc7956',
    image: '/images/dance-hall.png',
    notes: 'Jenny Cain’s 48-count choreography as used for Alan Jackson’s Good Time. Includes turning vines, knee lifts, shuffle steps, and shimmies.',
  },
];
