interface UserDetailsProps {
  params: {
    userId: string;
  };
}


export default async function UserDetails({ params }: UserDetailsProps) {
  return (
    <div className="flex flex-col gap-8">
      <h3>Informações do Usuário</h3>
      <p>id: {params.userId}</p>
    </div>
  );
}
