'use client';

export default function UISamplePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">UI Sample for AllChain</h1>

        {/* Alert Component */}
        <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded">
          This is an alert message.
        </div>

        {/* Button Component */}
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 mb-6">
          Click Me
        </button>

        {/* Input Field */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Sample Input</label>
          <input
            type="text"
            placeholder="Enter text here"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Form Example */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-500">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
