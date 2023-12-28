import { exists } from "./exists";

export const nextRedirection = async (url: string | URL, options?: RequestInit) => {
  if (url instanceof URL) url = url.toString();
  const res = await fetch(url, { redirect: "manual", ...options });
  const nextURL = res.headers.get("location");
  return new URL(exists(nextURL));
};
