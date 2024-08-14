import {useDispatch} from 'react-redux';
import {logout} from '@redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('logged', 'false');
      dispatch(logout());
      console.log(await AsyncStorage.getItem('logged'));
    } catch (error) {
      console.log(error);
    }
  };

  return handleLogout;
};

export {useLogout};
