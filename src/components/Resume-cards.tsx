'use client'
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import {Spotlight} from "@/components/ui/Spotlight";

const courseData ={
  "courses": [
    {
      "id": 1,
      "title": "Resume_0",
      "slug": "guitar-fundamentals",
      "description": "Learn the basics of playing guitar with our comprehensive beginner's course.",
      "price": 99.99,
      "instructor": "John Doe",
      "isFeatured": true,
      "image": "/guitar.jpg" 
    },
    {
      "id": 2,
      "title": "Resume_1",
      "slug": "piano-for-beginners",
      "description": "Start your musical journey with foundational piano skills taught by expert instructors.",
      "price": 109.99,
      "instructor": "Jane Smith",
      "isFeatured": false,
      "image": "/piano.jpg" 
    },
  ]
  }

function ResumeCards(){
  return (
    <div className="min-h-screen py-12 pt-36">
      <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">All Resumes ({courseData.courses.length})</h1>  
        <div className="flex flex-wrap justify-center">
            {courseData.courses.map((course) => (
                <CardContainer className="inter-var m-4">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black/[0.3] dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {course.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {course.description}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                      src={course.image}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={course.title}
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                       Edit →
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      View
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
        </div>  
    </div>
  )
}

export default ResumeCards