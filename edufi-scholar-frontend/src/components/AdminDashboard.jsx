import CreateScholarship from "./CreateScholarship";
import ScholarshipList from "./ScholarshipList";

function AdminDashboard() {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <CreateScholarship />
            <ScholarshipList />
        </div>
    );
}

export default AdminDashboard;
