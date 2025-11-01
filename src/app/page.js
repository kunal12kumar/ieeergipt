import CodingLeaderboard from "./landingpage/codingleaderboard/page";
import { BackgroundBeamsDemo } from "./landingpage/page";
import { TimelineDemo } from "./Timeline/page";
import UpcomingHighlights from "./Upcomingevents/page";
import WhatWeDo from "./whatwedo/page";

export default function Home() {
  return (
    <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <BackgroundBeamsDemo></BackgroundBeamsDemo>
      <UpcomingHighlights></UpcomingHighlights>
      
      <WhatWeDo></WhatWeDo>
      <CodingLeaderboard></CodingLeaderboard>

      <TimelineDemo></TimelineDemo>

      {/* bg-gradient-to-r from-[#404371] to-[#780831] */}
    </div>
  );
}
