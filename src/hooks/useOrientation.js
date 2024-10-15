import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

export const useOrientation = () => {
  const [orientation, setOrientation] = useState(getOrientation());

  function getOrientation() {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width ? 'PORTRAIT' : 'LANDSCAPE';
  }

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setOrientation(getOrientation());
    });

    return () => {
      // Para versiones más recientes de React Native
      if (typeof subscription?.remove === 'function') {
        subscription.remove();
      } else {
        // Para versiones anteriores de React Native
        Dimensions.removeEventListener('change', subscription);
      }
    };
  }, []);

  return orientation;
};
