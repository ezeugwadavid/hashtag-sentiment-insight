import { useRouter } from 'next/router';
import { useHashtagTrend } from '../../hooks/useHashtagTrend';
import { Container, CssBaseline, ThemeProvider, createTheme, IconButton, Box } from '@mui/material';
import HashtagTrendCard from '../../components/HashtagTrendCard';
import { useMemo } from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const InsightsPage = () => {
  const { query } = useRouter();
  const hashtag = useMemo(() => query.hashtag as string, [query.hashtag]);

  const { data, isLoading, isError, refetch } = useHashtagTrend(
    typeof hashtag === 'string' ? hashtag : undefined
  );

  const { mode, toggleDarkMode } = useDarkMode();

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  if (typeof hashtag !== 'string') {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ paddingY: 4 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <HashtagTrendCard data={data} isLoading={isLoading} isError={isError} refetch={refetch} />
      </Container>
    </ThemeProvider>
  );
};

export default InsightsPage;