import ConverterBox from "@/components/ConverterBox";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <h1 className="text-4xl font-bold mb-12">Currency Converter</h1> */}
      {/* <h1 className="text-2xl mb-8 text-black">Convert 10 USD to IDR</h1> */}
      <ConverterBox />
    </div>
  )
}
