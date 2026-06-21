import AlertView from "../../../shared/components/AlertView";
import usePlayAlert from "../../hooks/usePlayAlert";

const Alert = () => {
	const {
		currentAlert,
		currentMessage,
		currentVideoSrcObject,
		isShowVideoElement,
	} = usePlayAlert();
	return (
		currentMessage &&
		currentAlert && (
			<AlertView
				alert={currentAlert}
				message={currentMessage}
				width={window.innerWidth}
				height={window.innerHeight}
				videoSrcObject={currentVideoSrcObject}
				base={"static"}
				isShowVideoElement={isShowVideoElement}
			/>
		)
	);
};

export default Alert;
