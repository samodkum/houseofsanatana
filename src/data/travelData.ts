import { YatraPackage } from '../types/homepage';

export type YatraCircuitType = 
  | 'all'
  | 'himalayas'
  | 'shaktipeeth'
  | 'chardham'
  | 'braj'
  | 'jyotirlinga';

export interface YatraCircuitConfig {
  id: YatraCircuitType;
  label: string;
  sanskrit: string;
  description: string;
  count: number;
}

export const YATRA_CIRCUITS_CONFIG: YatraCircuitConfig[] = [
  { id: 'all', label: 'All Expeditions', sanskrit: '॥ सर्व तीर्थानि ॥', description: 'Explore all consecrated spiritual journeys across Bharat & Kailash', count: 11 },
  { id: 'himalayas', label: 'Himalayan & Kailash', sanskrit: '॥ गिरिराज यात्रा ॥', description: 'Cosmic abodes of Lord Shiva, high-altitude kora & glacier snan', count: 2 },
  { id: 'chardham', label: 'Char Dham & Divine East', sanskrit: '॥ चतुर्धाम क्षेत्र ॥', description: 'Sacred coastal and mountain sanctums of Lord Vishnu & Jagannath', count: 2 },
  { id: 'shaktipeeth', label: '51 Shakti Peethas', sanskrit: '॥ शक्ति पीठम् ॥', description: 'Awakened epicenters of the Divine Mother & Tantric energy sanctums', count: 3 },
  { id: 'braj', label: 'Braj & Rajasthan Dham', sanskrit: '॥ ब्रज मण्डल ॥', description: 'The sacred playground of Sri Radha Krishna & Khatu Shyam Naresh', count: 1 },
  { id: 'jyotirlinga', label: '12 Jyotirlingas', sanskrit: '॥ द्वादश ज्योतिर्लिङ्ग ॥', description: 'Pillar of eternal cosmic fire darshans across Kashi, Shirdi & ancient shrines', count: 3 },
];

export interface SacredFacility {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  description: string;
  features: string[];
}

export const SACRED_FACILITIES: SacredFacility[] = [
  {
    id: 'heritage-havelis',
    title: 'Heritage Palaces & Ashram Suites',
    subtitle: 'Vedic Sanctuary Suites',
    tag: 'Handcrafted Contemplation',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
    description: 'Rest in private consecrated heritage suites, royal Rajasthani havelis, and ocean-facing sanctuaries in Puri, curated for quiet meditative reflection after sacred darshans.',
    features: ['Sound-insulated sadhana rooms', 'Organic Ayurvedic bath oils', 'Temple view balconies', 'Private puja aasan']
  },
  {
    id: 'heli-transits',
    title: 'Private Heli-Shuttles & Oxygen Transits',
    subtitle: 'Sacred Aerial Corridors',
    tag: 'Elder-Friendly Comfort',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    description: 'Dedicated helicopter charters direct to Kedarnath, Badrinath, and high Himalayan halts. Continuous medical officer escort with portable oxygen for senior seekers.',
    features: ['Direct VIP helipad clearance', 'Continuous pulse oximetry care', 'Sherpa porter assistance', 'Zero mountain fatigue']
  },
  {
    id: 'garbhagriha-vip',
    title: 'VIP Garbhagriha & Chandi Hawan Corridors',
    subtitle: 'Sanctum Sanctorum Privileges',
    tag: 'Direct Temple Pujari Connection',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1000&q=80',
    description: 'Pre-arranged Sugam Darshan passes with traditional temple priests. Touch the holy Shivalinga, sit inside the sanctum cave, and receive personal Sankalpa blessings.',
    features: ['Exclusive pre-dawn Aarti entry', 'Name-inscribed Vedic Hawan', 'Consecrated Angavastram gift', 'Zero commercial queues']
  },
  {
    id: 'satvik-gastronomy',
    title: 'Satvik Bhog & 56 Chappan Feast',
    subtitle: 'Consecrated Temple Dining',
    tag: 'Pure Desi Cow Ghee Cuisine',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=80',
    description: 'Wholesome, digestion-friendly satvik meals prepared strictly without onion or garlic using pure A2 Bilona cow ghee, fresh mountain herbs, and authentic temple Mahaprasad.',
    features: ['Authentic Puri Chappan Bhog', 'Fresh herbal Kadha & teas', 'Digestive Ayurvedic breakfast', 'Clean mineral hydration']
  }
];

export interface FeaturedYatraShowcase {
  id: string;
  badge: string;
  yatraId: string;
  title: string;
  sanskritTitle: string;
  location: string;
  image: string;
  tagline: string;
  guideName: string;
  guideRole: string;
  duration: string;
  highlight: string;
  price: number;
}

