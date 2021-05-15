import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      description="How to make it so your visitors aren't charged for data when they're on a phone.">
      <header style={{margin: "auto", textAlign: "center", marginTop:"8em"}}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Read our guide to zero-rating
            </Link>
          </div>
        </div>
      </header>
      <main>
      <div className="container" style={{paddingTop: "8em", paddingBottom: "8em", maxWidth: "36em", margin:"auto"}}>
        <p>During the Covid pandemic, in early 2021, <a href="https://thenational.academy">Oak National Academy</a> became one of a handful of websites which were "zero-rated" by mobile phone network operators. This meant that visitors to the website were not charged for accessing the content of the website, or watching our videos.</p>
        <p>To help others who may wish to achieve zero-rating in future, we have written this guide. It is aimed at a technical audience. To gain value from this documentation, you should be someone who understands web technologies, maintains and/or runs your website.</p>
      </div>
      </main>
      
    </Layout>
  );
}
