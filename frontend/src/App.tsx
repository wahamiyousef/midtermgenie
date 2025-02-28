import { ThemeProvider } from './components/theme-provider'
import Layout from './layout'
import MainPage from './MainPage'
import SettingsPage from './components/pages/SettingsPage'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          {
            /*
          <nav>
            <Link to="/">Home</Link>
            <Link to="/settings">Settings</Link>
          </nav>
          */
          }
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  )
}

export default App
