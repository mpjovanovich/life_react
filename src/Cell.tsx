
const Cell:React.FC<{
    col: number,
    row: number,
    isAlive: boolean,
    paused: boolean,
    onToggle: (col:number, row:number) => void,
}> = ({
    col,
    row,
    isAlive,
    paused,
    onToggle
}) => { 
    return (
<div 
    className={`cell ${paused && "cell-paused"} ${isAlive && "cell-alive"}`} 
    onClick={() => onToggle(col,row)}
/>
    )
};

export default Cell 
