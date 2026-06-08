import React from 'react';
import Landing from './Landing';
import Top from './Top';
import ResumeGetHired from './ResumeGetHired';
import WhyWe from './WhyWe';
import Example from './Example';
import Choose from './Choose';
import ComparisonSection from './ComparisonSection';
import HowToCreate from './HowToCreate';
import Block from './Block';
import { AppleCardsCarouselDemo } from '../AppleCardsCarouselDemo';



const Resume = () => {
    return (
        <div>
            <Top />
            <Landing />
            <HowToCreate />
            <ResumeGetHired />
            <Block />
            <ComparisonSection />
            <Example />

            <WhyWe />




        </div>
    )
}

export default Resume