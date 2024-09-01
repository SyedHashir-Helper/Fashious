import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Navbar from './Components/Navbar'
import FileSection from './Components/FileSection'
import { Row ,Col} from 'antd'
import ImageGradient from './Components/ImageGradient'
import ReplicateImages from './Components/ReplicateImages'

const styles = [
{backgroundImage: "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)"},
{backgroundImage: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"},
{backgroundImage: "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)"},
{backgroundImage: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)"},
{backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)"},
{backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)"},
{backgroundImage: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)"},
{backgroundImage: "linear-gradient(to top, #30cfd0 0%, #330867 100%)"},
{backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"},
{backgroundImage: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)"},
{backgroundImage: "linear-gradient(to top, #ebc0fd 0%, #d9ded8 100%)"},
{backgroundImage: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)"},
{background: `
  linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%),
  radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898
`,
backgroundBlendMode: 'multiply'},

{backgroundImage: "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)"},
{backgroundImage: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)"},
{backgroundImage: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)"},
{backgroundImage: "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)"},
{backgroundImage: "linear-gradient(to top, #6a85b6 0%, #bac8e0 100%)"},
{backgroundImage: "linear-gradient(to top, #a3bded 0%, #6991c7 100%)"},
{backgroundImage: "linear-gradient(to right, #434343 0%, black 100%)"},
]
const urls = [
  "https://replicate.delivery/pbxt/NWz8H65LkUJ8FZXZBcYe7WLs8luwwRuwk0ouyavyTXBKtNsJA/tmpgj1wvdkf.png",
  "https://replicate.delivery/pbxt/iwedfnP0mopxVEbkSOfeaXMFS5vKd33rCNpNXvPDxc1WpthNB/tmpky5st8p9.png",
  "https://replicate.delivery/pbxt/NWz8H65LkUJ8FZXZBcYe7WLs8luwwRuwk0ouyavyTXBKtNsJA/tmpgj1wvdkf.png",
  "https://replicate.delivery/pbxt/iwedfnP0mopxVEbkSOfeaXMFS5vKd33rCNpNXvPDxc1WpthNB/tmpky5st8p9.png"
]

function App() {
  const [count, setCount] = useState(0)
  const [replicateURLs,setreplicateURLs] = useState([])
  const [filesAvailable, setfilesAvailable] = useState(false)

  return (
    <>
      <Navbar/>
      <Row align={'middle'} justify={'center'} style={{margin: "1.5em 0%"}} >
        <Col style={{fontFamily: "Nerko One",fontSize: "2.5em"}}>
          Your AI Fashion Model
        </Col>
      </Row>
      <FileSection setreplicateURLs={setreplicateURLs}
                   setfilesAvailable={setfilesAvailable} />

      {  filesAvailable && (
        <ReplicateImages replicateURLs={replicateURLs} />
      )
      }
      {/* <Row>
        {
          styles.map((element)=>{
            return (
              <Col md={8} lg={8}>
                <ImageGradient
                  css={element}
                  />
              </Col>
            )
          })
        }
      </Row> */}
    </>
  )
}

export default App
