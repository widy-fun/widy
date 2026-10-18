import type { IWidget } from "@widy/sdk";
import useInboundBridge from "../../src-widget/hooks/useInboundBridge";

const EmbeddedWidget = ({ widget }: { widget: IWidget }) => {
	const iframeRef = useInboundBridge(widget);

	return (
		<iframe
			ref={iframeRef}
			src={`http://localhost:12553/widgets/${widget.id}/view/index.html`}
			title="Widget"
			sandbox="allow-scripts allow-forms"
			style={{
				display: "none",
			}}
		/>
	);
};
export default EmbeddedWidget;
