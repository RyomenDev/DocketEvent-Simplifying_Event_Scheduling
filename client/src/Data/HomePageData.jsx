const HomePageData = {
  hero: {
    title: "Empower Your Learning Journey",
    subtitle:
      "Explore courses, book interviews, and build your career with us.",
    buttonText: "Get Started",
    image: "/images/hero-image.jpg", // Replace with a valid image path
  },
  features: [
    {
      title: "Expert-Led Courses",
      description:
        "Access a wide range of courses taught by industry experts. Learn at your own pace and boost your skills.",
      icon: "📚",
    },
    {
      title: "Interview Booking System",
      description:
        "Schedule mock interviews with experienced professionals to enhance your confidence and performance.",
      icon: "📅",
    },
    {
      title: "Career Guidance",
      description:
        "Receive personalized career advice and actionable insights to achieve your goals.",
      icon: "💼",
    },
  ],
  courses: [
    {
      id: 1,
      name: "Full-Stack Web Development",
      description: "Master the MERN stack and build dynamic web applications.",
      image: "/images/fullstack.jpg",
      link: "/courses/fullstack",
    },
    {
      id: 2,
      name: "Data Structures & Algorithms",
      description:
        "Learn DSA with practical problem-solving techniques and prepare for technical interviews.",
      image: "/images/dsa.jpg",
      link: "/courses/dsa",
    },
    {
      id: 3,
      name: "Machine Learning Basics",
      description:
        "Understand the foundations of machine learning with hands-on projects.",
      image: "/images/ml.jpg",
      link: "/courses/ml",
    },
  ],
  testimonials: [
    {
      name: "John Doe",
      feedback:
        "This platform helped me secure my dream job! The courses are excellent, and the mock interviews were invaluable.",
      avatar: "/images/john-doe.jpg",
    },
    {
      name: "Jane Smith",
      feedback:
        "The career guidance sessions provided me with clarity and actionable steps to achieve my goals.",
      avatar: "/images/jane-smith.jpg",
    },
  ],
  cta: {
    title: "Join Our Learning Community",
    description:
      "Sign up today to access all features and take the first step towards your dream career.",
    buttonText: "Sign Up Now",
    link: "/signup",
  },
};

export default HomePageData;
