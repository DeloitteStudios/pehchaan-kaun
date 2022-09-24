import "./popcard.scss";
// import Tooltip from "../commons/tooltip";
const Popcard = (props) => {
    return (
        <div className="popcard">
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
            <h1>HELLO THERE</h1>
        </div>
    );
};
export default Popcard;
