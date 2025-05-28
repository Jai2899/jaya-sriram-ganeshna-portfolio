import {
  Box,
  Typography,
  Button,
  Container,
  keyframes,
  useTheme,
  alpha,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Stack,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import { useState } from "react";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(-10px) translateX(-50%);
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

const typing = keyframes`
  0%, 100% {
    width: 0;
  }
  30%, 60% {
    width: 17ch;  /* Width for "Hi, I'm Jaya Sriram" */
  }
`;

// Blinking cursor keyframes
const blink = keyframes`
  0%, 100% {
    border-color: transparent;
  }
  50% {
    border-color: ${theme => theme.palette.primary.main};
  }
`;

const underlineReveal = keyframes`
  from { 
    opacity: 0; 
    width: 0%; 
  }
  to { 
    opacity: 1; 
    width: 100%; 
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

export const HomeSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (section) => {
    handleClose();
    const element = document.getElementById(section);
    if (element) {
      const offset = window.innerWidth >= 960 ? 72 : 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      const offset = window.innerWidth >= 960 ? 72 : 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  const scrollToContact = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  };

  const renderExploreButton = () => {
    if (isMobile) {
      return (
        <Button
          variant="contained"
          size="medium"
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '1.2rem' }} />}
          sx={{
            minWidth: 'auto',
            px: 2.5,
            py: 1,
            fontSize: '0.95rem',
            fontWeight: 600,
            borderRadius: 2,
            background: (theme) => `linear-gradient(135deg, 
              ${theme.palette.primary.main}, 
              ${theme.palette.secondary.main}
            )`,
            boxShadow: 'none',
            textTransform: 'none',
            letterSpacing: '0.5px',
            transition: 'transform 0.2s ease',
            '&:active': {
              transform: 'scale(0.98)',
              boxShadow: 'none',
            },
            '&::before': {
              display: 'none'
            }
          }}
        >
          Explore
        </Button>
      );
    }

    return (
      <Button
        variant="contained"
        size="large"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          px: 4,
          py: 2,
          fontSize: "1.1rem",
          fontWeight: 600,
          minWidth: 200,
          transition: "all 0.3s ease-in-out",
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: (theme) => `linear-gradient(135deg, 
              ${alpha(theme.palette.primary.main, 0.1)},
              ${alpha(theme.palette.secondary.main, 0.1)}
            )`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            borderRadius: 'inherit',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            '&::before': {
              opacity: 1,
            },
          },
        }}
      >
        Explore My Journey
      </Button>
    );
  };

  return (
    <Box
      id="jganeshna"
      component="section"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        overflow: "hidden",
        pb: 8,
        //pt: { xs: 8, md: 4 },
        scrollMarginTop: { xs: "56px", md: "64px" },
      }}
    >
      {/* Background Glow - Simple static version */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          opacity: 0.1,
          background: `radial-gradient(circle at center, ${alpha(
            theme.palette.primary.main,
            0.2
          )} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{ textAlign: "center", zIndex: 1, py: { xs: 8, md: 0 } }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Main Heading */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                
                background: `linear-gradient(135deg, 
                  ${theme.palette.primary.light} 0%,
                  ${theme.palette.primary.main} 25%,
                  ${theme.palette.secondary.main} 50%,
                  ${theme.palette.primary.main} 75%,
                  ${theme.palette.primary.light} 100%)`,
                backgroundSize: "400% 400%",
                animation: `${shimmer} 8s linear infinite`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                position: "relative",
                display: "inline-block",
              }}
            >
              Hi, I'm Jaya Sriram 
            </Typography>

            {/* Subheading */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                opacity: 0,
                mb:2,
                background: `linear-gradient(-45deg, 
                  ${theme.palette.secondary.light} 0%,
                  ${theme.palette.secondary.main} 25%,
                  ${theme.palette.primary.main} 50%,
                  ${theme.palette.secondary.main} 75%,
                  ${theme.palette.secondary.light} 100%)`,
                backgroundSize: "400% 400%",
                animation: `
                  ${fadeIn} 0.7s ease-out 0.4s forwards,
                  ${shimmer} 8s linear infinite
                `,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: `0 0 20px ${alpha(theme.palette.secondary.main, 0.3)}`,
                position: "relative",
              }}
            >
              Product Engineer
            </Typography>

            {/* Description */}
            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                maxWidth: "42rem",
                mx: "auto",
                animation: `${fadeIn} 0.7s ease-out 0.6s forwards`,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                lineHeight: 1.6,
                opacity: 0,
              }}
            >
              I specialize in architecting and developing scalable software
              solutions with modern technologies. Currently building innovative
              products at VassuTech Services Inc.
            </Typography>
          </Box>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexWrap: "wrap",
              animation: `${fadeIn} 0.7s ease-out 0.8s forwards`,
              opacity: 0,
              mb: 2,
            }}
          >
            {renderExploreButton()}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              PaperProps={{
                elevation: 3,
                sx: {
                  background: (theme) => alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  minWidth: 200,
                  '& .MuiMenuItem-root': {
                    py: 1.5,
                    px: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: (theme) => alpha(theme.palette.primary.main, 0.08),
                      '& .MuiListItemIcon-root': {
                        color: 'primary.main',
                      },
                    },
                  },
                },
              }}
            >
              <MenuItem onClick={() => handleMenuItemClick('experience')}>
                <ListItemIcon>
                  <WorkIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Professional Experience"
                  secondary="View my work history"
                />
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('projects')}>
                <ListItemIcon>
                  <SchoolIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Academic Projects"
                  secondary="Research & coursework"
                />
              </MenuItem>
            </Menu>
          </Box>

          {/* Social Icons */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              animation: `${fadeIn} 0.7s ease-out 1s forwards`,
              opacity: 0,
              position: "relative",
              zIndex: 2,
            }}
          >
            {[
              {
                icon: <GitHubIcon />,
                href: "https://github.com/Jai2899",
              },
              {
                icon: <LinkedInIcon />,
                href: "https://linkedin.com/in/jaya-sriram-g",
              },
              {
                icon: <EmailIcon />,
                href: "mailto:gjayasriram@gmail.com",
              },
            ].map((social, index) => (
              <Button
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  
                  width: 36,
                  height: 60,
                  borderRadius: "50%",
                  color: "text.secondary",
                  border: "2px solid",
                  borderColor: "divider",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: "primary.main",
                    color: "primary.main",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                {social.icon}
              </Button>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Scroll Down Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 40, md: 40 },
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: `${float} 2s ease-in-out infinite`,
          cursor: "pointer",
          zIndex: 1,
        }}
        onClick={() => {
          const element = document.getElementById("about");
          if (element) {
            const offset = window.innerWidth >= 960 ? 72 : 64;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: elementPosition - offset,
              behavior: "smooth"
            });
          }
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 1,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontSize: "0.75rem",
          }}
        >
          Scroll Down
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: "primary.main",
            fontSize: 24,
            filter: "drop-shadow(0 0 8px rgba(37, 99, 235, 0.3))",
          }}
        />
      </Box>
    </Box>
  );
};
