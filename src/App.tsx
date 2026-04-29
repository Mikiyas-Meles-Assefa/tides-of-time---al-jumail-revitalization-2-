import { useState, useCallback, useEffect, useRef, Fragment } from 'react';
import type { MotionValue } from 'motion/react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const mapNodes = [
  { 
    id: 1, 
    title: "Pearling House", 
    polygon: "25.96,12.42 22.64,12.22 22.77,8.26 33.57,8.76 33.13,12.91 28.71,12.61 28.84,19.73 32.74,21.01 35.56,24.96 33.25,28.92 35.05,35.64 26.03,38.80 22.32,31.49 24.49,23.58 25.84,21.01 26.92,20.02 25.90,12.61",
    description: "A hands-on pearling experience with oyster opening, diving weights, pearl exhibits, and heritage objects.", 
    activities: ["Oyster opening", "Pearl journey exhibit", "Diving weight challenge", "Heritage shop"], 
    caption: "Pearls, tools, and coastal craft",
    images: [
      { src: "/images/Pearling Images/seafront entrance viiew outside.png", caption: "Seafront entrance view from the outside" },
      { src: "/images/Pearling Images/PEARLING HOUSE - Oyster Opening Activity Hands-on experience of opening oysters to discover real pearls..png", caption: "Oyster Opening Activity: Hands-on experience of opening oysters to discover real pearls." }, 
      { src: "/images/Pearling Images/PEARLING HOUSE - The Pearl Journey Exhibition Explore the story of pearls, from the sea to the world..png", caption: "The Pearl Journey Exhibition: Explore the story of pearls, from the sea to the world." },
      { src: "/images/Pearling Images/WEIGHT LIFTING CHALLENGE Visitors try lifting the traditional diving weight (dahn) used by pearl divers to sink to the sea floor. Feel the weight Understand the dive Challenge & learn.png", caption: "Weight Lifting Challenge: Try lifting the traditional diving weight (dahn)." },
      { src: "/images/Pearling Images/PEARLING HOUSE - Pearling Heritage Shop Shop for local crafts, pearls, books, and authentic souvenirs..png", caption: "Pearling Heritage Shop: Shop for local crafts, pearls, books, and authentic souvenirs." },
      { src: "/images/Pearling Images/those diving weights and shit.png", caption: "Traditional diving weights and equipment" },
      { src: "/images/Pearling Images/coral items ( pearling house).png", caption: "Coral objects and pearling house materials" }
    ]
  },
  { 
    id: 2, 
    title: "Family Life House", 
    polygon: "35.43,31.54 43.04,35.19 45.92,29.07 43.61,25.31 40.80,24.13 40.86,14.84 46.30,14.35 46.30,11.08 35.05,11.18 34.66,15.14 39.84,15.14 39.33,23.73 35.75,25.81 34.92,30.45 35.17,31.04",
    description: "A domestic heritage space showing family interiors, spatial life, and traditional weaving.", 
    activities: ["House entrance", "Family interior", "Weaving activity"], 
    caption: "Everyday family life and craft",
    images: [
      { src: "/images/Family Life House/family life entrance.png", caption: "Family Life House entrance" },
      { src: "/images/Family Life House/family spatial view.png", caption: "Interior spatial view of family life" },
      { src: "/images/Family Life House/family weaving.png", caption: "Traditional weaving activity" }
    ]
  },
  { 
    id: 3, 
    title: "Trade House", 
    polygon: "49.95,20.27 47.20,19.48 47.00,15.93 55.77,15.53 56.02,19.68 52.44,20.67 52.25,26.89 58.83,29.46 57.75,33.32 55.32,40.33 46.43,35.00 50.52,28.08 49.69,19.38",
    description: "A trade-focused house with market displays, exchange objects, bartering, and historic currencies.", 
    activities: ["Trade museum", "Exchange goods", "Bartering activity", "Historic currencies"], 
    caption: "Commerce, exchange, and coastal trade",
    images: [
      { src: "/images/Trade House/trade house entrance.png", caption: "Trade House entrance" },
      { src: "/images/Trade House/trade museumt.png", caption: "Trade museum and interpretive displays" },
      { src: "/images/Trade House/trade items.png", caption: "Traditional trade items and exchange goods" },
      { src: "/images/Trade House/bartering or sth trade.png", caption: "Bartering activity and market simulation" },
      { src: "/images/Trade House/currencies  trade.png", caption: "Historic currencies and coastal commerce" }
    ]
  },
  { 
    id: 4, 
    title: "Majlis House", 
    polygon: "66.00,26.70 62.29,26.40 62.35,22.74 71.94,22.55 71.75,26.20 67.72,26.80 67.53,36.58 70.86,39.94 66.89,49.62 63.44,51.40 56.15,46.76 59.15,40.43 62.29,36.28 65.49,35.98 65.42,26.30",
    description: "A communal gathering house with majlis seating, coffee rituals, calligraphy, and an open courtyard.", 
    activities: ["Majlis gathering", "Arabic coffee", "Calligraphy activity", "Open courtyard"], 
    caption: "Gathering, hospitality, and dialogue",
    images: [
      { src: "/images/Majlis House/majilis house entrance.png", caption: "Majlis House entrance" },
      { src: "/images/Majlis House/majilis .png", caption: "Main Majlis gathering space" },
      { src: "/images/Majlis House/coffee majilis.png", caption: "Arabic coffee ceremony" },
      { src: "/images/Majlis House/caligraphy majilis.png", caption: "Calligraphy activity inside the Majlis" },
      { src: "/images/Majlis House/open courtyard.png", caption: "Open courtyard for communal gathering" }
    ]
  },
  { 
    id: 5, 
    title: "Agriculture Experience House", 
    polygon: "77.44,34.60 72.65,34.31 72.20,27.98 83.97,28.48 84.54,34.21 79.87,35.39 79.49,43.79 83.46,45.67 77.06,59.30 69.07,52.68 74.50,41.32 76.23,43.00 77.12,34.31",
    description: "A local agriculture house centered on products, dates, herbs, livestock care, and seed preservation.", 
    activities: ["Local products", "Dates and herbs", "Livestock care", "Seed preservation"], 
    caption: "Food, seeds, and rural life",
    images: [
      { src: "/images/Agriculture Experience House/agro local products.png", caption: "Local agricultural products" },
      { src: "/images/Agriculture Experience House/dates and herbs local agro.png", caption: "Dates and herbs from the local garden" },
      { src: "/images/Agriculture Experience House/agro .. livestoke care.png", caption: "Livestock care and rural daily life" },
      { src: "/images/Agriculture Experience House/local seeds and herbs (agro).png", caption: "Local seeds and herb preservation" }
    ]
  },
  { 
    id: 6, 
    title: "Art & Memory House", 
    polygon: "89.91,54.66 83.71,51.20 86.33,43.00 90.30,43.49 90.30,40.13 85.18,39.84 85.69,36.48 98.16,36.68 98.29,40.04 92.73,40.43 92.28,44.48 97.84,46.85 96.44,56.34 89.98,54.17",
    description: "A creative memory space with art displays, community walls, children's painting, and message sharing.", 
    activities: ["Community art wall", "Art museum", "Kids painting", "Message wall"], 
    caption: "Art, memory, and community expression",
    images: [
      { src: "/images/Art & Memory House/art and memory entrance.png", caption: "Art & Memory House entrance" },
      { src: "/images/Art & Memory House/community art wall art house.png", caption: "Community art wall inside the Art & Memory House" },
      { src: "/images/Art & Memory House/arts museum.png", caption: "Art museum and memory archive" },
      { src: "/images/Art & Memory House/painting for kids art.png", caption: "Children's painting activity" },
      { src: "/images/Art & Memory House/send your message to bottle in the wall art.png", caption: "Message-in-a-bottle memory wall" }
    ]
  },
  { 
    id: 7, 
    title: "Agricultural Garden & Greenhouse", 
    polygon: "29.67,47.84 39.59,39.54 46.88,46.95 37.92,57.23 28.91,47.84 31.34,49.92 13.43,49.13 13.43,55.65 27.31,55.25 27.31,51.79 32.10,51.89",
    description: "A greenhouse and garden zone showing desert cultivation from above and traditional falaj irrigation.", 
    activities: ["Greenhouse view", "Falaj irrigation"], 
    caption: "Greenhouse systems and water heritage",
    images: [
      { src: "/images/Agricultural Garden & Greenhouse/green house sth bird view.png", caption: "Bird's-eye view of the greenhouse" },
      { src: "/images/Agricultural Garden & Greenhouse/irrigation fallaj demosntration green house.png", caption: "Falaj irrigation demonstration" }
    ]
  },
  { 
    id: 8, 
    title: "Restaurant & Cafe", 
    polygon: "39.39,61.97 51.67,51.30 63.44,59.50 53.21,74.92 45.15,67.31 16.56,68.39 17.27,63.36 42.21,64.34 38.88,61.58",
    description: "A food and hospitality destination with an entrance sequence, outdoor seating, and local dishes.", 
    activities: ["Cafe entrance", "Outdoor dining", "Local dishes"], 
    caption: "Dining through local flavor",
    images: [
      { src: "/images/Restaurant & Cafe/restaurant cafe entrance.png", caption: "Restaurant and cafe entrance" },
      { src: "/images/Restaurant & Cafe/restaurant outdoor.png", caption: "Outdoor dining experience" },
      { src: "/images/Restaurant & Cafe/local dishes in the restaurant.png", caption: "Local dishes served through heritage storytelling" }
    ]
  },
  { 
    id: 9, 
    title: "Staff & Service Area", 
    polygon: "61.90,81.54 72.01,68.20 79.55,71.06 78.15,83.41 79.68,86.87 79.68,90.82 69.77,91.61 61.33,80.94",
    description: "A support zone mapped for staff operations, services, and site management.", 
    activities: ["Staff area map", "Service access", "Site operations"], 
    caption: "Operations behind the visitor route",
    images: [
      { src: "/images/Staff & Service Area/staff area map normla map.png", caption: "Staff and service area map" }
    ]
  }
];

