"use client";

import { useEffect, useState } from "react";

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("admin-auth");
    setAuthenticated(token === "true");
    setLoading(false);
  }, []);

  function login(password: string): boolean {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (adminPassword && password === adminPassword) {
      sessionStorage.setItem("admin-auth", "true");
      setAuthenticated(true);
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem("admin-auth");
    setAuthenticated(false);
  }

  return { authenticated, loading, login, logout };
}
