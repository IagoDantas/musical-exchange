'use client'

import Link from "next/link"

import Image from 'next/image'
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

type Images = {
  url: string;
}

interface PlaylistCardProps {
  id: string;
  name: string;
  images: Images[];
  href: string;
  uri: string;
  accessToken: string;
}

type Tracks = {
  items: {
    track: {
      album: {},
      artists: [],
      id: string;
      name: string;
    }
  };
  total: number;
}

export function PlaylistCard({ accessToken, id, name, images, href, uri }: PlaylistCardProps) {
  const [tracks, setTracks] = useState<Tracks[]>([]);

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      try {
        const response = await api.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
        })

        const { items } = response.data;
        setTracks(items);
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchPlaylistTracks();
  }, [accessToken, id]);



  return (
    <Link href="/playlist/1" >
      <div className="flex w-[500px] h-[120px] rounded-md shadow-md">
        <div className="flex justify-center items-center w-[200px] h-[120px] bg-white rounded-t-md">
          <Image
            src={images[0].url}
            width="100"
            height="100"
            alt={name}
          />
        </div>
        <div className="flex flex-col justify-center items-start p-2 gap-2">
          <h2 className="text-lg text-white font-semibold">{name}</h2>
          <h2 className="text-lg text-white font-semibold">{tracks.length} songs</h2>
        </div>
      </div>
    </Link >
  );
}