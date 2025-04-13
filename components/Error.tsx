import React from "react";

function ErrorSituation({ situation }: { situation: string }) {
  return (
    <section className="flex-1 py-10 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-red-600">
            Failed to load {situation}. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    </section>
  );
}

export default ErrorSituation;
