import React from "react";
import { BentoGrid,BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconClipboardCopy,
} from "@tabler/icons-react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";


export default function Home() {
  return (


    <>
    <h2 className="text-center text-6xl mb-4 font-bold">Google</h2>
    <div className="mb-4">
    <PlaceholdersAndVanishInput placeholders={["ASK",'GOOGLE', 'ANYTHING']}/>
    </div>
    
    <BentoGrid className="max-w-4xl  mx-auto">
      {items.map((item, i) => (
        <BentoGridItem 
          className="dark:outline-1 h-28 cursor-pointer dark:outline-gray-300 outline-2 outline-gray-800"
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
    </>
  );
}
// const Skeleton = () => (
//   <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
// );
const items = [
  {
    title: "GRAPHIC DESIGNING",
    description: "ALL 250+ GRAPHIC DESIGN LINKS.",
    // header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "WEB DESIGNING",
    description: "ALL 250+ WEB DESIGN LINKS.",
    // header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },{
    title: "INDIAN NEWS",
    description: "ALL 250+ INDIAN NEWS LINKS.",
    // header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },{
    title: "SPORTS",
    description: "ALL 250+ SPORTS LINKS.",
    // header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  ,{
    title: "AI TOOLS",
    description: "ALL 250+ AI TOOLS LINKS.",
    // header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
];
