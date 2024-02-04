'use client'
import { Button } from "./button";
import { Volume2 } from 'lucide-react';

import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Playlist } from "./playlist";

type SpotifyAvatar = {
  url: string
  width: number
  height: number
}

type UserData = {
  id: number;
  display_name: string;
  email: string;
  images: SpotifyAvatar[];
}

export function ConnectSpotifyButton() {

  const [accessToken, setAccessToken] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleConnectSpotify = async () => {
    try {
      // Redirecionar o usuário para a página de autenticação do Spotify
      window.location.href = 'http://localhost:3333/signin'; // Substituir pela URL correta no seu servidor
    } catch (error) {
      console.error(error);
    }
  };

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
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccessToken();
    const fetchUserData = async () => {
      try {
        if (accessToken) {
          // Fazer uma chamada à API do Spotify para obter as informações do usuário
          const response = await api.get('https://api.spotify.com/v1/me', {
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
  }, [accessToken]);

  return (
    <>
      <Button onClick={handleConnectSpotify}>
        <Volume2 size={20} />
        Connect Spotify
      </Button>
      {userData && (
        <div className="flex flex-col gap-8">
          <h3>Informações do Usuário</h3>
          <p>id: {userData.id}</p>
          <p>Nome: {userData.display_name}</p>
          <p>Email: {userData.email}</p>
          {userData && userData.images && (
            <Image src={userData.images[1].url} width={userData.images[1].width} height={userData.images[1].height} alt={userData.display_name} />
          )}
          <Playlist accessToken={accessToken} />
        </div >
      )
      }
    </>

  )
}