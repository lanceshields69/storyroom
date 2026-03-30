// Inline SVG nav icons — accepts a `color` prop so active/inactive state
// can be controlled without CSS filters or multiple asset files.

export function RoomsIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 23.9931 23.9931" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.9954 20.9939V18.9945C15.9954 17.9339 15.5741 16.9168 14.8241 16.1669C14.0742 15.417 13.0571 14.9957 11.9965 14.9957H5.99826C4.93771 14.9957 3.92058 15.417 3.17066 16.1669C2.42073 16.9168 1.99942 17.9339 1.99942 18.9945V20.9939" stroke={color} strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.9974 10.9968C11.2059 10.9968 12.9962 9.20648 12.9962 6.99797C12.9962 4.78947 11.2059 2.99913 8.9974 2.99913C6.7889 2.99913 4.99855 4.78947 4.99855 6.99797C4.99855 9.20648 6.7889 10.9968 8.9974 10.9968Z" stroke={color} strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21.9936 20.9939V18.9945C21.993 18.1085 21.6981 17.2478 21.1552 16.5475C20.6124 15.8473 19.8524 15.3471 18.9945 15.1256" stroke={color} strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.9954 3.12909C16.8555 3.34933 17.6179 3.84959 18.1624 4.55099C18.7068 5.2524 19.0023 6.11506 19.0023 7.00297C19.0023 7.89089 18.7068 8.75355 18.1624 9.45495C17.6179 10.1564 16.8555 10.6566 15.9954 10.8769" stroke={color} strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function DiscoverIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 23.9931 23.9931" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.2353 7.75776L14.4318 13.1672C14.3337 13.4617 14.1683 13.7293 13.9488 13.9488C13.7293 14.1683 13.4617 14.3337 13.1672 14.4318L7.75776 16.2353L9.56123 10.8259C9.65939 10.5314 9.82477 10.2638 10.0443 10.0443C10.2638 9.82477 10.5314 9.65939 10.8259 9.56123L16.2353 7.75776Z" stroke={color} strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.9965 21.9936C17.5178 21.9936 21.9936 17.5178 21.9936 11.9965C21.9936 6.47528 17.5178 1.99942 11.9965 1.99942C6.47528 1.99942 1.99942 6.47528 1.99942 11.9965C1.99942 17.5178 6.47528 21.9936 11.9965 21.9936Z" stroke={color} strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function LibraryIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 23.9931 23.9931" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.9954 5.99826L19.9942 19.9942" stroke={color} strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.9965 5.99826V19.9942" stroke={color} strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.99769 7.99769V19.9942" stroke={color} strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.99884 3.99884V19.9942" stroke={color} strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ProfileIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 23.9931 23.9931" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.9945 20.9939V18.9945C18.9945 17.9339 18.5732 16.9168 17.8233 16.1669C17.0733 15.417 16.0562 14.9957 14.9957 14.9957H8.9974C7.93684 14.9957 6.91972 15.417 6.16979 16.1669C5.41986 16.9168 4.99855 17.9339 4.99855 18.9945V20.9939" stroke={color} strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.9965 10.9968C14.205 10.9968 15.9954 9.20648 15.9954 6.99797C15.9954 4.78947 14.205 2.99913 11.9965 2.99913C9.78803 2.99913 7.99769 4.78947 7.99769 6.99797C7.99769 9.20648 9.78803 10.9968 11.9965 10.9968Z" stroke={color} strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
