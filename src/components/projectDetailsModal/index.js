import React from 'react';
import ProjectDetailsModalStyle from './styles';
import { IconContext } from 'react-icons';
import { RiCloseLine } from 'react-icons/ri';
const ProjectDetailsModal = ({ projectDetails }) => {
  const styles = ProjectDetailsModalStyle();

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <IconContext.Provider
          value={{
            color: '#404040',
            size: '16px',
          }}
        >
          <RiCloseLine
            style={{ marginLeft: 'auto', width: '22px', height: '22px' }}
          />
        </IconContext.Provider>
      </div>
      <div>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus eu at
          mattis tincidunt elit. In sit tortor quam mattis morbi interdum. Sed
          tristique porta ut nunc, aliquet in. Et enim at ante est vel. Netus ut
          vel varius fermentum faucibus. Tempor, sed est sed senectus sed.
          Vivamus eget aenean integer neque, interdum. Ut nunc urna amet
          tincidunt cras ut.
        </p>
      </div>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.wrapperText}>
            <p className={styles.title}>Sender:</p>
            <p className={styles.descriptionTitle}>Lorem ipsum dolor </p>
          </div>
          <div className={styles.wrapperText}>
            <p className={styles.title}>In charge:</p>
            <p className={styles.descriptionTitle}>Manager’s Name </p>
          </div>
          <div className={styles.wrapperText}>
            <p className={styles.title}>Last updated:</p>
            <p className={styles.descriptionTitle}>Lorem ipsum dolor </p>
          </div>
          <div className={styles.wrapperText}>
            <p className={styles.title}>Status:</p>
            <p className={styles.descriptionTitle}>Lorem ipsum dolor </p>
          </div>
          <div className={styles.wrapperText}>
            <p className={styles.title}>Address:</p>
            <p className={styles.descriptionTitle}>
              45 Ferlow Way
              <p>AL4 5ED</p>
              <p>Cornwall</p>
            </p>
          </div>
        </div>
        <div>
          <p className={styles.titleContects}>Contacts:</p>
          <div className={styles.wrapperText}>
            <p className={styles.descriptionTitle} style={{ width: '144px' }}>
              Ana Frankead:
            </p>
            <p className={styles.descriptionTitle}>ana.frankead@gmail.com </p>
          </div>
          <div className={styles.wrapperText}>
            <p className={styles.descriptionTitle} style={{ width: '144px' }}>
              Deni Moore:
            </p>
            <p className={styles.descriptionTitle}>d.moore@gmail.com</p>
          </div>

          <div className={styles.wrapperText}>
            <p className={styles.descriptionTitle} style={{ width: '144px' }}>
              Alan Patridge:
            </p>
            <p className={styles.descriptionTitle}>alan.partridge@gmail.com </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectDetailsModal;
