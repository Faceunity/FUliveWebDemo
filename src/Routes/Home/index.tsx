import { PcHome } from "./PC";
import { MobileHome } from "./Mobile";
import { useUA } from "../../utils/hooks";

const Home = () => {
  const { isPc, deviceType } = useUA();

  return deviceType === null ? <></> : isPc ? <PcHome /> : <MobileHome />;
};
export default Home;
