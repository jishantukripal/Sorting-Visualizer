/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from 'react';
import { type AlgoStep } from '../types';

export const useVisualizer = (
    generateSteps: (arr: number[], target?: number) => AlgoStep[],
    initialSize: number = 5,
    isSearching: boolean = false
) => {
    const [speed, setSpeed] = useState<number>(300);
    const [inputMode, setInputMode] = useState<'random' | 'custom'>('random');
    const [arraySize, setArraySize] = useState<number>(initialSize);
    const [userInput, setUserInput] = useState<string>("25, 10, 45, 5, 30, 15, 8");
    const [target, setTarget] = useState<number>(45);

    const [steps, setSteps] = useState<AlgoStep[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // --- HELPER FUNCTIONS MOVED UP ---
    const generateRandomArray = (size: number) => {
        return Array.from({ length: size }, () => Math.floor(Math.random() * 90 + 10));
    };

    const resetRandom = () => {
        const arr = generateRandomArray(arraySize);
        let searchTarget = target;
        if (isSearching) {
            if (Math.random() > 0.3) {
                searchTarget = arr[Math.floor(Math.random() * arr.length)];
            } else {
                searchTarget = Math.floor(Math.random() * 100);
            }
            setTarget(searchTarget);
        }
        
        const newSteps = generateSteps(arr, searchTarget);
        setSteps(newSteps);
        setCurrentStepIndex(0);
        setIsPlaying(false);
    };

    // --- EFFECTS ---
    useEffect(() => {
        if (inputMode === 'random') {
            resetRandom();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputMode, arraySize, target]); // Now resetRandom is available here

    useEffect(() => {
        if (inputMode === 'custom') {
            const handler = setTimeout(() => {
                const arr = userInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
                if (arr.length > 0) {
                    const newSteps = generateSteps(arr, target);
                    setSteps(newSteps);
                    setCurrentStepIndex(0);
                    setIsPlaying(false);
                }
            }, 600);
            return () => clearTimeout(handler);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputMode, userInput, target]);

    useEffect(() => {
        let timer: any;
        if (isPlaying) {
            timer = setTimeout(() => {
                if (currentStepIndex < steps.length - 1) {
                    setCurrentStepIndex(prev => prev + 1);
                } else {
                    setIsPlaying(false);
                }
            }, speed);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, currentStepIndex, steps.length, speed]);

    // --- HANDLERS ---
    const onPlayPause = () => {
        if (currentStepIndex >= steps.length - 1) {
            setCurrentStepIndex(0);
            setIsPlaying(true);
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    const onStepForward = () => {
        if (currentStepIndex < steps.length - 1) setCurrentStepIndex(c => c + 1);
    };

    const onStepBackward = () => {
        if (currentStepIndex > 0) setCurrentStepIndex(c => c - 1);
    };

    const onReset = () => {
        setCurrentStepIndex(0);
        setIsPlaying(false);
    };

    const currentStep = steps[currentStepIndex] || {
        array: [], highlights: [], sortedIndices: [], action: 'none', description: 'Loading...', lineNo: 0
    };

    const maxValue = useMemo(() => {
        if (!steps.length) return 100;
        return Math.max(...steps.flatMap(s => s.array));
    }, [steps]);

    const progress = steps.length > 1 ? (currentStepIndex / (steps.length - 1)) * 100 : 0;

    return {
        speed, setSpeed,
        inputMode, setInputMode,
        arraySize, setArraySize,
        userInput, setUserInput,
        target, setTarget,
        steps,
        currentStepIndex,
        isPlaying,
        onPlayPause,
        onStepForward,
        onStepBackward,
        onReset,
        currentStep,
        maxValue,
        progress
    };
};