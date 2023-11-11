import useImageReader from './useImageReader.js';

export default function useImageInput() {
    const inputElement = document.createElement('input');
    // Create a new input element of type 'file'
    inputElement.type = 'file';
    inputElement.accept = 'image/*'; // Accept only images
    inputElement.multiple = true;

    const reader = useImageReader(inputElement)

    return {
        images: reader.images,
        rejections: reader.errors,
        input() {
            inputElement.click();
        }
    };
}
