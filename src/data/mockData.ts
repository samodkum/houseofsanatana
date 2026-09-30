import { PoojaKit, YatraPackage, Testimonial } from '../types/homepage';

export const POOJA_KITS: PoojaKit[] = [
  {
    id: 'nitya-daily-kit',
    title: 'Nitya Sampoorna Pooja Box',
    subtitle: 'Everything needed for your daily morning & evening puja rituals',
    category: 'daily',
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewsCount: 428,
    image: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller',
    consecratedAt: 'Kashi Vishwanath Corridor',
    shortDesc: 'Handcrafted bell metal diya, 100% pure Bhimseni camphor, organic sandalwood paste, and Gomukhi Gangajal in a brass-embossed presentation chest.',
    idealFor: 'Daily Home Devalaya & Daily Nitya Archana',
    weightGrams: 1450,
    itemsIncluded: [
      { name: 'Pure Brass Akhand Diya', significance: 'Dispels ignorance and invites Sri Mahalakshmi', origin: 'Moradabad Master Artisan Foundry' },
      { name: 'Bhimseni Pure Camphor (100g)', significance: 'Leaves zero residue; purifies prana and home aura', origin: 'Himalayan Pine Resins' },
      { name: 'Govind Kashi Sandalwood Paste', significance: 'Calms the brow chakra during tilak', origin: 'Karnataka Forest Reserves' },
      { name: 'Gomukh Gangajal Sealed Flask (200ml)', significance: 'Pavitra snan and jalabhishekam sanctification', origin: 'Gomukh Glacier, Uttarakhand' },
      { name: 'Kumkum & Roli with Turmeric Base', significance: 'Sattvic tilak and mangal dravya', origin: 'Varanasi Sacred Ghats' },
      { name: 'Natural Loban & Guggal Dhoop Sticks', significance: 'Creates an authentic ancient temple atmosphere', origin: 'Gir Forest Herbs' },
      { name: 'Pure Cotton Hand-rolled Phool Batti (108 pcs)', significance: 'Even burning with cow ghee', origin: 'Mathura Seva Ashram' }
    ]
  },
  {
    id: 'lakshmi-ganesh-anushthan',
    title: 'Maha Lakshmi Anushthan Chest',
    subtitle: 'Opulent ceremonial set for Diwali, Dhanteras & Friday Srividya rituals',
    category: 'festival',
    price: 3999,
    originalPrice: 4999,
    rating: 5.0,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80',
    badge: 'Limited Edition',
    consecratedAt: 'Kanchi Kamakoti Peetham',
    shortDesc: 'Assembled in consultation with traditional temple priests. Includes consecrated silver coin, brass Sri Yantra, and 21 rare Vedic dravyas.',
    idealFor: 'Diwali, Dhanteras, Varalakshmi Vratam & Griha Laxmi Invocation',
    weightGrams: 2800,
    itemsIncluded: [
      { name: 'Gold-Plated Brass Sri Yantra (3D Meru)', significance: 'Radiates positive harmonic cosmic frequencies', origin: 'Consecrated at Kanchi' },
      { name: '999 Pure Consecrated Silver Coin (10g)', significance: 'Permanent Lakshmi Sannidhi token', origin: 'Government Mint Assayed' },
      { name: 'Kashmir Mogra Saffron (1g)', significance: 'Kesar tilak for deities', origin: 'Pampore, Kashmir' },
      { name: '21 Natural Gomti Chakras & Cowries', significance: 'Attracts prosperity and guards against evil eye', origin: 'Dwarka Sea Shore' },
      { name: 'Panchamrit Silver Plated Katori Set', significance: 'For ritual offering to Vigraha', origin: 'Jaipur Silversmiths' },
      { name: 'Red Raw Silk Altar Cloth (Aasan)', significance: 'Pure insulation for meditative pooja', origin: 'Varanasi Weavers Guild' }
    ]
  },
  {
    id: 'vastu-griha-havan',
    title: 'Vastu Shanti & Griha Pravesh Havan Box',
    subtitle: 'Complete Vedic fire ritual samagri with solid copper Havan Kund',
    category: 'havan',
    price: 2799,
    originalPrice: 3499,
    rating: 4.8,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    badge: 'Priest Approved',
    consecratedAt: 'Haridwar Saptarishi Ashram',
    shortDesc: 'Eliminates directional doshas and cleanses new residential or commercial spaces with authentic 108 Vedic medicinal herbs and pure Desi Cow Ghee.',
    idealFor: 'Housewarming, Office Inaugurations & Vastu Dosha Shanti',
    weightGrams: 3600,
    itemsIncluded: [
      { name: 'Solid Copper Havan Kund (8x8 inch)', significance: 'Optimized pyramid geometry for agni energy retention', origin: 'Traditional Copper Guild' },
      { name: '108 Medicinal Herb Samagri (1kg)', significance: 'Air-purifying aromatic resins & dry botanicals', origin: 'Himalayan Foothills' },
      { name: 'A2 Vedic Bilona Gir Cow Ghee (500ml)', significance: 'Pure ahuti offering pleasing to Agni Deva', origin: 'Vrindavan Gaushala' },
      { name: 'Dried Desi Cow Dung Cakes (Gomay)', significance: 'Smoke acts as natural disinfectant and anti-radiation agent', origin: 'Braj Gaushala' },
      { name: 'Copper Sruva & Sruk (Offering Spoons)', significance: 'Traditional Vedic ahuti utensils', origin: 'Moradabad' },
      { name: 'Mango Wood Sticks (Dried & Cleaned)', significance: 'Sattvic samidha fuel for consecrated fire', origin: 'Sacred Grove Certified' }
    ]
  },
  {
    id: 'rudraksha-dhyana-kit',
    title: 'Kailash Siddha Rudraksha & Dhyana Set',
    subtitle: 'Certified 5-Mukhi Nepali Japa Mala, Gomukhi Bag & Copper Jalpatra',
    category: 'meditation',
    price: 2199,
    originalPrice: 2899,
    rating: 4.9,
    reviewsCount: 560,
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    badge: 'Lab Certified',
    consecratedAt: 'Pashupatinath Temple, Nepal',
    shortDesc: 'Authentic 108+1 bead Nepali Rudraksha mala with laboratory X-ray certificate. Prepared with traditional oiling and energized through Shiva Sahasranama.',
    idealFor: 'Daily Mantra Japa, Meditation & Spiritual Grounding',
    weightGrams: 850,
    itemsIncluded: [
      { name: '108+1 Nepali 5-Mukhi Rudraksha Mala (8mm)', significance: 'Shields negative energy and calms blood pressure', origin: 'Sankhuwasabha, Nepal' },
      { name: 'Silk Embroidered Gomukhi Japa Bag', significance: 'Protects the mala from dust and sight during japa', origin: 'Varanasi' },
      { name: 'Pure Hand-hammered Copper Tumbler', significance: 'Stores ionized water overnight for sattvic vitality', origin: 'Tambat Ali, Pune' },
      { name: 'Authentic Bhasma Vibhuti (100g)', significance: 'Reminds seeker of impermanence and Shiva consciousness', origin: 'Varanasi Manikarnika Ashram' },
      { name: 'X-Ray Authenticity Certificate', significance: 'Verifies natural internal compartments & seeds', origin: 'Gemological Research Lab' }
    ]
  }
];