export const FEATURED_SHOWCASE_YATRAS: FeaturedYatraShowcase[] = [
  {
    id: 'feat-kailash',
    yatraId: 'kailash-mansarovar-yatra',
    badge: '॥ परम कैलास ॥',
    title: 'Kailash Mansarovar Parikrama',
    sanskritTitle: 'कैलास मानसरोवर परिक्रमा',
    location: 'Mount Kailash & Lake Mansarovar, Tibet',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    tagline: 'The supreme circumambulation of Shiva’s cosmic mountain at 5,630m',
    guideName: 'Acharya Vidyadhar Shukla',
    guideRole: 'Chief Vedic Scholar & 14-Time Kora Guide',
    duration: '13 Days / 12 Nights',
    highlight: 'Turquoise Lake Mansarovar Snan & Dolma La Pass',
    price: 185000
  },
  {
    id: 'feat-puri',
    yatraId: 'puri-jagannath-dham',
    badge: '॥ श्री जगन्नाथ धाम ॥',
    title: 'Puri Jagannath & Konark Corridor',
    sanskritTitle: 'पुरी जगन्नाथ महाप्रसाद यात्रा',
    location: 'Puri & Konark, Odisha',
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1200&q=85',
    tagline: 'VIP Garbhagriha Darshan & sacred 56 Bhog Mahaprasad at Anand Bazar',
    guideName: 'Pandit Debasish Panda',
    guideRole: 'Senior Jagannath Temple Sevayat Escort',
    duration: '4 Days / 3 Nights',
    highlight: 'VIP Garbhagriha Entry & Sacred Sea Bathing Ritual',
    price: 18500
  },
  {
    id: 'feat-kedarnath',
    yatraId: 'kedarnath-badrinath-heli',
    badge: '॥ केदार-बद्री धाम ॥',
    title: 'Kedarnath & Badrinath Heli Darshan',
    sanskritTitle: 'केदारनाथ बद्रीनाथ दिव्य दर्शन',
    location: 'Garhwal Himalayas, Uttarakhand',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Private helicopter shuttle with VIP Rudrabhishekam at 11,755 ft',
    guideName: 'Acharya Himanshu Joshi',
    guideRole: 'Kedarkhand Vedic Shastra Scholar',
    duration: '5 Days / 4 Nights',
    highlight: 'Helicopter transfer from Dehradun & VIP sanctum pass',
    price: 68500
  },
  {
    id: 'feat-kamakhya',
    yatraId: 'kamakhya-shakti-peeth',
    badge: '॥ महा कामरूपा ॥',
    title: 'Maa Kamakhya Shakti Peeth',
    sanskritTitle: 'कामाख्या शक्तिपीठ तन्त्र साधना',
    location: 'Nilachal Hill, Guwahati, Assam',
    image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Tantric epicenter with holy cave darshan & consecrated Rakta Vastra',
    guideName: 'Pandit Bhabani Sarma',
    guideRole: 'Hereditary Kamakhya Temple Priest',
    duration: '4 Days / 3 Nights',
    highlight: 'Sacred Cave Spring Touch & Chandi Path Hawan',
    price: 21500
  }
];

