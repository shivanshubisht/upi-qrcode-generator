import Form from '@/components/Form';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex flex-col h-auto md:h-screen items-center justify-center p-10 ${inter.className}`}
    >
      <Form></Form>
    </main>
  );
}
