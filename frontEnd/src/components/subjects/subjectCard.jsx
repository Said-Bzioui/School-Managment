import PropTypes from 'prop-types';
import { Progress } from '../ui/progress';

const SubjectCard = ({ subject }) => {


    const getProgress = (subject) => {
        if (!subject.masse_horaire) return 0;
        return Math.round((subject.done_hours / subject.masse_horaire) * 100);
    };
    const progress = getProgress(subject);

    return (
        <div className="  border h-fit  bg-muted  p-1  border-gray-200   rounded-md">
            <div className="flex items-center justify-between  bg-primary/30  p-1 rounded-md">
                <h2 className="text-lg font-bold text-gray-600 ">{subject.code}</h2>
                <p className="text-gray-400">{subject.masse_horaire}H</p>
            </div>
            <h2 className="text-lg ms-2  text-gray-500 my-2 truncate">{subject.name}</h2>

            <div className='px-2'>
                <span className='text-sm text-gray-400'>Course Progress</span>
                <div className="flex items-center  justify-between  space-x-2 -mt-2">
                    <Progress value={progress} className="w-[100%] bg-gray-200" />
                    <p className="text-sm text-gray-400">{progress}%</p>
                </div>
            </div>
        </div>
    );
};


SubjectCard.propTypes = {
    subject: PropTypes.shape({
        name: PropTypes.string.isRequired,
        sector: PropTypes.string,
        code: PropTypes.string,
        masse_horaire: PropTypes.number,
        done_hours: PropTypes.number

    }).isRequired
};

export default SubjectCard;
