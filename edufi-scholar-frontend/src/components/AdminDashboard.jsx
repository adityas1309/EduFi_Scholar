import CreateScholarship from "./CreateScholarship";
import ScholarshipList from "./ScholarshipList";

function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-200 pb-4">
                    Admin Dashboard
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <CreateScholarship />
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <ScholarshipList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;