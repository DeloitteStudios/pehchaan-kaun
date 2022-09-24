import "./popcard.scss";
import { PieChart } from 'react-minimal-pie-chart';
import lIcon from "../../img/linkedin-icon.png";
// import Tooltip from "../commons/tooltip";
const Popcard = (props) => {
    const renderPie = () => {
        let tempObj = [];
        let colorObj = {
            happy: "#00ff00",
            sad: "#ccc",
            neutral: "#e3d7bd",
            angry: "#ff0000",
            disgusted: "#896b60",
            surprised: "#0000ff"
        };
        console.log("POPARD PROPS", props);
        props.selUser.expressions && Object.keys(props.selUser.expressions).map((item) => {
            tempObj.push({ title: item, value: props.selUser.expressions[item], color: colorObj[item] });
        });
        console.log("TEMP PE ", tempObj);
        return (
            <div className="pie-cont"><PieChart data={tempObj} />
            </div>
        );
        // tempObj.push({ title: props.expressions, value: people.expressions[item], color: colorObj[item] })
        // Object.keys(props.expressions).map((item) => {
        //     tempObj.push({ title: item, value: people.expressions[item], color: colorObj[item] });
        // });
        // return <div className="pie-cont"><PieChart
        //     data={tempObj}
        // /></div>;
        //[
        // { title: 'One', value: 10, color: '#E38627'; },
        // { title: 'Two', value: 15, color: '#C13C37'; },
        // { title: 'Three', value: 20, color: '#6A2135'; },
        //     ]
    };
    return (
        <div className="popcard">
            <div className="close-btn-cont">
                <button onClick={props.closer} className="close-btn"></button>
            </div>
            <div className="section-header">
                Details
            </div>
            <div className="section-header people-detail-cont">
                <div className="people-detail">
                    <div className="people-header">Detail</div>
                    <div className="detail-list">
                        <img className="profile-img" src={props.selUser.profileData.img} alt="pic" />
                        <span className="people-detail-point">{props.selUser.profileData.name}</span>
                        <span className="people-detail-point">{props.selUser.profileData.designation}</span>
                        <span className="people-detail-point">{props.selUser.profileData.empId}</span>
                        <span className="people-detail-point">
                            <a href="https://www.linkedin.com/login"><img src={lIcon} className="detail-img" />
                            </a>
                        </span>
                    </div>
                </div>
                <div className="people-chart">
                    <div className="people-header">Mood Chart</div>
                    {renderPie()}
                </div>

            </div>
            {/* <div className="close-btn-cont">
                <button onClick={props.closer} className="close-btn"></button>
            </div>
            <div className="card-content">
                <span className="c-gender">{props.selUser.gender}</span>
                <span className="c-phone">{props.selUser.phone}</span>
                <span className="c-email">{props.selUser.email}</span>
                <Tooltip
                    label="Show Email"
                    text={props.selUser.email}
                    clickable={true}
                    type="Email"
                />
            </div> */}
        </div>
    );
};
export default Popcard;
