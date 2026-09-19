import { getSpotifyEmbedUrl, SPOTIFY_PLAYLIST_ID } from "@/lib/soundtrack";

export function SpotifyPlaylistEmbed({ dark }: { dark: boolean }) {
  const src = getSpotifyEmbedUrl(SPOTIFY_PLAYLIST_ID, dark);

  return (
    <iframe
      title="Our soundtrack"
      src={src}
      width="100%"
      height={480}
      style={{ border: 0, borderRadius: 12 }}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="min-h-[480px] w-full"
    />
  );
}
