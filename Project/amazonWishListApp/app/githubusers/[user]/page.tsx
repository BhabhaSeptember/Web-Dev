import Repos from "../../components/Repos";

type UserReposPageProps = {
  params: Promise<{
    user: string;
  }>;
};

export default async function UserReposPage({ params }: UserReposPageProps) {
  const { user } = await params;

  return (
    <div>
      <Repos user={user} />
    </div>
  );
}
