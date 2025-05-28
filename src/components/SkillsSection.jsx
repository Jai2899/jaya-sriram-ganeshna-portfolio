import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import BuildIcon from "@mui/icons-material/Build";
import AppsIcon from "@mui/icons-material/Apps";

const skills = {
  frontend: {
    title: "Frontend Development",
    description: "Building responsive and interactive user interfaces",
    skills: [
      { name: "Next.js", level: "Advanced", years: "3+ years" },
      { name: "React.js", level: "Proficient", years: "3+ years" },
      { name: "JavaScript", level: "Advanced", years: "2+ years" },
      { name: "TypeScript", level: "Proficient", years: "2+ years" },
      { name: "HTML5/CSS3", level: "Proficient", years: "4+ years" },
      { name: "Material-UI", level: "Advanced", years: "3+ years" }
    ]
  },
  backend: {
    title: "Backend Development",
    description: "Developing scalable server-side applications",
    skills: [
      { name: "Node.js", level: "Advanced", years: "3+ years" },
      { name: "Express.js", level: "Proficient", years: "2+ years" },
      { name: "NestJS", level: "Intermediate", years: "1+ year" },
      { name: "GraphQL", level: "Proficient", years: "2+ years" },
      { name: "REST APIs", level: "Intermediate", years: "1+ year" }
    ]
  },
  database: {
    title: "Database & Cloud",
    description: "Managing data and cloud infrastructure",
    skills: [
      { name: "MongoDB", level: "Proficient", years: "2+ years" },
      { name: "PostgreSQL", level: "Proficient", years: "2+ years" },
      { name: "Azure", level: "Intermediate", years: "2+ years" },
      { name: "SQL", level: "Intermediate", years: "2+ years" },
    ]
  },
  tools: {
    title: "Tools & Practices",
    description: "Development tools and methodologies",
    skills: [
      { name: "Git/GitHub", level: "Advanced", years: "4+ years" },
      { name: "Agile/Scrum", level: "Advanced", years: "3+ years" },
      { name: "Docker", level: "Proficient", years: "2+ years" },
      { name: "Kubernetes", level: "Proficient", years: "2+ years" },
      {name:"Redis", level: "Intermediate", years: "1+ year"},
      {name: "Prisma", level: "Advanced", years: "3+ years"},
      {name: "Helm", level: "Intermediate", years: "1+ year"}
    ]
  }
};

