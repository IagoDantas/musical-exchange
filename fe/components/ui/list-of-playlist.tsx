'use client'

import { api } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PlaylistProps {
  accessToken: string;
}

type Images = {
  url: string;
}

type Playlist = {
  id: string;
  name: string;
  images: Images[];
  href: string;
  uri: string;
}


export function ListOfPlaylist({ accessToken }: PlaylistProps) {

  const [playlist, setPlaylist] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await api.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const playlists = response.data.items;
        setPlaylist(playlists);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaylists();
  }, [accessToken]);

  console.log(playlist);


  return (
    <div className="h-sreen w-screen flex-1 flex flex-row flex-wrap">
      {
        playlist.map((playlist) => (
          <div key={playlist.id} className="w-1/2 flex">
            <Image
              src={playlist.images[0].url}
              width="100"
              height="100"
              alt={playlist.name}
            />
            <h3>{playlist.name}</h3>
          </div>
        ))
      }
    </div>
  )
}