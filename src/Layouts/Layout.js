import {Fragment} from 'react'
import Header from './Header'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'

const Layout = (props) => {
    const {pathname} = useLocation();
    return (
        <Fragment>
            <Header />
                {props.children}
            <Footer />
        </Fragment>
    )
}
export default Layout;