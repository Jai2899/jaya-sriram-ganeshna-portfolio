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
  Divider,
  useMediaQuery,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';
import GradeIcon from '@mui/icons-material/Grade';
import MenuBookIcon from '@mui/icons-material/MenuBook';
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
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ribbonAnimation = keyframes`
  0% { transform: rotate(-45deg) translateX(-5px); }
  50% { transform: rotate(-45deg) translateX(5px); }
  100% { transform: rotate(-45deg) translateX(-5px); }
`;

const sparkleAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0; }
`;

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const education = [
  {
    degree: {
      main: "Master of Engineering",
      specialization: "Electrical & Computer Engineering"
    },
    school: "University of Waterloo",
    year: "2022",
    location: "Waterloo, CA",
    details: [
      "GPA: 4.0/4.0",
      "Specialization in Software",
      "Graduate Certificate in Business and Entrepreneurship from Conrad School",
    ],
    courses: [
      "Foundations of Software Engineering",
      "Methods & Tools for Software Engineering",
      "Database Systems",
      "Software Testing, Q.A & Maintenance"
    ]
  },
  {
    degree: {
      main: "Bachelor of Technology",
      specialization: "Computer Science & Engineering"
    },
    school: "GITAM Deemed University",
    year: "2020",
    location: "Hyderabad, IN",
    details: [
      "GPA: 9.29/10.0",
      "Gold Medal recipient for Academic and Co-curricular Excellence"
    ],
    courses: [
      "Cloud Computing",
      "Artificial Intelligence",
      "Operating Systems",
      "Computer Networks"
    ]
  },
];

export const EducationSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [selectedEducation, setSelectedEducation] = useState(null);

  const handleOpenDialog = (edu) => {
    setSelectedEducation(edu);
  };

  const handleCloseDialog = () => {
    setSelectedEducation(null);
  };

  const { ref: dialogRef, isDragging } = useSwipeToDismiss({
    onDismiss: handleCloseDialog,
    threshold: 0.3
  });

  // Helper function to render mobile/tablet card
  const renderResponsiveCard = (edu, index) => (
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleOpenDialog(edu)}
                sx={{
                  background: (theme) => alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: "blur(10px)",
                  borderRadius: 2,
                  boxShadow: 1,
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
                  },
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
      {edu.school === "GITAM Deemed University" && (
        <Box
          sx={{
            position: 'absolute',
            top: 15,
            left: -30,
            width: 120,
            height: 25,
            background: (theme) => `linear-gradient(45deg, 
              ${alpha('#FFD700', 0.9)},
              ${alpha('#FDB931', 0.9)}
            )`,
            transform: 'rotate(-45deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            animation: `${ribbonAnimation} 3s ease-in-out infinite`,
            '&::before': {
              content: '"Gold Medal"',
              color: '#000',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }
          }}
        />
      )}
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
              '.sparkle': {
                position: 'absolute',
                width: 20,
                height: 20,
                pointerEvents: 'none',
                '&::before, &::after': {
                  content: '""',
                  position: 'absolute',
                  background: (theme) => theme.palette.primary.main,
                  borderRadius: '50%',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
                '&::before': {
                  width: '100%',
                  height: 2,
                },
                '&::after': {
                  width: 2,
                  height: '100%',
                },
                '&:nth-of-type(1)': {
                  top: 0,
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(0deg)',
                },
                '&:nth-of-type(2)': {
                  top: '50%',
                  right: 0,
                  transform: 'translate(50%, -50%) rotate(90deg)',
                },
                '&:nth-of-type(3)': {
                  bottom: 0,
                  left: '50%',
                  transform: 'translate(-50%, 50%) rotate(0deg)',
                },
                '&:nth-of-type(4)': {
                  top: '50%',
                  left: 0,
                  transform: 'translate(-50%, -50%) rotate(90deg)',
                },
              },
              '.education-icon': {
                fontSize: 36,
                color: 'primary.main',
                transition: 'all 0.3s ease',
                zIndex: 1,
              },
              '&:hover': {
                transform: 'scale(1.05)',
                '&::before': {
                  opacity: 1,
                },
                '&::after': {
                  opacity: 0.5,
                },
                '.education-icon': {
                  transform: 'scale(1.1)',
                  color: (theme) => theme.palette.primary.main,
                  animation: `${rotateAnimation} 4s linear infinite`,
                },
                '.sparkle': {
                  '&::before, &::after': {
                    opacity: 0.5,
                    animation: `${sparkleAnimation} 1.5s ease-in-out infinite`,
                  },
                  '&:nth-of-type(1)::before, &:nth-of-type(1)::after': {
                    animationDelay: '0s',
                  },
                  '&:nth-of-type(2)::before, &:nth-of-type(2)::after': {
                    animationDelay: '0.4s',
                  },
                  '&:nth-of-type(3)::before, &:nth-of-type(3)::after': {
                    animationDelay: '0.8s',
                  },
                  '&:nth-of-type(4)::before, &:nth-of-type(4)::after': {
                    animationDelay: '1.2s',
                  },
                },
              },
              transition: 'all 0.3s ease',
            }}
          >
            <Box className="sparkle" />
            <Box className="sparkle" />
            <Box className="sparkle" />
            <Box className="sparkle" />
            <SchoolIcon className="education-icon" />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          textAlign: 'center',
                          fontSize: { xs: '1.1rem', sm: '1.25rem' },
                          lineHeight: 1.3,
                          mb: 0.5
                        }}
                      >
                        {edu.degree.main}
                      </Typography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          textAlign: 'center',
                          fontSize: { xs: '1rem', sm: '1.15rem' },
                          color: 'text.secondary',
                          mb: 1
                        }}
                      >
                        {edu.degree.specialization}
                      </Typography>
                      <Typography variant="subtitle2" color="primary.main" sx={{ mb: 0.5, textAlign: 'center' }}>
                        {edu.school}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 2,
                          mb: 1
                        }}
                      >
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: (theme) => 
                               `linear-gradient(120deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
                            borderRadius: '4px',
                            py: 0.25,
                            px: 1,
                            minWidth: '90px',
                            textAlign: 'center'
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'primary.main',
                              fontWeight: 500,
                              fontSize: '0.8rem',
                              letterSpacing: '0.02em'
                            }}
                          >
                            GPA: {edu.school === "GITAM Deemed University" ? "9.29/10" : "4.0/4.0"}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                        {edu.year} • {edu.location}
                      </Typography>
                    </Box>
        </Box>
      </CardContent>
    </MotionCard>
  );

  // Helper function to render desktop card
  const renderDesktopCard = (edu, index) => (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={() => handleOpenDialog(edu)}
      sx={{
        background: (theme) => alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(10px)",
        borderRadius: 2,
        boxShadow: 1,
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
        },
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        transition: 'all 0.3s ease',
      }}
    >
      <CardContent sx={{ pl: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
              '.sparkle': {
                position: 'absolute',
                width: 16,
                height: 16,
                pointerEvents: 'none',
                '&::before, &::after': {
                  content: '""',
                  position: 'absolute',
                  background: (theme) => theme.palette.primary.main,
                  borderRadius: '50%',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
                '&::before': {
                  width: '100%',
                  height: 2,
                },
                '&::after': {
                  width: 2,
                  height: '100%',
                },
                '&:nth-of-type(1)': {
                  top: 0,
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(0deg)',
                },
                '&:nth-of-type(2)': {
                  top: '50%',
                  right: 0,
                  transform: 'translate(50%, -50%) rotate(90deg)',
                },
                '&:nth-of-type(3)': {
                  bottom: 0,
                  left: '50%',
                  transform: 'translate(-50%, 50%) rotate(0deg)',
                },
                '&:nth-of-type(4)': {
                  top: '50%',
                  left: 0,
                  transform: 'translate(-50%, -50%) rotate(90deg)',
                },
              },
              '.education-icon': {
                fontSize: 28,
                color: 'primary.main',
                transition: 'all 0.3s ease',
                zIndex: 1,
              },
              '&:hover': {
                transform: 'scale(1.05)',
                '&::before': {
                  opacity: 1,
                },
                '&::after': {
                  opacity: 0.5,
                },
                '.education-icon': {
                  transform: 'scale(1.1)',
                  color: (theme) => theme.palette.primary.main,
                  animation: `${rotateAnimation} 4s linear infinite`,
                },
                '.sparkle': {
                  '&::before, &::after': {
                    opacity: 0.5,
                    animation: `${sparkleAnimation} 1.5s ease-in-out infinite`,
                  },
                  '&:nth-of-type(1)::before, &:nth-of-type(1)::after': {
                    animationDelay: '0s',
                  },
                  '&:nth-of-type(2)::before, &:nth-of-type(2)::after': {
                    animationDelay: '0.4s',
                  },
                  '&:nth-of-type(3)::before, &:nth-of-type(3)::after': {
                    animationDelay: '0.8s',
                  },
                  '&:nth-of-type(4)::before, &:nth-of-type(4)::after': {
                    animationDelay: '1.2s',
                  },
                },
              },
              transition: 'all 0.3s ease',
            }}
          >
            <Box className="sparkle" />
            <Box className="sparkle" />
            <Box className="sparkle" />
            <Box className="sparkle" />
            <SchoolIcon className="education-icon" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                fontSize: '1.25rem',
                lineHeight: 1.3,
                mb: 0.5
              }}
            >
              {edu.degree.main}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                fontSize: '1.15rem',
                color: 'text.secondary',
                mb: 1
              }}
            >
              {edu.degree.specialization}
            </Typography>
            <Typography variant="subtitle2" color="primary.main" sx={{ mb: 0.5, textAlign: 'center' }}>
              {edu.school}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                mb: 1,
                width: '100%'
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: (theme) => 
                     `linear-gradient(120deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
                  borderRadius: '4px',
                  py: 0.25,
                  px: 1,
                  minWidth: '90px',
                  textAlign: 'center'
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 500,
                    fontSize: '0.8rem',
                    letterSpacing: '0.02em',
                    width: '100%',
                    textAlign: 'center'
                  }}
                >
                  GPA: {edu.school === "GITAM Deemed University" ? "9.29/10" : "4.0/4.0"}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
                        {edu.year} • {edu.location}
                      </Typography>
                    </Box>
                    {edu.school === "GITAM Deemed University" && (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '150%',
                            height: '150%',
                            background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.warning.main, 0.15)} 0%, transparent 70%)`,
                            filter: 'blur(8px)',
                            zIndex: 0,
                          }
                        }}
                      >
                        <EmojiEventsIcon 
                          sx={{ 
                            fontSize: 40, 
                            color: '#FFD700',
                            filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))',
                            animation: `${pulseAnimation} 2s infinite`,
                            zIndex: 1
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </MotionCard>
  );

  return (
    <Box
      component="section"
      id="education"
      sx={{
        pt: { xs: 6, md: 6 },
        pb: { xs: 6, md: 8 },
        mt: { xs: 4, md: 6 },
        mb: { xs: 4, md: 6 },
        position: 'relative',
        scrollMarginTop: { xs: "64px", md: "72px" },
        overflow: 'hidden',
        background: 'transparent',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: (theme) => `radial-gradient(circle at 50% 50%,
            ${alpha(theme.palette.primary.main, 0.03)} 0%,
            ${alpha(theme.palette.secondary.main, 0.03)} 100%
          )`,
          opacity: 0,
          zIndex: -1,
        },
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
          Academic Background
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
          }}
        >
          Educational journey and academic achievements in Computer Science and Engineering.
        </Typography>

        <Grid container spacing={4}>
          {education.map((edu, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
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
              {(isMobile || isTablet) ? renderResponsiveCard(edu, index) : renderDesktopCard(edu, index)}
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Education Details Dialog */}
      <Dialog
        open={Boolean(selectedEducation)}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        TransitionComponent={Grow}
        TransitionProps={{ timeout: 300 }}
        PaperProps={{
          sx: {
            background: (theme) => alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            overflow: 'hidden',
          }
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(8px)',
          }
        }}
      >
        {selectedEducation && (
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
                  {selectedEducation.degree.main}
                </Typography>
                <Typography variant="subtitle1" color="primary.main" sx={{ mb: 1 }}>
                  {selectedEducation.degree.specialization}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {selectedEducation.school}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      background: (theme) => alpha(theme.palette.primary.main, 0.08),
                      color: 'primary.main',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1.5,
                      fontSize: '0.85rem',
                      fontWeight: 500,
                    }}
                  >
                    {selectedEducation.year} • {selectedEducation.location}
                  </Box>
                </Box>
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
                  Achievements & Details
                </Typography>
                <Box sx={{ mb: 3 }}>
                  {selectedEducation.details.map((detail, idx) => (
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
                  Key Courses
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1,
                  }}
                >
                  {selectedEducation.courses.map((course, idx) => (
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
                      {course}
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