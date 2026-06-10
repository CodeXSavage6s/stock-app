import connectDB from '../database/mongodb'

async function test() {
  await connectDB()
}