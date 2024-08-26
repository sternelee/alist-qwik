import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ sharedMap, redirect }) => {
  const { bearer } = sharedMap.get("user") || {};
  if (!bearer) redirect(302, "/login");
};

export default component$(() => {
  return <Slot />;
});
