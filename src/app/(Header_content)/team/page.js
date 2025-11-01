


"use client";

import React, { useState, useEffect } from 'react';
import SeraTeamCard from '@/components/ui/sera-team-card';
import { Users, Award, Target, Zap, Crown, DollarSign, Code, Cog, Palette, FileText, Bot, Globe, Calendar, Headphones } from 'lucide-react';

const TeamPage = () => {
  const [organizationStructure, setOrganizationStructure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        const response = await fetch('/data/team-members.json');
        const data = await response.json();
        setOrganizationStructure(data.organizationStructure);
        setLoading(false);
      } catch (error) {
        console.error('Error loading team data:', error);
        setLoading(false);
      }
    };

    loadTeamData();
    setIsVisible(true);
  }, []);

  // Team configuration with icons and descriptions
  const teamConfig = {
    executiveBoard: {
      title: "Executive Board",
      icon: Crown,
      description: "The leadership team steering the organization towards excellence",
      gradient: "from-yellow-400 to-orange-500"
    },
    financeTeam: {
      title: "Finance Team",
      icon: DollarSign,
      description: "Managing financial resources and ensuring transparency",
      gradient: "from-green-400 to-emerald-500"
    },
    technicalTeams: {
      webDevelopmentTeam: {
        title: "Web Development Team",
        icon: Globe,
        description: "Building and maintaining our digital presence",
        gradient: "from-blue-400 to-cyan-500"
      },
      computerSociety: {
        title: "Computer Society",
        icon: Code,
        description: "Advancing computer science and programming excellence",
        gradient: "from-purple-400 to-indigo-500"
      },
      roboticsAndAutomationSociety: {
        title: "Robotics & Automation Society",
        icon: Bot,
        description: "Pioneering robotics and automation technologies",
        gradient: "from-red-400 to-pink-500"
      }
    },
    operationalTeams: {
      collaborationAndMediaTeam: {
        title: "Collaboration & Media Team",
        icon: Headphones,
        description: "Building partnerships and managing communications",
        gradient: "from-teal-400 to-cyan-500"
      },
      eventManagementTeam: {
        title: "Event Management Team",
        icon: Calendar,
        description: "Creating memorable experiences and managing events",
        gradient: "from-amber-400 to-orange-500"
      },
      operationsTeam: {
        title: "Operations Team",
        icon: Cog,
        description: "Ensuring smooth day-to-day operations",
        gradient: "from-slate-400 to-gray-500"
      }
    },
    creativeTeams: {
      editorialTeam: {
        title: "Editorial Team",
        icon: FileText,
        description: "Crafting compelling content and managing publications",
        gradient: "from-violet-400 to-purple-500"
      },
      designingTeam: {
        title: "Designing Team",
        icon: Palette,
        description: "Creating visual experiences and brand identity",
        gradient: "from-pink-400 to-rose-500"
      }
    }
  };

  const renderTeamSection = (teamKey, teamData, config, sectionIndex) => {
    if (!teamData || teamData.length === 0) return null;

    const IconComponent = config.icon;
    
    return (
      <div 
        key={teamKey}
        className={`mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{ animationDelay: `${sectionIndex * 200}ms` }}
      >
        {/* Team Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${config.gradient} mb-4 shadow-lg`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            {config.title}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {config.description}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teamData.map((member, index) => (
            <div
              key={`${teamKey}-${member.Name}-${index}`}
              className={`transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ animationDelay: `${(sectionIndex * 200) + (index * 100)}ms` }}
            >
              <SeraTeamCard member={member} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderNestedTeams = (teams, parentConfig, startIndex) => {
    return Object.entries(teams).map(([teamKey, teamData], index) => {
      const config = parentConfig[teamKey];
      if (!config) return null;
      
      return renderTeamSection(teamKey, teamData, config, startIndex + index);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 animate-spin">
            <Users className="w-16 h-16 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Loading Team</h2>
          <p className="text-gray-400">Getting our amazing team members...</p>
        </div>
      </div>
    );
  }

  if (!organizationStructure) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">No Team Data Found</h2>
          <p className="text-gray-400">Please check the data file structure.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Floating Particles */}
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 1}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}
        ></div>
      ))}

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header Section */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-5xl mt-10 md:text-7xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient-x">Team</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Meet the dedicated individuals who drive innovation and excellence at IEEE RGIPT Student Branch
          </p>
          {organizationStructure && (
            <div className="flex items-center justify-center space-x-8 text-gray-300">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span>{
                  Object.values(organizationStructure).reduce((total, team) => {
                    if (Array.isArray(team)) return total + team.length;
                    if (typeof team === 'object') {
                      return total + Object.values(team).reduce((subTotal, subTeam) => 
                        Array.isArray(subTeam) ? subTotal + subTeam.length : subTotal, 0
                      );
                    }
                    return total;
                  }, 0)
                } Members</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>{
                  Object.keys(organizationStructure).reduce((count, key) => {
                    if (organizationStructure[key] && typeof organizationStructure[key] === 'object') {
                      if (Array.isArray(organizationStructure[key])) {
                        return count + 1;
                      } else {
                        return count + Object.keys(organizationStructure[key]).length;
                      }
                    }
                    return count;
                  }, 0)
                } Teams</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-400" />
                <span>One Vision</span>
              </div>
            </div>
          )}
        </div>

        {/* Team Sections */}
        <div className="space-y-24">
          {/* Executive Board */}
          {renderTeamSection('executiveBoard', organizationStructure.executiveBoard, teamConfig.executiveBoard, 0)}

          {/* Finance Team */}
          {renderTeamSection('financeTeam', organizationStructure.financeTeam, teamConfig.financeTeam, 1)}

          {/* Technical Teams */}
          {organizationStructure.technicalTeams && (
            <>
              {renderNestedTeams(organizationStructure.technicalTeams, teamConfig.technicalTeams, 2)}
            </>
          )}

          {/* Operational Teams */}
          {organizationStructure.operationalTeams && (
            <>
              {renderNestedTeams(organizationStructure.operationalTeams, teamConfig.operationalTeams, 5)}
            </>
          )}

          {/* Creative Teams */}
          {organizationStructure.creativeTeams && (
            <>
              {renderNestedTeams(organizationStructure.creativeTeams, teamConfig.creativeTeams, 8)}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TeamPage;