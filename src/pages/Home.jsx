import { Box, Container, useTheme } from '@mui/material';
import { Navbar } from "@/components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { HomeSection } from "@/components/HomeSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ResearchSection } from "@/components/ResearchSection";
import { EducationSection } from "@/components/EducationSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Footer } from "@/components/Footer";
import { alpha } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

const NAVBAR_HEIGHT = { xs: "64px", md: "72px" }; // Define navbar height for different breakpoints

const gradientAnimation = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

export const Home = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        
        color: 'text.primary',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // Prevent any potential horizontal scroll
      }}
    >
      {/* Fixed Position Elements */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <Navbar />
      </Box>

      {/* Background Effects - Fixed */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <StarBackground />
      </Box>

      {/* Main Content - Scrollable Area */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          zIndex: 1,
          mt: NAVBAR_HEIGHT,
          height: `calc(100vh - ${NAVBAR_HEIGHT.xs})`,
          overflowY: 'auto',
          overflowX: 'hidden',
          
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: (theme) => alpha(theme.palette.primary.main, 0.2),
            borderRadius: '4px',
            '&:hover': {
              background: (theme) => alpha(theme.palette.primary.main, 0.3),
            },
          },
          '@media (min-width: 900px)': {
            height: `calc(100vh - ${NAVBAR_HEIGHT.md})`,
          },
          '& > section': {
            position: 'relative',
            py: { xs: 16, md: 20 },
            '&:nth-of-type(odd)': {
              background: 'transparent',
            },
            '&:nth-of-type(even)': {
              background: 'transparent',
              '&::before': {
                display: 'none',
              },
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              height: '1px',
              background: (theme) => `linear-gradient(90deg,
                transparent 0%,
                ${alpha(theme.palette.divider, 0.15)} 50%,
                transparent 100%
              )`,
              marginBottom: { xs: 8, md: 10 },
            },
            '& + section': {
              mt: { xs: 8, md: 10 },
            },
            // Special spacing for specific sections
            '#jganeshna': {
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              py: 0,
              '&::after': {
                display: 'none', // Remove divider from hero section
              },
            },
            '#about': {
              mt: { xs: 8, md: 10 },
            },
          },
        }}
      >
        <Container 
          component="main" 
          maxWidth="lg"
          sx={{
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
          }}
        >
          <HomeSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <EducationSection />
          <ResearchSection />
        </Container>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};
