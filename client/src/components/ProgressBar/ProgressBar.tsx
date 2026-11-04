import "./ProgressBar.css";


type ProgressBarProps = {
    value: number;
    max: number;
};

function ProgressBar({ value, max }: ProgressBarProps) {
    const percent = max > 0 ? Math.round((value / max) * 100) : 0;

    return (
        <div
            className="ProgressBar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={value}
        >
            <div className="ProgressBar__fill" style={{ width: `${percent}%` }} />
        </div>
    );
}

export default ProgressBar;
