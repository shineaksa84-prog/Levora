import CandidateList from '../features/candidates/CandidateList';
import SmartActionsPanel from '../features/candidates/SmartActionsPanel';

export default function Candidates() {
    return (
        <div className="relative min-h-[calc(100vh-6rem)]">
            <CandidateList />
            <SmartActionsPanel />
        </div>
    );
}
