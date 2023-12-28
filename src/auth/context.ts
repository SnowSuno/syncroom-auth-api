import { exists, nextRedirection } from "../utils";

export const getContext = async () => {
  const socializeURL = await nextRedirection(
    "https://webapi.syncroom.appservice.yamaha.com/comm/oauth2/authorize?identity_provider=ymid-kr&response_type=webKey",
  );
  const idpURL = await nextRedirection(socializeURL);

  return {
    continueURL: `${socializeURL.protocol}//${socializeURL.hostname}${socializeURL.pathname}/continue`,
    ApiKey: socializeURL.pathname.split("/")[4],
    context: exists(idpURL.searchParams.get("context")),
  };
};
