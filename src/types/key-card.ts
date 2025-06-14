import type { IOTPFormat } from "./otp-format";

export interface IKeyCard extends IOTPFormat {
	id: string;
	createdAt: string;
}

export interface IKeyCardEncrypted {
	authTag: string;
	encrypted: string;
	iv: string;
}
