import 'bootstrap/dist/css/bootstrap.min.css'
import './PageSwitcher.css'
import { Link } from 'react-router-dom'

function PageSwitcher(props) {
    const pageName = {
        eventManage: "Quản lý sự kiện",
        listRegister: "Danh sách đăng ký",
        dataManage: "Quản lý tập tin",
        accountApproval: "Kiểm duyệt tài khoản"
    }

    return (
        <div className="btn-group" id="SWITCHER">

            <span
                className="btn btn-warning"
                id="btnName"
            >{pageName[props.page]}</span>
            <button type="button"
                className="btn btn-light dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown" aria-expanded="false">
                {/* <span className="visually-hidden">Toggle Dropdown</span> */}
            </button>


            <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/admin/eventManage">Quản lý sự kiện</Link></li>
                <li><Link className="dropdown-item" to="/admin/eventRegister">Danh sách đăng ký</Link></li>
                <li><Link className="dropdown-item" to="/admin/dataManage">Quản lý tập tin</Link></li>
                <li><Link className="dropdown-item" to="/admin/accountApproval">Kiểm duyệt tài khoản</Link></li>
            </ul>
        </div>
    );
}

export default PageSwitcher;