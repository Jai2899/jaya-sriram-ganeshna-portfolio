import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  alpha,
  useTheme,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TerminalIcon from '@mui/icons-material/Terminal';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState, useEffect, useRef } from "react";
import { keyframes } from "@emotion/react";

const MotionCard = motion(Card);

const projects = [
  {
    title: "NYC-311 Management System",
    description: [
      "Developed a full-stack complaint management system as part of Software Engineering course project",
      "Implemented real-time analytics dashboard using D3.js for data visualization",
      "Integrated Google Maps API for geospatial complaint tracking and clustering",
      "Achieved 95% test coverage using Jest and React Testing Library"
    ],
    technologies: ["React.js", "Node.js", "Express", "MySQL", "D3.js", "Google Maps API", "Jest"],
    category: "Course Project"
  },
  {
    title: "ClazzRoom",
    description: [
      "Led a team of 4 students to build a collaborative learning platform for Database Systems course",
      "Designed and implemented a skill-based matching algorithm with 85% accuracy",
      "Deployed microservices architecture on Azure using Docker and Kubernetes"
    ],
    technologies: ["React.js", "Node.jS", "PostgreSQL", "Docker", "AWS", "Kubernetes"],
    category: "Team Project"
  },
  {
    title: "Portfolio Website",
    description: [
      "Modern portfolio website built with React and Material-UI featuring glass-morphism design",
      "Implemented responsive layouts with fluid animations and micro-interactions",
      "Added comprehensive form validation, loading states, and success notifications"
    ],
    technologies: ["React", "Material-UI", "Framer Motion", "Vite"],
    category: "Personal Project"
  },
  {
    title: "Distributed Task Scheduler",
    description: [
      "Capstone project implementing a distributed computing system",
      "Built fault-tolerant task distribution system with 99.9% reliability",
      "Implemented custom consensus algorithm for distributed task management",
      "Created comprehensive monitoring dashboard with Grafana and Prometheus"
    ],
    technologies: ["Go", "Redis", "Apache Kafka", "Prometheus", "Docker", "Grafana"],
    category: "Capstone Project"
  }
];

const shimmerAnimation = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;



const buttonHoverScale = keyframes`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.05);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`;

const getProjectIcon = (category) => {
  switch (category) {
    case 'Capstone Project':
      return <ScienceIcon className="project-icon" sx={{ 
        fontSize: { xs: 32, sm: 28 },
        color: (theme) => theme.palette.primary.main,
        filter: (theme) => `drop-shadow(0 2px 4px ${alpha(theme.palette.primary.main, 0.3)})`,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }} />;
    case 'Course Project':
      return <SchoolIcon className="project-icon" sx={{ 
        fontSize: { xs: 32, sm: 28 },
        color: (theme) => theme.palette.primary.main,
        filter: (theme) => `drop-shadow(0 2px 4px ${alpha(theme.palette.primary.main, 0.3)})`,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }} />;
    case 'Personal Project':
      return <PsychologyIcon className="project-icon" sx={{ 
        fontSize: { xs: 32, sm: 28 },
        color: (theme) => theme.palette.primary.main,
        filter: (theme) => `drop-shadow(0 2px 4px ${alpha(theme.palette.primary.main, 0.3)})`,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }} />;
    default:
      return <TerminalIcon className="project-icon" sx={{ 
        fontSize: { xs: 32, sm: 28 },
        color: (theme) => theme.palette.primary.main,
        filter: (theme) => `drop-shadow(0 2px 4px ${alpha(theme.palette.primary.main, 0.3)})`,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }} />;
  }
};

