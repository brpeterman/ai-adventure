export function integrateContext(params: {
    initialContext: string,
    action: string,
    newContext: string
}): string {
    // Extremely simple implementation for testing
    return `${params.initialContext}

    > You ${params.action}.
    
    ${params.newContext}`;
}