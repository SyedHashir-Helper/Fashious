
import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { UploadDropzone } from "@bytescale/upload-widget-react";
import {Row, Col, Button, Flex, Divider,Spin,message} from 'antd'
import { locale } from 'primereact/api';
import axios from 'axios'
import { S3Client, GetObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3"

const s3Client = new S3Client(
    {
        region: "ap-southeast-2",
        credentials: {
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    }
});

function generateRandomFileName(extension = 'png') {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 12; // Length of the random string
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    if (extension) {
        // Ensure the extension starts with a dot
        if (!extension.startsWith('.')) {
            extension = '.' + extension;
        }
        result += extension;
    }

    return result;
}
async function putObjectFromUrl(imageUrl, fileName, contentType) {
    // Step 1: Fetch the image from the provided URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
    }

    const imageBuffer = await response.blob();

    // Step 2: Upload the fetched image to S3
    const command = new PutObjectCommand({
        Bucket: "incog-files.dev",
        Key: `uploads/` + fileName,
        Body: imageBuffer,
        ContentType: contentType
    });

    await s3Client.send(command);
    return "https://s3.ap-southeast-2.amazonaws.com/incog-files.dev/uploads/" + fileName
}



const options = {
    apiKey: "public_FW25cBk8bJZGqwaNxFuyEHKVXCPq", // This is your API key.
    maxFileCount: 1,
    showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
    styles: {
      colors: {
        primary: "#982B1C"
      }
    },

    locale: {
        "uploadFileBtn": "Upload an image",
    }
  };

  
const API_BASE_URL = "https://fashious-flask-backend.vercel.app"


