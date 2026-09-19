/** Replace with your playlist ID from open.spotify.com/playlist/{id} */
export const SPOTIFY_PLAYLIST_ID = "6SaexhIs7Uiddu2R4ihHiW";

export function getSpotifyEmbedUrl(playlistId: string, dark: boolean): string {
  const theme = dark ? 0 : 1;
  // Cache-bust so Spotify picks up a newly updated playlist cover / tint.
  return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=${theme}&v=2`;
}
