import { HTTPException } from "hono/http-exception";

import { getContext } from "./context";
import { exists, formData, nextRedirection } from "../utils";

export const login = async (username: string, password: string) => {
  const { continueURL, ApiKey, context } = await getContext();

  const credentials = await fetch(
    "https://socialize-us.yamaha.com/accounts.login",
    {
      method: "POST",
      body: formData({
        loginID: username,
        password: password,
        ApiKey,
      }),
    }
  ).then(res => res.json());

  if ([401, 403].includes(credentials.statusCode)) throw new HTTPException(
    credentials.statusCode, credentials.message);

  const { headers } = await fetch(
    "https://socialize-us.yamaha.com/accounts.webSdkBootstrap?" +
    new URLSearchParams({ ApiKey }),
    { credentials: "include" }
  );

  const providerRedirection = await nextRedirection(continueURL + "?" + new URLSearchParams({
    context,
    login_token: exists(credentials.sessionInfo.cookieValue),
  }), { headers: { Cookie: exists(headers.get("set-cookie")) } });

  const serviceRedirection = await nextRedirection(providerRedirection);

  return exists(new URLSearchParams(serviceRedirection.hash).get("webKey"));
};
