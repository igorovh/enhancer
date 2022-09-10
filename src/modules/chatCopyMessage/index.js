import { addOption } from '$Utils/messageMenu';
import { setText } from '$Utils/chat';

addOption({
    text: 'Copy message to text area',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 657 621" class="te-message-menu-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M160 64C160 28.7 188.7 0 224 0H448C483.3 0 512 28.7 512 64V288C512 323.3 483.3 352 448 352H224C188.7 352 160 323.3 160 288V64ZM0 224C0 188.7 28.7 160 64 160H128V224H64V448H288V384H352V448C352 483.3 323.3 512 288 512H64C28.7 512 0 483.3 0 448V224ZM367 430.438C367 415.428 379.178 403.25 394.188 403.25H629.812C644.822 403.25 657 415.428 657 430.438C657 438.99 652.979 447.033 646.125 452.188L522.875 544.625C516.418 549.439 507.582 549.439 501.125 544.625L377.875 452.188C371.021 447.033 367 438.99 367 430.438ZM367 584.5V466.688L490.25 559.125C503.164 568.811 520.836 568.811 533.75 559.125L657 466.688V584.5C657 604.494 640.744 620.75 620.75 620.75H403.25C383.256 620.75 367 604.494 367 584.5Z"/></svg>`,
    condition: () => {
        return !document.querySelector('p[data-test-selector="current-user-timed-out-text"]');
    },
    available: () => {
        return true;
    },
    callback: (message, data) => {
        const content = data.props?.message?.message || data.props?.message?.messageBody;
        if (!content) return true;
        setText(content, true);
        return true;
    },
});
