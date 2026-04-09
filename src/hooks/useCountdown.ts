import { useState, useEffect, useRef } from 'react';

export type CountdownPhase =
  | 'idle'       // > 10 seconds remaining
  | 'critical'   // last 10 seconds
  | 'zero'       // just hit 00:00:00, breach sequence starts
  | 'live';      // hackathon is running — 48h reverse countdown

export interface CountdownState {
  phase: CountdownPhase;
  display: string;       // formatted time string for the pre-start timer box
  elapsed: string;       // reverse countdown from 48h once live
  secondsLeft: number;
}

/**
 * TARGET_DATE: Set this to the actual hackathon start datetime.
 * PRODUCTION: replace with → new Date('2026-04-10T09:00:00+05:30')
 */
const getTargetDate = () => new Date(Date.now() + 30 * 1000); // 30s demo window

/** Hackathon duration: 48 hours in seconds */
const HACKATHON_DURATION_SECS = 48 * 60 * 60;

const pad = (n: number) => String(Math.floor(n)).padStart(2, '0');

function formatSeconds(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function useCountdown(): CountdownState {
  const targetRef = useRef<Date>(getTargetDate());
  const startTimeRef = useRef<number>(0);
  const [state, setState] = useState<CountdownState>({
    phase: 'idle',
    display: '00:00:30',
    elapsed: formatSeconds(HACKATHON_DURATION_SECS),
    secondsLeft: 30,
  });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = targetRef.current.getTime() - now;
      const secsLeft = Math.max(0, Math.ceil(diff / 1000));

      if (diff > 10000) {
        // idle phase
        setState({
          phase: 'idle',
          display: formatSeconds(secsLeft),
          elapsed: formatSeconds(HACKATHON_DURATION_SECS),
          secondsLeft: secsLeft,
        });
      } else if (diff > 0) {
        // critical: last 10 seconds
        setState({
          phase: 'critical',
          display: formatSeconds(secsLeft),
          elapsed: formatSeconds(HACKATHON_DURATION_SECS),
          secondsLeft: secsLeft,
        });
      } else if (diff <= 0 && startTimeRef.current === 0) {
        // just reached zero — trigger breach sequence once
        startTimeRef.current = now;
        setState({
          phase: 'zero',
          display: '00:00:00',
          elapsed: formatSeconds(HACKATHON_DURATION_SECS),
          secondsLeft: 0,
        });
      } else if (startTimeRef.current > 0) {
        // live — count DOWN from 48h
        const elapsedSecs = Math.floor((now - startTimeRef.current) / 1000);
        const remaining = Math.max(0, HACKATHON_DURATION_SECS - elapsedSecs);
        setState({
          phase: 'live',
          display: '00:00:00',
          elapsed: formatSeconds(remaining),
          secondsLeft: 0,
        });
      }
    };

    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, []);

  return state;
}
