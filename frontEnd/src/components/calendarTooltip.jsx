import PropTypes from 'prop-types';
import { Tooltip } from "react-tooltip";
import moment from "moment";
import { Clock, MapPin, User } from "lucide-react";

const CustomEvent = ({ event }) => {
    return (
        <>
            <div
                data-tooltip-id={`tooltip-${event.title}`}
                className="cursor-pointer hover:opacity-80  transition-opacity duration-200"
            >
                {event.title}
            </div>
            <Tooltip
                id={`tooltip-${event.title}`}
                place="bottom"
                className="!bg-transparent !p-0 !opacity-100 !z-[9999]"
                offset={-20}
                delayShow={50}
            >
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 max-w-xs relative z-50">
                    {/* Header */}
                    <div className="flex items-start gap-2 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
                                {event.title}
                            </h3>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        {/* Room */}
                        {event.room && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>{event.room}</span>
                            </div>
                        )}

                        {/* Time */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>
                                {moment(event.start).format("HH:mm")} - {moment(event.end).format("HH:mm")}
                            </span>
                        </div>
                    </div>

                    {/* Accent border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg"></div>
                </div>
            </Tooltip>
        </>
    );
};

CustomEvent.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        room: PropTypes.string,
        start: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
        end: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    }).isRequired,
};

export default CustomEvent;