import Summary from '@/components/Summary';
import './style.css';

export default async function Document({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cid = (await params).id;

  return (
    <section className="max-w-[700px] mx-auto min-h-[60vh] mt-16 mb-40">
      <Summary path={cid} />
    </section>
  );
}