export default function FileSection({setreplicateURLs, setfilesAvailable, setpictureURL, setURLAvailable}) {
    const [garmentFile, setgarmentFile] = useState("")
    const [modelFile, setmodelFile] = useState("")
    const [garmentUploaded, setGarmentUploaded] = useState(false);
    const [modelUploaded, setModelUploaded] = useState(false);
    const [loading,setloading] = useState(false)
    const [generating, setgenerating] = useState("Generate")
    const [messageApi, contextHolder] = message.useMessage();

    const success = (successmsg) => {
        messageApi.open({
          type: 'success',
          content: successmsg,
          duration: 5
        });
      };

      const error = (errmsg) => {
        messageApi.open({
          type: 'error',
          content: errmsg,
        });
      };

    async function handleClick(){
        if (garmentFile!=""){
            if(modelFile!=""){
                try{
                    const filename = generateRandomFileName()

                    success("It takes upto 3 minutes. Take a back")
                    setloading(true)
                    setgenerating("Generating...")
                    const response = await axios.post(`${API_BASE_URL}/api/transform_image`, {
                        model_image_url: modelFile,
                        garment_image_url: garmentFile
                    });
                    console.log(response["data"])
                    setreplicateURLs(response["data"])
                    setfilesAvailable(true)
                    const pictureURL = await putObjectFromUrl(response["data"][0],filename, "image/png")
                    console.log(pictureURL)

                    setpictureURL(pictureURL)
                    setURLAvailable(true)
                }
                catch(error2)
                {
                    error("Error: " + error2.message)
                }
                finally{
                    setloading(false)
                    setgenerating("Generate")
                    success("Image Generated Successfully")
                }

                
            }
            else{
                alert("Please select a model file to upload")
            }
        }
        else{
            alert("Please Select a garment file to upload")
        }
    }
    async function handleRefresh(){
        setgarmentFile("")
        setmodelFile("")
        setGarmentUploaded(false);
        setModelUploaded(false);
    }
    // const toast = useRef(null);
    // const [totalSize, setTotalSize] = useState(0);
    // const fileUploadRef = useRef(null);
    
    // const onTemplateSelect = (e) => {
    //     let _totalSize = totalSize;
    //     let files = e.files;

    //     Object.keys(files).forEach((key) => {
    //         _totalSize += files[key].size || 0;
    //     });

    //     setTotalSize(_totalSize);
    // };

    // const onTemplateUpload = (e) => {
    //     let _totalSize = 0;

    //     e.files.forEach((file) => {
    //         _totalSize += file.size || 0;
    //     });

    //     setTotalSize(_totalSize);
    //     toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    // };

    // const onTemplateRemove = (file, callback) => {
    //     setTotalSize(totalSize - file.size);
    //     callback();
    // };

    // const onTemplateClear = () => {
    //     setTotalSize(0);
    // };

    // const headerTemplate = (options) => {
    //     const { className, chooseButton, uploadButton, cancelButton } = options;
    //     const value = totalSize / 10000;
    //     const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

    //     return (
    //         <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
    //             {chooseButton}
    //             {uploadButton}
    //             {cancelButton}
    //             <div className="flex align-items-center gap-3 ml-auto">
    //                 <span>{formatedValue} / 1 MB</span>
    //                 <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
    //             </div>
    //         </div>
    //     );
    // };

    // const itemTemplate = (file, props) => {
    //     return (
    //         <div className="flex align-items-center flex-wrap">
    //             <div className="flex align-items-center" style={{ width: '40%' }}>
    //                 <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
    //                 <span className="flex flex-column text-left ml-3">
    //                     {file.name}
    //                     <small>{new Date().toLocaleDateString()}</small>
    //                 </span>
    //             </div>
    //             <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
    //             <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
    //         </div>
    //     );
    // };

    // const emptyTemplate = () => {
    //     return (
    //         <div className="flex align-items-center flex-column">
    //             <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
    //             <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
    //                 Drag and Drop Image Here
    //             </span>
    //         </div>
    //     );
    // };

    // const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    // const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    // const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    return (
        <Row justify={'space-between'} style={{ margin: "1% 0%"}} gutter={10}>
            {contextHolder}
            <Col lg={12} md={12} sm={24} xs={24}>
                <Row justify={'center'} style={{
                     fontSize: "2em", background: "#982B1C",borderRadius: "5px",padding: "0.25em 0em", color: "white"
                }}>
                    <span style={{textAlign: "center", display: "flex",alignItems: "center",justifyContent: "center",gap: "0.5em"}}>
                        <span class="material-symbols-outlined" style={{fontSize: "1em"}}>
                            apparel
                        </span>
                        Garment
                    </span>
                </Row>
                <Row justify={"center"} align={'middle'}>
                    

                    {!garmentUploaded && (
                        
                        <UploadDropzone
                                options={options}
                                onUpdate={({ uploadedFiles }) => console.log(uploadedFiles.map(x => x.fileUrl).join("\n"))}
                                onComplete={files => {
                                    setgarmentFile(files[0].fileUrl);
                                    setGarmentUploaded(true);
                                }}
                                width="100%"
                                height="30em" />
                        )}
                    {
                            garmentUploaded && (
                            <Col md={12} sm={24} style={{height: "30em", objectFit: "cover", padding: "1em"}}>
                                <img src={garmentFile} style={{height: "95%"}}/>
                            </Col>
                        )}
                </Row>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
                    <Row justify={'center'} style={{
                        fontSize: "2em", background: "#982B1C",borderRadius: "5px",padding: "0.25em 0em", color: "white"
                    }}>
                        <span style={{textAlign: "center", display: "flex",alignItems: "center",justifyContent: "center",gap: "0.5em"}}>
                            <span class="material-symbols-outlined" style={{fontSize: "1em"}}>
                                accessibility
                            </span>
                            Human Model
                        </span>
                    </Row>
                    <Row  justify={"center"} align={'middle'}>
                        {!modelUploaded && (
                            <UploadDropzone
                                options={options}
                                onUpdate={({ uploadedFiles }) => console.log(uploadedFiles.map(x => x.fileUrl).join("\n"))}
                                onComplete={files => {
                                    setmodelFile(files[0].fileUrl);
                                    setModelUploaded(true);
                                }}
                                width="100%"
                                height="30em" />
                        )}
                        {
                            modelUploaded && (
                            <Col md={12} sm={24} style={{height: "30em", objectFit: "cover", padding: "1em"}}>
                                <img src={modelFile} style={{height: "95%"}}/>
                            </Col>
                        )}
                    </Row>
            </Col>
            <Col span={24}>
                    <Row justify={'center'}>
                        <Col>
                            <Button danger type='primary' style={{display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "1.5em", padding: "1.5em",
                                backgroundColor: "#982B1C", borderRadius: "5px", border: "none"
                            }}
                            onClick={handleClick}
                            >
                                {
                                    !loading ? (
                                        <span class="material-symbols-outlined">
                                            animated_images
                                        </span>
                                    ) :
                                    (
                                        <Spin>
                                            
                                        </Spin>
                                    )
                                }
                                

                                
                                {generating}
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                style={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "1.5em", padding: "1.5em",
                                    backgroundColor: "#982B1C", borderRadius: "5px", border: "none", marginLeft: "1em"
                                }}
                                onClick={handleRefresh}
                            >
                                <span className="material-symbols-outlined">
                                    refresh
                                </span>
                            </Button>
                        </Col>
                    </Row>
                
            </Col>

            {/* <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} /> */}
        </Row>

               
        
    )
}
        