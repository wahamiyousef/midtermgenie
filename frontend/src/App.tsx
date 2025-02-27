import './App.css'
import Layout from './layout'
import MainPage from './MainPage'

function App() {

  return (
    <div>
      <Layout children={
        <MainPage />
      } />
    </div>
  )
}

export default App
