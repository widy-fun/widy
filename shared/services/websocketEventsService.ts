import { IEventMessage, IEventsService } from "@widy/sdk";
import Subscriptions from "./subscriptions";

export class WebsocketEventsService
	extends Subscriptions
	implements IEventsService
{
	private socket: WebSocket | null = null;
	private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
	private statusListeners = new Set<(connected: boolean) => void>();
	connected = true;

	private static readonly RECONNECT_DELAY_MS = 1000;

	constructor(private readonly url: string) {
		super();
	}

	connect(): void {
		if (this.isConnected()) return;
		this.clearReconnectTimer();
		this.initSocket();
	}

	disconnect(): void {
		this.clearReconnectTimer();
		this.closeSocket();
		this.emitStatus(false);
	}

	send<T>(message: IEventMessage<T>): void {
		if (!this.isConnected()) return;
		try {
			this.socket!.send(JSON.stringify(message));
		} catch (error) {
			console.error("[WebsocketEventsService] Failed to send message:", error);
		}
	}

	addStatusListener(callback: (connected: boolean) => void): void {
		this.statusListeners.add(callback);
	}

	removeStatusListener(callback: (connected: boolean) => void): void {
		this.statusListeners.delete(callback);
	}

	private initSocket(): void {
		this.socket = new WebSocket(this.url);
		this.socket.onmessage = ({ data }) => this.handleMessage(data);
		this.socket.onopen = () => this.emitStatus(true);
		this.socket.onclose = () => this.handleClose();
	}

	private closeSocket(): void {
		if (!this.socket) return;
		this.socket.onclose = null;
		this.socket.close();
		this.socket = null;
	}

	private handleMessage(data: string): void {
		try {
			const message: IEventMessage<unknown> = JSON.parse(data);
			this.notifySubscribers(message.event, message.data);
		} catch (error) {
			console.error("[WebsocketEventsService] Failed to parse message:", error);
		}
	}

	private handleClose(): void {
		this.emitStatus(false);
		this.scheduleReconnect();
	}

	private emitStatus(connected: boolean): void {
		this.connected = connected;
		this.statusListeners.forEach((cb) => cb(connected));
	}

	private scheduleReconnect(): void {
		this.reconnectTimer = setTimeout(
			() => this.connect(),
			WebsocketEventsService.RECONNECT_DELAY_MS,
		);
	}

	private clearReconnectTimer(): void {
		if (this.reconnectTimer === null) return;
		clearTimeout(this.reconnectTimer);
		this.reconnectTimer = null;
	}

	private isConnected(): boolean {
		return this.socket?.readyState === WebSocket.OPEN;
	}
}