export const EXPANDED_TRAVEL_PACKAGES: YatraPackage[] = [
  {
    id: 'puri-jagannath-dham',
    title: 'Puri Jagannath Dham',
    subtitle: 'Sacred Mahaprasad, Snana Bedi & Konark Sun Temple Divine Corridor',
    circuit: 'chardham',
    durationDays: 4,
    durationNights: 3,
    pricePerPerson: 18500,
    rating: 4.97,
    reviewsCount: 432,
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1000&q=80',
    badge: 'Chappan Bhog VIP',
    startLocation: 'Bhubaneswar / Puri',
    nextBatches: ['Oct 15, 2026', 'Nov 08, 2026', 'Dec 12, 2026', 'Jan 18, 2027'],
    highlights: [
      'VIP Garbhagriha Darshan of Lord Jagannath, Balabhadra & Subhadra',
      'Authentic 56 Bhog Mahaprasad served directly from Anand Bazar',
      'Guided excursion to Konark Sun Temple & Chandrabhaga Beach',
      'Sacred Sea Snana with Vedic priest and Dhwajarohan viewing'
    ],
    inclusions: [
      'VIP Jagannath Temple Entry Passes',
      'Anand Bazar Chappan Bhog Tasting',
      'Mayfair Heritage Beachfront Resort',
      'Sanskrit Scholar & Sevayat Escort',
      'AC Travel Coach Transfers',
      'Konark Guided Monument Tour & Entry'
    ],
    itinerary: [
      { day: 1, title: 'Bhubaneswar to Holy Puri', description: 'Arrival in Bhubaneswar, visit Lingaraj temple, scenic drive to Puri with evening Aarti at Jagannath Temple.', stay: 'Mayfair Heritage, Puri' },
      { day: 2, title: 'VIP Darshan & Chappan Bhog', description: 'Pre-dawn VIP Garbhagriha entry, participate in Mangala Aarti, and feast on sacred 56 Bhog Mahaprasad at Anand Bazar.', stay: 'Mayfair Heritage, Puri' },
      { day: 3, title: 'Konark Sun Temple & Marine Drive', description: 'Sunrise drive to Konark UNESCO World Heritage Sun Temple, Chandrabhaga beach holy walk, and evening beach Aarti.', stay: 'Mayfair Heritage, Puri' },
      { day: 4, title: 'Puri Snana & Consecrated Return', description: 'Early morning sea bath with Vedic priest chants, blessing at Gundicha temple, and transfer back to airport.', stay: 'Return Journey' }
    ]
  },
  {
    id: 'kailash-mansarovar-yatra',
    title: 'Kailash Mansarovar Yatra',
    subtitle: 'The ultimate cosmic circumambulation of Lord Shiva’s eternal abode',
    circuit: 'himalayas',
    durationDays: 13,
    durationNights: 12,
    pricePerPerson: 185000,
    rating: 5.0,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    badge: 'Sacred Parikrama',
    startLocation: 'Kathmandu / Lucknow',
    nextBatches: ['May 18, 2026', 'June 14, 2026', 'Aug 22, 2026'],
    highlights: [
      'Holy Snan & Vedic Hawan at turquoise Lake Mansarovar with direct Kailash view',
      '3-Day guided Outer Kora / Parikrama crossing the high Dolma La pass (5,630m)',
      'High-flow medical oxygen support, Sherpa team & SAT-phone connectivity',
      'Pashupatinath VIP Rudrabhishek in Kathmandu before holy ascent'
    ],
    inclusions: [
      'Tibet Visa & Special Military Permits',
      'Lake Mansarovar Puja & Yagya Samagri',
      'Sherpa Guides & Yak Baggage Support',
      'Satvik High-Altitude Nutrition Meals',
      'Medical Escort with Oxygen Cylinders',
      'Pashupatinath Consecration Darshan'
    ],
    itinerary: [
      { day: 1, title: 'Kathmandu Arrival & Pashupatinath', description: 'Welcome in Kathmandu, VIP Rudrabhishek at sacred Pashupatinath, spiritual yatra briefing.', stay: 'Hyatt Regency, Kathmandu' },
      { day: 2, title: 'Kathmandu to Kyirong / Border', description: 'Drive to border outpost, acclimatization day with guided breathwork rituals.', stay: 'Kyirong Tibetan Guest House' },
      { day: 3, title: 'Drive to Saga across Tibetan Plateau', description: 'Breathtaking journey across the Tibetan high plateau crossing the Yarlung Tsangpo river.', stay: 'Saga Grand Hotel' },
      { day: 4, title: 'Arrival at Holy Lake Mansarovar', description: 'First blessed vision of Mount Kailash and turquoise Mansarovar. Sunset meditation on holy lake bank.', stay: 'Mansarovar Lakeshore Guest House' },
      { day: 5, title: 'Mansarovar Holy Snan & Hawan', description: 'Perform sacred holy bath, priest-conducted Hawan yagya, and transfer to Darchen base camp.', stay: 'Darchen Himalayan Hotel' },
      { day: 6, title: 'Parikrama Day 1: Darchen to Dirapuk', description: 'Trek 12 km alongside the Lha Chu river with direct views of the North Face of Mount Kailash.', stay: 'Dirapuk Monastery Lodge' },
      { day: 7, title: 'Parikrama Day 2: Dolma La to Zuthulpuk', description: 'Challenging ascent to Dolma La Pass (5,630m), view sacred Gauri Kund, descent to Zuthulpuk.', stay: 'Zuthulpuk Camp' },
      { day: 8, title: 'Parikrama Day 3 & Return to Saga', description: 'Complete final 8 km kora stretch, re-board luxury coach and journey back toward Saga.', stay: 'Saga Grand Hotel' },
      { day: 9, title: 'Saga to Kyirong Descent', description: 'Descent back into greener valleys, reflecting on the cosmic transformation of Kailash kora.', stay: 'Kyirong Tibetan Guest House' },
      { day: 10, title: 'Return to Kathmandu Valley', description: 'Re-enter Nepal, celebratory satvik thanksgiving feast and relaxation.', stay: 'Hyatt Regency, Kathmandu' },
      { day: 11, title: 'Boudhanath & Dhyana Day', description: 'Meditation day, visit ancient temples and receive consecrated Kailash souvenir kit.', stay: 'Hyatt Regency, Kathmandu' },
      { day: 12, title: 'Departure with Kailash Jal Urn', description: 'Transfer to Kathmandu International Airport with consecrated Lake Mansarovar water flask.', stay: 'Return Journey' }
    ]
  },
  {
    id: 'kedarnath-badrinath-heli',
    title: 'Kedarnath & Badrinath Heli Yatra',
    subtitle: 'Divine twin Himalayan dhams with VIP helicopter access and Rudrabhishek',
    circuit: 'himalayas',
    durationDays: 5,
    durationNights: 4,
    pricePerPerson: 68500,
    rating: 4.98,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    badge: 'Heli Charters VIP',
    startLocation: 'Dehradun / Sahastradhara Helipad',
    nextBatches: ['May 05, 2026', 'June 10, 2026', 'Sept 15, 2026', 'Oct 02, 2026'],
    highlights: [
      'Private helicopter shuttle from Dehradun directly to Kedarnath & Badrinath',
      'VIP Maha Abhishek ticket inside Kedarnath Garbhagriha at 4:00 AM',
      'Hot spring Tapt Kund snan and Mana village (First Indian village) excursion',
      'Luxury mountain resort stays with personalized doctor & oxygen assistance'
    ],
    inclusions: [
      'Sahastradhara Heli Charter Flights',
      'VIP Rudrabhishek Puja Passes',
      'Premium Cottages in Kedarnath & Badrinath',
      'Personal Priest Escort at both shrines',
      'All Pure Satvik Vegetarian Dining',
      'Medical Kit & Dedicated Helipad Chauffeurs'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Dehradun & Briefing', description: 'Arrival at Dehradun hotel, evening spiritual sankalpa, weight check, and briefing by flight commander.', stay: 'Hyatt Regency Dehradun' },
      { day: 2, title: 'Heli Flight to Kedarnath Dham', description: 'Morning flight into Mandakini valley. Landing at Kedarnath helipad. Afternoon priority temple darshan and evening Aarti.', stay: 'Kedar Heights Luxury Camps' },
      { day: 3, title: 'VIP Maha Rudrabhishekam & Flight to Badrinath', description: 'Pre-dawn private Garbhagriha Abhishek. Heli flight over snowclad peaks to Badrinath. Evening Vishnu Sahasranama Aarti.', stay: 'Sarovar Portico Badrinath' },
      { day: 4, title: 'Mana Village, Saraswati River & Tapt Kund', description: 'Visit Vyas Gufa where Mahabharata was penned, Bhim Pul, and afternoon Swarna Aarti at Badri Vishal.', stay: 'Sarovar Portico Badrinath' },
      { day: 5, title: 'Heli Return to Dehradun', description: 'Scenic morning flight back to Dehradun with consecrated dry prasad box, farewell airport transfer.', stay: 'Return Journey' }
    ]
  },
  {
    id: 'kolkata-kali-darshan',
    title: 'Kolkata Kali & Shakti Peeth',
    subtitle: 'Dakshineswar, Kalighat Shakti Peeth & Belur Math spiritual journey',
    circuit: 'shaktipeeth',
    durationDays: 3,
    durationNights: 2,
    pricePerPerson: 14200,
    rating: 4.94,
    reviewsCount: 388,
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1000&q=80',
    badge: 'Special Garbhagriha Entry',
    startLocation: 'Kolkata International Airport',
    nextBatches: ['Oct 20, 2026', 'Nov 15, 2026', 'Dec 05, 2026', 'Jan 12, 2027'],
    highlights: [
      'VIP Sugam Darshan at Maa Bhavatarini Mandir, Dakshineswar',
      'Priest-guided Archana at Kalighat 51-Shakti Peeth sanctum sanctorum',
      'Private sunset cruise on sacred Hooghly river to Belur Math',
      'Exclusive access to Sri Ramakrishna Paramahamsa’s meditation Panchavati'
    ],
    inclusions: [
      'VIP Kalighat & Dakshineswar Entry Passes',
      'Private Hooghly Sunset Cruise Boat',
      'The Oberoi Grand Hotel Kolkata Stay',
      'Authentic Satvik Bengali Bhog & Sweets',
      'Dedicated Chauffeur AC Vehicle',
      'Shakti Peeth Consecrated Prasad Box'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Kalighat Shakti Peeth', description: 'Airport welcome, transfer to hotel. Afternoon priest-escorted special Garbhagriha entry at Kalighat.', stay: 'The Oberoi Grand, Kolkata' },
      { day: 2, title: 'Dakshineswar & Hooghly Cruise to Belur Math', description: 'Morning Bhavatarini Kali Darshan, visit Panchavati grove, board private riverboat to Belur Math for evening Aarti.', stay: 'The Oberoi Grand, Kolkata' },
      { day: 3, title: 'Adyapeath Mandir & Consecrated Farewell', description: 'Morning visit to Adyapeath temple, taste traditional Radhaballavi prasad, and airport transfer.', stay: 'Return Journey' }
    ]
  },
  {
    id: 'kamakhya-shakti-peeth',
    title: 'Kamakhya Shakti Peeth',
    subtitle: 'Tantric epicenter on Nilachal Hill & Umananda Brahmaputra Island',
    circuit: 'shaktipeeth',
    durationDays: 4,
    durationNights: 3,
    pricePerPerson: 21500,
    rating: 4.96,
    reviewsCount: 345,
    image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1000&q=80',
    badge: 'Rakta Vastra Prasad',
    startLocation: 'Guwahati Airport',
    nextBatches: ['Oct 28, 2026', 'Nov 20, 2026', 'Jan 15, 2027', 'Feb 10, 2027'],
    highlights: [
      'VIP Darshan pass to Maa Kamakhya sanctum cave with special priest escort',
      'Blessed Rakta Vastra (sanctified red cloth) and authentic Kamakhya Sindoor',
      'Private river cruise to Umananda temple on world’s smallest river island',
      'Special Chandi Path & Maha Yagya by traditional temple priests'
    ],
    inclusions: [
      'VIP Cave Garbhagriha Darshan Pass',
      'Consecrated Rakta Vastra Gift Box',
      'Brahmaputra Island Ferry Transfer',
      '5-Star Riverview Vivanta Hotel Stay',
      'Assamese Satvik Thali Meals',
      'Dedicated Sanskrit Acharya Guide'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Guwahati & Nilachal Sunset', description: 'Airport pickup, transfer to hotel overlooking Brahmaputra, evening orientation and Nilachal hill view.', stay: 'Vivanta Guwahati' },
      { day: 2, title: 'VIP Maa Kamakhya Garbhagriha Darshan', description: 'Early morning VIP cave entry to touch the natural sacred spring (Yoni Peeth), receive Rakta Vastra, and participate in Chandi Path.', stay: 'Vivanta Guwahati' },
      { day: 3, title: 'Umananda & Navagraha Temples', description: 'Private boat to Umananda Shiva temple on Peacock Island, followed by ancient Navagraha (9 planets) hill temple.', stay: 'Vivanta Guwahati' },
      { day: 4, title: 'Brahmaputra Sunrise & Departure', description: 'Sacred river sunrise sankalpa, visit Basistha Ashram, and departure with blessed Prasad kit.', stay: 'Return Journey' }
    ]
  },
  {
    id: 'khatu-shyam-vrindavan',
    title: 'Khatu Shyam - Vrindavan',
    subtitle: 'Sheesh Ke Daani Khatu Naresh, Salasar Balaji & Braj Bankey Bihari',
    circuit: 'braj',
    durationDays: 5,
    durationNights: 4,
    pricePerPerson: 22800,
    rating: 4.99,
    reviewsCount: 710,
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1000&q=80',
    badge: 'VIP Charan Darshan',
    startLocation: 'Jaipur / Delhi',
    nextBatches: ['Oct 18, 2026', 'Nov 12, 2026', 'Dec 08, 2026', 'Jan 22, 2027'],
    highlights: [
      'VIP Charan Darshan at Khatu Shyam Ji Mandir with Nishan Yatra blessing',
      'Pre-dawn Mangla & Shringar Darshan at Bankey Bihari Temple, Vrindavan',
      'Evening Laser & Light Darshan at Prem Mandir & private Yamuna boat aarti',
      'Salasar Balaji Siddha Peeth special laddu bhog and hawan sankalpa'
    ],
    inclusions: [
      'VIP Passes for Khatu & Bankey Bihari',
      'Private Yamuna River Aarti Boat',
      'Heritage Havelis in Rajasthan & Braj',
      'Pure Satvik Marwari & Brajwasi Cuisine',
      'Luxury AC Chauffeur Coach',
      'Consecrated Khatu Itra & Mor Pankh Kit'
    ],
    itinerary: [
      { day: 1, title: 'Jaipur to Sacred Khatu Dham', description: 'Pickup from Jaipur airport/station, scenic drive to Khatu. Evening VIP Darshan of Sheesh Ke Daani and holy Shyam Kund snan.', stay: 'Radhey Ki Kunj Heritage, Khatu' },
      { day: 2, title: 'Khatu to Salasar Balaji Siddha Peeth', description: 'Morning Nishan pooja at Khatu Dham, scenic drive to Salasar Balaji temple for special Savamani bhog and blessings.', stay: 'Salasar Heritage Resort' },
      { day: 3, title: 'Salasar to the Holy Land of Vrindavan', description: 'Comfortable journey to Vrindavan. Check-in and witness the mesmerizing evening illumination of Prem Mandir.', stay: 'Nidhivan Sarovar Portico, Vrindavan' },
      { day: 4, title: 'Bankey Bihari, Nidhivan & Yamuna Aarti', description: 'Early morning VIP darshan at Thakur Bankey Bihari, visit mystic Nidhivan, and private evening sunset boat Aarti on Yamuna ghat.', stay: 'Nidhivan Sarovar Portico, Vrindavan' },
      { day: 5, title: 'Govardhan Parikrama & Departure', description: 'Visit Govardhan hill, Radha Kund, taste fresh Mathura peda prasadam, and transfer to Delhi or Agra for departure.', stay: 'Return Journey' }
    ]
  },
  {
    id: 'kashi-vishwanath-varanasi',
    title: 'Kashi Vishwanath & Ganga Corridor',
    subtitle: 'The Eternal Moksha Puri, Dashashwamedh Aarti & Sarnath Awakening',
    circuit: 'jyotirlinga',
    durationDays: 4,
    durationNights: 3,
    pricePerPerson: 16900,
    rating: 4.98,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
    badge: 'Sugam Darshan VIP',
    startLocation: 'Varanasi Airport / Cantt',
    nextBatches: ['Oct 25, 2026', 'Nov 18, 2026', 'Dec 15, 2026', 'Feb 05, 2027'],
    highlights: [
      'VIP Sugam Darshan at Kashi Vishwanath Jyotirlinga with Rudrabhishekam',
      'Private Bajra boat reserved for sunrise Ganga Snan and sunset Maha Aarti',
      'Visit to Kaal Bhairav (Kotwal of Kashi) and Sankat Mochan Hanuman Temple',
      'Heritage silk weaver studio tour and authentic Banarasi sattvic feasts'
    ],
    inclusions: [
      'VIP Kashi Vishwanath Corridor Entry',
      'Private River Bajra Boat with Live Shehnai',
      'BrijRama Palace / Taj Ganges Heritage Stay',
      'Traditional Banarasi Satvik Dining',
      'Assi Ghat Vedic Havan Sankalpa',
      'Vedic Acharya Escort throughout'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Varanasi & Kaal Bhairav', description: 'Airport greeting with fresh marigold malas. Check-in, visit Kaal Bhairav temple to take guardian blessing for Kashi entry.', stay: 'BrijRama Palace, Varanasi' },
      { day: 2, title: 'Kashi Vishwanath Rudrabhishek & Ghat Aarti', description: 'Pre-dawn VIP entry into the Golden Corridor for Rudrabhishek. Evening private boat cruise for Dashashwamedh Maha Aarti.', stay: 'BrijRama Palace, Varanasi' },
      { day: 3, title: 'Sarnath, Sankat Mochan & Weaver Trail', description: 'Morning sunrise boat ride to Manikarnika, visit Sarnath deer park where Buddha gave first sermon, evening Sankat Mochan.', stay: 'BrijRama Palace, Varanasi' },
      { day: 4, title: 'Annapurna Darshan & Consecrated Farewell', description: 'Morning visit to Maa Annapurna shrine, taste traditional Banarasi Malaiyo, and airport transfer with holy Ganga jal.', stay: 'Return Journey' }
    ]
  },
  {
    id: 'rameshwaram-madurai-south',
    title: 'Rameshwaram & Madurai Corridor',
    subtitle: 'The Southernmost Jyotirlinga, 22 Sacred Wells & Meenakshi Amman',
    circuit: 'chardham',
    durationDays: 5,
    durationNights: 4,
    pricePerPerson: 24500,
    rating: 4.95,
    reviewsCount: 360,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    badge: '22 Teertham Snan',
    startLocation: 'Madurai Airport',
    nextBatches: ['Nov 05, 2026', 'Dec 02, 2026', 'Jan 10, 2027', 'Feb 18, 2027'],
    highlights: [
      'Sacred bath in all 22 ancient Teerthams (wells) inside Ramanathaswamy Temple',
      'VIP Darshan at Madurai Meenakshi Amman Temple with golden lotus tank walk',
      'Scenic drive across Pamban Sea Bridge to Dhanushkodi & Ram Setu viewpoint',
      'Thiruparankundram Murugan cave temple VIP darshan'
    ],
    inclusions: [
      'VIP passes for Rameshwaram & Meenakshi',
      'Priest escort for 22 Teertham Snan',
      'Heritage Chettinad & Beachfront Hotel Stays',
      'Traditional South Indian Satvik Plantain Feast',
      'AC Chauffeur Transport',
      'Consecrated Spatika Lingam Puja'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Madurai & Meenakshi Darshan', description: 'Pickup at Madurai airport, hotel check-in. Evening VIP Garbhagriha entry into Madurai Meenakshi Amman Temple.', stay: 'Heritage Madurai' },
      { day: 2, title: 'Madurai to Rameshwaram Island', description: 'Scenic drive crossing the legendary Pamban Sea Bridge. Evening walk on Agni Teertham and temple corridor exploration.', stay: 'Daiwik Hotels Rameshwaram' },
      { day: 3, title: '22 Teertham Snan & Spatika Lingam Abhishek', description: 'Early morning sacred holy bath in all 22 temple wells with priest chanting, followed by Spatika Lingam darshan.', stay: 'Daiwik Hotels Rameshwaram' },
      { day: 4, title: 'Dhanushkodi, Ram Setu & Dr. Kalam Memorial', description: 'Sunrise excursion to ghost city of Dhanushkodi and Ram Setu point. Return to Madurai for cultural evening.', stay: 'Heritage Madurai' },
      { day: 5, title: 'Alagar Kovil & Consecrated Return', description: 'Visit Vishnu Alagar Kovil in scenic hills, taste traditional Madurai prasadam, and airport drop.', stay: 'Return Journey' }
    ]
  },
  {
    id: 'shirdi-jyotirlinga-tour',
    title: 'Shirdi & Jyotirlinga Tour',
    subtitle: 'Sai Baba Samadhi Mandir, Trimbakeshwar Jyotirlinga & Shani Shingnapur',
    circuit: 'jyotirlinga',
    durationDays: 4,
    durationNights: 3,
    pricePerPerson: 19500,
    rating: 4.96,
    reviewsCount: 480,
    image: 'https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=1000&q=80',
    badge: 'VIP Kakad Aarti',
    startLocation: 'Mumbai / Pune / Shirdi',
    nextBatches: ['Oct 22, 2026', 'Nov 14, 2026', 'Dec 10, 2026', 'Jan 16, 2027'],
    highlights: [
      'VIP Kakad & Shej Aarti entry passes at Sai Baba Samadhi Mandir, Shirdi',
      'Special Rudrabhishek at Trimbakeshwar Jyotirlinga (Kushaavarta Holy Snan)',
      'Darshan at Swayambhu Shani Dev Temple at Shani Shingnapur with oil abhishek',
      'Dwarkamai, Chavadi & Gurusthan guided meditative walks'
    ],
    inclusions: [
      'VIP Shirdi & Trimbakeshwar Passes',
      'Priest-Guided Kushaavarta Snan',
      '5-Star Stays in Shirdi & Nashik',
      'Satvik Maharashtrian Vegetarian Cuisine',
      'AC Chauffeur Transport',
      'Consecrated Sai Udi & Prasad Box'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Welcome to Holy Shirdi', description: 'Pickup from Mumbai/Pune/Shirdi Airport, check-in, afternoon VIP Darshan of Sai Baba Samadhi and evening Dhoop Aarti.', stay: 'Sun-n-Sand Resort Shirdi' },
      { day: 2, title: 'Pre-Dawn Kakad Aarti & Shani Shingnapur', description: '4:30 AM VIP Kakad Aarti entry, followed by pilgrimage drive to holy Shani Shingnapur for oil anointing.', stay: 'Sun-n-Sand Resort Shirdi' },
      { day: 3, title: 'Shirdi to Nashik & Trimbakeshwar Jyotirlinga', description: 'Scenic morning drive to Nashik. Holy bath at Kushaavarta Kund and priority Garbhagriha Rudrabhishekam at Trimbakeshwar.', stay: 'Courtyard by Marriott Nashik' },
      { day: 4, title: 'Panchavati, Sita Gufa & Consecrated Farewell', description: 'Visit sacred Panchavati, Kalaram temple and departure transfer with blessed Sai Udi and Prasad.', stay: 'Return Journey' }
    ]
  },
  {
    id: '12-jyotirlinga-maha-tour',
    title: '12 Jyotirlinga Maha Tour',
    subtitle: 'The supreme pan-India pilgrimage to Lord Shiva’s eternal pillars of light',
    circuit: 'jyotirlinga',
    durationDays: 14,
    durationNights: 13,
    pricePerPerson: 74900,
    rating: 5.0,
    reviewsCount: 620,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
    badge: 'Maha Jyotirlinga Pass',
    startLocation: 'Delhi / Ahmedabad / Mumbai',
    nextBatches: ['Oct 30, 2026', 'Nov 25, 2026', 'Jan 08, 2027', 'Feb 20, 2027'],
    highlights: [
      'Comprehensive darshan of key Jyotirlingas: Somnath, Mahakaleshwar, Omkareshwar, Kashi, Baidyanath & Mallikarjuna',
      'Bhasma Aarti VIP entry at Mahakaleshwar, Ujjain with traditional Solah robes',
      'Sound & Light show at Arabian Sea shore at Somnath temple',
      'All VIP queue skips, priest-assisted Rudrabhishekams and Ganga Jal urns'
    ],
    inclusions: [
      'All Temple VIP Sugam Darshan Passes',
      'Bhasma Aarti Pre-dawn Entry in Ujjain',
      'Premium 4-Star & 5-Star Hotel Chain Stays',
      'All Pure Satvik Regional Dining',
      'Flight & Train Connections included',
      'Vedic Scholar Acharya Companion'
    ],
    itinerary: [
      { day: 1, title: 'Somnath First Jyotirlinga Darshan', description: 'Arrival in Gujarat, sunset Arabian sea Aarti at Shree Somnath Jyotirlinga.', stay: 'The Fern Somnath' },
      { day: 2, title: 'Nageshwar & Dwarka Dham', description: 'Visit Nageshwar Jyotirlinga, Bet Dwarka island and Dwarkadhish evening Aarti.', stay: 'Dwarkadhish Lords Eco Inn' },
      { day: 3, title: 'Ujjain Mahakaleshwar & Omkareshwar', description: 'Transit to Madhya Pradesh. Witness sacred Narmada Omkareshwar Jyotirlinga parikrama.', stay: 'Ananta Spa Ujjain' },
      { day: 4, title: 'Bhasma Aarti at Mahakal & Kashi Transit', description: 'Sacred 3:30 AM Bhasma Aarti at Mahakaleshwar, flight transit to holy Varanasi.', stay: 'Taj Ganges Varanasi' },
      { day: 5, title: 'Kashi Vishwanath Corridor & Ganga Aarti', description: 'VIP Rudrabhishekam inside Kashi Vishwanath Golden Temple and private bajra boat aarti.', stay: 'Taj Ganges Varanasi' },
      { day: 6, title: 'Deoghar Baba Baidyanath Dham', description: 'Pilgrimage drive to Jharkhand for sacred Jalabhishek at Baba Baidyanath Jyotirlinga.', stay: 'Hotel Baidyanath Deoghar' },
      { day: 7, title: 'Mallikarjuna Srisailam & Rameshwaram', description: 'Flight to Andhra Pradesh, Krishna river snan, Mallikarjuna Darshan, and onwards to Tamil Nadu.', stay: 'Grand Kakinada / Madurai' },
      { day: 8, title: 'Consecrated Return with 12-Jyotirlinga Yantra', description: 'Grand Vedic Hawan, distribution of 12-Jyotirlinga consecrated bronze yantra, departure transfer.', stay: 'Return Journey' }
    ]
  },
  {
    id: '51-shakti-peeth-tour',
    title: 'Shakti Peeth Yatra Tour',
    subtitle: 'Awakened cosmic epicenters of Devi Adishakti across holy Bharat',
    circuit: 'shaktipeeth',
    durationDays: 11,
    durationNights: 10,
    pricePerPerson: 58000,
    rating: 4.97,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1000&q=80',
    badge: 'Chandi Mahayagya',
    startLocation: 'Kolkata / Guwahati / Jammu',
    nextBatches: ['Oct 12, 2026', 'Nov 19, 2026', 'Jan 20, 2027', 'Feb 26, 2027'],
    highlights: [
      'Consecrated pilgrimage covering Kamakhya (Assam), Kalighat (Kolkata), Tarapith, Jwala Ji & Vaishno Devi',
      'Traditional Chandi Homam & Kumari Puja performed by hereditary priests',
      'Blessed Rakta Vastra, authentic Kamakhya Sindoor, and Mata Vaishno Devi Chunari',
      'Dedicated helicopter transfer from Katra to Sanjichhat for Mata Vaishno Devi'
    ],
    inclusions: [
      'VIP Sanctum Passes at all Shakti Peeths',
      'Katra Helicopter Shuttles for Vaishno Devi',
      '5-Star Stays across Kolkata, Guwahati & Katra',
      'Satvik Bhog & Pure Desi Ghee Prasad',
      'Dedicated Sanskrit Acharya & Chandi Pathak',
      'All Domestic Flights & Transfers'
    ],
    itinerary: [
      { day: 1, title: 'Kolkata Kalighat & Tarapith Shakti Peeth', description: 'Welcome in Kolkata, VIP Darshan at Kalighat where Sati’s right toes fell, followed by mystic Tarapith.', stay: 'The Oberoi Grand Kolkata' },
      { day: 2, title: 'Guwahati Maa Kamakhya Nilachal Cave', description: 'Flight to Guwahati. Touch the holy sacred spring cave (Yoni Peeth) and receive consecrated Rakta Vastra.', stay: 'Vivanta Guwahati' },
      { day: 3, title: 'Himachal Jwala Ji & Kangra Devi', description: 'Flight to Dharamshala, visit eternal blue flame at Jwala Ji (tongue of Sati) and Brajeshwari Kangra.', stay: 'Hyatt Regency Dharamshala' },
      { day: 4, title: 'Jammu to Katra & Heli Flight to Vaishno Devi', description: 'Heli shuttle to Sanjichhat, VIP Darshan at Holy Pindi cave of Mata Vaishno Devi.', stay: 'The White Hotel Katra' },
      { day: 5, title: 'Maha Purnahuti & Consecrated Farewell', description: 'Grand Chandi Hawan purnahuti with temple priests, blessing with sanctified Devi Chunari, and departure.', stay: 'Return Journey' }
    ]
  }
];

