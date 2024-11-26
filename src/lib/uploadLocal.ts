export async function uploadLocal(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.filePath);
      return data;
    } else {
      console.log(`error: ${data.error}`);
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}