const categories = [
  { id: "frontend", label: "Frontend", icon: <CodeIcon /> },
  { id: "backend", label: "Backend", icon: <StorageIcon /> },
  { id: "database", label: "Database", icon: <StorageIcon /> },
  { id: "tools", label: "Tools", icon: <BuildIcon /> },
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getLevelColor = (level) => {
    switch(level) {
      case 'Advanced':
        return theme.palette.primary.main;
      case 'Proficient':
        return theme.palette.secondary.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  const getGradient = (index, skillName) => {
    // Create a consistent but random number based on skill name
    const hashCode = skillName.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    const gradients = [
      `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.primary.dark, 0.9)} 100%)`,
      `linear-gradient(135deg, ${alpha(theme.palette.secondary.light, 0.9)} 0%, ${alpha(theme.palette.secondary.main, 0.9)} 100%)`,
      `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.9)} 0%, ${alpha(theme.palette.secondary.main, 0.9)} 100%)`,
      `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.9)} 0%, ${alpha(theme.palette.primary.main, 0.9)} 100%)`,
      `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.9)} 0%, ${alpha(theme.palette.primary.main, 0.9)} 100%)`,
      `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.secondary.dark, 0.9)} 100%)`
    ];

    // Use the hashCode to select a gradient
    const randomIndex = Math.abs(hashCode) % gradients.length;
    return gradients[randomIndex];
  };

  return (
    <Box
      component="section"
      id="skills"
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
          }}
        >
          Technical <Box component="span" sx={{ color: "primary.main" }}>Skills</Box>
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
          A collection of technologies and tools I've worked with professionally. My expertise is focused on full-stack web development, with a strong emphasis on modern JavaScript frameworks and cloud technologies.
        </Typography>

        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 6 }}
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? "contained" : "outlined"}
              startIcon={category.icon}
              sx={{
                minWidth: isMobile ? '80%' : 140,
                py: 1.5,
                px: 3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                transition: 'all 0.3s ease',
                borderColor: activeCategory === category.id ? 'primary.main' : 'divider',
                backgroundColor: activeCategory === category.id 
                  ? 'primary.main' 
                  : alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(8px)',
                boxShadow: activeCategory === category.id 
                  ? (theme) => `0 8px 16px ${alpha(theme.palette.primary.main, 0.25)}`
                  : 'none',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => `0 8px 16px ${alpha(
                    activeCategory === category.id 
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                    0.2
                  )}`,
                },
              }}
            >
              {category.label}
            </Button>
          ))}
        </Stack>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
            {skills[activeCategory].title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {skills[activeCategory].description}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {skills[activeCategory].skills.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {isMobile ? (
                <Box
                  sx={{
                    p: 2.5,
                    mb: 2,
                    borderRadius: 3,
                    background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.85)}, ${alpha(theme.palette.primary.light, 0.10)})`,
                    boxShadow: (theme) => `0 4px 24px ${alpha(theme.palette.primary.main, 0.10)}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 1.2,
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s',
                    '&:active': {
                      boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.18)}`,
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: getGradient(index, skill.name),
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      background: getGradient(index, skill.name),
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      mb: 0.5,
                      mt: 0.5,
                    }}
                  >
                    {skill.name}
                  </Typography>
                  <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '8px',
                        background: (theme) => alpha(getLevelColor(skill.level), 0.13),
                        color: getLevelColor(skill.level),
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        whiteSpace: 'nowrap',
                        '&::before': {
                          content: '""',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'currentColor',
                          display: 'inline-block',
                          mr: 1,
                        },
                      }}
                    >
                      {skill.level}
                    </Box>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '8px',
                        background: (theme) => alpha(theme.palette.text.secondary, 0.07),
                        color: 'text.secondary',
                        fontWeight: 500,
                        fontSize: '0.8rem',
                        letterSpacing: '0.5px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {skill.years}
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Paper
                  elevation={0}
                  sx={{
                    position: 'relative',
                    p: 3,
                    height: '100%',
                    borderRadius: 3,
                    background: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? `linear-gradient(165deg, \
                            ${alpha(theme.palette.background.paper, 0.9)}, \
                            ${alpha(theme.palette.background.paper, 0.4)})`
                        : `linear-gradient(165deg, \
                            ${alpha(theme.palette.background.paper, 0.9)}, \
                            ${alpha(theme.palette.background.paper, 0.6)})`,
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: getGradient(index, skill.name),
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: (theme) => `linear-gradient(165deg, \
                        ${alpha(getLevelColor(skill.level), 0.05)}, \
                        ${alpha(getLevelColor(skill.level), 0.02)})`,
                      opacity: 0,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: 0,
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: (theme) => `\n                        0 12px 24px -8px ${alpha(theme.palette.primary.main, 0.2)},\n                        0 4px 16px -4px ${alpha(theme.palette.common.black, 0.1)}\n                      `,
                      '&::before': {
                        height: '100%',
                        opacity: 0.05,
                      },
                      '&::after': {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Stack 
                    spacing={2} 
                    sx={{ 
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <Box 
                      sx={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        height: '100%'
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600,
                          background: getGradient(index, skill.name),
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          textFillColor: 'transparent',
                          flex: 1,
                        }}
                      >
                        {skill.name}
                      </Typography>
                      <Stack spacing={1} alignItems="flex-end">
                        <Typography
                          variant="body2"
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '12px',
                            background: (theme) => alpha(theme.palette.text.secondary, 0.05),
                            color: 'text.secondary',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            letterSpacing: '0.5px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {skill.years}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '12px',
                            background: (theme) => alpha(getLevelColor(skill.level), 0.1),
                            color: getLevelColor(skill.level),
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            whiteSpace: 'nowrap',
                            '&::before': {
                              content: '""',
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: 'currentColor',
                            },
                          }}
                        >
                          {skill.level}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Paper>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
