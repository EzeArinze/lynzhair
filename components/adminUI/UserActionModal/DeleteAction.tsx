import { deleteUser } from "@/actions/admin_actions";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import React from "react";

interface DeleteActionProps {
  isDeleteModal: boolean;
  setIsDeleteModal: (value: boolean) => void;
  name?: string;
  id: string;
}

function DeleteAction({
  isDeleteModal,
  setIsDeleteModal,
  name = "",
  id,
}: DeleteActionProps) {
  return (
    <Modal
      isOpen={isDeleteModal}
      onClose={() => setIsDeleteModal(false)}
      title="Delete User"
    >
      <div className="flex-col items-center space-y-4">
        <h3>
          Are you sure you want to delete {name}? This action cannot be undone.
        </h3>

        <div className="space-x-2 text-end">
          <Button variant="outline" onClick={() => setIsDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              deleteUser(id);
              setIsDeleteModal(false);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteAction;
