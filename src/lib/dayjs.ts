import RelativeTime from "dayjs/plugin/relativeTime";
import Dration from "dayjs/plugin/duration";
import DayJS from "dayjs";

DayJS.extend(RelativeTime);
DayJS.extend(Dration);

export const dayjs = DayJS;
