'use client'

import { useEffect, useState } from "react";
import { ConnectSpotifyButton } from "./connect-spotify-button";
import { api } from "@/lib/axios";
import Image from "next/image";
type UserData = {
  id: number;
  display_name: string;
  email: string;
  images: SpotifyAvatar[];
}

type SpotifyAvatar = {
  url: string
  width: number
  height: number
}
export function Header() {
  const [accessToken, setAccessToken] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);


  useEffect(() => {

    const fetchUserData = async () => {
      try {
        if (accessToken) {
          // Fazer uma chamada à API do Spotify para obter as informações do usuário
          const response = await api.get('/user', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const userData = response.data;

          // Armazenar as informações do usuário no estado
          setUserData(userData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [accessToken, setUserData, userData]);


  return (
    <header className="flex justify-between items-center h-[64px] px-8 bg-[#262626]">
      <div>
        <h2 className={`text-white font-semibold `}>Musical Exchange</h2>

      </div>
      <div>
        {userData && (
          <div className="flex gap-4 items-center">
            <Image
              src={userData.images[0].url}
              alt={userData.display_name}
              className="w-10 h-10 rounded-full"
              width={40}
              height={40}
            />
            <span className="text-white font-semibold">{userData.display_name}</span>
          </div>
        )}
        {!userData && (
          <ConnectSpotifyButton
            handleUserData={async (token) => setAccessToken(token)}
          />
        )}
      </div>
    </header>
  );
}