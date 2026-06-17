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
  const normalizedSymbol = symbol.trim().toUpperCase();
  try {
    await connectDB();
<<<<<<< HEAD
    const normalizedSymbol = symbol.trim().toUpperCase();
=======
>>>>>>> d09b210 (setup watchlist page)
    const item = await Watchlist.findOne({ userId, symbol: normalizedSymbol }).lean();
    return !!item;
  } catch (err) {
    console.error('checkIsInWatchlist error:', err);
    return false;
  }
}

<<<<<<< HEAD
export async function addToWatchlist(
  symbol: string,
  company: string
): Promise<{ ok: boolean; inWatchlist: boolean | null }> {
  if (!symbol || !company) {
    return { ok: false, inWatchlist: null };
  }
=======
export async function addToWatchlist(symbol: string, userId: string, company: string): Promise<boolean> {
  console.log("add hit");
  if (!userId || !symbol || !company) return false;
>>>>>>> d09b210 (setup watchlist page)

  const normalizedSymbol = symbol.trim().toUpperCase();

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    if (!userId) {
      return { ok: false, inWatchlist: null };
    }

    await connectDB();
<<<<<<< HEAD
    const normalizedSymbol = symbol.trim().toUpperCase();
    const normalizedCompany = company.trim();

=======
>>>>>>> d09b210 (setup watchlist page)
    const existingItem = await Watchlist.findOne({ userId, symbol: normalizedSymbol });

    if (existingItem) {
      await Watchlist.deleteOne({ userId, symbol: normalizedSymbol });
<<<<<<< HEAD
      return { ok: true, inWatchlist: false };
    } else {
      await Watchlist.create({ userId, symbol: normalizedSymbol, company: normalizedCompany, addedAt: new Date() });
      return { ok: true, inWatchlist: true };
=======
      console.log("add", false);
      return false; // Removed from watchlist
    } else {
      await Watchlist.create({ userId, symbol: normalizedSymbol, company, addedAt: new Date() });
      console.log("add", true);
      return true; // Added to watchlist
>>>>>>> d09b210 (setup watchlist page)
    }
  } catch (err) {
    console.error('addToWatchlist error:', err);
    return { ok: false, inWatchlist: null };
  }
}
