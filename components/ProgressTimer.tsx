import { Circle, Svg, LinearGradient, Stop, Text, SvgUri } from 'react-native-svg';
import { Image, View } from 'react-native';
import { useEffect, useState } from 'react';

interface ProgressCircleProps {
    progress: number;
    screen: any;
}

const ProgressCircle = ({ progress, screen }: ProgressCircleProps) => {
    const [strokeColor, setStrokeColor] = useState('#00a912');
    const [internalProgress, setInternalProgress] = useState(progress);

    useEffect(() => {
        if (progress > 6) {
            setStrokeColor('#f44336');
        } else if (progress > 4) {
            setStrokeColor('#FFFF00');
        } else {
            setStrokeColor('#00a912');
        }
    }, [progress]);

    useEffect(() => {
        const interval = setInterval(() => {
            setInternalProgress((prevProgress) => {
                if (prevProgress >= progress) {
                    clearInterval(interval);
                    return progress;
                }
                return prevProgress + 0.05;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [progress]);

    const circumference = 2 * Math.PI * 50; // the circumference of the circle with a radius of 50
    const progressOffset = ((10 - internalProgress) / 10) * circumference;

    if (screen == 0) {
        return (
            <Svg height="120" width="120">
                <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#f820ab" />
                    <Stop offset="100%" stopColor="#f6493b" />
                </LinearGradient>
                <Circle cx="60" cy="60" r="50" stroke="transparent" strokeWidth="10" fill="url(#grad)" />
                <Circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={strokeColor}
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={progressOffset}
                    transform={'rotate(-90 60 60)'}
                    strokeLinecap="round"
                />
                <Text x="60" y="60" textAnchor="middle" alignmentBaseline="central" fontSize="35" fill="white">
                    {10 - progress}
                </Text>

            </Svg>
        )
    }
    else if (screen == 1) {
        return (
            <Svg height="120" width="120">
                <Image
                    source={require('../Assets/Images/confirm-icon.png')}
                    style={{ width: 120, height: 120, position: 'absolute', top: 0, left: 0 }}
                />
            </Svg>
        )
    }
    else if (screen == 2) {
        return (
            <Svg height="120" width="120">
                <Image
                    source={require('../Assets/Images/close-red-icon.png')}
                    style={{ width: 120, height: 120, position: 'absolute', top: 0, left: 0 }}
                />
            </Svg>
        )
    } else {
        return (
            <Svg height="120" width="120">
                <Image
                    source={require('../Assets/Images/timesUpRound.gif')}
                    style={{ width: 120, height: 120, position: 'absolute', top: 0, left: 0 }}
                />
            </Svg>
        )
    }
}


export default ProgressCircle;
