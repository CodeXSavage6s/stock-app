'use server';

import connectDB from '@/database/mongodb';
import { Watchlist } from '@/database/models/watchlist.model';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

export async function getWatchlistSymbolsByUserId(userId: string): Promise<{ symbol: string; company: string; addedAt: Date }[]> {
  if (!userId) return [];

  try {
    await connectDB();
    const items = await Watchlist.find({ userId }).lean();
    return items.map((i) => ({
      userId: String(i.userId),
      symbol: String(i.symbol),
      company: String(i.company)
      //addedAt: i.addedAt,
    }));
  } catch (err) {
    console.error('getWatchlistSymbolsByUserId error:', err);
    return [];
  }
}

export async function checkIsInWatchlist(symbol: string, userId: string): Promise<boolean> {
  if (!userId || !symbol) return false;
  const normalizedSymbol = symbol.trim().toUpperCase();
  try {
    await connectDB();
    const item = await Watchlist.findOne({ userId, symbol: normalizedSymbol }).lean();
    return !!item;
  } catch (err) {
    console.error('checkIsInWatchlist error:', err);
    return false;
  }
}

export async function addToWatchlist(symbol: string, userId: string, company: string): Promise<boolean> {
  console.log("add hit");
  if (!userId || !symbol || !company) return false;

  const normalizedSymbol = symbol.trim().toUpperCase();

  try {
    await connectDB();
    const existingItem = await Watchlist.findOne({ userId, symbol: normalizedSymbol });

    if (existingItem) {
      await Watchlist.deleteOne({ userId, symbol: normalizedSymbol });
      console.log("add", false);
      return false; // Removed from watchlist
    } else {
      await Watchlist.create({ userId, symbol: normalizedSymbol, company, addedAt: new Date() });
      console.log("add", true);
      return true; // Added to watchlist
    }
  } catch (err) {
    console.error('addToWatchlist error:', err);
    return false;
  }
}
