import Summary from '@/components/Summary';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';

export default async function Document({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cid = (await params).id;

  return (
    <section className="max-w-[700px] mx-auto  min-h-screen mt-20 mb-40">
      <Summary path={cid} />
    </section>
  );
}
