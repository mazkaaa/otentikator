"use client";
import { IOTPFormat } from "@/types";
import { IKeyCard, IKeyCardEncrypted } from "@/types/key-card";
import { decrypt, encrypt } from "@/utils/security";
import { ScanQrCode, Trash, Upload, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import KeyCardSection from "../container/key-card-section";
import ManualFormModal from "../container/manual-form-modal";
import MasterPasswordModal from "../container/master-password-modal";
import { ScanQRModal } from "../container/scanqr-modal";
import { useSettings } from "../context";
import { ModalConfirmation } from "../reusables";
import { Button } from "../ui/button";

const DashboardPage = () => {
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
  const saveDataToStorage = useCallback(
    async (newData: IKeyCard[]) => {
      try {
        const encryptedData = await encrypt(password, JSON.stringify(newData));
        localStorage.setItem("otp-data", JSON.stringify(encryptedData));
        return true;
      } catch (error) {
        const errorResponse = error as Error;
        toast.error("Failed to save data: " + errorResponse.message);
        console.error(errorResponse);
        return false;
      }
    },
    [password],
  );

  /**
   * Handles master password submission
   */
  const handleSubmitPassword = useCallback((encryptedPassword: string) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const dataStorage = localStorage.getItem("otp-data");
        if (dataStorage) {
          const parsedData: IKeyCardEncrypted = JSON.parse(dataStorage);
          const decryptedData = await decrypt(
            parsedData.encrypted,
            encryptedPassword,
            parsedData.iv,
            parsedData.authTag,
          );
          setData(JSON.parse(decryptedData));
        }
        setPasswordModal(false);
        setPassword(encryptedPassword);
        toast.success("Successfully logged in");
        resolve();
      } catch (error) {
        const errorResponse = error as Error;
        toast.error("Failed to decrypt data: " + errorResponse.message);
        reject(errorResponse);
      }
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

        if (await saveDataToStorage(updatedData)) {
          setData(updatedData);
          toast.success("Key added successfully");
        }
      } catch (error) {
        toast.error("Failed to add key");
        console.error(error);
      }
    },
    [data, saveDataToStorage],
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
   * Deletes selected keys
   */
  const handleDeleteSelectedKeys = useCallback(() => {
    const newData = data.filter((item) => !selectedKeys.includes(item));
    setData(newData);
    saveDataToStorage(newData);
    setDeleteConfirmation(false);
    toggleSelecting(false);
    toast.success("Selected keys deleted successfully");
  }, [data, saveDataToStorage, selectedKeys, toggleSelecting]);

  /**
   * UI for action buttons based on selection mode
   */
  const actionButtons = useMemo(() => {
    if (isSelecting) {
      return (
        <section className="flex flex-row items-center justify-between">
          <div className="flex flex-row space-x-2">
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
      <section className="grid grid-cols-3 gap-4">
        <Button
          className="cursor-pointer col-span-1"
          size="lg"
          variant="secondary"
          onClick={() => setManualFormModal(true)}
        >
          Manual
        </Button>
        <Button
          onClick={() => setScanQrModal(true)}
          className="cursor-pointer col-span-2"
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
          onClick: () => setDeleteConfirmation(false),
        }}
      />

      <MasterPasswordModal
        isOpen={passwordModal}
        onClose={() => setPasswordModal(false)}
        onSubmit={handleSubmitPassword}
      />
    </div>
  );
};

export default DashboardPage;
