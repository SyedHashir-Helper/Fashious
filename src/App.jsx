import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Navbar from './Components/Navbar'
import FileSection from './Components/FileSection'
import { Row ,Col} from 'antd'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Row align={'middle'} justify={'center'} style={{margin: "1.5em 0%"}} >
        <Col style={{fontFamily: "Nerko One",fontSize: "2.5em"}}>
          Your AI Fashion Model
        </Col>
      </Row>
      <FileSection/>
    </>
  )
}

export default App
