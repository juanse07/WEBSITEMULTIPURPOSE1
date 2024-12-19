
import Image from 'next/image';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaComments } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import styles from '../../styles/ServiceSection.module.css';

interface ServiceSectionProps {
  category: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imagePosition?: 'left' | 'right';
  backgroundColor?: string;
  fontColor?: string; // For dynamic font color
  buttonStyle?: 'primary' | 'outline-primary' | 'outline-secondary';
  hightLightsBackgroundColor?: string // For dynamic button style
  HlTitleFont?: string;
  HLbodyFont?: string;
  highLightTitle1?: string;
  highLightTitle2?: string;
  highLightTitle3?: string;
  highLightTitle4?: string;
  highLightBody1?: string;
  highLightBody2?: string;
  highLightBody3?: string;
  highLightBody4?: string;

}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  category,
  title,
  description,
  price,
  imageUrl,
  imagePosition = 'right',
  backgroundColor = '#FFFFFF', // Default background color if none provided
  fontColor = '#000000',
  buttonStyle = 'primary',
  hightLightsBackgroundColor = '#FFFFFF',
  HlTitleFont = '#000000',
  HLbodyFont = '#000000',
  highLightTitle1 = 'Quality Service',
  highLightTitle2 = 'Affordable Pricing',
  highLightTitle3 = 'Trusted Professionals',
  highLightTitle4 = 'titulo',
  highLightBody1 = 'body',
  highLightBody2 = 'body',
  highLightBody3 = 'body',
  highLightBody4 = 'body',
  
}) => {
  

  return (
    <div className={styles.parentContainer}>   
      <div className={styles.Container}>
    <section
       className={styles.serviceSection}
       style={{
         backgroundColor,
         color: fontColor, // Apply font color
         padding: '3rem',
         borderRadius: '8px',
        }}
        >
      <Container >
        <Row
          className={`align-items-center service-row ${
            imagePosition === 'left' ? 'flex-row-reverse' : ''
          }`}
          >
          <Col >
            <div >
              <span className={styles.category} >{category}</span>
              <h2 className={styles.ServiceTitle} >{title}</h2>
              <p className={styles.ServiceDescription} >{description}</p>
              <div className={styles.serviceActions} >
                <Button className={`${styles.serviceButton} btn btn-${buttonStyle}`}
                 title={`Book ${category.toLowerCase()} from: $${price}`}>
                  {/* //Book {category.toLowerCase()} from: ${price} */}
                  Book from  ${price}
                </Button>
                <a href="#" className={styles.serviceIcon}>
                  <FaComments size={24} />
                </a>
                <a href="#" className={styles.serviceIcon}>
                  <FiMail size={24} />
                </a>
              </div>
            </div>

          
          </Col>
          <Col >
            <Image
              src={imageUrl}
              alt={title}
              width={500}
              height={400}
              className={styles.serviceImage}
              
            />
          </Col>
        </Row>

        <Row className={styles.highlightsRow}
         
        >
            <Col md={4} className={styles.highlight}
             style={{backgroundImage:hightLightsBackgroundColor, color: fontColor}}>
              <h4 style={{color:HlTitleFont}}>
              { highLightTitle1} </h4>
              <p
               style= {{color:HLbodyFont}}
              >{highLightBody1}</p>
            </Col>
            <Col md={4} className={styles.highlight}
             style={{backgroundImage:hightLightsBackgroundColor, color: fontColor}}>
              <h4
             style= {{color:HlTitleFont}}
              >{highLightTitle2}</h4>
              <p
               style= {{color:HLbodyFont}}
              >{highLightBody2}</p>
            </Col>
            <Col md={4} className={styles.highlight}
             style={{backgroundImage:hightLightsBackgroundColor, color: fontColor}}>
              <h4
                style= {{color:HlTitleFont}}
              >{highLightTitle3}</h4>
              <p
                style= {{color:HLbodyFont}}
              >{highLightBody3}</p>
            </Col>
          </Row>
      </Container>
    </section>
    </div>
    </div>
  );
};

export default ServiceSection;


