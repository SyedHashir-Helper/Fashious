
import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { UploadDropzone } from "@bytescale/upload-widget-react";
import {Row, Col, Button, Flex, Divider} from 'antd'

const options = {
    apiKey: "public_FW25cBk8bJZGqwaNxFuyEHKVXCPq", // This is your API key.
    maxFileCount: 1,
    showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
    styles: {
      colors: {
        primary: "#982B1C"
      }
    }
  };

export default function FileSection() {
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
                <Row>

                    <UploadDropzone options={options}
                    onUpdate={({ uploadedFiles }) => console.log(uploadedFiles.map(x => x.fileUrl).join("\n"))}
                    onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}
                    width="100%"
                    height="30em" />
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
                    <Row>

                        <UploadDropzone options={options}
                            onUpdate={({ uploadedFiles }) => console.log(uploadedFiles.map(x => x.fileUrl).join("\n"))}
                            onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}
                            width="100%"
                            height="30em" />
                    </Row>
            </Col>
            <Col span={24}>
                    <Row justify={'center'}>
                        <Col>
                            <Button danger type='primary' style={{display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "1.5em", padding: "1.5em",
                                backgroundColor: "#982B1C", borderRadius: "5px", border: "none"
                            }}>
                                <span class="material-symbols-outlined">
                                    animated_images
                                </span>
                                
                                Generate
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
        