import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Link,
  Grid,
  alpha,
  useTheme,
  Chip,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Grow,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from "framer-motion";
import { keyframes } from '@emotion/react';
import { useState } from "react";

const MotionCard = motion(Card);

const ribbonAnimation = keyframes`
  0% { transform: rotate(-45deg) translateX(-5px); }
  50% { transform: rotate(-45deg) translateX(5px); }
  100% { transform: rotate(-45deg) translateX(-5px); }
`;

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const glowAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const papers = [
  {
    title: "BertRLFuzzer: A BERT and Reinforcement Learning Based Fuzzer",
    authors: "Piyush Jha, Joseph Scott, Jaya Sriram Ganeshna, Mudit Singh, Vijay Ganesh",
    journal: "Association for the Advancement of Artificial Intelligence",
    year: "2024",
    link: "https://arxiv.org/pdf/2305.12534",
    tags: ["Machine Learning", "Security", "BERT", "Reinforcement Learning"]
  },
  {
    title: "Utilization Of Support Vector Machine For Analyzing Women Safety In Indian States",
    authors: "Y.Md.Riyazuddin, G. Jaya Sriram, P. Mallikarjuna Vaibhav, I. Vikranth",
    journal: "International Journal of Grid and Distributed Computing",
    year: "2020",
    link: "http://sersc.org/journals/index.php/IJGDC/article/view/29977",
    tags: ["Machine Learning", "Data Analysis", "SVM", "Social Impact"]
  },
];

