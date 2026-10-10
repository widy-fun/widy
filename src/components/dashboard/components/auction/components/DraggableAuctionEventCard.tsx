import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { IAuctionEvent } from "@widy/sdk";
import AuctionEventCard from "./AuctionEventCard";

const DraggableAuctionEventCard = ({ event }: { event: IAuctionEvent }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: event.id,
		data: event,
	});

	return (
		<div
			ref={setNodeRef}
			style={{
				transform: CSS.Translate.toString(transform),
			}}
			{...listeners}
			{...attributes}
		>
			<AuctionEventCard event={event} />
		</div>
	);
};
export default DraggableAuctionEventCard;
