import { PoojaKit } from '../types/homepage';

export type MallCategoryType = 
  | 'all'
  | 'puja-essentials'
  | 'incense'
  | 'murtis'
  | 'books'
  | 'decor'
  | 'malas'
  | 'gift-sets';

export type MallMaterialType = 
  | 'Brass'
  | 'Copper'
  | 'Sandalwood'
  | 'Stone'
  | 'Silver'
  | 'Wood'
  | 'Mixed Materials';

export type MallOccasionType = 
  | 'Daily Worship'
  | 'Festivals'
  | 'Gifting'
  | 'Home Temple'
  | 'Personal Spirituality';

export interface MallProduct {
  id: string;
  title: string;
  subtitle: string;
  category: MallCategoryType;
  categoryLabel: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages?: string[];
  badge?: string; // 'NEW', 'Bestseller', etc.
  consecratedAt: string;
  originLocation: string;
  shortDesc: string;
  fullDesc: string;
  idealFor: string;
  weightGrams: number;
  inStock: boolean;
  material: MallMaterialType;
  occasion: MallOccasionType;
  bgColor?: string;
  itemsIncluded: {
    name: string;
    significance: string;
    origin: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
}

export const MALL_CATEGORIES_CONFIG = [
  { id: 'all', label: 'All Products', count: 42 },
  { id: 'puja-essentials', label: 'Puja Essentials', count: 12 },
  { id: 'incense', label: 'Incense & Fragrances', count: 18 },
  { id: 'murtis', label: 'Idols & Murti', count: 9 },
  { id: 'books', label: 'Books & Wisdom', count: 14 },
  { id: 'decor', label: 'Home Decor', count: 11 },
  { id: 'malas', label: 'Mala & Accessories', count: 8 },
  { id: 'gift-sets', label: 'Gift Sets', count: 6 },
];

export const MALL_MATERIALS_CONFIG = [
  { id: 'Brass', label: 'Brass', count: 12 },
  { id: 'Copper', label: 'Copper', count: 8 },
  { id: 'Sandalwood', label: 'Sandalwood', count: 6 },
  { id: 'Stone', label: 'Stone', count: 4 },
  { id: 'Silver', label: 'Silver', count: 3 },
  { id: 'Wood', label: 'Wood', count: 7 },
  { id: 'Mixed Materials', label: 'Mixed Materials', count: 10 },
];

export const MALL_OCCASIONS_CONFIG = [
  { id: 'Daily Worship', label: 'Daily Worship', count: 18 },
  { id: 'Festivals', label: 'Festivals', count: 12 },
  { id: 'Gifting', label: 'Gifting', count: 10 },
  { id: 'Home Temple', label: 'Home Temple', count: 8 },
  { id: 'Personal Spirituality', label: 'Personal Spirituality', count: 14 },
];

export const MALL_AVAILABILITY_CONFIG = [
  { id: 'in-stock', label: 'In Stock', count: 38 },
  { id: 'pre-order', label: 'Pre-order', count: 4 },
];

// 42 Sacred Products Catalog
export const MALL_PRODUCTS: MallProduct[] = [
  // ==========================================
  // ROW 1 (MATCHING SCREENSHOT EXACTLY)
  // ==========================================
  {
    id: 'handcrafted-brass-diya',
    title: 'Handcrafted Brass Diya',
    subtitle: 'Classic hand-carved Panchaloha diya with deep oil cavity and petal engraving',
    category: 'puja-essentials',
    categoryLabel: 'PUJA ESSENTIALS',
    price: 1299,
    originalPrice: 1699,
    rating: 4.8,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'NEW',
    consecratedAt: 'Kashi Vishwanath Corridor',
    originLocation: 'Moradabad, Uttar Pradesh',
    shortDesc: 'Handcrafted bell metal diya with eternal flame symmetry, consecrated in Kashi.',
    fullDesc: 'Cast using ancient sand-molding techniques by generational metal-smiths of Moradabad. Features a wide base for unwavering balance and an elongated spout for smooth oil flow.',
    idealFor: 'Daily Home Temple Aarti & Evening Sandhya',
    weightGrams: 420,
    inStock: true,
    material: 'Brass',
    occasion: 'Daily Worship',
    itemsIncluded: [
      { name: 'Pure Brass Akhand Diya', significance: 'Dispels ignorance and invites Sri Mahalakshmi', origin: 'Moradabad Master Foundry' },
      { name: 'Pure Cotton Hand-rolled Phool Batti (54 pcs)', significance: 'Even clean burning with cow ghee', origin: 'Mathura Seva Ashram' }
    ],
    specifications: [
      { label: 'Metal', value: '100% Solid Heavy Brass' },
      { label: 'Capacity', value: '120 ml Cow Ghee / Sesame Oil' },
      { label: 'Height', value: '4.2 Inches' }
    ]
  },
  {
    id: 'sandalwood-incense-sticks',
    title: 'Sandalwood Incense Sticks',
    subtitle: 'Aged Mysore Sandalwood hand-rolled agarbatti with botanical resins',
    category: 'incense',
    categoryLabel: 'INCENSE & FRAGRANCES',
    price: 499,
    originalPrice: 650,
    rating: 4.8,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=800&q=80',
    ],
    consecratedAt: 'Chamundeshwari Sanctum, Mysore',
    originLocation: 'Mysore, Karnataka',
    shortDesc: '100% bamboo-core free, dipped in pure distilled Santalum album oil.',
    fullDesc: 'Crafted strictly without synthetic chemical perfumes, phthalates, or charcoal. Produces delicate, calm smoke that purifies the indoor atmosphere and deepens meditative focus.',
    idealFor: 'Morning Meditation, Japa & Evening Twilight Pooja',
    weightGrams: 250,
    inStock: true,
    material: 'Sandalwood',
    occasion: 'Daily Worship',
    itemsIncluded: [
      { name: 'Mysore Chandan Sticks (60 Sticks)', significance: 'Sattvic air purifier and nervous system calmer', origin: 'Mysore Forest Reserves' },
      { name: 'Natural Soapstone Incense Holder', significance: 'Safe ash containment', origin: 'Agra Stone Guild' }
    ],
    specifications: [
      { label: 'Burn Duration', value: '45-50 Minutes per stick' },
      { label: 'Purity', value: 'Zero Charcoal & Zero Phthalates' }
    ]
  },
  {
    id: 'pure-copper-kalash',
    title: 'Pure Copper Kalash',
    subtitle: 'Vedic sanctified Lota / Kalasha for Varuna invocation and Ganga jal',
    category: 'puja-essentials',
    categoryLabel: 'PUJA ESSENTIALS',
    price: 1899,
    originalPrice: 2400,
    rating: 4.9,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1610737242371-5527fefca3ea?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80',
    ],
    consecratedAt: 'Haridwar Brahma Kund',
    originLocation: 'Thanjavur, Tamil Nadu',
    shortDesc: 'Hand-embossed solid virgin copper vessel with sacred auspicious swastik motifs.',
    fullDesc: 'Pure copper carries natural antimicrobials and revitalizes stored water with sattvic ions. Used in Kalasha Sthapana to invoke Varuna Deva and all sacred cosmic rivers.',
    idealFor: 'Navaratri, Diwali, Griha Pravesh & Daily Jalabhishekam',
    weightGrams: 680,
    inStock: true,
    material: 'Copper',
    occasion: 'Festivals',
    itemsIncluded: [
      { name: 'Solid Copper Embossed Kalash (1000ml)', significance: 'Symbol of cosmic fullness and amrita', origin: 'Thanjavur Copper Guild' },
      { name: 'Consecrated Gomukhi Gangajal Flask (100ml)', significance: 'Sanctified water for initial sthapana', origin: 'Gangotri Glacier' }
    ],
    specifications: [
      { label: 'Purity', value: '99.6% Pure Virgin Copper' },
      { label: 'Volume', value: '1.0 Litre' },
      { label: 'Weight', value: '680 Grams' }
    ]
  },
  {
    id: 'rudraksha-mala-108-beads',
    title: 'Rudraksha Mala (108 Beads)',
    subtitle: 'Authentic 5-Mukhi Nepali Rudraksha Mala hand-knotted with silk tassel',
    category: 'malas',
    categoryLabel: 'MALA & ACCESSORIES',
    price: 1999,
    originalPrice: 2600,
    rating: 4.8,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    ],
    consecratedAt: 'Pashupatinath & Kedarnath Sanctum',
    originLocation: 'Sankhuwasabha, Nepal',
    shortDesc: 'Natural 5-mukhi certified beads with uniform mukhi grooves and Guru bead.',
    fullDesc: 'Hand-selected for density, symmetry, and natural energetic vibration. Knotted traditionally with raw saffron silk thread and capped with protective end loops.',
    idealFor: 'Maha Mrityunjaya Japa, Shiva Sadhana & Personal Shielding',
    weightGrams: 110,
    inStock: true,
    material: 'Mixed Materials',
    occasion: 'Personal Spirituality',
    itemsIncluded: [
      { name: '108+1 Nepali Rudraksha Mala (7-8mm)', significance: 'Balances nervous system and shields electromagnetic aura', origin: 'Nepal Foothills' },
      { name: 'Silk Japa Pouch', significance: 'Sacred storage', origin: 'Varanasi' }
    ],
    specifications: [
      { label: 'Bead Count', value: '108 + 1 Meru Bead' },
      { label: 'Origin Certification', value: 'Government Assayed Nepali Seeds' }
    ]
  },

  // ==========================================
  // ROW 2 (MATCHING SCREENSHOT EXACTLY)
  // ==========================================
  {
    id: 'bhagavad-gita-deluxe-edition',
    title: 'Bhagavad Gita (Deluxe Edition)',
    subtitle: 'Hardbound gold-embossed edition with Sanskrit shlokas and English translation',
    category: 'books',
    categoryLabel: 'BOOKS & WISDOM',
    price: 799,
    originalPrice: 1200,
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?auto=format&fit=crop&w=800&q=80',
    ],
    consecratedAt: 'Jyotisar, Kurukshetra',
    originLocation: 'Varanasi Press',
    shortDesc: 'Leather-textured archival hardbound book with gold foil calligraphy and silk bookmark.',
    fullDesc: 'Contains all 700 verses with word-by-word Sanskrit meaning, verse translation, and illuminating philosophical commentary. Printed on non-yellowing acid-free paper.',
    idealFor: 'Daily Swadhyaya, Family Altar & Auspicious Gifting',
    weightGrams: 850,
    inStock: true,
    material: 'Mixed Materials',
    occasion: 'Personal Spirituality',
    itemsIncluded: [
      { name: 'Deluxe Hardbound Bhagavad Gita', significance: 'Supreme scripture of Dharma and Yoga', origin: 'Varanasi' },
      { name: 'Silk Bookmark Ribbon', significance: 'Reading continuity', origin: 'Mathura' }
    ],
    specifications: [
      { label: 'Pages', value: '624 Acid-Free Pages' },
      { label: 'Language', value: 'Sanskrit with English Commentary' },
      { label: 'Cover', value: 'Gold-Foil Embossed Hardbound' }
    ]
  },
  {
    id: 'complete-puja-samagri-box',
    title: 'Complete Puja Samagri Box',
    subtitle: 'Handmade wooden presentation box containing 21 essential Vedic ritual dravyas',
    category: 'gift-sets',
    categoryLabel: 'GIFT SETS',
    price: 2499,
    originalPrice: 3200,
    rating: 4.8,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1610737242371-5527fefca3ea?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'NEW',
    consecratedAt: 'Kashi Vishwanath Corridor',
    originLocation: 'Varanasi & Moradabad',
    shortDesc: 'Brass containers, authentic organic dravyas, and pure camphor in an heirloom chest.',
    fullDesc: 'Curated by temple priests so you never have to search for missing items before a ceremony. Includes organic haldi, kumkum, chandan, dhoop, akshat, janeu, and bell-metal vessels.',
    idealFor: 'Diwali Pooja, Griha Pravesh, Havan & Auspicious Wedding Gift',
    weightGrams: 1600,
    inStock: true,
    material: 'Wood',
    occasion: 'Festivals',
    itemsIncluded: [
      { name: 'Carved Wood Samagri Chest', significance: 'Heirloom ceremonial storage', origin: 'Saharanpur' },
      { name: '21 Pure Vedic Dravyas in Brass Pots', significance: 'Complete Shodashopachara pooja', origin: 'Varanasi' }
    ],
    specifications: [
      { label: 'Items Count', value: '21 Certified Offerings' },
      { label: 'Chest Material', value: 'Seasoned Sheesham Wood with Brass Latch' }
    ]
  },
  {
    id: 'handcrafted-temple-bell',
    title: 'Handcrafted Temple Bell',
    subtitle: 'Resonant bronze & bell-metal Ghanti with sculpted Garuda & Trishul finial',
    category: 'puja-essentials',
    categoryLabel: 'PUJA ESSENTIALS',
    price: 1499,
    originalPrice: 1999,
    rating: 4.7,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    ],
    consecratedAt: 'Tirupati Balaji Sanctum',
    originLocation: 'Swamimalai, Tamil Nadu',
    shortDesc: 'Acoustically tuned bell metal that creates a sustained clearing 528Hz tone.',
    fullDesc: 'According to Agama Shastras, ringing a consecrated bell upon entering worship dispels tamasic energies and activates the Sahasrara chakra. Cast with a balanced clapper for effortless ring.',
    idealFor: 'Home Mandir Daily Aarti, Invocation & Altar Protection',
    weightGrams: 520,
    inStock: true,
    material: 'Brass',
    occasion: 'Home Temple',
    itemsIncluded: [
      { name: 'Solid Bell-Metal Hand Bell', significance: 'Acoustic purification and divine summoning', origin: 'Swamimalai' }
    ],
    specifications: [
      { label: 'Acoustic Frequency', value: 'Long Sustained Harmonic Tone' },
      { label: 'Height', value: '6.5 Inches' }
    ]
  },
  {
    id: 'shiv-lingam-stone',
    title: 'Shiv Lingam (Stone)',
    subtitle: 'Naturally smoothed Narmada River Banalinga with pure Black Granite Yoni base',
    category: 'murtis',
    categoryLabel: 'IDOLS & MURTI',
    price: 2999,
    originalPrice: 3800,
    rating: 4.9,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    ],
    consecratedAt: 'Omkareshwar Jyotirlinga, Madhya Pradesh',
    originLocation: 'Narmada River Bed, Omkareshwar',
    shortDesc: 'Self-manifested Svayambhu stone carrying natural sacred tilak markings.',
    fullDesc: 'Banalingas gathered from the Narmada River are considered naturally consecrated representations of Lord Shiva. Requires minimal formal rituals and radiates calming cosmic serenity.',
    idealFor: 'Daily Water/Milk Abhishekam & Quiet Dhyana Space',
    weightGrams: 980,
    inStock: true,
    material: 'Stone',
    occasion: 'Daily Worship',
    itemsIncluded: [
      { name: 'Natural Narmada Stone Lingam (3.5 inch)', significance: 'Cosmic pillar of consciousness', origin: 'Omkareshwar' },
      { name: 'Solid Black Granite Jalhari (Base)', significance: 'Water runoff directing north', origin: 'Mahabalipuram' }
    ],
    specifications: [
      { label: 'Origin', value: 'Narmada River Bed' },
      { label: 'Weight', value: '980 Grams Combined' }
    ]
  },

  // ==========================================
  // ROW 3 (MATCHING SCREENSHOT EXACTLY)
  // ==========================================
  {
    id: 'brass-puja-thali-set',
    title: 'Brass Puja Thali Set',
    subtitle: '7-piece engraved brass thali set with diya, bell, kalash, and roli bowls',
    category: 'puja-essentials',
    categoryLabel: 'PUJA ESSENTIALS',
    price: 2299,
    originalPrice: 2999,
    rating: 4.8,
    reviewsCount: 67,
    image: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80',
    ],
    consecratedAt: 'Vrindavan Bankey Bihari Temple',
    originLocation: 'Moradabad & Jaipur',
    shortDesc: 'Complete 11-inch ceremonial plate with raised floral borders and matching vessels.',
    fullDesc: 'Includes master plate, Panchamrit katoris, dhoop stand, aarti diya, camphor spoon, and miniature bell. Finished in lustrous golden brass that ages gracefully over decades of worship.',
    idealFor: 'Daily Home Worship, Karwa Chauth, Raksha Bandhan & Diwali',
    weightGrams: 1100,
    inStock: true,
    material: 'Brass',
    occasion: 'Daily Worship',
    itemsIncluded: [
      { name: 'Master Engraved 11-inch Thali', significance: 'Cosmic altar mandala surface', origin: 'Moradabad' },
      { name: '6 Matching Brass Vessels', significance: 'Pooja offerings', origin: 'Moradabad' }
    ],
    specifications: [
      { label: 'Diameter', value: '11 Inches' },
      { label: 'Finish', value: 'Mirror Polish with Protective Natural Lacquer' }
    ]
  },
  {
    id: 'sandalwood-mala',
    title: 'Sandalwood Mala',
    subtitle: '108 Fragrant Red & White Sandalwood beads hand-threaded with silk knotting',
    category: 'malas',
    categoryLabel: 'MALA & ACCESSORIES',
    price: 1799,
    originalPrice: 2200,
    rating: 4.7,
    reviewsCount: 51,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    ],
    consecratedAt: 'Sringeri Sharada Peetham',
    originLocation: 'Mysore, Karnataka',
    shortDesc: 'Natural heartwood beads carrying permanent cooling fragrance.',
    fullDesc: 'Pure aged sandalwood is prized for calming the autonomic nervous system and soothing the heart chakra during prolonged Gayatri and Vishnu japa. Smooth rounded 8mm beads.',
    idealFor: 'Gayatri Mantra, Peace Sadhana & Neck Adornment',
    weightGrams: 85,
    inStock: true,
    material: 'Sandalwood',
    occasion: 'Personal Spirituality',
    itemsIncluded: [
      { name: '108+1 Mysore Sandalwood Mala (8mm)', significance: 'Cools the subtle body and aids mental clarity', origin: 'Karnataka' },
      { name: 'Brocade Storage Pouch', significance: 'Sacred preservation', origin: 'Varanasi' }
    ],
    specifications: [
      { label: 'Wood', value: '100% Genuine Mysore Heartwood' },
      { label: 'Bead Diameter', value: '8.0 mm' }
    ]
  },
  {
    id: 'brass-kamdhenu-idol',
    title: 'Brass Kamdhenu Idol',
    subtitle: 'Sacred wish-fulfilling Kamdhenu Cow with suckling calf on engraved pedestal',
    category: 'decor',
    categoryLabel: 'HOME DECOR',
    price: 3499,
    originalPrice: 4500,
    rating: 4.9,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?auto=format&fit=crop&w=800&q=80',
    ],
    consecratedAt: 'Govardhan Hill & Vrindavan Gaushala',
    originLocation: 'Swamimalai, Tamil Nadu',
    shortDesc: 'Solid brass sculpture depicting all devas residing in Gau Mata.',
    fullDesc: 'According to Vastu Shastra, placing a consecrated Kamdhenu idol in the Ishanya (Northeast) or East direction brings abundance, maternal peace, health, and removes ancestral obstacles.',
    idealFor: 'Vastu Energy Harmonization, Home Living Sanctum & Housewarming',
    weightGrams: 1450,
    inStock: true,
    material: 'Brass',
    occasion: 'Home Temple',
    itemsIncluded: [
      { name: 'Solid Brass Kamdhenu with Calf (6 inch)', significance: 'Embodiment of nurturing cosmic abundance', origin: 'Swamimalai' }
    ],
    specifications: [
      { label: 'Dimensions', value: '6.0" Length x 4.5" Height x 3.0" Width' },
      { label: 'Weight', value: '1.45 kg Solid Cast' }
    ]
  },
  {
    id: 'natural-resin-bakhoor',
    title: 'Natural Resin Bakhoor',
    subtitle: 'Slow-smoldering Sambrani, Guggal & Loban incense resin granules with brass burner',
    category: 'incense',
    categoryLabel: 'INCENSE & FRAGRANCES',
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    reviewsCount: 73,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80',
    ],
    consecratedAt: 'Haridwar Saptarishi Ashram',
    originLocation: 'Gir Forest & Kutch',
    shortDesc: 'Pure tears of Boswellia and Commiphora trees blended with dried temple florals.',
    fullDesc: 'Produces thick, ethereal white smoke that neutralizes stale energies, cleanses room acoustics, and recreates the sanctified air of century-old stone sanctums.',
    idealFor: 'Twilight Dhoop Aarti, Spatial Cleansing & Deep Meditation',
    weightGrams: 350,
    inStock: true,
    material: 'Mixed Materials',
    occasion: 'Daily Worship',
    itemsIncluded: [
      { name: 'Ancient Temple Resin Blend (200g Jar)', significance: 'Antimicrobial and psychic aura cleanser', origin: 'Gir Forests' },
      { name: 'Miniature Carved Brass Dhoop Dani', significance: 'Heat-safe resin burner', origin: 'Moradabad' }
    ],
    specifications: [
      { label: 'Ingredients', value: '100% Tree Resins, Benzoin, Guggal, Camphor' },
      { label: 'Additive', value: 'Zero Synthetic Binders' }
    ]
  },

  // ==========================================
  // PAGE 2 & ADDITIONAL SACRED OFFERINGS (TOTAL 42)
  // ==========================================
  {
    id: 'radha-krishna-panchaloha-vigraha',
    title: 'Sri Radha Krishna Yugala Vigraha',
    subtitle: 'Hand-sculpted lost-wax cast Panchaloha brass altar vigraha',
    category: 'murtis',
    categoryLabel: 'IDOLS & MURTI',
    price: 6499,
    originalPrice: 8500,
    rating: 5.0,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Vrindavan Bankey Bihari Temple',
    originLocation: 'Swamimalai, Tamil Nadu',
    shortDesc: '9-inch solid brass vigraha with micro-detailed flute, peacocks, and mukut.',
    fullDesc: 'Crafted using the ancient Madhuchista Vidhana technique dating back to the Chola period. Undergoes prana-pratishtha archana in Vrindavan.',
    idealFor: 'Griha Mandir Altar, Daily Abhishekam & Bhakti Dhyana',
    weightGrams: 2400,
    inStock: true,
    material: 'Brass',
    occasion: 'Home Temple',
    itemsIncluded: [
      { name: 'Solid Brass Radha Krishna Vigraha', significance: 'Divine love and harmony', origin: 'Swamimalai' }
    ],
    specifications: [
      { label: 'Height', value: '9.0 Inches' },
      { label: 'Alloy', value: '5-Metal Panchaloha Blend' }
    ]
  },
  {
    id: 'maha-lakshmi-anushthan-chest',
    title: 'Maha Lakshmi Anushthan Chest',
    subtitle: 'Opulent ceremonial set with consecrated silver coin, brass Sri Yantra, and 21 rare dravyas',
    category: 'gift-sets',
    categoryLabel: 'GIFT SETS',
    price: 3999,
    originalPrice: 4999,
    rating: 5.0,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80',
    badge: 'Limited Edition',
    consecratedAt: 'Kanchi Kamakoti Peetham',
    originLocation: 'Kanchipuram & Jaipur',
    shortDesc: 'Assembled in consultation with traditional temple priests for Dhanteras & Diwali.',
    fullDesc: 'Specially created for invocation of Ashta Lakshmi. Every item is energized through 1008 Sri Suktam recitations.',
    idealFor: 'Diwali, Dhanteras, Varalakshmi Vratam & Griha Laxmi Invocation',
    weightGrams: 2800,
    inStock: true,
    material: 'Silver',
    occasion: 'Festivals',
    itemsIncluded: [
      { name: '999 Pure Consecrated Silver Coin (10g)', significance: 'Permanent Lakshmi Sannidhi', origin: 'Government Mint' },
      { name: 'Gold-Plated Brass 3D Sri Yantra', significance: 'Wealth and harmony matrix', origin: 'Kanchi' }
    ],
    specifications: [
      { label: 'Coin Purity', value: '99.9% Fine Silver (10g)' },
      { label: 'Box Finish', value: 'Teakwood with Velvet Inlay' }
    ]
  },
  {
    id: 'vastu-griha-copper-havan-kund',
    title: 'Solid Copper Havan Kund & Spoons Set',
    subtitle: 'Pyramid geometry copper havan kund with sruva & sruk offering spoons',
    category: 'puja-essentials',
    categoryLabel: 'PUJA ESSENTIALS',
    price: 2799,
    originalPrice: 3499,
    rating: 4.8,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1610737242371-5527fefca3ea?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Haridwar Saptarishi Ashram',
    originLocation: 'Moradabad, Uttar Pradesh',
    shortDesc: 'Handcrafted solid virgin copper kund for home yajna and agnihotra.',
    fullDesc: 'Engineered with classical step-pyramid angles to maximize heat and ionic dissipation during fire offerings.',
    idealFor: 'Daily Agnihotra, Vastu Shanti & Navachandi Homa',
    weightGrams: 1850,
    inStock: true,
    material: 'Copper',
    occasion: 'Festivals',
    itemsIncluded: [
      { name: 'Solid Copper Kund (8x8 inch)', significance: 'Sacred fire containment', origin: 'Moradabad' }
    ],
    specifications: [
      { label: 'Kund Dimension', value: '8 x 8 x 4.5 Inches' }
    ]
  },
  {
    id: 'kailash-dhyana-japa-kit',
    title: 'Kailash Dhyana & Japa Box',
    subtitle: 'Vedic meditation set with 108 Nepali 5-Mukhi Mala, Gomukhi Bag & Copper Patra',
    category: 'gift-sets',
    categoryLabel: 'GIFT SETS',
    price: 2499,
    originalPrice: 3200,
    rating: 4.95,
    reviewsCount: 395,
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Pashupatinath & Kedarnath',
    originLocation: 'Nepal & Varanasi',
    shortDesc: 'Complete set for quiet sunrise Brahma Muhurta japa.',
    fullDesc: 'Crafted for serious seekers of inner stillness. Includes laboratory certificate of natural compartmental seed structure.',
    idealFor: 'Daily Mantra Japa, Pranayama & Meditation Spaces',
    weightGrams: 950,
    inStock: true,
    material: 'Mixed Materials',
    occasion: 'Personal Spirituality',
    itemsIncluded: [
      { name: '108+1 Nepali Rudraksha Mala', significance: 'Protection and stillness', origin: 'Nepal' }
    ],
    specifications: [
      { label: 'Consecration', value: 'Kedarnath Sahasranama Archana' }
    ]
  },
  {
    id: 'bhimseni-camphor-pure-box',
    title: 'Royal Bhimseni Camphor (Pure Desi Kapur)',
    subtitle: 'Zero-residue 100% natural organic crystalline camphor from pristine pine resins',
    category: 'incense',
    categoryLabel: 'INCENSE & FRAGRANCES',
    price: 649,
    originalPrice: 850,
    rating: 4.9,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Kashi Vishwanath Corridor',
    originLocation: 'Himalayan Foothills',
    shortDesc: 'Leaves zero black soot; vaporizes completely leaving divine fragrance.',
    fullDesc: 'Ancient Agamas prescribe only natural Bhimseni camphor for deities. Produces a radiant, clean flame with remarkable air-purifying qualities.',
    idealFor: 'Daily Aarti, Diffusers & Spatial Purification',
    weightGrams: 200,
    inStock: true,
    material: 'Mixed Materials',
    occasion: 'Daily Worship',
    itemsIncluded: [
      { name: 'Natural Crystalline Camphor (200g)', significance: 'Dispels negative energies', origin: 'Uttarakhand' }
    ],
    specifications: [
      { label: 'Purity', value: '100% Unadulterated Plant Resin' }
    ]
  },
  {
    id: 'pure-kashmir-mogra-saffron',
    title: 'Grade-A1 Kashmir Mogra Saffron (Kesar)',
    subtitle: 'Uncut deep crimson stigmas from Pampore plateau with intoxicating aroma',
    category: 'puja-essentials',
    categoryLabel: 'PUJA ESSENTIALS',
    price: 1850,
    originalPrice: 2400,
    rating: 5.0,
    reviewsCount: 228,
    image: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Sharika Devi Sanctum, Srinagar',
    originLocation: 'Pampore, Kashmir',
    shortDesc: 'Lab-tested crocin level > 240. Handpicked autumn harvest with deep color release.',
    fullDesc: 'Prized for tilak, panchamrit abhishekam, and sacred prasad preparation.',
    idealFor: 'Deity Abhishekam, Sacred Tilak & Prasad',
    weightGrams: 50,
    inStock: true,
    material: 'Mixed Materials',
    occasion: 'Festivals',
    itemsIncluded: [
      { name: 'Pampore Saffron in Glass Vial (2g)', significance: 'Divine solar energy', origin: 'Pampore' }
    ],
    specifications: [
      { label: 'Grade', value: 'ISO 3632 Category 1 Pure Saffron' }
    ]
  },
  {
    id: 'brass-ganesha-shanka-idol',
    title: 'Brass Vighnaharta Ganesha on Lotus',
    subtitle: 'Heavy lost-wax cast Lord Ganesha with modak and abhaya mudra',
    category: 'murtis',
    categoryLabel: 'IDOLS & MURTI',
    price: 3899,
    originalPrice: 4800,
    rating: 4.9,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Siddhivinayak Sanctum, Mumbai',
    originLocation: 'Moradabad, Uttar Pradesh',
    shortDesc: 'Detailed carving of trunk, ornaments, and mouse vehicle on double-lotus base.',
    fullDesc: 'Lord Ganesha is the remover of all obstacles and harbinger of auspicious beginnings.',
    idealFor: 'Office Desk, Home Entrance & New Beginnings',
    weightGrams: 1650,
    inStock: true,
    material: 'Brass',
    occasion: 'Gifting',
    itemsIncluded: [
      { name: 'Solid Brass Ganesha (7 inch)', significance: 'Obstacle removal and wisdom', origin: 'Moradabad' }
    ],
    specifications: [
      { label: 'Height', value: '7.2 Inches' }
    ]
  },
  {
    id: 'sheesham-wood-carved-rehal',
    title: 'Carved Sheesham Wood Book Stand (Rehal)',
    subtitle: 'Hand-carved folding scripture rest with ornate floral jaali cutouts',
    category: 'books',
    categoryLabel: 'BOOKS & WISDOM',
    price: 1199,
    originalPrice: 1599,
    rating: 4.8,
    reviewsCount: 104,
    image: 'https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Kashi Vishwanath Corridor',
    originLocation: 'Saharanpur, Uttar Pradesh',
    shortDesc: 'Crafted from single seasoned plank of Indian rosewood without metal hinges.',
    fullDesc: 'Elevates sacred texts above floor level in accordance with ancient Vedic etiquette.',
    idealFor: 'Reading Gita, Ramayana, Upanishads & Daily Swadhyaya',
    weightGrams: 750,
    inStock: true,
    material: 'Wood',
    occasion: 'Personal Spirituality',
    itemsIncluded: [
      { name: 'Folding Sheesham Rehal (12x6 inch)', significance: 'Respectful elevation of holy scriptures', origin: 'Saharanpur' }
    ],
    specifications: [
      { label: 'Wood', value: 'Natural Seasoned Indian Sheesham' }
    ]
  },
  {
    id: 'tulsi-japa-mala-silver-caps',
    title: 'Vrindavan Shyama Tulsi Japa Mala with Silver Caps',
    subtitle: 'Consecrated Krishna Japa Mala with solid 92.5 silver guru bead and capping',
    category: 'malas',
    categoryLabel: 'MALA & ACCESSORIES',
    price: 1950,
    originalPrice: 2600,
    rating: 5.0,
    reviewsCount: 388,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Radha Raman Temple, Vrindavan',
    originLocation: 'Vrindavan & Jaipur',
    shortDesc: 'Hand-carved from sacred naturally fallen Vrindavan black Shyama Tulsi wood.',
    fullDesc: 'Brings immense devotional absorption during Hare Krishna Mahamantra and Vishnu Sahasranama japa.',
    idealFor: 'Hare Krishna Mahamantra, Gayatri Japa & Daily Wearing',
    weightGrams: 220,
    inStock: true,
    material: 'Silver',
    occasion: 'Personal Spirituality',
    itemsIncluded: [
      { name: '108+1 Shyama Tulsi Mala with Silver Capping', significance: 'Vaishnava japa and throat chakra cooling', origin: 'Vrindavan' }
    ],
    specifications: [
      { label: 'Silver Purity', value: '92.5% Sterling Silver' }
    ]
  },
  {
    id: 'swamimalai-lost-wax-nataraja',
    title: 'Swamimalai Chola Bronze Nataraja',
    subtitle: 'Museum-grade bronze cosmic dancer cast using 1200-year-old lost-wax technique',
    category: 'decor',
    categoryLabel: 'HOME DECOR',
    price: 18500,
    originalPrice: 24000,
    rating: 5.0,
    reviewsCount: 28,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    badge: 'Heirloom Masterpiece',
    consecratedAt: 'Chidambaram Thillai Nataraja Temple',
    originLocation: 'Swamimalai, Tamil Nadu',
    shortDesc: 'Solid bronze casting of Shiva’s Ananda Tandava with arch of flames.',
    fullDesc: 'Crafted strictly according to the Shilpa Shastras by national award-winning sthapatis.',
    idealFor: 'Sanctum Centerpiece, Living Space Vastu & Heirloom Devotion',
    weightGrams: 4200,
    inStock: true,
    material: 'Brass',
    occasion: 'Home Temple',
    itemsIncluded: [
      { name: 'Chola Bronze Nataraja (14 inch)', significance: 'Cosmic cycles of creation and dissolution', origin: 'Swamimalai' }
    ],
    specifications: [
      { label: 'Height', value: '14.0 Inches' },
      { label: 'Weight', value: '4.20 kg Solid Bronze' }
    ]
  },
  {
    id: '3d-meru-sri-yantra-gold',
    title: 'Ashta-Dhatu 3D Maha Meru Sri Yantra',
    subtitle: 'Geometrically precise 3D cosmic blueprint of Divine Mother Lalita Tripurasundari',
    category: 'decor',
    categoryLabel: 'HOME DECOR',
    price: 4500,
    originalPrice: 5800,
    rating: 5.0,
    reviewsCount: 276,
    image: 'https://images.unsplash.com/photo-1610737242371-5527fefca3ea?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Sringeri Sharada Peetham',
    originLocation: 'Swamimalai & Kanchi',
    shortDesc: 'Solid 4-inch pyramid height Sri Yantra with perfect 43 interlocking triangles.',
    fullDesc: 'Placing this consecrated 3D Meru in the Northeast (Ishanya) corner radiates continuous abundance, peace, and spiritual illumination.',
    idealFor: 'Ishanya Vastu Correction, Cash Vault, Altar Srividya Pooja',
    weightGrams: 1650,
    inStock: true,
    material: 'Brass',
    occasion: 'Home Temple',
    itemsIncluded: [
      { name: '3D Maha Meru Sri Yantra (4x4x4 Inch)', significance: 'Cosmic matrix of wealth and harmony', origin: 'Sringeri' }
    ],
    specifications: [
      { label: 'Dimension', value: '4" Width x 4" Depth x 4" Height' }
    ]
  },
  {
    id: 'kashi-chandan-tilak-vati',
    title: 'Govind Kashi Pure Sandalwood Paste & Stone Rub',
    subtitle: 'Aged sandalwood heartwood tablet with granite rub stone for fresh daily tilak',
    category: 'puja-essentials',
    categoryLabel: 'PUJA ESSENTIALS',
    price: 899,
    originalPrice: 1150,
    rating: 4.8,
    reviewsCount: 164,
    image: 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Kashi Vishwanath Corridor',
    originLocation: 'Varanasi, Uttar Pradesh',
    shortDesc: 'Pure aromatic chandan log with circular whetstone for meditative preparation.',
    fullDesc: 'Rubbing sandalwood with rosewater produces cool, authentic paste that calms the Ajna chakra.',
    idealFor: 'Daily Deity Tilak, Ajna Meditation & Cooling Rituals',
    weightGrams: 380,
    inStock: true,
    material: 'Sandalwood',
    occasion: 'Daily Worship',
    itemsIncluded: [
      { name: 'Pure Sandalwood Tablet', significance: 'Cooling sacred paste', origin: 'Karnataka' },
      { name: 'Black Granite Chakla Rub Plate', significance: 'Traditional stone grinder', origin: 'Kashi' }
    ],
    specifications: [
      { label: 'Weight', value: '150g Natural Sandalwood' }
    ]
  },
  {
    id: 'upanishads-hardcover-compendium',
    title: 'The Principal Upanishads — Sacred Compendium',
    subtitle: 'Definitive translation with commentary on the 10 Mukhya Upanishads',
    category: 'books',
    categoryLabel: 'BOOKS & WISDOM',
    price: 1299,
    originalPrice: 1800,
    rating: 4.9,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Sringeri Sharada Peetham',
    originLocation: 'Varanasi',
    shortDesc: 'Clothbound heirloom volume featuring Isha, Kena, Katha, Prashna, Mundaka, Mandukya.',
    fullDesc: 'The bedrock of Advaita Vedanta philosophy, translated with clarity and reverence.',
    idealFor: 'Spiritual Seekers, Vedantic Study & Meditation Libraries',
    weightGrams: 920,
    inStock: true,
    material: 'Mixed Materials',
    occasion: 'Personal Spirituality',
    itemsIncluded: [
      { name: 'The Principal Upanishads (820 Pages)', significance: 'Essence of Vedic revelation', origin: 'Varanasi' }
    ],
    specifications: [
      { label: 'Binding', value: 'Clothbound Hardcover' }
    ]
  },
  {
    id: 'hand-beaten-copper-jalpatra',
    title: 'Hand-Beaten Pure Copper Jalpatra (Water Vessel)',
    subtitle: 'Ayurvedic hammered copper jug with matching tumbler for overnight ionic energizing',
    category: 'puja-essentials',
    categoryLabel: 'PUJA ESSENTIALS',
    price: 1699,
    originalPrice: 2200,
    rating: 4.8,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1610737242371-5527fefca3ea?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Rishikesh Ganga Ghat',
    originLocation: 'Pune, Maharashtra',
    shortDesc: 'Hammered by hand to increase surface area contact for Tamra Jal benefit.',
    fullDesc: 'Drinking water kept overnight in copper balances all three doshas (Vata, Pitta, Kapha).',
    idealFor: 'Daily Morning Tamra Jal & Temple Water Offerings',
    weightGrams: 580,
    inStock: true,
    material: 'Copper',
    occasion: 'Daily Worship',
    itemsIncluded: [
      { name: 'Hammered Copper Jug (1200ml)', significance: 'Ayurvedic copper health', origin: 'Pune' },
      { name: 'Copper Tumbler (300ml)', significance: 'Daily drinking cup', origin: 'Pune' }
    ],
    specifications: [
      { label: 'Copper Purity', value: '99.5% Tested Pure Copper' }
    ]
  },
  {
    id: 'hand-carved-stone-diya-set',
    title: 'Carved Black Granite Diya Lamps (Set of 2)',
    subtitle: 'Heavy black stone oil lamps sculpted from temple-grade granite blocks',
    category: 'puja-essentials',
    categoryLabel: 'PUJA ESSENTIALS',
    price: 1599,
    originalPrice: 2100,
    rating: 4.7,
    reviewsCount: 48,
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Mahabalipuram Shore Temple Sanctum',
    originLocation: 'Mahabalipuram, Tamil Nadu',
    shortDesc: 'Indestructible stone lamps that remain cool to touch during prolonged burning.',
    fullDesc: 'Carved by stone sculptors whose families built South Indian temple gopurams.',
    idealFor: 'Karthikai Deepam, Outdoor Altar & Courtyard Sanctum',
    weightGrams: 1600,
    inStock: true,
    material: 'Stone',
    occasion: 'Daily Worship',
    itemsIncluded: [
      { name: 'Granite Diya Lamps (Pair)', significance: 'Earth stability and eternal light', origin: 'Mahabalipuram' }
    ],
    specifications: [
      { label: 'Material', value: 'High Density Solid Black Granite' }
    ]
  },
  {
    id: 'silver-plated-panchamrit-katoris',
    title: 'Silver Plated Panchamrit Katori Set (Set of 5)',
    subtitle: 'Engraved 999 silver plated bowls on lotus tray for sacred five nectar offerings',
    category: 'puja-essentials',
    categoryLabel: 'PUJA ESSENTIALS',
    price: 2199,
    originalPrice: 2800,
    rating: 4.9,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Kanchi Kamakoti Peetham',
    originLocation: 'Jaipur, Rajasthan',
    shortDesc: 'Designed for milk, curd, honey, ghee, and sugar deity abhishekam offerings.',
    fullDesc: 'Silver is energetically cooling and auspicious for Sri Mahalakshmi puja.',
    idealFor: 'Griha Mandir Abhishekam, Festivals & Wedding Gifting',
    weightGrams: 420,
    inStock: true,
    material: 'Silver',
    occasion: 'Gifting',
    itemsIncluded: [
      { name: '5 Silver Plated Katoris & Lotus Tray', significance: 'Panchamrit ritual offerings', origin: 'Jaipur' }
    ],
    specifications: [
      { label: 'Plating', value: 'Pure 999 Fine Silver (15 Microns)' }
    ]
  },
  {
    id: 'brass-deepalakshmi-holding-diya',
    title: 'Antique Brass Deepalakshmi Lamp',
    subtitle: 'Classical South Indian oil lamp featuring Goddess Lakshmi holding a flame cup',
    category: 'decor',
    categoryLabel: 'HOME DECOR',
    price: 4299,
    originalPrice: 5500,
    rating: 4.9,
    reviewsCount: 62,
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Madurai Meenakshi Amman Temple',
    originLocation: 'Thanjavur, Tamil Nadu',
    shortDesc: '10-inch ceremonial brass statue welcoming guests with divine illumination.',
    fullDesc: 'Deepalakshmi statues have guarded entrance thresholds of sacred Indian palaces and temples for a thousand years.',
    idealFor: 'Foyer Entrance, Mandir Flanks & Auspicious Housewarming',
    weightGrams: 1800,
    inStock: true,
    material: 'Brass',
    occasion: 'Home Temple',
    itemsIncluded: [
      { name: 'Deepalakshmi Brass Statue', significance: 'Welcoming light and prosperity', origin: 'Thanjavur' }
    ],
    specifications: [
      { label: 'Height', value: '10.5 Inches' }
    ]
  },
  {
    id: 'rosewood-mandir-jharokha-shelf',
    title: 'Carved Rosewood Mandir Jharokha Shelf',
    subtitle: 'Rajasthani style wall hanging shrine niche with arched floral jaali pillars',
    category: 'decor',
    categoryLabel: 'HOME DECOR',
    price: 5499,
    originalPrice: 7200,
    rating: 4.8,
    reviewsCount: 43,
    image: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80',
    consecratedAt: 'Pushkar Brahma Temple',
    originLocation: 'Jodhpur, Rajasthan',
    shortDesc: 'Solid seasoned rosewood niche crafted with traditional palace balcony motifs.',
    fullDesc: 'Provides an elevated, dignified sanctum for your chosen deity or sacred bell in modern apartments.',
    idealFor: 'Apartment Home Altars, Compact Sanctums & Living Room Niches',
    weightGrams: 2600,
    inStock: false, // Pre-order test
    material: 'Wood',
    occasion: 'Home Temple',
    itemsIncluded: [
      { name: 'Rosewood Jharokha Shelf', significance: 'Sacred architectural niche', origin: 'Jodhpur' }
    ],
    specifications: [
      { label: 'Dimensions', value: '18" Height x 14" Width x 6" Depth' }
    ]
  },

  // ========================================================
  // SACRED KITS, CORPORATE GIFTING & FESTIVAL KITS OFFERINGS
  // ========================================================
  {
    id: 'nitya-daily-kit',
    title: 'Nitya Sampoorna Pooja Box',
    subtitle: 'Everything needed for your daily morning & evening puja rituals',
    category: 'puja-essentials',
    categoryLabel: 'PUJA KITS',
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewsCount: 428,
    image: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'BESTSELLER',
    consecratedAt: 'Kashi Vishwanath Corridor',
    originLocation: 'Varanasi & Moradabad',
    shortDesc: 'Handcrafted bell metal diya, pure Bhimseni camphor, organic sandalwood paste, and Gomukhi Gangajal in a brass-embossed chest.',
    fullDesc: 'Assembled by traditional temple acharyas. Contains all essential dravyas for a sacred morning and twilight Sandhya prayer without having to buy items separately.',
    idealFor: 'Daily Home Devalaya & Daily Nitya Archana',
    weightGrams: 1450,
    inStock: true,
    material: 'Brass',
    occasion: 'Daily Worship',
    itemsIncluded: [
      { name: 'Pure Brass Akhand Diya', significance: 'Dispels darkness and invites Lakshmi', origin: 'Moradabad' },
      { name: 'Bhimseni Pure Camphor (100g)', significance: 'Leaves zero residue; cleanses prana', origin: 'Himalayas' },
      { name: 'Govind Kashi Sandalwood Paste', significance: 'Calms ajna chakra during tilak', origin: 'Mysore' },
      { name: 'Gomukh Gangajal Flask (200ml)', significance: 'Sanctified snanam offering', origin: 'Gangotri' }
    ],
    specifications: [
      { label: 'Storage Chest', value: 'Brass-embossed Wood presentation chest' },
      { label: 'Total Items', value: '7 Consecrated Dravyas' }
    ]
  },
  {
    id: 'vastu-griha-havan',
    title: 'Vastu Shanti & Griha Pravesh Havan Box',
    subtitle: 'Complete Vedic fire ritual samagri with solid copper Havan Kund',
    category: 'gift-sets',
    categoryLabel: 'PUJA KITS',
    price: 2799,
    originalPrice: 3499,
    rating: 4.8,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    badge: 'PRIEST APPROVED',
    consecratedAt: 'Haridwar Saptarishi Ashram',
    originLocation: 'Haridwar & Moradabad',
    shortDesc: 'Eliminates directional doshas and cleanses residential or corporate spaces with 108 Vedic herbs and Gir Cow Ghee.',
    fullDesc: 'A complete yajna setup formulated for new beginnings. Designed so that priests or family members have every exact proportioned ingredient at hand.',
    idealFor: 'Housewarming, Office Inaugurations & Vastu Dosha Shanti',
    weightGrams: 3600,
    inStock: true,
    material: 'Copper',
    occasion: 'Daily Worship',
    itemsIncluded: [
      { name: 'Solid Copper Havan Kund (8x8 inch)', significance: 'Pyramid geometry for agni energy retention', origin: 'Copper Guild' },
      { name: '108 Medicinal Herb Samagri (1kg)', significance: 'Air purifying aromatic resins', origin: 'Himalayan Foothills' },
      { name: 'A2 Vedic Bilona Gir Cow Ghee (500ml)', significance: 'Pure sacred ahuti', origin: 'Vrindavan Gaushala' }
    ],
    specifications: [
      { label: 'Kund Size', value: '8 x 8 Inches Solid Copper' },
      { label: 'Total Weight', value: '3.6 kg' }
    ]
  },
  {
    id: 'rudraksha-dhyana-kit',
    title: 'Kailash Siddha Rudraksha & Dhyana Set',
    subtitle: 'Certified 5-Mukhi Nepali Japa Mala, Gomukhi Bag & Copper Jalpatra',
    category: 'malas',
    categoryLabel: 'PUJA KITS',
    price: 2199,
    originalPrice: 2899,
    rating: 4.9,
    reviewsCount: 560,
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    badge: 'LAB CERTIFIED',
    consecratedAt: 'Pashupatinath Temple, Nepal',
    originLocation: 'Sankhuwasabha, Nepal',
    shortDesc: 'Authentic 108+1 bead Nepali Rudraksha mala with laboratory X-ray certificate and copper water tumbler.',
    fullDesc: 'Prepared through traditional mustard oil seasoning and energized through Shiva Sahasranama chanting at holy Pashupatinath.',
    idealFor: 'Daily Mantra Japa, Meditation & Spiritual Shielding',
    weightGrams: 850,
    inStock: true,
    material: 'Mixed Materials',
    occasion: 'Personal Spirituality',
    itemsIncluded: [
      { name: '108+1 Nepali Rudraksha Mala (8mm)', significance: 'Shields electromagnetic aura', origin: 'Nepal' },
      { name: 'Silk Embroidered Gomukhi Bag', significance: 'Protects mala from dust and sight', origin: 'Varanasi' },
      { name: 'Pure Hand-hammered Copper Tumbler', significance: 'Stores ionized water overnight', origin: 'Pune' }
    ],
    specifications: [
      { label: 'Certificate', value: 'Gemological Lab X-Ray Certificate Included' },
      { label: 'Beads', value: '108 + 1 Guru Bead' }
    ]
  },
  {
    id: 'sandalwood-sadhana-kit',
    title: 'Mysore Sandalwood & Camphor Sadhana Kit',
    subtitle: 'Pure botanical sandalwood paste, Bhimseni camphor, and ceramic burner',
    category: 'incense',
    categoryLabel: 'PUJA KITS',
    price: 1399,
    originalPrice: 1799,
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80',
    badge: 'PURE ORGANIC',
    consecratedAt: 'Chamundeshwari Sanctum, Mysore',
    originLocation: 'Mysore, Karnataka',
    shortDesc: 'Sattvic sensory kit for evening twilight prayers and personal meditation.',
    fullDesc: '100% natural, chemical-free fragrance components designed to create a peaceful temple atmosphere in any room.',
    idealFor: 'Evening Aarti, Daily Japa & Quiet Reflection',
    weightGrams: 620,
    inStock: true,
    material: 'Sandalwood',
    occasion: 'Daily Worship',
    itemsIncluded: [
      { name: 'Mysore Chandan Paste & Wooden Grinding Stone', significance: 'Cooling tilak offering', origin: 'Mysore' },
      { name: 'Pure Bhimseni Camphor Flask (150g)', significance: 'Residue-free holy fire', origin: 'Himalayas' }
    ],
    specifications: [
      { label: 'Purity', value: '100% Organic & Chemical-Free' }
    ]
  },

  // CORPORATE GIFTING
  {
    id: 'consecrated-silver-coin-chest',
    title: '999 Consecrated Silver Coin Keepsake',
    subtitle: 'Government assayed 999 fine silver coin embossed with Sri Lakshmi & Ganesha',
    category: 'gift-sets',
    categoryLabel: 'CORPORATE GIFT',
    price: 3499,
    originalPrice: 4299,
    rating: 5.0,
    reviewsCount: 178,
    image: 'https://images.unsplash.com/photo-1610737242371-5527fefca3ea?auto=format&fit=crop&w=800&q=80',
    badge: 'EXECUTIVE LUXURY',
    consecratedAt: 'Kanchi Kamakoti Peetham',
    originLocation: 'Jaipur Silversmiths',
    shortDesc: 'Pure silver bullion keepsake encased in hand-carved velvet-lined teak wood case.',
    fullDesc: 'Ideal for executive gifting, annual company milestones, and Diwali corporate relations. Consecrated with Mahalakshmi Ashtakam chanting.',
    idealFor: 'Executive Milestones, Board Member Gifts & Corporate Diwali',
    weightGrams: 350,
    inStock: true,
    material: 'Silver',
    occasion: 'Gifting',
    itemsIncluded: [
      { name: '999 Fine Silver Coin (20g)', significance: 'Perpetual wealth and wisdom blessing', origin: 'Government Assayed Mint' },
      { name: 'Hand-carved Velvet-lined Teak Chest', significance: 'Prestigious keepsake display', origin: 'Jaipur' }
    ],
    specifications: [
      { label: 'Silver Purity', value: '99.9% Assayed Silver' },
      { label: 'Weight', value: '20 Grams Pure Bullion' }
    ]
  },
  {
    id: 'royal-mysore-sandalwood-gift-hamper',
    title: 'Royal Mysore Sandalwood Desk Sanctum',
    subtitle: 'Handcrafted rosewood tray with pure sandalwood oil, dhoop, and brass burner',
    category: 'gift-sets',
    categoryLabel: 'CORPORATE GIFT',
    price: 2899,
    originalPrice: 3600,
    rating: 4.9,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80',
    badge: 'BESPOKE',
    consecratedAt: 'Mysore Palace Temple',
    originLocation: 'Mysore & Saharanpur',
    shortDesc: 'A calming aromatic desk companion crafted for high-performing executives and corporate workspaces.',
    fullDesc: 'A curated ensemble bringing calm, clarity, and auspicious energy to modern offices.',
    idealFor: 'C-Suite Gifting, Client Appreciation & Auspicious Office Sanctum',
    weightGrams: 890,
    inStock: true,
    material: 'Wood',
    occasion: 'Gifting',
    itemsIncluded: [
      { name: 'Aged Mysore Sandalwood Oil (10ml)', significance: 'Mental clarity and stress relief', origin: 'Mysore' },
      { name: 'Solid Brass Lotus Agarbatti Stand', significance: 'Aesthetic desk piece', origin: 'Moradabad' }
    ],
    specifications: [
      { label: 'Tray Material', value: 'Seasoned Indian Rosewood' }
    ]
  },
  {
    id: 'himalayan-kesar-shilajit-executive-box',
    title: 'Himalayan Kesar & Shilajit Wellness Hamper',
    subtitle: 'Grade A1 Pampore saffron, purified resin shilajit, and raw forest honey',
    category: 'gift-sets',
    categoryLabel: 'CORPORATE GIFT',
    price: 4199,
    originalPrice: 5200,
    rating: 4.9,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    badge: 'WELLNESS ELIXIR',
    consecratedAt: 'Badrinath Sanctum',
    originLocation: 'Kashmir & Himalayas',
    shortDesc: 'A premium Ayurvedic wellness gift set combining rare high-altitude rasayanas.',
    fullDesc: 'Celebrates Indian longevity traditions. Presented in an elegant gold-embossed magnetic keepsake box with testing certificates.',
    idealFor: 'VIP Partner Gifting, Health & Vitality Milestones',
    weightGrams: 750,
    inStock: true,
    material: 'Mixed Materials',
    occasion: 'Gifting',
    itemsIncluded: [
      { name: 'Pampore Mongra Saffron (2g)', significance: 'Supreme antioxidant and sattvic aura', origin: 'Kashmir' },
      { name: 'Purified Himalayan Shilajit (20g)', significance: 'Prana and cellular vitality', origin: 'High Himalayas' }
    ],
    specifications: [
      { label: 'Purity Assays', value: 'Third-Party NABL Certified' }
    ]
  },

  // FESTIVAL KITS
  {
    id: 'lakshmi-ganesh-anushthan',
    title: 'Maha Lakshmi Anushthan Chest',
    subtitle: 'Opulent ceremonial set for Diwali, Dhanteras & Friday Srividya rituals',
    category: 'gift-sets',
    categoryLabel: 'FESTIVAL KIT',
    price: 3999,
    originalPrice: 4999,
    rating: 5.0,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80',
    badge: 'LIMITED EDITION',
    consecratedAt: 'Kanchi Kamakoti Peetham',
    originLocation: 'Kanchi & Varanasi',
    shortDesc: 'Assembled in consultation with traditional temple priests. Includes consecrated silver coin and 21 rare Vedic dravyas.',
    fullDesc: 'The gold standard for festival worship. Infused with auspicious mantras to invite prosperity and peace into your household.',
    idealFor: 'Diwali, Dhanteras, Varalakshmi Vratam & Griha Lakshmi Invocation',
    weightGrams: 2800,
    inStock: true,
    material: 'Brass',
    occasion: 'Festivals',
    itemsIncluded: [
      { name: 'Gold-Plated Brass Sri Yantra (3D Meru)', significance: 'Radiates cosmic frequencies', origin: 'Kanchi' },
      { name: '999 Pure Silver Coin (10g)', significance: 'Lakshmi token of permanence', origin: 'Govt Mint' },
      { name: '21 Natural Gomti Chakras & Cowries', significance: 'Attracts prosperity and guards aura', origin: 'Dwarka' }
    ],
    specifications: [
      { label: 'Occasion', value: 'Diwali, Dhanteras & Friday Puja' }
    ]
  },
  {
    id: 'diwali-deepotsav-maha-box',
    title: 'Diwali Deepotsav Maha Celebration Box',
    subtitle: 'Grand 108 earthen & brass diyas, A2 cow ghee, Ganga jal, and Lakshmi coin',
    category: 'gift-sets',
    categoryLabel: 'FESTIVAL KIT',
    price: 3299,
    originalPrice: 4200,
    rating: 4.9,
    reviewsCount: 245,
    image: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=800&q=80',
    badge: 'FESTIVAL SPECIAL',
    consecratedAt: 'Ayodhya Ram Janmabhoomi',
    originLocation: 'Ayodhya & Moradabad',
    shortDesc: 'Everything needed to illuminate your entire residence with sacred, positive agni on Diwali night.',
    fullDesc: 'Includes master brass Lakshmi diya, hand-pressed terracotta deepaks, raw cotton wicks, and consecrated incense.',
    idealFor: 'Diwali Night Deepotsav & Kartika Masa Deepam',
    weightGrams: 3100,
    inStock: true,
    material: 'Brass',
    occasion: 'Festivals',
    itemsIncluded: [
      { name: 'Master Brass Lakshmi Deepam', significance: 'Central sanctum lamp', origin: 'Moradabad' },
      { name: 'Pure Gir Cow Ghee (500ml)', significance: 'Smokeless sacred flame', origin: 'Vrindavan' }
    ],
    specifications: [
      { label: 'Kit Type', value: 'Complete Diwali Illumination Box' }
    ]
  },
  {
    id: 'navaratri-durga-saptashati-set',
    title: 'Navaratri Durga Saptashati Anushthan Set',
    subtitle: 'Complete 9-day Navadurga puja samagri, silver trishul coin, and Akhand Diya',
    category: 'gift-sets',
    categoryLabel: 'FESTIVAL KIT',
    price: 2999,
    originalPrice: 3800,
    rating: 4.9,
    reviewsCount: 168,
    image: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80',
    badge: 'NAVARATRI SPECIAL',
    consecratedAt: 'Kolkata Kalighat & Kamakhya',
    originLocation: 'Kolkata & Varanasi',
    shortDesc: 'Formulated for 9 nights of Durga worship with daily color-coded offerings and Devi vastras.',
    fullDesc: 'Includes nine organic incense formulations, kumkum from Shakti Peethams, and a red silk altar cloth.',
    idealFor: 'Chaitra & Sharadiya Navaratri 9-Day Sadhana',
    weightGrams: 2400,
    inStock: true,
    material: 'Brass',
    occasion: 'Festivals',
    itemsIncluded: [
      { name: 'Brass Akhand Jyot Lamp (48hr)', significance: 'Unbroken sacred flame for 9 nights', origin: 'Moradabad' },
      { name: 'Kamakhya Consecrated Sindoor', significance: 'Devi prasad and divine protection', origin: 'Kamakhya' }
    ],
    specifications: [
      { label: 'Duration', value: 'Full 9-Night Ritual Supply' }
    ]
  },
  {
    id: 'maha-shivratri-rudrabhishek-box',
    title: 'Maha Shivratri Consecrated Rudrabhishek Set',
    subtitle: 'Pure copper Abhishek Patra, Narmadeshwar Shivling, Bhasma & Bilva leaves',
    category: 'gift-sets',
    categoryLabel: 'FESTIVAL KIT',
    price: 3499,
    originalPrice: 4400,
    rating: 5.0,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
    badge: 'SHIVRATRI SPECIAL',
    consecratedAt: 'Kashi Vishwanath Jyotirlinga',
    originLocation: 'Varanasi, Uttar Pradesh',
    shortDesc: 'A complete abhishekam set with drip-stand for continuous holy stream offering to Lord Shiva.',
    fullDesc: 'Sanctified at Kashi during Pradosham. Comes with authentic Narmada Banalinga, copper lota, and authentic vibhuti.',
    idealFor: 'Maha Shivratri, Masik Shivratri & Monday Abhishekam',
    weightGrams: 2200,
    inStock: true,
    material: 'Copper',
    occasion: 'Festivals',
    itemsIncluded: [
      { name: 'Copper Abhishek Patra with Tripod Stand', significance: 'Continuous drip over Lingam', origin: 'Tambat Ali, Pune' },
      { name: 'Narmada Stone Banalinga (3 Inch)', significance: 'Self-manifested sacred stone', origin: 'Omkareshwar' }
    ],
    specifications: [
      { label: 'Metal', value: '100% Solid Pure Copper' }
    ]
  },
  {
    id: 'siddhi-vinayak-ganesh-utsav-box',
    title: 'Siddhi Vinayak Chaturthi Utsav Box',
    subtitle: 'Eco-friendly clay Ganesh idol, Modak brass mould, Durva and sacred red vastra',
    category: 'gift-sets',
    categoryLabel: 'FESTIVAL KIT',
    price: 2699,
    originalPrice: 3200,
    rating: 4.8,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?auto=format&fit=crop&w=800&q=80',
    badge: 'GANESH UTSAV',
    consecratedAt: 'Siddhivinayak Temple, Mumbai',
    originLocation: 'Pen & Pune, Maharashtra',
    shortDesc: 'Complete ceremonial kit for welcoming Bappa home during Ganeshotsav.',
    fullDesc: 'Crafted with 100% biodegradable river clay and natural organic turmeric-geru colors that dissolve safely in water for Visarjan.',
    idealFor: 'Ganesh Chaturthi, Vinayaka Chavithi & Sankashti Chaturthi',
    weightGrams: 2900,
    inStock: true,
    material: 'Mixed Materials',
    occasion: 'Festivals',
    itemsIncluded: [
      { name: 'Eco-Friendly Shadu Clay Ganesha (8 Inch)', significance: 'Biodegradable consecrated murti', origin: 'Pen, Maharashtra' },
      { name: 'Heavy Cast Brass Modak Mould', significance: 'For making 21 sacred prasad modaks', origin: 'Moradabad' }
    ],
    specifications: [
      { label: 'Eco-Purity', value: '100% Soluble River Clay' }
    ]
  }
];

