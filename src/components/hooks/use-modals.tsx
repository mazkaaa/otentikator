import { useState } from "react";

/**
 * Custom hook to manage modal states in the application.
 * This hook provides state variables and setter functions for various modals.
 * @returns An object containing state variables and setter functions for modals.
 * - `scanQrModal`: Boolean state for the QR code scanning modal.
 * - `manualFormModal`: Boolean state for the manual form modal.
 * - `passwordModal`: Boolean state for the password modal.
 * - `deleteConfirmation`: Boolean state for the delete confirmation modal.
 * - `setScanQrModal`: Function to set the state of the QR code scanning modal.
 * - `setManualFormModal`: Function to set the state of the manual form modal.
 * - `setPasswordModal`: Function to set the state of the password modal.
 * - `setDeleteConfirmation`: Function to set the state of the delete confirmation modal.
 *  @example
 * const { scanQrModal, setScanQrModal, manualFormModal, setManualFormModal } = useModals();
 */
const useModals = () => {
	const [scanQrModal, setScanQrModal] = useState(false);
	const [manualFormModal, setManualFormModal] = useState(false);
	const [passwordModal, setPasswordModal] = useState(true);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);

	return {
		scanQrModal,
		manualFormModal,
		passwordModal,
		deleteConfirmation,
		setScanQrModal,
		setManualFormModal,
		setPasswordModal,
		setDeleteConfirmation,
	};
};

export default useModals;
