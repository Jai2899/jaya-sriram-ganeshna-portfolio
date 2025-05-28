import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  Container,
  Box,
  useTheme,
  alpha,
  Popper,
  Paper,
  Grow,
  MenuList,
  MenuItem,
  ClickAwayListener,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const navItems = [
  { name: "Home", href: "#jganeshna" },
  { name: "About", href: "#about" },
  {
    name: "Experience & Projects",
    items: [
      { name: "Experience", href: "#experience" },
      { name: "Projects", href: "#projects" },
    ],
  },
  { name: "Skills", href: "#skills" },
  {
    name: "Education & Research",
    items: [
      { name: "Education", href: "#education" },
      { name: "Research", href: "#research" },
    ],
  },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [anchorEls, setAnchorEls] = useState({});
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuOpen = (event, itemName) => {
    setAnchorEls((prev) => ({ ...prev, [itemName]: event.currentTarget }));
    setOpenMenus((prev) => ({ ...prev, [itemName]: true }));
  };

  const handleMenuClose = (itemName) => {
    setOpenMenus((prev) => ({ ...prev, [itemName]: false }));
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = window.innerWidth >= 960 ? 72 : 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      
      // For contact section, scroll to the bottom
      if (href === "#contact") {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth"
        });
      } else {
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth"
        });
      }
    }
  };

  const handleMobileItemClick = (href) => {
    setIsMenuOpen(false);
    if (href) {
      scrollToSection(href);
    }
  };

  const renderNavItem = (item, index) => {
    if (item.items) {
      return (
        <Box key={index} sx={{ position: "relative" }}>
          <Button
            aria-haspopup="true"
            onMouseEnter={(e) => handleMenuOpen(e, item.name)}
            onClick={(e) => handleMenuOpen(e, item.name)}
            sx={{
              color: "text.secondary",
              fontSize: "0.95rem",
              fontWeight: 500,
              letterSpacing: "0.01em",
              textTransform: "none",
              px: 2,
              py: 1,
              borderRadius: "12px",
              transition: "all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
              position: 'relative',
              "&:hover": {
                color: "primary.main",
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                '& .MuiSvgIcon-root': {
                  color: 'primary.main',
                }
              },
              ...(openMenus[item.name] && {
                color: "primary.main",
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              })
            }}
          >
            {item.name}
            <KeyboardArrowDownIcon 
              sx={{ 
                ml: 0.5, 
                fontSize: "1.1rem",
                transition: "transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
                transform: openMenus[item.name] ? "rotate(180deg)" : "rotate(0deg)",
                color: openMenus[item.name] ? 'primary.main' : 'inherit',
              }} 
            />
          </Button>
          <Popper
            open={openMenus[item.name] || false}
            anchorEl={anchorEls[item.name]}
            placement="bottom-start"
            transition
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, 8],
                },
              },
            ]}
            sx={{ 
              zIndex: 1200,
            }}
          >
            {({ TransitionProps }) => (
              <Grow 
                {...TransitionProps}
                style={{ transformOrigin: '0 0' }}
                timeout={{ 
                  enter: 150,
                  exit: 100
                }}
              >
                <Paper
                  onMouseLeave={() => handleMenuClose(item.name)}
                  sx={{
                    mt: 0.5,
                    bgcolor: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: "blur(16px)",
                    borderRadius: "12px",
                    boxShadow: `
                      0 2px 4px ${alpha(theme.palette.common.black, 0.02)},
                      0 12px 24px ${alpha(theme.palette.common.black, 0.08)},
                      0 0 0 1px ${alpha(theme.palette.common.white, 0.1)} inset
                    `,
                    border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                    overflow: "hidden",
                    '@keyframes dropdownEnter': {
                      from: {
                        opacity: 0,
                        transform: 'translateY(-4px)'
                      },
                      to: {
                        opacity: 1,
                        transform: 'translateY(0)'
                      }
                    },
                    animation: 'dropdownEnter 150ms ease-out forwards',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '100%',
                      background: `linear-gradient(180deg, 
                        ${alpha(theme.palette.primary.main, 0.02)} 0%, 
                        ${alpha(theme.palette.background.paper, 0)} 100%
                      )`,
                      pointerEvents: 'none',
                    }
                  }}
                >
                  <ClickAwayListener onClickAway={() => handleMenuClose(item.name)}>
                    <MenuList
                      sx={{
                        p: 0.5,
                        '& .MuiMenuItem-root + .MuiMenuItem-root': {
                          mt: '2px',
                        }
                      }}
                    >
                      {item.items.map((subItem, subIndex) => (
                        <MenuItem
                          key={subIndex}
                          onClick={() => {
                            handleMenuClose(item.name);
                            scrollToSection(subItem.href);
                          }}
                          sx={{
                            px: 2.5,
                            py: 1.5,
                            borderRadius: '8px',
                            fontSize: "0.95rem",
                            fontWeight: 500,
                            letterSpacing: "0.01em",
                            color: "text.secondary",
                            transition: "all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
                            position: 'relative',
                            overflow: 'hidden',
                            '&:before': {
                              content: '""',
                              position: 'absolute',
                              top: '50%',
                              left: '6px',
                              width: '4px',
                              height: '20px',
                              background: theme.palette.primary.main,
                              transform: 'translateY(-50%) scaleY(0)',
                              transition: 'transform 0.15s ease-in-out',
                              borderRadius: '4px',
                              opacity: 0,
                            },
                            "&:hover": {
                              color: "primary.main",
                              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                              pl: 3,
                              '&:before': {
                                transform: 'translateY(-50%) scaleY(1)',
                                opacity: 1,
                              }
                            },
                            "&:active": {
                              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                            }
                          }}
                        >
                          {subItem.name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
      );
    }

    return (
      <Button
        key={index}
        onClick={() => scrollToSection(item.href)}
        sx={{
          color: "text.secondary",
          fontSize: "0.95rem",
          fontWeight: 500,
          letterSpacing: "0.01em",
          textTransform: "none",
          px: 2,
          py: 1,
          borderRadius: "8px",
          transition: "all 0.2s ease",
          "&:hover": {
            color: "primary.main",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          },
        }}
      >
        {item.name}
      </Button>
    );
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: isScrolled
          ? alpha(theme.palette.background.paper, 0.85)
          : 'transparent',
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        borderBottom: isScrolled ? `1px solid ${alpha(theme.palette.divider, 0.08)}` : 'none',
        py: isScrolled ? 1 : 2,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            onClick={() => scrollToSection("#jganeshna")}
            sx={{
              fontWeight: 700,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              position: "relative",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              letterSpacing: "-0.02em",
              background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-1px)",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              },
            }}
          >
            JSG
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {navItems.map((item, index) => renderNavItem(item, index))}
          </Box>

          {/* Mobile Navigation */}
          <IconButton
            color="inherit"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            sx={{
              display: { md: "none" },
              color: "text.primary",
              p: 1,
              borderRadius: "12px",
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              },
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: "400px",
            bgcolor: alpha(theme.palette.background.default, 0.95),
            backdropFilter: "blur(10px)",
            borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
          <List sx={{ width: "100%" }}>
            {navItems.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                {item.items ? (
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        py: 2,
                        px: 2,
                        color: "text.primary",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Box sx={{ pl: 2 }}>
                      {item.items.map((subItem, subIndex) => (
                        <Button
                          key={subIndex}
                          fullWidth
                          onClick={() => handleMobileItemClick(subItem.href)}
                          sx={{
                            py: 1.5,
                            px: 2,
                            justifyContent: "flex-start",
                            color: "text.secondary",
                            fontSize: "1rem",
                            fontWeight: 500,
                            letterSpacing: "0.01em",
                            textTransform: "none",
                            borderRadius: "8px",
                            "&:hover": {
                              color: "primary.main",
                              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                            },
                          }}
                        >
                          {subItem.name}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                ) : (
                  <Button
                    fullWidth
                    onClick={() => handleMobileItemClick(item.href)}
                    sx={{
                      py: 2,
                      px: 2,
                      justifyContent: "flex-start",
                      color: "text.secondary",
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      letterSpacing: "0.01em",
                      textTransform: "none",
                      borderRadius: "8px",
                      "&:hover": {
                        color: "primary.main",
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};
