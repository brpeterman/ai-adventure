interface HistoryProps {
    readonly context: string;
}

const History = (props: HistoryProps) => {
    const lines = props.context.split("\n");

    return <section id="history">
        <>
            {
                lines.map((line) => { return ( <> {line} <br /> </> )})
            }
        </>
    </section>;
};

export default History;