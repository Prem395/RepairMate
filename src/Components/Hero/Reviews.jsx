import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import person1 from "../../assets/Images/person1.png";
import person2 from "../../assets/Images/person2.png";
import person3 from "../../assets/Images/person_3.webp";

import { IoStar } from "react-icons/io5";

const Reviews = () => {
  const reviews = [
    {
      name: "Amit Verma",
      comment: "Quick and smooth repair. Really impressed!",
      rating: 5,
      image: person1,
    },
    {
      name: "Riya Sharma",
      comment: "The service was fast and affordable!",
      rating: 4,
      image: person2,
    },
    {
      name: "Pankaj Dev",
      comment: "Excellent communication and helpful technician.",
      rating: 5,
      image: person3,
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const review = reviews[current];

  return (
    <div className="w-full p-4 text-white sm:p-6">
      <AnimatePresence mode="wait">
        <Motion.div
          key={review.name}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src={review.image}
              alt={review.name}
              className="h-11 w-11 rounded-full border border-white/20 object-cover sm:h-12 sm:w-12"
            />
            <div>
              <h2 className="font-semibold">{review.name}</h2>
              <div className="flex">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <IoStar key={i} className="fill-yellow-400" />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-white/85">{review.comment}</p>
        </Motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Reviews;
