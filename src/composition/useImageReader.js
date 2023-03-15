import { ref } from 'vue';

async function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

export default function useImageReader(fileInput) {
  const images = ref([]);
  async function readFiles(event) {
    const { files } = event.target;
    const uploadPromises = [];
    for (let i = 0; i < files.length; i += 1) {
      uploadPromises.push(uploadImage(files[i]));
    }
    images.value = await Promise.all(uploadPromises);
  }
  fileInput.addEventListener('change', readFiles);
  return images;
}
