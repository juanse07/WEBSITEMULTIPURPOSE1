import ServiceSection from '@/components/homePage/ServiceSection';

interface Service {
  category: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imagePosition?: 'left' | 'right';
  backgroundColor?: string;
  fontColor?: string; // For dynamic font color
  buttonStyle?: 'primary' | 'outline-primary' | 'outline-secondary'; // For dynamic button style
  hightLightsBackgroundColor?: string; // For dynamic button style
  HLbodyFont?: string;
  HlTitleFont?: string;
  highLightTitle1?: string;
  highLightTitle2?: string;
  highLightTitle3?: string;
  highLightTitle4?: string;
  highLightBody1?: string;
  highLightBody2?: string;
  highLightBody3?: string;
  highLightBody4?: string; 
}

export default function Home() {
  const services: Service[] = [
    {
      category: "CLEANING SERVICES",
      title: "A Cleaner Home, A Happier and unshakeable You!",
      description: "Creating sparkling clean environments across the metro area.",
      price: 0.1,
      imageUrl: "/aspi.png",
      imagePosition: "left" as const,
      backgroundColor: "#000000",
      buttonStyle: "primary",
      fontColor: "#ffffff",
      hightLightsBackgroundColor: "linear-gradient(135deg, #2C2E43, #1C1C1E)",
      HlTitleFont: "#4FC3F7",
      HLbodyFont: "#F7F7FF",
      highLightTitle1:'Deep Cleaning:',
      highLightTitle2:"Regular Maintenance:",
      highLightTitle3:'Move-In/Move-Out Cleaning:',
    
      highLightBody1: 'Say goodbye to hidden dust and grime with our thorough deep cleaning service.',
      highLightBody2: 'Keep your home looking fresh and clean with our regular maintenance service.',
      highLightBody3:"Get your new home move-in ready or leave your old home spotless with our move-in/move-out cleaning service.",
     
    },
    {
      category: "HandyMan",
      title: "Reliable. Affordable. Handy.",
      description: "Experienced professionals at your service, ready to help you today.",
      price: 0.12,
      imageUrl: "/martillando.png",
      imagePosition: "right" as const, 
      backgroundColor: "#F7F7FF",
      buttonStyle: "primary",
     fontColor: "#212529",
     hightLightsBackgroundColor: "linear-gradient(135deg, #E4e8f6, #f4f4f4)",
     HlTitleFont: "#4682B4",
     HLbodyFont: "#212529",
     highLightTitle1:"Furniture Assembly",
     highLightTitle2:"Custom Installations",
     highLightTitle3:"Playground Assembly",
   
     highLightBody1:"Struggling with instructions? we'll assemble your furniture in no time.",
     highLightBody2:"Tv mounting, shelves, and more! we'll install it for you.",
     highLightBody3:"We'll assemble your playground set so your kids can play safely.",
    },
    
    {
      category: "Gardening",
      title: "Expert Care for Your Green Spaces",
      description: "Bringing green dreams to life with expert care and attention.",
      price: 0.1,
      imageUrl: "/GardenDD.png",
      imagePosition: "right" as const,
      backgroundColor: "#545E75",
      hightLightsBackgroundColor: "linear-gradient(135deg, #2C2E43, #545E7F)",  
      HlTitleFont: "#00ACC1",
      HLbodyFont: "#F7F7FF",
      
      highLightTitle1:"Weeding and Pruning",
      highLightTitle2:"Lawn Maintenance",
      highLightTitle3:"Seasonal Care",
    
      highLightBody1:"Keep your garden looking neat and tidy with our weeding and pruning service.",
      highLightBody2:"We'll keep your lawn looking lush and green with our lawn maintenance service.",
      highLightBody3:"Get your garden ready for the changing seasons with our seasonal care service.",
      
    },
    {
      category: "Moving",
      title: "Making Your Move Smooth and Simple",
      description: "From packing to unloading, trust us to care for your belongings..",
      price: 0.12,
      imageUrl: "/moving1.png",
      imagePosition: "left" as const,
      hightLightsBackgroundColor: "linear-gradient(135deg, #E4e8f6, #f4f4f4)",
      HlTitleFont: "#4682B4",
      HLbodyFont: "#212529",
      highLightTitle1:"Loading and Unloading",
      highLightTitle2:"Packing Services",
      highLightTitle3:"Furniture Disassembly",
    
      highLightBody1:"We'll load and unload your belongings with care and precision.",
      highLightBody2:"We'll pack your belongings safely and securely for your move.",
      highLightBody3:"  We'll disassemble your furniture so it's ready for moving day.",
    },
    // ... other services
  ];

  return (
    <div >
      {services.map((service, index) => (
        <ServiceSection
          key={index}
          category={service.category}
          title={service.title}
          description={service.description}
          price={service.price}
          imageUrl={service.imageUrl}
          imagePosition={service.imagePosition}
          backgroundColor={service.backgroundColor}
          fontColor={service.fontColor}
          buttonStyle={service.buttonStyle}
          hightLightsBackgroundColor={service.hightLightsBackgroundColor}
          HLbodyFont={service.HLbodyFont}
          HlTitleFont={service.HlTitleFont}
          highLightBody1={service.highLightBody1}
          highLightBody2={service.highLightBody2}
          highLightBody3={service.highLightBody3}
          highLightBody4={service.highLightBody4}
          highLightTitle1={service.highLightTitle1}
          highLightTitle2={service.highLightTitle2}
          highLightTitle3={service.highLightTitle3}
          highLightTitle4={service.highLightTitle4}

        />
      ))}
    </div>
  );
}

// import ServiceSection from '@/components/homePage/ServiceSection'

// // First, define the interface for your service type
// interface Service {
//   category: string;
//   title: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   imagePosition?: 'left' | 'right';  // Using literal types
//   backgroundColor?: string; // Optional background color
//   buttonColor?: string;     // Optional button color
// }

// export default function Home({}) {
//   // Define services array with the type
//   const services: Service[] = [
//     {
//       category: "HandyMan",
//       title: "hangin' out with the best",
//       description: "You have to be willing to be misunderstood if you're going to innovate.",
//       price: 0.12,
//       imageUrl: "/martillando.png",
//       imagePosition: "right" as const,
//       backgroundColor: "#f8f9fa",
//       buttonColor: "#007bff"
//     },
   
//     {
//       category: "CLEANING SERVICES",
//       title: "We got you cover around all metro area",
//       description: "And those who were seen dancing were thought to be insane by those who could not hear the music.",
//       price: 0.1,
//       imageUrl: "/aspi.png",
//       imagePosition: "left" as const  // Type assertion to literal
//     },
  
//     {
//       category: "Gardening",
//       title: "We got you cover around all metro area",
//       description: "And those who were seen dancing were thought to be insane by those who could not hear the music.",
//       price: 0.1,
//       imageUrl: "/GardenDD.png",
//       imagePosition: "right" as const  // Type assertion to literal
//     },
//     {
//       category: "Moving",
//       title: "hangin' out with the best",
//       description: "You have to be willing to be misunderstood if you're going to innovate.",
//       price: 0.12,
//       imageUrl: "/moving1.png",
//       imagePosition: "left" as const
//     },
//     // ... other services
//   ];

//   return (
//     <>
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
//         {services.map((service, index) => (
//           <ServiceSection
//             key={index}
//             {...service}
//           />
//         ))}
//       </div>
//     </>
//   );
// }


//////evita de aqui para abajo/////////





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
