import React from 'react'
import {Row, Col} from 'antd'

const urls = [
    "https://replicate.delivery/pbxt/NWz8H65LkUJ8FZXZBcYe7WLs8luwwRuwk0ouyavyTXBKtNsJA/tmpgj1wvdkf.png",
    "https://replicate.delivery/pbxt/iwedfnP0mopxVEbkSOfeaXMFS5vKd33rCNpNXvPDxc1WpthNB/tmpky5st8p9.png",
    "https://replicate.delivery/pbxt/NWz8H65LkUJ8FZXZBcYe7WLs8luwwRuwk0ouyavyTXBKtNsJA/tmpgj1wvdkf.png",
    "https://replicate.delivery/pbxt/iwedfnP0mopxVEbkSOfeaXMFS5vKd33rCNpNXvPDxc1WpthNB/tmpky5st8p9.png"
  ]
  

const ReplicateImages = ({replicateURLs}) => {
  return (
    <Row style={{margin: "5em 0%"}} justify={'center'}>
          <Col span={24}>
            <Row style={{margin: "2em 0%"}} justify={'center'}>
                <Col style={{fontFamily: "Nerko One",fontSize: "2.5em", backgroundColor: "#151515", padding: "1% 4%",color:"white", borderRadius: "5px"}}>
                    Generated Response
                </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row justify={'center'}>
                    {
                        replicateURLs.map((element)=>{
                        return (
                            <Col md={8} lg={6} sm={24} style={{height: "30em", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <img src={element} style={{height: "100%", borderRadius: "5px"}} />
                            </Col>
                        )
                        })
                    }
            </Row>
          </Col>

    </Row>
  )
}

export default ReplicateImages
