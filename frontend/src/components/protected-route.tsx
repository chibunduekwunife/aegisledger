"use client";

import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import api from "@/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "@/constants";
import { useState, useEffect } from "react";
import { Navbar } from "./layout/navbar";
import { fetchUserInfo } from "@/api/user";
import { LoadingIndicator } from "./loading-indicator";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isProtected: boolean;
}

export default function ProtectedRoute({
  children,
  isProtected,
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string>("");

  // as soon as we call our protected routes, we check authorization

  useEffect(() => {
    if (isProtected) {
      auth().catch(() => setIsAuthorized(false));
    }
  }, []);

  useEffect(() => {
    if (isProtected && isAuthorized === false) {
      router.replace("/login");
    }
  }, [isProtected, isAuthorized, router]);

  useEffect(() => {
    fetchUserInfo().then((user) => {
      if (user && user.username) {
        setUsername(user.username);
      }
    });
  }, [isAuthorized]);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      //res should = our newly refreshed access token

      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status == 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decoded = jwtDecode<{ exp?: number }>(token);
    const tokenExpiration = decoded.exp;

    if (!tokenExpiration) {
      setIsAuthorized(false);
      return;
    }

    const now = Date.now() / 1000; // day in seconds

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isProtected && isAuthorized === null) {
    return <LoadingIndicator />;
  }

  if (isProtected && !isAuthorized) {
    return null;
  }

  return (
    <div>
      {/* <Navbar username={username} isAuthorized={isAuthorized} /> */}
      {children}
    </div>
  );
}
