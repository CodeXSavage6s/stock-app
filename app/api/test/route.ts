import connectDB from "@/database/mongodb";

export async function GET() {

    try {
      await connectDB();
      return Response.json({
        message: "Database connected successfully"
      });
    } catch (error) {
      return Response.json(
        { 
          message: "Database connection failed",
          error: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
}