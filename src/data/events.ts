export type FestivalDay = 1 | 2 | 3;
export type EventVisual = 'code' | 'chip' | 'terminal' | 'paper' | 'shield' | 'cad' | 'auction' | 'race' | 'bridge' | 'boat' | 'blocks' | 'quest' | 'mystery' | 'plane' | 'bug' | 'forge' | 'synapse' | 'cyber';
export type EventType = 'hackoutr' | 'hackathon-software' | 'hackathon-hardware' | 'flagship' | 'fun' | 'workshop';
export type CategoryFilter = 'all' | 'hackoutr' | 'hackathon-software' | 'hackathon-hardware' | 'flagship' | 'fun' | 'workshop';

export interface EventCoordinator {
  name: string;
  phone?: string;
}

export interface FestivalEvent {
  id: string;
  name: string;
  eventType: EventType;
  category?: string;
  visual: EventVisual;
  description: string;
  overview: string;
  rules: string[];
  rulesConfirmed: boolean;
  format: string | null;
  teamSize: string | null;
  fee: string | null;

  schedule: {
    days: FestivalDay[];
    time: string | null;
    venue: string | null;
  };
  registrationUrl: string | null;
  featured?: boolean;
  sessions?: string[];
  duration?: string | null;
  prerequisites?: string | null;
  organizerExperience?: string | null;
  coordinators?: EventCoordinator[];
  requirements?: string | null;
}

const pendingDetails = {
  rules: [],
  rulesConfirmed: false,
  format: 'TBA',
  teamSize: 'TBA',
  fee: 'TBA',

  schedule: { days: [], time: 'TBA', venue: 'TBA' },
  registrationUrl: null,
};

