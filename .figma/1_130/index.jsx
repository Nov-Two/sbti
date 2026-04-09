import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.container3}>
      <div className={styles.container}>
        <img src="../image/mnrji0t1-4b9lk5f.png" className={styles.sBtiLogo} />
        <p className={styles.text}>SBTI</p>
      </div>
      <div className={styles.container2}>
        <div className={styles.link}>
          <p className={styles.text2}>Home</p>
        </div>
        <p className={styles.text3}>Test</p>
        <p className={styles.text4}>About</p>
      </div>
    </div>
  );
}

export default Component;
