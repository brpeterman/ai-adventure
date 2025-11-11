const StoryIntro = (props: {
    storyIntroRef: React.RefObject<HTMLTextAreaElement | null>;
}) => {
    return (
        <section id="story-intro">
            <div className="mb-2">Initial story (required):</div>
            <textarea
                ref={props.storyIntroRef}
                id="story-intro-input"
                placeholder="You wake in an unremarkable dungeon."
                className="
                    border
                    border-black
                    dark:border-white
                    p-2
                    w-full"></textarea>
        </section>
    );
}
export default StoryIntro;