import { useRef } from "react";

interface PlayerInputProps {
    readonly submitCallback: (input: string) => void;
    actionsEnabled: boolean;
}

const PlayerInput = (props: PlayerInputProps) => {
    const actButtonRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            submitAction();
        }
    };

    const submitContinueAction = () => {
        if (!props.actionsEnabled) {
            return;
        }
        props.submitCallback("");
    };

    const submitAction = () => {
        if (!props.actionsEnabled) {
            return;
        }
        const text = inputRef.current?.value;
        if (text) {
            inputRef.current!.value = "";
            props.submitCallback(text);
        }
    }

    return (
        <div className="player-input">
            <input
                ref={inputRef}
                id="player-action"
                type="text"
                placeholder="Enter an action without a pronoun. For example, &quot;Go north&quot;"
                onKeyDown={keyDown}
                disabled={!props.actionsEnabled}
                className="
                    w-150
                    p-2
                    border
                    border-black
                    dark:border-white"/>
            <button
                ref={actButtonRef}
                type="button"
                onClick={submitAction}
                disabled={!props.actionsEnabled}
                className="
                    bg-blue-500
                    text-white
                    px-4
                    py-2
                    rounded mt-4
                    disabled:bg-gray-600
                    dark:disabled:bg-gray-400
                    border
                    border-black
                    dark:border-white
                    cursor-pointer
                    disabled:cursor-auto
                    p-2
                    font-bold"
                >Act</button>
            <button
                type="button"
                onClick={submitContinueAction}
                disabled={!props.actionsEnabled}
                className="
                    bg-blue-500
                    text-white
                    px-4
                    py-2
                    rounded mt-4
                    disabled:bg-gray-600
                    dark:disabled:bg-gray-400
                    border
                    border-black
                    dark:border-white
                    cursor-pointer
                    disabled:cursor-auto
                    p-2
                    font-bold"
                >Continue</button>
        </div>
    );
};

export default PlayerInput;