export const competitions: FestivalEvent[] = [
  {
    ...pendingDetails,
    id: 'hackoutr-software',
    name: 'HackOUTR Software Edition',
    eventType: 'hackoutr',
    visual: 'code',
    featured: true,
    description: 'The 48-Hour Software Hackathon is an intensive innovation marathon featuring diverse problem statements, challenging participants to transform real-world challenges into practical, impactful software solutions.',
    overview: 'The 48-Hour Software Hackathon is an intensive innovation marathon featuring diverse problem statements, challenging participants to transform real-world challenges into practical, impactful software solutions. Software track of HackOUTR continuing from 04-Nov-2026 to 06-Nov-2026.',
    format: '48-Hour Hackathon',
    teamSize: 'TBA',
    fee: 'TBA',
    requirements: 'TBA',
    schedule: { days: [1, 2, 3], time: '2:00 PM – 2:00 PM', venue: 'TBA' },
    registrationUrl: 'https://forms.gle/78SZ3jqoGyHB55ZNA',
    coordinators: [
      { name: 'Sailen Sahoo', phone: '9769544049' },
      { name: 'Ashutosh Badapanda', phone: '9439447099' },
      { name: 'Aryan Nayak', phone: '8763907855' },
    ],
  },
  {
    ...pendingDetails,
    id: 'hackoutr-hardware',
    name: 'HackOUTR Hardware Edition',
    eventType: 'hackoutr',
    visual: 'chip',
    featured: true,
    description: 'Connect circuits, code, and physical prototyping to engineer real-world hardware solutions.',
    overview: 'The hardware edition of HackOUTR — explore physical prototyping, circuits, and embedded systems through an intense multi-day challenge. Hardware problem statements, lab access, and testing benches.',
    format: 'Hardware Hackathon',
    teamSize: 'TBA',
    fee: 'TBA',
    requirements: 'TBA',
    schedule: { days: [1, 2, 3], time: 'TBA', venue: 'TBA' },
    registrationUrl: 'https://forms.gle/78SZ3jqoGyHB55ZNA',
    coordinators: [
      { name: 'Swastik Sahoo', phone: '7978586882' },
      { name: 'Soma sekhar sabat', phone: '7978142377' },
      { name: 'Devidutta Mishra', phone: '7978343148' },
    ],
  },
  {
    ...pendingDetails,
    id: 'cp-rush',
    name: 'CP Rush (Competitive Programming)',
    eventType: 'flagship',
    visual: 'terminal',
    description: 'An intense logic showdown testing speed, efficiency, and problem-solving precision. Competitors tackle complex coding challenges within strict time limits, optimizing algorithms and data structures to dominate the leaderboard and crack the code.',
    overview: 'An intense logic showdown testing speed, efficiency, and problem-solving precision. Competitors tackle complex coding challenges within strict time limits, optimizing algorithms and data structures to dominate the leaderboard and crack the code.',
    format: 'Speed Algorithmic Contest',
    teamSize: 'Individual',
    fee: 'TBA',
    requirements: 'TBA',
    schedule: { days: [1], time: '10:00 AM – 11:30 AM', venue: 'TBA' },
    registrationUrl: 'https://forms.gle/XcY3XJQ6Nzk2Grtd7',
    coordinators: [
      { name: 'Jatindra Saiprasanna Behera', phone: '7978536201' },
      { name: 'BidhuBhusan Patra', phone: '7381871138' },
    ],
  },
  {
    ...pendingDetails,
    id: 'ctf',
    name: 'Hack CTF',
    eventType: 'flagship',
    visual: 'shield',
    featured: true,
    description: 'Step into the ultimate cybersecurity proving ground: hunt down vulnerabilities, extract hidden flags, and compete on the live scoreboard.',
    overview: 'Welcome to the HackFest Capture the Flag (CTF). Step into the ultimate cybersecurity proving ground at HackFest. Whether you are typing your first Linux command or you are a seasoned penetration tester, this Jeopardy-style hacking competition is built for you. Hunt down vulnerabilities, extract hidden flags, and watch the live scoreboard shift in real time. For beginners, guided entry-level challenges in web exploitation and OSINT with floor mentors. For veterans, dynamic scoring, multi-stage exploitation chains, and a specialized physical hardware station with an injection attack on a web-based simulated reactor control system integrated with an Arduino. First team to crack this claims the First Blood bounty!',
    fee: '₹150 per team / ₹80 individual',
    teamSize: '2 to 4 members or solo',
    format: 'Jeopardy-Style CTF (Web Exploitation, Linux, Forensics, OSINT, Hardware/IoT)',
    requirements: 'Fast and stable internet connection',
    schedule: { days: [1], time: 'TBA', venue: 'TBA' },
    registrationUrl: 'https://forms.gle/JRdfq9PpNsazcaGe7',
    coordinators: [
      { name: 'Anuraag Mahapatra', phone: '6371639540' },
      { name: 'Kaushik Sial', phone: '70083 58728' },
      { name: 'Soumya Priyadarshi Nayak', phone: '82490 70130' },
    ],
  },
  {
    ...pendingDetails,
    id: 'technical-paper',
    name: 'Technical Paper Presentation',
    eventType: 'flagship',
    visual: 'paper',
    description: 'Present your innovative ideas and technical research on emerging technologies such as AI, Smart Textiles, Robotics, IoT, Sustainable Technology, Advanced Materials, and more.',
    overview: 'Present your innovative ideas and technical research on emerging technologies such as AI, Smart Textiles, Robotics, IoT, Sustainable Technology, Advanced Materials, and more. Participate individually or in a team of two, showcase your technical knowledge, and share your solutions with a wider audience. Time Allotted: 10 minutes in total — 8 minutes for the presentation and 2 minutes for the Question-and-Answer (Q&A) session. Prizes and Certificates of Merit will be awarded based on your performance.',
    fee: 'TBA',
    teamSize: 'Individual or Team of 2',
    format: '10 Mins (8 mins presentation + 2 mins Q&A)',
    requirements: 'TBA',
    schedule: { days: [2], time: '10:00 AM Onwards', venue: 'TBA' },
    registrationUrl: 'https://forms.gle/YwG4c7UCtdPvZszM9',
    coordinators: [
      { name: 'Sai Imanika Parida', phone: '9776156556' },
      { name: 'Sriharsa Samantray', phone: '93486 18807' },
      { name: 'Sashikant Sahoo', phone: '8144722862' },
    ],
  },
  {
    ...pendingDetails,
    id: 'cad',
    name: 'Clash of CAD (CADathon)',
    eventType: 'flagship',
    visual: 'cad',
    description: 'CLASH OF CAD(CADathon) is a team-based technical competition focused on AutoCAD, engineering drawing, and technical visualization across two competitive rounds.',
    overview: "CLASH OF CAD(CADathon) is a team-based technical competition focused on AutoCAD, engineering drawing, and technical visualization. The event consists of two rounds that test participants' theoretical knowledge and practical drafting skills. The first round features an objective-type quiz test on CAD fundamentals, dimensioning, and engineering drawing principles. Qualified teams advance to the final round, where they create a technical drawing using AutoCAD based on a given isometric view or reference drawing. Participants will be evaluated based on accuracy, dimensioning, presentation, and time management.",
    fee: 'TBA',
    format: 'Round 1: CAD Fundamentals Quiz · Round 2: AutoCAD Technical Drawing',
    teamSize: 'TBA',
    requirements: 'TBA',
    schedule: { days: [2], time: '11:00 AM – 1:00 PM', venue: 'TBA' },
    registrationUrl: 'https://forms.gle/gkxvDRDUEZvBFFeBA',
    coordinators: [
      { name: 'Sidharth Parida', phone: '8144861901' },
      { name: 'Devajyoti Pattnaik', phone: '9556649305' },
      { name: 'Akanksha Dash', phone: '9556887145' },
    ],
  },
  {
    ...pendingDetails,
    id: 'auto-forge',
    name: 'Auto Forge',
    eventType: 'flagship',
    visual: 'forge',
    description: 'Teams tackle technical quizzes, race against the clock in 3D CAD modeling, and build physical models from their designs.',
    overview: 'Teams tackle technical quizzes, race against the clock in 3D CAD modeling, and build physical models from their designs. An automotive engineering challenge organized by SAE.',
    fee: 'TBA',
    format: 'Technical Quiz + 3D CAD Modeling + Physical Model Assembly',
    requirements: 'Smart room with sitting capacity of 40',
    schedule: { days: [3], time: '10:00 AM – 1:00 PM', venue: 'Smart room with sitting capacity of 40' },
    registrationUrl: 'https://docs.google.com/forms/d/1x2WNF7saddVfG_8eE4sWCQirHly5Vqce7qJkD8rr7Os/viewform',
    coordinators: [
      { name: 'RAHUL JYOTISH', phone: '8249791274' },
      { name: 'RITESH KUMAR', phone: '9348573812' },
      { name: 'AYUSH KUMAR LENKA', phone: '78150 17687' },
    ],
  },
];

