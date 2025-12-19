import React, { useState } from "react";
import { saveProfile } from "../Services/profileService";

export default function CreateProfile({ user, existingProfile, onSave }) {
  const [form, setForm] = useState({
    name: existingProfile?.name || "",
    address: existingProfile?.address || "",
    education: existingProfile?.education || "",
    skills: existingProfile?.skills || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saved = await saveProfile(user.id, form);
    onSave(saved);
  };

  return (
    <div className="profile-form">
      <h2>{existingProfile ? "Edit Profile" : "Create Profile"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          name="education"
          placeholder="Education"
          value={form.education}
          onChange={handleChange}
        />

        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
        />

        <button type="submit">
          {existingProfile ? "Update Profile" : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
