import React from 'react'
import girl from "../assets/images/model.png"
import "../styles/Images.css"
import { Row } from 'antd'
const ImageGradient = ({css}) => {
  return (
    <div className='imagebox-gradient' >
        <Row style={{display: 'flex', alignItems: "center", justifyContent: "center", width: "100%", "height": "100%"}}>
            <img src={girl} style={{height: "100%"}}/>
        </Row>
    </div>
  )
}

export default ImageGradient
