/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Zero-Rating your website',
  tagline: 'How to make it so your visitors aren\'t charged for data when they\'re on a phone.',
  url: 'https://thenational.academy',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Oak National Academy', // Usually your GitHub org/user name.
  projectName: 'zero-rating', // Usually your repo name.
  
  themeConfig: {
    navbar: {
      title: 'Zero-Rating',
      logo: {
        alt: 'Oak',
        src: 'img/acorn.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {href: 'https://thenational.academy', label: 'Home', position: 'left'},
        {
          href: 'https://github.com/oaknational/zero-rating',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
       
        {
          title: 'Documentation provided by',
          items: [
            {
              label: 'Oak National Academy',
              href: 'https://thenational.academy',
            },
            
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Oak National Academy`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/oaknational/zero-rating/edit/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/oaknational/zero-rating/edit/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
