import { ConnectSpotifyButton } from "./connect-spotify-button";

export function Header() {
  return (
    <header className="flex justify-between items-center h-[64px] bg-[#262626]">
      <div>
        <h2 className="text-white font-semibold">Musical Exchange</h2>

      </div>
      <div>

        <ConnectSpotifyButton />
      </div>
    </header>
  );
}