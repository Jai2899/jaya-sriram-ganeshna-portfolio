import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { SnackbarProvider } from 'notistack';
import { Box, Container } from '@mui/material';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
/** Module-level variants — prevents inline object creation; useReducedMotion disables for a11y */
const PAGE_TRANSITION_VARIANTS = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const PAGE_TRANSITION = { duration: 0.3 };

const AnimatedRoutes = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={prefersReducedMotion ? false : "initial"}
        animate={prefersReducedMotion ? false : "animate"}
        exit={prefersReducedMotion ? false : "exit"}
        variants={prefersReducedMotion ? undefined : PAGE_TRANSITION_VARIANTS}
        transition={PAGE_TRANSITION}
      >
        <Routes location={location}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: (theme) => `linear-gradient(45deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      <SnackbarProvider 
        maxSnack={3} 
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          '& .SnackbarContent-root': {
            borderRadius: 2,
            backdropFilter: 'blur(8px)',
          }
        }}
      >
        <BrowserRouter>
          <Container maxWidth="xl" sx={{ py: 2 }}>
            <AnimatedRoutes />
          </Container>
          <Analytics />
          <SpeedInsights />
        </BrowserRouter>
      </SnackbarProvider>
      
    </Box>
  );
}

export default App;
