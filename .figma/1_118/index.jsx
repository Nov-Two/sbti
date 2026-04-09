import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.container2}>
      <div className={styles.paragraph}>
        <p className={styles.text}>SBTI.</p>
        <p className={styles.text2}>© 2024 SBTI. Built with precision.</p>
      </div>
      <div className={styles.container}>
        <p className={styles.text3}>Privacy</p>
        <p className={styles.text4}>Terms</p>
        <p className={styles.text3}>Support</p>
      </div>
    </div>
  );
}

export default Component;
