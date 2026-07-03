import Resetpassword from '@/features/auth/components/forget-password/reset-password';

interface Props {
  searchParams: Promise<{
    token?: string;
  }>;
}
export default async function page({ searchParams }: Props) {
  const { token } = await searchParams;

  return <Resetpassword token={token}></Resetpassword>;
}
