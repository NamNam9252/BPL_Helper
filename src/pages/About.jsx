const About = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At Helper, we are dedicated to providing exceptional support and assistance to our users.
            Our mission is to make help accessible to everyone, anywhere, and anytime.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="font-semibold text-gray-800">NAMAN GOYAL</h3>
              <p className="text-gray-600">CEO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="font-semibold text-gray-800">DEVANSH PUINDIR</h3>
              <p className="text-gray-600">Head of Support</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="font-semibold text-gray-800">GARV SHARMA</h3>
              <p className="text-gray-600">Technical Lead</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="font-semibold text-gray-800">DEVANSH SHRIVASTAVA</h3>
              <p className="text-gray-600">CMO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="font-semibold text-gray-800">ADVET GUPTA</h3>
              <p className="text-gray-600">FOUNDER</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="font-semibold text-gray-800">AMAN PRAKASH</h3>
              <p className="text-gray-600">MARKETING HEAD</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Customer First - We prioritize our users' needs</li>
            <li>Excellence - We strive for the highest quality in everything we do</li>
            <li>Innovation - We continuously improve and adapt</li>
            <li>Integrity - We maintain honesty and transparency</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About; 