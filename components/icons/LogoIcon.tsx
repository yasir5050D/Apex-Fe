
// import React from 'react';

// const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     {...props}
//   >
//     <path d="M12 2L1.5 21.5h21L12 2zm0 4.58L18.42 20H5.58L12 6.58z" />
//   </svg>
// );

// export default LogoIcon;


import React from 'react';
import logo from '../../assets/logo.svg'; // adjust the path as needed

const LogoIcon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
  <img src={logo} alt="Logo" {...props} />
);

export default LogoIcon;