export const YATRA_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Col. Vikramaditya Rathore',
    location: 'Jaipur, Rajasthan',
    rating: 5,
    yatraTitle: 'Kedarnath & Badrinath Heli Yatra',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: '3 weeks ago',
    comment: 'Taking my elderly parents (78 & 75 yrs) to Kedarnath felt impossible. House of Sanatan coordinated the helicopter shuttles, oxygen support, and personal priest assistance so smoothly that my mother shed tears of gratitude inside the Garbhagriha without a single minute of stress.',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Dr. Radhika & S. Iyer',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    yatraTitle: 'Puri Jagannath Dham',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    date: '1 month ago',
    comment: 'The private VIP darshan in Puri and the sacred 56 Bhog served directly in Anand Bazar was a divine revelation. Not once did we have to face unruly crowds. The sevayat escort was deeply knowledgeable in Shastras.',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Arjun Singhal & Family',
    location: 'London, UK / New Delhi',
    rating: 5,
    yatraTitle: 'Kailash Mansarovar Yatra',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago',
    comment: 'The Sherpa team, doctor with oxygen cylinders, and Acharya Vidyadhar’s daily evening Vedic satsang at Mansarovar converted a grueling high-altitude trek into an awakened spiritual rebirth. Truly flawless execution.',
    verified: true
  }
];

