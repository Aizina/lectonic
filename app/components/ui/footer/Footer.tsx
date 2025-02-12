import { FC } from 'react';
import Image from 'next/image';
import insta from '../../../assets/svg/insta.svg'
import whatsapp from '../../../assets/svg/whatsapp.svg'
import tg from '../../../assets/svg/tg.svg'

const Footer: FC = () => {
  return (
    <div className="w-[94vw] bg-[#4860EF] py-8 px-6 text-white rounded-[32px] m-auto mt-28 ">
        <div className="flex flex-row justify-between align-center p-[40px]">
          <h1 className='text-2xl 2xl:text-4xl text-white font-semibold'>Лектоник</h1>
          <div className="flex flex-col justify-between align-center font-gotham gap-4">
            <span className="font-normal text-md 2xl:text-2xl">support@lektonik.com</span>
            <span className="font-normal text-md 2xl:text-2xl">+7 (495) 678-36-47</span>
            <div className="flex flex-row align-center gap-6">
              <Image src={insta} alt="insta Icon" width={44} height={44}/>
              <Image src={whatsapp} alt="insta Icon" width={44} height={44}/>
              <Image src={tg} alt="insta Icon" width={44} height={44}/>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Footer;
