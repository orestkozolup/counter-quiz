"use client";

interface UserConfigProps {
  configUser: string | null;
  setConfigUser: (user: string | null) => void;
}

export const UserConfig = ({ configUser, setConfigUser }: UserConfigProps) => {
  return (
    <div>
      <p>Enter your name</p>
      <input
        type="text"
        value={configUser ?? ""}
        onChange={(e) => setConfigUser(e.target.value)}
      />
    </div>
  );
};

export default UserConfig;
