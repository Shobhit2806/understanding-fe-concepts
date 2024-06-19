import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BasicTable } from './explore-react-table/BasicTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BasicTable/>
    </>
  )
}

export default App
