// File: /api/users/index.ts (for GET all users)
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(request) {
  try {
    // Fetch all users from the database
    const allUsers = await db.select().from(users);
    
    // Return successful response with users data
    return new Response(JSON.stringify(allUsers), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}