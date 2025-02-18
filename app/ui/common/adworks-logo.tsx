import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AdworksLogo() {
  return (
    <div>
      <Image
        src="/images/eWorks_logos_line_primary_dark_font.png"
        width={1772}
        height={1129}
        className="hidden md:block"
        alt="eworkspace solution inc company logo"
      />
      <Image
        src="/images/eWorks_logos_line_symbol.png"
        width={784}
        height={750}
        className="block md:hidden"
        alt="eworkspace solution inc company logo"
      />
    </div>
  );
}