export const funEvents: FestivalEvent[] = [
  {
    ...pendingDetails,
    id: 'ipl-auction',
    name: 'IPL Auction',
    eventType: 'fun',
    visual: 'auction',
    description: 'Think like a franchise. Balance your picks and build your dream cricket squad.',
    overview: 'A cricket auction strategy event. The player pool, budget, squad constraints, auction process, and scoring format will test your managerial intellect. Manage your purse and assemble your championship squad.',
    fee: 'TBA',
    format: 'IPL Player Auction & Purse Strategy',
    teamSize: 'TBA',
    requirements: 'TBA',
    schedule: { days: [1], time: '5:00 PM – 8:00 PM', venue: 'TBA' },
    registrationUrl: 'https://forms.gle/UAu4hZmJGiD6uZvh8',
    coordinators: [
      { name: 'SHREYANS DAS', phone: '+91 91145 31935' },
    ],
  },
  {
    ...pendingDetails,
    id: 'minecraft',
    name: 'Minecraft Competition',
    eventType: 'fun',
    visual: 'blocks',
    description: 'MINECRAFT is an individual gaming event in which each participant takes part in a gameplay challenge selected and provided by the organizers.',
    overview: 'MINECRAFT is an individual gaming event in which each participant takes part in a gameplay challenge selected and provided by the organizers. Participants compete independently and aim to complete the assigned objective or achieve the best in-game result within the announced rules and time limit.',
    fee: 'TBA',
    format: 'Individual gameplay challenge',
    teamSize: 'Individual',
    requirements: 'TBA',
    schedule: { days: [1], time: '2:00 PM – 4:00 PM', venue: 'D-403 (CIVICON ROOM)' },
    registrationUrl: null,
    coordinators: [
      { name: 'Ansuman Nayak', phone: '9337232047' },
      { name: 'Himanshu Sekhar Pradhan', phone: '7749032932' },
      { name: 'Swastik Garnayak', phone: '9348326322' },
    ],
  },
  {
    ...pendingDetails,
    id: 'atv-racing',
    name: 'ATV Crackdown',
    eventType: 'fun',
    visual: 'race',
    description: 'ATV CRACKDOWN is a hands-on motorsport challenge. After a step-by-step assembly demonstration, build your own ATV or Go-Kart and compete for the fastest lap time.',
    overview: 'ATV CRACKDOWN is a hands-on motorsport challenge. After a step-by-step assembly demonstration by our technical team, each group must build their own ATV or Go-Kart. Following a mandatory safety inspection, teams hit the track to drive and compete for the fastest lap time.',
    format: 'Assembly Demonstration + Vehicle Build + Timed Track Lap',
    fee: 'TBA',
    teamSize: 'TBA',
    requirements: 'TBA',
    schedule: { days: [2, 3], time: '1:00 PM – 5:00 PM', venue: 'OMFED AREA' },
    registrationUrl: null,
    coordinators: [
      { name: 'RAHUL JYOTISH', phone: '8249791274' },
      { name: 'SOUBHAGYA CHANDRA PRADHAN', phone: '7735544677' },
      { name: 'ANSUMAN', phone: '8260760191' },
    ],
  },
  {
    ...pendingDetails,
    id: 'bug-hunting',
    name: 'Bug Hunting',
    eventType: 'fun',
    visual: 'bug',
    description: 'Software glitches meet hardware faults in this fast-paced tag-team showdown. Grab a partner, beat the clock, and bring a broken system back to life.',
    overview: 'Welcome to Bug Hunting, where software-meets-hardware tag-team showdown! Software glitches meet hardware faults in this fast-paced competition. Grab a partner, beat the clock, and prove you have what it takes to bring a broken system back to life. No heavy coding experience required—just sharp eyes, quick thinking, and a competitive spirit! Grand Prize: ₹500 Cash.',
    fee: '₹150 per team / ₹80 individual',
    teamSize: 'Individual or team of max 3',
    format: 'Software glitch and hardware fault resolution against the clock',
    requirements: 'TBA',
    schedule: { days: [2], time: '3:00 PM – 5:00 PM', venue: 'TBA' },
    registrationUrl: 'https://forms.gle/YeY7epeQ4dcQVf6Q6',
    coordinators: [
      { name: 'Sai Imanika Parida', phone: '9776156556' },
      { name: 'Anuraag Mahapatra', phone: '63716 39540' },
      { name: 'Sailaja Sahoo', phone: '77520 42592' },
    ],
  },
  {
    ...pendingDetails,
    id: 'hanging-highway',
    name: 'Hanging Highway – Bridge Making',
    eventType: 'fun',
    visual: 'bridge',
    description: 'HANGING HIGHWAY is an exciting, team-based event that challenges participants to design and construct a scale model of a cable-stayed bridge using the materials provided.',
    overview: 'HANGING HIGHWAY is an exciting, team-based event that challenges participants to design and construct a scale model of a cable-stayed bridge using the materials provided. The event focuses on the fundamental principles of structural mechanics, tension, load distribution, stability, and material efficiency. Participants must build a structurally sound and aesthetically appealing bridge capable of withstanding specified load tests while maintaining stability. The competition encourages innovative design thinking, teamwork and problem-solving skills.',
    fee: 'TBA',
    format: 'Scale Cable-Stayed Bridge Design & Load Testing',
    teamSize: 'TBA',
    requirements: 'TBA',
    schedule: { days: [3], time: '2:00 PM – 5:00 PM', venue: 'TBA' },
    registrationUrl: 'https://forms.gle/LsAx3WLg6oh86Qci6',
    coordinators: [
      { name: 'Rituparna Mishra', phone: '7008014442' },
      { name: 'Sambit Kumar Pedi', phone: '8456856261' },
      { name: 'Pritika Parija', phone: '7815047506' },
    ],
  },
  {
    ...pendingDetails,
    id: 'boat-building',
    name: 'Hydro Build (Boat Building)',
    eventType: 'fun',
    visual: 'boat',
    description: 'Think you can build a boat that floats and sails? Put your creativity and teamwork to the test in HYDRO BUILD, an exciting inter-college boat-building competition!',
    overview: 'Think you can build a boat that floats and sails? Put your creativity and teamwork to the test in HYDRO BUILD, an exciting inter-college boat-building competition! Design and construct a scale boat model evaluated on structural balance, material efficiency, and hydrodynamic buoyancy testing.',
    fee: 'TBA',
    format: 'Scale Boat Design & Buoyancy Testing',
    teamSize: 'TBA',
    requirements: 'TBA',
    schedule: { days: [3], time: '2:00 PM – 5:00 PM', venue: 'TBA' },
    registrationUrl: 'https://forms.gle/WxiaxMPezQStUrkc8',
    coordinators: [
      { name: 'Smruti Sravani Das kanungo', phone: '9348633664' },
      { name: 'Archita Mishra', phone: '8917536418' },
    ],
  },
  {
    ...pendingDetails,
    id: 'synapse',
    name: 'Synapse: The Killer Code',
    eventType: 'fun',
    visual: 'synapse',
    description: 'SYNAPSE: The Killer Code - An interactive murder mystery event where participants step into the role of investigators to solve a mysterious death.',
    overview: 'SYNAPSE: The Killer Code - It is an interactive murder mystery event where participants step into the role of investigators to solve a mysterious death. Work in teams, uncover hidden clues, decode puzzles, and connect evidence across the venue to identify the culprit. With secrets, deceptive alibis, and a ticking clock, every decision counts. Can you crack the case before time runs out?',
    fee: 'TBA',
    format: 'Interactive Murder Mystery Investigation',
    teamSize: 'TBA',
    requirements: 'A4 Sheet',
    schedule: { days: [3], time: '3:00 PM – 5:00 PM', venue: 'TBA' },
    registrationUrl: null,
    coordinators: [
      { name: 'Adya Archita Pattnaik', phone: '7978782060' },
      { name: 'Soyal Parija', phone: '7848941344' },
      { name: 'Subhashish Hota', phone: '9124700672' },
    ],
  },
];

