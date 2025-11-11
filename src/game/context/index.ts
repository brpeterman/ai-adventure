export function integrateContext(params: {
    initialContext: string,
    action: string,
    newContext: string
}): string {
    // Extremely simple implementation for testing
    return `${params.action?.length > 0 ? `\n\n${formatActionText(params.action)}\n` : ""}
    ${params.newContext}`;
}

export function formatActionText(action: string) {
    let formattedAction = `${action[0].toLocaleLowerCase()}${action.substring(1)}`;
    formattedAction = `> You ${formattedAction}`;
    if (!(/\p{P}$/gu).test(formattedAction)) {
        // Needs punctuation. Just use a period, since we can't know what's needed.
        formattedAction = `${formattedAction}.`;
    }
    return formattedAction;
}