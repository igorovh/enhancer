export function tooltip(element, className) {
    element.addEventListener('mouseover', () => {
        document.querySelector(`.te-tooltip.${className}`).classList.add('te-tooltip-active');
    });
    element.addEventListener('mouseout', () => {
        document.querySelector(`.te-tooltip.${className}`).classList.remove('te-tooltip-active');
    });
}