export const workshops: FestivalEvent[] = [
  {
    ...pendingDetails,
    id: 'rc-plane',
    name: 'RC-Plane Workshop',
    eventType: 'workshop',
    visual: 'plane',
    description: 'From lift to landing: explore the fundamentals of designing, building, and flying RC aircraft.',
    overview: 'A practical introduction to aircraft design, aerodynamics, and flight control. Explore how RC aircraft components work together, learn the assembly process, and observe flight demonstrations.',
    sessions: [
      'Aircraft design and aerodynamic fundamentals',
      'RC components: airframe, propulsion, radio, and flight controls',
      'Assembly walkthrough and control setup',
      'Flight demonstrations and discussion',
    ],
    fee: 'Free (Open to All)',
    format: 'Open to All · No Registration Needed',
    duration: 'TBA',
    prerequisites: 'TBA',
    requirements: 'TBA',
    schedule: { days: [1], time: 'TBA', venue: 'TBA' },
    registrationUrl: null,
    coordinators: [{ name: 'Swadesh Raul', phone: '7325868950' }],
  },
  {
    ...pendingDetails,
    id: 'arduino',
    name: 'Arduino + ESP32 Workshop',
    eventType: 'workshop',
    visual: 'chip',
    description: 'Start with a circuit. Add a few lines of code. Make your first interactive embedded project.',
    overview: 'Get introduced to Arduino and ESP32 through basic electronics, sensors, and actuators. Build circuits, write programs, and explore practical embedded projects.',
    sessions: [
      'Arduino and ESP32 microcontroller fundamentals',
      'Basic electronics, sensors, and actuators',
      'Hands-on circuit building and programming',
      'Simple practical projects and troubleshooting',
    ],
    fee: 'Free (Open to All)',
    format: 'Open to All · No Registration Needed',
    duration: '3 Hours',
    prerequisites: 'TBA',
    requirements: 'TBA',
    schedule: { days: [2], time: '2:00 PM – 5:00 PM', venue: 'TBA' },
    registrationUrl: null,
    coordinators: [
      { name: 'Devidutta Mishra', phone: '7978343148' },
    ],
  },
  {
    ...pendingDetails,
    id: 'cybersecurity',
    name: 'CyberSecurity Workshop',
    eventType: 'workshop',
    visual: 'cyber',
    description: 'HackFest Cyber Crash Course: Deconstructing the Hacks. A rapid-fire offensive security workshop.',
    overview: 'HackFest Cyber Crash Course: Deconstructing the Hacks. Watched the live CTF scoreboard on Day 1 and wondered how the top teams pulled off their exploits? Join us on Day 3 for a rapid-fire, one-hour workshop that pulls back the curtain on offensive security. Whether you participated in the CTF or just want to see how real hackers operate, this session breaks down the magic into easy-to-understand concepts.',
    sessions: [
      'CTF Walkthrough: Step-by-step breakdown of Day 1 Web Exploitation and OSINT challenges',
      "The Attacker's Toolkit: Inspecting web traffic, manipulating requests, and finding vulnerabilities",
      'Next Steps: Practical guidance into cybersecurity, ethical hacking, and bug bounty hunting',
    ],
    fee: 'Free (Open to All)',
    format: 'Open to All · No Registration Needed',
    duration: '1 Hour',
    prerequisites: 'TBA',
    requirements: 'Laptop',
    schedule: { days: [3], time: 'TBA', venue: 'TBA' },
    registrationUrl: null,
    coordinators: [
      { name: 'Anuraag Mahapatra', phone: '6371639540' },
    ],
  },
];

