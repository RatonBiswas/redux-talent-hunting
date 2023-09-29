import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import { useSelector } from "react-redux";
import Logo from "./Logo";
// import {AiOutlinePushpin} from 'react-icons'

const BigSidebar = () => {
    const {isSidebarOpen} = useSelector((store)=>store.user)
    return (
        <Wrapper>
            <div className={isSidebarOpen ? 'sidebar-container show-sidebar': 'sidebar-container'}>
            {/* <div className= "sidebar-container show-sidebar"> */}
                <div className="context">
                    <header>
                        <Logo/>
                    </header>
                    {/* <AiOutlinePushpin/> */}
                    <NavLinks/>
                </div>
            </div>
        </Wrapper>
    );
};

export default BigSidebar;