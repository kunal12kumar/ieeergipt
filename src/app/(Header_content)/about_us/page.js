"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Icon components
const MissionIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const VisionIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const InnovationIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const CollaborationIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ExcellenceIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const LeadershipIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const TrophyIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const values = [
    {
      icon: InnovationIcon,
      title: "Innovation",
      description: "Fostering creative thinking and cutting-edge solutions to real-world challenges.",
    },
    {
      icon: CollaborationIcon,
      title: "Collaboration",
      description: "Building a strong community through teamwork and knowledge sharing.",
    },
    {
      icon: ExcellenceIcon,
      title: "Excellence",
      description: "Striving for the highest standards in all our technical and professional endeavors.",
    },
    {
      icon: LeadershipIcon,
      title: "Leadership",
      description: "Developing future leaders who will shape the technology landscape.",
    },
  ];

  const stats = [
    { number: "500+", label: "Active Members" },
    { number: "50+", label: "Events Organized" },
    { number: "100+", label: "Workshops Conducted" },
    { number: "25+", label: "Technical Projects" },
  ];

  const achievements = [
    {
      year: "2025",
      title: "National Level Hackathon Winner",
      description: "Our team secured first place in the national hackathon competition.",
    },
    {
      year: "2024",
      title: "Best Student Branch Award",
      description: "Recognized as the best IEEE student branch in the region.",
    },
    {
      year: "2022",
      title: "Research Publication",
      description: "Published 15+ research papers in international conferences.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
          >
            About IEEE RGIPT
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Empowering students to innovate, collaborate, and excel in the ever-evolving world of technology.
          </motion.p>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 hover:border-purple-400 transition-all duration-300 shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-4 mr-4">
                  <MissionIcon className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To provide a platform for students to explore, innovate, and excel in the field of technology.
                We aim to bridge the gap between academic learning and industry requirements by organizing
                technical workshops, seminars, and hands-on projects that enhance both theoretical knowledge
                and practical skills.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-pink-900/40 to-slate-900/40 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-8 hover:border-pink-400 transition-all duration-300 shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-full p-4 mr-4">
                  <VisionIcon className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To be the leading student branch that cultivates technological excellence and professional
                development. We envision a future where our members become industry leaders, innovators, and
                change-makers who contribute significantly to advancing technology for humanity.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About IEEE Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What is IEEE?</h2>
            <div className="max-w-4xl mx-auto space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                <span className="font-bold text-purple-400">IEEE (Institute of Electrical and Electronics Engineers)</span> is
                the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.
              </p>
              <p>
                With more than 420,000 members in over 160 countries, IEEE is a leading authority on areas ranging from
                aerospace systems, computers, and telecommunications to biomedical engineering, electric power, and consumer electronics.
              </p>
              <p>
                The <span className="font-bold text-pink-400">IEEE RGIPT Student Branch</span> is a dynamic community of passionate
                students at Rajiv Gandhi Institute of Petroleum Technology, working together to promote technological innovation,
                foster professional development, and create opportunities for learning and growth.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do at IEEE RGIPT
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-gradient-to-br from-purple-900/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900/50 to-purple-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-300">Making a difference through technology and innovation</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 hover:border-purple-400 transition-all duration-300 shadow-xl">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Achievements Timeline */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-300">Milestones that define our journey</p>
          </motion.div>

          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-6 group"
              >
                {/* Year Badge */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full w-20 h-20 flex items-center justify-center font-bold text-lg shadow-lg">
                    {achievement.year}
                  </div>
                  {index !== achievements.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-purple-500 to-transparent mt-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 bg-gradient-to-br from-purple-900/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-purple-400 transition-all duration-300 group-hover:translate-x-2 shadow-lg">
                  <div className="flex items-start gap-3">
                    <TrophyIcon className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                      <p className="text-gray-300">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* What We Do Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-slate-900/20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Offer</h2>
            <p className="text-xl text-gray-300">Opportunities for growth and development</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Technical Workshops",
                description: "Hands-on sessions covering cutting-edge technologies, programming languages, and industry tools.",
                gradient: "from-purple-600 to-pink-600",
              },
              {
                title: "Guest Lectures",
                description: "Sessions with industry experts, researchers, and alumni sharing their knowledge and experiences.",
                gradient: "from-pink-600 to-purple-600",
              },
              {
                title: "Hackathons & Competitions",
                description: "Platforms to showcase your skills, solve real-world problems, and win exciting prizes.",
                gradient: "from-purple-600 to-blue-600",
              },
              {
                title: "Research & Projects",
                description: "Collaborative research initiatives and innovative projects addressing real-world challenges.",
                gradient: "from-blue-600 to-purple-600",
              },
              {
                title: "Networking Events",
                description: "Connect with peers, professionals, and potential employers to expand your network.",
                gradient: "from-pink-600 to-red-600",
              },
              {
                title: "Certification Programs",
                description: "Industry-recognized certifications to boost your resume and career prospects.",
                gradient: "from-purple-600 to-indigo-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-slate-900/50 to-purple-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
              >
                <div className={`bg-gradient-to-r ${item.gradient} rounded-lg h-2 w-20 mb-4`} />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-300 mb-8">
            Be part of a vibrant community of tech enthusiasts, innovators, and future leaders.
            Together, we can shape the future of technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Become a Member
            </Link>
            <Link
              href="/team"
              className="bg-slate-800/50 border border-purple-500/30 hover:border-purple-400 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300"
            >
              Meet Our Team
            </Link>
            <Link
              href="/contact_us"
              className="bg-slate-800/50 border border-purple-500/30 hover:border-purple-400 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