/** All events in display order: HackOUTR hackathons first, then flagship, fun, workshops. */
export const allEvents: FestivalEvent[] = [
  ...competitions,
  ...funEvents,
  ...workshops,
];

export function filterEventsByDay(events: FestivalEvent[], day: FestivalDay | 'all') {
  return day === 'all' ? events : events.filter(event => event.schedule.days.includes(day));
}

/** Filter events by category for the unified event hub. */
export function filterByCategory(events: FestivalEvent[], filter: CategoryFilter): FestivalEvent[] {
  if (filter === 'all') return events;
  if (filter === 'hackoutr') {
    return events.filter(e => e.eventType === 'hackoutr' || e.eventType === 'hackathon-software' || e.eventType === 'hackathon-hardware' || e.id.includes('hackoutr') || e.name.toLowerCase().includes('hackoutr'));
  }
  return events.filter(e => e.eventType === filter);
}

/** Only confirmed HTTPS Google Forms / Unstop destinations become active links. */
export function registrationHref(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    const isGoogleForm = url.hostname === 'forms.gle' ||
      (url.hostname === 'docs.google.com' && url.pathname.startsWith('/forms/')) ||
      (url.hostname === 'forms.google.com');
    const isUnstop = url.hostname === 'unstop.com' || url.hostname === 'www.unstop.com';
    return isGoogleForm || isUnstop ? url.href : null;
  } catch {
    return null;
  }
}