export const TRAVEL_PACKAGES: YatraPackage[] = [
  {
    id: 'puri-jagannath-dham',
    title: 'Puri Jagannath Dham',
    subtitle: 'Sacred Mahaprasad, Snana Bedi & Konark Sun Temple Divine Corridor',
    circuit: 'east',
    durationDays: 4,
    durationNights: 3,
    pricePerPerson: 18500,
    rating: 4.97,
    reviewsCount: 432,
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80',
    badge: 'Chappan Bhog VIP',
    startLocation: 'Bhubaneswar / Puri',
    nextBatches: ['Oct 15, 2026', 'Nov 08, 2026', 'Dec 12, 2026'],
    highlights: [
      'VIP Garbhagriha Darshan of Lord Jagannath, Balabhadra & Subhadra',
      'Authentic 56 Bhog Mahaprasad served directly from Anand Bazar',
      'Guided excursion to Konark Sun Temple & Chandrabhaga Beach',
      'Sacred Sea Snana with Vedic priest and Dhwajarohan viewing'
    ],
    inclusions: [
      'VIP Jagannath Temple Entry',
      'Anand Bazar Chappan Bhog',
      'Heritage Beachfront Resort',
      'Sanskrit Scholar Escort',
      'AC Travel Coach Transfers',
      'Konark Guided Monument Tour'
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
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
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
      'Lake Mansarovar Puja & Yagya',
      'Sherpa Guides & Yak Baggage Support',
      'Satvik High-Altitude Nutrition',
      'Medical Escort with Oxygen Cylinders',
      'Pashupatinath Consecration Darshan'
    ],
    itinerary: [
      { day: 1, title: 'Kathmandu Arrival & Pashupatinath', description: 'Welcome in Kathmandu, VIP Rudrabhishek at sacred Pashupatinath, spiritual yatra briefing.', stay: 'Hyatt Regency, Kathmandu' },
      { day: 2, title: 'Kathmandu to Kyirong / Border', description: 'Fly or drive to border outpost, acclimatization day with guided breathwork rituals.', stay: 'Kyirong Tibetan Guest House' },
      { day: 3, title: 'Drive to Saga across Tibetan Plateau', description: 'Breathtaking journey across the Tibetan high plateau crossing the Yarlung Tsangpo river.', stay: 'Saga Grand Hotel' },
      { day: 4, title: 'Arrival at Holy Lake Mansarovar', description: 'First blessed vision of Mount Kailash and turquoise Mansarovar. Evening sunset meditation on holy lake bank.', stay: 'Mansarovar Lakeshore Guest House' },
      { day: 5, title: 'Mansarovar Holy Snan & Hawan', description: 'Perform sacred holy bath, priest-conducted Hawan yagya, and transfer to Darchen base camp.', stay: 'Darchen Himalayan Hotel' },
      { day: 6, title: 'Parikrama Day 1: Darchen to Dirapuk', description: 'Trek 12 km alongside the Lha Chu river with direct views of the North Face of Mount Kailash.', stay: 'Dirapuk Monastery Lodge' },
      { day: 7, title: 'Parikrama Day 2: Dolma La to Zuthulpuk', description: 'Challenging ascent to Dolma La Pass (5,630m), view sacred Gauri Kund, descent to Zuthulpuk.', stay: 'Zuthulpuk Camp' },
      { day: 8, title: 'Parikrama Day 3 & Return to Saga', description: 'Complete final 8 km kora stretch, re-board luxury coach and journey back toward Saga.', stay: 'Saga Grand Hotel' },
      { day: 9, title: 'Saga to Kyirong Descent', description: 'Descent back into greener valleys, reflecting on the cosmic transformation of Kailash kora.', stay: 'Kyirong Tibetan Guest House' },
      { day: 10, title: 'Return to Kathmandu Valley', description: 'Re-enter Nepal, celebratory satvik thanksgiving feast and relaxation.', stay: 'Hyatt Regency, Kathmandu' },
      { day: 11, title: 'Boudhanath & Dhyana Day', description: 'Meditation day, visit ancient temples and receive consecrated Kailash souvenir kit.', stay: 'Hyatt Regency, Kathmandu' },
      { day: 12, title: 'Kathmandu Temple Exploration', description: 'Swayambhunath, Jal Narayan (sleeping Vishnu), and souvenir blessings.', stay: 'Hyatt Regency, Kathmandu' },
      { day: 13, title: 'Departure with Kailash Jal Urn', description: 'Transfer to Kathmandu International Airport with consecrated Lake Mansarovar water flask.', stay: 'Return Journey' }
    ]
  },
  {
    id: 'kolkata-kali-darshan',
    title: 'Kolkata Kali Darshan',
    subtitle: 'Dakshineswar, Kalighat Shakti Peeth & Belur Math spiritual journey',
    circuit: 'shaktipeeth',
    durationDays: 3,
    durationNights: 2,
    pricePerPerson: 14200,
    rating: 4.94,
    reviewsCount: 388,
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80',
    badge: 'Special Garbhagriha Entry',
    startLocation: 'Kolkata International Airport',
    nextBatches: ['Oct 20, 2026', 'Nov 15, 2026', 'Dec 05, 2026'],
    highlights: [
      'VIP Sugam Darshan at Maa Bhavatarini Mandir, Dakshineswar',
      'Priest-guided Archana at Kalighat 51-Shakti Peeth sanctum sanctorum',
      'Private sunset cruise on sacred Hooghly river to Belur Math',
      'Exclusive access to Sri Ramakrishna Paramahamsa’s meditation Panchavati'
    ],
    inclusions: [
      'VIP Kalighat & Dakshineswar Entry',
      'Private Hooghly Sunset Cruise',
      'Heritage Hotel Kolkata Stay',
      'Authentic Satvik Bengali Bhog',
      'Dedicated Chauffeur Vehicle',
      'Shakti Peeth Blessed Prasad Box'
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
    image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80',
    badge: 'Rakta Vastra Prasad',
    startLocation: 'Guwahati Airport',
    nextBatches: ['Oct 28, 2026', 'Nov 20, 2026', 'Jan 15, 2027'],
    highlights: [
      'VIP Darshan pass to Maa Kamakhya sanctum cave with special priest escort',
      'Blessed Rakta Vastra (sanctified red cloth) and authentic Kamakhya Sindoor',
      'Private river cruise to Umananda temple on world’s smallest river island',
      'Special Chandi Path & Maha Yagya by traditional temple priests'
    ],
    inclusions: [
      'VIP Cave Garbhagriha Darshan',
      'Consecrated Rakta Vastra Box',
      'Brahmaputra Island Ferry Transfer',
      '5-Star Riverview Hotel Stay',
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
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
    badge: 'VIP Charan Darshan',
    startLocation: 'Jaipur / Delhi',
    nextBatches: ['Oct 18, 2026', 'Nov 12, 2026', 'Dec 08, 2026'],
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
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Dr. Radhika Iyer',
    location: 'Bengaluru, India',
    role: 'Vedic Scholar & Educator',
    type: 'kit',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The Nitya Daily Pooja Kit was beyond expectation. The Bhimseni camphor leaves zero residue on the silver aarti plate, and the brass diya has substantial weight. You can instantly tell it is sourced with true reverence and not commercially adulterated.',
    productOrTripTitle: 'Nitya Sampoorna Pooja Box'
  },
  {
    id: 't2',
    name: 'Col. Vikramaditya Rathore',
    location: 'Jaipur, Rajasthan',
    role: 'Retired Army Officer',
    type: 'yatra',
    rating: 5,
    date: '1 month ago',
    comment: 'Taking my elderly parents (78 & 75 yrs) to Kedarnath felt like an impossible dream. House of Sanatan coordinated the helicopter shuttles, VIP oxygen support, and personal assistance so smoothly that my mother shed tears of gratitude in the Garbhagriha.',
    productOrTripTitle: 'Puri Jagannath Dham'
  },
  {
    id: 't3',
    name: 'Ananya & Siddharth Mehta',
    location: 'London, UK',
    role: 'Diaspora Devotees',
    type: 'kit',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Living abroad, finding genuine Gomukh Gangajal and unpolished sandalwood is a struggle. This Maha Lakshmi Anushthan Chest arrived in London within 4 days, packed securely with gold embossing. Our Diwali puja felt divine.',
    productOrTripTitle: 'Maha Lakshmi Anushthan Chest'
  },
  {
    id: 't4',
    name: 'Mahesh Narayanan',
    location: 'Chennai, Tamil Nadu',
    role: 'Classical Carnatic Singer',
    type: 'yatra',
    rating: 5,
    date: 'Last month',
    comment: 'The private VIP darshan in Puri and the divine Chappan Bhog at Anand Bazar was a transcendent spiritual moment. Not once did we have to stand in chaotic queues; everything was dignified and spiritually elevating.',
    productOrTripTitle: 'Puri Jagannath Dham'
  }
];

export const PANCHANG_DATA = {
  tithi: 'Shukla Paksha Dashami',
  nakshatra: 'Rohini (Devata: Brahma)',
  yoga: 'Shobhana',
  shubhMuhurat: 'Abhijit Muhurat: 11:48 AM – 12:36 PM',
  rahuKaal: '04:30 PM – 06:00 PM (Varjya)',
  festiveAlert: {
    festival: 'Chaitra Navratri & Sri Rama Navami',
    daysLeft: 12,
    message: 'Consecrated Navratri Durga Anushthan Kits are now shipping. Order before Muhurat closes.'
  }
};
