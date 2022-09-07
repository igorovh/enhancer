import { addOption } from '$Utils/messageMenu';
import { addText } from '$Utils/chat';

addOption({
    position: 3,
    text: 'Copy username to text area',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 619 634" class="te-message-menu-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M160 64C160 28.7 188.7 0 224 0H448C483.3 0 512 28.7 512 64V288C512 323.3 483.3 352 448 352H224C188.7 352 160 323.3 160 288V64ZM0 224C0 188.7 28.7 160 64 160H128V224H64V448H288V384H352V448C352 483.3 323.3 512 288 512H64C28.7 512 0 483.3 0 448V224ZM573.143 450.25C573.143 484.081 545.772 511.5 512 511.5C478.228 511.5 450.857 484.081 450.857 450.25C450.857 416.419 478.228 389 512 389C545.772 389 573.143 416.419 573.143 450.25ZM405 619.788C405 572.654 443.119 534.469 490.17 534.469H533.83C580.881 534.469 619 572.654 619 619.788C619 627.636 612.647 634 604.813 634H419.187C411.353 634 405 627.636 405 619.788Z"/></svg>`,
    condition: () => {
        return !document.querySelector('p[data-test-selector="current-user-timed-out-text"]');
    },
    available: () => {
        return true;
    },
    callback: (message, data) => {
        const username = data.props?.message?.user?.displayName;
        if (!username) return true;
        addText(`@${username}, `, true);
        return true;
    },
});
