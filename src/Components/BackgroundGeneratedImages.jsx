import React, { useEffect,useState } from 'react'
import {Row,Col} from 'antd'
import axios from 'axios'

const BackgroundGeneratedImages = ({pictureURL}) => {

    const [urls, setUrls] = useState([])

    useEffect(() => {
        async function createBackground(){
            try{
            const imageUrl = 'https://s3.ap-southeast-2.amazonaws.com/incog-files.dev/uploads/Replicate-h.png';
                const prompt = 'Red Shiny Gradient wallpaper';

                // Call the /removebg endpoint
                const removeBgResponse = await axios.post('http://127.0.0.1:5000/api/backgeneratorpic', {
                    image_url: imageUrl,
                    color: "#08eccd"
                });
                console.log(removeBgResponse.data)
                const removeBgUrl = removeBgResponse.data.data["url"]; // Adjust based on API response structure

                const secondResponse = await axios.post('http://127.0.0.1:5000/api/backgeneratorpic', {
                    image_url: imageUrl,
                    color: "#f2f2f2"
                });
                const secondURL = secondResponse.data.data["url"]; // Adjust based on API response structure

                // Call the /generate-background endpoint
                const generateBackgroundResponse = await axios.post('http://127.0.0.1:5000/api/generate-background', {
                    image_url: imageUrl,
                    prompt: prompt
                });
                const generateBackgroundUrl = generateBackgroundResponse.data["result_url"]; // Adjust based on API response structure
                console.log(generateBackgroundResponse.data)

                const generateBackgroundLast = await axios.post('http://127.0.0.1:5000/api/generate-background', {
                    image_url: imageUrl,
                    prompt: "Shiny Gradient Background having positive vibes"
                });
                const generateBackgroundUrlLast = generateBackgroundLast.data["result_url"];

                // Update the state with the URLs and file names
                setUrls([generateBackgroundUrl, generateBackgroundUrlLast, removeBgUrl, secondURL]);
            } catch (error) {
                console.error('Error fetching URLs:', error);
            }

        }
        createBackground()
    
    }, [])
    
  return (
    <Row style={{margin: "5em 0%"}} justify={'center'}>
          <Col span={24}>
            <Row style={{margin: "2em 0%"}} justify={'center'}>
                <Col style={{fontFamily: "Nerko One",fontSize: "2.5em", backgroundColor: "#151515", padding: "1% 4%",color:"white", borderRadius: "5px"}}>
                    More on this
                </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row justify={'center'} align={'middle'} gutter={10}>
                    {
                        urls.map((element, index)=>{
                            return (
                                <Col key={index} md={8} lg={6} sm={24} style={{height: "30em", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <img src={element} style={{height: "100%", borderRadius: "5px", objectFit: 'cover' ,}} />
                                </Col>
                            )
                        })
                    }
            </Row>
          </Col>
    </Row>
  )
}

export default BackgroundGeneratedImages