/** Scroll-scrub duration for the pinned problem spiral (taller = slower spiral completion). */
const PROBLEM_SPIRAL_SCROLL_VH = 200;

const PROBLEM_SPIRAL_IMAGES = [
  "/images/210706161909-5-al-jumail-3457.webp",
  "/images/210706162824-18-al-mafjar-3624.jpg",
  "/images/210706163156-10-al-khuwair-3832.jpg",
  "/images/Al_Jemail_Sunset_Aerial_View.jpg",
  "/images/Aerial_View_of_Al_Jemail_Fishermen's_Village (1).jpg",
  // Repeating for a longer spiral
  "/images/210706161909-5-al-jumail-3457.webp",
  "/images/210706162824-18-al-mafjar-3624.jpg",
  "/images/Al_Jemail_Sunset_Aerial_View.jpg",
];

function ProblemSpiralImage({
  src,
  index,
  count,
  scrollProgress,
}: {
  src: string;
  index: number;
  count: number;
  scrollProgress: MotionValue<number>;
}) {
  const radius = 230; // Decreased from 300 to shrink the spiral diameter
  const ySpacing = 260; // Spread images vertically
  const angleStep = (Math.PI * 2) / 3; // 120 degrees per image

  // End the pinned scroll while Challenge 6 is centered, not after it drifts past.
  const currentIndex = useTransform(scrollProgress, [0, 1], [0, count - 3]);

  const angleOffset = index * angleStep;
  const angle = useTransform(currentIndex, (c) => angleOffset - c * angleStep);

  const x = useTransform(angle, (a) => Math.sin(a) * radius);
  const z = useTransform(angle, (a) => Math.cos(a) * radius);

  // Active image is always at y=0 (centered). Future images are below (+), past are above (-)
  const y = useTransform(currentIndex, (c) => (index - c) * ySpacing);

  const rotateY = useTransform(angle, (a) => (a * 180) / Math.PI);
  const rotateX = useTransform(z, [-radius, radius], [10, -5]);

  const scale = useTransform(z, [-radius, radius], [0.65, 1.05]);

  return (
    <motion.div
      style={{
        x,
        y,
        z,
        rotateY,
        rotateX,
        scale,
      }}
      className="absolute w-[min(90vw,16rem)] sm:w-64 md:w-72 aspect-[4/3] overflow-hidden rounded-[18px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 bg-white/5"
    >
      <motion.img src={src} alt={`Challenge ${index + 1}`} className="w-full h-full object-cover object-center" />
    </motion.div>
  );
}

