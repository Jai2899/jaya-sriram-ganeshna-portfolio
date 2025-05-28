import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { SnackbarProvider } from 'notistack';
import { Box, Container } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { InterestsSection } from "@/components/InterestsSection";

// Wrap routes with animation
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
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
        </BrowserRouter>
      </SnackbarProvider>
    </Box>
  );
}

export default App;
