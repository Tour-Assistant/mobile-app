import { IonSearchbar } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from '../../reducer/tourReducer';
import { RootState } from '../../store';

function FilterContainer() {
  const dispatch = useDispatch();
  const { searchText } = useSelector((state: RootState) => state.tourState);
  return (
    <IonSearchbar
      value={searchText}
      onIonChange={e => {
        console.log('e.detail.value');
        console.log(e.detail.value);
        dispatch(setSearchText(e.detail.value!));
      }}
    ></IonSearchbar>
  );
}

export default FilterContainer;
