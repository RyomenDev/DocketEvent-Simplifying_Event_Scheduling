import React from "react";
import HomePageData from "./HomePageData";

const HomePage = () => {
  const { hero, features, courses, testimonials, cta } = HomePageData;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center p-8 bg-blue-50">
        <h1 className="text-4xl font-bold mb-4">{hero.title}</h1>
        <p className="text-lg mb-6">{hero.subtitle}</p>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          {hero.buttonText}
        </button>
        <img src={hero.image} alt="Hero" className="mt-6 mx-auto max-w-lg" />
      </section>

      {/* Features Section */}
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section className="p-8 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-6 bg-white shadow-lg rounded-lg text-center"
            >
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <a
                href={course.link}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-lg">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4 mx-auto"
              />
              <h3 className="text-xl font-bold text-center mb-2">
                {testimonial.name}
              </h3>
              <p className="text-gray-600 text-center">
                {testimonial.feedback}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center p-8 bg-blue-50">
        <h2 className="text-3xl font-bold mb-4">{cta.title}</h2>
        <p className="text-lg mb-6">{cta.description}</p>
        <a
          href={cta.link}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {cta.buttonText}
        </a>
      </section>
    </div>
  );
};

export default HomePage;
