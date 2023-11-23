import localFont from 'next/font/local';

export const LINESeedJP = localFont({
  src: [
    {
      path: '../../../public/fonts/LINESeedJP_OTF_Rg.woff2',
      weight: '400',
    },
    {
      path: '../../../public/fonts/LINESeedJP_OTF_Bd.woff2',
      weight: '700',
    },
  ],
});
