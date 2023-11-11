export default function useBodyScroll() {
    function enableScroll() {
        document.body.style.overflow = 'visible';
    }
    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }
    return {
        enable: enableScroll,
        disable: disableScroll
    };
}

