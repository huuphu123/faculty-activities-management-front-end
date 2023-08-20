
import {useState, useContext} from 'react'
import styles from './ModalUploadFile.module.css'
import AuthContext from '../../store/auth-context'

function ModalUploadFile(props) {
    const authContext = useContext(AuthContext);

    const [inputName, setInputName] = useState("")
    const [inputFile, setInputFile] = useState()
    const [isChosenFile, setIsChosenFile] = useState(false)

    const fileChangeHandler = (e) => {
        setInputFile(e.target.files[0])
        setIsChosenFile(true)
    }

    const nameChangeHandler = (e) => {
        setInputName(e.target.value)
    }

    const submitHandler = async() => {
        const formData = new FormData();
        formData.append('availableList', inputFile);
        formData.append('name', inputName);
        const result = await props.onAction(authContext.token, formData);
        setInputName("")
        props.setIsListFilesChange(true)
    }

    return (
        <div className="modal fade"
            id="modal-upload-file"
            tabIndex="-1"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Tải lên tập tin</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div>
                        <label className={styles.labelInputFile}>Tên tập tin: </label>
                        <input type="text" id ="inputName" onChange={nameChangeHandler} value={inputName} className={styles.inputFileName}/>
                        <label className={styles.buttonCustom}>
                        <input type="file" name="file" id="file" onChange={fileChangeHandler} className={styles.chooseFile} />
                        Chọn tập tin
                        </label><br/>
                        {isChosenFile && <label className={styles.lableFileName}>{inputFile.name}</label>}
                        <button onClick={submitHandler} data-bs-dismiss="modal" className={styles.buttonAddFile}>Thêm</button>                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalUploadFile;