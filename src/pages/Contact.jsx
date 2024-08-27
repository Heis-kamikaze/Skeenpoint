import { BiEnvelope } from "react-icons/bi"
import { MdOutlinePhone } from "react-icons/md"

const Contact = () => {
  return (
   <>
    <div className="mx-5">
      <div className="bg-b1-200 flex text-center justify-center py-5 mt-2 rounded-lg">
        <p className="text-xl font-extrabold">
          CONTACT US
        </p>
      </div>

      <div className="mt-3">
        <p className="text-xs md:text-xl text-center">
          WHETHER YOU&#39;RE CURIOUS ABOUT NEW PRODUCTS, NEED SKINCARE ADVICE, OR HAVE QUESTIONS ABOUT YOUR ORDER, WE&#39;RE HERE TO HELP!
        </p>
      </div>
      <br />
      <div>
        <p className="font-bold text-sm md:text-xl">
          RETAIL STORES NEARBY
        </p>
        <p className="font-extrabold text-md md:text-3xl">
          SHOPBEST COSMETICS
        </p>
        <p className="text-sm md:text-xl">
          Address: A3 Victory Plaza Oppaosite Kaduna 1 Plaza Trade Fair Lagos.
        </p>
        <p className="text-sm md:text-xl">
          Contact: 09021301151, 09032287409
        </p>
        <br />
        <p className="font-extrabold text-md md:text-3xl">
          ELSIM INTERNATIONAL TRADE
        </p>
        <p className="text-sm md:text-xl">
          Address: Atiku Abubakar Hall, Beside Access Bank, BBA Trade Fair Complex, Lagos.
        </p>
        <p className="text-sm md:text-xl">
          Contact: 08122283188, 07032672898
        </p>
      </div>

      <div className="flex text-left my-12 justify-between">
        <div className="px-0.5">
          <BiEnvelope className="text-xl md:text-3xl mb-2"/>
          <p className="text-sm md:text-2xl font-extrabold mb-2">
            EMAIL
          </p>
          <p className="text-xs md:text-xl text-wrap mb-3">
            Send us an email to speak directly with a specialist.
          </p>
          <p className="text-xs md:text-xl mb-7">
            skeenpoint@gmail.com
          </p>
        </div>

        <div className="px-0.5">
          <MdOutlinePhone className="text-xl md:text-3xl mb-2"/>
          <p className="text-sm md:text-2xl font-extrabold mb-2">
            CALL US
          </p>
          <p className="text-xs md:text-xl text-wrap mb-3">
            <span className="font-bold">Support Hours:</span> Mon-Fri 9:30am-6pm (Excluding Major Holidays)
          </p>
          <p className="text-xs md:text-xl mb-7">
            09032287409
          </p>
        </div>
      </div>
    </div>
   </>
  )
}

export default Contact