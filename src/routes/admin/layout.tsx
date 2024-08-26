import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ sharedMap, redirect }) => {
  const { token } = sharedMap.get("user") || {};
  if (!token) redirect(302, "/login");
};

export default component$(() => {
  return <Slot />;
});
