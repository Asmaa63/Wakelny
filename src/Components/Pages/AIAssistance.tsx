const AIAssistance: React.FC = () => {
  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow-lg text-center max-w-3xl mx-auto my-10 ">
      <p className="text-yellow-900 font-semibold text-lg">
        Didn't find what you're looking for? Describe your issue and let AI help you.
      </p>
      <button className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-full font-medium hover:bg-yellow-600 transition">
        Get AI Assistance
      </button>
    </div>
  );
};

export default AIAssistance;
