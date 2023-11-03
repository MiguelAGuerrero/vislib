import {ref, onMounted, onUnmounted, computed} from 'vue';

async function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result); // This is a base64 data URL
    };
    reader.onerror = (error) => {
      reader.abort();
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

function getSucceeded(results) {
  return results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value);
}

function getErrors(results) {
  return results
    .filter((result) => result.status === 'rejected')
    .map((result) => result.reason);
}

function getFiles(event) {
  return event?.target?.files || [];
}

export default function useImageReader(fileInputElement) {
  if (!fileInputElement) {
    throw new Error('File input element is undefined.');
  }

  const images = ref([]);
  const rejections = ref([]);

  async function readFiles(event) {
    const files = getFiles(event);
    if (!files.length) return;

    images.value = []; // Reset images array on new file selection

    const readPromises = Array.from(files).map(readImage);
    const results = await Promise.allSettled(readPromises);
    images.value = getSucceeded(results);
    rejections.value = getErrors(results);
  }

  const listenForChanges = () => {
    fileInputElement.addEventListener('change', readFiles);
  };

  const removeChangeListener = () => {
    fileInputElement.removeEventListener('change', readFiles);
  };

  onMounted(listenForChanges);
  onUnmounted(removeChangeListener);

  return {
    images,
    rejections
  };
}
