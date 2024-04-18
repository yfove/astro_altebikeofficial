import { defineDb, defineTable, column } from "astro:db";

const Views = defineTable({
  columns: {
    slug: column.text({ primaryKey: true }),
    count: column.number({
      default: 0,
    }),
  },
});

export default defineDb({
  tables: { Views },
});