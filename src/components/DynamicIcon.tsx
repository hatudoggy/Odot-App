
//Icons
import { GoDotFill } from "react-icons/go";
import { FaRedditAlien } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { SiYoutubeshorts } from "react-icons/si";
import { MdForum } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { MdOutlineWeb } from "react-icons/md";

export type KeyOfIconList = keyof typeof iconList

interface DynamicIconProps {
  icon: KeyOfIconList
}

export const iconList = {
  'yt': <FaYoutube />,
  'ytshrt': <SiYoutubeshorts />,
  'reddit': <FaRedditAlien />,
  'forum': <MdForum />,
  'news': <FaNewspaper />,
  'docu': <IoDocumentText />,
  'web': <MdOutlineWeb />,
  'none': <GoDotFill />
}

function DynamicIcon({icon}: DynamicIconProps) {

  return(
    iconList[icon]
  )
}

export default DynamicIcon