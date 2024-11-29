export async function configUrl(name: string) {
  setTimeout(() => {}, 3000);

  const url =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9.]/g, '')
      .replace(/^-+|-+$/g, '') || 'uploaded-file';

  return url;
}
