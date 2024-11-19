import { pinata } from './pinata';

export async function getFile(id: string) {
  const url = await pinata.gateways.createSignedURL({
    cid: id,
    expires: 180,
  });

  return url;
}
