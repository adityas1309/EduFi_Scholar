function FunderDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Funder Dashboard</h2>
                <div className="bg-blue-100 p-6 rounded-xl shadow-md">
                    <p className="text-lg text-blue-800 font-medium">
                        Contribute to scholarships and support students.
                    </p>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-2">Recent Contributions</h3>
                            {/* Add contribution list here */}
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
                            {/* Add quick action buttons here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FunderDashboard;