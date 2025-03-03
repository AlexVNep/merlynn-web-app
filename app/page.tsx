import Image from "next/image";
export default function Home() {
  return (
    <div className="w-full flex mt-5 justify-center">
      <section className="flex flex-col w-[400px]">
        <div className="bg-white border border-lg">
          <Image
            src={
              "https://static.wixstatic.com/media/27ea24_e9836fc8dc3e4c72b85917758f14ce82~mv2.png/v1/crop/x_25,y_0,w_3483,h_873/fill/w_160,h_40,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Merlynn%20Logo%20Hres%20-01.png"
            }
            alt="Merlynn Logo"
            width={500}
            height={500}
          />
        </div>

        <h1 className="text-3xl w-full text-center font-bold mb-6">
          Merlynn Web App
        </h1>
        <p className="text-center">Follow the instructions on each page.</p>
      </section>
    </div>
  );
}
