import React from 'react'
import girl from "../assets/images/girl.png"
import "../styles/Images.css"
import { Row } from 'antd'

const ImageGradient = ({css}) => {
  return (
    <div style={css} className='imagebox-gradient' >
        <Row style={{display: 'flex', alignItems: "center", justifyContent: "center"}}>
            <img src={girl}/>
        </Row>
    </div>
  )
}

export default ImageGradient
