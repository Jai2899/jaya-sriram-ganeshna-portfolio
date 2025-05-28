import { Box, Container, Typography, IconButton, Grid, Link, Stack, alpha, useTheme, TextField, Button, Snackbar, Alert } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import { keyframes } from "@mui/system";
import React, { useState } from "react";

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const slideInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
`;

const ribbonAnimation = keyframes`
  0% { transform: translateX(-100%) rotate(-45deg); }
  100% { transform: translateX(0) rotate(-45deg); }
`;

export const Footer = () => {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Validation state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Touched state
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          return "Please enter a valid email";
        }
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Validate all fields
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message)
    };

    setTouched({
      name: true,
      email: true,
      message: true
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      setSnackbarMessage("Please fix the errors in the form");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    setIsSubmitting(true);

    // Send to FormSubmit using fetch
    fetch("https://formsubmit.co/ajax/gjayasriram@gmail.com", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: "New Portfolio Contact Form Submission",
        _template: "table"
      })
    })
    .then(response => response.json())
    .then(data => {
      setSnackbarMessage("Message sent! I'll get back to you soon.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      setTouched({
        name: false,
        email: false,
        message: false
      });
    })
    .catch(error => {
      setSnackbarMessage("Failed to send message. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = window.innerWidth >= 960 ? 72 : 64; // Match with scrollMarginTop values
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  const quickLinks = [
    { name: "About", href: "#about", icon: "01" },
    { name: "Experience", href: "#experience", icon: "02" },
    { name: "Projects", href: "#projects", icon: "03" },
    { name: "Skills", href: "#skills", icon: "04" },
  ];

  const socialLinks = [
    { 
      icon: <GitHubIcon />, 
      href: "https://github.com/Jai2899", 
      label: "GitHub",
      color: "#333"
    },
    { 
      icon: <LinkedInIcon />, 
      href: "https://linkedin.com/in/jaya-sriram-g", 
      label: "LinkedIn",
      color: "#0077b5"
    },
    { 
      icon: <XIcon />, 
      href: "https://x.com/J_a_ii", 
      label: "X (formerly Twitter)",
      color: "#000000"
    },
    { 
      icon: <InstagramIcon />, 
      href: "https://www.instagram.com/j_a_ii/", 
      label: "Instagram",
      color: "#E4405F"
    },
  ];

  const contactInfo = [
    {
      icon: <LocationOnIcon />,
      text: "Mississauga, Ontario Canada",
      href: "https://maps.app.goo.gl/8bP5B4csQF4gstad6",
      label: "Location"
    },
    {
      icon: <PhoneIcon />,
      text: "+1 (647) 382-5788",
      href: "tel:+16473825788",
      label: "Phone"
    },
    {
      icon: <EmailIcon />,
      text: "gjayasriram@gmail.com",
      href: "mailto:gjayasriram@gmail.com",
      label: "Email"
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        borderTop: "1.5px solid",
        borderColor: "divider",
        mt: 8,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          
          //backdropFilter: "blur(10px)",
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={4} 
          sx={{ 
            py: 2,
            px: { xs: 2, md: 4 },
            position: "relative",
          }}
        >
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                background: (theme) => `linear-gradient(145deg, 
                  ${alpha(theme.palette.background.paper, 0.6)}, 
                  ${alpha(theme.palette.background.paper, 0.4)}
                )`,
                backdropFilter: "blur(10px)",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                },
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 600, 
                  color: "primary.main",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: 40,
                    height: 2,
                    background: (theme) => `linear-gradient(90deg, 
                      ${theme.palette.primary.main}, 
                      ${alpha(theme.palette.primary.main, 0)}
                    )`,
                  }
                }}
              >
                Quick Links
              </Typography>
              <Stack spacing={1.5}>
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    onClick={e => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 1.5,
                      borderRadius: 1,
                      transition: "all 0.3s ease-in-out",
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "inherit",
                        background: (theme) => alpha(theme.palette.primary.main, 0.05),
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      },
                      "&:hover": {
                        color: "primary.main",
                        transform: "translateX(5px)",
                        "&::before": { opacity: 1 },
                        "& .number": { color: "primary.main" },
                        "& .arrow": { 
                          opacity: 1, 
                          transform: "translateX(0)",
                        },
                      },
                    }}
                  >
                    <Typography
                      className="number"
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "text.disabled",
                        transition: "color 0.3s ease",
                        width: 24,
                      }}
                    >
                      {link.icon}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        flex: 1,
                      }}
                    >
                      {link.name}
                    </Typography>
                    <ArrowForwardIcon 
                      className="arrow"
                      sx={{
                        fontSize: 16,
                        opacity: 0,
                        transform: "translateX(-10px)",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </Link>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                background: (theme) => `linear-gradient(145deg, 
                  ${alpha(theme.palette.background.paper, 0.6)}, 
                  ${alpha(theme.palette.background.paper, 0.4)}
                )`,
                backdropFilter: "blur(10px)",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                },
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 600, 
                  color: "primary.main",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: 40,
                    height: 2,
                    background: (theme) => `linear-gradient(90deg, 
                      ${theme.palette.primary.main}, 
                      ${alpha(theme.palette.primary.main, 0)}
                    )`,
                  }
                }}
              >
                Contact
              </Typography>
              <Stack spacing={2.5}>
                {contactInfo.map((info, index) => (
                  <Link
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 1.5,
                      borderRadius: 1,
                      transition: "all 0.3s ease-in-out",
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "inherit",
                        background: (theme) => alpha(theme.palette.primary.main, 0.05),
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      },
                      "&:hover": {
                        color: "primary.main",
                        transform: "translateX(5px)",
                        "&::before": {
                          opacity: 1,
                        },
                        "& .icon": {
                          transform: "scale(1.1)",
                          color: "primary.main",
                        },
                        "& .text": {
                          color: "primary.main",
                          animation: `${slideInAnimation} 0.3s ease forwards`,
                        }
                      },
                    }}
                    aria-label={info.label}
                  >
                    <Box
                      className="icon"
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: (theme) => alpha(theme.palette.primary.main, 0.1),
                        color: "text.secondary",
                        transition: "all 0.3s ease",
                        "& svg": {
                          fontSize: 20,
                        }
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Typography
                      className="text"
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {info.text}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Connect */}
          <Grid item xs={12} sm={6} md={2}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                background: (theme) => `linear-gradient(145deg, 
                  ${alpha(theme.palette.background.paper, 0.6)}, 
                  ${alpha(theme.palette.background.paper, 0.4)}
                )`,
                backdropFilter: "blur(10px)",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                },
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 600, 
                  color: "primary.main",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: 40,
                    height: 2,
                    background: (theme) => `linear-gradient(90deg, 
                      ${theme.palette.primary.main}, 
                      ${alpha(theme.palette.primary.main, 0)}
                    )`,
                  }
                }}
              >
                Connect
              </Typography>
              <Stack 
                direction={{ xs: "row", sm: "column" }}
                spacing={2} 
                sx={{ 
                  flexWrap: "nowrap",
                  gap: { xs: 1, sm: 2 },
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                {socialLinks.map((social, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: -4,
                        background: (theme) => `radial-gradient(circle, ${alpha(social.color, 0.15)}, transparent 70%)`,
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        borderRadius: "50%",
                      },
                      "&:hover::before": {
                        opacity: 1,
                      },
                    }}
                  >
                    <IconButton
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      sx={{
                        color: "text.secondary",
                        background: (theme) => alpha(theme.palette.primary.main, 0.1),
                        backdropFilter: "blur(4px)",
                        transition: "all 0.3s ease-in-out",
                        width: { xs: 36, sm: 40 },
                        height: { xs: 36, sm: 40 },
                        "& svg": {
                          fontSize: { xs: 18, sm: 20 },
                        },
                        "&:hover": {
                          color: social.color,
                          transform: "translateY(-3px)",
                          background: (theme) => alpha(theme.palette.background.paper, 0.8),
                          "& svg": {
                            animation: `${scaleAnimation} 0.4s ease-in-out`,
                          },
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Get in Touch Form */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              component="form"
              id="contact"
              onSubmit={handleSubmit}
              sx={{
                p: 3,
                borderRadius: 2,
                background: (theme) => `linear-gradient(145deg, 
                  ${alpha(theme.palette.background.paper, 0.6)}, 
                  ${alpha(theme.palette.background.paper, 0.4)}
                )`,
                backdropFilter: "blur(10px)",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s ease-in-out",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                },
              }}
            >
              <input type="hidden" name="_template" value="table" />
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 600, 
                  color: "primary.main",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: 40,
                    height: 2,
                    background: (theme) => `linear-gradient(90deg, 
                      ${theme.palette.primary.main}, 
                      ${alpha(theme.palette.primary.main, 0)}
                    )`,
                  }
                }}
              >
                Get in Touch
              </Typography>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: (theme) => alpha(theme.palette.background.paper, 0.6),
                      backdropFilter: "blur(4px)",
                    }
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: (theme) => alpha(theme.palette.background.paper, 0.6),
                      backdropFilter: "blur(4px)",
                    }
                  }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.message && Boolean(errors.message)}
                  helperText={touched.message && errors.message}
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: (theme) => alpha(theme.palette.background.paper, 0.6),
                      backdropFilter: "blur(4px)",
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    py: 1,
                    px: 3,
                    background: (theme) => `linear-gradient(135deg, 
                      ${theme.palette.primary.main}, 
                      ${theme.palette.secondary.main}
                    )`,
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </Stack>
            </Box>
          </Grid>

          {/* Snackbar for notifications */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setOpenSnackbar(false)}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            py: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            px: { xs: 2, sm: 0 },
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: "text.secondary",
              background: (theme) => `linear-gradient(45deg, 
                ${theme.palette.primary.main}, 
                ${theme.palette.secondary.main}
              )`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 500,
              flex: 1,
              textAlign: { xs: "center", lg: "left" },
            }}
          >
            © {new Date().getFullYear()} Jaya Sriram. All rights reserved.
          </Typography>

          <IconButton
            href="#jganeshna"
            aria-label="Scroll to top"
            sx={{
              display: { xs: "none", lg: "flex" },
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              color: "primary.main",
              backdropFilter: "blur(4px)",
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                animation: `${pulseAnimation} 1s ease-in-out infinite`,
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};
