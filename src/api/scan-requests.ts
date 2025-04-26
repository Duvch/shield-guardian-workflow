// src/api/scan-requests.ts
import { db } from "../lib/db";
import { scanRequests, users, scanResults } from "../lib/schema";
import { eq } from "drizzle-orm";

export async function getScanRequests() {
  try {
    // Join users and scan requests to get user email and plan
    const requests = await db
      .select({
        id: scanRequests.id,
        userId: scanRequests.userId,
        url: scanRequests.url,
        contentType: scanRequests.contentType,
        description: scanRequests.description,
        platforms: scanRequests.platforms,
        purposes: scanRequests.purposes,
        priority: scanRequests.priority,
        status: scanRequests.status,
        createdAt: scanRequests.createdAt,
        updatedAt: scanRequests.updatedAt,
        userEmail: users.email,
        plan: users.plan
      })
      .from(scanRequests)
      .innerJoin(users, eq(scanRequests.userId, users.id))
      .where(eq(scanRequests.status, "pending"));
    return requests;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch scan requests");
  }
}

export async function updateScanRequestStatus(
  id: number, 
  status: "approve" | "reject", 
  notes?: string
) {
  try {
    // Convert the action to database status
    const dbStatus = status === "approve" ? "approved" : "rejected";
    
    await db
      .update(scanRequests)
      .set({ 
        status: dbStatus, 
        updatedAt: new Date(), // Use a Date object directly, not a string
        notes: notes || null  // Store the comment in notes field if available
      })
      .where(eq(scanRequests.id, id));
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to update scan request");
  }
}

export async function submitScanResults(scanResult: {
  scanRequestId: number;
  result: string;
  score: string;
  detectionType: string;
  platform: string;
  sourceUrl: string;
  multipleSources: string[];
  imageUrl: string[];
}) {
  try {
    // Insert directly into the database with a proper Date object
    await db.insert(scanResults).values({
      scanRequestId: scanResult.scanRequestId,
      result: scanResult.result,
      score: scanResult.score,
      detectionType: scanResult.detectionType,
      platform: scanResult.platform,
      sourceUrl: scanResult.sourceUrl,
      mutlipleSources: scanResult.multipleSources || [], // Use the property from the interface, BUT map to the DB field with typo
      imageUrl: scanResult.imageUrl || [], 
      createdAt: new Date()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error submitting scan results:', error);
    throw error;
  }
}