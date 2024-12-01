export async function uploadNote(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await fetch('/api/note', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      return data;
    } else {
      console.log(`error: ${data.error}`);
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}
