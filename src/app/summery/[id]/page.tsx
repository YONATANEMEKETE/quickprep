import Summary from '@/components/Summary';
import './style.css';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  return {
    title: `${id} | PDF Summary`,
  };
}

export default async function Document({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cid = (await params).id;

  return (
    <section className="max-w-[700px] mx-auto min-h-screen pt-16  pb-40">
      <Summary path={cid} />
    </section>
  );
}
