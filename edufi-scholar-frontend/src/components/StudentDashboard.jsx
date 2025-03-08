function StudentDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Student Dashboard</h2>
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <p className="text-lg text-gray-700 mb-4">
                        Explore available scholarship opportunities and manage your applications.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-indigo-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-indigo-800 mb-2">Your Applications</h3>
                            {/* Application status here */}
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-green-800 mb-2">Available Scholarships</h3>
                            {/* Scholarship list here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;