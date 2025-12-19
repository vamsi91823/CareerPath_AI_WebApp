import React, { useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import Profile from "./Profile";
import { fetchUserProfileDetails } from "../Services/userService";

export default function ProfilePage({ user }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
       
       const user = await fetchUserProfileDetails();
        setProfile(user);
      } catch (err) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!profile || editMode) {
    return (
      <Profile/>
    );
  }

  return <ProfileView profile={profile} onEdit={() => setEditMode(true)} />;
}
