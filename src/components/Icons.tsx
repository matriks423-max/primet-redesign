/**
 * Precision industrial icon set — 24×24 grid, 1.5px stroke, square caps/joins.
 * Designed to match Swiss grid aesthetic: geometric, engineered, no decoration.
 */

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

const defaults = { size: 24, color: "currentColor", strokeWidth: 1.5 };

export function IconWrench({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter"/>
    </svg>
  );
}

export function IconGear({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth}/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
    </svg>
  );
}

export function IconDocument({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter"/>
      <polyline points="14 2 14 8 20 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter"/>
      <line x1="16" y1="13" x2="8" y2="13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
      <line x1="16" y1="17" x2="8" y2="17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
      <line x1="10" y1="9" x2="8" y2="9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
    </svg>
  );
}

export function IconShield({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter"/>
    </svg>
  );
}

export function IconTruck({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter"/>
      <path d="M16 8h4l3 4v5h-7V8z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter"/>
      <circle cx="5.5" cy="18.5" r="2.5" stroke={color} strokeWidth={strokeWidth}/>
      <circle cx="18.5" cy="18.5" r="2.5" stroke={color} strokeWidth={strokeWidth}/>
    </svg>
  );
}

export function IconCpu({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
      <rect x="4" y="4" width="16" height="16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
      <line x1="9" y1="1" x2="9" y2="4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
      <line x1="15" y1="1" x2="15" y2="4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
      <line x1="9" y1="20" x2="9" y2="23" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
      <line x1="15" y1="20" x2="15" y2="23" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
      <line x1="20" y1="9" x2="23" y2="9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
      <line x1="20" y1="15" x2="23" y2="15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
      <line x1="1" y1="9" x2="4" y2="9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
      <line x1="1" y1="15" x2="4" y2="15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
    </svg>
  );
}

export function IconBarChart({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
      <line x1="12" y1="20" x2="12" y2="4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
      <line x1="6" y1="20" x2="6" y2="14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
      <line x1="2" y1="20" x2="22" y2="20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square"/>
    </svg>
  );
}

export function IconPhone({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.1h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.69a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.27.92z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter"/>
    </svg>
  );
}

export function IconMail({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter"/>
      <polyline points="2,4 12,13 22,4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter"/>
    </svg>
  );
}

export function IconMessageSquare({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter"/>
    </svg>
  );
}
