const PersistentContext = (props: {
    persistentContextRef: React.RefObject<HTMLTextAreaElement | null>;
}) => {
    return (
        <section id="persistent-context">
            <div className="mb-2">Persistent context:</div>
            <textarea
                ref={props.persistentContextRef}
                id="persistent-context-input"
                placeholder="Add context that will always be included."
                className="
                    border
                    border-black
                    dark:border-white
                    p-2
                    w-full"></textarea>
        </section>
    );
};
export default PersistentContext;