export const MALL_FAQS = [
  {
    question: 'How are the items consecrated before dispatch?',
    answer: 'Every pooja kit, vigraha, and yantra in Santana Mall is taken directly to our affiliated sanctums in Kashi, Kanchi, Vrindavan, Haridwar, or Pashupatinath. Traditional temple priests perform authentic Vedic sankalpa, Sahasranama archana, and prana-pratishtha blessings before placing the item in our tamper-proof consecrated seal.'
  },
  {
    question: 'What is the guarantee of purity for camphor, sandalwood, and ghee?',
    answer: 'We maintain strict laboratory assay certificates for every batch. Our Bhimseni camphor is 100% pine-derived with 0% residue; our sandalwood is government-assayed Mysore heartwood; and our A2 Ghee is hand-churned in traditional wooden bilonas with zero preservatives or chemical additives.'
  },
  {
    question: 'Can I order custom ceremonial sets for specific pujas?',
    answer: 'Yes. For Griha Pravesh, Vivaha, Navagraha Shanti, Rudrabhishekam, or specific family anushthans, you can use our Co-Create portal or WhatsApp our temple acharyas to prepare custom-assembled kits tailored to your family gotra and traditions.'
  },
  {
    question: 'How are the brass murtis and fragile ceramic jars packed for shipping?',
    answer: 'All vigrahas and dravyas are encased in shock-absorbent multi-layer eco-cushioning and packed inside rigid presentation chests. Each package is insured and dispatched via high-speed priority couriers across all pin codes in India and 40+ countries worldwide.'
  }
];
