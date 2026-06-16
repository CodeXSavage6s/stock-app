'use server';

import connectDB from '@/database/mongodb';
import { Watchlist } from '@/database/models/watchlist.model';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

export async function getWatchlistSymbolsByUserId(userId: string): Promise<string[]> {
  if (!userId) return [];

  try {
    await connectDB();
    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByUserId error:', err);
    return [];
  }
}

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error('Mongoose connection not connected');

    const user = await db.collection('user').findOne(
      { email },
      { projection: { id: 1, _id: 1 } }
    );

    if (!user) return [];

    const userId = user.id || user._id?.toString();
    if (!userId) return [];

    return await getWatchlistSymbolsByUserId(userId);
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}

export async function checkIsInWatchlist(symbol: string, userId: string): Promise<boolean> {
  if (!userId || !symbol) return false;

  try {
    await connectDB();
    const normalizedSymbol = symbol.trim().toUpperCase();
    const item = await Watchlist.findOne({ userId, symbol: normalizedSymbol }).lean();
    return !!item;
  } catch (err) {
    console.error('checkIsInWatchlist error:', err);
    return false;
  }
}

export async function addToWatchlist(
  symbol: string,
  company: string
): Promise<{ ok: boolean; inWatchlist: boolean | null }> {
  if (!symbol || !company) {
    return { ok: false, inWatchlist: null };
  }

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    if (!userId) {
      return { ok: false, inWatchlist: null };
    }

    await connectDB();
    const normalizedSymbol = symbol.trim().toUpperCase();
    const normalizedCompany = company.trim();

    const existingItem = await Watchlist.findOne({ userId, symbol: normalizedSymbol });

    if (existingItem) {
      await Watchlist.deleteOne({ userId, symbol: normalizedSymbol });
      return { ok: true, inWatchlist: false };
    } else {
      await Watchlist.create({ userId, symbol: normalizedSymbol, company: normalizedCompany, addedAt: new Date() });
      return { ok: true, inWatchlist: true };
    }
  } catch (err) {
    console.error('addToWatchlist error:', err);
    return { ok: false, inWatchlist: null };
  }
}