import React, { useState } from 'react';
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube, 
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Compass,
  Truck,
  FileText,
  Lock,
  X,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onNavigateAccount?: () => void;
  onNavigatePage?: (page: 'home' | 'mall' | 'travel' | 'join' | 'media' | 'account', sectionId?: string) => void;
}

interface FooterNavItem {
  id: string;
  label: string;
  sanskrit: string;
  href: string;
  page: 'home' | 'mall' | 'travel' | 'join' | 'media' | 'account';
  sectionId?: string;
}

const FOOTER_NAV_ITEMS: FooterNavItem[] = [
  { id: 'home', label: 'Home', sanskrit: '॥ मुखपृष्ठम् ॥', href: '#home', page: 'home' },
  { id: 'join', label: 'Join House of Sanatana', sanskrit: '॥ सङ्घ प्रवेशम् ॥', href: '#join', page: 'join' },
  { id: 'mall', label: 'Santana Mall', sanskrit: '॥ सनातन हाट ॥', href: '#santana-mall', page: 'mall' },
  { id: 'travel', label: 'Sacred Yatras', sanskrit: '॥ तीर्थ यात्रा ॥', href: '#travel', page: 'travel' },
  { id: 'media', label: 'Co-Creator Program', sanskrit: '॥ सह-स्रष्टा सङ्घ ॥', href: '#media', page: 'media' },
  { id: 'account', label: 'My Account', sanskrit: '॥ साधक खाता ॥', href: '/account', page: 'account' },
];

interface PolicyDetail {
  id: string;
  title: string;
  tagline: string;
  icon: React.ElementType;
  sections: {
    heading: string;
    content: string;
  }[];
}

