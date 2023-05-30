import ButtonComp from 'components/buttonComp';
import Title from 'components/title';
import { RouteBasePath } from 'constants/index';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartEmpty: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-10'>
      <Title
        title='YOUR SHOPPING BAG IS EMPTY'
        subtitle='Explore our assortment of teas, beautiful accessories and delicious treats and pick the products you like'
        rootClassName='space-y-6'
        titleClassName='text-black font-jost not-italic'
        subTitleClassName='text-black'
      />
      <ButtonComp isPrimary={false} htmlType='button' onClick={() => navigate(`/${RouteBasePath.CLIENT_FIND_A_TEA_BASE_PATH}`)}>
        Continue Shopping
      </ButtonComp>
      <div className='w-full flex justify-center items-center'>
        <svg width='2838' height='4311' viewBox='0 0 2838 4311' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-1/2 h-fit'>
          <path
            d='M1009.51 1301.64H943.242V772.777C939.876 354.932 1155.75 8.22364 1424.46 0.182662C1519.44 -2.67875 1611.31 36.243 1690.68 112.672C1831.76 248.521 1917.24 485.002 1919.33 745.254V1281.12H1853.06V745.521C1851.11 502.994 1773.22 284.169 1644.72 160.422C1578.48 96.637 1502.97 64.2482 1426.44 66.4306C1193.46 73.4085 1006.43 390.149 1009.51 772.51V1301.64'
            fill='#352A2A'
          />
          <path d='M2838 4208.84L620.126 4311V1122.05L2838 1093.67V4208.84Z' fill='#ECCF5A' />
          <path d='M620.126 1122.05L335.599 1222.29L0 1039.85V4228.8H310.068L620.126 4311V1122.05Z' fill='#D5AE3E' />
          <path d='M2838 1093.67L2548.42 1006.1L0 1039.85L335.599 1222.29L620.126 1122.05L2838 1093.67Z' fill='#92731F' />
          <path
            d='M1384.31 1301.64C1384.31 1358.62 1338.13 1404.81 1281.16 1404.81C1224.2 1404.81 1178.02 1358.62 1178.02 1301.64C1178.02 1244.67 1224.2 1198.48 1281.16 1198.48C1338.13 1198.48 1384.31 1244.66 1384.31 1301.64ZM2294.17 1282.48C2294.17 1339.46 2247.99 1385.65 2191.03 1385.65C2134.07 1385.65 2087.89 1339.46 2087.89 1282.48C2087.89 1225.51 2134.07 1179.32 2191.03 1179.32C2247.99 1179.32 2294.17 1225.51 2294.17 1282.49'
            fill='#181211'
          />
          <path
            d='M2224.17 745.254C2222.07 485.002 2136.58 248.521 1995.51 112.672C1916.13 36.243 1824.12 -2.67875 1729.29 0.182662C1460.59 8.22364 1244.71 354.932 1248.07 772.777V1301.65C1248.07 1306 1248.92 1310.31 1250.59 1314.33C1252.26 1318.35 1254.7 1322 1257.77 1325.08C1260.85 1328.16 1264.5 1330.6 1268.53 1332.26C1272.55 1333.92 1276.85 1334.78 1281.21 1334.78C1285.56 1334.78 1289.86 1333.92 1293.88 1332.26C1297.9 1330.59 1301.56 1328.15 1304.63 1325.07C1307.71 1322 1310.15 1318.34 1311.81 1314.32C1313.48 1310.3 1314.34 1305.99 1314.34 1301.64V772.51C1311.26 390.149 1498.3 73.4085 1731.27 66.4306C1807.66 64.2482 1883.3 96.637 1949.55 160.422C2078.05 284.169 2155.94 502.99 2157.89 745.521V1281.12H2158.03C2158.01 1281.58 2157.89 1282.02 2157.89 1282.49C2157.89 1291.28 2161.38 1299.71 2167.6 1305.92C2173.81 1312.14 2182.24 1315.63 2191.03 1315.63C2199.82 1315.63 2208.25 1312.14 2214.46 1305.92C2220.68 1299.71 2224.17 1291.28 2224.17 1282.49C2224.17 1282.02 2224.05 1281.58 2224.02 1281.12H2224.16V745.254'
            fill='#352A2A'
          />
        </svg>
      </div>
    </div>
  );
};

export default CartEmpty;