export const ProjectsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleOpenDialog = (project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  const checkScrollability = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    }
  };

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      const newScrollLeft = container.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      controls.stop();
    }
  };

  useEffect(() => {
    let interval;
    
    const startAutoScroll = () => {
      if (containerRef.current && !isHovered) {
        const scrollWidth = containerRef.current.scrollWidth;
        const clientWidth = containerRef.current.clientWidth;
        
        controls.start({
          x: [0, -(scrollWidth - clientWidth)],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 5,
              ease: "linear"
            }
          }
        });
      }
    };

    startAutoScroll();

    return () => {
      if (interval) clearInterval(interval);
      controls.stop();
    };
  }, [controls, isHovered]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      checkScrollability();
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);

      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        pt: { xs: 6, md: 6 },
        pb: { xs: 6, md: 8 },
        mt: { xs: 4, md: 6 },
        mb: { xs: 4, md: 6 },
        position: 'relative',
        scrollMarginTop: { xs: "64px", md: "72px" },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          zIndex: -1,
        },
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
          }}
        >
          Academic <Box component="span" sx={{ color: "primary.main" }}>Projects</Box>
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
            px: 2,
            '& strong': {
              color: 'primary.main',
              fontWeight: 500,
            }
          }}
        >
          A collection of <strong>innovative projects</strong> showcasing my expertise in
          full-stack development, machine learning, and system design.
        </Typography>

        {isMobile || isTablet ? (
          <Grid container spacing={3}>
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => handleOpenDialog(project)}
                  sx={{
                    width: '100%',
                    minHeight: 200,
                    background: (theme) => `linear-gradient(135deg,
                      ${alpha(theme.palette.background.paper, 0.8)},
                      ${alpha(theme.palette.background.paper, 0.6)}
                    )`,
                    backdropFilter: 'blur(8px)',
                    borderRadius: 3,
                    overflow: "hidden",
                    position: "relative",
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: '-1px',
                      padding: '1px',
                      background: (theme) => `linear-gradient(135deg,
                        ${alpha(theme.palette.primary.main, 0.2)},
                        ${alpha(theme.palette.secondary.main, 0.2)}
                      )`,
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                      boxShadow: (theme) => `
                        0 4px 20px ${alpha(theme.palette.primary.main, 0.15)},
                        0 0 30px ${alpha(theme.palette.primary.main, 0.1)}
                      `,
                      '& .project-icon-wrapper': {
                        transform: 'scale(1.1)',
                      },
                      '& .project-icon': {
                        transform: 'rotate(360deg) scale(1.2)',
                      },
                      '& .project-title': {
                        background: (theme) => `linear-gradient(135deg,
                          ${theme.palette.primary.main},
                          ${theme.palette.secondary.main}
                        )`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      },
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2 
                    }}>
                      <Box
                        className="project-icon-wrapper"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          flexShrink: 0,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        {getProjectIcon(project.category)}
                      </Box>
                      <Box sx={{ textAlign: 'center', width: '100%' }}>
                        <Typography 
                          variant="h6" 
                          className="project-title"
                          sx={{ 
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            lineHeight: 1.3,
                            mb: 0.75,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {project.title}
                        </Typography>
                        <Chip
                          label={project.category}
                          size="small"
                          className="project-category"
                          sx={{
                            background: (theme) => alpha(theme.palette.primary.main, 0.08),
                            color: 'text.secondary',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            height: 22,
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(4px)',
                          }}
                        />
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      className="project-description"
                      color="text.secondary"
                      sx={{
                        textAlign: 'center',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.6,
                        fontSize: '0.875rem',
                      }}
                    >
                      {project.description[0]}
                    </Typography>

                    {!isMobile && (
                      <Box 
                        sx={{ 
                          mt: 'auto',
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 0.75,
                          justifyContent: 'center'
                        }}
                      >
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <Chip
                            key={idx}
                            label={tech}
                            size="small"
                            className="project-tech-chip"
                            sx={{
                              background: (theme) => alpha(theme.palette.secondary.main, 0.08),
                              color: 'text.secondary',
                              fontWeight: 500,
                              fontSize: '0.75rem',
                              height: 22,
                              borderRadius: 1,
                            }}
                          />
                        ))}
                        {project.technologies.length > 3 && (
                          <Chip
                            label={`+${project.technologies.length - 3}`}
                            size="small"
                            className="project-tech-chip"
                            sx={{
                              background: (theme) => alpha(theme.palette.secondary.main, 0.04),
                              color: 'text.secondary',
                              fontWeight: 500,
                              fontSize: '0.75rem',
                              height: 22,
                              borderRadius: 1,
                            }}
                          />
                        )}
                      </Box>
                    )}
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ position: 'relative' }}>
            {/* Enhanced Navigation Buttons */}
            <IconButton
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              sx={{
                position: 'absolute',
                left: -20,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                width: 40,
                height: 40,
                background: (theme) => `linear-gradient(135deg,
                  ${alpha(theme.palette.background.paper, 0.9)},
                  ${alpha(theme.palette.background.paper, 0.8)}
                )`,
                backdropFilter: 'blur(8px)',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                color: 'text.primary',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: `2s infinite`,
                opacity: canScrollLeft ? 1 : 0,
                visibility: canScrollLeft ? 'visible' : 'hidden',
                '&:hover': {
                  background: (theme) => `linear-gradient(135deg,
                    ${alpha(theme.palette.primary.main, 0.1)},
                    ${alpha(theme.palette.secondary.main, 0.1)}
                  )`,
                  borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
                  color: 'primary.main',
                  animation: `${buttonHoverScale} 1s infinite`,
                  '& svg': {
                    transform: 'scale(1.1)',
                  },
                },
                '& svg': {
                  transition: 'transform 0.3s ease',
                  fontSize: 24,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: '-1px',
                  padding: '1px',
                  borderRadius: '50%',
                  background: (theme) => `linear-gradient(135deg,
                    ${theme.palette.primary.main},
                    ${theme.palette.secondary.main}
                  )`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: 0.5,
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            <IconButton
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              sx={{
                position: 'absolute',
                right: -20,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                width: 40,
                height: 40,
                background: (theme) => `linear-gradient(135deg,
                  ${alpha(theme.palette.background.paper, 0.9)},
                  ${alpha(theme.palette.background.paper, 0.8)}
                )`,
                backdropFilter: 'blur(8px)',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                color: 'text.primary',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: `2s infinite`,
                opacity: canScrollRight ? 1 : 0,
                visibility: canScrollRight ? 'visible' : 'hidden',
                '&:hover': {
                  background: (theme) => `linear-gradient(135deg,
                    ${alpha(theme.palette.primary.main, 0.1)},
                    ${alpha(theme.palette.secondary.main, 0.1)}
                  )`,
                  borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
                  color: 'primary.main',
                  animation: `${buttonHoverScale} 1s infinite`,
                  '& svg': {
                    transform: 'scale(1.1)',
                  },
                },
                '& svg': {
                  transition: 'transform 0.3s ease',
                  fontSize: 24,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: '-1px',
                  padding: '1px',
                  borderRadius: '50%',
                  background: (theme) => `linear-gradient(135deg,
                    ${theme.palette.primary.main},
                    ${theme.palette.secondary.main}
                  )`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: 0.5,
                },
              }}
            >
              <ChevronRightIcon />
            </IconButton>

            {/* Existing desktop view content */}
            <Box
              ref={containerRef}
              sx={{
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none'
                },
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onScroll={checkScrollability}
            >
              <motion.div
                animate={controls}
                style={{
                  display: 'flex',
                  height: 240,
                  gap: '24px',
                  padding: '0 32px',
                  cursor: isHovered ? 'grab' : 'auto',
                }}
                drag="x"
                dragConstraints={containerRef}
                onDragStart={() => controls.stop()}
                onDragEnd={() => !isHovered && controls.start()}
              >
                {projects.map((project, index) => (
                  <MotionCard
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => handleOpenDialog(project)}
                    sx={{
                      width: { sm: 320 },
                      minHeight: 200,
                      maxHeight: 220,
                      flexShrink: 0,
                      background: (theme) => `linear-gradient(135deg,
                        ${alpha(theme.palette.background.paper, 0.8)},
                        ${alpha(theme.palette.background.paper, 0.6)}
                      )`,
                      backdropFilter: 'blur(8px)',
                      borderRadius: 3,
                      overflow: "hidden",
                      position: "relative",
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: '-1px',
                        padding: '1px',
                        background: (theme) => `linear-gradient(135deg,
                          ${alpha(theme.palette.primary.main, 0.2)},
                          ${alpha(theme.palette.secondary.main, 0.2)}
                        )`,
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: (theme) => `linear-gradient(135deg,
                          ${alpha(theme.palette.primary.main, 0.1)},
                          ${alpha(theme.palette.secondary.main, 0.1)}
                        )`,
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                      },
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                        boxShadow: (theme) => `
                          0 4px 20px ${alpha(theme.palette.primary.main, 0.15)},
                          0 0 30px ${alpha(theme.palette.primary.main, 0.1)}
                        `,
                        '&::after': {
                          opacity: 1,
                        },
                        '& .project-icon-wrapper': {
                          transform: 'scale(1.1)',
                          borderColor: (theme) => theme.palette.primary.main,
                          background: 'transparent',
                          '&::before': {
                            opacity: 0.15,
                          }
                        },
                        '& .project-icon': {
                          transform: 'rotate(360deg) scale(1.2)',
                          filter: 'brightness(1.2) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                        },
                        '& .project-title': {
                          background: (theme) => `linear-gradient(135deg,
                            ${theme.palette.primary.main},
                            ${theme.palette.secondary.main}
                          )`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          transform: 'translateX(8px)',
                        },
                        '& .project-category': {
                          background: (theme) => alpha(theme.palette.primary.main, 0.15),
                          color: 'primary.main',
                          transform: 'translateX(8px)',
                        },
                        '& .project-description': {
                          color: 'text.primary',
                        },
                        '& .project-tech-chip': {
                          transform: 'translateY(-4px)',
                          background: (theme) => alpha(theme.palette.secondary.main, 0.15),
                          color: 'secondary.main',
                        }
                      },
                    }}
                  >
                    <CardContent 
                      sx={{ 
                        p: 2.5,
                        pb: '20px !important',
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: 2,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'center', sm: 'flex-start' },
                        gap: 2 
                      }}>
                        <Box
                          className="project-icon-wrapper"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            flexShrink: 0,
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            '& .project-icon': {
                              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            },
                            '&:hover .project-icon': {
                              transform: 'scale(1.2) rotate(8deg)',
                              filter: (theme) => `
                                drop-shadow(0 4px 8px ${alpha(theme.palette.primary.main, 0.4)})
                                brightness(1.2)
                              `,
                              color: (theme) => theme.palette.primary.main,
                            }
                          }}
                        >
                          {getProjectIcon(project.category)}
                        </Box>
                        <Box sx={{ 
                          flex: 1, 
                          minWidth: 0,
                          textAlign: { xs: 'center', sm: 'left' },
                          width: { xs: '100%', sm: 'auto' }
                        }}>
                          <Typography 
                            variant="h6" 
                            className="project-title"
                            sx={{ 
                              fontSize: '1.1rem',
                              fontWeight: 600,
                              lineHeight: 1.3,
                              mb: 0.75,
                              transition: 'all 0.3s ease',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {project.title}
                          </Typography>
                          <Chip
                            label={project.category}
                            size="small"
                            className="project-category"
                            sx={{
                              background: (theme) => alpha(theme.palette.primary.main, 0.08),
                              color: 'text.secondary',
                              fontWeight: 500,
                              fontSize: '0.75rem',
                              height: 22,
                              transition: 'all 0.3s ease',
                              backdropFilter: 'blur(4px)',
                            }}
                          />
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        className="project-description"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: 1.6,
                          fontSize: '0.875rem',
                          transition: 'all 0.3s ease',
                          textAlign: { xs: 'center', sm: 'left' }
                        }}
                      >
                        {project.description[0]}
                      </Typography>

                      <Box 
                        sx={{ 
                          mt: 'auto',
                          display: { xs: 'none', sm: 'flex' },
                          flexWrap: 'nowrap', 
                          gap: 0.75,
                          height: 32,
                          overflow: 'visible',
                          position: 'relative',
                          pt: 0.5,
                          pb: 1,
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            right: 0,
                            bottom: 8,
                            height: 22,
                            width: '24px',
                            background: (theme) => `linear-gradient(to right, 
                              ${alpha(theme.palette.background.paper, 0)}, 
                              ${alpha(theme.palette.background.paper, 1)}
                            )`,
                            display: project.technologies.length > 3 ? 'block' : 'none',
                            pointerEvents: 'none',
                          }
                        }}
                      >
                        <Box sx={{ 
                          display: 'flex', 
                          gap: 0.75,
                          flexWrap: 'nowrap',
                          position: 'relative',
                          zIndex: 1,
                        }}>
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <Chip
                              key={idx}
                              label={tech}
                              size="small"
                              className="project-tech-chip"
                              sx={{
                                background: (theme) => alpha(theme.palette.secondary.main, 0.08),
                                color: 'text.secondary',
                                fontWeight: 500,
                                fontSize: '0.75rem',
                                height: 22,
                                borderRadius: 1,
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(4px)',
                                border: '1px solid',
                                borderColor: (theme) => alpha(theme.palette.divider, 0.05),
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                                transform: 'translateY(0)',
                                '&:hover': {
                                  transform: 'translateY(-4px)',
                                }
                              }}
                            />
                          ))}
                          {project.technologies.length > 3 && (
                            <Chip
                              label={`+${project.technologies.length - 3}`}
                              size="small"
                              className="project-tech-chip"
                              sx={{
                                background: (theme) => alpha(theme.palette.secondary.main, 0.04),
                                color: 'text.secondary',
                                fontWeight: 500,
                                fontSize: '0.75rem',
                                height: 22,
                                borderRadius: 1,
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(4px)',
                                border: '1px solid',
                                borderColor: (theme) => alpha(theme.palette.divider, 0.05),
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                                transform: 'translateY(0)',
                                '&:hover': {
                                  transform: 'translateY(-4px)',
                                }
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </MotionCard>
                ))}
              </motion.div>
            </Box>
          </Box>
        )}
      </Container>

      {/* Project Details Dialog */}
      <Dialog
        open={Boolean(selectedProject)}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            background: (theme) => alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(12px)',
            borderRadius: 3,
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            boxShadow: (theme) => `
              0 4px 30px ${alpha(theme.palette.common.black, 0.1)},
              0 0 40px ${alpha(theme.palette.primary.main, 0.1)}
            `,
          },
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(8px)',
          }
        }}
      >
        {selectedProject && (
          <>
            <DialogTitle sx={{ 
              pb: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 2
            }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {selectedProject.title}
                </Typography>
                <Chip
                  label={selectedProject.category}
                  size="small"
                  sx={{
                    background: (theme) => alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.main',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                  }}
                />
              </Box>
              <IconButton
                onClick={handleCloseDialog}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                    background: (theme) => alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ py: 2 }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mb: 1.5,
                    color: 'text.secondary',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                  }}
                >
                  Project Details
                </Typography>
                <Box sx={{ mb: 3 }}>
                  {selectedProject.description.map((detail, idx) => (
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
                        opacity: 0,
                        transform: 'translateX(-10px)',
                        animation: `fadeInSlide 0.3s ease forwards ${idx * 0.1}s`,
                        '@keyframes fadeInSlide': {
                          from: {
                            opacity: 0,
                            transform: 'translateX(-10px)'
                          },
                          to: {
                            opacity: 1,
                            transform: 'translateX(0)'
                          }
                        },
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
                      {detail}
                    </Typography>
                  ))}
                </Box>

                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mb: 1.5,
                    color: 'text.secondary',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                  }}
                >
                  Technologies Used
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1,
                  }}
                >
                  {selectedProject.technologies.map((tech, idx) => (
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
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};
