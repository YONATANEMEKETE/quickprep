export default async function Document({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cid = (await params).id;
  // const data = await getFile(cid);
  // await generateDocument(cid);

  return (
    <div className="min-h-[70vh] relative grid place-content-center">
      <p>{cid}</p>
      <a href={cid} download={cid}>
        View | Download
      </a>
    </div>
  );
}
