import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaComments } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import Image from 'next/image';

interface ServiceSectionProps {
  category: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imagePosition?: 'left' | 'right';
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  category,
  title,
  description,
  price,
  imageUrl,
  imagePosition = 'right'
}) => {
  return (
    <section className="service-section py-3">
      <Container className="service-container">
        <Row className={`align-items-center service-row ${imagePosition === 'left' ? 'flex-row-reverse' : ''}`}>
          <Col md={8} className="service-content">
            <div className="pe-md-4">
              <span className="service-category">{category}</span>
              <h2 className="service-title">{title}</h2>
              <p className="service-description">{description}</p>
              <div className="d-flex gap-3 align-items-center">
                <Button 
                  variant="outline-light" 
                  className="service-button"
                >
                  Book {category.toLowerCase()} from: ${price}
                </Button>
                <a href="#" className="service-icon">
                  <FaComments size={24} />
                </a>
                <a href="#" className="service-icon">
                  <FiMail size={24} />
                </a>
              </div>
            </div>
          </Col>
          <Col md={4} className= "service-image-col" >
            <Image 
              src={imageUrl} 
              alt={title}
              width={400}
              height={300} 
              className="service-image"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServiceSection;