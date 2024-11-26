import Summary from '@/components/Summary';
import { Button } from '@/components/ui/button';

export default async function Document({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cid = (await params).id;

  return (
    <div className="min-h-[70vh] relative grid place-content-center">
      <p>{cid}</p>
      <a href={`/uploads/${cid}`} download={`${cid}`}>
        Download
      </a>
      <Summary path={cid} />
    </div>
  );
}
