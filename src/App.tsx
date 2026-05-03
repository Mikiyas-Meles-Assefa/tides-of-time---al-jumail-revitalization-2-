import { useState, useCallback, useEffect, useRef, Fragment } from 'react';
import type { MotionValue } from 'motion/react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { X, ChevronLeft, ChevronRight, MousePointerClick } from 'lucide-react';

const mapNodes = [
  { 
    id: 1, 
    title: "Pearling House", 
    polygon: "25.96,12.42 22.64,12.22 22.77,8.26 33.57,8.76 33.13,12.91 28.71,12.61 28.84,19.73 32.74,21.01 35.56,24.96 33.25,28.92 35.05,35.64 26.03,38.80 22.32,31.49 24.49,23.58 25.84,21.01 26.92,20.02 25.90,12.61",
    description: "Focus: Maritime labor and pearling practices.", 
    activities: [
      "Oyster opening activity using real tools", 
      "Handling diving weights and understanding diver equipment", 
      "Exploring pearl sorting and grading through hands-on display", 
      "Experiencing tools, ropes, and materials used in daily pearling work"
    ], 
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
    description: "Focus: Domestic space and daily routines.", 
    activities: [
      "Participating in textile weaving (sadu)", 
      "Exploring traditional interior layout and family spaces", 
      "Experiencing everyday household activities and tools",
      "Learning about food preparation and storage practices"
    ], 
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
    description: "Focus: Local exchange systems. This house reflects Al Jumail as a regional exchange point, not a large-scale international hub.", 
    activities: [
      "Interacting with goods such as fish, dates, and pearls", 
      "Participating in a simple barter-based activity", 
      "Exploring historic currencies and trade objects", 
      "Understanding how local exchange supported village life"
    ], 
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
    description: "Focus: Social gathering and hospitality.", 
    activities: [
      "Sitting in a traditional majlis setting", 
      "Participating in Arabic coffee preparation and serving", 
      "Listening to guided storytelling and oral history", 
      "Experiencing social interaction and hospitality practices"
    ], 
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
    description: "Focus: Resource-limited cultivation. Agriculture is presented as constrained and adaptive, reflecting local environmental conditions.", 
    activities: [
      "Learning how date palms are used in daily life", 
      "Exploring small-scale planting adapted to harsh conditions", 
      "Understanding water use and survival strategies", 
      "Experiencing basic agricultural tools and techniques"
    ], 
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
    description: "Focus: Reflection and memory.", 
    activities: [
      "Writing and placing personal messages on a memory wall", 
      "Viewing archival material and historical references", 
      "Participating in simple art or drawing activities", 
      "Contributing to a shared record of visitor experiences"
    ], 
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
    title: "Garden & Greenhouse", 
    polygon: "29.67,47.84 39.59,39.54 46.88,46.95 37.92,57.23 28.91,47.84 31.34,49.92 13.43,49.13 13.43,55.65 27.31,55.25 27.31,51.79 32.10,51.89",
    description: "Focus: Contemporary sustainability interpretation. This zone introduces hydroponics as a contemporary response to the environmental limits of the site, without presenting it as a historical practice.", 
    activities: [
      "Demonstration planting", 
      "Hydroponic cultivation systems adapted to arid, saline conditions",
      "Water-efficient closed-loop irrigation"
    ], 
    caption: "Greenhouse systems and water heritage",
    images: [
      { src: "/images/Agricultural Garden & Greenhouse/green house sth bird view.png", caption: "Bird's-eye view of the greenhouse" },
      { src: "/images/Agricultural Garden & Greenhouse/irrigation fallaj demosntration green house.png", caption: "Falaj irrigation demonstration" }
    ]
  },
  { 
    id: 8, 
    title: "Food Space", 
    polygon: "39.39,61.97 51.67,51.30 63.44,59.50 53.21,74.92 45.15,67.31 16.56,68.39 17.27,63.36 42.21,64.34 38.88,61.58",
    description: "Focus: Local cuisine.", 
    activities: [
      "Simple, locally inspired meals", 
      "Outdoor seating integrated with the site"
    ], 
    caption: "Dining through local flavor",
    images: [
      { src: "/images/Restaurant & Cafe/restaurant cafe entrance.png", caption: "Restaurant and cafe entrance" },
      { src: "/images/Restaurant & Cafe/restaurant outdoor.png", caption: "Outdoor dining experience" },
      { src: "/images/Restaurant & Cafe/local dishes in the restaurant.png", caption: "Local dishes served through heritage storytelling" }
    ]
  },
  { 
    id: 9, 
    title: "Service Area", 
    polygon: "61.90,81.54 72.01,68.20 79.55,71.06 78.15,83.41 79.68,86.87 79.68,90.82 69.77,91.61 61.33,80.94",
    description: "Focus: Operations.", 
    activities: [
      "Staff circulation", 
      "Maintenance and logistics"
    ], 
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
  { title: "Structural Decay", desc: "Structural decay of coral-stone buildings due to salt, humidity, and erosion." },
  { title: "Intangible Loss", desc: "Loss of intangible heritage, including oral history and daily practices." },
  { title: "Limited Engagement", desc: "Limited public engagement with pre-oil coastal life." }
];

const STAKEHOLDERS = [
  {
    group: "Tribal Descendants",
    role: "Provide historical knowledge and cultural validation",
    detail: "Al Jumail was historically inhabited by members of the Al-Kubaisa tribe, alongside families from the Al-Muhannadi confederation—particularly the Al Hassan branch—as well as Al-Bu Kawara and Al-Humaidat families."
  },
  {
    group: "Public Institutions",
    role: "Lead planning, approval, and implementation",
    detail: "Qatar Museums: project owner for heritage sites; sets conservation standards, approves interventions, and oversees implementation. Ministry of Culture: supports programming, interpretation, and cultural alignment. Ministry of Environment and Climate Change: regulates environmental protection, land use, and sustainability measures. Relevant public works/municipal bodies: coordinate access, utilities, and site infrastructure within conservation limits."
  },
  {
    group: "Researchers and Educators",
    role: "Support documentation and learning programs",
    detail: "Schools, universities, and researchers use the site as a field classroom for archaeology, ecology, architecture, oral history, and sustainable design."
  },
  {
    group: "Private Operators",
    role: "Manage food and activity programs within constraints",
    detail: "Agriculture, food, craft, and hospitality partners operate selected programs while following conservation limits and community-approved storytelling."
  },
  {
    group: "Visitors",
    role: "Engage with the site through participation",
    detail: "Visitors become active learners through pearling, trade, farming, majlis, and memory activities rather than passive observers of abandoned ruins."
  },
  {
    group: "Site Staff",
    role: "Maintain operations and preservation standards",
    detail: "Guides, conservators, gardeners, educators, and service teams manage visitor flow, maintenance, safety, interpretation, and long-term monitoring."
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
    application: "Harmonizing urban expansion with environmental stewardship."
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

const INTEGRATED_STRATEGY = [
  {
    field: "Science",
    focus: "Conservation and ecology",
    detail: "",
    guides: [
      "Material decay (salt crystallization, humidity)",
      "Climate exposure",
      "Water scarcity, addressed through contemporary methods such as hydroponic systems that reduce water use and operate in saline environments"
    ]
  },
  {
    field: "Design",
    focus: "Adaptive reuse and experience",
    detail: "",
    guides: [
      "Adaptive reuse of existing structures",
      "Minimal intervention strategies",
      "Controlled visitor movement"
    ]
  },
  {
    field: "Policy",
    focus: "Governance and national alignment",
    detail: "",
    guides: [
      "Alignment with Qatar National Vision 2030",
      "Heritage conservation guidelines",
      "Environmental protection requirements"
    ]
  }
];

const EVIDENCE_BASIS = [
  {
    title: "Heritage Value",
    detail: "Documented classification of Al Jumail as a historic coastal village, with known use of coral stone and traditional construction methods."
  },
  {
    title: "Historic Transition",
    detail: "Recorded shift from pearling economy to oil-based urbanization."
  },
  {
    title: "Environmental Exposure",
    detail: "Environmental conditions of northern Qatar, including wind, humidity, salt, and heat."
  },
  {
    title: "Policy Relevance",
    detail: "QNV 2030 frames national development through social, human, economic, and environmental pillars, including the balance between modernization, tradition, and environmental protection."
  }
];

const IMPLEMENTATION_PHASES = [
  {
    phase: "01",
    title: "Documentation",
    points: [
      "Conduct detailed site surveys and structural assessments of all buildings",
      "Map fragile zones and areas suitable for intervention",
      "Collect oral histories from tribal descendants to ensure cultural accuracy",
      "Coordinate with Qatar Museums and researchers to establish conservation guidelines"
    ]
  },
  {
    phase: "02",
    title: "Stabilization",
    points: [
      "Reinforce unstable coral-stone walls using approved conservation methods",
      "Define restricted and accessible zones across the site",
      "Implement basic infrastructure for safety (paths, barriers, signage)",
      "Ensure all work aligns with environmental and heritage regulations"
    ]
  },
  {
    phase: "03",
    title: "Adaptation",
    points: [
      "Convert selected houses into activity spaces with minimal physical intervention",
      "Install low-impact elements (tools, seating, shading) without altering original structures",
      "Introduce greenhouse and hydroponic systems in designated non-sensitive areas",
      "Set up staff zones and service routes to support operations without disrupting the site"
    ]
  },
  {
    phase: "04",
    title: "Operation",
    points: [
      "Train staff and guides to manage visitor flow and interpret the site",
      "Implement controlled visitor routes and capacity limits",
      "Establish maintenance schedules for structures and environmental monitoring",
      "Coordinate ongoing oversight with public institutions for long-term management"
    ]
  }
];

const IMPACT_LIMITATIONS = [
  {
    title: "Impacts",
    points: [
      "Preserves a coastal heritage site",
      "Enables active learning of pre-oil life",
      "Supports cultural tourism",
      "Demonstrates contemporary sustainability practices, including hydroponic agriculture as a response to water scarcity",
      "Raises awareness of environmental constraints"
    ]
  },
  {
    title: "Limitations",
    points: [
      "Fragile coral-stone buildings limit how much can be restored or modified",
      "High visitor traffic can wear down surfaces and weaken structures",
      "Cars and road access can damage the site and nearby landscape",
      "Staff housing and service areas risk disrupting the historic setting if not carefully placed",
      "Salt, wind, and humidity cause ongoing damage and require constant maintenance"
    ]
  }
];

const MULTIMEDIA_METHOD = [
  {
    mode: "Before / After Slider",
    purpose: "Shows the design argument directly by comparing abandonment with the proposed revitalized site."
  },
  {
    mode: "Interactive Map",
    purpose: "Turns the proposal into a navigable system, allowing each house and landscape zone to explain its program."
  },
  {
    mode: "Image Carousels",
    purpose: "Support the solution with visual evidence of activities, atmospheres, and spatial uses."
  },
  {
    mode: "Suggested Audio Layer",
    purpose: "Sea, wind, footsteps, market activity, and oral-history narration could make the multimedia output equivalent to a guided heritage experience."
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
  const [hasClickedMap, setHasClickedMap] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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

  const historyTimeline = [
    { year: "18th–19th Century", title: "Settlement", desc: "Al Jumail develops as a small coastal community dependent on pearling and fishing." },
    { year: "Early 20th Century", title: "Economic Shift", desc: "The decline of natural pearl markets affects coastal settlements across the Gulf." },
    { year: "Mid 20th Century", title: "Migration", desc: "Population shifts toward urban centers following the rise of the oil economy." },
    { year: "Present", title: "Abandonment", desc: "The village remains as a historical site with significant cultural value but limited active use." },
  ];

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
          <span>Al Jumail, Northern Coast of Qatar</span>
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
            <h1 className="text-[clamp(3rem,12vmin,8.75rem)] font-bold mb-[clamp(1rem,4vmin,2.5rem)] tracking-tighter leading-[0.85]">
              Tides of Time
            </h1>
            <h2 className="text-[clamp(1.25rem,4vmin,1.875rem)] font-serif mb-[clamp(1.5rem,5vmin,3rem)] opacity-80 max-w-3xl mx-auto leading-tight italic font-light">
              Reimagining Al Jumail as a Living Memory
            </h2>
            <div className="flex items-center justify-center gap-[clamp(0.5rem,2vmin,1.5rem)] opacity-60">
              <div className="h-[1px] w-[clamp(1.5rem,4vmin,3rem)] bg-white" />
              <p className="text-[clamp(0.75rem,1.5vmin,0.875rem)] uppercase tracking-[0.4em] font-light">
                Immersive Heritage Experience
              </p>
              <div className="h-[1px] w-[clamp(1.5rem,4vmin,3rem)] bg-white" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ delay: 2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="absolute bottom-[4vmin] left-[4vmin] z-20 w-[24vmin] p-[1.5vmin] bg-black/40 backdrop-blur-md border border-white/10 rounded-[1vmin]"
        >
          <p className="text-[0.9vmin] font-serif text-white/90 leading-[1.6] mb-[1vmin]">
            Tides of Time proposes the revitalization of Al Jumail Village as a living heritage site. The project transforms an abandoned coastal settlement into an active cultural landscape where visitors learn through participation, conservation, and guided experience.
          </p>
          <p className="text-[0.9vmin] font-serif text-white/70 leading-[1.6]">
            Rather than presenting heritage as something to observe from a distance, the proposal enables visitors to engage with everyday life: pearling, trade, family life, hospitality, limited agriculture, and collective memory.
          </p>
        </motion.div>

        <motion.div 
          id="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="absolute bottom-[5vmin] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[2.5vmin] max-h-[500px]:hidden"
        >
          <span className="text-[1vmin] text-white/30 uppercase tracking-[0.6em] vertical-rl font-light">Explore</span>
          <div className="relative w-[1px] h-[8vmin] bg-white/10 overflow-hidden">
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

      {/* 2. THE SITE */}
      <section id="intro" className="relative bg-[#121110] pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(216,182,106,0.12),transparent_40%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center relative z-10">
          <motion.div {...fadeIn} className="space-y-7 lg:space-y-9 text-[#F2EDE2]">
            <div className="space-y-3">
              <span className="text-sm md:text-base uppercase tracking-[0.4em] font-bold block text-[#D8B66A]/90">
                The Site
              </span>
              <h2 className="text-4xl md:text-6xl font-serif italic leading-[1.05] text-[#F0D28A]">
                A Coastal Settlement <br /> in Decline
              </h2>
            </div>
            <p className="text-lg md:text-2xl leading-snug font-serif text-[#F2EDE2]/85">
              Al Jumail is a coastal village in northern Qatar, established in the 18th–19th century and inhabited until the mid-20th century. It was historically supported by pearling and fishing. Today, the site is abandoned. Coral-stone buildings remain in varying states of decay, shaped by wind, salt, and time.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[#F2EDE2]/65 max-w-xl border-l border-[#D8B66A]/30 pl-6">
              The site represents both physical deterioration and a weakening connection between contemporary society and pre-oil ways of life.
            </p>
          </motion.div>

          <motion.div {...fadeIn} className="relative h-[min(52vh,520px)] flex items-center justify-center">
            <div className="relative w-full max-w-[620px] aspect-[4/3] overflow-hidden rounded-[18px] border border-white/15 bg-white/5 shadow-[0_35px_90px_-35px_rgba(0,0,0,0.9)]">
              <img
                src="/images/qatar-map.png"
                alt="Map of Qatar showing Al Jumail"
                className="w-full h-full object-contain p-6 md:p-10"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.4)] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. HISTORY */}
      <section id="history" className="relative bg-[#121110] text-[#F2EDE2] pt-8 pb-24 md:pb-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-14">
          <motion.div {...fadeIn} className="max-w-3xl space-y-5">
            <span className="text-sm md:text-base uppercase tracking-[0.4em] font-bold block text-[#D8B66A]/90">Historical Context</span>
            <h2 className="text-4xl md:text-6xl font-serif italic leading-[1.05] text-[#F0D28A]">
              From Maritime Life <br /> to Abandonment
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-15%" }}
              className="relative pl-10 md:pl-14"
            >
              <div className="absolute left-3 md:left-5 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#D8B66A]/20 via-[#D8B66A]/85 to-[#D8B66A]/20" />
              <div className="space-y-10 md:space-y-12">
                {historyTimeline.map((item, index) => (
                  <motion.div key={item.year} variants={fadeIn} className="relative">
                    <div className="absolute left-[-2.05rem] md:left-[-2.8rem] top-1.5 w-3 h-3 rounded-full bg-[#D8B66A] shadow-[0_0_0_6px_rgba(216,182,106,0.15)]" />
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/25 font-bold mb-2">0{index + 1}</p>
                    <span className="text-3xl md:text-4xl font-serif text-[#F0D28A]/75 block mb-2 italic">{item.year}</span>
                    <h3 className="text-lg font-bold mb-3 uppercase tracking-widest text-[#F2EDE2]/90">{item.title}</h3>
                    <p className="text-[#F2EDE2]/65 text-sm md:text-base leading-relaxed max-w-[58ch]">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="relative min-h-[500px] md:min-h-[620px]">
              <motion.div
                initial={{ opacity: 0, y: -120 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[106%] w-[86%] aspect-[4/3] rounded-[20px] overflow-hidden border border-white/10 shadow-[0_35px_90px_-40px_rgba(0,0,0,0.85)]"
              >
                <img
                  src="/images/Aerial_View_of_Al_Jemail_Fishermen's_Village (1).jpg"
                  alt="Aerial view of Al Jumail fishermen's village"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 120 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[6%] w-[86%] aspect-[4/3] rounded-[20px] overflow-hidden border border-white/10 shadow-[0_35px_90px_-40px_rgba(0,0,0,0.85)]"
              >
                <img
                  src="/images/210706162824-18-al-mafjar-3624.jpg"
                  alt="Al Jumail village ruins"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. PROBLEM SECTION — tall scroll runway pins the viewport; spiral animates across that scroll */}
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
                <span className="text-sm md:text-base uppercase tracking-[0.4em] font-bold text-brand-secondary/80">The Challenge</span>
              </motion.div>
              
              <motion.h2 variants={fadeIn} className="text-5xl md:text-7xl font-serif italic leading-[1.1] text-white">
                A Measurable <br /> <span className="opacity-40">Heritage Risk</span>
              </motion.h2>
              
              <motion.p variants={fadeIn} className="text-xl opacity-60 font-serif leading-relaxed italic max-w-sm text-[#E8E2D9]">
                The site faces three primary risks:
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
              
              <motion.p variants={fadeIn} className="text-lg opacity-60 font-serif leading-relaxed italic text-[#E8E2D9] pt-4">
                Without intervention, both the physical site and its cultural meaning will continue to deteriorate.
              </motion.p>
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
        
        <div className="mb-24 text-center relative z-10">
            <motion.h2 variants={fadeIn} className="text-4xl md:text-[80px] font-serif italic text-brand-accent/90 leading-none tracking-tighter mb-16">Research Questions</motion.h2>
            
            <motion.div 
              variants={fadeIn} 
              className="relative p-8 md:p-12 bg-white/40 border border-brand-accent/10 rounded-2xl backdrop-blur-xl max-w-4xl mx-auto shadow-[0_20px_60px_-15px_rgba(58,46,37,0.1)] group hover:bg-white/60 transition-colors duration-700 mb-16"
            >
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 text-brand-accent/10 font-serif text-[120px] md:text-[180px] leading-none select-none pointer-events-none group-hover:text-brand-accent/20 transition-colors duration-700">
                "
              </div>
              <h4 className="text-sm md:text-base uppercase tracking-[0.4em] text-brand-accent/60 mb-6 font-bold flex items-center justify-center gap-4 relative z-10">
                <span className="w-8 h-[1px] bg-brand-accent/40" />
                Central Question
              </h4>
              <p className="text-2xl md:text-4xl font-serif text-brand-accent/90 leading-[1.4] italic relative z-10 text-center">
                How can the abandoned village of Al Jumail be revitalized into a sustainable, interactive Live Museum that preserves Qatar's heritage while meeting the social and environmental standards of the 21st century?
              </p>
            </motion.div>
        </div>
        
        <div className="mb-12 relative z-10 text-center">
           <motion.h4 variants={fadeIn} className="text-sm md:text-base uppercase tracking-[0.4em] text-brand-accent/80 block font-bold">Core Questions</motion.h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          {[
            "How can Al Jumail be adapted into a public heritage site without damaging its fragile fabric?",
            "How can visitors actively engage with history instead of passively observing it?",
            "How can environmental constraints guide, rather than limit, design decisions?",
            "How can conservation, design, and policy operate as a single system?"
          ].map((question, i) => (
            <motion.div 
              key={i}
              variants={fadeIn}
              whileHover={{ 
                y: -12,
                scale: 1.01,
              }}
              className={`group p-10 md:p-12 aspect-[16/10] md:aspect-[16/9] rounded-[26px] transition-all duration-700 border backdrop-blur-xl relative overflow-hidden flex flex-col justify-end shadow-[0_30px_80px_-40px_rgba(58,46,37,0.25)] ${
                i % 2 === 0
                  ? 'bg-white/55 border-brand-accent/10 md:-translate-y-3'
                  : 'bg-[#f8f3ea]/80 border-brand-accent/15 md:translate-y-3'
              }`}
            >
              <div className="absolute top-8 left-8 text-brand-accent/20 font-serif text-3xl italic group-hover:text-brand-accent/35 transition-colors">
                Question 0{i + 1}
              </div>
              <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-[radial-gradient(circle_at_center,rgba(216,182,106,0.25),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-0 left-0 h-1 bg-brand-accent/70 w-0 group-hover:w-full transition-all duration-700" />
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                 <div className="w-1.5 h-1.5 bg-brand-accent/40 rounded-full animate-pulse" />
              </div>
              <p className="text-xl md:text-3xl font-serif text-brand-accent leading-[1.2] transition-all duration-500 max-w-[85%]">
                {question}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. TRANSITION SECTION */}
      <section id="transition" className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden py-12 md:py-16">
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
           className="relative z-10 max-w-5xl mx-auto pt-10 md:pt-14"
        >
          <motion.span 
            variants={fadeIn}
            className="text-sm md:text-base uppercase tracking-[0.4em] text-brand-accent/80 mb-12 block font-bold"
          >
            Project Approach
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
                     <span className="relative z-10 text-white text-5xl md:text-[100px] leading-none">use.</span>
                  </span>
                </motion.div>
              </div>
            </div>

            <motion.div variants={fadeIn} transition={{ delay: 0.8 }} className="mt-20 max-w-3xl mx-auto space-y-8">
              <p className="text-xl md:text-2xl font-serif leading-relaxed text-brand-accent/90 text-center italic">
                The project shifts from static preservation to controlled activation.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-10">
                <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl border border-brand-accent/10">
                  <h4 className="font-bold text-brand-accent tracking-widest uppercase text-xs mb-3 border-b border-brand-accent/10 pb-2">Preservation</h4>
                  <p className="text-brand-accent/70 font-serif italic">protects the existing structures</p>
                </div>
                <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl border border-brand-accent/10">
                  <h4 className="font-bold text-brand-accent tracking-widest uppercase text-xs mb-3 border-b border-brand-accent/10 pb-2">Adaptation</h4>
                  <p className="text-brand-accent/70 font-serif italic">introduces low-impact uses</p>
                </div>
                <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl border border-brand-accent/10">
                  <h4 className="font-bold text-brand-accent tracking-widest uppercase text-xs mb-3 border-b border-brand-accent/10 pb-2">Participation</h4>
                  <p className="text-brand-accent/70 font-serif italic">allows visitors to experience daily life practices</p>
                </div>
              </div>
            </motion.div>

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
              <span className="text-sm md:text-base uppercase tracking-[0.4em] text-[#D8B66A]/90 font-bold block">Core Vision</span>
              <h2 className="text-5xl md:text-7xl font-serif italic leading-[1.05] text-[#F0D28A]">
                A Living Heritage Site
              </h2>
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-8">
              <p className="text-2xl md:text-4xl font-serif italic leading-tight text-[#F2EDE2]/90">
                Al Jumail becomes a site where heritage is experienced through activity. The goal is not reconstruction, but careful reuse.
              </p>
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#D8B66A]/80 font-bold mb-6">Three guiding principles:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { title: "Interaction", desc: "Visitors engage with tools, spaces, and processes" },
                    { title: "Participation", desc: "Activities reflect real practices" },
                    { title: "Everyday Life", desc: "Focus on work, family, and social interaction" }
                  ].map((principle, index) => (
                    <div
                      key={principle.title}
                      className={`rounded-2xl border bg-white/[0.04] p-6 flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                        index === 1
                          ? 'border-[#D8B66A]/35 shadow-[0_24px_60px_-40px_rgba(216,182,106,0.8)]'
                          : 'border-white/10'
                      }`}
                    >
                      <p className="text-[10px] uppercase tracking-[0.35em] text-[#D8B66A]/55 font-bold mb-4">Principle</p>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-white/30 font-bold mb-3">0{index + 1}</p>
                      <h3 className="text-xl font-serif italic text-white mb-3">{principle.title}</h3>
                      <p className="text-sm leading-relaxed text-white/60">{principle.desc}</p>
                    </div>
                  ))}
                </div>
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
            className="order-2 lg:order-1 relative w-full flex flex-col"
          >
            <motion.div 
              style={{ rotate: useTransform(scrollYProgress, [0.3, 0.6], [0, 15]) }}
              className="absolute -top-16 -left-16 w-64 h-64 border border-brand-accent/10 rounded-full flex items-center justify-center text-[10px] uppercase tracking-[0.5em] text-brand-accent/30 pointer-events-none"
            >
              <span className="animate-spin-slow">Live Museum • Cultural System • </span>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-center gap-4 text-brand-accent/40 mb-6 relative z-10">
              <span className="text-sm md:text-base uppercase tracking-[0.4em] font-bold text-brand-accent/80">The Intervention</span>
            </motion.div>
            <motion.h2 variants={fadeIn} className="text-5xl md:text-8xl font-serif italic leading-none text-brand-accent tracking-tighter mb-8 relative z-10">
              The Solution
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl leading-relaxed opacity-80 font-serif text-brand-accent italic mb-12 relative z-10">
              The project transforms Al Jumail from an abandoned site into an interactive living museum. Visitors do not just walk through ruins — they move through a sequence of spaces where each building represents a part of daily life.
            </motion.p>

            {/* Before/After Slider Container */}
            <div className="relative aspect-[16/11] w-full rounded-[32px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(58,46,37,0.25)] group z-10">
              
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

            <div className="relative mt-8 w-full flex items-center gap-6 px-4">
               <div className="w-24 h-[1px] bg-brand-accent/20" />
               <p className="text-[10px] uppercase tracking-[0.6em] opacity-40 font-bold whitespace-nowrap">Conceptual Restoration Strategy</p>
            </div>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl font-serif text-brand-accent/80 italic mt-12 pt-6 border-t border-brand-accent/10">
              Visitors move through the site by selecting and exploring these houses, each offering hands-on activities that bring the past into the present.
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-12 lg:pt-[180px]"
          >
            <motion.p variants={fadeIn} className="text-xl md:text-2xl leading-relaxed opacity-80 font-serif text-brand-accent italic">
              The experience is organized as a story map of the village, where each location is explored through activity, not observation.
            </motion.p>
            <div className="space-y-8">
               <p className="text-lg opacity-80 font-bold tracking-widest text-brand-accent uppercase mb-6">The solution includes:</p>
               {[
                 { title: "Stabilize structures", desc: "Stabilizing fragile structures and reusing them only where conservation allows" },
                 { title: "Clear visitor route", desc: "Creating a clear visitor route across the site with guided movement and controlled access" },
                 { title: "System of six houses", desc: "Transforming the village into a system of six main houses, each representing a core part of life: pearling, trade, family life, social gathering, agriculture, and memory" },
                 { title: "Support spaces", desc: "Supporting the experience with additional spaces such as a food area and service zones for operations" },
                 { title: "Low-impact interventions", desc: "Ensuring all interventions remain low-impact and reversible to protect the original fabric" }
               ].map((item, i) => (
                 <motion.div key={i} variants={fadeIn} className="flex gap-6 group items-start">
                    <div className="w-12 h-12 flex-shrink-0 rounded-full border border-brand-accent/10 flex items-center justify-center text-xs font-bold text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-500">0{i+1}</div>
                    <div>
                      <span className="text-lg opacity-80 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-brand-accent block mb-2">{item.title}</span>
                      <p className="text-sm font-serif italic text-brand-accent/60 leading-relaxed">{item.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. INTERACTIVE MAP SECTION */}
      <section id="map" className="relative w-full bg-brand-secondary overflow-hidden flex flex-col pt-24 pb-12">
        <div className="relative z-10 px-6 pb-6 text-center pointer-events-none">
            <h3 id="site-interactive-title" className="text-3xl md:text-4xl font-serif text-brand-accent tracking-widest uppercase">The Interactive Story Map</h3>
            <p className="text-sm md:text-base opacity-70 mt-4 tracking-[0.2em] text-brand-accent font-bold">Click on the houses in the map below to explore their details and programs</p>
        </div>

        <div className="relative z-10 w-full flex-grow flex items-center justify-center p-4 md:px-12 md:pb-12">
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
                      setHasClickedMap(true);
                      setModalImageIndex(0);
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  />
                );
              })}
            </svg>
            
            <div className="absolute inset-0 bg-black/0 group-hover/map:bg-black/10 transition-colors duration-700 pointer-events-none" />

            {/* Click Here Indicator */}
            {!hasClickedMap && (
              <div 
                className="absolute z-30 pointer-events-none animate-bounce" 
                style={{ left: '28.5%', top: '23%' }}
              >
                <div className="relative">
                  {/* Text pill positioned absolutely above the exact map coordinate so it scales upward */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-brand-accent text-white text-[10px] md:text-xs lg:text-sm font-bold px-4 py-2 md:px-5 md:py-2.5 rounded-full uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(0,0,0,0.5)] whitespace-nowrap border border-white/20">
                    Click to explore Pearling House
                  </div>
                  {/* Icon positioned so its pointing tip remains anchored exactly at the map coordinate */}
                  <MousePointerClick 
                    className="absolute top-0 w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-white drop-shadow-[0_0_12px_rgba(0,0,0,0.6)]" 
                    strokeWidth={2.5} 
                    style={{ transform: 'translateX(-35%)' }}
                  />
                </div>
              </div>
            )}
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
        <div className="absolute -left-24 top-12 w-80 h-80 rounded-full border border-brand-accent/10 pointer-events-none" />
        <div className="absolute -right-32 bottom-0 w-[420px] h-[420px] rounded-full border border-brand-accent/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto mb-24 text-brand-accent">
            <span className="text-sm md:text-base uppercase tracking-[0.4em] text-brand-accent/80 mb-8 block font-bold">Holistic Vision</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              The project extends beyond cultural preservation into a complete <span className="italic">visitor experience.</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {[
              { t: "Culinary Experiences", d: "Rooted in local agriculture, the food program brings ancient flavors to the modern palate." },
              { t: "Sustainable Farming", d: "Integrated agricultural systems treat land restoration as a primary duty." },
              { t: "Strategic Partnerships", d: "Partnerships foster community involvement and global heritage awareness." }
            ].map((exp, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.1 }}
                className={`group p-10 rounded-[28px] border transition-all duration-700 flex flex-col items-center text-left md:text-center ${
                  i === 1
                    ? 'bg-brand-accent text-[#F2EDE2] border-brand-accent shadow-[0_35px_80px_-40px_rgba(58,46,37,0.6)] md:-translate-y-5'
                    : 'bg-white border-brand-accent/10 text-brand-accent shadow-[0_25px_70px_-45px_rgba(58,46,37,0.35)]'
                }`}
              >
                <p className={`text-[10px] uppercase tracking-[0.4em] font-bold mb-6 ${i === 1 ? 'text-[#F0D28A]/90' : 'text-brand-accent/40'}`}>0{i + 1}</p>
                <div className={`w-24 h-[1px] mb-8 group-hover:w-full transition-all duration-700 ${i === 1 ? 'bg-[#F0D28A]/50' : 'bg-brand-accent/10'}`} />
                <h4 className={`text-2xl font-bold mb-6 tracking-tight leading-tight ${i === 1 ? 'text-white' : 'text-brand-accent'}`}>{exp.t}</h4>
                <p className={`text-base leading-relaxed ${i === 1 ? 'text-white/75' : 'text-brand-accent/70'}`}>{exp.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FROM VISION TO IMPLEMENTATION */}
      <section id="implementation" className="relative bg-[#F2EDE2] text-brand-accent py-[180px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(216,182,106,0.18),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(58,46,37,0.10),transparent_30%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-15%" }}
            className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start"
          >
            <motion.div variants={fadeIn} className="space-y-6">
              <span className="text-sm md:text-base uppercase tracking-[0.4em] text-brand-accent/80 font-bold block">Visitor Experience</span>
              <h2 className="text-5xl md:text-7xl font-serif italic leading-[1.05] text-brand-accent">
                The visitor journey.
              </h2>
            </motion.div>
            <motion.div variants={fadeIn} className="space-y-6">
              <p className="text-2xl md:text-3xl font-serif italic leading-tight text-brand-accent/90">
                The visitor journey follows a clear route through the six main houses, beginning with the Pearling House near the shoreline and moving through trade, family life, and social spaces before ending at the Art & Memory House.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Guided Movement", text: "Visitors move along defined paths supported by staff guidance, ensuring both accessibility and protection of fragile structures." },
                  { label: "Experience Priority", text: "The experience prioritizes clarity, movement, and gradual understanding rather than spectacle." }
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/70 border border-brand-accent/10 p-6 shadow-sm">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-brand-accent/40 font-bold mb-4">{item.label}</p>
                    <p className="text-sm leading-relaxed text-brand-accent/70">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-15%" }}
            className="space-y-10"
          >
            <motion.div variants={fadeIn} className="max-w-3xl">
              <span className="text-sm md:text-base uppercase tracking-[0.4em] text-brand-accent/80 font-bold block mb-6">Evidence Base</span>
              <h3 className="text-4xl md:text-5xl font-serif italic leading-tight">
                The proposal is grounded in:
              </h3>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {EVIDENCE_BASIS.map((item, index) => (
                <motion.div
                  key={item.title}
                  {...fadeIn}
                  className="rounded-2xl border border-brand-accent/15 bg-white p-7 md:p-8 min-h-[230px] flex flex-col shadow-[0_20px_60px_-35px_rgba(58,46,37,0.35)] relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_30px_80px_-20px_rgba(58,46,37,0.25)] transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#F2EDE2] rounded-bl-[24px] flex items-center justify-center -mr-2 -mt-2 group-hover:bg-brand-accent transition-colors duration-500 border-l border-b border-brand-accent/10">
                    <span className="text-brand-accent/40 group-hover:text-[#F0D28A] font-serif italic text-xl pr-2 pt-2">0{index + 1}</span>
                  </div>
                  <h4 className="text-xl font-serif italic text-brand-accent mb-6 pr-8 relative z-10">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-brand-accent/75 relative z-10">{item.detail}</p>
                </motion.div>
              ))}
            </div>
            <motion.p variants={fadeIn} className="text-xs uppercase tracking-[0.25em] leading-relaxed text-brand-accent/40 max-w-4xl">
              Source basis: Qatar Museums heritage-site descriptions, Qatar National Vision 2030, and publicly available descriptions of Al Jumail as a coastal pearling and fishing settlement.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-15%" }}
            className="space-y-10"
          >
            <motion.div variants={fadeIn} className="max-w-3xl">
              <span className="text-sm md:text-base uppercase tracking-[0.4em] text-brand-accent/80 font-bold block mb-6">Science, Design, Policy</span>
              <h3 className="text-4xl md:text-5xl font-serif italic leading-tight">
                Each discipline answers a different project risk.
              </h3>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-[36px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] border border-white/10">
              {INTEGRATED_STRATEGY.map((item, index) => (
                <motion.div
                  key={item.field}
                  {...fadeIn}
                  className={`bg-[#121110] hover:bg-[#181716] transition-colors duration-500 text-[#F2EDE2] p-8 md:p-10 lg:p-12 min-h-[330px] flex flex-col relative group ${
                    index !== 0 ? 'border-t md:border-t-0 md:border-l border-white/10' : ''
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#D8B66A]/60 font-bold mb-6">{item.field}</p>
                  <h4 className="text-3xl font-serif italic text-[#F0D28A] mb-8">{item.focus}</h4>
                  {item.detail && <p className="text-sm md:text-base leading-relaxed text-white/75 mb-8">{item.detail}</p>}
                  <div>
                    <ul className="space-y-4">
                      {item.guides.map((guide, i) => (
                        <li key={i} className="text-sm text-white/60 flex gap-4">
                          <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[#D8B66A]/50 group-hover:bg-[#D8B66A] transition-colors" />
                          <span>{guide}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-15%" }}
            className="space-y-16"
          >
            <motion.div variants={fadeIn} className="max-w-3xl space-y-6">
              <span className="text-sm md:text-base uppercase tracking-[0.4em] text-brand-accent/80 font-bold block">Implementation</span>
              <h3 className="text-4xl md:text-5xl font-serif italic leading-tight">
                A phased route makes the proposal realistic.
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-brand-accent/65">
                Feasibility depends on starting with documentation and conservation before adding visitor activity. Programs are introduced only where structures, ecology, access, and staffing can support them.
              </p>
            </motion.div>
            <div className="relative max-w-5xl lg:ml-20 mt-20">
              {/* Vertical line for desktop */}
              <div className="hidden md:block absolute left-[120px] lg:left-[160px] top-8 bottom-8 w-[1px] bg-brand-accent/15" />
              
              <div className="space-y-12 md:space-y-16">
                {IMPLEMENTATION_PHASES.map((item) => (
                  <motion.div
                    key={item.phase}
                    {...fadeIn}
                    className="relative flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-16 items-start group"
                  >
                    {/* Phase Number & Node */}
                    <div className="md:w-[120px] lg:w-[160px] flex-none flex items-center md:items-start gap-4 md:gap-0 z-10">
                      <div className="md:hidden text-brand-accent/30 font-serif italic text-5xl">
                        {item.phase}
                      </div>
                      <div className="hidden md:flex w-full items-start justify-between pr-[-8px]">
                        <span className="text-5xl lg:text-6xl font-serif italic text-brand-accent/30 group-hover:text-brand-accent transition-colors duration-500">
                          {item.phase}
                        </span>
                        {/* The circle on the line */}
                        <div className="w-3 h-3 mt-5 lg:mt-6 rounded-full border border-brand-accent bg-[#F2EDE2] group-hover:bg-[#D8B66A] group-hover:border-[#D8B66A] group-hover:scale-150 transition-all duration-500 relative -right-[6px]" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 rounded-[32px] bg-white p-8 md:p-12 shadow-[0_20px_60px_-35px_rgba(58,46,37,0.15)] border border-brand-accent/10 group-hover:shadow-[0_30px_80px_-20px_rgba(58,46,37,0.25)] group-hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,rgba(216,182,106,0.15),transparent_70%)] transition-transform duration-700 group-hover:scale-150" />
                      
                      <h4 className="text-3xl font-serif italic text-brand-accent mb-8 relative z-10">{item.title}</h4>
                      <ul className="space-y-5 relative z-10">
                        {item.points.map((point, i) => (
                          <li key={i} className="flex gap-5 text-base leading-relaxed text-brand-accent/80">
                            <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[#D8B66A]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-15%" }}
            className="space-y-10"
          >
            <motion.div variants={fadeIn} className="max-w-3xl">
              <span className="text-sm md:text-base uppercase tracking-[0.4em] text-brand-accent/80 font-bold block mb-6">Feasibility</span>
              <h3 className="text-4xl md:text-5xl font-serif italic leading-tight">
                The project is feasible due to its phased approach, low-impact design, and alignment with existing institutions.
              </h3>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Institutional support", text: "Qatar Museums and government bodies already manage heritage sites and can lead implementation" },
                { title: "Low intervention strategy", text: "The project avoids heavy construction, reducing cost, risk, and approval complexity" },
                { title: "Existing site condition", text: "The village is already accessible and partially documented, allowing work to begin with minimal setup" },
                { title: "Scalable implementation", text: "Phases allow gradual development based on funding, testing, and feedback" },
                { title: "Operational viability", text: "Revenue from visitors, guided tours, and food services can support maintenance and staffing" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  {...fadeIn}
                  className={`rounded-[24px] border border-brand-accent/15 p-7 shadow-[0_20px_60px_-35px_rgba(58,46,37,0.35)] flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#fbf8f2]'
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.35em] text-brand-accent/35 font-bold mb-4">0{index + 1}</p>
                  <h4 className="text-xl font-bold tracking-tight text-brand-accent mb-3">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-brand-accent/75">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-15%" }}
            className="space-y-16"
          >
            <motion.div variants={fadeIn} className="max-w-3xl space-y-6">
              <span className="text-sm md:text-base uppercase tracking-[0.4em] text-brand-accent/80 font-bold block">Impact and Limits</span>
              <h3 className="text-4xl md:text-5xl font-serif italic leading-tight">
                The project is valuable, but it must be carefully managed.
              </h3>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {IMPACT_LIMITATIONS.map((group, index) => (
                <motion.div
                  key={group.title}
                  {...fadeIn}
                  className="rounded-[32px] bg-white p-10 md:p-12 shadow-[0_30px_80px_-20px_rgba(58,46,37,0.15)] border border-brand-accent/10 relative overflow-hidden flex flex-col group"
                >
                  <div className="absolute -top-10 -right-10 pointer-events-none opacity-[0.03] transition-opacity duration-700 group-hover:opacity-[0.06]">
                    <span className="text-[280px] leading-none font-serif italic text-brand-accent">
                      {index === 0 ? '+' : '–'}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-brand-accent/40 font-bold mb-6">
                      {index === 0 ? "Positive Outcomes" : "Project Constraints"}
                    </p>
                    <h4 className="text-4xl font-serif italic text-brand-accent mb-10">{group.title}</h4>
                    <ul className="space-y-6">
                      {group.points.map((point) => (
                        <li key={point} className="flex gap-5 text-base leading-relaxed text-brand-accent/80">
                          <span className={`mt-2.5 h-1.5 w-1.5 flex-none rounded-full ${index === 0 ? 'bg-[#D8B66A]' : 'bg-brand-accent/40'}`} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 10. STAKEHOLDERS AND NATIONAL ALIGNMENT */}
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
              <span className="text-sm md:text-base uppercase tracking-[0.4em] text-[#D8B66A]/90 font-bold block mb-6">Stakeholder Landscape</span>
              <h2 className="text-4xl md:text-6xl font-serif italic leading-tight text-white mb-8">
                A heritage ecosystem led by memory, conservation, and shared enterprise.
              </h2>
              <p className="text-lg md:text-xl font-serif leading-relaxed text-white/70 italic">
                The project depends on cooperation between community memory holders, public institutions, educators, private partners, visitors, and operational staff.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {STAKEHOLDERS.map((stakeholder, index) => (
                <motion.div
                  key={stakeholder.group}
                  variants={fadeIn}
                  className={`rounded-[28px] border p-8 md:p-10 min-h-[300px] flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                    index % 2 === 0
                      ? 'border-white/10 bg-white/[0.04]'
                      : 'border-[#D8B66A]/20 bg-[linear-gradient(160deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))]'
                  } ${index % 3 === 1 ? 'xl:-translate-y-3' : ''}`}
                >
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/25 font-bold mb-4">0{index + 1}</p>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#D8B66A]/55 font-bold mb-6">{stakeholder.role}</p>
                  <h3 className="text-3xl font-serif italic text-[#F0D28A] mb-6">{stakeholder.group}</h3>
                  <p className="text-sm md:text-base leading-relaxed text-white/60">{stakeholder.detail}</p>
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
              <span className="text-sm md:text-base uppercase tracking-[0.4em] text-[#D8B66A]/90 font-bold block mb-6">National Alignment</span>
              <h2 className="text-4xl md:text-6xl font-serif italic leading-tight text-white">
                Al Jumail directly supports Qatar's development priorities.
              </h2>
            </motion.div>

            <div className="flex flex-col border-t border-white/10 mt-8">
              {NATIONAL_ALIGNMENT.map((item, index) => (
                <motion.div
                  key={`${item.strategy}-${item.pillar}`}
                  variants={fadeIn}
                  className="group grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-6 md:gap-8 items-start py-8 md:py-10 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-500 px-6 -mx-6 sm:mx-0 sm:px-8 rounded-xl"
                >
                  <div className="flex flex-col justify-start">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/30 font-bold mb-3">Strategy</p>
                    <p className="text-2xl font-serif italic text-[#F0D28A]">{item.strategy}</p>
                  </div>
                  <div className="flex flex-col justify-start">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/30 font-bold mb-3">Pillar</p>
                    <p className="text-xl font-serif italic text-[#D8B66A]/80">{item.pillar}</p>
                  </div>
                  <div className="flex flex-col justify-start md:pt-7">
                    <p className="text-lg md:text-xl leading-relaxed text-white/65 group-hover:text-white transition-colors">{item.application}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. TIMELINE SECTION (REMOVED - INTEGRATED INTO INTRO) */}

      {/* 11. CONCLUSION */}
      <section id="conclusion" className="relative bg-white text-brand-accent py-[160px] overflow-hidden border-t border-brand-accent/5">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-15%" }}
          className="max-w-7xl mx-auto px-6"
        >
          <div className="rounded-[36px] bg-[#121110] border border-white/10 text-[#F2EDE2] p-10 md:p-14 lg:p-16 overflow-hidden relative text-center shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(216,182,106,0.08),transparent_50%)] pointer-events-none" />
            <div className="absolute left-0 top-10 bottom-10 w-[2px] bg-gradient-to-b from-transparent via-[#D8B66A]/55 to-transparent" />
            <div className="absolute right-0 top-10 bottom-10 w-[2px] bg-gradient-to-b from-transparent via-[#D8B66A]/55 to-transparent" />
            <motion.div variants={fadeIn} className="relative z-10 max-w-4xl mx-auto space-y-8">
              <span className="text-sm md:text-base uppercase tracking-[0.4em] text-[#D8B66A]/90 font-bold block">Conclusion</span>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif italic leading-tight text-[#F0D28A]">
                Tides of Time proposes a clear and feasible approach to revitalizing Al Jumail.
              </h3>
              <div className="space-y-6 text-lg md:text-xl leading-relaxed text-white/65">
                <p>
                  The project does not attempt to reconstruct the past. Instead, it protects what remains and introduces controlled, meaningful uses that allow visitors to understand the site through experience.
                </p>
                <p>
                  Its strength lies in balance: access without damage, interpretation without distortion, and use without loss of authenticity.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

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
