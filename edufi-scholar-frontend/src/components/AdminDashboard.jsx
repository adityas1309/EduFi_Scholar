import CreateScholarship from "./CreateScholarship";
import ScholarshipList from "./ScholarshipList";
import AnalyticsPanel from "./AnalyticsPanel";
import ApplicationsPanel from "./ApplicationsPanel";
import EmergencyPanel from "./EmergencyPanel";
import AuditLogs from "./AuditLogs";
import UserManagement from "./UserManagement";

// Updated AdminDashboard.jsx
function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <AnalyticsPanel />
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <CreateScholarship />
                        <EmergencyPanel />
                    </div>
                    <ScholarshipList />
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <ApplicationsPanel />
                    <UserManagement />
                </div>

                <AuditLogs />
            </div>
        </div>
    );
}

export default AdminDashboard;