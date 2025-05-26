"use client"

import api from "@/api";
import { ACCESS_TOKEN } from "@/constants";

export async function fetchUserInfo(): Promise<{ username: string } | null> {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) return null;
  try {
    const res = await api.get('/api/user/', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { username: res.data.username };
  } catch (error) {
    alert(error)
    return null;
  }
}