const PROBLEM_CHALLENGES = [
  { title: "Quiet Decay", desc: "Al Jumail is slowly deteriorating as an abandoned 19th-century pearling village." },
  { title: "Cultural Erasure", desc: "The site holds Qatar's pre-petroleum maritime identity, but its stories risk being forgotten." },
  { title: "Modernization Pressure", desc: "Rapid modernization has left the village facing both structural deterioration and cultural amnesia." }
];

const STAKEHOLDERS = [
  {
    group: "Tribal Descendants",
    role: "Holders of oral history",
    detail: "Al-Kubaisa and Al-Muhannadi families become primary users of the site, shaping interpretation through ancestral memory."
  },
  {
    group: "Institutional",
    role: "Conservation and stewardship",
    detail: "Qatar Museums supports preventive conservation while the Ministry of Environment guides ecological protection."
  },
  {
    group: "Private Sector",
    role: "Production and storytelling",
    detail: "Agrico anchors food security and sustainable growing, while Ducasse translates Qatari heritage into gastronomic storytelling."
  }
];

const NATIONAL_ALIGNMENT = [
  {
    strategy: "QNV 2030",
    pillar: "Social Development",
    application: "Preserving national heritage through ancestral roots."
  },
  {
    strategy: "QNV 2030",
    pillar: "Environmental",
    application: "Harmonizing urban expansion with enviroment."
  },
  {
    strategy: "NDS3",
    pillar: "Quality of Life",
    application: "Providing vibrant cultural life for families."
  },
  {
    strategy: "NDS3",
    pillar: "Sustainability",
    application: "Conserving resources and building climate resilience."
  }
];