export const YATRA_FAQS = [
  {
    q: 'How does House of Sanatan handle VIP Garbhagriha entry at ancient temples?',
    a: 'We work directly with registered temple management trusts, hereditary sevayat councils, and government VIP sugam darshan protocols. Devotees receive official sanctioned passes and are accompanied by traditional Sanskrit scholars or certified temple priests, avoiding chaotic commercial middlemen entirely.'
  },
  {
    q: 'Are these yatras suitable for elderly parents or family members with mobility challenges?',
    a: 'Absolutely. Over 60% of our pilgrims are senior citizens. We provide private helicopter charters, pre-booked palanquins (doli), wheelchair escorts at temple corridors, portable medical oxygen concentrators, and ground support staff specifically trained in elder care.'
  },
  {
    q: 'What are the dietary arrangements during the yatra?',
    a: 'All meals are 100% Satvik, prepared strictly without onion or garlic, using pure cow ghee and clean filtered water. Wherever available, we arrange authentic temple Mahaprasad (such as Puri Chappan Bhog or Kashi Annapurna Bhog).'
  },
  {
    q: 'Can we customize a private yatra for our family or community group?',
    a: 'Yes. Our bespoke pilgrimage concierge designs custom private itineraries with personalized family dates, exclusive temple yagyas (such as Maha Mrityunjaya or Chandi Hawan), private flights, and dedicated temple acharyas.'
  },
  {
    q: 'What is the refund and cancellation policy for helicopter or high-altitude yatras?',
    a: 'In cases of adverse weather or government flight cancellations in Uttarakhand or Tibet, we follow clear transparent rescheduling protocols or immediate partial refunds as per DGCA & aviation guidelines, with comfortable ground hotel accommodations covered.'
  }
];
