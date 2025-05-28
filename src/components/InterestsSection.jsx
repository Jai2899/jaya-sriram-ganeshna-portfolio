import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  alpha,
  useTheme,
  Avatar,
  Chip,
} from "@mui/material";
import ParachuteIcon from '@mui/icons-material/Paragliding';
import SportsIcon from '@mui/icons-material/Sports';
import MovieIcon from '@mui/icons-material/Movie';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const interests = [
  {
    title: "Skydiving",
    description: "Embracing the thrill of freefall and experiencing the world from a different perspective.",
    icon: <ParachuteIcon />,
    image: "/images/skydiving.jpg", // You'll need to add these images
    tags: ["Adventure", "Adrenaline", "Freedom"]
  },
  {
    title: "Adventure Sports",
    description: "Always seeking new challenges and pushing my limits through various adventure activities.",
    icon: <SportsIcon />,
    image: "/images/adventure.jpg",
    tags: ["Sports", "Outdoors", "Challenge"]
  },
  {
    title: "Gaming",
    description: "Exploring virtual worlds and enjoying competitive gaming in my downtime.",
    icon: <SportsEsportsIcon />,
    image: "/images/gaming.jpg",
    tags: ["eSports", "Strategy", "RPG"]
  },
  {
    title: "Movies & Series",
    description: "Film enthusiast who loves analyzing storylines and cinematography.",
    icon: <MovieIcon />,
    image: "/images/movies.jpg",
    tags: ["Cinema", "Entertainment", "Stories"]
  }
];

export const InterestsSection = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: 12,
        px: 2,
        position: "relative",
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
          theme.palette.secondary.main,
          0.05
        )} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box sx={{ position: "relative" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Avatar
                  src="/images/profile.jpg" // Add your photo here
                  alt="Your Name"
                  sx={{
                    width: { xs: 280, md: 400 },
                    height: { xs: 280, md: 400 },
                    mx: "auto",
                    border: '4px solid',
                    borderColor: 'primary.main',
                    boxShadow: (theme) => `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                />
              </motion.div>
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  left: -20,
                  right: -20,
                  bottom: -20,
                  background: `radial-gradient(circle, ${alpha(
                    theme.palette.primary.main,
                    0.1
                  )} 0%, transparent 70%)`,
                  zIndex: -1,
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 4,
              }}
            >
              Beyond <Box component="span" sx={{ color: "primary.main" }}>Code</Box>
            </Typography>

            <Typography variant="body1" sx={{ mb: 4, color: "text.secondary", fontSize: "1.1rem", lineHeight: 1.8 }}>
              When I'm not crafting code, you'll find me seeking thrills in the sky or immersed in virtual worlds. 
              I believe that my diverse interests fuel my creativity and problem-solving abilities in software development.
            </Typography>

            <Grid container spacing={3}>
              {interests.map((interest, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <MotionCard
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    sx={{
                      height: '100%',
                      background: (theme) => alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(8px)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={interest.image}
                      alt={interest.title}
                      sx={{
                        objectFit: 'cover',
                      }}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                        <Box
                          sx={{
                            color: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {interest.icon}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {interest.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                        {interest.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {interest.tags.map((tag, tagIndex) => (
                          <Chip
                            key={tagIndex}
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                              color: 'primary.main',
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}; 