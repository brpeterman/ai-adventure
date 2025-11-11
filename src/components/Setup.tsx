import { useRef } from "react";
import AiInstructions from "./AiInstructions.tsx";
import PersistentContext from "./PersistentContext.tsx";
import StoryIntro from "./StoryIntro.tsx";

interface SetupProps {
    onStart: (params: {aiInstructions: string, persistentContext: string, storyIntro: string}) => void;
}

const Setup = (props: SetupProps) => {
    const instructionsRef = useRef<HTMLTextAreaElement>(null);
    const persistentContextRef = useRef<HTMLTextAreaElement>(null);
    const storyIntroRef = useRef<HTMLTextAreaElement>(null);

    const startGame = () => {
        const aiInstructions = instructionsRef.current?.value || "";
        const persistentContext = persistentContextRef.current?.value || "";
        const storyIntro = storyIntroRef.current?.value || "";
        if (!storyIntro) {
            return;
        }
        props.onStart({aiInstructions, persistentContext, storyIntro});
    };

    return (
        <section id="setup">
            <StoryIntro storyIntroRef={storyIntroRef} />
            <AiInstructions instructionsRef={instructionsRef} />
            <PersistentContext persistentContextRef={persistentContextRef} />
            <button
                id="start-button"
                onClick={startGame}
                type="button"
                className="
                    bg-blue-500
                    text-white
                    px-4
                    py-2
                    rounded mt-4">
                Start Game
            </button>
        </section>
    );
};
export default Setup;