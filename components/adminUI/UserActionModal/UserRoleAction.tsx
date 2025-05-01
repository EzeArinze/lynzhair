import { updateUserRole } from "@/actions/admin_actions";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

interface UserRoleActionProps {
  isUserRoleModal: boolean;
  setIsUserRoleModal: (value: boolean) => void;
  userId: string;
}

function UserRoleAction({
  isUserRoleModal,
  setIsUserRoleModal,
  userId,
}: UserRoleActionProps) {
  const [newRole, setNewRole] = useState<string>("");

  return (
    <Modal
      isOpen={isUserRoleModal}
      onClose={() => setIsUserRoleModal(false)}
      title="Change User Role"
    >
      <div>
        <div className="py-4">
          <Select value={newRole} onValueChange={setNewRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size={"sm"}
            onClick={() => setIsUserRoleModal(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              updateUserRole(userId, newRole);
              setIsUserRoleModal(false);
            }}
            size={"sm"}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default UserRoleAction;
