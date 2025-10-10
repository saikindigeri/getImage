import { Bricolage_Grotesque, Inter,Instrument_Serif  } from "next/font/google";


const bricolage_grotesque_init = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const inter_init = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const instrument_init =Instrument_Serif ({
  subsets: ["latin"],
  display: "swap",
   weight: ['400'], // Instrument Serif supports only 400 weight
  style: ['normal', 'italic'], // Supports normal and italic styles
});

export const bricolage_grotesque = bricolage_grotesque_init.className;
export const inter = inter_init.className;
export const instrument=instrument_init.className;
