import Image from "next/image";
import EagleImg from "@/images/home/Eagle.webp";
import ShiftedLineTitle from "@/components/ShiftedLineTitle";
import LearnMoreButton from "./LearnMoreButton";

const Eagle = () => {
  return (
    <div className="mt-[8%] flex w-full flex-col items-start justify-between pl-[8%] pt-8 text-white md:flex-row md:items-center">
      {/* left side */}
      <div className="md:w-2/6">
        <div className="mb-[7%] md:mb-[12%]">
          <ShiftedLineTitle
            title="Eagle"
            width="md:w-[200%]"
            textSize="sm:text-5xl"
            lineMarginShift="ml-[50%]"
          />
        </div>
        <div className="text-md ml-[4%] flex flex-col gap-6 px-4 font-jost leading-relaxed sm:text-xl">
          <p>
            Eagle is a select team that competes with universities in the nation
            and make Aviat&apos;R&apos;s name known. It participates in SUAS, a
            competition aimed at challenging students to make their own unmanned
            aerial systems to complete a specific task. This sparks innovation
            from competition and poses as one of the largest motivations for
            improvement in the student world.
          </p>
          <LearnMoreButton color="bg-aviatr-blue-300" link="/projects" />
        </div>
      </div>

      {/* right side */}
      <div className="clip-slope relative flex h-[800px] overflow-hidden">
        <Image
          src={EagleImg}
          alt="Eagle"
          width={914}
          height={800}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Eagle;
