import React, { useState } from "react";
import UserPopup from "../user-popup/UserPopup";
import { Role } from "@/constant"; 
import { MdGroupAdd } from "react-icons/md";
import { Button } from "antd";

const Sidebar: React.FC<{ role: Role }> = ({ role }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const canAddUser = role === Role.ADMIN || role === Role.OWNER;

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditing(true);
  };

  return (
    <div className="w-[250px] h-screen overflow-auto bg-primary p-4 text-white">
      {canAddUser && (
        <Button
          type="primary"
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg
             bg-gradient-to-r from-slate-500 to-slate-600 shadow-lg
             hover:from-slate-600 hover:to-slate-500 hover:scale-105 transition-all duration-300"
          onClick={handleAddUser}
          icon={<MdGroupAdd size={22} className="text-white" />}
        >
          <span className="font-semibold text-white">Add User</span>
        </Button>
      )}

      {isEditing && (
        <UserPopup
          open={isEditing}
          onClose={() => setIsEditing(false)}
          prevData={selectedUser}
          currentRole={role}
        />
      )}
    </div>
  );
};

export default React.memo(Sidebar);
