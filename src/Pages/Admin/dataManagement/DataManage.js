import React, { useState, useContext, useEffect} from 'react'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './DataManage.css'
import {getAvailableFiles, deleteAvailableFile, addAvailableFile, updateAvailableFile} from '../../../api/adminApi'
import AuthContext from '../../../store/auth-context'
import PageSwitcher from './../pageSwitcher/PageSwitcher'
import ModalUploadFile from '../../../Components/ModalUploadFile/ModalUploadFile'

function DataManage() {
    const [data, setData] = useState([]);
    const [isListFilesChange, setIsListFilesChange] = useState('false')
    const [selectedFile, setSelectedFile] = useState();
	const [isAddFilePicked, setIsAddFilePicked] = useState(false);
    const authContext = useContext(AuthContext);
    
// ------------ <3 -----------
    const formatDate = (str) => {
        const day = new Date(str)
        return moment(day).format('L')+' '+moment(day).format('LT')
    }

    useEffect(() => {
            (
                async () => {
                    const result = await getAvailableFiles (authContext.token)
                    setData(result.data)
                }
            )();
            setIsListFilesChange(false);
        },[isListFilesChange])

    const fileChangeHandler = () => {
        setIsAddFilePicked(true)
        
        // setSelectedFile(e.target.files[0])
        // console.log(e.target.files[0]);
        // const formData = new FormData();
        // formData.append('availableList', e.target.files[0]);
        // formData.append('name', "fhhfhfhfhfh");
        // const result = await addAvailableFile(authContext.token, formData);
        // console.log(result);
        // setIsListFilesChange(true);
        // // e.target.files[0] = undefined
    }
// ------------ <3 -----------
    const handleRemove = async (fileName) => {
        const result = await deleteAvailableFile(authContext.token, fileName);
        if(!result.status) {
            setData(data.filter((t) => t.fileName !== fileName));
        }
    }

    const handleEdit = async (fileName, e) => {
        const formData = new FormData();
        formData.append('availableList', e.target.files[0]);
        formData.append('fileName', fileName);
        const result = await updateAvailableFile(authContext.token, formData);
        // if(!result.status) {
        //     setData(data.map(obj => 
        //         obj.fileName===fileName?{...obj, fileName: result.data.fileName}:obj
        //     ));
        //     console.log(data)
        // }
    }

    const handleDownload = (fileName) => {
        var win = window.open(`http://localhost:5000/avail_list/${fileName}`, '_blank');
        win.focus();
    } 


// ------------ <3 -----------
    return (
        <div className="bigContainer" id="ADMIN-PAGE">
            <PageSwitcher page="dataManage" />
            <h2>QUẢN LÝ TẬP TIN</h2>

            <div className="container my-5" id="DATA-MANAGE">
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th className="col-1">STT</th>
                            <th className="col-5">Tên tệp dữ liệu</th>
                            <th className="col-3">Thời gian tải lên</th>
                            <th className="col-3 text-end">
                                <div className="">
                                    <input type="button"  
                                        data-bs-toggle="modal"
                                        data-bs-target="#modal-upload-file"
                                        name="file" id="file" className='inputAddFile' onClick={fileChangeHandler}/>
                                    <label htmlFor="file" className='labelAddFile'>     
                                        <img src=".././add-btn.png" width="90" className="align-middle" alt="anh"/>                         
                                    </label>
                                    {<ModalUploadFile setIsListFilesChange={setIsListFilesChange} onAction={addAvailableFile}/>}
                                </div>      
                            </th>
                        </tr>
                    </thead>
                    <TransitionGroup component="tbody">
                        {data.map((e, index) =>
                            <CSSTransition key={index} timeout={500} classNames="infoRow">
                                <tr>
                                    <th className="col-1 align-middle">{index + 1}</th>
                                    <td className="col-5 align-middle">{e.name}</td>
                                    <td className="col-3 align-middle">{formatDate(e.uploadedTime)}</td>
                                    <td className="col-3">
                                        <div className="button-group text-end">
                                            <input type="image"
                                                src=".././download.png"
                                                width="30"
                                                className="align-middle"
                                                onClick={() => handleDownload(e.fileName)}
                                            />

                                            <input type="file"
                                                id="editBtn"
                                                name="editBtn"
                                                className='inputAddFile'
                                                onChange={(event)=> {handleEdit(e.fileName, event)}}
                                            />

                                            <label htmlFor="editBtn" className='labelAddFile'>
                                                <img src=".././edit.png" width="30" className="align-middle" alt="anh"/>                         
                                            </label>

                                            <input type="image"
                                                src=".././remove.png"
                                                width="30"
                                                className="align-middle"
                                                onClick={() => handleRemove(e.fileName)}>
                                            </input>
                                        </div>
                                    </td>
                                </tr>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </table>
            </div>
        </div>
    );
}

export default DataManage;