export const ResearchSection = () => {
  const theme = useTheme();
  const [selectedPaper, setSelectedPaper] = useState(null);

  const handleOpenDialog = (paper) => {
    setSelectedPaper(paper);
  };

  const handleCloseDialog = () => {
    setSelectedPaper(null);
  };

  return (
    <Box
      component="section"
      id="research"
      sx={{
        pt: { xs: 6, md: 6 },
        pb: { xs: 6, md: 8 },
        mt: { xs: 4, md: 6 },
        mb: { xs: 4, md: 6 },
        position: 'relative',
        scrollMarginTop: { xs: "64px", md: "72px" },
        overflow: 'hidden',
        background: (theme) => `linear-gradient(135deg, 
          ${alpha(theme.palette.primary.main, 0)} 0%, 
          ${alpha(theme.palette.secondary.main, 0)} 50%,
          ${alpha(theme.palette.primary.main, 0)} 100%
        )`,
        backgroundSize: '200% 200%',
        animation: `${glowAnimation} 15s ease infinite`,
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
          Research Publications
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
          Contributing to academic research in machine learning, security, and data analysis.
        </Typography>

        <Grid container spacing={4}>
          {papers.map((paper, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleOpenDialog(paper)}
                sx={{
                  position: 'relative',
                  background: (theme) => `linear-gradient(135deg, 
                    ${alpha(theme.palette.background.paper, 0.7)} 0%, 
                    ${alpha(theme.palette.background.paper, 0.5)} 100%
                  )`,
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  height: '100%',
                  border: '1px solid',
                  borderColor: (theme) => alpha(theme.palette.divider, 0.1),
                  boxShadow: (theme) => `0 4px 24px ${alpha(theme.palette.primary.main, 0.10)}`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: (theme) => `linear-gradient(135deg,
                      ${alpha(theme.palette.primary.main, 0.05)} 0%,
                      ${alpha(theme.palette.secondary.main, 0.05)} 100%
                    )`,
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: (theme) => `
                      0 12px 40px ${alpha(theme.palette.primary.main, 0.14)},
                      0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}
                    `,
                    '&::before': {
                      opacity: 1,
                    },
                    '& .icon-wrapper': {
                      transform: 'scale(1.1)',
                      borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                      '& svg': {
                        transform: 'scale(1.1)',
                        filter: (theme) => `drop-shadow(0 0 8px ${alpha(theme.palette.primary.main, 0.5)})`,
                      }
                    },
                    '& .paper-title': {
                      background: (theme) => `linear-gradient(135deg,
                        ${theme.palette.primary.main},
                        ${theme.palette.secondary.main}
                      )`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
                  },
                }}
              >
                <CardContent 
                  sx={{ 
                    p: { xs: 2.5, sm: 3 }, 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'center', md: 'flex-start' },
                    gap: { xs: 2, md: 2.5 },
                    mb: 2,
                    textAlign: { xs: 'center', md: 'left' }
                  }}>
                    <Box
                      className="icon-wrapper"
                      sx={{
                        width: { xs: 64, sm: 72, md: 56 },
                        height: { xs: 64, sm: 72, md: 56 },
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: (theme) => `linear-gradient(135deg,
                          ${alpha(theme.palette.background.paper, 0.9)} 0%,
                          ${alpha(theme.palette.background.paper, 0.7)} 100%
                        )`,
                        border: '2px solid',
                        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        flexShrink: 0,
                      }}
                    >
                      <ArticleIcon 
                        sx={{ 
                          fontSize: { xs: 32, sm: 36, md: 28 },
                          color: 'primary.main',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }} 
                      />
                    </Box>
                    <Box sx={{ 
                      flex: 1,
                      width: { xs: '100%', md: 'auto' }
                    }}>
                      <Typography 
                        className="paper-title"
                        variant="h6" 
                        sx={{ 
                          fontSize: { xs: '1.2rem', sm: '1.35rem', md: '1.25rem' },
                          fontWeight: 600,
                          lineHeight: 1.4,
                          letterSpacing: '-0.01em',
                          mb: 1,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {paper.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: { xs: '0.9rem', sm: '0.95rem', md: '0.875rem' },
                          lineHeight: 1.6,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {paper.journal}
                      </Typography>
                    </Box>
                  </Box>
                  <Box 
                    sx={{ 
                      mt: 'auto',
                      pt: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: { xs: 1.5, md: 2 },
                      borderTop: '1px solid',
                      borderColor: (theme) => alpha(theme.palette.divider, 0.08),
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'text.secondary',
                        fontSize: { xs: '0.9rem', md: '0.875rem' },
                        minWidth: { md: '85px' },
                      }}
                    >
                      <CalendarTodayIcon sx={{ fontSize: { xs: 18, md: 16 } }} />
                      {paper.year}
                    </Box>
                    <Box sx={{ 
                      display: { xs: 'none', sm: 'flex' },
                      gap: 1,
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      maxWidth: { sm: '100%', md: 'calc(100% - 100px)' },
                      overflow: { sm: 'hidden', md: 'visible' },
                      whiteSpace: { sm: 'nowrap', md: 'normal' },
                      ml: { md: 0 },
                      flexWrap: { md: 'wrap' }
                    }}>
                      {/* Show 2 tags on tablet, up to 3 on desktop */}
                      {paper.tags.slice(0, { sm: 2, md: 3 }[theme.breakpoints.up('md') ? 'md' : 'sm']).map((tag, idx) => (
                        <Chip
                          key={idx}
                          label={tag}
                          size="small"
                          sx={{
                            background: (theme) => alpha(theme.palette.primary.main, 0.08),
                            color: 'primary.main',
                            fontWeight: 500,
                            fontSize: { sm: '0.8rem', md: '0.75rem' },
                            height: { sm: '28px', md: '24px' },
                            borderRadius: '12px',
                            flexShrink: 0,
                            '&:hover': {
                              background: (theme) => alpha(theme.palette.primary.main, 0.12),
                            }
                          }}
                        />
                      ))}
                      {/* Show count chip only if there are more tags than shown */}
                      {((theme.breakpoints.up('md') && paper.tags.length > 3) || 
                        (!theme.breakpoints.up('md') && paper.tags.length > 2)) && (
                        <Chip
                          label={`+${paper.tags.length - (theme.breakpoints.up('md') ? 3 : 2)}`}
                          size="small"
                          sx={{
                            display: { sm: 'flex', md: 'flex' },
                            background: (theme) => alpha(theme.palette.secondary.main, 0.08),
                            color: 'secondary.main',
                            fontWeight: 500,
                            fontSize: { sm: '0.8rem', md: '0.75rem' },
                            height: { sm: '28px', md: '24px' },
                            borderRadius: '12px',
                            flexShrink: 0,
                            '&:hover': {
                              background: (theme) => alpha(theme.palette.secondary.main, 0.12),
                            }
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Research Paper Dialog */}
      <Dialog
        open={Boolean(selectedPaper)}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        TransitionComponent={Grow}
        TransitionProps={{ timeout: 300 }}
        PaperProps={{
          sx: {
            background: (theme) => `linear-gradient(135deg,
              ${alpha(theme.palette.background.paper, 0.9)} 0%,
              ${alpha(theme.palette.background.paper, 0.8)} 100%
            )`,
            backdropFilter: 'blur(20px)',
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.divider, 0.1),
            boxShadow: (theme) => `
              0 0 1px 0 ${alpha(theme.palette.primary.main, 0.2)},
              0 8px 32px -8px ${alpha(theme.palette.common.black, 0.12)},
              0 32px 64px -16px ${alpha(theme.palette.common.black, 0.14)}
            `,
          }
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(10px)',
            backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          }
        }}
      >
        {selectedPaper && (
          <>
            <DialogTitle 
              sx={{ 
                pb: 1,
                background: (theme) => `linear-gradient(135deg,
                  ${alpha(theme.palette.background.paper, 0.95)} 0%,
                  ${alpha(theme.palette.background.paper, 0.9)} 100%
                )`,
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid',
                borderColor: (theme) => alpha(theme.palette.divider, 0.1),
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 2
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 1,
                      background: (theme) => `linear-gradient(135deg,
                        ${theme.palette.primary.main},
                        ${theme.palette.secondary.main}
                      )`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {selectedPaper.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        color: 'primary.main',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                      }}
                    >
                      {selectedPaper.journal}
                    </Typography>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        background: (theme) => alpha(theme.palette.primary.main, 0.08),
                        color: 'primary.main',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: (theme) => alpha(theme.palette.primary.main, 0.12),
                          transform: 'translateY(-1px)',
                        }
                      }}
                    >
                      <CalendarTodayIcon sx={{ fontSize: 14 }} />
                      {selectedPaper.year}
                    </Box>
                  </Box>
                </Box>
                <IconButton
                  onClick={handleCloseDialog}
                  sx={{
                    color: 'text.secondary',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: 'primary.main',
                      background: (theme) => alpha(theme.palette.primary.main, 0.1),
                      transform: 'rotate(90deg)',
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent 
              sx={{
                background: (theme) => `linear-gradient(135deg,
                  ${alpha(theme.palette.background.paper, 0.8)} 0%,
                  ${alpha(theme.palette.background.paper, 0.6)} 100%
                )`,
              }}
            >
              <Box sx={{ py: 3 }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mb: 2,
                    color: 'text.secondary',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '&::before': {
                      content: '""',
                      width: 20,
                      height: 2,
                      background: (theme) => `linear-gradient(90deg,
                        ${theme.palette.primary.main},
                        ${theme.palette.secondary.main}
                      )`,
                      borderRadius: 1,
                    }
                  }}
                >
                  Authors
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 4,
                    color: 'text.primary',
                    lineHeight: 1.6,
                    fontSize: '1rem',
                    letterSpacing: '0.015em',
                  }}
                >
                  {selectedPaper.authors}
                </Typography>

                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mb: 2,
                    color: 'text.secondary',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '&::before': {
                      content: '""',
                      width: 20,
                      height: 2,
                      background: (theme) => `linear-gradient(90deg,
                        ${theme.palette.primary.main},
                        ${theme.palette.secondary.main}
                      )`,
                      borderRadius: 1,
                    }
                  }}
                >
                  Keywords
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1, 
                    mb: 4,
                    '& > *': {
                      animation: `${fadeInScale} 0.3s ease forwards`,
                    }
                  }}
                >
                  {selectedPaper.tags.map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={tag}
                      sx={{
                        background: (theme) => `linear-gradient(135deg,
                          ${alpha(theme.palette.primary.main, 0.08)} 0%,
                          ${alpha(theme.palette.secondary.main, 0.08)} 100%
                        )`,
                        color: 'primary.main',
                        fontWeight: 500,
                        fontSize: '0.85rem',
                        borderRadius: 2,
                        transition: 'all 0.2s ease',
                        animationDelay: `${idx * 0.1}s`,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          background: (theme) => `linear-gradient(135deg,
                            ${alpha(theme.palette.primary.main, 0.12)} 0%,
                            ${alpha(theme.palette.secondary.main, 0.12)} 100%
                          )`,
                        }
                      }}
                    />
                  ))}
                </Box>

                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: (theme) => `linear-gradient(90deg,
                        transparent,
                        ${alpha(theme.palette.divider, 0.1)},
                        transparent
                      )`,
                    }
                  }}
                >
                  <Link
                    href={selectedPaper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1.5,
                      color: 'primary.main',
                      textDecoration: 'none',
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      background: (theme) => alpha(theme.palette.background.paper, 0.5),
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 1,
                      '&:hover': {
                        background: (theme) => alpha(theme.palette.primary.main, 0.08),
                        transform: 'translateY(-2px)',
                        borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                        '& .link-icon': {
                          transform: 'rotate(45deg)',
                        }
                      }
                    }}
                  >
                    <ArticleIcon sx={{ fontSize: 20 }} />
                    <Typography sx={{ fontWeight: 500 }}>
                      View Publication
                    </Typography>
                    <OpenInNewIcon 
                      className="link-icon"
                      sx={{ 
                        fontSize: 16,
                        transition: 'transform 0.3s ease',
                      }} 
                    />
                  </Link>
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}; 