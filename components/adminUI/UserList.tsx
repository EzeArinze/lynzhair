import React, { useState } from "react";
import { CardContent } from "../ui/card";
import {
  MoreHorizontal,
  Shield,
  Trash2,
  UserCheck,
  UserCog,
  UserX,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  getBannedStatusColor,
  getUserStatusColor,
} from "@/utils/getStatusColor";
import { GetDate } from "@/utils/getDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { User as BaseUser } from "better-auth/types";
import UserRoleAction from "./UserActionModal/UserRoleAction";
import DeleteAction from "./UserActionModal/DeleteAction";
import { banUser, unBanUser } from "@/actions/admin_actions";
import { useAuthentication } from "@/actions/auth";

interface User extends BaseUser {
  role?: string | null | undefined;
  banReason?: string | null | undefined;
  banned?: boolean | null | undefined;
  banExpires?: Date | null | undefined;
}

interface UserListProps {
  user: User;
}

function UserList({ user }: UserListProps) {
  const [isUserRole, setIsUserRole] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const { session } = useAuthentication();

  return (
    <>
      <div>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <span className="rounded-full font-semibold p-2 h-8 w-8 bg-gray-200 text-gray-500 flex items-center justify-center">
                {user.email.slice(0, 1).toUpperCase()}
              </span>
              <div>
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500 truncate max-w-[150px] sm:max-w-[100px]">
                  {user.email}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={user.id === session?.user.id}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {!user.banned ? (
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => banUser(user.id)}
                  >
                    <UserX className="mr-2 h-4 w-4" />
                    Ban User
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="text-green-600"
                    onClick={() => unBanUser(user.id)}
                  >
                    <UserCheck className="mr-2 h-4 w-4" />
                    Unban User
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => setIsUserRole((prev) => !prev)}
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  Change Role
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => setDeleteUser((prev) => !prev)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-wrap gap-2 my-3">
            <Badge className={getUserStatusColor(user.role || "unknown")}>
              <Shield className="mr-1 h-3 w-3" />
              {(user.role ?? "unknown").charAt(0).toUpperCase() +
                (user.role ?? "unknown").slice(1)}
            </Badge>
            <Badge className={getBannedStatusColor(user.banned ?? false)}>
              {!user.banned ? (
                <span className="flex items-center">
                  <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                  Active User
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="mr-1 h-2 w-2 rounded-full bg-red-500"></span>
                  Banned
                </span>
              )}
            </Badge>
          </div>
          <div className="text-xs sm:text-sm text-gray-500 space-y-1">
            <p>Joined: {GetDate(user.createdAt.toISOString())}</p>
            <p
              className={`${user.emailVerified ? "text-green-600" : "text-gray-700"}`}
            >
              Verified: {user.emailVerified ? "True" : "false"}
            </p>
          </div>
        </CardContent>

        <UserRoleAction
          isUserRoleModal={isUserRole}
          setIsUserRoleModal={setIsUserRole}
          userId={user.id}
        />

        <DeleteAction
          isDeleteModal={deleteUser}
          setIsDeleteModal={setDeleteUser}
          name={user.name}
          id={user.id}
        />
      </div>
    </>
  );
}

export default UserList;
