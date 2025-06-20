import KeyCardSection from "@/components/containers/key-card-section";
import ManualFormModal from "@/components/containers/manual-form-modal";
import MasterPasswordModal from "@/components/containers/master-password-modal";
import { ScanQRModal } from "@/components/containers/scanqr-modal";
import ModalConfirmation from "@/components/reusables/modal-confirmation";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/settings-provider";
import type { IKeyCard } from "@/types/key-card";
import type { IOTPFormat } from "@/types/otp-format";
import { loadKeyFromStorage, saveKeyToStorage } from "@/utils/storage";
import { createFileRoute } from "@tanstack/react-router";
import { ScanQrCode, Trash, Upload, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/")({
	component: RouteComponent,
});

function RouteComponent() {
	// Modal states
	const [scanQrModal, setScanQrModal] = useState(false);
	const [manualFormModal, setManualFormModal] = useState(false);
	const [passwordModal, setPasswordModal] = useState(true);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);

	// Data states
	const [password, setPassword] = useState("");
	const [data, setData] = useState<IKeyCard[]>([]);

	// Settings context
	const { isSelecting, selectedKeys, toggleSelecting } = useSettings();

	/**
	 * Saves encrypted data to local storage
	 */
	const handleSaveDataToStorage = useCallback(
		(newData: IKeyCard[]) => {
			return new Promise<void>((resolve, reject) => {
				try {
					saveKeyToStorage(newData, password)
						.then(() => resolve())
						.catch((error) => reject(error));
				} catch (error) {
					reject(error);
				}
			});
		},
		[password],
	);

	/**
	 * Handles master password submission
	 */
	const handleSubmitPassword = useCallback((encryptedPassword: string) => {
		return new Promise<void>((resolve, reject) => {
			loadKeyFromStorage(encryptedPassword)
				.then((loadedData) => {
					setData(loadedData);
					setPasswordModal(false);
					setPassword(encryptedPassword);
					toast.success("Successfully logged in");
					resolve();
				})
				.catch((error) => {
					const errorResponse = error as Error;
					toast.error(`Failed to decrypt data: ${errorResponse.message}`);
					reject(errorResponse);
				});
		});
	}, []);

	/**
	 * Adds a new OTP key
	 */
	const handleAddKey = useCallback(
		async (payload: IOTPFormat) => {
			try {
				const newData: IKeyCard = {
					...payload,
					id: crypto.randomUUID(),
					createdAt: new Date().toISOString(),
				};
				const updatedData = [...data, newData];

				await handleSaveDataToStorage(updatedData);
				setData(updatedData);
				toast.success("Key added successfully");
			} catch (error) {
				const errorResponse = error as Error;
				toast.error(`Failed to add key: ${errorResponse.message}`);
				console.error("Error adding key:", errorResponse);
			}
		},
		[data, handleSaveDataToStorage],
	);

	/**
	 * Handles manual form submission
	 */
	const handleSubmitManualForm = useCallback(
		(payload: { label: string; issuer: string; secret: string }) => {
			handleAddKey({
				label: payload.label,
				issuer: payload.issuer,
				secret: payload.secret,
				algorithm: "SHA1",
				digits: 6,
				period: 30,
			});
			setManualFormModal(false);
		},
		[handleAddKey],
	);

	/**
	 * Delete selected keys
	 */
	const handleDeleteSelectedKeys = useCallback(async () => {
		try {
			const newData = data.filter((item) => !selectedKeys.includes(item));
			await handleSaveDataToStorage(newData);
			setData(newData);
			setDeleteConfirmation(false);
			toggleSelecting(false);
			toast.success("Selected keys deleted successfully");
		} catch (error) {
			const errorResponse = error as Error;
			toast.error(`Failed to delete keys: ${errorResponse.message}`);
			console.error("Error deleting keys:", errorResponse);
		}
	}, [data, handleSaveDataToStorage, selectedKeys, toggleSelecting]);

	/**
	 * UI for action buttons based on selection mode
	 */
	const actionButtons = useMemo(() => {
		if (isSelecting) {
			return (
				<section className="flex flex-row items-center justify-between md:justify-end gap-4">
					<div className="flex flex-row gap-4">
						<Button
							disabled={selectedKeys.length === 0}
							size="lg"
							variant="outline"
							onClick={() => setDeleteConfirmation(true)}
						>
							<Trash />
							Delete
						</Button>
						<Button
							disabled={selectedKeys.length === 0}
							size="lg"
							variant="outline"
						>
							<Upload />
							Export
						</Button>
					</div>
					<Button
						onClick={() => toggleSelecting(false)}
						size="lg"
						variant="default"
					>
						<X />
						Cancel
					</Button>
				</section>
			);
		}

		return (
			<section className="flex flex-row items-center md:justify-end gap-4">
				<Button
					className="cursor-pointer flex-2/5 md:flex-none"
					size="lg"
					variant="secondary"
					onClick={() => setManualFormModal(true)}
				>
					Manual
				</Button>
				<Button
					onClick={() => setScanQrModal(true)}
					className="cursor-pointer flex-3/5 md:flex-none"
					size="lg"
				>
					Scan QR
					<ScanQrCode />
				</Button>
			</section>
		);
	}, [isSelecting, selectedKeys.length, toggleSelecting]);

	return (
		<div>
			<div className="space-y-6">
				{actionButtons}
				<KeyCardSection data={data} />
			</div>

			{/* Modals */}
			<ManualFormModal
				isOpen={manualFormModal}
				onModalClose={() => setManualFormModal(false)}
				submitForm={handleSubmitManualForm}
			/>

			<ScanQRModal
				onSuccessScan={handleAddKey}
				isOpen={scanQrModal}
				onClose={() => setScanQrModal(false)}
			/>

			<ModalConfirmation
				isOpen={deleteConfirmation}
				onOpenChange={setDeleteConfirmation}
				title="Delete Keys"
				description={`Are you sure you want to delete ${selectedKeys.length} selected key(s)?`}
				confirmButton={{
					text: "Delete",
					onClick: handleDeleteSelectedKeys,
				}}
				cancelButton={{
					text: "Cancel",
				}}
			/>

			<MasterPasswordModal
				isOpen={passwordModal}
				onClose={() => setPasswordModal(false)}
				onSubmit={handleSubmitPassword}
			/>
		</div>
	);
}
