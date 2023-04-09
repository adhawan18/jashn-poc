import { Circle, Svg, LinearGradient, Stop, Text } from 'react-native-svg';

interface ProgressCircleProps {
    progress: any;
}

const ProgressCircle = ({ progress }: ProgressCircleProps) => {
    const circumference = 2 * Math.PI * 50; // the circumference of the circle with a radius of 50

    return (
        <Svg height="120" width="120">
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="#f820ab" />
                <Stop offset="100%" stopColor="#f6493b" />
            </LinearGradient>
            <Circle
                cx="60"
                cy="60"
                r="50"
                stroke="transparent"
                strokeWidth="10"
                fill="url(#grad)"
            />

            <Circle
                cx="60"
                cy="60"
                r="50"
                stroke="#00ff00"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={(-(progress - 10) / 10) * circumference}
                transform={'rotate(-90 60 60)'}
                strokeLinecap="round"
            />
            <Text x="60" y="60" textAnchor="middle" alignmentBaseline="central" fontSize="35" fill="white">{10 - progress}</Text>
        </Svg>
    );
};

export default ProgressCircle;