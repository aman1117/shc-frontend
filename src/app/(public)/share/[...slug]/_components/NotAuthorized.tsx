export default function NotAuthorized() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Not Authorized</h1>
        <p>Sorry, you are not authorized to access this page.</p>
      </div>
    </div>
  );
}
