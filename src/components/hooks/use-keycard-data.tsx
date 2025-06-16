import type { IKeyCard } from "@/types/key-card";
import type { IOTPFormat } from "@/types/otp-format";
import { loadKeyFromStorage, saveKeyToStorage } from "@/utils/storage";
import { useCallback, useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook to manage key card data.
 * This hook provides functionality to load, save, add, and delete key cards,
 * as well as handle password submission for encrypted storage.
 * @returns An object containing the key card data, functions to handle password submission,
 * adding keys, and deleting keys.
 * - `data`: The current list of key cards.
 * - `handleSubmitPassword`: Function to submit the password and load key card data.
 * - `addKey`: Function to add a new key card.
 * - `deleteKeys`: Function to delete selected key cards.
 * @example
 * const { data, handleSubmitPassword, addKey, deleteKeys } = useKeyCardData();
 */
const useKeyCardData = () => {
	const [password, setPassword] = useState("");
	const [data, setData] = useState<IKeyCard[]>([]);

	const saveDataToStorage = useCallback(
		async (newData: IKeyCard[]) => {
			try {
				await saveKeyToStorage(newData, password);
				return true;
			} catch (error) {
				const err = error as Error;
				toast.error(`Storage error: ${err.message}`);
				console.error("Storage error:", err);
				return false;
			}
		},
		[password],
	);

	const handleSubmitPassword = useCallback(
		async (encryptedPassword: string) => {
			try {
				const loadedData = await loadKeyFromStorage(encryptedPassword);
				setData(loadedData);
				setPassword(encryptedPassword);
				toast.success("Successfully logged in");
			} catch (error) {
				const err = error as Error;
				toast.error(`Failed to decrypt data: ${err.message}`);
				throw err;
			}
		},
		[],
	);

	const addKey = useCallback(
		async (payload: IOTPFormat) => {
			try {
				const newData: IKeyCard = {
					...payload,
					id: crypto.randomUUID(),
					createdAt: new Date().toISOString(),
				};
				const updatedData = [...data, newData];

				const success = await saveDataToStorage(updatedData);
				if (success) {
					setData(updatedData);
					toast.success("Key added successfully");
					return true;
				}
				return false;
			} catch (error) {
				const err = error as Error;
				toast.error(`Failed to add key: ${err.message}`);
				console.error("Error adding key:", err);
				return false;
			}
		},
		[data, saveDataToStorage],
	);

	const deleteKeys = useCallback(
		async (keysToDelete: IKeyCard[]) => {
			try {
				const newData = data.filter(
					(item) => !keysToDelete.some((key) => key.id === item.id),
				);
				const success = await saveDataToStorage(newData);
				if (success) {
					setData(newData);
					toast.success("Keys deleted successfully");
					return true;
				}
				return false;
			} catch (error) {
				const err = error as Error;
				toast.error(`Failed to delete keys: ${err.message}`);
				console.error("Error deleting keys:", err);
				return false;
			}
		},
		[data, saveDataToStorage],
	);

	return {
		data,
		handleSubmitPassword,
		addKey,
		deleteKeys,
	};
};

export default useKeyCardData;
