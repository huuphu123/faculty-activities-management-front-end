import React, {useContext} from "react";
import saveAs from "file-saver";
import { getAttendanceResult } from '../../api/userApi';
import AuthContext from '../../store/auth-context';
const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";
export const JsonToExcel = ({
    text,
    fileName,
    btnClassName,
    id,
}) => {
    const authContext = useContext(AuthContext);
    const exportToExcel = async () => {
        const res = await getAttendanceResult(id, authContext.token);
        
        const ws = window.XLSX.utils.json_to_sheet(res.data);
        const wb = {
            Sheets: {
                data: ws
            },
            SheetNames: ["data"]
        };
        const eb = window.XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([eb], { type: EXCEL_TYPE });
        saveAs(blob, fileName + EXCEL_EXTENSION);
    };
    return (
        <div>
            <button
                className={`${btnClassName} download-button`}
                onClick={exportToExcel}
                style={{
                    background: 'none',
                    border: 'none',
                    textDecoration: 'underline',
                }}
            >
                {text}
            </button>
        </div>
    );
};
