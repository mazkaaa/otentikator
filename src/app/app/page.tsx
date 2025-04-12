"use client";
import {
  KeyCardSection,
  ManualFormModal,
  ScanQRModal,
} from "@/components/container";
import MasterPasswordModal from "@/components/container/master-password-modal";
import { useSettings } from "@/components/context";
import { ModalConfirmation } from "@/components/reusables";
import { Button } from "@/components/ui";
import { IOTPFormat } from "@/types";
import { IKeyCard } from "@/types/key-card";
import { ScanQrCode, Trash, Upload, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function AppDashboard() {
  const [scanQrModal, setScanQrModal] = useState(false);
  const [manualFormModal, setManualFormModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(true);

  const [password, setPassword] = useState("");

  const [deleteConfirmationDelete, setDeleteConfirmationDelete] =
    useState(false);

  const { isSelecting, selectedKeys, toggleSelecting } = useSettings();

  const [data, setData] = useState<IKeyCard[]>([]);

  const closeManualFormModal = useCallback(() => {
    setManualFormModal(false);
  }, []);

  const closeMasterPasswordModal = useCallback(() => {
    setPasswordModal(false);
  }, []);

  const handleSubmitPassword = useCallback((encryptedPassword: string) => {
    setPasswordModal(false);
    toast.success("Successfully logged in");
    setPassword(encryptedPassword);
  }, []);

  const handleAddKey = useCallback(
    (payload: IOTPFormat) => {
      const newData: IKeyCard = {
        ...payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setData((prev) => [...prev, newData]);
      localStorage.setItem("otp-data", JSON.stringify([...data, newData]));
    },
    [data],
  );

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
    },
    [handleAddKey],
  );

  const handleCancelSelecting = useCallback(() => {
    toggleSelecting(false);
  }, [toggleSelecting]);

  const handleDeleteSelectedKey = useCallback(() => {
    const newData = data.filter((item) => !selectedKeys.includes(item));
    setData(newData);
    localStorage.setItem("otp-data", JSON.stringify(newData));
    setDeleteConfirmationDelete(false);
    toggleSelecting(false);
    toast.success("Key deleted successfully");
  }, [data, selectedKeys, toggleSelecting]);

  const defineMainButtonSection = useMemo(() => {
    if (isSelecting) {
      return (
        <section className="flex flex-row items-center justify-between">
          <section className="flex flex-row space-x-2">
            <Button
              disabled={selectedKeys.length === 0}
              size="lg"
              variant="outline"
              onClick={() => setDeleteConfirmationDelete(true)}
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
          </section>
          <Button onClick={handleCancelSelecting} size="lg" variant="default">
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
          onClick={() => {
            setScanQrModal(true);
          }}
          className="cursor-pointer col-span-2"
          size="lg"
        >
          Scan QR
          <ScanQrCode />
        </Button>
      </section>
    );
  }, [handleCancelSelecting, isSelecting, selectedKeys.length]);

  useEffect(() => {
    const data = localStorage.getItem("otp-data");
    if (data) {
      setData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="">
      <div className="space-y-6">
        {defineMainButtonSection}
        <KeyCardSection data={data} />
      </div>

      <ManualFormModal
        isOpen={manualFormModal}
        onModalClose={closeManualFormModal}
        submitForm={handleSubmitManualForm}
      />
      <ScanQRModal
        onSuccessScan={handleAddKey}
        isOpen={scanQrModal}
        onClose={() => setScanQrModal(false)}
      />
      <ModalConfirmation
        isOpen={deleteConfirmationDelete}
        onOpenChange={setDeleteConfirmationDelete}
        title="Delete Key"
        description="Are you sure you want to delete the selected key?"
        confirmButton={{
          text: "Delete",
          onClick: handleDeleteSelectedKey,
        }}
        cancelButton={{
          text: "Cancel",
          onClick: () => setDeleteConfirmationDelete(false),
        }}
      />
      <MasterPasswordModal
        isOpen={passwordModal}
        onClose={closeMasterPasswordModal}
        onSubmit={handleSubmitPassword}
      />
    </div>
  );
}
