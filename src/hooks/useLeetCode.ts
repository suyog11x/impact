import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_LEETCODE_URL || 'http://localhost:5000';

export interface LeetCodeStats {
  username: string;
  avatar: string | null;
  realName: string | null;
  ranking: number | null;
  reputation: number | null;
  school: string | null;
  country: string | null;
  skillTags: string[];
  solved: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
  streak: number;
  totalActiveDays: number;
  submissionCalendar: Record<string, number>;
  badges: Array<{ id: string; displayName: string; icon: string; creationDate: string }>;
  activeBadge: { displayName: string; icon: string } | null;
  languages: Array<{ languageName: string; problemsSolved: number }>;
  topTags: {
    advanced: Array<{ tagName: string; tagSlug: string; problemsSolved: number }>;
    intermediate: Array<{ tagName: string; tagSlug: string; problemsSolved: number }>;
    fundamental: Array<{ tagName: string; tagSlug: string; problemsSolved: number }>;
  };
  recentSubmissions: Array<{
    id: string;
    title: string;
    titleSlug: string;
    timestamp: string;
    lang: string;
    runtime: string;
    memory: string;
  }>;
  contest: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
    badge: { name: string } | null;
  } | null;
}

// Simple in-memory cache to avoid re-fetching on every re-render
const cache: Record<string, { data: LeetCodeStats; ts: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function useLeetCode(username: string | null | undefined) {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setStats(null);
      return;
    }

    const now = Date.now();
    const cached = cache[username];
    if (cached && now - cached.ts < CACHE_TTL) {
      setStats(cached.data);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/api/leetcode-stats/${username}`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to fetch LeetCode stats');
        return r.json();
      })
      .then((data: LeetCodeStats) => {
        cache[username] = { data, ts: Date.now() };
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  return { stats, loading, error };
}

// Standalone validate function used in signup
export async function validateLeetCodeUsername(username: string): Promise<{
  valid: boolean;
  avatar?: string | null;
  realName?: string | null;
  ranking?: number | null;
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/api/validate-leetcode`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    return await res.json();
  } catch {
    return { valid: false, error: 'Server unreachable. Is the backend running?' };
  }
}
