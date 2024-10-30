import { faInfoCircle, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";

export const errorMsg = (text, icon= faInfoCircle) => toast.error(text, {
    autoClose: true,
    delay: 1000,
    icon: <FontAwesomeIcon icon={icon}/>,
    style:{color: "white", background: "#FF0000"} ,
    draggable:false,
    closeOnClick: true,
});

export const warningMsg =  (text) => toast.warn(text, {
    autoClose: true,
    delay: 1000,
    icon: <FontAwesomeIcon icon={faWarning}/>,
    style:{color: "#FFA500", background: "black"} ,
    draggable:false,
    closeOnClick: true,
});


export const infoMsg =  (text) => toast.info(text, {
    autoClose: true,
    delay: 1000,
    icon: <FontAwesomeIcon icon={faInfoCircle}/>,
    style:{color: "white", background: "#2299fb"} ,
    draggable:false,
    closeOnClick: true,
});