const BRAND_POLICIES: PolicyDetail[] = [
  {
    id: 'consecration',
    title: 'Consecration & Authenticity Guarantee',
    tagline: 'Vedic Sanctity, Prana Pratishtha & Tamper-Proof Seals',
    icon: ShieldCheck,
    sections: [
      {
        heading: 'Sanctified Lineage & Peetham Validation',
        content: 'Every idol, sacred yantra, rudraksha, and puja samagri available at House of Sanatana is ethically sourced and ritually consecrated under authentic Vedic traditions by accredited Peetham Acharyas and Matha priests.'
      },
      {
        heading: 'Vedic Purity Certification',
        content: 'All panchdhatu, ashtadhatu, and certified brass artifacts bear our sanctum certificate of purity. Gemstones and rudrakshas undergo third-party laboratory verification for natural origin and density.'
      },
      {
        heading: 'Sanctum Tamper-Proof Packaging',
        content: 'Consecrated items are housed in sacred cloth wraps and sealed with tamper-evident sanctum wax/foil bands to safeguard their energized spiritual frequency from non-consecrated contact during transit.'
      }
    ]
  },
  {
    id: 'returns',
    title: 'Sacred Offerings & Return Policy',
    tagline: 'Preserving Ritual Sanctity & Devotee Satisfaction',
    icon: RotateCcw,
    sections: [
      {
        heading: 'The Sacred Sanctity Rule',
        content: 'Due to the ritually energized nature of consecrated idols, malas, vibhuti, kumkum, and puja dravyas, opened or unwrapped articles cannot be accepted back once the sanctum seal is broken or energized worship has been initiated.'
      },
      {
        heading: 'Transit Damage & Imperfection Guarantee',
        content: 'If an item arrives damaged, fractured, or spiritually unsealed during transit, report within 48 hours of delivery with unboxing photographs. We will arrange an expedited, consecrated replacement or full refund after review by our temple dispatch desk.'
      },
      {
        heading: 'Resolution Timeframe',
        content: 'Replacement requests are verified within 24 business hours. Replacements are shipped via priority temple courier within 2-3 business days accompanied by complimentary purifying Ganga jal.'
      }
    ]
  },
  {
    id: 'yatras',
    title: 'Sacred Yatra & Pilgrimage Policy',
    tagline: 'High-Altitude Protocols, Helicopter Clearance & Rescheduling',
    icon: Compass,
    sections: [
      {
        heading: 'Devotee Health & Medical Mandatory Clearance',
        content: 'All yatris undertaking Char Dham, Kailash Mansarovar, or high-altitude Himalayan journeys must submit medical fitness certificates and biometric clearances in compliance with Uttarakhand Tourism and Shrine Board guidelines.'
      },
      {
        heading: 'Weather Delays & Heli-Aviation Governance',
        content: 'Heli-shuttle operations in Kedarnath and Badrinath sectors are subject to DGCA safety norms and local mountain visibility. In case of force majeure or weather suspension, priority re-scheduling or pro-rata sector refunds are issued.'
      },
      {
        heading: 'Cancellation & Rescheduling Slabs',
        content: 'Cancellations 30+ days prior to yatra commencement incur a 15% administrative fee. Between 15-29 days, 50% refund is applicable. Under 14 days, bookings are non-refundable but transferable to an alternate family devotee upon early intimation.'
      }
    ]
  },
  {
    id: 'shipping',
    title: 'Temple Dispatch & Sacred Packaging',
    tagline: 'Direct Dispatch from Kashi, Haridwar & Mathura Sanctums',
    icon: Truck,
    sections: [
      {
        heading: 'Sanctified Hub Dispatches',
        content: 'Special temple offerings are dispatched directly from our regional sanctum hubs in Kashi (Varanasi), Haridwar, Ayodhya, and Kanchipuram to ensure minimal dwell time and untouched spiritual sanctity.'
      },
      {
        heading: 'Delivery Timelines',
        content: 'Domestic Metro deliveries arrive within 3-5 business days. Remote Himalayan and pilgrim nodes take 5-7 business days. Consecrated custom murtis requiring bespoke Prana Pratishtha rituals ship within 7-10 days.'
      },
      {
        heading: 'Eco-Sacred Packaging',
        content: 'We use biodegradable cow-dung paper, untreated cotton potlis, and pressed leaves cushioning, eliminating toxic plastics near sacred murtis.'
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Devotee Privacy & Gotra Protection',
    tagline: 'Safe Handling of Personal, Sankalpa & Natal Records',
    icon: Lock,
    sections: [
      {
        heading: 'Confidentiality of Sankalpa & Kundali Data',
        content: 'Your name, Gotra, Nakshatra, and family sankalpa details shared for pujas or Vedic astrology consultations are encrypted and strictly shared solely with the designated officiating Pandits.'
      },
      {
        heading: 'No Commercial Monetization of Devotee Information',
        content: 'House of Sanatana never sells, rents, or exchanges your spiritual records or purchasing preferences with third-party advertisers or commercial data brokers.'
      },
      {
        heading: 'Secure Payments & Vedic Store Compliance',
        content: 'All financial transactions are processed over 256-bit encrypted SSL gateways adhering to PCI-DSS standards. We do not store card CVVs or net banking credentials.'
      }
    ]
  },
  {
    id: 'terms',
    title: 'Terms of Dharmic Service',
    tagline: 'Guiding Principles, Cultural Respect & User Commitments',
    icon: FileText,
    sections: [
      {
        heading: 'Dharmic Respect & Platform Etiquette',
        content: 'Our media platforms, community forums, and sanctum interactions are maintained as sacred spaces. Defamatory speech, communal disparagement, or commercial spamming results in immediate account suspension.'
      },
      {
        heading: 'Intellectual Sacred Heritage',
        content: 'Vedic treatises, liturgical podcasts, and proprietary temple photography hosted on House of Sanatana are preserved for spiritual enlightenment and protected by intellectual property guidelines.'
      },
      {
        heading: 'Spiritual Intent & Consultation Scope',
        content: 'Vedic astrological counsel and temple rituals are spiritually beneficial practices and should be undertaken with reverence. They do not replace licensed medical, financial, or legal professional advice.'
      }
    ]
  }
];

export const Footer: React.FC<FooterProps> = ({ onNavigateAccount, onNavigatePage }) => {
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);

  const activePolicy = BRAND_POLICIES.find((p) => p.id === selectedPolicyId);

  const openPolicy = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setSelectedPolicyId(id);
  };

  const handleNavClick = (
    e: React.MouseEvent,
    page: 'home' | 'mall' | 'travel' | 'join' | 'media' | 'account',
    href: string,
    sectionId?: string
  ) => {
    e.preventDefault();
    if (page === 'account' && onNavigateAccount) {
      onNavigateAccount();
      return;
    }
    if (onNavigatePage) {
      onNavigatePage(page, sectionId);
      return;
    }
    // Universal robust fallback
    if (page === 'account') {
      if (window.location.pathname !== '/account') {
        window.history.pushState({}, '', '/account');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      if (window.location.pathname === '/account') {
        window.history.pushState({}, '', `/${href}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        window.location.hash = href.replace(/^#/, '');
      }
      if (page === 'home' && !sectionId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full bg-[#FEFBF2] text-white pt-4 select-none overflow-hidden font-dm">
      
      {/* ======================================================== */}
      {/* 1. FULL-WIDTH STEPPED FOLDER TAB CONTAINER BORDER       */}
      {/* Retained exactly as requested with edge-to-edge contour  */}
      {/* ======================================================== */}
      <div className="w-full leading-none block">
        <svg 
          viewBox="0 0 1440 60" 
          className="w-full h-10 sm:h-14 md:h-18 lg:h-20 block" 
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path 
            d="M 0 60 
               L 0 46 
               L 360 46 
               C 400 46, 425 4, 465 4 
               L 1240 4 
               C 1280 4, 1305 46, 1345 46 
               L 1440 46 
               L 1440 60 Z" 
            fill="#0A4C83" 
          />
        </svg>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN EDITORIAL FOOTER BODY                            */}
      {/* Styled after the refined editorial reference             */}
      {/* ======================================================== */}
      <div className="w-full bg-[#0A4C83] text-[#FEFBF2] pt-6 sm:pt-10 pb-12 px-6 sm:px-10 lg:px-16 shadow-2xl relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">

          {/* Main 2-Column Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Brand Name & Huge Elegant Serif Nav Links */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Brand Heading */}
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, 'home', '#home')}
                className="font-cormorant font-normal text-4xl sm:text-5xl md:text-6xl text-[#FEFBF2] tracking-tight hover:text-[#E4B968] transition-colors mb-8 sm:mb-10 block cursor-pointer"
              >
                House Of Sanatana
              </a>

              {/* Large Stacked Nav Links matching Navbar */}
              <nav className="flex flex-col items-start gap-2 sm:gap-3.5" aria-label="Footer Navigation">
                {FOOTER_NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.page, item.href, item.sectionId)}
                    className="group flex items-baseline gap-3 font-cormorant font-normal text-3xl sm:text-4xl md:text-[44px] leading-tight text-[#FEFBF2]/90 hover:text-[#E4B968] hover:translate-x-1.5 transition-all duration-200 cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <span className="font-sanskrit text-xs sm:text-sm text-[#E4B968]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:inline">
                      {item.sanskrit}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Right Column: Newsletter & Social Connect Blocks */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8 sm:gap-10 pt-2 lg:pt-4">
              
              {/* Newsletter Block */}
              <div className="flex flex-col items-start max-w-md">
                <h3 className="font-dm font-semibold text-base sm:text-lg text-[#FEFBF2] mb-2 tracking-tight">
                  Sanatan Prana Newsletter
                </h3>
                <p className="font-dm text-xs sm:text-[13px] leading-relaxed text-[#FEFBF2]/85 mb-4 font-normal">
                  Your fresh, sacred resource for auspicious dates, seasonal panchang guidance, temple yatras, and Vedic rituals. Consecrated blessings right in your inbox.
                </p>
                <a 
                  href="#newsletter"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FEFBF2] hover:bg-white text-[#0A4C83] font-dm font-bold text-xs sm:text-[13px] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0A4C83]" />
                </a>
              </div>

              {/* Let's Connect Block */}
              <div className="flex flex-col items-start max-w-md pt-2">
                <h3 className="font-dm font-semibold text-base sm:text-lg text-[#FEFBF2] mb-2 tracking-tight">
                  Let's Connect
                </h3>
                <p className="font-dm text-xs sm:text-[13px] leading-relaxed text-[#FEFBF2]/85 mb-4 font-normal">
                  You can follow our sacred journey, artisan chronicles, and daily Vedic wisdom anywhere and everywhere!
                </p>
                
                {/* Circular Pill Social Icons */}
                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FEFBF2] text-[#0A4C83] hover:bg-white hover:scale-110 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>

                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="YouTube"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FEFBF2] text-[#0A4C83] hover:bg-white hover:scale-110 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>

                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FEFBF2] text-[#0A4C83] hover:bg-white hover:scale-110 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>

                  <a 
                    href="https://x.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="X / Twitter"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FEFBF2] text-[#0A4C83] hover:bg-white hover:scale-110 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>

                  <a 
                    href="https://wa.me/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="WhatsApp Desk"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FEFBF2] text-[#0A4C83] hover:bg-white hover:scale-110 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* ---------------------------------------------------- */}
          {/* Brand Policies Grid Section                          */}
          {/* ---------------------------------------------------- */}
          <div className="pt-8 border-t border-white/15">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#E4B968]" />
              <span className="font-cormorant font-semibold text-lg sm:text-xl text-[#FEFBF2] tracking-wide">
                Dharmic Sanctum Policies & Devotee Assurances
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {BRAND_POLICIES.map((policy) => {
                const Icon = policy.icon;
                return (
                  <button
                    key={policy.id}
                    onClick={(e) => openPolicy(e, policy.id)}
                    className="group text-left p-3 sm:p-3.5 rounded-xl bg-black/20 hover:bg-[#FEFBF2] transition-all duration-200 border border-white/10 hover:border-[#FEFBF2] flex flex-col justify-between gap-2.5 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 group-hover:bg-[#0A4C83]/15 flex items-center justify-center text-[#FEFBF2] group-hover:text-[#0A4C83] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-dm font-semibold text-xs text-[#FEFBF2] group-hover:text-[#0A4C83] leading-snug transition-colors">
                        {policy.title}
                      </p>
                      <p className="text-[10px] text-[#FEFBF2]/70 group-hover:text-[#0A4C83]/80 line-clamp-1 mt-0.5 transition-colors">
                        {policy.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* Sub-Footer Line: Questions, Copyright & Attribution */}
          {/* ---------------------------------------------------- */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] sm:text-xs font-dm text-[#FEFBF2]/80">
            {/* Left sub-footer */}
            <div className="flex flex-col gap-1.5">
              <span>Questions can be submitted at <a href="mailto:care@houseofsanatana.com" className="underline hover:text-[#E4B968] transition-colors">care@houseofsanatana.com</a></span>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>Copyright {new Date().getFullYear()} | All Rights Reserved House Of Sanatana Media</span>
                <span>•</span>
                <button 
                  onClick={(e) => openPolicy(e, 'privacy')} 
                  className="underline hover:text-[#E4B968] transition-colors cursor-pointer"
                >
                  Privacy Notice
                </button>
                <span>•</span>
                <button 
                  onClick={(e) => openPolicy(e, 'terms')} 
                  className="underline hover:text-[#E4B968] transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
                <span>•</span>
                <button 
                  onClick={(e) => openPolicy(e, 'returns')} 
                  className="underline hover:text-[#E4B968] transition-colors cursor-pointer"
                >
                  Return Policy
                </button>
                <span>•</span>
                <button 
                  onClick={(e) => openPolicy(e, 'consecration')} 
                  className="underline hover:text-[#E4B968] transition-colors cursor-pointer"
                >
                  Consecration Guarantee
                </button>
              </div>
            </div>

            {/* Right sub-footer */}
            <div className="flex flex-col sm:items-end gap-1">
              <span>Consecrated by accredited Peetham Acharyas</span>
              <span>Sanctum credit: <span className="underline">House Of Sanatana Guild</span></span>
            </div>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. POLICY MODAL VIEWER                                   */}
      {/* Elegant spiritual parchment design with gold and indigo   */}
      {/* ======================================================== */}
      {activePolicy && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPolicyId(null)}
        >
          <div 
            className="w-full max-w-2xl max-h-[85vh] bg-[#FEFBF2] text-[#221508] rounded-2xl shadow-2xl border-2 border-[#C59239]/40 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0A4C83] text-[#FEFBF2] p-5 sm:p-6 flex items-center justify-between border-b border-[#C59239]/30 relative">
              <div className="flex items-center gap-3.5 pr-8">
                <div className="w-10 h-10 rounded-full bg-[#C59239]/20 border border-[#C59239]/40 flex items-center justify-center text-[#FEFBF2] shrink-0">
                  <activePolicy.icon className="w-5 h-5 text-[#E4B968]" />
                </div>
                <div>
                  <h3 className="font-cormorant font-semibold text-xl sm:text-2xl text-[#FEFBF2] leading-tight">
                    {activePolicy.title}
                  </h3>
                  <p className="font-dm text-xs text-[#E4B968] tracking-wide mt-0.5">
                    {activePolicy.tagline}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPolicyId(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Close policy"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-[#221508]">
              {activePolicy.sections.map((sec, idx) => (
                <div key={idx} className="bg-white/80 p-4 sm:p-5 rounded-xl border border-[#C59239]/20 shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59239]" />
                    <h4 className="font-dm font-bold text-sm sm:text-base text-[#0A4C83]">
                      {sec.heading}
                    </h4>
                  </div>
                  <p className="font-dm text-xs sm:text-[13px] text-[#3D2619] leading-relaxed pl-3.5">
                    {sec.content}
                  </p>
                </div>
              ))}

              {/* Policy Footer Note */}
              <div className="p-4 rounded-xl bg-[#C59239]/10 border border-[#C59239]/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C59239] shrink-0 mt-0.5" />
                <p className="text-[11px] sm:text-xs text-[#221508] leading-relaxed">
                  For specific questions regarding consecrated orders, ceremonial muhurtas, or pilgrimage permits, write to our sanctum team at{' '}
                  <a href="mailto:care@houseofsanatana.com" className="font-bold underline text-[#C59239]">
                    care@houseofsanatana.com
                  </a>.
                </p>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 bg-[#FEFBF2] border-t border-[#C59239]/20 flex items-center justify-between">
              <span className="text-[11px] text-[#3D2619] font-dm">
                House of Sanatana • Sanctum Governance Protocol
              </span>
              <button
                onClick={() => setSelectedPolicyId(null)}
                className="px-5 py-2 rounded-xl bg-[#0A4C83] hover:bg-[#073863] text-[#FEFBF2] font-dm font-semibold text-xs transition-colors cursor-pointer"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
