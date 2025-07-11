import PropTypes from "prop-types";

function ProgressBar({ value }) {
    const radius = 36;
    const stroke = 4;
    const normalizedRadius = radius - stroke * 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="relative w-24 h-24">
            <svg height="100%" width="100%" viewBox={`0 0 ${radius * 2} ${radius * 2}`} className="-rotate-90">
                {/* خلفية */}
                <circle
                    stroke="lightgray"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                {/* القيمة */}
                <circle
                    stroke="#b0a4e1"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-primary text-xl font-bold">{value}%</span>
            </div>
        </div>
    );
}

ProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
};

export default ProgressBar;
