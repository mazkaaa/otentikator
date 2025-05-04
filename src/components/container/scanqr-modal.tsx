import { IOTPFormat } from "@/types";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useCallback } from "react";
import { toast } from "sonner";
import { Modal } from "../reusables";
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
        // otpauth://totp/GitHub:mazkaaa?secret=4CIUYDJ7ZW5XLWZN&issuer=GitHub
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
            digits: parseInt(searchParams.get("digits") || "6"),
            period: parseInt(searchParams.get("period") || "30"),
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
      <Scanner
        onScan={handleOnSuccessScan}
        components={{
          audio: false,
        }}
      />
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
