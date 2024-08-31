import React from 'react'
import fashious from  "../assets/images/fashious.png"
import {Row,Col} from 'antd'
import "../styles/Navbar.css"

const Navbar = () => {
  return (
    <Row align={'middle'} justify={'space-between'} className='navbar'>
        <Col className='navbar-logo'>
            <img src={fashious} width={200} />
        </Col>
        <Col className='navbar-slogan'>
            Developed By Velocious
        </Col>
    </Row>
    
  )
}

export default Navbar
