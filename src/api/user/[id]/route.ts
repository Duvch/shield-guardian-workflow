// File: /api/users/[id]/route.ts (for PATCH to update user plan)
import { db } from '@/lib/db';
import { users, userPlanEnum } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(request, { params }) {
  try {
    const userId = parseInt(params.id);
    if (isNaN(userId)) {
      return new Response(JSON.stringify({ error: 'Invalid user ID' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const body = await request.json();
    const { plan } = body;

    // Validate plan value against our enum
    if (!['Free', 'Pro', 'Enterprise'].includes(plan)) {
      return new Response(JSON.stringify({ error: 'Invalid plan value' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Update user plan in the database
    await db.update(users)
      .set({ 
        plan: plan,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId));

    // Fetch the updated user
    const updatedUser = await db.select()
      .from(users)
      .where(eq(users.id, userId))
      .then(res => res[0]);

    // Return successful response
    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating user plan:', error);
    return new Response(JSON.stringify({ error: 'Failed to update user plan' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}