"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Users,
  Code,
  Wrench,
  Calendar,
  MapPin,
  ChevronRight,
  Target,
  Info,
  Sparkles,
  Zap,
  X,
  ChevronDown,
  Clock,
  Award,
  DollarSign,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import RegistrationForm from "@/components/ui/RegistrationForm";

const UpcomingEventsDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Competitions");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [detailEvent, setDetailEvent] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (detailEvent || selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [detailEvent, selectedEvent]);

//   const stats = [
//     {
//       id: 1,
//       icon: Trophy,
//       number: 20,
//       label: "Events Conducted",
//       gradient: "from-blue-500 to-purple-500",
//       delay: 0,
//     },
//     {
//       id: 2,
//       icon: Users,
//       number: 1000,
//       label: "Student Participants",
//       gradient: "from-purple-500 to-pink-500",
//       delay: 0.1,
//     },
//     {
//       id: 3,
//       icon: Code,
//       number: 50000,
//       label: "Lines of Code",
//       gradient: "from-pink-500 to-red-500",
//       delay: 0.2,
//     },
//     {
//       id: 4,
//       icon: Wrench,
//       number: 100,
//       label: "Projects Built",
//       gradient: "from-red-500 to-orange-500",
//       delay: 0.3,
//     },
//   ];

  const filters = [
    { name: "Competitions", icon: Code },
    { name: "Hackathons", icon: Trophy },
    { name: "Series", icon: Target },
    { name: "Workshops", icon: Users },
  ];

  const events = [
    {
      id: 1,
      category: "Competitions",
      date: "3rd November 2025 (Monday)",
      time: "7:00 PM – 9:00 PM",
      title: "CODEQUEST 2025",
      shortDescription: "Exciting coding contest on HackerRank with a chance to win entry to IIT Bombay TECHFEST 2025.",
      description:
        "Gear up with your coding skills for CODEQUEST 2025, an exciting coding contest hosted on HackerRank.",
      techStack: ["C++ Only"],
      registrations: "Seats are limited",
      registrationDeadline: "2nd November 2025, 11:59 PM",
      location: "HackerRank",
      venue: "AB1 – LR1",
      difficulty: "Advanced",
      participants: "150+",
      prizes: ["Top 5 get entry to IIT Bombay TECHFEST 2025"],
      organizer: "IEEE RGIPT SB",
      highlights: [
        "Host platform: HackerRank",
        "Language: C++ only",
        "Duration: 2 hours",
        "Limited seats - register early",
      ],
      requirements: [
        "Strong C++ programming skills",
        "Problem-solving experience",
        "HackerRank account",
        "Laptop with internet connection",
      ],
      agenda: [
        { time: "6:45 PM", activity: "Registration & Setup" },
        { time: "7:00 PM", activity: "Contest Begins" },
        { time: "9:00 PM", activity: "Contest Ends" },
        { time: "9:15 PM", activity: "Results Announcement" },
      ],
    },
    {
      id: 2,
      category: "Hackathons",
      date: "12th–13th November 2025",
      time: "6:00 PM – 6:00 AM (12 hours)",
      title: "Hack RGIPT 2025",
      shortDescription: "24-hour coding hackathon under Urjotsav to inspire innovation and teamwork with exciting prizes.",
      description:
        "Hack RGIPT 2025 – organized under Urjotsav (UrjaSangam), in collaboration with IEEE RGIPT SB and KODE Club. A coding hackathon to inspire innovation, teamwork, and problem-solving.",
      techStack: [
        "Round 1: Online (Nov 1–7)",
        "Round 2: Offline Finale",
        "Open Frameworks",
        "AI Tools Allowed",
      ],
      registrations: "Team registration required",
      registrationDeadline: "31st October 2025, 11:59 PM",
      location: "RGIPT Campus (Finale)",
      venue: "To be announced",
      difficulty: "Intermediate",
      participants: "200+",
      teamSize: "4 members per team",
      prizes: ["1st: ₹8,000", "2nd: ₹6,000", "3rd: ₹4,000"],
      organizer: "IEEE RGIPT SB & KODE Club",
      highlights: [
        "Two-round competition format",
        "Use any framework or language",
        "AI tools permitted",
        "12-hour overnight finale",
      ],
      requirements: [
        "Team of 4 members",
        "1 team leader for submissions",
        "Original project work only",
        "No pre-built templates",
      ],
      agenda: [
        { time: "Round 1", activity: "Online Phase (Nov 1-7)" },
        { time: "6:00 PM Nov 12", activity: "Offline Finale Begins" },
        { time: "6:00 AM Nov 13", activity: "Submission Deadline" },
        { time: "Morning", activity: "Judging & Results" },
      ],
    },
  ];

  const filteredEvents = events.filter(
    (event) => event.category === activeFilter
  );

  const toggleCardExpansion = (eventId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  // Animated Counter Component
  const AnimatedCounter = ({ target, duration = 2 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = target / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }, [target, duration]);

    return (
      <span>
        {count >= 1000 ? `${(count / 1000).toFixed(0)}K` : count}+
      </span>
    );
  };

  // Particle effect component
  const Particles = () => {
    const particles = Array.from({ length: 30 });
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  };

  // Structured Event Details Modal Component
  const EventDetailsModal = ({ event, onClose }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4"
        onClick={onClose}
      >
        {/* Mobile: Bottom Sheet, Desktop: Center Modal */}
        <motion.div
          ref={modalRef}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full md:max-w-4xl md:rounded-3xl rounded-t-3xl max-h-[80vh] overflow-hidden flex flex-col relative shadow-2xl border-t-4 border-purple-500 md:border-t-0 md:border md:border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-b border-gray-700/50 p-6 md:p-8">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-white transition-colors bg-gray-800/80 rounded-full p-2 backdrop-blur-sm border border-gray-700 hover:border-gray-600"
            >
              <X size={20} />
            </motion.button>

            <div className="pr-12">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-3"
              >
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  event.difficulty === "Advanced"
                    ? "bg-red-500/20 text-red-400 border border-red-500/50"
                    : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                }`}>
                  {event.difficulty}
                </span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-400 text-sm">{event.participants} Expected</span>
              </motion.div>

              <motion.h2
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2"
              >
                {event.title}
              </motion.h2>

              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 text-sm md:text-base"
              >
                {event.shortDescription}
              </motion.p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-6 md:p-8 space-y-6">
              {/* Quick Info Cards */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
              >
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-4 backdrop-blur-sm">
                  <Calendar className="w-5 h-5 text-blue-400 mb-2" />
                  <p className="text-xs text-gray-400 mb-1">Date</p>
                  <p className="text-sm font-semibold text-white">{event.date}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-4 backdrop-blur-sm">
                  <Clock className="w-5 h-5 text-purple-400 mb-2" />
                  <p className="text-xs text-gray-400 mb-1">Time</p>
                  <p className="text-sm font-semibold text-white">{event.time}</p>
                </div>

                <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 border border-pink-500/30 rounded-xl p-4 backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-pink-400 mb-2" />
                  <p className="text-xs text-gray-400 mb-1">Platform</p>
                  <p className="text-sm font-semibold text-white">{event.location}</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl p-4 backdrop-blur-sm">
                  <Users className="w-5 h-5 text-orange-400 mb-2" />
                  <p className="text-xs text-gray-400 mb-1">Team Size</p>
                  <p className="text-sm font-semibold text-white">{event.teamSize || "Individual"}</p>
                </div>
              </motion.div>

              {/* Organizer */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <h3 className="text-sm font-semibold text-white">Organized By</h3>
                </div>
                <p className="text-gray-300">{event.organizer}</p>
              </motion.div>

              {/* Prizes */}
              {event.prizes && event.prizes.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-bold text-white">Prizes & Rewards</h3>
                  </div>
                  <div className="space-y-2">
                    {event.prizes.map((prize, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-200">{prize}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Highlights */}
              {event.highlights && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-bold text-white">Event Highlights</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {event.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Zap className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-300 text-sm">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Requirements */}
              {event.requirements && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-orange-400" />
                    <h3 className="text-lg font-bold text-white">Requirements</h3>
                  </div>
                  <ul className="space-y-2">
                    {event.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                        <p className="text-gray-300 text-sm">{req}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Tech Stack */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold text-white">Tech Stack & Rules</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {event.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 text-green-300 text-sm rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Agenda/Timeline */}
              {event.agenda && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Event Timeline</h3>
                  </div>
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-cyan-400 border-4 border-gray-800" />
                          {index < event.agenda.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-700 mt-1" />
                          )}
                        </div>
                        <div className="pb-4 flex-1">
                          <p className="text-cyan-400 font-semibold text-sm mb-1">
                            {item.time}
                          </p>
                          <p className="text-gray-300">{item.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Registration Deadline */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-500/50 rounded-xl p-5 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      Registration Deadline
                    </h3>
                    <p className="text-red-300 font-semibold">
                      {event.registrationDeadline}
                    </p>
                    <p className="text-gray-300 text-sm mt-2">
                      {event.registrations}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Fixed Bottom CTA */}
          <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent border-t border-gray-700/50 p-4 md:p-6 backdrop-blur-xl">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onClose();
                setSelectedEvent(event);
              }}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center group"
            >
              Register Now
              <ChevronRight
                size={24}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <Particles />
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4 md:mb-6"
          >
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-yellow-400 animate-spin-slow" />
          </motion.div>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white"
            >
              Upcoming{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x"
            >
              Events
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4"
          >
            Join our technical events and showcase your skills
          </motion.p>
        </motion.div>

        

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-4"
        >
          {filters.map((filter, index) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.name;
            return (
              <motion.button
                key={filter.name}
                onClick={() => setActiveFilter(filter.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className={`group relative flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full border transition-all duration-300 text-sm md:text-base ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-lg shadow-purple-500/50"
                    : "bg-gray-900/50 backdrop-blur-sm border-gray-700/50 text-gray-300 hover:bg-gray-800/50 hover:border-gray-600"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center">
                  <motion.div
                    animate={{ rotate: isActive ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon size={16} className="mr-2" />
                  </motion.div>
                  {filter.name}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-20"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredCard(event.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"
                  animate={{
                    opacity: hoveredCard === event.id ? 0.5 : 0,
                  }}
                />

                <div className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 md:p-6 hover:border-gray-600 transition-all h-full flex flex-col">
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 right-4">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.difficulty === "Advanced"
                          ? "bg-red-500/20 text-red-400 border border-red-500/50"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                      }`}
                    >
                      {event.difficulty}
                    </motion.span>
                  </div>

                  <motion.div
                    className="text-blue-400 flex items-center mb-3 text-xs md:text-sm"
                    whileHover={{ x: 5 }}
                  >
                    <Calendar size={14} className="mr-2 flex-shrink-0" />
                    <span className="line-clamp-1">{event.date}</span>
                  </motion.div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-gray-300 mb-4 flex-grow text-sm leading-relaxed line-clamp-3">
                    {event.description}
                  </p>

                  {/* Quick Preview - Expandable on Mobile */}
                  <AnimatePresence>
                    {expandedCards[event.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-4"
                      >
                        <div className="bg-gray-800/50 rounded-lg p-3 space-y-2 text-xs">
                          <div className="flex items-start gap-2">
                            <Clock className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{event.time}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3 h-3 text-pink-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{event.venue || event.location}</span>
                          </div>
                          {event.teamSize && (
                            <div className="flex items-start gap-2">
                              <Users className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{event.teamSize}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.techStack.slice(0, 3).map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        className="px-2 md:px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 text-xs rounded-full border border-gray-600/50 hover:border-gray-500 transition-all"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {event.techStack.length > 3 && (
                      <span className="px-2 md:px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">
                        +{event.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2 mb-4">
                    <motion.div
                      className="text-xs md:text-sm text-gray-400 flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <Zap size={14} className="mr-2 text-yellow-400 flex-shrink-0" />
                      <span className="line-clamp-1">{event.registrations}</span>
                    </motion.div>
                    <motion.div
                      className="text-xs md:text-sm text-green-400 flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <Users size={14} className="mr-2 flex-shrink-0" />
                      {event.participants} Expected
                    </motion.div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 md:gap-3 mt-auto">
                    {/* Mobile: Quick Expand Button */}
                    <button
                      onClick={() => toggleCardExpansion(event.id)}
                      className="md:hidden w-full bg-gray-800/80 backdrop-blur-sm text-gray-200 py-2 rounded-xl hover:bg-gray-700 transition-all flex items-center justify-center border border-gray-700/50"
                    >
                      <ChevronDown
                        size={16}
                        className={`mr-2 transition-transform ${
                          expandedCards[event.id] ? "rotate-180" : ""
                        }`}
                      />
                      Quick Info
                    </button>

                    {/* Full Details Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setDetailEvent(event)}
                      className="w-full bg-gray-800/80 backdrop-blur-sm text-gray-200 py-2 md:py-2.5 rounded-xl hover:bg-gray-700 transition-all flex items-center justify-center group/btn border border-gray-700/50 hover:border-gray-600 text-sm md:text-base"
                    >
                      <Info size={16} className="mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Full Details
                    </motion.button>

                    {/* Register Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedEvent(event)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 md:py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center group/btn font-semibold text-sm md:text-base"
                    >
                      Register Now
                      <ChevronRight
                        size={18}
                        className="ml-2 group-hover/btn:translate-x-1 transition-transform"
                      />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Registration Form Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-0 md:p-4"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="bg-gray-900 backdrop-blur-xl border-t-4 md:border-t-0 md:border border-gray-700 border-t-purple-500 rounded-t-3xl md:rounded-2xl max-w-lg w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-gray-800 rounded-full p-2"
                >
                  <X size={20} />
                </motion.button>
                <RegistrationForm eventTitle={selectedEvent.title} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event Details Modal */}
        <AnimatePresence>
          {detailEvent && (
            <EventDetailsModal
              event={detailEvent}
              onClose={() => setDetailEvent(null)}
            />
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default UpcomingEventsDetails;