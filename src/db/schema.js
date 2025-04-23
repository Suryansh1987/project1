import { pgTable, serial, varchar, decimal, timestamp } from 'drizzle-orm/pg-core';


export const schools = pgTable('schools', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 6 }).notNull(),
  longitude: decimal('longitude', { precision: 10, scale: 6 }).notNull(),
  createdAt: timestamp('created_at').defaultNow()
});