import { Box, Container, Typography, Button, Grid, Paper, useTheme, useMediaQuery } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@mui/system";

const iconFloat = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-3px) scale(1.05);
  }
`;

const iconPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(37, 99, 235, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
  }
`;

const glowAnimation = keyframes`
  0%, 100% {
    opacity: 0.4;
    filter: blur(8px);
  }
  50% {
    opacity: 0.6;
    filter: blur(12px);
  }
`;

export const AboutSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Helper function to render responsive card content
  const renderCardContent = (item) => {
    const isResponsive = isMobile || isTablet;

    return (
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: isResponsive ? "column" : "row",
          gap: isResponsive ? 2 : 2,
          alignItems: isResponsive ? "center" : "flex-start"
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 40,
            height: 40,
            minWidth: 40,
            borderRadius: "50%",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease-in-out",
            animation: `${iconFloat} 3s ease-in-out infinite`,
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: '-1.5px',
              borderRadius: 'inherit',
              padding: '1.5px',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              animation: `${iconPulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: '-6px',
              background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.2)}, transparent 70%)`,
              borderRadius: '50%',
              animation: `${glowAnimation} 3s ease-in-out infinite`,
              zIndex: -1,
            },
            '&:hover': {
              transform: 'scale(1.05)',
              '& svg': {
                transform: 'scale(1.1) rotate(360deg)',
              },
            },
            '& svg': {
              fontSize: 20,
              transition: 'transform 0.5s ease-in-out',
            },
          }}
        >
          {item.icon}
        </Box>
        <Box sx={{ textAlign: isResponsive ? "center" : "left" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {item.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {item.description}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      component="section"
      id="about"
      sx={{
        pt: { xs: 6, md: 6 },
        pb: { xs: 6, md: 8 },
        mt: { xs: 4, md: 6 },
        mb: { xs: 4, md: 6 },
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: { xs: "64px", md: "72px" },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '1px',
          background: (theme) => `linear-gradient(90deg, 
            transparent 0%,
            ${alpha(theme.palette.divider, 0.3)} 50%,
            transparent 100%
          )`,
          zIndex: 1,
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
            mb: 6,
            textAlign: "center",
          }}
        >
          About <Box component="span" sx={{ color: "primary.main" }}>Me</Box>
        </Typography>

        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Typography variant="h3" sx={{ fontSize: "1.5rem", fontWeight: 600, mb: 2 }}>
                Product Engineer
              </Typography>

              <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
                A results-driven Product Engineer with a Master's from the University of Waterloo, combining technical 
                innovation with practical solutions. I architect scalable applications that leverage cutting-edge 
                technologies in cloud computing, AI, and modern web development to solve complex business challenges.
              </Typography>

              <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
                Currently at VassuTech Services Inc., I lead the development of innovative platforms like Titlegenius 
                and DocVenture, where I've significantly improved system performance and driven business growth. My work 
                spans full-stack development, AI integration, and cloud solutions, consistently delivering secure and 
                user-centric applications that solve complex business challenges.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {[
                {
                  icon: <CodeIcon sx={{ fontSize: 24 }} />,
                  title: "Full-Stack Development",
                  description:
                    "Expert in modern web technologies including React, Node.js, and TypeScript, with experience in building scalable cloud solutions.",
                },
                {
                  icon: <WorkIcon sx={{ fontSize: 24 }} />,
                  title: "Product Engineering",
                  description:
                    "Leading end-to-end product development with focus on performance optimization, security, and exceptional user experience.",
                },
                {
                  icon: <PersonIcon sx={{ fontSize: 24 }} />,
                  title: "AI & Cloud Integration",
                  description:
                    "Implementing innovative solutions using LangChain, LLMs, and cloud services for intelligent document processing and automation.",
                },
              ].map((item, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: 3,
                    },
                  }}
                >
                  {renderCardContent(item)}
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "center",
            mt: 6,
          }}
        >
          <Button
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("contact");
              if (element) {
                const offset = window.innerWidth >= 960 ? 72 : 64;
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                  top: elementPosition - offset,
                  behavior: "smooth"
                });
              }
            }}
            variant="contained"
            sx={{
              borderRadius: "9999px",
              px: 3,
              py: 1,
              textTransform: "none",
            }}
          >
            Get In Touch
          </Button>

          <Button
            component="a"
            href="https://drive.google.com/uc?export=download&id=1tiDdA4QAU-bOpH_VZgcGyQXdi23PWBKj"
            download="Jaya_Sriram_Ganeshna_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            sx={{
              borderRadius: "9999px",
              px: 3,
              py: 1,
              textTransform: "none",
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "primary.contrastText",
              },
            }}
          >
            Download CV
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
