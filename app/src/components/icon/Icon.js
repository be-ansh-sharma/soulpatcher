import { GiBookshelf, GiFireBottle, GiFishing } from 'react-icons/gi';
import { FaArrowLeft } from 'react-icons/fa';
import { TbDeviceMobileMessage, TbQuotes } from 'react-icons/tb';
import { IoWaterOutline, IoSettingsOutline } from 'react-icons/io5';
import { ImEvil2, ImBin2 } from 'react-icons/im';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { FcNews } from 'react-icons/fc';
import { FaRobot } from 'react-icons/fa6';

const Icon = ({ name, style, className }) => {
  let CMP;
  switch (name) {
    case 'evil':
      CMP = ImEvil2;
      break;
    case 'IoWaterOutline':
      CMP = IoWaterOutline;
      break;
    case 'IoSettingsOutline':
      CMP = IoSettingsOutline;
      break;
    case 'TbQuotes':
      CMP = TbQuotes;
      break;
    case 'ImBin2':
      CMP = ImBin2;
      break;
    case 'FaHandHoldingHeart':
      CMP = FaHandHoldingHeart;
      break;
    case 'GiBookshelf':
      CMP = GiBookshelf;
      break;
    case 'GiFireBottle':
      CMP = GiFireBottle;
      break;
    case 'GiFishing':
      CMP = GiFishing;
      break;
    case 'FaArrowLeft':
      CMP = FaArrowLeft;
      break;
    case 'TbDeviceMobileMessage':
      CMP = TbDeviceMobileMessage;
      break;
    case 'FcNews':
      CMP = FcNews;
      break;
    case 'FaRobot':
      CMP = FaRobot;
      break;
  }
  if (!CMP) {
    return null;
  }

  return <CMP style={style} className={className} />;
};

export default Icon;
