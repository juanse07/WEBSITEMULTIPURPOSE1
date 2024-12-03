import Head from 'next/head'
import Image from 'next/image'

import styles from '@/styles/Home.module.css'
import { Pagination } from 'react-bootstrap'
import PaginationBar from '@/components/PaginationBar'

import profilePicPlaceholder from '@/assets/images/profile-pic-placeholder.png';
import ServiceSection from '@/components/homePage/ServiceSection';

// First, define the interface for your service type
interface Service {
  category: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imagePosition?: 'left' | 'right';  // Using literal types
}

export default function Home({}) {
  // Define services array with the type
  const services: Service[] = [
    {
      category: "HandyMan",
      title: "hangin' out with the best",
      description: "You have to be willing to be misunderstood if you're going to innovate.",
      price: 0.12,
      imageUrl: "/martillando.png",
      imagePosition: "right" as const
    },
   
    {
      category: "CLEANING SERVICES",
      title: "We got you cover around all metro area",
      description: "And those who were seen dancing were thought to be insane by those who could not hear the music.",
      price: 0.1,
      imageUrl: "/aspi.png",
      imagePosition: "left" as const  // Type assertion to literal
    },
  
    {
      category: "Gardening",
      title: "We got you cover around all metro area",
      description: "And those who were seen dancing were thought to be insane by those who could not hear the music.",
      price: 0.1,
      imageUrl: "/GardenDD.png",
      imagePosition: "right" as const  // Type assertion to literal
    },
    {
      category: "Moving",
      title: "hangin' out with the best",
      description: "You have to be willing to be misunderstood if you're going to innovate.",
      price: 0.12,
      imageUrl: "/moving1.png",
      imagePosition: "left" as const
    },
    // ... other services
  ];

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
        {services.map((service, index) => (
          <ServiceSection
            key={index}
            {...service}
          />
        ))}
      </div>
    </>
  );
}

// export default function Home() {
//   return (
//     <>
    
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
//     {/* Cleaning Service */}
//     <ServiceSection
//       category="CLEANING SERVICES"
//       title="We got you cover around all metro area"
//       description="And those who were seen dancing were thought to be insane by those who could not hear the music."
//       price={0.1}
//       imageUrl="/aspi.png"
//       imagePosition="right"
//     />
//      <ServiceSection
//       category="HandyMan"
//       title="hangin' out with the best"
//       description="You have to be willing to be misunderstood if you're going to innovate."
//       price={0.12}
//       imageUrl="/martillando.png"
//       imagePosition="left"
//     />

//     {/* Gardening Service */}
//     <ServiceSection
//       category="GARDENERING"
//       title="We do Landscaping looks beautiful"
//       description="We should consider every day lost on which we have not danced at least once."
//       price={0.11}
//       imageUrl="/GardenDD.png"
//       imagePosition="right"
//       //backgroundColor="#f8f9fa"
//     />

//     {/* Moving Service */}
//     <ServiceSection
//       category="MOVING"
//       title="Need a hand with heavy stuff?"
//       description="You have to be willing to be misunderstood if you're going to innovate."
//       price={0.12}
//       imageUrl="/moving1.png"
//       imagePosition="left"
//     />
//     </div>
//   </>
    
//   )
// }
