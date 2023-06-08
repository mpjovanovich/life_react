
const Cell:React.FC<{
    col: number,
    row: number,
    isAlive: boolean,
    onToggle: (col:number, row:number) => void,
}> = ({
    col,
    row,
    isAlive,
    onToggle
}) => { 
    return (
<div 
    className={`cell ${isAlive ? "alive" : "dead"}`} 
    onClick={() => onToggle(col,row)}
/>
    )
};

export default Cell 
