import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps, path: ReactNode) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      {path}
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return base(
    props,
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </>
  );
}

export function SparkIcon(props: IconProps) {
  return base(
    props,
    <>
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      <path d="m18 16 .8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16Z" />
    </>
  );
}

export function FeedIcon(props: IconProps) {
  return base(
    props,
    <>
      <path d="M5 5h14v14H5z" />
      <path d="M8 9h8" />
      <path d="M8 12h8" />
      <path d="M8 15h5" />
    </>
  );
}

export function ShieldIcon(props: IconProps) {
  return base(
    props,
    <>
      <path d="M12 3 5 6v5c0 4.4 2.9 8.4 7 10 4.1-1.6 7-5.6 7-10V6l-7-3Z" />
      <path d="m9.5 12 1.7 1.7 3.5-3.7" />
    </>
  );
}

export function MessageIcon(props: IconProps) {
  return base(
    props,
    <>
      <path d="M6 17.5 3 21V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6Z" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
    </>
  );
}

export function DocumentIcon(props: IconProps) {
  return base(
    props,
    <>
      <path d="M8 3h6l5 5v13H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M14 3v5h5" />
      <path d="M10 13h6" />
      <path d="M10 17h6" />
    </>
  );
}

export function PulseIcon(props: IconProps) {
  return base(
    props,
    <>
      <path d="M3 12h4l2-5 4 10 2-5h6" />
    </>
  );
}

export function AlertIcon(props: IconProps) {
  return base(
    props,
    <>
      <path d="M12 4 21 20H3L12 4Z" />
      <path d="M12 9v4" />
      <circle cx="12" cy="16.5" r=".8" fill="currentColor" stroke="none" />
    </>
  );
}

export function ChildIcon(props: IconProps) {
  return base(
    props,
    <>
      <circle cx="12" cy="7.5" r="2.5" />
      <path d="M8.5 21v-5l-2-3 2-3.5h7L17.5 13l-2 3v5" />
      <path d="M12 10v4" />
    </>
  );
}

export function PresentationIcon(props: IconProps) {
  return base(
    props,
    <>
      <rect x="4" y="4" width="16" height="11" rx="2" />
      <path d="M12 15v5" />
      <path d="M9 20h6" />
      <path d="M8 8h8" />
      <path d="M8 11h5" />
    </>
  );
}
