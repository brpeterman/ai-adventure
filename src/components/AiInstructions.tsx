const AiInstructions = (props: {
    instructionsRef: React.RefObject<HTMLTextAreaElement | null>;
}) => {
    return (
        <section id="ai-instructions">
            <div className="
                mb-2">
                Additional AI instructions:
            </div>
            <textarea
                ref={props.instructionsRef}
                id="ai-instructions-input"
                placeholder="Additional instructions for the AI."
                className="
                    border
                    border-black
                    dark:border-white
                    p-2
                    w-full"></textarea>
        </section>
    )
};
export default AiInstructions;