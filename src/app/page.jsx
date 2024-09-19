"use client"
import React from "react";
import Hero from "@/components/Landing/Hero";
import Dashboard from "./(dashboard)/dashboard/page";
import About from "@/components/Landing/About";
import Feature from "@/components/Landing/Feature";
import Footer from "@/components/Landing/Footer";
import { Header } from "@/components/header";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'


const Home = () => {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })
  return (
    <>
    <ReactLenis root>
      <Header />

      <Hero />
      <About />

      <div className="md:px-32 p-4 flex flex-wrap justify-center gap-8">
        <Feature
          head="Cross Platform Analysis"
          body="Gain a complete overview of your social media presence. Track
            performance metrics, compare platforms, and understand what content
            works best—across YouTube, Instagram, X, and LinkedIn."
          image="/banner.png"
        />
        <Feature
          head="Predictive Insights"
          body="Wondering what to post next? Our machine learning model predicts which content topics are likely to get the most engagement, helping you stay ahead of the curve."
          image="/banner.png"
        />
        <Feature
          head="Custom Reports"
          body="Create detailed, professional reports that highlight your social media growth and performance. Export data, visualize trends, and share insights with your team or clients."
          image="/banner.png"
        />
        <Feature
          head="Detailed Post Analysis"
          body="Drill down into individual posts to see detailed performance metrics like likes, shares, comments, and engagement ratios. Know exactly which posts are driving your growth."
          image="/banner.png"
        />
        <Feature
          head="Audience Engagement Trends"
          body="Understand how your audience interacts with your content over time. Identify peak engagement times and refine your posting strategy to boost results."
          image="/banner.png"
        />
      </div>
      <Footer />
      </ReactLenis>
    </>
  );
};

export default Home;
