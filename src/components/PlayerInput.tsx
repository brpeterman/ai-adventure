interface PlayerInputProps {
    readonly submitCallback: (input: string) => void;
    actionsEnabled: boolean;
}

const PlayerInput = (props: PlayerInputProps) => {
    const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            submitAction();
        }
    };

    const submitAction = () => {
        if (!props.actionsEnabled) {
            return;
        }
        const inputElement = document.getElementById("player-action") as HTMLInputElement;
        const text = inputElement.value;
        if (text) {
            inputElement.value = "";
            props.submitCallback(text);
        }
    }

    return (
        <div className="player-input">
            <input
                id="player-action"
                type="text"
                placeholder="Enter an action without a pronoun. For example, &quot;Go north&quot;"
                onKeyDown={keyDown}
                className="
                    w-150
                    p-2
                    border
                    border-black
                    dark:border-white"/>
            <button
                type="button"
                onClick={submitAction}
                disabled={!props.actionsEnabled}
                className="
                    bg-blue-950
                    dark:bg-blue-200
                    disabled:bg-gray-600
                    dark:disabled:bg-gray-400
                    text-white
                    dark:text-black
                    border
                    border-black
                    dark:border-white
                    cursor-pointer
                    disabled:cursor-auto
                    p-2
                    font-bold"
                >Act</button>
        </div>
    );
};

export default PlayerInput;