import { z } from "zod";

const schema = z.object({
  name: z.string().min(5).max(15),
});

export default schema;
