import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  alpha,
  useTheme,
  Chip,
  Grow,
  useMediaQuery,
  Paper,
  Link,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import { motion } from "framer-motion";
import { useState } from "react";
import { useSwipeToDismiss } from '@/hooks/useSwipeToDismiss';
import { keyframes } from '@emotion/react';

const MotionCard = motion(Card);

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glowAnimation = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const orbitAnimation = keyframes`
  0% { transform: rotate(0deg) translateX(3px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(3px) rotate(-360deg); }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const experiences = [
  {
    title: "Product Engineer",
    company: "VassuTech Services Inc.",
    duration: "June 2022 - Present",
    location: "Markham, CA",
    projects: [
      {
        name: "Titlegenius by Radian",
        link:"https://orders.mytitlegenius.com/",
        description: [
          "Architected and developed the refinance order flow used by lenders to generate quotes and place orders; this flow now accounts for over 70% of all orders processed by Titlegenius.",
          "Contributed to onboarding partner banks and migrating their legacy orders, resulting in a 200% increase in project revenue.",
          "Led the decommissioning of the R3 Corda blockchain and migrated legacy orders to a secure database while optimizing the overall system architecture, resulting in over a 50% improvement in order processing performance.",
          "Implemented tokenization and detokenization of sensitive NPI data in backend tables by deploying multiple parallel Kubernetes Jobs via Helm charts, enhancing data security and compliance.",
          "Built an admin portal enabling role-based access control, content updates, and UI customizations; eliminating the need for engineering involvement in routine updates."
        ],
        technologies: ["Node.js", "NestJS", "Next.js", "TypeScript", "Docker", "Kubernetes", "Azure DevOps","Corda 4","Helm","PostgreSQL", "GraphQL","Prisma","Azure Services","Redis"]
      },
      {
        name: "DocVenture – AI-Powered Agreement Automation Platform",
        link:"https://docventure.io/",
        description: [
          "Led architecture and development of DocVenture platform supporting eSignature, eNotarization, and secure eVault storage.",
          "Built an in-house PDF chat feature using the LangChain framework and LLMs, enabling contextual Q&A over legal documents.",
          "Presented DocVenture at MBA Expo 2023 in Philadelphia, showcasing innovation to industry leaders."
        ],
        technologies: ["Next.js", "Nest.js","TypeScript","LangChain", "LLMs", "PostgreSQL", "Prisma","GraphQL","Docker","Azure DevOps","Azure Services"]
      }
    ]
  },
  {
    title: "Intern - Product Engineer",
    company: "VassuTech Services Inc.",
    duration: "Sep 2021 - May 2022",
    location: "Markham, CA",
    description: [
      "Developed a web-based insurance quotation system for housing properties, enabling real-time rate generation and improving customer response times.",
      "Led a proof-of-concept (POC) initiative to integrate video calling functionality into a live client-facing application, demonstrating technical feasibility and enhancing future product capabilities.",
      "Conducted a comparative analysis of enterprise blockchain platforms (R3 Corda vs. Hyperledger Fabric), producing actionable insights that influenced architectural decisions for secure, decentralized system design."
    ],
    technologies: ["React.js", "Node.js", "PostgreSQL", "GraphQL","Prisma","WebRTC", "R3 Corda", "Hyperledger Fabric"]
  },
  {
    title: "Information Technology Consultant",
    company: "VassuTech Services Inc.",
    duration: "Oct 2020 - Jan 2021",
    location: "Hyderabad, India",
    description: [
      "Demonstrated the practical application of Robotic Process Automation (RPA) to automate repetitive daily tasks, improving team productivity and awareness of automation opportunities.",
      "Provisioned and configured Microsoft Azure resources tailored to project and client requirements, supporting scalable cloud infrastructure setup.",
      "Provided technical assistance and issue resolution for RPA-A2019 workflows, helping team members troubleshoot and optimize automation pipelines."
    ],
    technologies: ["Automation Anywhere-A2019", "NLP","Azure Services"]
  },
  {
    title: "RPA and Cloud Intern",
    company: "VassuTech Services Inc.",
    duration: "Jun 2020 - Sep 2020",
    location: "Hyderabad, India",
    description: [
      "Designed and developed an intelligent email prioritization bot using RPA-A2019 and Natural Language Processing (NLP) to automate the classification of Outlook emails by importance.",
      "Engineered seamless integration with Microsoft Outlook, ensuring reliable performance and accurate NLP-based classification for real-time prioritization.",
      "Presented the bot as a proof of concept (POC) to stakeholders, demonstrating tangible benefits in task automation.",
      "Explored Azure services for scalable deployment, emphasizing a cloud-first approach for future enhancements."
    ],
    technologies: ["Automation Anywhere-A2019", "NLP","Azure Services"]
  },
  {
    title: "Internship Trainee Engineer",
    company: "TA Digital",
    duration: "Dec 2019 - May 2020",
    location: "Hyderabad, India",
    description: [
      "Contributed to building a responsive e-commerce product page for a client's website, focusing on enhancing user experience across platforms.",
      "Collaborated with engineering and design teams to gather requirements and iterate on UI/UX feedback.",
      "Ensured cross-device compatibility and performance optimization, improving customer satisfaction.",
      "Gained hands-on experience in frontend development and agile collaboration."
    ],
    technologies: ["HTML5", "CSS", "JavaScript", "MariaDB"]
  },
  {
    title: "Industrial Trainee",
    company: "TechieNest",
    duration: "Jun 2019 - Jul 2019",
    location:"Hyderabad, India",
    description: [
      "Built a Twitter Sentiment Analysis pipeline using NLP to extract insights from social media data.",
      "Developed a Movie Review Classification system using SVM and Naive Bayes.",
      "Engineered a Spam Email Detection system with Ensemble Learning methods.",
      "Gained experience in text preprocessing, feature engineering, and model tuning."
    ],
    technologies: ["Machine Learning", "NLP", "Python", "SVM", "Ensemble Learning"]
  },
  {
    title: "Research Intern",
    company: "Vidcentum R&D",
    duration: "Mar 2019 - May 2019",
    location: "Hyderabad, India",
    description: [
      "Contributed to frontend development of an e-commerce platform, enhancing UI/UX.",
      "Researched and prototyped real-time communication solutions using WebRTC.",
      "Developed POC modules for voice and video calling using Red5Pro and TokBox SDKs.",
      "Gained experience in integrating third-party SDKs and modern web technologies."
    ],
    technologies: ["WebRTC", "Red5Pro", "TokBox", "JavaScript", "Vue.js"]
  }
];

export const ExperienceSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleOpenDialog = (experience) => {
    setSelectedExperience(experience);
  };

  const handleCloseDialog = () => {
    setSelectedExperience(null);
  };

  const { ref: dialogRef, isDragging } = useSwipeToDismiss({
    onDismiss: handleCloseDialog,
    threshold: 0.3
  });

  // Helper function to render experience card
  const renderExperienceCard = (exp, index) => {
    // Get combined technologies from all projects if they exist
    const technologies = exp.projects 
      ? [...new Set(exp.projects.flatMap(project => project.technologies))]
      : exp.technologies;

    return (
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        onClick={() => handleOpenDialog(exp)}
        sx={{
          background: (theme) => `linear-gradient(135deg,
            ${alpha(theme.palette.background.paper, 0.9)},
            ${alpha(theme.palette.background.paper, 0.8)}
          )`,
          backdropFilter: "blur(10px)",
          borderRadius: 2,
          boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
          position: "relative",
          overflow: "hidden",
          height: '100%',
          cursor: 'pointer',
          '&::before': {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "4px",
            height: "100%",
            background: (theme) => `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            opacity: 0.7,
            transition: 'opacity 0.3s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: (theme) => `linear-gradient(135deg,
              ${alpha(theme.palette.primary.main, 0.05)},
              ${alpha(theme.palette.secondary.main, 0.05)}
            )`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: (theme) => `0 8px 30px ${alpha(theme.palette.common.black, 0.15)}`,
            '&::before': {
              opacity: 1,
            },
            '&::after': {
              opacity: 1,
            }
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <CardContent sx={{ pl: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box
              sx={{
                position: 'relative',
                width: 56,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '16px',
                background: (theme) => `linear-gradient(135deg,
                  ${alpha(theme.palette.primary.main, 0.1)} 0%,
                  ${alpha(theme.palette.secondary.main, 0.1)} 100%
                )`,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -1,
                  borderRadius: 'inherit',
                  padding: 1,
                  background: (theme) => `linear-gradient(135deg,
                    ${theme.palette.primary.main},
                    ${theme.palette.secondary.main}
                  )`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: -2,
                  borderRadius: 'inherit',
                  background: (theme) => `linear-gradient(135deg,
                    ${theme.palette.primary.main},
                    ${theme.palette.secondary.main}
                  )`,
                  opacity: 0,
                  filter: 'blur(8px)',
                  transition: 'opacity 0.3s ease',
                },
                transition: 'all 0.3s ease',
                '.experience-icon': {
                  fontSize: 28,
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                  zIndex: 1,
                },
                '.orbit-dot': {
                  position: 'absolute',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: (theme) => theme.palette.primary.main,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  '&:nth-of-type(1)': {
                    animation: `${orbitAnimation} 3s linear infinite`,
                  },
                  '&:nth-of-type(2)': {
                    animation: `${orbitAnimation} 3s linear infinite reverse`,
                  },
                  '&:nth-of-type(3)': {
                    animation: `${orbitAnimation} 4s linear infinite`,
                  },
                  '&:nth-of-type(4)': {
                    animation: `${orbitAnimation} 4s linear infinite reverse`,
                  },
                },
                '&:hover': {
                  transform: 'scale(1.05)',
                  '&::before': {
                    opacity: 1,
                  },
                  '&::after': {
                    opacity: 0.5,
                  },
                  '.experience-icon': {
                    transform: 'scale(1.1)',
                    color: (theme) => theme.palette.primary.main,
                    animation: `${floatAnimation} 2s ease-in-out infinite`,
                  },
                  '.orbit-dot': {
                    opacity: 1,
                  },
                },
              }}
            >
              <Box className="orbit-dot" />
              <Box className="orbit-dot" />
              <Box className="orbit-dot" />
              <Box className="orbit-dot" />
              <WorkIcon className="experience-icon" />
            </Box>
            <Box sx={{ flex: 1, textAlign: 'left', pl: { xs: 0, sm: 2 }, pr: { xs: 0, sm: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {exp.title}
              </Typography>
              <Typography variant="subtitle2" color="primary.main" sx={{ mb: 0.5 }}>
                {exp.company}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {exp.duration} • {exp.location}
              </Typography>
            </Box>
          </Box>
          
          {/* Preview of technologies */}
          {technologies && technologies.length > 0 && (
            <Box sx={{ 
              mt: 1, 
              display: 'flex', 
              flexWrap: 'nowrap', 
              gap: 1, 
              justifyContent: 'flex-start',
              pl: { xs: 0, sm: 7 },
              pr: { xs: 0, sm: 4 },
              overflow: 'hidden'
            }}>
              {technologies.slice(0, 3).map((tech, idx) => (
                <Chip
                  key={idx}
                  label={tech}
                  size="small"
                  sx={{
                    background: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                    borderRadius: '4px',
                    flexShrink: 0
                  }}
                />
              ))}
              {technologies.length > 3 && (
                <Chip
                  label={`+${technologies.length - 3} more`}
                  size="small"
                  sx={{
                    background: (theme) => alpha(theme.palette.secondary.main, 0.1),
                    color: 'secondary.main',
                    borderRadius: '4px',
                    flexShrink: 0
                  }}
                />
              )}
            </Box>
          )}
        </CardContent>
      </MotionCard>
    );
  };

  // Helper function to render mobile experience card
  const renderMobileExperienceCard = (exp, index) => {
    return (
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        onClick={() => handleOpenDialog(exp)}
        sx={{
          background: (theme) => `linear-gradient(135deg,
            ${alpha(theme.palette.background.paper, 0.9)},
            ${alpha(theme.palette.background.paper, 0.8)}
          )`,
          backdropFilter: "blur(10px)",
          borderRadius: 2,
          boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
          position: "relative",
          overflow: "hidden",
          height: '100%',
          cursor: 'pointer',
          '&::before': {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "4px",
            height: "100%",
            background: (theme) => `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            opacity: 0.7,
            transition: 'opacity 0.3s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: (theme) => `linear-gradient(135deg,
              ${alpha(theme.palette.primary.main, 0.05)},
              ${alpha(theme.palette.secondary.main, 0.05)}
            )`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: (theme) => `0 8px 30px ${alpha(theme.palette.common.black, 0.15)}`,
            '&::before': {
              opacity: 1,
            },
            '&::after': {
              opacity: 1,
            }
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                position: 'relative',
                width: 72,
                height: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '20px',
                background: (theme) => `linear-gradient(135deg,
                  ${alpha(theme.palette.primary.main, 0.1)} 0%,
                  ${alpha(theme.palette.secondary.main, 0.1)} 100%
                )`,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -1,
                  borderRadius: 'inherit',
                  padding: 1,
                  background: (theme) => `linear-gradient(135deg,
                    ${theme.palette.primary.main},
                    ${theme.palette.secondary.main}
                  )`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: -2,
                  borderRadius: 'inherit',
                  background: (theme) => `linear-gradient(135deg,
                    ${theme.palette.primary.main},
                    ${theme.palette.secondary.main}
                  )`,
                  opacity: 0,
                  filter: 'blur(12px)',
                  transition: 'opacity 0.3s ease',
                },
                transition: 'all 0.3s ease',
                '.experience-icon': {
                  fontSize: 36,
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                  zIndex: 1,
                },
                '.orbit-dot': {
                  position: 'absolute',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: (theme) => theme.palette.primary.main,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  '&:nth-of-type(1)': {
                    animation: `${orbitAnimation} 3s linear infinite`,
                  },
                  '&:nth-of-type(2)': {
                    animation: `${orbitAnimation} 3s linear infinite reverse`,
                  },
                  '&:nth-of-type(3)': {
                    animation: `${orbitAnimation} 4s linear infinite`,
                  },
                  '&:nth-of-type(4)': {
                    animation: `${orbitAnimation} 4s linear infinite reverse`,
                  },
                },
                '&:hover': {
                  transform: 'scale(1.05)',
                  '&::before': {
                    opacity: 1,
                  },
                  '&::after': {
                    opacity: 0.5,
                  },
                  '.experience-icon': {
                    transform: 'scale(1.1)',
                    color: (theme) => theme.palette.primary.main,
                    animation: `${floatAnimation} 2s ease-in-out infinite`,
                  },
                  '.orbit-dot': {
                    opacity: 1,
                  },
                },
              }}
            >
              <Box className="orbit-dot" />
              <Box className="orbit-dot" />
              <Box className="orbit-dot" />
              <Box className="orbit-dot" />
              <WorkIcon className="experience-icon" />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {exp.title}
              </Typography>
              <Typography variant="subtitle2" color="primary.main" sx={{ mb: 0.5 }}>
                {exp.company}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {exp.duration} • {exp.location}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </MotionCard>
    );
  };

  // Helper function to render tablet experience card
  const renderTabletExperienceCard = (exp, index) => {
    const technologies = exp.projects 
      ? [...new Set(exp.projects.flatMap(project => project.technologies))]
      : exp.technologies;

    return (
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        onClick={() => handleOpenDialog(exp)}
        sx={{
          background: (theme) => `linear-gradient(135deg,
            ${alpha(theme.palette.background.paper, 0.9)},
            ${alpha(theme.palette.background.paper, 0.8)}
          )`,
          backdropFilter: "blur(10px)",
          borderRadius: 2,
          boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
          position: "relative",
          overflow: "hidden",
          height: '100%',
          cursor: 'pointer',
          '&::before': {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "4px",
            height: "100%",
            background: (theme) => `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            opacity: 0.7,
            transition: 'opacity 0.3s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: (theme) => `linear-gradient(135deg,
              ${alpha(theme.palette.primary.main, 0.05)},
              ${alpha(theme.palette.secondary.main, 0.05)}
            )`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: (theme) => `0 8px 30px ${alpha(theme.palette.common.black, 0.15)}`,
            '&::before': {
              opacity: 1,
            },
            '&::after': {
              opacity: 1,
            }
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                position: 'relative',
                width: 72,
                height: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '20px',
                background: (theme) => `linear-gradient(135deg,
                  ${alpha(theme.palette.primary.main, 0.1)} 0%,
                  ${alpha(theme.palette.secondary.main, 0.1)} 100%
                )`,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -1,
                  borderRadius: 'inherit',
                  padding: 1,
                  background: (theme) => `linear-gradient(135deg,
                    ${theme.palette.primary.main},
                    ${theme.palette.secondary.main}
                  )`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: -2,
                  borderRadius: 'inherit',
                  background: (theme) => `linear-gradient(135deg,
                    ${theme.palette.primary.main},
                    ${theme.palette.secondary.main}
                  )`,
                  opacity: 0,
                  filter: 'blur(12px)',
                  transition: 'opacity 0.3s ease',
                },
                transition: 'all 0.3s ease',
                '.experience-icon': {
                  fontSize: 36,
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                  zIndex: 1,
                },
                '.orbit-dot': {
                  position: 'absolute',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: (theme) => theme.palette.primary.main,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  '&:nth-of-type(1)': {
                    animation: `${orbitAnimation} 3s linear infinite`,
                  },
                  '&:nth-of-type(2)': {
                    animation: `${orbitAnimation} 3s linear infinite reverse`,
                  },
                  '&:nth-of-type(3)': {
                    animation: `${orbitAnimation} 4s linear infinite`,
                  },
                  '&:nth-of-type(4)': {
                    animation: `${orbitAnimation} 4s linear infinite reverse`,
                  },
                },
                '&:hover': {
                  transform: 'scale(1.05)',
                  '&::before': {
                    opacity: 1,
                  },
                  '&::after': {
                    opacity: 0.5,
                  },
                  '.experience-icon': {
                    transform: 'scale(1.1)',
                    color: (theme) => theme.palette.primary.main,
                    animation: `${floatAnimation} 2s ease-in-out infinite`,
                  },
                  '.orbit-dot': {
                    opacity: 1,
                  },
                },
              }}
            >
              <Box className="orbit-dot" />
              <Box className="orbit-dot" />
              <Box className="orbit-dot" />
              <Box className="orbit-dot" />
              <WorkIcon className="experience-icon" />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {exp.title}
              </Typography>
              <Typography variant="subtitle2" color="primary.main" sx={{ mb: 0.5 }}>
                {exp.company}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {exp.duration} • {exp.location}
              </Typography>
            </Box>
          </Box>
          
          {/* Preview of technologies */}
          {technologies && technologies.length > 0 && (
            <Box sx={{ 
              mt: 2, 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1, 
              justifyContent: 'center'
            }}>
              {technologies.slice(0, 3).map((tech, idx) => (
                <Chip
                  key={idx}
                  label={tech}
                  size="small"
                  sx={{
                    background: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                    borderRadius: '4px',
                  }}
                />
              ))}
              {technologies.length > 3 && (
                <Chip
                  label={`+${technologies.length - 3} more`}
                  size="small"
                  sx={{
                    background: (theme) => alpha(theme.palette.secondary.main, 0.1),
                    color: 'secondary.main',
                    borderRadius: '4px',
                  }}
                />
              )}
            </Box>
          )}
        </CardContent>
      </MotionCard>
    );
  };

  // Dialog content renderer
  const renderDialogContent = (exp) => (
    <Box sx={{ py: 2 }}>
      {exp.projects ? (
        exp.projects.map((project, idx) => (
          <Box
            key={idx}
            sx={{
              mb: idx < exp.projects.length - 1 ? 4 : 0,
              p: 3,
              borderRadius: 2,
              background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.9)})`,
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
              boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.05)}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 600
                }}
              >
                {project.name}
              </Typography>
              {project?.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    color: 'primary.main',
                    '&:hover': {
                      '& .link-icon': {
                        transform: 'translateY(-2px)',
                      }
                    }
                  }}
                >
                  <LinkIcon 
                    className="link-icon"
                    sx={{ 
                      fontSize: 20,
                      transition: 'transform 0.3s ease'
                    }} 
                  />
                </Link>
              )}
            </Box>
            {renderDescription(project.description)}
            {renderTechnologies(project.technologies)}
          </Box>
        ))
      ) : (
        <>
          {renderDescription(exp.description)}
          {renderTechnologies(exp.technologies)}
        </>
      )}
    </Box>
  );

  const renderTechnologies = (technologies) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {technologies.map((tech, idx) => (
        <Typography
          key={idx}
          variant="body2"
          sx={{
            position: 'relative',
            color: 'white',
            background: (theme) => `linear-gradient(135deg, 
              ${alpha(theme.palette.primary.main, 0.9)}, 
              ${alpha(theme.palette.secondary.main, 0.9)}
            )`,
            px: 1.5,
            py: 0.5,
            borderRadius: '4px',
            fontSize: '0.85rem',
            transition: 'all 0.3s ease',
            opacity: 0,
            transform: 'translateY(10px)',
            animation: `fadeInUp 0.3s ease forwards ${idx * 0.1}s`,
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(10px)'
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)'
              }
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              padding: '1px',
              background: (theme) => `linear-gradient(135deg, 
                ${theme.palette.primary.main}, 
                ${theme.palette.secondary.main}
              )`,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            },
            '&:hover': {
              transform: 'translateY(-2px)',
              '&::before': {
                opacity: 0.8,
              }
            }
          }}
        >
          {tech}
        </Typography>
      ))}
    </Box>
  );

  const renderDescription = (items) => (
    <Box sx={{ mb: 3 }}>
      {items.map((item, idx) => (
        <Typography
          key={idx}
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 0.5,
            position: 'relative',
            pl: 0,
            py: 1,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            '&::before': {
              content: '""',
              display: 'inline-block',
              width: '8px',
              height: '2px',
              background: (theme) => `linear-gradient(90deg, 
                ${theme.palette.primary.main}, 
                ${theme.palette.secondary.main}
              )`,
              marginRight: '12px',
              borderRadius: '2px',
              opacity: 0.7,
              transition: 'all 0.3s ease',
            },
            '&:hover': {
              color: 'text.primary',
              transform: 'translateX(8px)',
              '&::before': {
                width: '12px',
                opacity: 1,
              }
            }
          }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  );

  return (
    <Box
      component="section"
      id="experience"
      sx={{
        pt: { xs: 6, md: 6 },
        pb: { xs: 6, md: 8 },
        mt: { xs: 4, md: 6 },
        mb: { xs: 4, md: 6 },
        position: 'relative',
        scrollMarginTop: { xs: "64px", md: "72px" },
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '1px',
          background: (theme) => `linear-gradient(90deg,
            transparent 0%,
            ${alpha(theme.palette.divider, 0.1)} 50%,
            transparent 100%
          )`,
        }
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: 700,
            mb: 2,
            textAlign: "center",
            background: (theme) => `linear-gradient(135deg, 
              ${theme.palette.primary.main}, 
              ${theme.palette.secondary.main}
            )`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}
        >
          Professional <Box component="span" sx={{ color: "primary.main" }}>Experience</Box>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 6,
            maxWidth: "800px",
            mx: "auto",
            fontSize: "1.1rem",
            lineHeight: 1.8,
            '& strong': {
              color: 'primary.main',
              fontWeight: 500,
            }
          }}
        >
          A passionate <strong>Product Engineer</strong> with expertise in building scalable software solutions.
          Currently at <strong>VassuTech Services Inc.</strong>, leading the development of innovative platforms
          in the real estate and document automation space. Experienced in modern web technologies,
          cloud architecture, and AI integration.
        </Typography>

        <Grid container spacing={4}>
          {experiences.map((exp, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={6} 
              key={index}
              sx={{
                transition: 'all 0.3s ease-in-out',
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                '@keyframes fadeIn': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(20px)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              {isMobile 
                ? renderMobileExperienceCard(exp, index)
                : isTablet 
                  ? renderTabletExperienceCard(exp, index)
                  : renderExperienceCard(exp, index)}
            </Grid>
          ))}
        </Grid>

        {/* Experience Details Dialog */}
        <Dialog
          open={Boolean(selectedExperience)}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          TransitionComponent={Grow}
          TransitionProps={{
            timeout: 300
          }}
          PaperProps={{
            ref: dialogRef,
            sx: {
              background: (theme) => alpha(theme.palette.background.paper, 0.95),
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              overflow: 'hidden',
              '&.MuiDialog-paper': {
                transform: 'none',
              },
              '@media (pointer: fine)': {
                '&[data-dragging="true"]': {
                  cursor: 'grabbing',
                  userSelect: 'none',
                }
              }
            }
          }}
          sx={{
            '& .MuiBackdrop-root': {
              backdropFilter: 'blur(8px)',
            }
          }}
        >
          {selectedExperience && (
            <>
              <DialogTitle sx={{ 
                pb: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {selectedExperience.title}
                  </Typography>
                  <Typography variant="subtitle1" color="primary.main">
                    {selectedExperience.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedExperience.duration} • {selectedExperience.location}
                  </Typography>
                </Box>
                <IconButton
                  onClick={handleCloseDialog}
                  className="dialog-close-btn"
                  sx={{
                    position: 'relative',
                    width: 40,
                    height: 40,
                    transition: 'all 0.3s ease',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      background: (theme) => `linear-gradient(135deg, 
                        ${alpha(theme.palette.primary.main, 0.1)},
                        ${alpha(theme.palette.secondary.main, 0.1)}
                      )`,
                      opacity: 0,
                      transition: 'all 0.3s ease',
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease',
                      color: 'text.secondary',
                    },
                    '&:hover': {
                      transform: 'rotate(90deg)',
                      '&::before': {
                        opacity: 1,
                        animation: `${pulseAnimation} 2s ease-in-out infinite`,
                      },
                      '& .MuiSvgIcon-root': {
                        color: 'primary.main',
                        transform: 'scale(1.1)',
                      },
                    },
                    '&:active': {
                      transform: 'rotate(90deg) scale(0.95)',
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers>
                {renderDialogContent(selectedExperience)}
              </DialogContent>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
}; 