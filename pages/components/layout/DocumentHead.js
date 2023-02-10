import Head from 'next/head'

const DocumentHead = ({ title, description, keywords }) => (
    <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,400;1,500;1,900&display=swap" rel="stylesheet" />
        <title>{title}</title>
    </Head>
)

DocumentHead.defaultProps = {
  title: 'Effortlessly Recharge, Pay Bills and Manage Utilities in Nigeria | QuickBuy',
  description: 'QuickBuy | Get instant top-up for airtime, data, electricity, & water bills payment in Nigeria. Online recharge & multi-utility platform for easy transactions',
  keywords: 'Airtime top-up, Data bundle purchase, Prepaid electricity recharge, Mobile recharge, Online airtime recharge, Online data bundle purchase, Online electricity bill payment, Mobile wallet, Virtual top-up, Airtime credit, Online water bill payment, Utility bill payment, Mobile payments, Multi-utility platform, Nigeria'
};

export default DocumentHead;
