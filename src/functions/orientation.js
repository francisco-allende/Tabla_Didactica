import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

export const useOrientation = () => {
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    const onChange = ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => subscription?.remove();
  }, []);

  return orientation;
};
