"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import AnnouncementsList from "../../components/AnnouncementList";

export default function DashboardPage() {
  const router = useRouter();

  // ✅ SEMUA STATE DI ATAS
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [user, setUser] = useState([]);

  // 🔐 PROTECT DASHBOARD
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
    //   console.log(session.user.email);

      if (!session) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    };
    // console.log(session);

    checkSession();
  }, [router]);

  // 📦 FETCH PRODUCTS
  useEffect(() => {
    if (!loading) {
      fetchAnnouncements();
      fetchUser();
    }
  }, [loading]);

  async function fetchAnnouncements() {
    const res = await fetch("/api/announcements");
    const data = await res.json();
    setAnnouncements(data);
  }

  async function fetchUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

    setUser(session.user.email);
  }

async function handleLogOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
    } else {
      console.log("Logout successful");
      // Optional: redirect to login page
      window.location.href = "/login";
    }
  } catch (err) {
    console.error("Unexpected error during logout:", err);
  }
}

  async function handleDelete(id) {
    await fetch("/api/announcements", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchAnnouncements();
  }

  // ✅ CONDITIONAL RETURN DI PALING BAWAH
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>User</h1>
      <h3 id="userEmail">{user}</h3>

    <button onClick={handleLogOut}>
      Log Out
    </button>
      <p></p>
      <h1>Announcements</h1>

      <AnnouncementsList
        announcements={announcements}
        onDelete={handleDelete}
      />

    </div>
  );
}
