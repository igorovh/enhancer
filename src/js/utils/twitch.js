// https://github.com/SevenTV/SevenTV/blob/dev/src/Sites/twitch.tv/Util/Twitch.ts

function findReactParents(node, predicate, maxDepth = 15, depth = 0) {
    let success = false;
    try { success = predicate(node); } catch (_) {}
    if (success) return node;
    if (!node || depth > maxDepth) return null;

    const { 'return': parent } = node;
    if (parent) {
        return findReactParents(parent, predicate, maxDepth, depth + 1);
    }

    return null;
}

function findReactChildren(node, predicate, maxDepth = 15, depth = 0) {
    let success = false;
    try { success = predicate(node); } catch (_) {}
    if (success) return node;
    if (!node || depth > maxDepth) return null;

    const { child, sibling } = node;
    if (child || sibling) {
        return findReactChildren(child, predicate, maxDepth, depth + 1) || findReactChildren(sibling, predicate, maxDepth, depth + 1);
    }

    return null;
}

function getReactInstance(element) {
    for(const k in element) {
        if (k.startsWith('__reactInternalInstance$')) {
            return (element)[k];
        }
    }
}

export function getAutocompleteHandler() {
    const node = findReactChildren(
        getReactInstance(document.querySelector('.chat-input__textarea')),
        n => n.stateNode.providers
    );
    return node?.stateNode;
}

export function getChatInput() {
    return getAutocompleteHandler()?.componentRef;
}

export function getChat() {
    const node = findReactParents(
        getReactInstance(document.querySelectorAll('section[data-test-selector="chat-room-component-layout"]')[0]),
        n => n.stateNode?.props.onSendMessage
    );

    return node?.stateNode;
}

export function getChatController() {
    const node = findReactParents(
        getReactInstance(document.querySelectorAll('section[data-test-selector="chat-room-component-layout"]')[0]),
        n => n.stateNode?.props.messageHandlerAPI && n.stateNode?.props.chatConnectionAPI,
        100
    );

    return node?.stateNode;
}

export function getChatService() {
    const node = findReactChildren(
        getReactInstance(document.querySelectorAll('#root div')[0]),
        n => n.stateNode?.join && n.stateNode?.client,
        1000
    );

    return node?.stateNode;
}

export function sendMessage(message) {
    const controller = getChatController();
    
    if (controller) {
        const id = Date.now().toString();
        const text = message.replace(/\$currentChannel/g, controller.props.channelLogin);
        controller.pushMessage({
            id,
            msgid: id,
            channel: `#${controller.props.channelLogin}`,
            type: 32,
            message: `[Twitch Enhancer] ${text}`
        });
    }
}

