'use client'

import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { PlaylistCard } from "./playlist-card";


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


export function ListOfPlaylist() {

  const [playlist, setPlaylist] = useState<Playlist[]>([]);
  const [accessToken, setAccessToken] = useState<string>('');
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        // Verificar se há um access token na URL
        const urlParams = new URLSearchParams(window.location.search);
        const receivedAccessToken = urlParams.get('access_token');

        if (receivedAccessToken) {
          // Armazenar o access token no estado
          setAccessToken(receivedAccessToken);

          // Limpar o access token da URL
        }
      } catch (error) {
        console.error(error);
      }

    }
    fetchAccessToken();

    const fetchPlaylists = async () => {
      try {
        const response = await api.get('/playlists', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const playlists = response.data.items;
        console.log(playlists)
        setPlaylist(playlists);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaylists();
  }, [accessToken]);



  return (
    <div className="h-screen w-screen flex-1 flex flex-row flex-wrap gap-3 mt-20 items-center justify-center">
      {
        playlist.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            id={playlist.id}
            name={playlist.name}
            images={playlist.images}
            href={playlist.href}
            uri={playlist.uri}
            accessToken={accessToken}
          />
        ))
      }
    </div>
  )
}