import drone from "../../public/assets/notFound/drone.svg";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-8 md:flex-row">
      <div className="z-10 mb-8 md:mb-0 md:mr-32">
        <Image
          src={drone}
          alt="Drone illustration"
          width={350}
          height={106}
          className="h-auto w-full"
        />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <div className="font-bungee-hairline text-6xl font-normal leading-tight text-white sm:text-7xl md:text-8xl">
          404
        </div>
        <div className="mb-6 w-1/2 border-b-2 border-white p-1"></div>
        <div className="font-jost text-2xl font-normal leading-tight text-white sm:text-3xl">
          PAGE NOT FOUND
        </div>
        <div className="font-jost max-w-md text-base font-normal leading-normal text-white sm:text-lg">
          Sorry, the page you're looking for cannot be found!
          <br /> Go back or return home.
        </div>
        <button className="mt-4 rounded-full bg-blue-300 px-6 py-2 transition-colors hover:bg-blue-400">
          BACK HOME
        </button>
      </div>
    </div>
  );
};

export default NotFound;