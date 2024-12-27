import React from 'react';
interface IEyeIcon {
  fill?: string;
}

export default function EyeIcon({ fill = '#7e22ce' }: IEyeIcon) {
  return (
    <svg
      width='18'
      height='16'
      viewBox='0 0 22 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.06202 8.34812C0.978677 8.1236 0.978677 7.87663 1.06202 7.65212C1.87372 5.68397 3.25153 4.00116 5.02079 2.81701C6.79004 1.63287 8.87106 1.00073 11 1.00073C13.129 1.00073 15.21 1.63287 16.9792 2.81701C18.7485 4.00116 20.1263 5.68397 20.938 7.65212C21.0214 7.87663 21.0214 8.1236 20.938 8.34812C20.1263 10.3163 18.7485 11.9991 16.9792 13.1832C15.21 14.3674 13.129 14.9995 11 14.9995C8.87106 14.9995 6.79004 14.3674 5.02079 13.1832C3.25153 11.9991 1.87372 10.3163 1.06202 8.34812Z'
        stroke={fill}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11 11.0001C12.6569 11.0001 14 9.65697 14 8.00012C14 6.34326 12.6569 5.00012 11 5.00012C9.34316 5.00012 8.00002 6.34326 8.00002 8.00012C8.00002 9.65697 9.34316 11.0001 11 11.0001Z'
        stroke={fill}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
