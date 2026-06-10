import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Currency Converter</h1>
      <h1 className="text-2xl mb-8 text-black">Convert 10 USD to IDR</h1>
      <div className="border border-green-500 md:w-1/2 h-fit space-y-4 rounded-4xl flex flex-col p-4">
        <div className="flex flex-col border h-20 border-green-500">
          <p className="text-xl relative left-4">From</p>
          <div className="flex flex-row justify-around items-center">
            <input className="flex-1 text-xl pl-4 focus:outline-hidden" type="text" />
            <div className="px-4">
              <p className="text-xl">USD</p>
            </div>
          </div>
        </div>
        <button className="bg-green-500 w-fit h-fit p-4 hover:opacity-80 rounded-full self-center flex justify-center">
          <Image src={'/swap.svg'} width={20} height={20} alt="swap" />
        </button>
        <div className="flex flex-col border h-20 border-green-500">
          <p className="text-xl relative left-4">To</p>
          <div className="flex flex-row justify-around">
            <input className="flex-1 text-xl pl-4 focus:outline-hidden" type="text" />
            <div className="px-4">
              <p className="text-xl">IDR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
