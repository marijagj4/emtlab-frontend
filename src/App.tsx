import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import type { ReactNode } from 'react';

import Layout from './components/shared/Layout';

import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import AuthorsPage from './pages/AuthorsPage';
import CountriesPage from './pages/CountriesPage';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const theme = createTheme({
    palette: {
        primary: {
            main: '#c8b6a6',
        },

        secondary: {
            main: '#a4907c',
        },

        background: {
            default: '#f8f5f2',
        },
    },

    typography: {
        fontFamily: 'Poppins, Roboto, sans-serif',
    },

    shape: {
        borderRadius: 16,
    },
});

const isAuthenticated = () => !!localStorage.getItem('accessToken');

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <BrowserRouter>

          <Routes>

            <Route path="/login" element={<LoginPage />} />

            <Route path="/register" element={<RegisterPage />} />

            <Route path="/" element={<Layout />}>

              <Route index element={<HomePage />} />

              <Route
                  path="books"
                  element={
                    <ProtectedRoute>
                      <BooksPage />
                    </ProtectedRoute>
                  }
              />

              <Route
                  path="authors"
                  element={
                    <ProtectedRoute>
                      <AuthorsPage />
                    </ProtectedRoute>
                  }
              />

              <Route
                  path="countries"
                  element={
                    <ProtectedRoute>
                      <CountriesPage />
                    </ProtectedRoute>
                  }
              />

            </Route>

          </Routes>

        </BrowserRouter>

      </ThemeProvider>
  );
}

export default App;