function ProblemBullet({
  item,
  index,
  total,
  imagesCount,
  scrollProgress,
}: {
  item: { title: string; desc: string };
  index: number;
  total: number;
  imagesCount: number;
  scrollProgress: MotionValue<number>;
}) {
  // Sync the bullet animation to the same 3D image index the spiral is using
  const currentIndex = useTransform(scrollProgress, [0, 1], [0, imagesCount - 3]);

  // Divide the total image index range by the number of bullets
  const maxIndex = imagesCount - 3;
  const segment = maxIndex / total;
  const start = index * segment;
  const end = start + segment;

  // The bullet highlights when the 3D spiral is rotating through its specific index segment
  const opacity = useTransform(
    currentIndex,
    [start - segment / 2, start, end, end + segment / 2],
    [0.2, 1, 1, 0.2]
  );
  
  const x = useTransform(
    currentIndex,
    [start - segment / 2, start, end, end + segment / 2],
    [0, 24, 24, 0] // Pushes the text to the right when active
  );

  return (
    <motion.div 
      style={{ opacity, x }}
      className="group flex gap-6 md:gap-8 items-start pb-6 border-b border-white/5 last:border-0"
    >
      <span className="text-brand-secondary/50 font-serif text-4xl italic group-hover:text-brand-secondary transition-colors duration-500">0{index + 1}</span>
      <div className="text-[#E8E2D9]">
        <h3 className="text-xl font-bold mb-2 uppercase tracking-[0.2em] text-white/90">{item.title}</h3>
        <p className="opacity-60 leading-relaxed max-w-md text-sm">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [introPhase, setIntroPhase] = useState(1);

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const introContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: introScrollY } = useScroll({
    target: introContainerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(introScrollY, "change", (latest) => {
    const nextPhase = latest < 0.24 ? 1 : latest < 0.52 ? 2 : 3;
    setIntroPhase((current) => (current === nextPhase ? current : nextPhase));
  });

  const problemContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: problemScrollY } = useScroll({
    target: problemContainerRef,
    offset: ['start -8vh', 'end end'],
  });

  const solutionContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: solutionScrollY } = useScroll({
    target: solutionContainerRef,
    offset: ['start center', 'end end']
  });

  // Smooth cursor
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const followerX = useSpring(0, { stiffness: 150, damping: 20 });
  const followerY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, followerX, followerY]);

  const currentImages = selectedNode ? mapNodes.find(n => n.id === selectedNode)?.images || [] : [];

  const handleNextImage = useCallback(() => {
    setDirection(1);
    setModalImageIndex((prev) => (prev + 1) % currentImages.length);
  }, [currentImages.length]);

  const handlePrevImage = useCallback(() => {
    setDirection(-1);
    setModalImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  }, [currentImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedNode === null) return;
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'Escape') setSelectedNode(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNode, handleNextImage, handlePrevImage]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)'
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)'
    })
  };

  const fadeIn = {
    initial: { opacity: 0, y: 60, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    viewport: { once: true, margin: "-100px" }
  };

  const introPhaseData = introPhase === 1
    ? {
        eyebrow: "The Site",
        title: <>A Ghost on the <br /> Northern Coast</>,
        image: "/images/qatar-map.png",
        imageAlt: "Map of Qatar showing Al Jumail",
        imageClassName: "object-contain p-6 md:p-10",
        body: (
          <>
            <p className="text-lg md:text-2xl leading-snug font-serif text-[#F2EDE2]/85">
              Al Jumail is a 19th-century pearling and fishing village located on the northern coast of Qatar.
              Once a vital center of maritime life, it now stands abandoned.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[#F2EDE2]/65 max-w-xl border-l border-[#D8B66A]/30 pl-6">
              This site represents more than physical ruins. It reflects a disappearing connection between contemporary society and its ancestral roots.
            </p>
          </>
        )
      }
    : introPhase === 2
      ? {
          eyebrow: "Chronicle",
          title: <>The Arc of Time</>,
          image: "/images/Aerial_View_of_Al_Jemail_Fishermen's_Village (1).jpg",
          imageAlt: "Aerial view of Al Jumail fishermen's village",
          imageClassName: "object-cover",
          body: (
            <div className="space-y-6">
              {[
                { year: "mid 19th century", title: "Founding", desc: "The first coral blocks are laid by the sea, establishing Al Jumail as a maritime gateway." },
                { year: "1930s", title: "Pearl Crisis", desc: "The global market shifts; the tide begins to turn as synthetic pearls emerge." },
              ].map((item) => (
                <div key={item.year} className="border-l border-[#D8B66A]/25 pl-6 pb-3 relative">
                  <div className="absolute left-[-2px] top-0 w-[4px] h-full bg-[#D8B66A]" />
                  <span className="text-4xl font-serif text-[#F0D28A]/60 block mb-1 italic">{item.year}</span>
                  <h3 className="text-lg font-bold mb-2 uppercase tracking-widest text-[#F2EDE2]/90">{item.title}</h3>
                  <p className="text-[#F2EDE2]/65 text-sm md:text-base leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )
        }
      : {
          eyebrow: "Chronicle",
          title: <>The Arc of Time</>,
          image: "/images/210706162824-18-al-mafjar-3624.jpg",
          imageAlt: "Al Jumail village ruins",
          imageClassName: "object-cover",
          body: (
            <div className="space-y-6">
              {[
                { year: "mid 20th century", title: "The Departure", desc: "Modernity calls from the south; Al Jumail becomes a silent ghost of the coast." },
                { year: "After it's revitalization", title: "The Rebirth", desc: "A digital sanctuary for ancestral memory, reimagined through immersive architecture." },
              ].map((item) => (
                <div key={item.year} className="border-l border-[#D8B66A]/25 pl-6 pb-3 relative">
                  <div className="absolute left-[-2px] top-0 w-[4px] h-full bg-[#D8B66A]" />
                  <span className="text-4xl font-serif text-[#F0D28A]/60 block mb-1 italic">{item.year}</span>
                  <h3 className="text-lg font-bold mb-2 uppercase tracking-widest text-[#F2EDE2]/90">{item.title}</h3>
                  <p className="text-[#F2EDE2]/65 text-sm md:text-base leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )
        };

  return (
    <div className="selection:bg-brand-accent selection:text-brand-bg scroll-smooth">
      {/* Top Status Bar */}
      <div className="absolute top-0 left-0 w-full z-50 p-8 flex justify-between items-center text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="flex gap-8"
        >
          <span>Al Jumail Revitalization</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="flex gap-8"
        >
          <span className="hidden md:inline">25.97°N / 51.10°E</span>
        </motion.div>
      </div>

      {/* Custom Cursor */}
      <motion.div 
        className="custom-cursor"
        style={{ x: cursorX, y: cursorY, scale: isHovering ? 2 : 1 }}
      />
      <motion.div 
        className="custom-cursor-follower"
        style={{ x: followerX, y: followerY, scale: isHovering ? 1.5 : 1 }}
      />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Grain Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/images/Al_Jemail_Sunset_Aerial_View.jpg"
            alt="Al Jumail Village Sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </motion.div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <h1 className="text-6xl md:text-[140px] font-bold mb-10 tracking-tighter leading-[0.85]">
              Tides of Time
            </h1>
            <h2 className="text-xl md:text-3xl font-serif mb-12 opacity-80 max-w-3xl mx-auto leading-tight italic font-light">
              Reimagining Al Jumail Village as a Living Memory
            </h2>
            <div className="flex items-center justify-center gap-6 opacity-60">
              <div className="h-[1px] w-12 bg-white" />
              <p className="text-xs md:text-sm uppercase tracking-[0.4em] font-light">
                Immersive Heritage Experience
              </p>
              <div className="h-[1px] w-12 bg-white" />
            </div>
          </motion.div>
        </div>

        <motion.div 
          id="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
        >
          <span className="text-[10px] text-white/30 uppercase tracking-[0.6em] vertical-rl font-light">Explore</span>
          <div className="relative w-[1px] h-20 bg-white/10 overflow-hidden">
            <motion.div 
              animate={{ 
                y: ["-100%", "100%"] 
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-white/60 to-transparent h-1/2"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. INTRO SECTION — scroll locked presentation phases */}
      <div ref={introContainerRef} id="intro" className="relative" style={{ height: "240vh" }}>
        <section className="sticky top-0 h-screen overflow-hidden flex items-center justify-center pt-24 pb-12 bg-[#121110]">
          {/* Timeline center line */}
          <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[#D8B66A]/10 -translate-x-1/2" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={introPhase}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0, y: -20, filter: "blur(12px)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="space-y-7 lg:space-y-9 relative z-20 text-[#F2EDE2]"
              >
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-[0.5em] font-bold block text-[#D8B66A]/70">
                    {introPhaseData.eyebrow}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-serif italic leading-[1.05] text-[#F0D28A]">
                    {introPhaseData.title}
                  </h2>
                </div>
                {introPhaseData.body}
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.85, x: 50, filter: "blur(20px)", rotateY: 15 },
                  visible: { opacity: 1, scale: 1, x: 0, filter: "blur(0px)", rotateY: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 } },
                  exit: { opacity: 0, scale: 1.05, x: 20, filter: "blur(20px)", rotateY: -10, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="relative h-[min(52vh,520px)] flex items-center justify-center isolate w-full perspective-1000"
              >
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                  className="relative w-full max-w-[620px] aspect-[4/3] overflow-hidden rounded-[18px] border border-white/15 bg-white/5 shadow-[0_35px_90px_-35px_rgba(0,0,0,0.9)]"
                >
                  <motion.img
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
                    src={introPhaseData.image}
                    alt={introPhaseData.imageAlt}
                    className={`w-full h-full ${introPhaseData.imageClassName}`}
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.4)] pointer-events-none" />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      {/* 3. PROBLEM SECTION — tall scroll runway pins the viewport; spiral animates across that scroll */}
      <div
        ref={problemContainerRef}
        id="problem"
        className="relative scroll-mt-0"
        style={{ height: `${PROBLEM_SPIRAL_SCROLL_VH}vh` }}
      >
        <section className="sticky top-[-8vh] h-[108vh] bg-[#121110] text-[#E8E2D9] overflow-hidden flex flex-col justify-center py-12 lg:py-20 xl:py-24">
          <motion.div 
            style={{ 
              opacity: useTransform(problemScrollY, [0, 0.1, 0.9, 1], [0, 0.1, 0.1, 0]),
            }}
            className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"
          />
          
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-[1] w-full">
            <div className="order-2 lg:order-1 relative h-[clamp(340px,52vh,640px)] flex items-center justify-center -ml-6 sm:-ml-8 lg:-ml-16 w-full perspective-2000 [transform-style:preserve-3d] isolate">
              {PROBLEM_SPIRAL_IMAGES.map((src, i) => (
                <Fragment key={`spiral-${i}`}>
                  <ProblemSpiralImage
                    src={src}
                    index={i}
                    count={PROBLEM_SPIRAL_IMAGES.length}
                    scrollProgress={problemScrollY}
                  />
                </Fragment>
              ))}
            </div>

            {/* Content Side */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="order-1 lg:order-2 space-y-8 lg:space-y-10 z-20"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-4 text-brand-secondary/40">
                <div className="w-12 h-[1px] bg-current" />
                <span className="text-xs uppercase tracking-[0.4em] font-bold">The Challenge</span>
              </motion.div>
              
              <motion.h2 variants={fadeIn} className="text-5xl md:text-7xl font-serif italic leading-[1.1] text-white">
                A Race Against <br /> <span className="opacity-40">the Tide</span>
              </motion.h2>
              
              <motion.p variants={fadeIn} className="text-xl opacity-60 font-serif leading-relaxed italic max-w-sm text-[#E8E2D9]">
                "We are not just losing stones; we are losing the very breath of our ancestors."
              </motion.p>
              
              <div className="space-y-8">
                {PROBLEM_CHALLENGES.map((item, i) => (
                  <Fragment key={`bullet-${i}`}>
                    <ProblemBullet
                      item={item}
                      index={i}
                      total={PROBLEM_CHALLENGES.length}
                      imagesCount={PROBLEM_SPIRAL_IMAGES.length}
                      scrollProgress={problemScrollY}
                    />
                  </Fragment>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* 4. RESEARCH QUESTIONS */}
      <section id="research" className="max-w-7xl mx-auto px-6 py-[200px] relative overflow-hidden">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0.1, 0.4], [100, -100]) }}
          className="absolute right-0 top-0 text-[180px] md:text-[280px] font-serif opacity-[0.02] pointer-events-none select-none italic text-brand-accent h-full flex items-center"
        >
          Quest
        </motion.div>
        
        <div className="mb-24 text-center lg:text-left relative z-10">
            <motion.span variants={fadeIn} className="text-xs uppercase tracking-[0.6em] opacity-40 mb-8 block font-bold">Investigation</motion.span>
            <motion.h3 variants={fadeIn} className="text-4xl md:text-[80px] font-serif italic text-brand-accent/90 leading-none tracking-tighter">Core Inquiries</motion.h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          {[
            "How can Al Jumail be transformed into a sustainable and interactive live museum?",
            "How can heritage preservation coexist with modern environmental and social demands?",
            "How can visitors actively experience, rather than passively observe, cultural history?",
            "How can sustainability, architecture, and storytelling be integrated into one system?"
          ].map((question, i) => (
            <motion.div 
              key={i}
              variants={fadeIn}
              whileHover={{ 
                y: -10,
                backgroundColor: "#3A2E25",
              }}
              className="group bg-white/40 p-10 md:p-12 aspect-[16/10] md:aspect-[16/9] rounded-xl transition-all duration-700 border border-brand-accent/5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-end"
            >
              <div className="absolute top-8 left-8 text-brand-accent/20 font-serif text-3xl italic group-hover:text-white/20 transition-colors">
                Question 0{i + 1}
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                 <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </div>
              <p className="text-xl md:text-3xl font-serif text-brand-accent leading-[1.2] group-hover:text-white transition-all duration-500 max-w-[85%]">
                {question}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. TRANSITION SECTION */}
      <section id="transition" className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        {/* Parallax Background Elements */}
        <motion.div 
          style={{ 
            y: useTransform(scrollYProgress, [0.3, 0.6], [0, -150]),
            rotate: 15
          }}
          className="absolute -right-20 top-20 w-96 h-96 border border-brand-accent/5 rounded-full pointer-events-none" 
        />
        <motion.div 
          style={{ 
            y: useTransform(scrollYProgress, [0.3, 0.6], [0, 150]),
            rotate: -15
          }}
          className="absolute -left-20 bottom-20 w-[500px] h-[500px] border border-brand-accent/5 rounded-full pointer-events-none" 
        />
        
        <div className="absolute inset-0 bg-[#F2EDE2]" />
        
        <motion.div
           variants={staggerContainer}
           initial="initial"
           whileInView="whileInView"
           viewport={{ once: true, margin: "-20%" }}
           className="relative z-10 max-w-5xl"
        >
          <motion.span 
            variants={fadeIn}
            className="text-xs uppercase tracking-[1em] text-brand-accent/30 mb-12 block font-medium"
          >
            The Philosophy
          </motion.span>
          
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="overflow-hidden">
              <motion.h2 
                variants={{
                  initial: { y: "100%" },
                  whileInView: { y: 0 }
                }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-[120px] font-serif tracking-tighter leading-[1.1] italic text-brand-accent/90"
              >
                From preservation
              </motion.h2>
            </div>
            
            <div className="overflow-hidden">
              <motion.div
                variants={{
                  initial: { y: "100%" },
                  whileInView: { y: 0 }
                }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row items-center justify-center gap-6"
              >
                <span className="text-3xl md:text-6xl font-serif text-brand-accent/40 lowercase">to</span>
                <span className="relative inline-block px-12 py-4 md:py-6 group">
                   <motion.div 
                     initial={{ scaleX: 0 }}
                     whileInView={{ scaleX: 1 }}
                     transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                     className="absolute inset-0 bg-brand-accent origin-left"
                   />
                   <span className="relative z-10 text-white text-5xl md:text-[100px] leading-none">participation.</span>
                </span>
              </motion.div>
            </div>
          </div>

          <motion.div 
            variants={fadeIn}
            transition={{ delay: 1 }}
            className="mt-20 flex justify-center"
          >
            <div className="w-[1px] h-24 bg-gradient-to-b from-brand-accent/20 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* 6. CORE VISION */}
      <section id="vision" className="relative bg-[#121110] text-[#F2EDE2] py-[180px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(216,182,106,0.14),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(242,237,226,0.08),transparent_30%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-20%" }}
            className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-16 lg:gap-24 items-start"
          >
            <motion.div variants={fadeIn} className="space-y-6">
              <span className="text-xs uppercase tracking-[0.6em] text-[#D8B66A]/60 font-bold block">Core Vision</span>
              <h2 className="text-5xl md:text-7xl font-serif italic leading-[1.05] text-[#F0D28A]">
                A Living Museum of Daily Life
              </h2>
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-8">
              <p className="text-2xl md:text-4xl font-serif italic leading-tight text-[#F2EDE2]/90">
                Transform Al Jumail into a living museum where visitors actively experience pre-oil Qatari life through interaction, participation, and daily activities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["Interaction", "Participation", "Daily Activities"].map((principle) => (
                  <div key={principle} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#D8B66A]/55 font-bold mb-4">Principle</p>
                    <h3 className="text-xl font-serif italic text-white">{principle}</h3>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. SOLUTION SECTION */}
      <section ref={solutionContainerRef} id="solution" className="max-w-7xl mx-auto px-6 py-[240px] relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative aspect-[16/11] w-full"
          >
            <motion.div 
              style={{ rotate: useTransform(scrollYProgress, [0.3, 0.6], [0, 15]) }}
              className="absolute -top-16 -left-16 w-64 h-64 border border-brand-accent/10 rounded-full flex items-center justify-center text-[10px] uppercase tracking-[0.5em] text-brand-accent/30 pointer-events-none"
            >
              <span className="animate-spin-slow">Live Museum • Cultural System • </span>
            </motion.div>

            {/* Before/After Slider Container */}
            <div className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(58,46,37,0.25)] group z-10">
              
              {/* Original Image (Background / Left Side) */}
              <img 
                src="/images/Aerial_View_of_Al_Jemail_Fishermen's_Village (1).jpg" 
                alt="Original Site"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
              />
              
              {/* Revitalized Image (Foreground / Right Side, clipped) */}
              <div 
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
              >
                <img 
                  src="/images/aerial_revitalized.png" 
                  alt="Hypothesis Concept"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Drag Handle UI */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-white/80 shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none z-10"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-black/10 transition-transform group-hover:scale-110">
                  <div className="flex gap-1">
                    <div className="w-0.5 h-4 bg-brand-accent/40 rounded-full" />
                    <div className="w-0.5 h-4 bg-brand-accent/40 rounded-full" />
                  </div>
                </div>
              </div>

              {/* The invisible interactive slider input */}
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0"
              />
              
              {/* Labels */}
              <div 
                style={{ opacity: sliderPos > 20 ? 1 : 0, transition: "opacity 0.3s" }}
                className="absolute top-6 left-6 bg-black/40 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full pointer-events-none"
              >
                Original
              </div>
              <div 
                style={{ opacity: sliderPos < 80 ? 1 : 0, transition: "opacity 0.3s" }}
                className="absolute top-6 right-6 bg-black/40 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full pointer-events-none"
              >
                Revitalized
              </div>
            </div>

            <div className="absolute -bottom-12 left-0 w-full flex items-center gap-6 px-4">
               <div className="w-24 h-[1px] bg-brand-accent/20" />
               <p className="text-[10px] uppercase tracking-[0.6em] opacity-40 font-bold whitespace-nowrap">Conceptual Restoration Strategy</p>
            </div>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-12"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-4 text-brand-accent/40">
              <span className="text-xs uppercase tracking-[0.5em] font-bold">The Response</span>
            </motion.div>
            <motion.h2 variants={fadeIn} className="text-5xl md:text-8xl font-serif italic leading-none text-brand-accent tracking-tighter">
              A Living <br /> Experience
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl leading-relaxed opacity-80 font-serif text-brand-accent italic">
              This project transforms the site from a silent relic into a vibrant, participatory ecosystem.
            </motion.p>
            <div className="space-y-6">
               {[
                 "Interactive digital memory layers",
                 "Active heritage engagement",
                 "Community storytelling platforms"
               ].map((item, i) => (
                 <motion.div key={i} variants={fadeIn} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-brand-accent/10 flex items-center justify-center text-xs font-bold group-hover:bg-brand-accent group-hover:text-white transition-all duration-500">0{i+1}</div>
                    <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-brand-accent">{item}</span>
                 </motion.div>
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. INTERACTIVE MAP SECTION */}
      <section id="map" className="relative w-full bg-brand-secondary overflow-hidden flex flex-col py-24">
        <div className="relative z-10 p-12 text-center pointer-events-none">
            <h3 id="site-interactive-title" className="text-3xl md:text-4xl font-serif text-brand-accent tracking-widest uppercase">The Interactive Site</h3>
            <p className="text-sm opacity-50 mt-4 tracking-[0.2em] text-brand-accent font-light">Select a spatial node to reveal its rebirth</p>
        </div>

        <div className="relative z-10 w-full flex-grow flex items-center justify-center p-4 md:p-12">
          <div className="relative w-full max-w-[1600px] aspect-[1559/1009] rounded-2xl shadow-2xl overflow-hidden group/map">
            <img 
              src="/images/aerial_revitalized.png" 
              alt="Site topography"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* SVG Overlay for drawing and rendering precise polygons */}
            <svg 
              className="absolute inset-0 w-full h-full z-20"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {mapNodes.map((node) => {
                const poly = (node as any).polygon;
                if (!poly) return null;
                return (
                  <polygon 
                    key={node.id}
                    points={poly}
                    className="cursor-pointer transition-all duration-500 fill-transparent hover:fill-white/20 stroke-transparent hover:stroke-white/50 stroke-[0.2]"
                    onClick={() => {
                      setSelectedNode(node.id);
                      setModalImageIndex(0);
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  />
                );
              })}
            </svg>
            
            <div className="absolute inset-0 bg-black/0 group-hover/map:bg-black/10 transition-colors duration-700 pointer-events-none" />
          </div>
        </div>

        <AnimatePresence>
          {selectedNode !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 40 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-[#121110] w-full max-w-6xl h-[90vh] md:h-[80vh] rounded-3xl overflow-hidden flex flex-col md:flex-row relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/5"
              >
                <button 
                  onClick={() => setSelectedNode(null)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="absolute top-6 right-6 z-50 p-2 bg-black/40 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Left Side: Images (Fixed 4:3 aspect ratio) */}
                <div className="w-full md:w-[60%] h-[45%] md:h-full relative overflow-hidden bg-black group/carousel flex flex-col items-center justify-center p-4 md:p-8">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#1a1816]">
                    <AnimatePresence mode="popLayout" custom={direction}>
                      <motion.div
                        key={modalImageIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 },
                        }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <img 
                          src={currentImages[modalImageIndex]?.src || currentImages[modalImageIndex]}
                          className="w-full h-full object-cover opacity-90 group-hover/carousel:opacity-100 transition-opacity duration-1000"
                          alt="Restoration detail"
                        />
                      </motion.div>
                    </AnimatePresence>

                    <button 
                      onClick={handlePrevImage}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white hover:bg-black/20 rounded-full transition-all duration-300 z-40 group/btn backdrop-blur-sm"
                      aria-label="Previous Image"
                    >
                      <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover/btn:-translate-x-1" />
                    </button>
                    <button 
                      onClick={handleNextImage}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white hover:bg-black/20 rounded-full transition-all duration-300 z-40 group/btn backdrop-blur-sm"
                      aria-label="Next Image"
                    >
                      <ChevronRight className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>

                  {/* Captions moved below the image */}
                  <div className="w-full mt-6 flex justify-between items-end px-2">
                    <div className="text-white max-w-[75%]">
                       <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold mb-2">View 0{modalImageIndex + 1}</p>
                       <p className="text-lg md:text-xl font-serif italic tracking-tight text-white/80">
                         {currentImages[modalImageIndex]?.caption || "Where heritage meets the future horizon."}
                       </p>
                    </div>

                    <div className="flex gap-1.5 pb-2">
                      {currentImages.map((_, i) => (
                        <button 
                          key={i}
                          onClick={() => setModalImageIndex(i)}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                          className={`h-1 transition-all duration-500 rounded-full ${
                            modalImageIndex === i ? 'w-8 bg-white' : 'w-1.5 bg-white/20 hover:bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Content */}
                <div className="w-full md:w-[40%] p-10 md:p-12 flex flex-col bg-[#121110] relative overflow-y-auto text-[#E8E2D9]">
                  <header className="mb-10">
                    <span className="text-[10px] uppercase tracking-[0.6em] text-white/20 font-bold mb-3 block">Perspective Site</span>
                    <h3 className="text-4xl md:text-5xl font-serif italic leading-tight text-white mb-2">
                      {mapNodes.find(n => n.id === selectedNode)?.title}
                    </h3>
                  </header>
                  
                  <p className="text-lg leading-relaxed text-white/70 mb-10 font-serif italic border-l border-white/10 pl-6">
                    {mapNodes.find(n => n.id === selectedNode)?.description}
                  </p>
                  
                  <div className="mb-10">
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 text-white/20">Programmatic Layers</h4>
                    <ul className="grid grid-cols-1 gap-4">
                      {mapNodes.find(n => n.id === selectedNode)?.activities.map((activity, i) => (
                        <li key={i} className="flex items-center gap-4 group/li">
                          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-20 group-hover/li:opacity-100 group-hover/li:w-4 transition-all duration-300" />
                          <span className="text-base font-serif italic opacity-50 group-hover:opacity-100 transition-opacity">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <footer className="mt-auto pt-8 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold italic">
                      Discovery: {mapNodes.find(n => n.id === selectedNode)?.caption}
                    </p>
                  </footer>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 8. EXTENDED EXPERIENCE */}
      <section id="experience" className="bg-brand-secondary py-[160px] relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-brand-accent/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto mb-24 text-brand-accent">
            <span className="text-xs uppercase tracking-[0.5em] opacity-40 mb-8 block">Holistic Vision</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              The project extends beyond cultural preservation into a complete <span className="italic">visitor experience.</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { t: "Culinary experiences", d: "Rooted in local agriculture, bringing ancient flavors to the modern palate." },
              { t: "Sustainable farming", d: "Integrated systems that treat land restoration as a primary duty." },
              { t: "Strategic partnerships", d: "Fostering community involvement and global heritage awareness." }
            ].map((exp, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.1 }}
                className="group p-10 bg-white rounded-[24px] shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col items-center"
              >
                <div className="w-24 h-[1px] bg-brand-accent/10 mb-8 group-hover:w-full transition-all duration-700" />
                <h4 className="text-2xl font-bold mb-6 text-brand-accent tracking-tight leading-tight">{exp.t}</h4>
                <p className="opacity-60 text-base leading-relaxed text-brand-accent/70">{exp.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. STAKEHOLDERS AND NATIONAL ALIGNMENT */}
      <section id="alignment" className="bg-[#121110] text-[#F2EDE2] py-[180px] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-28">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-15%" }}
            className="space-y-12"
          >
            <motion.div variants={fadeIn} className="max-w-3xl">
              <span className="text-xs uppercase tracking-[0.6em] text-[#D8B66A]/60 font-bold block mb-6">Stakeholder Landscape</span>
              <h2 className="text-4xl md:text-6xl font-serif italic leading-tight text-white">
                A heritage ecosystem led by memory, conservation, and shared enterprise.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STAKEHOLDERS.map((stakeholder) => (
                <motion.div
                  key={stakeholder.group}
                  variants={fadeIn}
                  className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 md:p-10 min-h-[280px] flex flex-col"
                >
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#D8B66A]/55 font-bold mb-6">{stakeholder.role}</p>
                  <h3 className="text-3xl font-serif italic text-[#F0D28A] mb-6">{stakeholder.group}</h3>
                  <p className="text-sm md:text-base leading-relaxed text-white/60 mt-auto">{stakeholder.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-15%" }}
            className="space-y-12"
          >
            <motion.div variants={fadeIn} className="max-w-3xl">
              <span className="text-xs uppercase tracking-[0.6em] text-[#D8B66A]/60 font-bold block mb-6">National Alignment</span>
              <h2 className="text-4xl md:text-6xl font-serif italic leading-tight text-white">
                Al Jumail directly supports Qatar's development priorities.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {NATIONAL_ALIGNMENT.map((item) => (
                <motion.div
                  key={`${item.strategy}-${item.pillar}`}
                  variants={fadeIn}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-6 hover:bg-white/[0.07] transition-colors duration-500"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/30 font-bold mb-3">Strategy</p>
                    <p className="text-xl font-serif italic text-[#F0D28A]">{item.strategy}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/30 font-bold mb-3">{item.pillar}</p>
                    <p className="text-lg leading-relaxed text-white/65 group-hover:text-white/80 transition-colors">{item.application}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. TIMELINE SECTION (REMOVED - INTEGRATED INTO INTRO) */}

      {/* 10. FOOTER */}
      <footer className="py-24 border-t border-brand-accent/5 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-brand-accent/10" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fadeIn} className="mb-12">
             <h2 className="text-3xl md:text-4xl font-serif text-brand-accent tracking-tighter mb-4">Tides of Time</h2>
             <p className="text-xs opacity-40 tracking-[0.4em] uppercase text-brand-accent">Al Jumail Revitalization Project</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
