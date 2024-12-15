import request from "@/utils/request";
import type { Result } from "@/types/api/base";

enum API {
  TOP_ARTIST_URL = "/user/top-artist",
}

export const getTopArtists = () => {
  return request.get<any, Result>(API.TOP_ARTIST_URL);
};
