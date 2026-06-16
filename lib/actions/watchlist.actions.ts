'use server';

import connectDB from '@/database/mongodb';
import { Watchlist } from '@/database/models/watchlist.model';

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

export async function checkIsInWatchlist(symbol: string, userId: string): Promise<boolean> {
  if (!userId || !symbol) return false;

  try {
    await connectDB();
    const item = await Watchlist.findOne({ userId, symbol }).lean();
    return !!item;
  } catch (err) {
    console.error('checkIsInWatchlist error:', err);
    return false;
  }
}

export async function addToWatchlist(symbol: string, userId: string, company: string): Promise<boolean> {
  console.log("add hit")
  if (!userId || !symbol || !company) return false;

  try {
    await connectDB();
    const existingItem = await Watchlist.findOne({ userId, symbol });

    if (existingItem) {
      await Watchlist.deleteOne({ userId, symbol });
      console.log("add", false)
      return false; // Removed from watchlist
    } else {
      await Watchlist.create({ userId, symbol, company, addedAt: new Date() });
      console.log("add", true)
      return true; // Added to watchlist
    }
  } catch (err) {
    console.error('addToWatchlist error:', err);
    return false;
  }
}