import KeyCardSection from "@/components/containers/key-card-section";
import ManualFormModal from "@/components/containers/manual-form-modal";
import MasterPasswordModal from "@/components/containers/master-password-modal";
import { ScanQRModal } from "@/components/containers/scanqr-modal";
import useKeyCardData from "@/components/hooks/use-keycard-data";
import useModals from "@/components/hooks/use-modals";
import useSearch from "@/components/hooks/use-search";
import ModalConfirmation from "@/components/reusables/modal-confirmation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/contexts/settings-provider";
import type { IKeyCard } from "@/types/key-card";
import { createFileRoute } from "@tanstack/react-router";
import { ScanQrCode, Search, Trash, Upload, X } from "lucide-react";
import { useCallback, useMemo } from "react";

export const Route = createFileRoute("/app/")({
	component: RouteComponent,
});

function RouteComponent() {
	// Use custom hooks
	const {
		scanQrModal,
		manualFormModal,
		passwordModal,
		deleteConfirmation,
		setScanQrModal,
		setManualFormModal,
		setPasswordModal,
		setDeleteConfirmation,
	} = useModals();

	const { data, handleSubmitPassword, addKey, deleteKeys } = useKeyCardData();

	const searchKeyCard = useCallback((item: IKeyCard, query: string) => {
		return (
			item.label.toLowerCase().includes(query) ||
			item.issuer.toLowerCase().includes(query) ||
			item.secret.toLowerCase().includes(query)
		);
	}, []);

	const {
		searchQuery,
		filteredItems: filteredData,
		handleSearchChange,
		clearSearch,
	} = useSearch({
		items: data,
		searchFn: searchKeyCard,
	});

	// Settings context
	const { isSelecting, selectedKeys, toggleSelecting } = useSettings();

	const handleSubmitManualForm = useCallback(
		(payload: { label: string; issuer: string; secret: string }) => {
			addKey({
				label: payload.label,
				issuer: payload.issuer,
				secret: payload.secret,
				algorithm: "SHA1",
				digits: 6,
				period: 30,
			});
			setManualFormModal(false);
		},
		[addKey, setManualFormModal],
	);

	const handleDeleteSelectedKeys = useCallback(async () => {
		const success = await deleteKeys(selectedKeys);
		if (success) {
			setDeleteConfirmation(false);
			toggleSelecting(false);
		}
	}, [deleteKeys, selectedKeys, setDeleteConfirmation, toggleSelecting]);

	const renderActionButtons = useMemo(() => {
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
			<section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="relative flex items-center">
					<Search className="absolute left-2 text-muted-foreground" size={18} />
					<Input
						onChange={handleSearchChange}
						placeholder="Search keys"
						className="pl-8 md:min-w-xs"
						value={searchQuery}
					/>
					{searchQuery.length > 0 && (
						<button
							type="button"
							className="absolute right-2 text-muted-foreground cursor-pointer"
							onClick={clearSearch}
							aria-label="Clear search"
						>
							<X size={16} />
						</button>
					)}
				</div>
				<div className="flex flex-row gap-4">
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
				</div>
			</section>
		);
	}, [
		isSelecting,
		selectedKeys.length,
		toggleSelecting,
		searchQuery,
		handleSearchChange,
		clearSearch,
		setManualFormModal,
		setScanQrModal,
		setDeleteConfirmation,
	]);

	return (
		<div>
			<div className="space-y-6">
				{renderActionButtons}
				<KeyCardSection data={filteredData} />
			</div>

			{/* Modals */}
			<ManualFormModal
				isOpen={manualFormModal}
				onModalClose={() => setManualFormModal(false)}
				submitForm={handleSubmitManualForm}
			/>

			<ScanQRModal
				onSuccessScan={addKey}
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
