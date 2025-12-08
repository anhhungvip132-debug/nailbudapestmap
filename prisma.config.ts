import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    db: {
      // Sử dụng DATABASE_URL từ biến môi trường
      url: process.env.DATABASE_URL!,
    },
  },
  // Prisma Client config
  client: {
    // Không cần cấu hình gì thêm
  },
});
