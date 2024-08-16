"use Client";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export default function CardSpotlightDemo() {
  return (
    <div className="flex gap-3  items-center w-full justify-center h-[90vh]">
      <div>
        <CardSpotlight className="h-96 w-96 flex flex-col justify-between">
          <div>
            <p className="font-bold relative z-20 mt-2 text-3xl text-black dark:text-white">
              FREE
            </p>
            <div className="text-neutral-800 dark:text-neutral-200 mt-4 relative z-20">
              Following are the benefits:
              <ul className="list-none  mt-2">
                <NoStep title="Ads" />
                <NoStep title="50 Links" />
                <NoStep title="Light & Dark themes" />
                <Step title="Customer Support" />
              </ul>
            </div>
          </div>
          <div className="  w-full dark:bg-black flex justidfy-center items-center">
            <div className="relative w-full inline-flex group">
              <div
                title="Get quote now"
                className="relative shadow-xl dark:shadow-none inline-flex items-center justify-center px-4 py-2 text-md font-semibold text-black   dark:text-white transition-all w-full duration-200 bg-white dark:bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Current Plan
              </div>
            </div>
          </div>
        </CardSpotlight>
      </div>
      <div>
        <CardSpotlight className="min-h-96 w-96 flex-col flex  justify-between">
          <div>
            <p className="font-bold relative z-20 mt-2 text-3xl text-black dark:text-white">
              PREMIUM
            </p>
            <div className="text-neutral-800 dark:text-neutral-200 mt-4 relative z-20">
              Following are the benefits:
              <ul className="list-none  mt-2">
                <Step title="No Ads" />
                <Step title="100+ Links" />
                <Step title="Full Control" />
                <Step title="Remove Widgets" />
                <Step title="more themes" />
                <Step title="Customer Support" />
              </ul>
            </div>
          </div>
          <div className="w-full flex  justidfy-center items-center">
            <div className="relative w-full inline-flex group">
              <div className="absolute w-full transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <a
                href="#"
                title="Get quote now"
                className="relative w-full  inline-flex items-center justify-center px-4 py-2 text-md font-semibold text-black dark:text-white transition-all duration-200 bg-white dark:bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Get Premium
              </a>
            </div>
          </div>
        </CardSpotlight>
      </div>
    </div>
  );
}

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="dark:text-white text-black">{title}</p>
    </li>
  );
};
const NoStep = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <NoCheckIcon />
      <p className="text-black dark:text-white">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};
const NoCheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-black/50 dark:text-white/50  mt-1 flex-shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};
