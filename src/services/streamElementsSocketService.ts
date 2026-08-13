import {
	IService,
	IStreamElementsAuth,
	IStreamElementsAuthenticated,
	IStreamElementsEvent,
	IStreamElementsTip,
	ServiceType,
	StreamElementsEventType,
} from "@widy/sdk";
import { io, Socket } from "socket.io-client";
import Subscriptions from "../../shared/services/subscriptions";
import { servicesApi } from "../api/servicesApi";
import { streamElementsApi } from "../api/streamElementsApi";
import { store } from "../store";

export default class StreamElementsSocketService extends Subscriptions {
	private socket: Socket | null = null;

	constructor() {
		super();
	}

	connect() {
		if (this.socket) this.disconnect();
		this.socket = io("https://realtime.streamelements.com", {
			transports: ["websocket"],
		});

		this.socket.on("connect", this.handleConnect);
		this.socket.on("unauthorized", this.handleUnauthorized);
		this.socket.on("authenticated", this.handleAuthenticated);
		this.socket.on("event", this.handleEvent);
		this.socket.on("connect_error", (err) => {
			console.error("[StreamElementsSocketService] connect_error:", err);
		});
	}

	disconnect() {
		this.socket?.off("connect", this.handleConnect);
		this.socket?.off("unauthorized", this.handleUnauthorized);
		this.socket?.off("authenticated", this.handleAuthenticated);
		this.socket?.off("event", this.handleEvent);
		this.socket?.disconnect();
		this.socket = null;
	}

	private handleConnect = async () => {
		const service = await this.getServiceAuth();
		const token = service?.auth?.jwt_token;
		if (token) {
			this.socket?.emit("authenticate", { method: "jwt", token });
		}
	};

	private handleUnauthorized = async () => {
		this.signOut();
	};

	private handleAuthenticated = async (_: IStreamElementsAuthenticated) => {
		const service = await this.getServiceAuth();
		await this.setAuthorized({
			authorized: true,
			auth: { jwt_token: service.auth.jwt_token },
		});
		this.notifySubscribers("authenticated", true);
	};

	private handleEvent = (data: IStreamElementsEvent<unknown>) => {
		switch (data.type) {
			case StreamElementsEventType.tip: {
				if (process.env.NODE_ENV !== "development" && data.isMock) return;

				const event = data as IStreamElementsEvent<IStreamElementsTip>;
				store.dispatch(
					streamElementsApi.endpoints.streamElementsTipEvent.initiate({
						event,
					}),
				);
				break;
			}
			default:
				break;
		}
	};

	private async getServiceAuth() {
		const { data } = await store.dispatch(
			servicesApi.endpoints.getServiceWithAuthById.initiate(
				{ id: ServiceType.Streamelements },
				{ forceRefetch: true },
			),
		);
		return data as IService<IStreamElementsAuth, undefined>;
	}

	async setAuthorized({
		authorized,
		auth,
	}: {
		authorized: boolean;
		auth?: IStreamElementsAuth;
	}) {
		await store
			.dispatch(
				servicesApi.endpoints.updateServiceAuth.initiate({
					id: ServiceType.Streamelements,
					authorized,
					auth,
				}),
			)
			.unwrap();
	}

	async signIn(token: string) {
		await this.setAuthorized({
			authorized: false,
			auth: { jwt_token: token },
		});
		if (!this.socket) {
			this.connect();
			return;
		}
		if (this.socket.connected) {
			this.socket.disconnect();
		}
		this.socket?.connect();
	}

	signOut() {
		this.socket?.disconnect();
		this.setAuthorized({ authorized: false });
	}
}
