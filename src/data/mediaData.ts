export type MediaCategoryType = 
  | 'all'
  | 'documentaries'
  | 'stotras'
  | 'scriptures'
  | 'yatras'
  | 'podcasts';

export interface KnowledgeMediaItem {
  id: string;
  title: string;
  subtitle: string;
  category: MediaCategoryType;
  categoryLabel: string;
  type: 'video' | 'audio' | 'article';
  duration?: string;
  readTime?: string;
  thumbnail: string;
  videoUrl?: string;
  audioTrackName?: string;
  authorOrSinger: string;
  templeOrSource: string;
  viewsOrReads: string;
  description: string;
  fullContent?: string;
  sanskritVerse?: string;
  tags: string[];
  isFeatured?: boolean;
}

export const MEDIA_CATEGORIES_CONFIG = [
  { id: 'all', label: 'All Sacred Media' },
  { id: 'documentaries', label: '4K Films & Documentaries' },
  { id: 'stotras', label: 'Vedic Stotras & Audio' },
  { id: 'scriptures', label: 'Scriptures & Puranas' },
  { id: 'yatras', label: 'Darshan & Yatra Reels' },
  { id: 'podcasts', label: 'Dharma Podcasts' },
] as const;

export const KNOWLEDGE_MEDIA_ITEMS: KnowledgeMediaItem[] = [
  {
    id: 'film-kashi-mahadev',
    title: 'Kashi: The City of Mahadev’s Light',
    subtitle: 'A 4K cinematic expedition into 3,000 years of unbroken Vedic ritual',
    category: 'documentaries',
    categoryLabel: '4K Film',
    type: 'video',
    duration: '28:40',
    thumbnail: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    authorOrSinger: 'Directed by Acharya Vidyadhar',
    templeOrSource: 'Kashi Vishwanath Corridor, Varanasi',
    viewsOrReads: '248K Views',
    description: 'Explore the cosmic geometry of Manikarnika Ghat, the subterranean jyotirlinga sanctum, and the eternal dusk Ganga Aarti with uninterrupted commentary by resident Vedic scholars.',
    fullContent: 'Kashi is not merely a geographic settlement on the sacred curve of Maa Ganga; it is an eternal cosmic threshold where time dissolved. In this 4K film, we step beyond the tourist perimeter into the living garbhagrihas of ancient Shiva temples.',
    sanskritVerse: '॥ वाराणस्यां परं धाम काश्यां विश्वेश्वरो हरिः ॥',
    tags: ['Kashi', 'Shiva', 'Varanasi', 'Ganga Aarti', 'Temple Heritage'],
    isFeatured: true
  },
  {
    id: 'stotra-rudram',
    title: 'Sri Rudram Chamakam (Laghu Nyasa)',
    subtitle: 'Pure Vedic intonation by 108 Kashi Pathashala scholars',
    category: 'stotras',
    categoryLabel: 'Vedic Chant',
    type: 'audio',
    duration: '22:15',
    thumbnail: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=1200&q=80',
    audioTrackName: 'Sri Rudram - Kashi Sanskrit University',
    authorOrSinger: 'Sri Ramanatha Ghanapaathi & 108 Scholars',
    templeOrSource: 'Vedic Shastra Peetham',
    viewsOrReads: '412K Listens',
    description: 'Consecrated Namakam and Chamakam recitation tuned to 432Hz Vedic resonance. Removes planetary discord and awakens peace within home and temple sanctums.',
    sanskritVerse: '॥ ॐ नमस्ते अस्तु भगवन् विश्वेश्वराय महादेवाय त्र्यम्बकाय ॥',
    tags: ['Rudram', 'Vedic Chanting', 'Shiva', 'Mantras'],
    isFeatured: true
  },
  {
    id: 'article-mandala-geometry',
    title: 'The Sacred Science of Temple Vastu & Mandalas',
    subtitle: 'Deciphering the mathematical blueprints of Chola and Nagara shrines',
    category: 'scriptures',
    categoryLabel: 'Sacred Scripture',
    type: 'article',
    readTime: '9 min read',
    thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    authorOrSinger: 'Dr. Subramaniam Sthapati',
    templeOrSource: 'Agama Sthapatya Research Institute',
    viewsOrReads: '89K Reads',
    description: 'How ancient Indian architects translated the cosmos into brass proportions, granite resonance acoustics, and fractal shikharas that concentrate pranic energy.',
    fullContent: 'The Hindu temple is not designed simply as a congregation hall. It is an incarnate manifestation of the Purusha—the Cosmic Divine Being—transmuted into sacred geometry. The Garbhagriha corresponds to the Bindu, the zero-point of origin.',
    sanskritVerse: '॥ प्रासादो वासुदेवस्य रूपं प्रत्यक्षमुच्यते ॥',
    tags: ['Vastu Shastra', 'Temple Architecture', 'Sacred Geometry', 'Vedic Science'],
    isFeatured: true
  },
  {
    id: 'film-kedarnath-winter',
    title: 'Winter of the Immortals: High Kedarnath',
    subtitle: 'Inside the sub-zero snow isolation with the Rawal priests of Kedarnath',
    category: 'documentaries',
    categoryLabel: '4K Film',
    type: 'video',
    duration: '34:10',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    authorOrSinger: 'HOS Documentary Guild',
    templeOrSource: 'Kedarnath Dham, 3,584m Altitude',
    viewsOrReads: '580K Views',
    description: 'When the temple portals close for 6 months and deep Himalayan blizzards blanket the Mandakini valley, how does the sacred flame stay alive? Unprecedented 4K drone cinematography.',
    tags: ['Kedarnath', 'Himalayas', 'Char Dham', 'Winter Tapasya'],
    isFeatured: true
  },
  {
    id: 'stotra-mahamrityunjaya',
    title: 'Maha Mrityunjaya (108 Akhand Jaap)',
    subtitle: 'Rudra Veena & Tanpura resonant meditational chant',
    category: 'stotras',
    categoryLabel: 'Vedic Chant',
    type: 'audio',
    duration: '18:45',
    thumbnail: 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=1200&q=80',
    audioTrackName: 'Maha Mrityunjaya 108 Consecrated Chants',
    authorOrSinger: 'Pandit Ravikant Sharma (Rudra Veena)',
    templeOrSource: 'Mahakaleshwar Jyotirlinga, Ujjain',
    viewsOrReads: '730K Listens',
    description: 'The supreme life-giving mantra from the Rigveda. Calibrated with pure bronze ghanta resonances and deep vocal vibrations to dissolve fear and illnesses.',
    sanskritVerse: '॥ ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥',
    tags: ['Maha Mrityunjaya', 'Healing', 'Meditation', 'Rudra Veena']
  },
  {
    id: 'scripture-upanishad-secrets',
    title: 'Mandukya Upanishad: The 4 States of Consciousness',
    subtitle: 'The timeless non-dual philosophy of OM (Aum) decoded',
    category: 'scriptures',
    categoryLabel: 'Vedic Wisdom',
    type: 'article',
    readTime: '12 min read',
    thumbnail: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=1200&q=80',
    authorOrSinger: 'Swami Vedananda Saraswati',
    templeOrSource: 'Adi Shankara Advaita Peetham, Sringeri',
    viewsOrReads: '115K Reads',
    description: 'Why the Mandukya Upanishad is called the distilled quintessence of all 108 Upanishads. Exploring Jagrat (waking), Swapna (dreaming), Sushupti (deep sleep), and Turiya (pure awareness).',
    fullContent: 'Of all the sacred texts bequeathed to humanity, the Mandukya Upanishad is the most concise yet philosophically profound. In just twelve terse mantras, it maps the entirety of existence onto the four syllables of OM.',
    sanskritVerse: '॥ अयमात्मा ब्रह्म ॥ सर्वं ह्येतद् ब्रह्म ॥',
    tags: ['Upanishads', 'Advaita', 'OM Meditation', 'Consciousness']
  },
  {
    id: 'podcast-char-dham-secrets',
    title: 'The Hidden Geography of Adi Shankaracharya’s Char Dham',
    subtitle: 'Why the four corners of Bharat were established on seismic fault energy lines',
    category: 'podcasts',
    categoryLabel: 'Dharma Podcast',
    type: 'audio',
    duration: '45:12',
    thumbnail: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
    authorOrSinger: 'Hosted by Dr. Raghavendra Rao with Prof. K. Joshi',
    templeOrSource: 'House of Sanatan Studio, Varanasi',
    viewsOrReads: '64K Listens',
    description: 'In this masterclass episode, discover how Adi Shankara unified the four Vedas across Badrinath (Atharva), Puri (Rig), Dwarka (Sama), and Sringeri (Yajur).',
    tags: ['Adi Shankara', 'Char Dham', 'Bharat Heritage', 'Podcast']
  },
  {
    id: 'yatra-badrinath-dawn',
    title: 'Ganga to Alaknanda: The Sacred Descent',
    subtitle: 'A pilgrim’s visual diary from Haridwar to Badrinath Nilkantha Peak',
    category: 'yatras',
    categoryLabel: 'Darshan Reel',
    type: 'video',
    duration: '14:20',
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    authorOrSinger: 'Cinematography by Aarav Nair',
    templeOrSource: 'Badrinath Garhwal Himalaya',
    viewsOrReads: '320K Views',
    description: 'Witness the sunrise aarti where the gold temple spire turns fiery orange against the backdrop of snowy Nilkantha peak. Consecrated holy water abhishek ritual in 4K.',
    tags: ['Badrinath', 'Nilkantha', 'Alaknanda', 'Himalayan Yatra']
  },
  {
    id: 'stotra-vishnu-sahasranamam',
    title: 'Sri Vishnu Sahasranamam (1000 Divine Names)',
    subtitle: 'Traditional chanting with authentic Vedic Swaras and meaning',
    category: 'stotras',
    categoryLabel: 'Vedic Chant',
    type: 'audio',
    duration: '29:50',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    audioTrackName: 'Vishnu Sahasranamam - Srirangam Choir',
    authorOrSinger: 'Rangarajan Bhattar & Temple Archakas',
    templeOrSource: 'Sri Ranganathaswamy Temple, Srirangam',
    viewsOrReads: '510K Listens',
    description: 'Imparted by Bhishma Pitamaha to Yudhisthira on the Kurukshetra battlefield. Elevates focus, removes mental stress, and brings auspicious Vishnu Lakshmi grace.',
    sanskritVerse: '॥ यस्य स्मरणमात्रेण जन्मसंसारबन्धनात् । विमुच्यते नमस्तस्मै विष्णवे प्रभविष्णवे ॥',
    tags: ['Vishnu Sahasranamam', 'Stotra', 'Srirangam', 'Bhakti Yoga']
  },
  {
    id: 'film-artisan-brass',
    title: 'Panchaloha: The Alchemical Secret of Chola Bronzes',
    subtitle: 'How 5-metal lost-wax idols retain consecrated temple energy for 1,000 years',
    category: 'documentaries',
    categoryLabel: '4K Film',
    type: 'video',
    duration: '21:15',
    thumbnail: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=1200&q=80',
    authorOrSinger: 'Documentary by Shilpa Shastra Guild',
    templeOrSource: 'Swamimalai Sculptor Guild, Tamil Nadu',
    viewsOrReads: '190K Views',
    description: 'Step into the blazing kilns of master sculptors who cast Nataraja and Shiva-Parvati according to exact Shilpa Shastra proportions using gold, silver, copper, brass, and zinc.',
    tags: ['Panchaloha', 'Chola Bronzes', 'Temple Art', 'Artisans']
  },
  {
    id: 'podcast-ayurveda-sadhana',
    title: 'Dinacharya: The Vedic Daily Routine for Ageless Vitality',
    subtitle: 'Aligning circadian rhythms with Surya, Brahma Muhurta, and Tridoshas',
    category: 'podcasts',
    categoryLabel: 'Dharma Podcast',
    type: 'audio',
    duration: '38:05',
    thumbnail: 'https://images.unsplash.com/photo-1512290900672-1f55b99a099a?auto=format&fit=crop&w=1200&q=80',
    authorOrSinger: 'Dr. Ananya Vaidya (Vaidya Ratnam)',
    templeOrSource: 'Kerala Ayurveda Gurukulam',
    viewsOrReads: '142K Listens',
    description: 'Why waking up at 4:30 AM (Brahma Muhurta) alters neural plasticity and hormone regulation. Practical lifestyle blueprint for busy urban practitioners.',
    tags: ['Ayurveda', 'Dinacharya', 'Health', 'Sadhana']
  },
  {
    id: 'scripture-gita-karma-yoga',
    title: 'Bhagavad Gita Chapter 3: The Secret of Nishkama Karma',
    subtitle: 'Transforming daily worldly work into effortless spiritual illumination',
    category: 'scriptures',
    categoryLabel: 'Sacred Scripture',
    type: 'article',
    readTime: '11 min read',
    thumbnail: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
    authorOrSinger: 'Acharya Madhusudana',
    templeOrSource: 'Kurukshetra Dharma Kendra',
    viewsOrReads: '210K Reads',
    description: 'Sri Krishna’s timeless formula for performing high-intensity action without burning out or accumulating karmic bondage.',
    fullContent: 'Karmanye vadikaraste ma phaleshu kadachana. Often misconstrued as passivity, this verse is actually the most intense manual of psychological freedom ever spoken.',
    sanskritVerse: '॥ कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    tags: ['Bhagavad Gita', 'Karma Yoga', 'Krishna', 'Philosophy']
  }
];
