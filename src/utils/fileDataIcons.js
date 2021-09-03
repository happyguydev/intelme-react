import { AiOutlineFilePdf } from 'react-icons/ai';
import { CgFileDocument } from 'react-icons/cg';
import { FiFile } from 'react-icons/fi';

const fileDataIcons = (value) => {
  switch (value) {
    case 'Drawing':
      return <AiOutlineFilePdf />;
    case 'Document':
      return <CgFileDocument />;
    default:
      return <FiFile />;
  }
};

// const fileDataIcons = [
//   {
//     type: 'Drawing',
//     icon: <AiOutlineFilePdf />,
//   },
//   {
//     type: 'Document',
//     icon: <CgFileDocument />,
//   },
//   {
//     type: other,
//     icon: <FiFile />,
//   },
// ];

export default fileDataIcons;
