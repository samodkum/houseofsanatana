import React from 'react';
import { ScrollSplitCard, ScrollSplitCardItem } from './ui/scroll-split-card';
import { Compass, Package, Users, Hammer } from 'lucide-react';
import krishnaImage from '../../057008210129498b707742ac9569d0b3.jpg';

interface FourGatewaysSectionProps {
  onSelectStore: () => void;
  onSelectTravel: () => void;
  onSelectJoin: () => void;
  onSelectCoCreate: () => void;
}

export const FourGatewaysSection: React.FC<FourGatewaysSectionProps> = ({
  onSelectStore,
  onSelectTravel,
  onSelectJoin,
  onSelectCoCreate,
}) => {
  const gatewayCards: ScrollSplitCardItem[] = [
    {
      id: 'travel',
      title: 'Travel',
      subtitle: 'Sacred Yatras & Expeditions',
      badge: 'Holy Pilgrimages',
      description:
        'Bespoke spiritual odysseys to Kashi, Kedarnath, Char Dham & Kailash. Includes VIP sanctum darshans, private helicopter shuttles, and guided Vedic scholars.',
      bgColor: '#66705A',
      textColor: '#F7F1E5',
      accentColor: '#D9C6A8',
      icon: <Compass className="w-5 h-5 text-[#D9C6A8]" />,
      actionLabel: 'Explore Yatras',
      onAction: onSelectTravel,
    },
    {
      id: 'mall',
      title: 'Santana Mall',
      subtitle: 'Consecrated Temple Emporium',
      badge: 'Vedic Treasures',
      description:
        'Pure, lab-certified Vedic samagri, hand-cast brass murtis from Moradabad, zero-residue Bhimseni camphor, and temple-consecrated ceremonial boxes.',
      bgColor: '#C7833D',
      textColor: '#F7F1E5',
      accentColor: '#F7F1E5',
      icon: <Package className="w-5 h-5 text-[#F7F1E5]" />,
      actionLabel: 'Enter Santana Mall',
      onAction: onSelectStore,
    },
    {
      id: 'join',
      title: 'Join',
      subtitle: 'Vedic Sangha & Satsang',
      badge: 'Global Fraternity',
      description:
        'Unite with a global fraternity of seekers. Attend daily sunrise Brahma Muhurta meditations, exclusive live temple darshans, and youth dharmic forums.',
      bgColor: '#B08A4A',
      textColor: '#F7F1E5',
      accentColor: '#F7F1E5',
      icon: <Users className="w-5 h-5 text-[#F7F1E5]" />,
      actionLabel: 'Join Sacred Sangha',
      onAction: onSelectJoin,
    },
    {
      id: 'co-create',
      title: 'Co-Create',
      subtitle: 'Artisans & Scholars Guild',
      badge: 'Sacred Synergy',
      description:
        'Empowering traditional shilpis, Sanskrit grammarians, sacred musicians, and temple architects to revive eternal crafts and build consecrated spaces together.',
      bgColor: '#8F6E5B',
      textColor: '#F7F1E5',
      accentColor: '#D9C6A8',
      icon: <Hammer className="w-5 h-5 text-[#F7F1E5]" />,
      actionLabel: 'Partner & Create',
      onAction: onSelectCoCreate,
    },
  ];

  return (
    <section id="gateways" className="relative w-full bg-[#F7F1E5]">
      {/* Scroll Split Card Component showcasing 4 gateways */}
      <ScrollSplitCard
        imageSrc={krishnaImage}
        imageAlt="Lord Sri Krishna Ascension"
        cards={gatewayCards}
        sectionEyebrow="॥ चतुर्द्वारम् ॥ FOUR SACRED GATEWAYS"
        sectionTitle="The Breadth of the House"
        sectionSubtitle="Four gateways into eternal Dharma: Sacred Yatras, Temple Store, Global Sangha, and Master Artisan Co-Creation."
      />
    </section>
  );
};
