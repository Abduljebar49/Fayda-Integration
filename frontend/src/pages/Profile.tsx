import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/me", { withCredentials: true }) // send cookie automatically
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to fetch user:", err));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Birthdate:</strong> {user.birthdate}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>Phone:</strong> {user.phone_number}</p>
      {user.picture && (
        <img
          src={user.picture}
          alt="Profile"
          style={{ width: 150, height: 150, borderRadius: "50%" }}
        />
      )}
    </div>
  );
}
