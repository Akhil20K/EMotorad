import './dashboard.css'
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import MainDash from './components/MainDash/MainDash';
function Dashboard(){
    return(
        <div className="App">
            <div className="AppGlass">
                <Sidebar/>
                <MainDash/>
                <RightSide/>
            </div>
        </div>
    )
}
export default Dashboard;