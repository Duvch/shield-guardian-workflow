import { pgTable, serial, text, varchar, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

// Create user plan enum
export const userPlanEnum = pgEnum('user_plan', ['Free', 'Pro', 'Enterprise']);

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  avatar: text('avatar').default('/placeholder.svg?height=40&width=40'),
  plan: userPlanEnum('plan').default('Free').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Sessions table
export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => users.id).notNull(),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Scan requests table
// export const scanRequests = pgTable('scan_requests', {
//   id: serial('id').primaryKey(),
//   userId: serial('user_id').references(() => users.id).notNull(),
//   url: text('url').notNull(),
//   status: varchar('status', { length: 50 }).default('pending').notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
//   completedAt: timestamp('completed_at'),
// });

// Scan results table
// export const scanResults = pgTable('scan_results', {
//   id: serial('id').primaryKey(),
//   scanRequestId: serial('scan_request_id').references(() => scanRequests.id).notNull(),
//   result: text('result').notNull(),
//   score: varchar('score', { length: 20 }),
//   detectionType: varchar('detection_type', { length: 100 }),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
// });

// Scan requests table
export const scanRequests = pgTable('scan_requests', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => users.id).notNull(),
  url: text('url').notNull(),
  contentType: varchar('content_type', { length: 20 }).notNull(),
  description: text('description'),
  platforms: text('platforms').notNull(),
  purposes: text('purposes').notNull(),
  priority: varchar('priority', { length: 20 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Scan results table
export const scanResults = pgTable('scan_results', {
  id: serial('id').primaryKey(),
  scanRequestId: serial('scan_request_id').references(() => scanRequests.id).notNull(),
  result: text('result').notNull(),
  score: varchar('score', { length: 20 }),
  detectionType: varchar('detection_type', { length: 100 }),
  platform: varchar('platform', { length: 50 }),
  sourceUrl: text('source_url'),
  mutlipleSources:text('multiple_sources').array(),
  imageUrl:text('image_url').array(), 
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Takedown requests table
export const takedownRequests = pgTable('takedown_requests', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => users.id).notNull(),
  scanResultId: serial('scan_result_id').references(() => scanResults.id),
  url: text('url').notNull(),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  notes: text('notes'),
  userEmail: varchar('user_email', { length: 255 }).notNull(),
  platform: varchar('platform', { length: 100 }).notNull(),
  violation: text('violation').notNull(),
  evidence: text('evidence'),
  approvedBy: serial('approved_by').references(() => users.id),
  dmcaReference: varchar('dmca_reference', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});