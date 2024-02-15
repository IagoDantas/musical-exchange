'use client'
import { useEffect } from "react";
import { Button } from "./button";
import { Volume2 } from 'lucide-react';

interface ConnectSpotifyButtonProps {
  handleUserData: (token: string) => Promise<void>;
}
export function ConnectSpotifyButton({ handleUserData }: ConnectSpotifyButtonProps) {

  const handleConnectSpotify = async () => {
    try {
      // Redirecionar o usuário para a página de autenticação do Spotify
      window.location.href = 'http://localhost:3333/signin';// Substituir pela URL correta no seu servidor
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
          handleUserData(receivedAccessToken);

          // Limpar o access token da URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAccessToken();
  }, [handleUserData])


  return (
    <>
      <Button className="flex gap-2 font-normal bg-lime-600" onClick={handleConnectSpotify} >
        <Volume2 size={20} />
        Connect to Spotify
      </Button>
    </>

  )
}