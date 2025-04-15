"use client";

interface UserConfigProps {
  configUser: string | null;
  setConfigUser: (user: string | null) => void;
}

export const UserConfig = ({ configUser, setConfigUser }: UserConfigProps) => {
  return (
    <input
      type="text"
      placeholder="Enter your name"
      value={configUser ?? ""}
      onChange={(e) => setConfigUser(e.target.value)}
    />
  );
};

export default UserConfig;
