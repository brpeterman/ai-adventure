import { useState } from "react";

interface PlayerInputProps {
    readonly submitCallback: (input: string) => void;
}

const PlayerInput = (props: PlayerInputProps) => {
    const submitAction = () => {
        const inputElement = document.getElementById("player-action") as HTMLInputElement;
        const text = inputElement.value;
        if (text) {
            inputElement.value = "";
            props.submitCallback(text);
        }
    }

    return (
        <div className="player-input">
            <label htmlFor="player-action">Action</label>
            <input id="player-action" type="text" placeholder="Enter an action in first person"/>
            <button type="button" onClick={submitAction}>Act</button>
        </div>
    );
};

export default PlayerInput;