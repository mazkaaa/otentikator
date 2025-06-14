import type { IOTPFormat } from "@/types/otp-format";
import { type IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useCallback } from "react";
import { toast } from "sonner";
import { Modal } from "../reusables/modal";
import { Button } from "../ui/button";

interface PROPS {
	isOpen?: boolean;
	onClose?: () => void;
	onSuccessScan?: (data: IOTPFormat, rawValue: string) => void;
}
export const ScanQRModal = (props: PROPS) => {
	const { isOpen, onClose, onSuccessScan } = props;

	const handleOnSuccessScan = useCallback(
		(detectedCodes: IDetectedBarcode[]) => {
			if (detectedCodes.length > 0) {
				const data = detectedCodes[0].rawValue;
				const url = new URL(data);
				const searchParams = url.searchParams;
				const isValid =
					url.protocol === "otpauth:" &&
					data.includes("//totp/") &&
					searchParams.has("secret");
				if (!isValid) {
					toast.error("Invalid OTP QR Code");
				} else {
					const otpFormat: IOTPFormat = {
						issuer: searchParams.get("issuer") || "",
						label: url.pathname.replace("/", "").split(":")[1],
						secret: searchParams.get("secret") || "",
						algorithm: searchParams.get("algorithm") || "SHA1",
						digits: Number.parseInt(searchParams.get("digits") || "6"),
						period: Number.parseInt(searchParams.get("period") || "30"),
					};
					if (onSuccessScan) {
						onSuccessScan(otpFormat, data);
						if (onClose) {
							onClose();
						}
					}
				}
			}
		},
		[onClose, onSuccessScan],
	);

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={(open) => {
				if (!open) {
					if (onClose) {
						onClose();
					}
				}
			}}
			title="Scan QR Code"
			description="Scan the QR code to get the data"
		>
			<Scanner onScan={handleOnSuccessScan} />
			<Button
				onClick={() => {
					if (onClose) {
						onClose();
					}
				}}
				variant="default"
				size="lg"
			>
				Cancel
			</Button>
		</Modal>
	);
};
