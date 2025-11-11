import { useEffect, useRef } from "react";

interface HistoryProps {
    readonly context: string;
}

const History = (props: HistoryProps) => {
    const storyEndRef = useRef(null);
    useEffect(() => {
        storyEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [props.context]);

    const lines = props.context.split("\n");

    return <section id="history" className="overflow-auto overscroll-contain min-h-100 max-h-150">
        <p>
            {
                lines.map((line) => { return ( <> {line} <br /> </> )})
            }
        </p>
        <div id="story-end" ref={storyEndRef}></div>
    </section>;
};

export default History;