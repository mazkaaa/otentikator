export interface IOTPFormat {
	issuer: string;
	label: string;
	secret: string;
	algorithm: string;
	digits: number;
	period: number;
}
