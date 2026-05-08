import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type LuckyDrawEntry = {
  user_id: string;
  nickname: string;
  phone: string;
  week: string;
};

// 이번 주 식별자 (예: "2026-W19")
export function getCurrentWeek(): string {
  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const week = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

// 응모 등록
export async function submitLuckyDraw(entry: LuckyDrawEntry) {
  const { error } = await supabase
    .from('lucky_draw_entries')
    .insert(entry);
  if (error) throw error;
}

// 이번 주 이미 응모했는지 확인
export async function hasEnteredThisWeek(userId: string): Promise<boolean> {
  const week = getCurrentWeek();
  const { data, error } = await supabase
    .from('lucky_draw_entries')
    .select('id')
    .eq('user_id', userId)
    .eq('week', week)
    .maybeSingle();
  if (error) return false;
  return !!data;
}
