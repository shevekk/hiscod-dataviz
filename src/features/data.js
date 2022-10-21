import { createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'
import Papa from "papaparse";
import { useDispatch, useSelector } from 'react-redux'
//import csvFileFR from './../../data/db_hiscod_csv_v1_fr.csv';



const initialState = { data: ["Hello2"] }

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

/*
export async function fetchOrUpdateFreelances(dispatch) {

  Papa.parse(csvFileFR, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function(results) {
        useFetching(() => {
          //dataActions.save(["zzdsqds d ", "dsqd"])

          dispatch(save(["zzdsqds d ", "dsqd"]));
        });
      }
  });



  const status = selectFreelances(getState()).status
  if (status === 'pending' || status === 'updating') {
    // on stop la fonction pour éviter de récupérer plusieurs fois la même donnée
    return
  }
  dispatch(freelancesFetching())
  try {
    // on utilise fetch pour faire la requête
    const response = await fetch('http://localhost:8000/freelances')
    const data = await response.json()
    dispatch(freelancesResolved(data))
  } catch (error) {
    dispatch(freelancesRejected(error))
  }
}
*/


const dataSlice = createSlice({
  // le nom du slice
  name: 'data',
  // le state initial
  initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // reducers permet de définir les actions et le reducer
  reducers: {
    // l'action set ('theme/set')
    save: (state, action) => {
        //console.log("Hello");
        //console.log(state);

        //console.log(action.payload);
        //state.data.push(["Hello"]);

        state.data = action.payload;
    },
  },
})

// on extrait les actions et le reducer
const { actions, reducer } = dataSlice
// on export chaque action individuellement
export const { save } = actions
// on export le reducer comme default export
export default reducer
