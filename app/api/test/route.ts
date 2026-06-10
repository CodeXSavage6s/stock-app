import connectDB from "@/database/mongodb";

export async function GET() {
  await connectDB();

  return Response.json({
    message: "Database connected successfully"
  });
}