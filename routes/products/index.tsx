import { Handlers } from "$fresh/server.ts";
import ProductCard from "../../islands/ProductCard.tsx";
import { fetchProducts } from "../../database/Product/operations.ts";

export const handler: Handlers = {
  async GET(_req, ctx: any) {
    try {
      const users = await fetchProducts();
      return await ctx.render(users);
    } catch (error) {
      console.error(error);
    }
  },
};

export default function index({ data }: any) {
  return (
    <div class="my-6">
      <ProductCard data={data} />
    </div>
  );
}
