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
  return results.filter((result) => result.status === 'fulfilled');
}

function getFiles(event) {
  return event?.target?.files || [];
}

export default function useImageReader(fileInputRef) {
  const images = ref([]);
  const errors = computed(() => images.value.some(
      (result) => result.status === 'rejected')
  );
  async function readFiles(event) {
    const files = getFiles(event);
    if (!files.length) return;

    images.value = []; // Reset images array on new file selection

    const readPromises = Array.from(files).map(readImage);
    return Promise.allSettled(readPromises);
  }

  const addEventListener = () => {
    if (fileInputRef.value) {
      fileInputRef.value.addEventListener('change', readFiles);
    }
  };

  const removeEventListener = () => {
    if (fileInputRef.value) {
      fileInputRef.value.removeEventListener('change', readFiles);
    }
  };

  onMounted(addEventListener);
  onUnmounted(removeEventListener);

  return {
    images,
    errors
  };
}
